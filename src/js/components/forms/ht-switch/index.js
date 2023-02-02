import template from './template.html';

class Component extends HTMLElement {
    constructor(){ 
        super();
    }

    connectedCallback(){
        this.innerHTML = template;
    }
}
customElements.define('ht-switch', Component);

