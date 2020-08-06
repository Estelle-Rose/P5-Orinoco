// Variables et fonctions
import {onLoadCartItems} from './index.js'; import {updatepanier} from './product.js';
// calcul du prix total
function totalPrice() {    
    let items = localStorage.getItem('cart');
    items = JSON.parse(items);
    let cartTable = document.getElementsByClassName('cart_table')[0];
    let cartRows = cartTable.querySelectorAll('.cart-row');
    let totaldupanier = 0;
    console.log(cartRows);
    for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let price = cartRow.getElementsByClassName('product_price')[0];
    let qty = cartRow.getElementsByClassName('item-amount')[0];
    let pricerow = parseFloat(price.innerText.replace('€', ''));
    console.log(pricerow)
    let quantity = parseFloat(qty.innerText);
    
    totaldupanier = totaldupanier + (pricerow * quantity);
    console.log(totaldupanier);
    
    };
    document.getElementsByClassName('total_price')[0].innerText = totaldupanier + ',00 €';
    
};



// Affichage des articles dans le tableau page panier
function showItemsInCart() {
    //let item = localStorage.getItem('item');
    //item = JSON.parse(item);
    
    let items = localStorage.getItem('cart');
    items = JSON.parse(items);     
    let cartContainer = document.querySelector('.cart-container');
    let cartTable = document.querySelector('.cart_table');
    
    
 
  
    // Si le panier est vide message et page vide (manque lien accueil)
    if (items === null) {
        document.querySelector('.cart-container').style.display = 'none';
        document.querySelector('.panier-title').textContent = 'Votre panier est vide';
    } else { // Implémentation des produits, on ajoute une ligne au tableau à chaque item
                   
            
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
                                                    <!--Quantity input button-->                                                 
                                                    <strong class="item-amount ">${items[i].quantity}</strong>
                                                </td> 
                                                <td scope="col" class="border-0  align-middle">
                                                    <strong class="cart_price">${items[i].price * items[i].quantity},00€</strong>
                                                </td>                                                 
                                                
                                            </tr>`;
                                            
            }                     
             
            
    }
 
totalPrice();    


};  

// Vider le panier
let clearCart = document.querySelector('.clear-cart');
clearCart.addEventListener ('click', (e) => {
    localStorage.clear();
    location.reload();
})


onLoadCartItems();
showItemsInCart();