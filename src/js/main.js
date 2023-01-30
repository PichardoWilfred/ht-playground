import '../scss/main.scss';
import home from '../views/home.html';
import task from '../views/task-drawer.html'
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
const router = {
    'home': home,
    'task-drawer': task,
}

function initComponent (view) {
    const parser = new DOMParser();
    const file = parser.parseFromString(router[view], 'text/html');
    // console.log(file);
    const file_template = file.getElementsByTagName('template')[0];
    if (file_template) {
        const new_template = document.createElement('template');
        new_template.innerHTML = file_template.innerHTML;
        // template.id = file_template.id;
        const router = document.querySelector('#router-view');
        const content = router.querySelector('#view');
        console.log(content);
        router.replaceChild(new_template.content, content);
    }else {
        // console.log('');
        // document.body.innerHTML = '';
    }
    
    const file_script = file.getElementsByTagName('script')[0];
    if (file_script) {
        const new_script = document.createElement('script');
        new_script.id = 'script-tag';
        new_script.innerHTML = file_script.innerHTML;
        const current_script = document.querySelector('#script-tag');
        if (current_script) current_script.remove();
        document.body.appendChild(new_script);
    }else {
        // const current_script = document.getElementsByTagName('script')[0];
        // current_script.innerHTML = '';
    }

    const file_style = file.getElementsByTagName('style')[0];
    if (file_style) {
        const new_styles = document.createElement('style');
        new_styles.id = 'style-tag';
        new_styles.innerHTML = file_style.innerHTML;
        const current_styles = document.querySelector('#style-tag');
        if (current_styles) current_styles.remove()
        document.body.appendChild(new_styles);
    } else {
        // const current_styles = document.getElementsByTagName('style')[0];
        // current_styles.innerHTML = '';
    }

}

const navigateTo = (route) => {
    let route_;
    if (route === '#/') {
        route_ = "home"
    }else {
        route_ = route.slice(2);
    };
    console.log(route_);
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

