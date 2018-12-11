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

/**
* This is where we place the bulk of the code, wrapping an existing BioJS component
* or where we might initialise a component written from scratch. Needs to be
* paired with a `define` method call - see end of the page.
**/
export const BiojsComponentInteractionGraph = {
  //the `host` argument is a reference to the html returned at the bottom of
  //this function - you'll probably want to update or add content to host.
  render: render(function(host) {
    //Cymine is a function provided by the cytoscape-intermine library dependency
    //see https://github.com/yochannah/cytoscape-intermine for more details
    Cymine({
      parentElem: host,
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
    });
    /**
    *   It's okay to change the HTML to anything that suits you,
    *   but leave <style-element> here if your
    *   component has its own styles.
    *   For more info on customising components, see hybrids.js docs
    *   https://github.com/hybridsjs/hybrids
    **/
    return html `<div>
    <style-element />
    </div>`
  }, {shadowRoot:false})
}

define('biojs-component-interaction-graph', BiojsComponentInteractionGraph);
define('style-element', styleElement);
