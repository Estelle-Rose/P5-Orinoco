// ****************** récupération de l'id produit **********************

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let idProduit = urlParams.get("_id");
let items = JSON.parse(localStorage.getItem('cart'));
if(items === null) {
    let cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));    
    }
let cart = localStorage.getItem('cart'); 
//  ***************** appel de l'api avec l'id produit en paramètre ***************
fetch('http://localhost:3000/api/cameras/' + idProduit)
.then(function(response) {
    if(response.ok) {
        response.json()        
        .then(function(camera) {
            //console.log(camera)
            productCard(camera); // appel de la fonction productCard            
        });
    }
})
.catch(function(){
    alert("pas de réponse du serveur")
});

//  ********************* fonction création de la carte produit ***********************
function productCard(camera) {    
      
    document.getElementById('product_name').textContent = camera.name; // Nom du produit
    document.getElementById('product_description').textContent = camera.description; // Description du produit
    document.getElementById('product_price').textContent = camera.price / 100; // Prix du produit
    document.getElementById('product_img').setAttribute('src', camera.imageUrl); // Image du produit    
    
    // ************** localstorage des données de la carte produit ***********************
    localStorage.setItem('id', camera._id);
    localStorage.setItem('name', document.getElementById('product_name').textContent);
    localStorage.setItem('img', document.getElementById('product_img').src);
    localStorage.setItem('price', document.getElementById('product_price').textContent);    
    localStorage.setItem('lens', camera.lenses[0]);
    localStorage.setItem('quantity',1);
    let price = localStorage.getItem('price');
    price = parseInt(price);
    let quantity = localStorage.getItem('quantity');       
    quantity = parseInt(quantity);    
    
    lensOption(camera);
    getAddBtn();   
};    

// ******************* Choix de l'objectif *************************

function lensOption(camera) {
let lenses = document.getElementById('lenses');   

for (let i = 0; i < camera.lenses.length; i++) {
    let lensOption = document.createElement('option');
    lensOption.setAttribute('value', camera.lenses[i]);
    lenses.appendChild(lensOption);
    lensOption.setAttribute('value', camera.lenses[i]);
    lensOption.textContent = camera.lenses[i];

    lenses.addEventListener('change', (e) => {
        let lensChoice = document.getElementById('lenses').value;
        localStorage.setItem('lens', lensChoice); // récupération du choix de l'objectif dans le localstorage
    });   
 };    
};

// ******************** Ajout au panier *******************

function getAddBtn() {    
    let addToCartBtn = document.querySelectorAll('.add_to_cart');    
    addToCartBtn.forEach(addToCartBtn => {     
        addToCartBtn.addEventListener('click', () => {   
            updatepanier();            // Met à jour le panier   
            addItem();  // Ajoute l'article dans le localstorage
            addToCartBtn.setAttribute('disabled', true); // Désactive le bouton ajout et affiche 'ajouté au panier
            addToCartBtn.textContent = 'Article ajouté au panier';                                                  
        });
    });
};

 // ************** fonction qui met à jour le nombre d'articles dans le panier ******************

 function updatepanier() {    
    
    let itemsInCart = localStorage.getItem('cartItems');
    itemsInCart = parseInt(itemsInCart);  
    if(itemsInCart) {
        localStorage.setItem('cartItems', itemsInCart + 1 );
        document.querySelector('.cart-items').textContent = itemsInCart + 1;
    } else {
        localStorage.setItem('cartItems', 1);
        document.querySelector('.cart-items').textContent = 1 ;
    }     
};

//  *************** Création de la class Item, chaque article étant un objet ******************

class Item {
    constructor(image, name, lens, price, id, quantity, totalItemCost) {
        this.image = image,
        this.name = name,
        this.lens = lens,
        this.price = price,
        this.id = id, 
        this.quantity = quantity,
        this.totalItemCost = totalItemCost;                    
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
    items.push(firstItem);
    localStorage.setItem('cart', JSON.stringify(items));       
};


// fonction pour charger le nombre d'articles dans le panier sur toutes les pages(from localstorage)
function onLoadCartItems() {
    let itemsInCart = localStorage.getItem('cartItems');
    if(itemsInCart) {
        document.querySelector('.cart-items ').textContent = itemsInCart;
    }
};
onLoadCartItems();

export { updatepanier};
