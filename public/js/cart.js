// ************* fonction pour afficher le nombre d'articles dans le panier (from localstorage) reprise sur chaque page 2 : 
function loadCartItems() {
    let itemsInCart = localStorage.getItem('cartItems');
    if(itemsInCart) {
        document.querySelector('.cart-items').textContent = itemsInCart;
    }
};
loadCartItems();

//  ******************* calcul du prix total
async function totalPrice() {    
    await showItemsInCart(); // appel de la fonction qui affiche les produits dans le panier
    
    let cartTable = document.getElementsByClassName('cart_table')[0]; // récupère le tableau qui affiche les produits du panier
    let cartRows = cartTable.querySelectorAll('.cart-row');     // récupère les rangées du tableau
    let totaldupanier = 0; // total du panier initialisé à zéro
    
    for (let i = 0; i < cartRows.length; i++) {     // pour chaque rangée on calcule le prix total de la rangée et on l'ajoute au total du panier
        let cartRow = cartRows[i];
        let price = cartRow.getElementsByClassName('product_price')[0];
        let qty = cartRow.getElementsByClassName('item-amount')[0].textContent;    
        let pricerow = parseFloat(price.innerText.replace('€', ''));      
        qty = parseInt(qty);    
        totaldupanier = totaldupanier + (pricerow * qty);     
    };
    document.getElementsByClassName('total_price')[0].innerText = totaldupanier + ',00 €';   
};

//  ****************** Affichage des articles dans le tableau page panier
function showItemsInCart() {       
    let items = localStorage.getItem('cart');   // récupère le tableau contenant les articles dans le localstorage
    items = JSON.parse(items);         
    let cartTable = document.querySelector('.cart_table');  // récupère le tableau
  
    // Si le panier est vide message et page vide 
    let itemsInCart = localStorage.getItem('cartItems');
    if (itemsInCart === null) {
        document.querySelector('.cart-container').style.display = 'none';
        document.querySelector('.panier-title').classList.add('mt-5');
        document.querySelector('.panier-title').textContent = 'Votre panier est vide';
    } else { // Implémentation des produits, on ajoute une ligne au tableau à chaque article et chaque valeur de l'article  est inséré dans le code html               
            
            for (let i = 0; i < items.length; i++) {
   
                cartTable.innerHTML += `    <tr class=" border-bottom cart-row">
                                                <td scope="col" class="border-0 align-middle">
                                                    <div class="p-2">                                                                           
                                                        <img  src="${items[i].image}" alt="" width="70" class="img-fluid rounded shadow-sm product_cart_img">
                                                        <h5 class="mb-0 product_cart_name">${items[i].name}</h5>
                                                
                                                    </div>
                                                </td>
                                                <td scope="col" class="border-0  align-middle">
                                                    <strong class="product_cart_lens">${items[i].lens}</strong>
                                                </td>   
                                                <td scope="col" class="border-0  align-middle">
                                                    <strong class="product_price">${items[i].price},00€</strong>
                                                </td>                                
                                                <td scope="col" class="border-0 align-middle">
                                                    
                                                    <strong class="item-amount">${items[i].quantity}</strong>                                                                        
                                                </td> 
                                                <td scope="col" class="border-0  align-middle">
                                                    <strong class="cart_price">${items[i].price * items[i].quantity},00€</strong>
                                                </td>                                                 
                                                
                                            </tr>`;
                                                                            
            }      
    }
 
                
};

//  ***************** Vider le panier
let clearCart = document.querySelector('.clear-cart'); // sélectionne le bouton
clearCart.addEventListener ('click', (e) => { // écoute du clic
    localStorage.clear(); // vide la localstorage
    location.reload(); // recharge la page
})


loadCartItems();   

totalPrice(); // appel de la fonction qui calcule le total du panier