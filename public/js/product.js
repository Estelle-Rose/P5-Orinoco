import {url, items} from './index.js';


//récupération de l'id produit

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let idProduit = urlParams.get("_id");

// fonction création de la carte produit
function productCard(camera) {
    
    document.getElementById('product_name').textContent = camera.name; // Nom du produit
    document.getElementById('product_description').textContent = camera.description; // Description du produit
    document.getElementById('product_price').textContent = camera.price / 100; // Prix du produit
    document.getElementById('product_img').setAttribute('src', camera.imageUrl); // Image du produit
    
    // localstorage des données de la carte produit
    localStorage.setItem('name', document.getElementById('product_name').textContent);
    localStorage.setItem('img', document.getElementById('product_img').src);
    localStorage.setItem('price', document.getElementById('product_price').textContent);
    localStorage.setItem('id', idProduit);
    localStorage.setItem('lens', camera.lenses[0]);
    localStorage.setItem('quantity', 1);

    // Choix de l'objectif
    let lenses = document.getElementById('lenses');   
    let lensInput = document.createElement('option');
    lenses.appendChild(lensInput);
    
    lensInput.textContent = "Merci de choisir une option";
    for (let i = 0; i < camera.lenses.length; i++) {
        let lensOption = document.createElement('option');
        lensOption.setAttribute('value', camera.lenses[i]);
        lenses.appendChild(lensOption);
        lensOption.setAttribute('value', camera.lenses[i]);
        lensOption.textContent = camera.lenses[i];

        lenses.addEventListener('change', (e) => {
            let lensChoice = document.getElementById('lenses').value;
            localStorage.setItem('lens', lensChoice);
        });
       
     };    

    // Quantité sélectionnée
    let quantity = document.getElementById('quantity'); // balise select quantité sélectionnée    
    quantity.addEventListener('change', (e) => {        
    localStorage.setItem('quantity', e.target.value);
    });  
    
};    


// appel de l'api avec l'id produit en paramètre
fetch(url + idProduit)
.then(function(response) {
    if(response.ok) {
        response.json()
        .then(function(camera) {
            productCard(camera); // appel de la fonction productCard
        });
    }
})
.catch(function(){
    alert("pas de réponse du serveur")
});


// Création de la classe caméra, chaque article étant un objet

class Camera {
    constructor(image, name, lens, price, id, quantity) {
        this.image = image
        this.name = name
        this.lens = lens;
        this.price = price;
        this.id = id;     
        this.quantity = quantity;   
    }
};

//Fonction ajout au panier
function addToCart() {
let item = new Camera ( // création de l'article sélectionné
    localStorage.getItem('img'),
    localStorage.getItem('name'),
    localStorage.getItem('lens'),
    localStorage.getItem('price'),
    localStorage.getItem('id') ,
    localStorage.getItem('quantity')    
);

items.push(item); // ajout de l'article au tableau
localStorage.setItem('items', JSON.stringify(items));
localStorage.setItem('item', JSON.stringify(item));
console.log(items);

};

// Ecoute du bouton ajouter au panier

let addToCartBtn = document.querySelectorAll('.add_to_cart');
for (let i = 0 ; i < addToCartBtn.length; i ++) {
    addToCartBtn[i].addEventListener('click', () => {
        console.log('added to cart');        
        addToCart();            
        updatepanier();  
    });
};

// fonction pour afficher le nombre d'articles dans le panier (from localstorage)
function onLoadCartItems() {
    let nombrearticles = localStorage.getItem('cartItems');
    if(nombrearticles) {
        document.querySelector('.cart span').textContent = nombrearticles;
    }
};


 // fonction qui met à jour le nombre d'articles dans le panier
function updatepanier() {    
   let items = localStorage.getItem('items');
    let nombrePanier = localStorage.getItem('cartItems');
    nombrePanier = parseInt(nombrePanier);
  
    if(nombrePanier) {
        localStorage.setItem('cartItems', nombrePanier + 1 );
        document.querySelector('.cart span').textContent = nombrePanier + 1;
    } else {
        localStorage.setItem('cartItems', 1);
        document.querySelector('.cart span').textContent = 1 ;
    }   
    
};




// Fonction totalCost

function totalPrice(item) {
    let total
    let itemPrice = localStorage.getItem('price');        
    let quantity = localStorage.getItem('quantity');

    itemPrice = parseInt(itemPrice); 
    quantity = parseInt(quantity);
    
    
    localStorage.setItem('totalPrice', itemPrice * quantity);
};


onLoadCartItems();

//export {url, updatepanier};