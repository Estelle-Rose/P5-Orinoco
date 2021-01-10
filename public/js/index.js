let apiUrl =(location.hostname === "localhost" || location.hostname === "127.0.0.1")
? "http://localhost:3000/"
: "https://test-orinoco.herokuapp.com/"
// ************* Fonction pour créer la liste des produits
async function showProducts() {
    await fetch(`${apiUrl}api/cameras/` ) // Récupérer la liste des produits avec la fonction fetch qui effectue une requête GET
    .then(response => { // fetch renvoie une promesse et une réponse ici le fichier au format json
        if(response.ok) {
            response.json()            
            .then(function(cameras) {
                console.log(cameras)
                for (let camera of cameras) {      // Pour chaque camera on crée une div avec les infos de chaque camera      

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
                    linkDiv.classList.add('w-50', 'mt-3');
                    link.setAttribute('class','list-group-item');        
                    link.setAttribute('href', "product.html?_id=" + camera._id); // implémentation de l'id du produit qui servira pour la page produit
                    link.classList.add('list-group-item-secondary');
                    img.setAttribute('class','ml-lg-5');
                    img.classList.add('order-1','order-lg-2');    
                    
                    // Contenu textuel des éléments créés
                    name.innerHTML = camera.name;
                    price.innerHTML = camera.price / 100 + " €";
                    img.setAttribute('src', camera.imageUrl);
                    link.innerHTML = "Voir le produit";        
                    }; 
                // appel de la fonction showProducts qui affichera les produits à réception des données
            });
        }
    })    
    .catch(error =>{ // Gestion de l'erreur côté serveur
    alert("pas de réponse du serveur");
    document.getElementById('error_message').textContent = 'Veuillez nous excusez pour la gêne occasionnée';

    });
};

// ************* fonction pour afficher le nombre d'articles dans le panier (from localstorage) reprise sur chaque page 2 : 
function loadCartItems() {
    let itemsInCart = localStorage.getItem('cartItems');
    if(itemsInCart) {
        document.querySelector('.cart-items').textContent = itemsInCart;
    }
};
showProducts();
loadCartItems();

