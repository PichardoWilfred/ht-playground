<div align="center">
  <h3 align="center" name="top">Hytech Playground</h2>
  <p align="center">
    Test your components here before adding them <br>to
    the production environment. 
    </p>
</div>
<br />
<br />

## Creating a new view
In order to create a new view we will need to wrap our structure, styles and logic in a `[name].html`  <br/>
file inside `src/views/*`, for example: <br/><br/>
`global-search.html`
```html 
<template>
    <main class="home row justify-content-center">
        <h4>Hi im the search component</h4>
    </main>
</template>
<script>
    (function components(){
            console.log('fokiu mai bro');
    })()
</script>
<style>
    h4 {
        color: red;
    }
</style>

```
<br />

Then, we will add our new view in `router.js`.

```javascript
import global from '../views/global-search.html'; // we will import our new file.
const router = {
    'home': home,
    'task-drawer': task,
    'global-search': global, // the key-name will be the route that will display our view.
}
```
<!-- ROADMAP -->
## Roadmap

- [x] Add a routing system.
  - [x] Enable nested routing.  
- [x] Add dark-mode toggle
- [ ] Enhance the template system with document-fragments.
- [ ] Compile sass styles into a single file.
- [ ] Compile a css file per view.
- [ ] Add a "components" section into the `home.html` menu. 


<p align="right">(<a href="#top">Go back to top</a>)</p>
