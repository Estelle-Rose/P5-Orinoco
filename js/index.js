 // Création du tableau contenant les articles du panier

if(localStorage.getItem('items')) {
    console.log('le panier existe')
} else {
    let items = [];
    localStorage.setItem('items', JSON.stringify(items));
    console.log('le panier est vide');
}
let items = JSON.parse(localStorage.getItem('items'));
// Url de l'api
 let url = 'http://localhost:3000/api/cameras/'; // Url pour récupérer la liste de caméras
// Api fetch
fetch(url)
.then(function(response) {
    if(response.ok) {
        response.json()
        .then(function(cameras) {
            showProducts(cameras);
        });
    }
})
.catch(function(){
    alert("pas de réponse du serveur")
});

//Fonction pour créer la liste des produits
function showProducts(cameras) {
    for (let camera of cameras) {            

        // récupération de la div contenant la liste des produits
        let list = document.getElementById('product_list');
        // création des nouveaux éléments du dom
        let listUl = document.createElement('ul');
        let listLi = document.createElement('li');
        let listBox = document.createElement('div');
        let listDiv = document.createElement('div');
        let name = document.createElement('h3');
        let priceDiv = document.createElement('div');
        let price = document.createElement('h4');
        let linkDiv = document.createElement('div');
        let link = document.createElement('a');
        let img = document.createElement('img');
        
        // structure des nouveaux éléments
        list.appendChild(listUl);
        listUl.appendChild(listLi);
        listLi.appendChild(listBox);
        listBox.appendChild(listDiv);  
        listBox.appendChild(img);    
        listDiv.appendChild(name); 
        listDiv.appendChild(priceDiv);
        listDiv.appendChild(linkDiv);   
        priceDiv.appendChild(price);   
        linkDiv.appendChild(link);
        
        // Ajout des attributs et classes aux éléments
        listUl.setAttribute('class','list-group');
        listUl.classList.add('shadow');
        listLi.setAttribute('class','list-group-item');
        listBox.setAttribute('class','media');
        listBox.classList.add ('align-items-lg-center','flex-column','flex-lg-row','p-3');
        listDiv.setAttribute('class','media-body');
        listDiv.classList.add('order-2','order-lg-1');
        name.setAttribute('id','listname');
        name.setAttribute('class','mt-0');
        name.classList.add('font-weight-bold','mb-1');
        priceDiv.setAttribute('class','d-flex');
        priceDiv.classList.add('align-items-center','justify-content-between','mt-1');
        price.setAttribute('class','font-weight-bold');
        price.classList.add('my-2');
        linkDiv.setAttribute('class','text-center');
        link.setAttribute('class','list-group-item');
        link.setAttribute('id', 'lien_fiche');
        link.setAttribute('href', "product.html?_id=" + camera._id);
        link.classList.add('list-group-item-secondary');
        img.setAttribute('class','ml-lg-5');
        img.classList.add('order-1','order-lg-2');    
        
        // Contenu textuel des éléments créés
        name.innerHTML = camera.name;
        price.innerHTML = camera.price / 100 + " €";
        img.setAttribute('src', camera.imageUrl);
        link.innerHTML = "Voir le produit";
        link.setAttribute('id', 'fiche_produit'); // Id du lien vers fiche produit        
        };
        
     
};

// fonction pour afficher le nombre d'articles dans le panier (from localstorage)
function onLoadCartItems() {
    let itemsNumber = localStorage.getItem('cartItems');
    if(itemsNumber) {
        document.querySelector('.cart span').textContent = itemsNumber;
    }
};
onLoadCartItems();

export {url, items, onLoadCartItems};