import 'hybrids/shim';
import {
  define,
  html
} from 'hybrids';
import Cymine from "@intermine/cytoscape-intermine";
import styles from './style.css';

/**
 * This is where we place the bulk of the code, wrapping an existing BioJS component
 * or where we might initialise a component written from scratch. Needs to be
 * paired with a `define` method call - see end of the page.
 **/
 const stylesTemplate = html([`<style>${styles}</style`]);

 export const BiojsComponentInteractionGraph = {
   intermineService: '',
   searchTerm: '',
   searchOrganism: '',
   searchClass: '',
   cymine: {
     get: ({ intermineService, searchTerm, searchOrganism, searchClass }) => (host, target) => {
       const lastContainer = target.nextSibling;
       if (lastContainer) {
         lastContainer.parentElement.removeChild(lastContainer);
       }

       const nextContainer = document.createElement('div');
       target.parentElement.appendChild(nextContainer);
       console.log("===========",intermineService, searchTerm, searchClass,"333");

       Cymine({
         service: {
           root: intermineService,
         },
         queryOn: {
           value: searchTerm,
           extraValue: searchOrganism,
         },
         nodeType: searchClass,
         compact: true,
         parentElem: nextContainer,
       });
     },
   },
   render: ({ cymine }) => html`
     <div>${cymine}</div>
     ${stylesTemplate}
   `,
 };

// this line connects the html element in idex.html with the javascript
// defined above.
define('biojs-component-interaction-graph', BiojsComponentInteractionGraph);
