// conditionally add scripts
import home from '../views/home.html'


const pages = {
    home: home,
};

// const router = async (route) => {
//     let content = document.getElementById("router-view");
//     content.innerHTML = "";

//     switch (route) {
//         case "#/": {
//             return content.appendChild( pages['home']() );
//         }
//         case "#/image-compressor": {
//             return content.appendChild( pages['image-compressor']() );
//         }
//         case "#/task-drawer": {
//             return content.appendChild( pages['task-drawer']() );
//         }
//         case "#/global-search": {
//             return content.appendChild ( pages['global-search']() );
//         }
//     }
// };

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
        // this.render();
    }

    // template(){ // template
    //     const template = document.createElement('template');
    //     template.innerHTML = `<span style="color: white;">${this.path}</span>`;
    //     return template;
    // }
    // render(){
        // this.innerHTML = '';
        // this.append(this.template().content.cloneNode(true));
    // }

    connectedCallback(){
        const clonedDOM = document.importNode(this.template, true);
        this.appendChild(clonedDOM);
        // this.render();
    }
}
customElements.define('router-view', RouterView);