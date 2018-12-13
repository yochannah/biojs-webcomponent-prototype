import 'hybrids/shim';
import {
  define
} from 'hybrids';
import Cymine from "@intermine/cytoscape-intermine";
import styles from './style.css';

/**
 * We directly insert a style element in order to embed styles.
 **/
function styleTemplate() {
  var myStyle = document.createElement("style");
  myStyle.setAttribute("id", "cytoscapeInterMineStyle");
  myStyle.setAttribute("type", "text/css");
  myStyle.innerHTML = styles.toString();
  return myStyle;
}

/**
 * Check if there is already a style element for this component and add if not.
 * Useful in cases where this component might be initialised more than once.
 **/
function addStylesIfNeeded() {
  if (!document.getElementById("cytoscapeInterMineStyle")) {
    document.head.appendChild(styleTemplate());
  }
}

/**
 * initialises an existing library, called inside the web component wrapper.
 **/
function connectCymine(options) {
  //Cymine is a function provided by the cytoscape-intermine library dependency
  //see https://github.com/yochannah/cytoscape-intermine for more details
  return {
    get: (host, v) => v, // required to be recognized as property descriptor,
    set: () => {}, //required to stop TypeError: setting getter-only property "x"
    connect: (host, key) => {
      host[key] = Cymine({
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
        compact: true,
        parentElem: host,
      });
      addStylesIfNeeded();
    }
  }
}

/**
 * This is where we place the bulk of the code, wrapping an existing BioJS component
 * or where we might initialise a component written from scratch. Needs to be
 * paired with a `define` method call - see end of the page.
 **/
export const BiojsComponentInteractionGraph = {
  cymine: connectCymine(),
};

// this line connects the html element in idex.html with the javascript
// defined above.
define('biojs-component-interaction-graph', BiojsComponentInteractionGraph);
