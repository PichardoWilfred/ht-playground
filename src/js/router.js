// conditionally add scripts
import Home from '../js/home.js';
import TaskDrawer from '../js/task-drawer.js';
import GlobalSearch from '../js/global-search.js';

const pages = {
    home: Home,
    'task-drawer': TaskDrawer,
    'global-search': GlobalSearch,
};

const router = async (route) => {
    let content = document.getElementById("router-view");
    content.innerHTML = "";
    console.log(route);

    switch (route) {
        case "#/home": {
            return content.appendChild( pages['home']() );
        }
        case "#/task-drawer": {
            return content.appendChild( pages['task-drawer']() );
        }
        case "#/global-search": {
            return content.appendChild ( pages['global-search']() );
        }
    }
};

export { router };
