import template from './template.html';

class Component extends HTMLElement {
    constructor(){ 
        super();
        this.checked = this.getAttribute("checked");
        this.handleCheck(this.checked)
    }
    static get observedAttributes() {
        return ['checked'];
    }
    attributeChangedCallback(attr, old_value, new_value) {
        if (attr === 'checked') {
            this.handleCheck(new_value);
        };
    }
    handleCheck(value) {
        const checked = value === '';
        if (checked) {
            console.log('wiii');
        }else {
            console.log('D:');
        }
    }
    connectedCallback(){
        this.innerHTML = template;
    }
}
customElements.define('ht-switch', Component);

// constructor(){
//     super();
//     this.name = this.getAttribute("name") || 'default-icon';
//     this.width = this.getAttribute("width") || '20px';
//     this.height = this.getAttribute("height") || 'default';
//     this.color = this.getAttribute("color") || 'var(--cyan)'; //this needs to be reactive
// }
// //reactive attributes.
// static get observedAttributes() {
//     return ['color'];
// }
// attributeChangedCallback(attr, old_value, new_value) {
//     if (attr === 'color') this.color = new_value;
// }