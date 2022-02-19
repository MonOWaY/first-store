"use strict"

export class HeaderMenu extends HTMLElement{
    // Вызываем метод при добавлении элемента в документ
    connectedCallback(){
        this.innerHTML = `
        <header class="header">
        <nav class="navigation">
            <ul class="menu">
                <li><a href=${this.getAttribute("link-home-href")}>Home</a></li>
                <li><a href=${this.getAttribute("link-categories-href")}>Categories</a></li>
                <li><a href=${this.getAttribute("link-contacts-href")}>Contacts</a></li>
            </ul>
        </nav>
        <div class="cart-icon" id="cart-icon">
            <span id="item-count"></span>
        </div>
    </header>
        `
    }
}