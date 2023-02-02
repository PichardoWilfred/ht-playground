import template from './template.html';

class PlaygroundConfiguration extends HTMLElement {
    constructor(){
        super();
    }
    handleDarkMode(){ // dark-mode
        const toggle_dark_mode = $('#toggle-dark-mode');
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        const currentTheme = localStorage.getItem("theme");
        toggle_dark_mode.text(currentTheme === 'dark' ? '🌞':'🌙');

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
    handleResetPath(){
        $('#reset-path').click(() => {
            window.localStorage.setItem('path', '#/');
            location.reload();
        });
    }
    hideConfig(){
        $('#toggle-ht-config').click(() => {
            $('#ht-config').toggleClass('closed');

        });
    }
    bootstrap = {
        5: {
            href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
            integrity: "sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        },
        4: {
            href: "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css",
            integrity: "sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
        }
    }
    addBootstrap(version){
        // creating the link element
        const link_rel = document.createElement('link');
        link_rel.setAttribute('href', this.bootstrap[version]['href']);
        link_rel.setAttribute('integrity', this.bootstrap[version]['integrity']);
        
        link_rel.setAttribute('rel','stylesheet');
        link_rel.setAttribute('crossorigin','anonymous');
        link_rel.setAttribute('id', 'bootstrap-import');
        
        if ($('#bootstrap-import')) $('#bootstrap-import').remove();
        $('#toggle-bootstrap').text(`Bootstrap version ${version}`);
        document.head.append(link_rel);

    }
    toggleBootstrap(){
        $('#toggle-bootstrap').click(() => {
            const version = window.localStorage.getItem('bootstrap');
            window.localStorage.setItem('bootstrap', version === '5' ? '4':'5');
            this.addBootstrap(version === '5' ? '4':'5');
        });
    }
    initBootstrap(){
        this.toggleBootstrap();
        let version = window.localStorage.getItem('bootstrap');
        if (!version) {
            window.localStorage.setItem('bootstrap', '5');
            version = '5';
        }else {
            version = window.localStorage.getItem('bootstrap');
        }
        this.addBootstrap(version);
    }
    connectedCallback(){
        this.innerHTML = template;
        this.hideConfig();
        this.handleDarkMode();
        this.handleResetPath();
        this.initBootstrap();
    }

}

customElements.define('ht-configuration', PlaygroundConfiguration);