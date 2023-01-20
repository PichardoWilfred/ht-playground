const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
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
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();