"use strict"

const KEY = 'cart12345$^YJY'
//Записываем данные в хранилище
function setCartData(obj) {
    localStorage.setItem(KEY, JSON.stringify(obj))
}
// Получаем данные из хранилища
function getCartData() {
    return JSON.parse(localStorage.getItem(KEY))
}
// Очищаем корзину
export function clearCart(cart, elem) {
    localStorage.removeItem(KEY);
    renderCart(cart, elem);
    setItemCount(elem);
}
// Добавляем товар в корзину
export function addToCart(event, title, price, elem) {
    const target = event.target;
    target.disabled = true;
    const cartData = getCartData() || {};
    const itemID = target.dataset.id;
    const parent = target.parentElement;
    const itemTitle = parent.querySelector(title).textContent; //textContent получаем текст из product__title
    const itemPrice = parent.querySelector(price).textContent;
    const itemImg = parent.querySelector('img').src;
    if (!cartData.hasOwnProperty(itemID)) {
        cartData[itemID] = [itemImg, itemTitle, itemPrice];
    }
    setCartData(cartData);
    target.disabled = false;
    setItemCount(elem);
}

// Выводим корзину на экран

export function renderCart(cart, elem) {
    const cartData = getCartData();
    let totalItems;
    if (!cartData || Object.keys(cartData).length === 0) {
        totalItems = "Корзина пуста";
    } else {
        totalItems = `<table class = "cart__table"><thead><tr><th>Название</th><th>Цена</th><th></th></tr></thead><tbody>`;
        for (const id in cartData) {
            totalItems += "<tr>";
            for (let i = 0; i < cartData[id].length; i++) {
                totalItems += (i === 0) ? `<td><img class="cart__img" src=${cartData[id][i]}></td>` : `<td>${cartData[id][i]}</td>`
            }
            totalItems += `<td><button class = "product__delete" data-id = ${id}>Delete</button></td></tr>`;
        }
        totalItems += `</tbody></table>`;
    }
    cart.innerHTML = totalItems;
    addEventDeleteItemCart(cart, elem);
}

// Удаляем товар

function deleteItemCart(e, cart, elem) {
    const cartData = getCartData();
    delete cartData[e.target.dataset.id];
    setCartData(cartData);
    renderCart(cart, elem);
    setItemCount(elem);
}

// Добовляем событие для удаления товара
function addEventDeleteItemCart(cart, elem) {
    const deleteItem = document.querySelectorAll(".product__delete");
    deleteItem.forEach((btn) => {
        btn.addEventListener('click', (e) => deleteItemCart(e, cart, elem))
    })
}

// Счётчик товаров
export function setItemCount(elem) {
    const cartData = getCartData();
    elem.textContent = cartData ? Object.keys(cartData).length : 0;
}
