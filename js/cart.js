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
export function clearCart(cart) {
    localStorage.removeItem(KEY)
    renderCart(cart)
}
// Добавляем товар в корзину
export function addToCart(event, title, price) {
    const target = event.target;
    target.disabled = true;
    const cartData = getCartData() || {};
    const itemID = target.dataset.id;
    const parent = target.parentElement;
    const itemTitle = parent.querySelector(title).textContent; //textContent получаем текст из product__title
    const itemPrice = parent.querySelector(price).textContent;
    if (!cartData.hasOwnProperty(itemID)) {
        cartData[itemID] = [itemTitle, itemPrice];
    }
    setCartData(cartData);
    target.disabled = false;
}

// Выводим корзину на экран

export function renderCart(cart) {
    const cartData = getCartData();
    let totalItems;
    if (!cartData || Object.keys(cartData).length === 0) {
        totalItems = "Корзина пуста";
    } else {
        totalItems = `<table><thead><tr><th>Название</th><th>Цена</th></tr></thead><tbody>`;
        for (const id in cartData) {
            totalItems += "<tr>";
            for (const item of cartData[id]) {
                totalItems += `<td class = "cart_product_name">${item}</td>`;
            }
            totalItems += `<td><button class = "product__delete" data-id = ${id}>Delete</button></td></tr>`;
        }
        totalItems += `</tbody></table>`;
    }
    cart.innerHTML = totalItems;
    addEventDeleteItemCart(cart);
}

// Удаляем товар

function deleteItemCart(e, cart) {
    const cartData = getCartData();
    delete cartData[e.target.dataset.id];
    setCartData(cartData)
    renderCart(cart)
}

// Добовляем событие для удаления товара
function addEventDeleteItemCart(cart) {
    const deleteItem = document.querySelectorAll(".product__delete");
    deleteItem.forEach((btn) => {
        btn.addEventListener('click', (e) => deleteItemCart(e, cart))
    })
}