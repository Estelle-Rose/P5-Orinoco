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

// ************* Création de la class Envoi contenant le tableau et l'objet contact
class Envoi {
    constructor(contact, products) {
        this.contact = contact,
        this.products = products
    }
}

// ************** Création de la class Order pour les infos de confirmation de commande

class Order {
    constructor(totalOrder, idOrder) {
        this.totalOrder = totalOrder,
        this.idOrder = idOrder
    }
}
// ************ Création du tableau products qui contiendra les ids produits pour l'envoi au serveur

//let id = localStorage.getItem('id');
//let quantity = localStorage.getItem('quantity');
let products = [];
let itemsInCart = JSON.parse(localStorage.getItem('cart'));

class Product {
    constructor(id, quantity) {
        this.id = id,
        this.quantity = quantity
    }
}
for( let i = 0; i < itemsInCart.length; i++) {    
    let productsData = new Product (itemsInCart[i].id,itemsInCart[i].quantity);
    localStorage.setItem('productData',JSON.stringify(productsData));
    products.push(productsData);
    localStorage.setItem('products', JSON.stringify(products));
    console.log(products);
}
// ************ Création de l'objet contact qui contiendra les infos du client
let contact;

//  



