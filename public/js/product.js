let apiUrl =(location.hostname === "localhost" || location.hostname === "127.0.0.1")
? "http://localhost:3000/"
: "https://test-orinoco.herokuapp.com/"// ************* fonction pour afficher le nombre d'articles dans le panier (from localstorage) reprise sur chaque page 2 : 
function loadCartItems() {
    let itemsInCart = localStorage.getItem('cartItems');
    if(itemsInCart) {
        document.querySelector('.cart-items').textContent = itemsInCart;
    }
};

// ****************** récupération de l'id produit **********************

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let idProduit = urlParams.get("_id");
let items = JSON.parse(localStorage.getItem('cart'));
if(items === null) {
    let cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));    
    }
//  ********************* fonction création de la carte produit ***********************
async function productCard(camera) {   
    await fetch(`${apiUrl}api/cameras/` + idProduit) // nouvel appel avec l'api fetch avec l'id produit en paramètre
    .then(response => {
        if(response.ok) {
            response.json()        
            .then(camera => {        
            document.getElementById('product_name').textContent = camera.name;      // Nom du produit
            document.getElementById('product_description').textContent = camera.description;        // Description du produit
            document.getElementById('product_price').textContent = camera.price / 100;      // Prix du produit
            document.getElementById('product_img').setAttribute('src', camera.imageUrl);        // Image du produit    
    
            // ************** localstorage des données de la carte produit ***********************
            localStorage.setItem('id', camera._id);
            localStorage.setItem('name', document.getElementById('product_name').textContent);
            localStorage.setItem('img', document.getElementById('product_img').src);
            localStorage.setItem('price', document.getElementById('product_price').textContent);    
            localStorage.setItem('lens', camera.lenses[0]);     // l'objectif est stocké par défaut pour le cas où celui-ci n'est pas sélectionné par l'utilisateur
            localStorage.setItem('quantity', 1);    // La quantité est définie par défaut = 1 pour le cas  où elle n'est pas sélectionnée par l'utilisateur
            lensOption(camera);
            setQty();
            })
            
        }
    })
    .catch(error => { // gestion de l'erreur serveur
    alert("pas de réponse du serveur");
    document.getElementsByClassName('error_message').textContent = 'Veuillez nous excusez pour la gêne occasionnée';
    });  
};

// ******************* Choix de l'objectif *************************

function lensOption(camera) {   
 
let lenses = document.getElementById('lenses');  // manipulation du dom et création des balises option
for (let i = 0; i < camera.lenses.length; i++) { 
    let lensOption = document.createElement('option');
    lensOption.setAttribute('value', camera.lenses[i]);
    lenses.appendChild(lensOption);
    lensOption.setAttribute('value', camera.lenses[i]);
    lensOption.textContent = camera.lenses[i];

    lenses.addEventListener('change', (e) => {      // écoute de l'évènement change
        let lensChoice = document.getElementById('lenses').value;
        localStorage.setItem('lens', lensChoice);       // récupération du choix de l'objectif dans le localstorage
    });   
 };    
};
// ************* Sélectionner la quantité et l'enregistrer dans le localstorage
function setQty() {      
    let qty = parseInt(localStorage.getItem('quantity'));
    let qtyInput = document.querySelector('.item-qty');       
    qtyInput.addEventListener('input', (e) => {                // écoute de l'évènement input                     
        qty = localStorage.setItem('quantity', qtyInput.value);      // stockage de la quantité choisie           
    });                
};

// ******************** Ajout au panier *******************

function getAddBtn() {     
    let addToCartBtn = document.querySelectorAll('.add_to_cart');    
    addToCartBtn.forEach(addToCartBtn => {    
        addToCartBtn.addEventListener('click', () => {    // écoute du clic
            alert(message = 'Article ajouté au panier');
            updateCart();            // Appel de la fonction qui met à jour le panier   
            addItem();      // Appel de la fonction qui crée l'article dans le localstorage             
            
        });
    });    
};

 // ************** fonction qui met à jour le nombre d'articles dans le panier ******************

 function updateCart() {    
    let qty = parseInt(localStorage.getItem('quantity')); // récupère la quantité
    let itemsInCart = localStorage.getItem('cartItems');
    itemsInCart = parseInt(itemsInCart);  
    if(!itemsInCart) {
        localStorage.setItem('cartItems', qty );         // définit le nombre d'articles dans le panier
        document.querySelector('.cart-items').textContent =  qty;   // affiche la quantité
    } else {
        localStorage.setItem('cartItems', itemsInCart + qty);   // s'il y a déjà un article on ajoute la quantité
        document.querySelector('.cart-items').textContent = itemsInCart + qty ;     // affiche la quantité
    }     
};

//  *************** Création de la class Item, chaque article étant un objet ******************

class Item {
    constructor(image, name, lens, price, id, quantity,) {
        this.image = image,
        this.name = name,
        this.lens = lens,
        this.price = price,
        this.id = id, 
        this.quantity = quantity;                    
    }
};
    
//*************** Nouvel article dans le localstorage  ******************
function addItem() {
    let items = JSON.parse(localStorage.getItem('cart'));
    
    // création de l'article sélectionné
    let firstItem = new Item (localStorage.getItem('img'),
    localStorage.getItem('name'),
    localStorage.getItem('lens'),
    localStorage.getItem('price'),
    localStorage.getItem('id'),
    localStorage.getItem('quantity'));    
    
    items.push(firstItem);      // le nouvel article est ajouté au tableau
    localStorage.setItem('cart', JSON.stringify(items));   

};
loadCartItems();
productCard();
getAddBtn();