import 'hybrids/shim';
import {
  define,
  html,
  render
} from 'hybrids';
import Cymine from "@intermine/cytoscape-intermine";
import styles from './style.css';

/**
 * We directly insert a style element in order to embed styles.
 * See https://github.com/hybridsjs/hybrids/issues/10#issuecomment-418340724
 **/
const styleElement = {
  render: html([`<style>${styles}</style`])
};

function connectCymine(options) {
  //Cymine is a function provided by the cytoscape-intermine library dependency
  //see https://github.com/yochannah/cytoscape-intermine for more details
  return {
    get: (host, v) => v, // required to be recognized as property descriptor,
    connect: (host, key) => {
      host.appendChild(document.createElement('div')); // if it is required in your case
      host[key] = Cymine({
        ...options,
        parentElem: host,
      });
    };
  }

  export const BiojsComponentInteractionGraph = {
    cymine: connectCymine({
      service: {
        //we're loading dynamic attribute values from our custom element.
        //see index.html.
        root: host.getAttribute("intermineService")
      },
      queryOn: {
        "value": host.getAttribute("searchTerm"),
        "extraValue": host.getAttribute("searchOrganism")
      },
      nodeType: host.getAttribute("searchClass"),
      compact: true
    }),
    // your styles should be applied globaly to the document once, so render is not required
  };

  /**
   * This is where we place the bulk of the code, wrapping an existing BioJS component
   * or where we might initialise a component written from scratch. Needs to be
   * paired with a `define` method call - see end of the page.
   **/

  define('biojs-component-interaction-graph', BiojsComponentInteractionGraph);
  define('style-element', styleElement);
