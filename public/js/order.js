// ************* Afficher le numéto d'id de la commande et le total

function displayOrderinfo() {
    document.querySelector('.order-id').textContent = localStorage.getItem('orderId');
    document.querySelector('.order-total').textContent  = parseInt(localStorage.getItem('totalOrder'))+ ',00€'; 
    localStorage.clear();
};
window.onload = displayOrderinfo();
