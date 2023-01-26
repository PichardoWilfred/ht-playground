import '../scss/main.scss';
import { router } from "./router.js";

const init = () => {
    router(window.location.hash);
    window.addEventListener("hashchange", () => {
        router(window.location.hash);
    });
};

window.addEventListener("load", init);
// console.log({ document});