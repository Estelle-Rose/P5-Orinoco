// Variables et fonctions
import {onLoadCartItems} from './index.js'; 


// ************* Crétaion de la class contact contenant les infos client requis

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

let products = []; 
let itemsInCart = JSON.parse(localStorage.getItem('cart'));
for( let i = 0; i < itemsInCart.length; i++) {   
    products.push(itemsInCart[i].id);
    localStorage.setItem('products', JSON.stringify(products));    
};

// ************** Création de la class Order pour les infos de confirmation de commande

class Order {
    constructor(totalOrder, idOrder) {
        this.totalOrder = totalOrder,
        this.idOrder = idOrder
    }
}

// ************ Création de l'objet contact qui contiendra les infos du client
let sendFormBtn = document.querySelector('.submit-form');
sendFormBtn.addEventListener('click', (e) => {
    event.preventDefault();
    let newcontact = new Contact (
        document.querySelector('#prenom').value,
        document.querySelector('#nom').value,
        document.querySelector('#adresse').value,
        document.querySelector('#ville').value,
        document.querySelector('#email').value,
    );
    console.log(newcontact);
    localStorage.setItem('contact', JSON.stringify(newcontact)); 

send();

});

// fetch post  - envoi du tableau products etde la fiche contact au serveur
function send() {
    let newcontact = localStorage.getItem('contact');
    newcontact = JSON.parse(newcontact);
    let products = localStorage.getItem('products');
    products = JSON.parse(products);
    console.log(products);
    // send post request
    fetch('http://localhost:3000/api/cameras/order', {
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
    .then(function(response) {
        if(response.ok) {
            
            document.querySelector('.submit-order').classList.remove('disabled');
            response.json()
            .then(function(data) {
                getOrder(data);           
            console.log(data);     
            })
        }
    })
    .catch(function(){
        alert("pas de réponse du serveur")
    });
    };

// **************** Get order

function getOrder(data) {
    let newOrder = new Order (document.getElementsByClassName('total_price')[0].innerText, data.orderId);   
    localStorage.setItem('totalOrder', document.getElementsByClassName('total_price')[0].innerText);
    localStorage.setItem('orderId', JSON.stringify(data.orderId)) ;  
      
};

// ************** Validation commande

    
let submitBtns = document.querySelector('.submit-order');
document.querySelector('.order-id').textContent = localStorage.getItem('orderId');
document.querySelector('.order-total').textContent  = parseInt(localStorage.getItem('totalOrder'))+ ',00€';         
             
            //localStorage.clear();
   
    
    



onLoadCartItems();