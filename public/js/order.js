// ************* Afficher le numéto d'id de la commande et le total, et remercier l'utilisateur

function displayOrderInfo() {
    let orderId = JSON.parse(localStorage.getItem('orderId'));
    document.querySelector('.user').textContent = localStorage.getItem('user') + ' nous vous remercions pour votre commande'+ ' numéro ' + orderId + ' pour un total de ' + parseInt(localStorage.getItem('totalOrder'))+ ',00€';
    
    localStorage.clear(); // le localstorage est vidé pour une nouvelle commande possible
};
window.onload = displayOrderInfo(); // au chargement de la page appel de la fonction displayOrderInfo
