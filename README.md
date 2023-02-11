<div align="center">
  <h3 align="center" name="top">Hytech Playground</h2>
  <p align="center">
    A test environment for components and modules.
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

## Color palette
For maintaining consistency on our application, we will need to follow the next 
instructions when wanting to modify our current dark and light color scheme.

1. Open `src/scss/palette.scss`.
2. Enter you the color's `dark` and `light` values on its respective `mixin`, alongside its text contrast value, adding `-text` at the end.
    ```scss
    @mixin dark_mode {
        --ht-main: #161C23; //color.
        --ht-main-text: white; //contrast equivalent
        ...
    }
    @mixin light_mode {
        --ht-main: #FFFFFF;
        --ht-main-text: black;
        ...
    }
    ```
3. Open `src/scss/main.scss`.
4. Enter **only** our main color's name on the `$background` collection  
    ```scss
    $background_palette: (
        'ht-cyan',
        ...
    );
    @each $color in $background_palette {
        .bg-#{$color} {
            background-color: #{'var(--'+$color+')'} !important;
            color: #{'var(--'+$color+'-text)'} !important; //it will add its --text value automatically
        }
    }
    ```
5. Enter our main color's name and it's contrast value on the `$colors_palette` collection  
```scss
    $colors_palette: (
        'ht-main',
        'ht-main-text',
        ...
    );
    @each $color in $colors_palette {
        .color-#{$color} {
            color: #{'var(--'+$color+')'} !important; //it will be added as class to modify our texts color.
        }
        .fill-#{$color} {
            fill: #{'var(--'+$color+')'} !important;
        }
    }
```

<!-- ROADMAP -->
## Roadmap

- [x] Add a routing system.
  - [x] Enable nested routing.  
- [x] Add dark-mode toggle
- [x] Compile sass styles into a single file.
- [x] Add a component directive for every single svg we add. 
- [ ] Enhance the template system with document-fragments.
- [ ] Compile a css file per view.
- [ ] Add a "components" section into the `home.html` menu. 

<p align="right"><a href="#top">Go back to top</a></p>

