let apiUrl =(location.hostname === "localhost" || location.hostname === "127.0.0.1")
? "http://localhost:3000/"
: "https://test-orinoco.herokuapp.com/"

// ************* fonction pour afficher le nombre d'articles dans le panier (from localstorage) reprise sur chaque page 2 : 
function loadCartItems() {
    let itemsInCart = localStorage.getItem('cartItems');
    if(itemsInCart) {
        document.querySelector('.cart-items').textContent = itemsInCart;
    }
};
loadCartItems();


// ************* Création de la class contact contenant les infos client requis

class Contact {
    constructor(prenom, nom, adresse, ville, email) {
        this.prenom = prenom,
        this.nom = nom,
        this.adresse = adresse,
        this.ville = ville,
        this.email = email
    }
}

// ************ Création du tableau products qui contiendra les ids des produits pour l'envoi au serveur

let products = []; // initialisation du tableau products
let itemsInCart = JSON.parse(localStorage.getItem('cart'));
for( let i = 0; i < itemsInCart.length; i++) {   // pour chaque article on push son id dans le tableau
    products.push(itemsInCart[i].id);
    localStorage.setItem('products', JSON.stringify(products));    // stockage du tableau products
};

// ************ Création de l'objet contact qui contiendra les infos du client
let form = document.querySelector('#contact-form');
form.addEventListener('submit', (e) => { // écoute du #contact-form
    event.preventDefault();
    let newcontact = new Contact (      // création d'un nouvel objet contact contenant les coordonnées de l'utilisateur
        document.querySelector('#prenom').value,
        document.querySelector('#nom').value,
        document.querySelector('#adresse').value,
        document.querySelector('#ville').value,
        document.querySelector('#email').value,
    );
    console.log(newcontact);
    localStorage.setItem('contact', JSON.stringify(newcontact));    // stockage de l'objet contact

send();     // appel de la fonction qui envoie les infos au serveur avant validation de la commande

});

//  ************ api fetch POST  - envoi du tableau products et de la fiche contact au serveur
function send() {
    let newcontact = localStorage.getItem('contact'); // récupère l'objet contact
    newcontact = JSON.parse(newcontact);
    let products = localStorage.getItem('products');    // récupère le tableau products
    products = JSON.parse(products);
    // send post request
    fetch(`${apiUrl}api/cameras/order`, {  // envoi des données
        method: 'POST',    
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({            
                contact: {
                     firstName: newcontact.prenom,
                      lastName: newcontact.nom,
                       address: newcontact.adresse,
                       city: newcontact.ville,
                       email: newcontact.email,
                     },
                 products: products,                   
    })
    })
    .then(function(response) {      // réponse du serveur qui contient l'objet contact et l'id de commande
        if(response.ok) {            
            document.querySelector('.submit-order').classList.remove('disabled'); // active la validation de commande 
            alert('vous pouvez valider votre commande'); // notifie l'utilisateur
            response.json()
            
            .then(function(data) {
                getOrder(data);          // appel de la fonction getOrder qui stocke les infos qui seront dispatchés sur la page de confirmation de commande
            console.log(data);     
            })
        }
    })
    .catch(function(){ // gestion de l'erreur serveur
        alert("pas de réponse du serveur")
    });
    };


// **************** sauvegarde des infos reçues du serveur dans le localstorage

function getOrder(data) {
    localStorage.setItem('totalOrder', document.getElementsByClassName('total_price')[0].innerText); // stockage du montant total de la commande
    localStorage.setItem('orderId', JSON.stringify(data.orderId)) ;  // stockage du numéro de commande reçu
    localStorage.setItem('user',data.contact['firstName']);    // stockage du prénom de l'utilisateur pour un message personnalisé
};

loadCartItems();