const cardContainer = document.querySelector("#cardContainer");
var productsPerPage = 6,
    currentPage = 1,
    pagedResults = [],
    totalProducts = products.length;
function paginate(){
    var end = currentPage * productsPerPage,
        start = end - productsPerPage,
        pagedResults = products.slice(start, end);
    $('#cardContainer').empty();
    $(pagedResults).each(function(index, individualCard){
        $('#cardContainer').append(
    `<div class="card" id="cardNumber${individualCard.id}">
        <img src="${individualCard.image}" alt="${individualCard.description}">
        <div class="cardText">
            <h4>${individualCard.name}</h4>
            <p>${individualCard.description}</p>
            <p>&dollar; ${individualCard.price}</p>
            <button class="cartButton" id=${individualCard.id}>Add to Cart</button>
        </div>
    </div>`);
    });
    if(currentPage <= 1){
        $('.previous').attr('disabled', true);
    }else{
        $('.previous').attr('disabled', false);
    }
    if(currentPage*productsPerPage >=totalProducts){
        $('.next').attr('disabled', true);
    }else{
        $('.next').attr('disabled', false);
    }
}
paginate();
$('.next').click(function(){
    if(currentPage * productsPerPage <= totalProducts){
        currentPage++;
    }
    paginate();
    saveToLocalStorage();
    fadeButtons();
});
$('.previous').click(function(){
    if(currentPage > 1){
        currentPage--;
    }
    paginate();
    saveToLocalStorage();
    fadeButtons();
});
function saveToLocalStorage(){
    let cartButton = document.getElementsByClassName("cartButton");
    for(let i = 0; i < cartButton.length; i++){
        let productButtons = function(){
            let selectedProduct = products.find((product)=> product.id == cartButton[i].id);
            let cartItemSearch = cart.find( (cartItem) => cartItem.id == selectedProduct.id);
            if(cartItemSearch){
                cartItemSearch.quantity++;
            }else{
                cart.push(selectedProduct); 
                }
                localStorage.setItem("CART", JSON.stringify(cart) );
                displayCart();
        }
        
        cartButton[i].addEventListener('click', productButtons ,false);
        
       };
    }
saveToLocalStorage();
function displayCart(){
    clearStorageAndCart();
    sideBarContainer.innerHTML = ""
    cart.forEach(cartItem => {
        sideBarContainer.innerHTML += `
        <div class="tableRow">
            <div class="tableCell">
                ${cartItem.name}
            </div>
            <div class="tableCell">
                &dollar; ${cartItem.price}
            </div>
        </div>
        <div class="tableRow">
            <div class="tableCell borderBottom">
                <input class="quantityNumberInput" type="number" id="${cartItem.id}" value="${cartItem.quantity}" min="1" max="5">
            </div>
                <a id="${cartItem.id}" class="tableCell borderBottom removeLink" href="#">Remove</a>
            </div>
        </div>`
    });
    removeFromCart();
    updateQuantity();
}
displayCart();
let checkoutButton = document.getElementById('checkoutButton');
checkoutButton.addEventListener('click', function(){window.location = 'cart.html'; });