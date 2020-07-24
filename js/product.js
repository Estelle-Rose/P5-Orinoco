//
let url = 'http://localhost:3000/api/cameras/';
// ID produit
let idProduct = "";

//récupération de l'id produit

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);

function getOneProduct(url) {
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

async function productCard (response) {
    response = await getOneProduct(url + urlParams.get("_id")); 
       document.getElementById('product_name').innerHTML = response.name;
       document.getElementById('product_description').innerHTML = response.description;
       document.getElementById('product_price').textContent = response.price / 100 + ' €';
       document.getElementById('product_img').setAttribute('src', response.imageUrl);


let addToCartBtn = document.getElementById('cart_button');
addToCartBtn.addEventListener('click', (e)=> {
    localStorage.setItem("name", response.name );
    localStorage.setItem('price', response.price);
    localStorage.setItem('id', response._id);
    localStorage.setItem('image', response.imageUrl);
    console.log(localStorage.getItem('name'));

});
};
productCard();

// cart

