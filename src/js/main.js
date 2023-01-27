// import '../scss/main.scss';
import './router.js'
// we need a princpial routing component
// import { router } from "./router.js";

// whenever the apps starts or its 

const navigateTo = (route) => {

}
const init = () => {
    navigateTo(window.location.hash);
    window.addEventListener("hashchange", () => {
        navigateTo(window.location.hash);
    });
};

window.addEventListener("load", init);