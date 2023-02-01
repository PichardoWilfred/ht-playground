import template from './template.html';


// THIS GOES ONTO THE NAV COMPONENT
$('#reset-path').click(() => {
    window.localStorage.setItem('path', '#/');
    location.reload();
})


class NavigationBar extends HTMLElement {
    constructor(){
        super();
        this.template = template.content;
        this.path = this.getAttribute("path");
    }

    static get observedAttributes() {
        return ['path'];
    }

    attributeChangedCallback(attr, oldV, newV) {
        if (attr === 'path') this.path = newV;
    }

    handleDarkMode(){
        // dark-mode
        const toggle_dark_mode = $('#toggle-dark-mode');
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        toggle_dark_mode.text(prefersDarkScheme.matches ? '🌞':'🌙');

        const currentTheme = localStorage.getItem("theme");
        if (currentTheme == "dark") { // it will add it lastly no matter the cost
            document.body.classList.toggle("dark-theme");
        } else if (currentTheme == "light") {
            document.body.classList.toggle("light-theme");
        }

        toggle_dark_mode.click(() => {
            let theme;
            if (prefersDarkScheme.matches) { // asks the operating system
                document.body.classList.toggle("light-theme");
                theme = document.body.classList.contains("light-theme") ? "light" : "dark";
            } else {
                document.body.classList.toggle("dark-theme");
                theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
            }
            localStorage.setItem("theme", theme);
            toggle_dark_mode.text(theme === 'dark' ? '🌞':'🌙');
        });
    }

    connectedCallback(){
        this.innerHTML = template;
        this.handleDarkMode();
    }
}
customElements.define('ht-navigation', NavigationBar);