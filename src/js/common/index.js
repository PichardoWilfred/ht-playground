
//file used for tools and utilities within the app.
const hash = () => window.location.hash;
const _id = () => hash().substring(hash().lastIndexOf('/') + 1, hash().length);
