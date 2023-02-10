import template from './template.html';
class Component extends HTMLElement {
    constructor(){
        super();
        this.rendered = false; 
        this.checked = this.getAttribute("checked") === '';
    }
    static get observedAttributes() {
        return ['checked'];
    }
    attributeChangedCallback(attr, old_value, new_value) {
        if (!this.rendered) return;
        switch (attr) {
            case 'checked':
                this.checked = new_value === '';
                this.handleCheck(this.checked);
            break;
        default:
            break;
        }
    }
    handleCheck(check_value) { //from root
        const input = this.querySelector("input#switch-input");
        if (check_value) { //if its checked. 
            input.setAttribute("checked","")
        }else {
            input.removeAttribute("checked")
        }
    }
    render(_template = template){
        this.innerHTML = _template;
    }
    handleClick(){ //from inner element
        const input = this.querySelector("input#switch-input");
        input.addEventListener('click', (e) => {
            if (e.target.checked) { //if its checked
                this.setAttribute("checked","");
            }else {
                this.removeAttribute("checked");
            }
        });
    }
    connectedCallback(){
        this.render();
        this.handleCheck(this.checked);
        this.handleClick();
        this.rendered = true;
    }
}
customElements.define('ht-switch', Component);
