import template from './template.html';

class PlaygroundConfiguration extends HTMLElement {
    constructor(){
        super();
    }

    hideConfig(){
        $('#toggle-ht-config').click(() => {
            $('#ht-config').toggleClass('closed');

        });
    }
    hideBar(){
        let navbar = window.localStorage.getItem('navbar');
        
        if (!navbar) {
            window.localStorage.setItem('navbar', 'show');
            navbar = 'show';
        }else {
            navbar = window.localStorage.getItem('navbar');
        }

        if (navbar === 'show') {
            $('#ht-navigation-nav').addClass('show');
        }else {
            $('#ht-navigation-nav').removeClass('show');
        }
        

        $('#hide-navbar').click(() => {
            $('#ht-navigation-nav').toggleClass('show');
            window.localStorage.setItem('navbar', window.localStorage.getItem('navbar') === 'show' ? 'hide':'show');
        })
    }
    toggleNavbar(value){}
    connectedCallback(){
        this.innerHTML = template;
        this.hideConfig();
        this.hideBar();
    }

}

customElements.define('ht-configuration', PlaygroundConfiguration);