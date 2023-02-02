import defaultIcon from './svg/default-icon.svg'

class Icon extends HTMLElement {
    constructor(){
        super();
        this.name = this.getAttribute("name") || 'default-icon';
        
        // this.size = this.getAttribute("size") || '20px';
        this.width = this.getAttribute("width") || '20px';
        this.height = this.getAttribute("height") || 'default';
        
        this.color = this.getAttribute("color") || 'var(--cyan)'; //this needs to be reactive
    }
    //reactive attributes.
    static get observedAttributes() {
        return ['color'];
    }
    attributeChangedCallback(attr, old_value, new_value) {
        if (attr === 'color') this.color = new_value;
    }

    formatSVG(string){
        let icon = string.replace('var(--color)', this.color); //we add the color support
        icon = icon.replace('var(--width)', this.width);
        icon = icon.replace('var(--height)', this.height === 'default' ? this.width: this.height);
        return icon;
    }

    async getTemplate(){
        try {
            const source = await import(/* webpackMode: "lazy" */`./svg/${this.name}.svg`);
            this.innerHTML = this.formatSVG(source.default);
        } catch (err) {
            console.error(err);
            this.innerHTML = defaultIcon;
        }
    }

    connectedCallback(){
        this.getTemplate();
    }
}

customElements.define('ht-icon', Icon);