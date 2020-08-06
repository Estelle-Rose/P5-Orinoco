// ****************** récupération de l'id produit **********************

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let idProduit = urlParams.get("_id");

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
    getAddBtn(camera);   
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

function getAddBtn(camera) {
    let items = localStorage.getItem('cart');
    let addToCartBtn = document.querySelectorAll('.add_to_cart');    
    addToCartBtn.forEach(addToCartBtn => {     
        addToCartBtn.addEventListener('click', () => {   
            console.log('added to cart');   
            updatepanier();              
            createItem();                                       
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

//*************** Nouvel article ou ajout de la quantité si article existant  ******************

function createItem() {
    let itemId = idProduit;
    let lensChoice = localStorage.getItem('lens');    
    let items = JSON.parse(localStorage.getItem('cart'));
    if (items === null) { // si c'est le premier article sélectionné et ajouté, on créé un premier article et on l'ajoute au tableau du panier
        let cart = [];
        // création de l'article sélectionné
        let firstItem = new Item (localStorage.getItem('img'),
        localStorage.getItem('name'),
        localStorage.getItem('lens'),
        localStorage.getItem('price'),
        localStorage.getItem('id'),
        localStorage.getItem('quantity'));           
        cart.push(firstItem);
        localStorage.setItem('cart', JSON.stringify(cart));   // l'article est dans le localsotrage 
       
    } else { // On vérifie si le produit a déjà été ajouté, si oui on ajoute + 1 à la quantité de l'article
        let newItem = JSON.parse(localStorage.getItem('cart'));
        let itemAdded = false;
        for (let i in newItem ) {
            if ((newItem[i].id + newItem[i].lens) === (itemId + lensChoice)) { // On check l'id du produit et l'objectif sélectionné
                itemAdded = true;
                let quantity = localStorage.getItem('quantity');
                quantity = parseInt(quantity);         
                newItem[i].quantity = parseInt(newItem[i].quantity);
                localStorage.setItem('quantity', newItem[i].quantity += 1);
            }
        }

        if (!itemAdded) { // Si le produit n'a pas déjà été ajouté on ajoute un deuxième article
            newItem.push(new Item( 
                localStorage.getItem('img'),
                localStorage.getItem('name'),
                localStorage.getItem('lens'),
                localStorage.getItem('price'),
                localStorage.getItem('id'),
                localStorage.getItem('quantity')));
        }
        localStorage.setItem('cart', JSON.stringify(newItem));
        
    }
    
};


/*function totalCost( item, action ) {
    let totaldupanier = localStorage.getItem("totalCart");

    if( action) {
        totaldupanier = parseInt(totaldupanier);

        localStorage.setItem("totalCart", totaldupanier - item.price);
    } else if(totaldupanier != null) {
        
        totaldupanier = parseInt(totaldupanier);
        localStorage.setItem("totalCart", totaldupanier + item.price);
    
    } else {
        localStorage.setItem("totalCart", item.price);
    }
}*/


// fonction pour charger le nombre d'articles dans le panier sur toutes les pages(from localstorage)
function onLoadCartItems() {
    let itemsInCart = localStorage.getItem('cartItems');
    if(itemsInCart) {
        document.querySelector('.cart-items ').textContent = itemsInCart;
    }
};
onLoadCartItems();

export { updatepanier};
