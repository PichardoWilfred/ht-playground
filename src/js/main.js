import '../scss/main.scss';
import home from '../views/home.html'
// import './router.js'
// // we need a princpial routing component
// // import { router } from "./router.js";

// // whenever the apps starts or its 

// const navigateTo = (route) => {
//     console.log(route);
//     const router = document.querySelector('router-view');
//     router.setAttribute('path', route);
// }
// const init = () => {
//     navigateTo(window.location.hash);
//     window.addEventListener("hashchange", () => {
//         navigateTo(window.location.hash);
//     });
// };

// window.addEventListener("load", init);

function initComponent (view) {
    const parser = new DOMParser();
    const fragment = parser.parseFromString(home, 'text/html');
    const originalTemplate = fragment.getElementsByTagName('template')[0];
    let template;
    if (originalTemplate) {
        template = document.createElement('template');
        template.innerHTML = originalTemplate.innerHTML;
        // template.id = originalTemplate.id;
        const router = document.querySelector('#router-view');
        router.innerHTML = '';
        router.appendChild(template.content);
    }
    
    const originalScript = fragment.getElementsByTagName('script')[0];
    let script;
    if (originalScript) {
        script = document.createElement('script');
        script.innerHTML = originalScript.innerHTML;
        const currentScript = document.getElementsByTagName('script')[0];
        currentScript.innerHTML = '';
        document.body.appendChild(script);
    }
    const originalStyles = fragment.getElementsByTagName('style')[0];
    let styles;
    if (originalStyles) {
        styles = document.createElement('style');
        styles.innerHTML = originalStyles.innerHTML;
        const currentStyles = document.getElementsByTagName('style')[0];
        currentStyles.innerHTML = '';
        document.body.appendChild(script);
    }   

}

const navigateTo = (route) => {
    let route_;
    if (route === '#/') {
        route_ = "home"
    }else {
        route_ = route.slice(2);
    };
    initComponent(route_);
}
const init = () => {
    if (location.pathname === '/') window.location.hash = '#/';
    navigateTo(window.location.hash);
    window.addEventListener("hashchange", () => {
        navigateTo(window.location.hash);
    });
};

window.addEventListener("load", init);

