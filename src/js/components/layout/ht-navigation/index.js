import template from './template.html';

// DEPRECATED
class NavigationBar extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = template;
    }
}
customElements.define('ht-navigation', NavigationBar);