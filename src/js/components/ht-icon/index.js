// import check from './svg/case.svg';
// import text from './papo.txt'

class Icon extends HTMLElement {
    constructor(){
        super();
        this.name = this.getAttribute("name");
        this.color = this.getAttribute("color") || 'var(--cyan)';
    }

    async getTemplate(){//./src/js/components/ht-icon/
        const source = await import(/* webpackMode: "lazy" */`./svg/${this.name}.svg`);
        this.innerHTML = source.default;
    }

    connectedCallback(){
        this.getTemplate();
    }
}

customElements.define('ht-icon', Icon);