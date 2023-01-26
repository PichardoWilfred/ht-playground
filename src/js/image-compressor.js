import view from "../views/image-compressor.html";

export default () => {
    const element = document.createElement("div");
    element.innerHTML = view;

    return element
}