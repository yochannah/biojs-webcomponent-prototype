import 'hybrids/shim';
import {
  define,
  html,
  render
} from 'hybrids';
import Cymine from "@intermine/cytoscape-intermine";
import styles from './style.css';

const styleElement = html([`<style>${styles}</style`]);



export const BiojsTest = {
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
    return html `<div>
    <div></div>Loading...
    ${styleElement}</div>`
  }, {
    shadowRoot: false
  })
}

define('biojs-component-test', BiojsTest);
