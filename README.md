## To use this component on your site
Quickstart: There's a demo in [index.html](index.html).

Longer:  

### In the `<head>`, add:
```html
<!-- the library for the webcomponent -->
<script src="dist/main.js" type="module"></script>
<!-- imjs is the library that loads data from intermine -->
<script src="http://cdn.intermine.org/js/intermine/imjs/3.15.0/im.min.js" charset="UTF-8"></script>
```

This links to the relevant scripts to define the component and fetch data.

### In the `<body>`

Where you want your webcomponent to appear, add the following:

```html
<biojs-component-interaction-graph
   intermineService="http://www.flymine.org/flymine/service/"
   searchTerm="zen"
   searchClass="Gene"
   searchOrganism="D. melanogaster">
 </biojs-component-interaction-graph>
```

Some notes on usage:

- `intermineService` value must point to the webservices
from an InterMine. for a full list of InterMines, see registry.intermine.org.
e.g. if you are interested in rat data, set ratmine to be the url,
or for plants you might want legumemine or phytomine.
- `searchOrganism` The format for the organism name must be in abbreviated format - e.g.
D. melanogaster works, Drosophila melanogaster would not.
- `searchTerm` - must be an identifier for a Gene or Protein
- `searchClass` - choose either Gene or Protein. (Case matters)


## Developing:

### Prerequisites:

[npm 6+](https://www.npmjs.com/), ideally installed via [nvm](https://github.com/creationix/nvm).

### Install
Once this repo is cloned, in your terminal, run:

```bash
npm install
```

### To build js

In your terminal, run

```bash
npx webpack
```

### Developer notes

This uses [hybrids.js](https://github.com/hybridsjs/hybrids) to implement webcomponents easily.
