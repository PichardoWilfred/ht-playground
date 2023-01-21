// conditionally add scripts
let first_load = true;

const loadScript = (route_) => {
    
    if (!first_load) {
        console.log('loading');
        const tag = document.querySelector('#router-tag');
        tag.remove();
    }

    let route;
    if (route_ !== '/') {
        route = route_.substring(9)
        route = route.slice(0, -5)
    }else {
        route = 'home'
    }
    let scriptEle = document.createElement("script");
    scriptEle.setAttribute("src", `./src/js${route}.js`);
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.id = "router-tag";

    document.body.appendChild(scriptEle);
    // success event 
    scriptEle.addEventListener("load", () => {
        console.log("File loaded")
    });
    // error event
    scriptEle.addEventListener("error", (ev) => {
        console.log("Error on loading file", ev);
    });

    if (first_load) first_load = false;
}


const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.dataset.path);
    
    console.log('CAHNGED ROUTE to: ', event.target.dataset.path);
    handleLocation();
};

const routes = {
    404: "src/views/404.html",
    "/": "src/views/home.html",
    "/global-search": "src/views/global-search.html",
    "/task-drawer": "src/views/task-drawer.html",
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("router-view").innerHTML = html;
    loadScript(route);
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();