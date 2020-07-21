// Récupération des cameras avec Appel de l'API avec fetch

const getProducts = async function() {
    try {
        let response = await fetch('http://localhost:3000/api/cameras/')
        if (response.ok) {
        let cameras = await response.json();
        console.log(cameras) ;
        showProducts(cameras);
        }
        else {
            console.error('retour du serveur : ', response.status)
            let divError = document.createElement('div');
            let main = document.getElementById('main');
            main.appendChild(divError);
            divError.innerHTML = alert('Erreur du serveur, merci de nous excusez pour la gêne occasionnée');
        }
        
    } catch (error) {
        console.log(error)
    }

};
getProducts();

// Fonction showProdutcs pour afficher les produits sur la page index.html
function showProducts(cameras) {
    console.log(cameras);
    for (i = 0; i < cameras.length; i++) {        
   
           
    // récupération de la div contenant la liste des produits
    let list = document.getElementById('product-list');
    // création du modèle products list et insertion des données récupérées
    list.innerHTML += `
        <ul class="list-group shadow">                    
                <li class="list-group-item">                    
                <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                    <div class="media-body order-2 order-lg-1">
                    <h3 class="mt-0 font-weight-bold mb-1">${cameras[i].name}</h3>
                    
                    <p class="card-text lenses medium">
                    Deux objectifs disponibles                           
                    </p>
                    <div class="d-flex align-items-center justify-content-between mt-1">
                        <h4 class="font-weight-bold my-2">${cameras[i].price} €</h6>                        
                            
                        
                    </div>
                    <div class="text-center">
                    <a href="product.html" class="list-group-item list-group-item-secondary" id="fiche_produit">Voir le produit</a>
                            </div>
                    </div><img src=${cameras[i].imageUrl} alt="Generic placeholder image" class="ml-lg-5 order-1 order-lg-2">
                </div>
                <!-- End -->
                </li>
        </ul>
        `;
        
    };    
};     

// Récupération de la div contenant la product card
const card = document.getElementById('product-card');

//création du modèle product card
       card.innerHTML += `
            
            <div class="card d-flex ">        
                <div class="product-image d-flex justify-content-center">
                    <img src =${cameras[i].imageUrl}>
                </div>                    
                <div class="card-body">                        
                    <h4 class="card-title font-weight-bold mb-2 name">${cameras[i].name}</h4>                        
                    <p class="card-text description">${cameras[i].description}. </p>                        
                    <p class="card-text lenses">
                        Deux objectifs disponibles                           
                    </p>                        
                </div>
                <div class="card-footer bg-transparent ">
                    <div class="price d-flex justify-content-between"><span>Prix</span><strong>${cameras[i].price}</strong></div>
                    <div class="text-right">
                        <button class="btn btn-block btn-primary text-center">
                        Fiche produit
                        <i class="lnr lnr-chevron-right pl-2"></i>
                        </button>
                    </div> 
                </div>
            </div>
                
        `;