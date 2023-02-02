//file used for tools and utilities within the app.
const hash = () => window.location.hash;
const _id = () => hash().substring(hash().lastIndexOf('/') + 1, hash().length);
// fetch('./papo.txt').then((t) => t.text()).then((a) => {
//     console.log(a);
// })
