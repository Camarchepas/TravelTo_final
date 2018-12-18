// Import PolymerElement class and html helper definition
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

// Define the element's class element
export class CountryListItem extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
        .country {
          -webkit-box-sizing: content-box;
          -moz-box-sizing: content-box;
          box-sizing: content-box;
          padding: 42px;
          border-radius: 7px;
          background-color:rgba(136, 167, 255,0.95);
          font: normal 16px/1 "Times New Roman", Times, serif;
          color: black;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          -webkit-box-shadow: 5px 5px 8px 2px rgba(0,0,0,0.4) ;
          box-shadow: 5px 5px 8px 2px rgba(0,0,0,0.4) ;
          text-align: justify;
          margin-bottom:30px;
        }

        .el-img {
          max-height: 200px;
        }

      </style>
      <div id="[[id]]" class="country clearfix">
        <img class="float-right el-img" style='padding: 30px' src="/data/countries/[[img]]">
        <a href="#/country/[[id]]"><h2 class="el-name">[[name]]</h2></a>
        <p class="el-description">[[description]]</p>
        <p class="float-right el-review">Evaluation: [[review]]/5</p>
      </div>
    `;
  }

  static get properties() {
    return {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      img: {
        type: String,
      },
      review: {
        type: String,
      },
    }
  }
}

// Associate the new class with an element name
customElements.define('country-list-item', CountryListItem);
