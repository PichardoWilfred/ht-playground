import '../scss/main.scss';
import './dark-mode.js';
//routes

import home from '../views/home.html';
import task from '../views/task-drawer.html'

const router = {
    'home': home,
    'task-drawer': task,
}

function initComponent (view) {
    const parser = new DOMParser();
    const file = parser.parseFromString(router[view], 'text/html');
    
    const file_template = file.getElementsByTagName('template')[0];
    if (file_template) {
        const new_template = document.createElement('template');
        new_template.innerHTML = file_template.innerHTML;
        const router = document.querySelector('#router-view');
        router.replaceChild(new_template.content, router.firstElementChild);
    }
    
    const file_script = file.getElementsByTagName('script')[0];
    if (file_script) {
        const new_script = document.createElement('script');
        new_script.id = 'script-tag';
        new_script.innerHTML = file_script.innerHTML;
        const current_script = document.querySelector('#script-tag');
        if (current_script) current_script.remove();
        document.body.appendChild(new_script);
    }

    const file_style = file.getElementsByTagName('style')[0];
    if (file_style) {
        const new_styles = document.createElement('style');
        new_styles.id = 'style-tag';
        new_styles.innerHTML = file_style.innerHTML;
        const current_styles = document.querySelector('#style-tag');
        if (current_styles) current_styles.remove()
        document.body.appendChild(new_styles);
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
    // if (location.pathname === '/') window.location.hash = '#/';
    // navigateTo(window.location.hash);

    // setting the initial value
    let path = window.localStorage.getItem('path');
    navigateTo(path)
    //if its the first time we enter we set it to closed
    if (!path) {
        window.localStorage.setItem('path', '');
        path = '#/';
    };

    window.addEventListener("hashchange", () => {
        window.localStorage.setItem('path', window.location.hash);
        navigateTo(window.localStorage.getItem('path'));
    });
};

window.addEventListener("load", init);