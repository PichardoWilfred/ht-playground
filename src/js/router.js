// conditionally add scripts


// const pages = {
//     home: Home,
//     'task-drawer': TaskDrawer,
//     'global-search': GlobalSearch,
//     'image-compressor': ImageCompressor,
// };

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

// export { router };
class RouterView extends HTMLElement {
    constructor(){
        super();
        this.path = this.getAttribute("path");
    }
    static get observedAttributes() {
        return ['path'];
    }

    attributeChangedCallback(atrr, oldV, newV) {
        if (atrr === 'path') this.path = newV;
    }

    template(){ // template
        const template = document.createElement('div');
        template.innerHTML = `<div><span style="color: white;"> ELE UVE</span></div>`;
        return template;
    }
    render(){
        this.innerHTML = `<div><span style="color: white;"> ELE UVE</span></div>`;
    }

    connectedCallback(){
        this.template();
    }
}
customElements.define('ht-router-view', RouterView);