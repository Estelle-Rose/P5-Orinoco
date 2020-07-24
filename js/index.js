

 let url = 'http://localhost:3000/api/cameras/';
 let idProduct = "";
 //récupération de l'id produit

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);


// Fonction pour récevoir les produits de l'api//
function getProducts(url) {
    return new Promise ((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
            resolve(JSON.parse(this.responseText));
            console.log('OK');
            } else {
                console.log('NOT OK');
                reject(document.getElementById('error_message').innerHTML = 'Veuillez nous excuser pour la gêne occasionnée');
            }    
}
    };
request.open("GET", url);
request.send();
});
};



// Affichage des produits dans la liste
function showProducts() {
getProducts(url).then(function(response) {  
           
    response.forEach(response => {              
              
        idProduct = response._id; 
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
        link.setAttribute('href', "product.html?_id=" + idProduct);
        link.classList.add('list-group-item-secondary');
        img.setAttribute('class','ml-lg-5');
        img.classList.add('order-1','order-lg-2');    
        
        // Contenu textuel des éléments créés
        name.innerHTML = response.name;
        price.innerHTML = response.price / 100 + " €";
        img.setAttribute('src', response.imageUrl);
        link.innerHTML = "Voir le produit";
        link.setAttribute('id', 'fiche_produit'); // Id du lien vers fiche produit        
        });
        });
    };
    showProducts();
    