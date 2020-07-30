// Variables et fonctions
import {url, onLoadCartItems} from './index.js';
//import {updatepanier} from './product.js';

// Affichage des articles dans le tableau page panier
function showItemsInCart() {
    let item = localStorage.getItem('item');
    item = JSON.parse(item);
    console.log(item);
    let items = localStorage.getItem('items');
    items = JSON.parse(items);
    console.log(items);
    let cartContainer = document.querySelector('.cart-container');
    let cartTable = document.querySelector('.cart_table');


    items.forEach((item) => {
    
        cartTable.innerHTML += `    <tr class=" border-bottom cart-row">
                                        <td scope="col" class="border-0 align-middle">
                                            <div class="p-2">                                                                           
                                                <img  src="${item.image}" alt="" width="70" class="img-fluid rounded shadow-sm product_cart_img">
                                                <h5 class="mb-0 product_cart_name">${item.name}</h5>
                                        
                                            </div>
                                        </td>
                                        <td scope="col" class="border-0  align-middle">
                                            <strong class="product_cart_lens">${item.lens}</strong>
                                        </td>   
                                        <td scope="col" class="border-0  align-middle">
                                            <strong class="product_cart_price">${item.price},00€</strong>
                                        </td>                                
                                        <td scope="col" class="border-0 align-middle product_quantity">
                                            <!--Quantity input button-->
                                            <div class="form-group col-xs-1">
                                                <input class="cart-quantity-input" type="number" min="1" value="${item.quantity}">           
                                            </div>
                                        </td> 
                                        
                                        <td scope="col" class="border-0 align-middle"><button class="btn btn-danger" type="button">Remove</button</td>
                                    </tr>`;
    
   
    // fonction remove element

   let removeBtns = document.getElementsByClassName('btn-danger');
   console.log(removeBtns);
   for (let i = 0; i < removeBtns.length; i++) {
    let items = localStorage.getItem('items');
       let button = removeBtns[i];
        button.addEventListener('click', function() {
            console.log('clicked');
            let buttonClicked = event.target;
            buttonClicked.parentElement.parentElement.remove();
            localStorage.removeItem(items[i]);
            updateCartTotal();
        });
   };
        
    });
    
};
// TotalPrice



function totalPrice(item) {
    
    let itemPrice = localStorage.getItem('price');        
    let quantity = localStorage.getItem('quantity');

    itemPrice = parseInt(itemPrice); 
    quantity = parseInt(quantity);
    
    
    localStorage.setItem('totalPrice', itemPrice * quantity);
};


// Fonction updateCartTotal
function updateCartTotal() {
    
    let cartTable = document.getElementsByClassName('cart-table');
    let cartRows = document.getElementsByClassName('cart_row');
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceItem = cartRow.getElementsByClassName('product_cart_price')[0];
        let quantityItem = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let price = priceItem.innerHTML;
        console.log(price)
    
    }
    };

onLoadCartItems();

showItemsInCart();