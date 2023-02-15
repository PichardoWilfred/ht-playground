import { getInstances, addInstance } from "../../firebase";
class Component extends HTMLElement {
    constructor(){
        super(); 
        this.init();
    }
    async init(){
        $('#add-new-instance').click(() => {
            const instance_name = $('#instance-name').val();
            addInstance()
        })
    }
    connectedCallback(){
    }
}
customElements.define('ht-looper', Component);
