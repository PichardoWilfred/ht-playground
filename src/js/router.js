// conditionally add scripts
import Home from '../js/home.js';
import TaskDrawer from '../js/task-drawer.js';
import GlobalSearch from '../js/global-search.js';
import ImageCompressor from '../js/image-compressor.js';

const pages = {
    home: Home,
    'task-drawer': TaskDrawer,
    'global-search': GlobalSearch,
    'image-compressor': ImageCompressor,
};

const router = async (route) => {
    let content = document.getElementById("router-view");
    content.innerHTML = "";

    switch (route) {
        case "#/": {
            return content.appendChild( pages['home']() );
        }
        case "#/image-compressor": {
            return content.appendChild( pages['image-compressor']() );
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
