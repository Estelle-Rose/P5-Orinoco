// Variables et fonctions
import {onLoadCartItems} from './index.js';
import {updatepanier} from './product.js';
// Fonction totalPrice

// Affichage des articles dans le tableau page panier
function showItemsInCart() {
    //let item = localStorage.getItem('item');
    //item = JSON.parse(item);
    
    let items = localStorage.getItem('cart');
    items = JSON.parse(items);     
    let cartContainer = document.querySelector('.cart-container');
    let cartTable = document.querySelector('.cart_table');
    let priceContainer = document.querySelector('.price-container');
    let totalCartPrice = 0;
    totalCartPrice = parseInt(totalCartPrice);
    if (items === null) {
        document.querySelector('.cart-container').style.display = 'none';
        document.querySelector('.panier-title').textContent = 'Votre panier est vide';
    } else {

        let totalItemCost = localStorage.getItem('totalItemCost');
       
        
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
                                            <td scope="col" class="border-0 align-middle product_quantity">
                                                <!--Quantity input button-->
                                                <div class=" col-xs-1 d-flex justify-content-around bloc-quantity ">
                                                    <i class="fas fa-chevron-left"></i>
                                                    <p class="item-amount">${items[i].quantity}</p>
                                                    <i class="fas fa-chevron-right"></i>
                                                </div>
                                            </td> 
                                            <td scope="col" class="border-0  align-middle">
                                                <strong class="product_cart_price">${items[i].totalItemCost},00€</strong>
                                            </td>  
                                            
                                            <td scope="col" class="border-0 align-middle"><button class="btn btn-danger" type="button">Remove</button</td>
                                        </tr>`;
    }
    
        

removeItems();
        
    
   
    // fonction remove element
function removeItems() {
    let removeBtns = document.getElementsByClassName('btn-danger');
    let itemsInCart = localStorage.getItem('cartItems');
    let items = localStorage.getItem('cart');
    items = JSON.parse(items);
    let selectedItem;
    console.log(items);
   for (let i = 0; i < removeBtns.length; i++) {       
       let button = removeBtns[i];
        button.addEventListener('click', function() {
            
            let buttonClicked = event.target;
            buttonClicked.parentElement.parentElement.remove();   
            localStorage.setItem('cartItems', itemsInCart - selectedItem.quantity);  
            delete items[selectedItem]   ;  
            localStorage.setItem('cart', JSON.stringify(items));
            location.reload();
            
        });
   };
   updateCartTotal();
        
    };
}; 
    
};

function updateCartTotal() {
	let cartTable = document.querySelector('.cart_table')[0];
   let cartRows =  document.getElementsByClassName('cart-row');
   let total = 0;
    for (let i = 0; i < cartRows.length; i++) {    
        let cartRow = cartRows[i];
        let itemPrice = document.getElementsByClassName('product_price')[0];
        let itemQty = document.getElementsByClassName('item-amount')[0];
        let price = parseFloat(itemPrice.innerText.replace('€', ''));
        let qty = parseFloat(itemQty.innerText);
        total = total + (price * qty);
        console.log(total);
    }
document.getElementsByClassName('total_price')[0].innerText = total;

};





onLoadCartItems();

showItemsInCart();