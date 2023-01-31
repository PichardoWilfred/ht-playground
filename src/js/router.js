class RouterView extends HTMLElement {
    constructor(){
        super();
        this.template = document.createElement('div');
        this.template.innerHTML = home;
        this.path = this.getAttribute("path");
    }
    static get observedAttributes() {
        return ['path'];
    }

    attributeChangedCallback(attr, oldV, newV) {
        if (attr === 'path') this.path = newV;
    }

    connectedCallback(){
        const clonedDOM = document.importNode(this.template, true);
        this.appendChild(clonedDOM);
    }
}
customElements.define('router-view', RouterView);