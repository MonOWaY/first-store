"use strict"

import { addToCart, renderCart, clearCart as clearCartFunc, setItemCount } from "./cart.js";
import { HeaderMenu } from "./HeaderMenu.js";

customElements.define("header-menu", HeaderMenu)

const addCart = document.querySelectorAll('.product__addcart');
const cart = document.getElementById('cart');
const clearCart = document.getElementById('cart-clear');
const cartContent = document.getElementById('cart-content');
const closeCart = document.getElementById('cart-close');
const cartIcon = document.getElementById('cart-icon');
const itemCount = document.getElementById('item-count');

cartIcon.addEventListener('click',() =>{
    renderCart(cartContent, itemCount)
    cart.style.display = 'flex';
    document.documentElement.style.overflow = 'hidden';
})

closeCart.addEventListener('click',() =>{
    cart.style.display = 'none';
    document.documentElement.style.overflow = 'auto';
})

addCart.forEach((btn) =>{
    btn.addEventListener('click',(event) => addToCart(event, ".product__title" , ".product__price span", itemCount))
})

clearCart.addEventListener('click',() => clearCartFunc(cartContent, itemCount))

setItemCount(itemCount);