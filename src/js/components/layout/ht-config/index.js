import template from './template.html';

class PlaygroundConfiguration extends HTMLElement {
    constructor(){
        super();
    }
    handleContainerStyles(){
        const name = 'container-styles';
        const router_view = document.querySelector('#router-view');
        const containerStyles = localStorage.getItem(name);
        const toggle_containerStyles = document.querySelector("#bs-container");
        // if there are instantiated
        if (!containerStyles) {
            localStorage.setItem(name, 'on');
            containerStyles = 'on'
        };

        const setContainerStyles = (styles) => {
            if (styles === 'off') {
                router_view.classList.remove('nullify-bg-container');
                toggle_containerStyles.removeAttribute("checked")
            }else if (styles === 'on') {
                router_view.classList.add('nullify-bg-container');
                toggle_containerStyles.setAttribute("checked", "");
            }
        }
        setContainerStyles(containerStyles);

        toggle_containerStyles.addEventListener('change', () => {
            let styles = localStorage.getItem(name);
            if (styles === 'off') {
                localStorage.setItem(name, 'on');
                setContainerStyles('on')
            }else if (styles === 'on') {
                localStorage.setItem(name, 'off');
                setContainerStyles('off')
            }
        });
    }
    handleDarkMode(){ // dark-mode
        const toggle_dark_mode = $('#mode-toggler');
        const toggle_dark_mode_nat = document.querySelector("#mode-toggler");
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme == "dark") { // it will add it lastly no matter the cost
            document.body.classList.toggle("dark-theme");
            toggle_dark_mode_nat.setAttribute("checked", "");
        } else if (currentTheme == "light") {
            document.body.classList.toggle("light-theme");
            if (toggle_dark_mode_nat.hasAttribute("checked") !== "") {
                toggle_dark_mode_nat.removeAttribute("checked")
            }
        }

        toggle_dark_mode.change(() => {
            let theme;
            if (prefersDarkScheme.matches) { // asks the operating system
                document.body.classList.toggle("light-theme");
                theme = document.body.classList.contains("light-theme") ? "light" : "dark";
            } else {
                document.body.classList.toggle("dark-theme");
                theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
            }
            localStorage.setItem("theme", theme);
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
    addBootstrap(version){
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
        // creating the link element
        const title = document.head.getElementsByTagName('title')[0]; //reference to insert our
        const link_rel = document.createElement('link');
        link_rel.setAttribute('href', bootstrap[version]['href']);
        link_rel.setAttribute('integrity', bootstrap[version]['integrity']);
        
        link_rel.setAttribute('rel','stylesheet');
        link_rel.setAttribute('crossorigin','anonymous');
        link_rel.setAttribute('id', 'bootstrap-import');
        
        if ($('#bootstrap-import')) $('#bootstrap-import').remove();
        const ht_switch = document.querySelector('#toggle-bootstrap');
        
        if (version == 5) { // it will add it lastly no matter the cost
            ht_switch.setAttribute("checked", "");
        } else if (version == 4) {
            if (ht_switch.hasAttribute("checked") !== "") {
                ht_switch.removeAttribute("checked")
            }
        }
        // $('#toggle-bootstrap').text(`Bootstrap version ${version}`);
        document.head.insertBefore(link_rel, title);
    }
    toggleBootstrap(){
        $('#toggle-bootstrap').change(() => {
            const version = window.localStorage.getItem('bootstrap');
            const newVersion = version === '5' ? '4':'5';
            window.localStorage.setItem('bootstrap', newVersion);
            this.addBootstrap(newVersion);
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
        this.handleContainerStyles();
        this.initBootstrap();
    }
}

customElements.define('ht-configuration', PlaygroundConfiguration);