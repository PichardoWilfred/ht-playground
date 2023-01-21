const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") { // it will add it lastly no matter the cost
    document.body.classList.toggle("dark-theme");
} else if (currentTheme == "light") {
    document.body.classList.toggle("light-theme");
}
$('#toggle-dark-mode').click( function() {
    let theme;
    if (prefersDarkScheme.matches) { // asks the operating system
        document.body.classList.toggle("light-theme");
        theme = document.body.classList.contains("light-theme") ? "light" : "dark";
    } else {
        document.body.classList.toggle("dark-theme");
        theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    }
    localStorage.setItem("theme", theme);
});