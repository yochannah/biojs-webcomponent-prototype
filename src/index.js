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
  render: render(function(x) {
    Cymine({
      //optional. Will default to '#cymine' if not specified:
      parentElem: x,
      //required. can't query without this! :) must be a valid
      //intermine API URL
      service: {
        root: 'http://www.flymine.org/flymine/service/'
      },
      //required. needs value : "whatever", optionally extraValue : "whatever".
      queryOn: {
        "value": "zen",
        "extraValue": "D. melanogaster"
      },
      nodeType: "Gene", //valid options are Gene or Protein. Optional, will default to Gene.
      compact: true //optional. Only relevant for error messages. Displays compact 1.5 em 'no results found' message rather than taking up the normal amount of space.
    });
    /**
    *   It's okay to change the HTML to anything that suits you,
    *   but leave <style-element> here if your
    *   component has its own styles.
    **/
    return html `<div>
    <style-element />
    </div>`
  }, {
    shadowRoot: false
  })
}

define('biojs-component-test', BiojsComponentInteractionGraph);
define('style-element', styleElement);
