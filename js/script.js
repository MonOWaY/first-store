"use strict"

import { addToCart, renderCart, clearCart as clearCartFunc } from "./cart.js";

const addCart = document.querySelectorAll('.product__addcart');
const cart = document.getElementById('cart');
const clearCart = document.getElementById('cart-clear');
const cartContent = document.getElementById('cart-content');
const closeCart = document.getElementById('cart-close');
const cartIcon = document.getElementById('cart-icon');

cartIcon.addEventListener('click',() =>{
    renderCart(cartContent)
    cart.style.display = 'flex';
    document.documentElement.style.overflow = 'hidden';
})

closeCart.addEventListener('click',() =>{
    cart.style.display = 'none';
    document.documentElement.style.overflow = 'auto';
})

addCart.forEach((btn) =>{
    btn.addEventListener('click',(event) => addToCart(event, ".product__title" , ".product__price span"))
})

clearCart.addEventListener('click',() => clearCartFunc(cartContent))
