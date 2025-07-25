if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
}else {
  ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('button-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
      var button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('purchase-btn')[0].addEventListener('click',
      purchaseClicked)
}

function purchaseClicked() {
  alert('Thank you for your Purchase')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  while(cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

function removeCartItem(event){
  var buttonClicked = event.target
          buttonClicked.parentElement.parentElement.parentElement.remove()
          updateCartTotal()
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartTotal()
}



function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement.parentElement
  var title = shopItem.getElementsByClassName('shop-name')[0].innerText
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('shop-item-img')[0].src
  console.log(title, price, imageSrc)
  addItemToCart(title, price, imageSrc)
  updateCartTotal()
}

function addItemToCart(title, price, imageSrc){
  var cartRow = document.createElement('tr')
  cartRow.classList.add('cart-row')
  cartRow.innerText = title
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for(var i = 0; i < cartItemNames.length; i++){
    if (cartItemNames[i].innerText == title) {
      alert('This Item is already added!')
      return
    }
  }
  var cartRowContents = `
          <td><button class="button-danger"><i class="fa-solid fa-trash"></i></button></td>
          <td><img class="cart-item-img" src="${imageSrc}" alt=""></td>
          <td class="cart-item-title">${title}</td>                    
          <td class="cart-price">${price}</td>
          <td><input class="cart-quantity-input" type="number" value="1"></td>`
    cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('button-danger')[0].addEventListener('click',
    removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',
    quantityChanged)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('₱', ''))
    var quantity = quantityElement.value
    total = total +(price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = '₱' + total
}