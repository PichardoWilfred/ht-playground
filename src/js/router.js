// conditionally add scripts
import Home from '../js/home.js';
import TaskDrawer from '../js/task-drawer.js';
import GlobalSearch from '../js/task-drawer.js';
let first_load = true;
localStorage.setItem("path", 'home');

const loadScript = (route) => {
    // let route =  (route_.substring(10)).slice(0, -5);
    const path = {
        home: Home,
        'task-drawer': TaskDrawer,
        'global-search': GlobalSearch
    }
    path[route]()
}


const route = (event) => {
    event = event || window.event;
    event.preventDefault();

    localStorage.setItem("path", event.target.dataset.path)
    // window.history.pushState({}, "", );
    handleLocation();
};

const routes = {
    404: "src/views/404.html",
    "home": "src/views/home.html",
    "global-search": "src/views/global-search.html",
    "task-drawer": "src/views/task-drawer.html",
};

const handleLocation = async () => {
    const route = localStorage.getItem("path");
    await fetch(`src/views/${route}.xml`).then((res) => {
        if (res.ok) {
            return res.text();
        }
    }).then((res) => {
        document.getElementById("router-view").innerHTML = res;
    });
    
    loadScript(route);
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
