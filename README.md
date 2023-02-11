<div align="center">
  <h3 align="center" name="top">Hytech Playground</h2>
  <p align="center">
    Gizmo's components & modules test environment.
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
console.log('from the ht-playground documentation!');
</script>

<style>
    h4 {
        color: red;
    }
</style>

```
<br />

Then, we will add our new view in `path.js`.

```javascript
import global from '../views/global-search.html'; // we will import our new file.
const router = {
    'home': home,
    'task-drawer': task,
    'global-search': global, // the key-name will be the route that will display our view.
}
```

## Creating nested views
If you want to create multiple routes nested within the same path, for example `#/files`,
having access to its own file and at the same time, being able to render on the `#/files/deleted`
route, a different file, it's quite simple.
<br/><br/>

1. Create a `src/views/[route-name]` folder.
2. On `src/views/[route-name]` create a `index.html` file that will render our default route.
3. Create the files we want to render on our nested route, for example `deleted.html` or `about.html`
4. (Optional) We can add a `_detail.html` to handle our dynamic views the nested route.
5. Add the new routes in `path.js`

```javascript
import files from '../views/files/index.html'; // newly added routes or files
import files_archives from '../views/files/archives.html';
import files_detail from '../views/files/_detail.html';
import files_deleted from '../views/files/deleted.html';

const routes = { //Add them to the routes array.
        ...,
        'files': {
            '/': files,
            'archives': files_archives,
            'deleted': files_deleted,
            ":id": files_detail
        }
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
- [ ] Add a component directive for every single svg we add. 

<p align="right"><a href="#top">Go back to top</a></p>
