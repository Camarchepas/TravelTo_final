// Import PolymerElement class and html helper definition
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

// Define the element's class element
export class FavList extends PolymerElement {

  static get template() {
    return html`
    <style include="granite-bootstrap"></style>
    <style>
    </style>
    <div class="countries container">
      <div class="row">
        <div class="oui">
          <div class="countries" id="myDiv" >

            <template
                id="CountryList" is="dom-repeat"
                items="[[countries]]" filter="_countryFilter" sort="_countrySorter">
              <country-list-item
                  id="[[item.id]]"
                  name="[[item.name]]"
                  description="[[item.description]]"
                  img="[[item.img]]"
                  review="[[item.review]]">

              </country-list-item>
            </template>
          </div>
      </div>
    </div>
  `;
}

static get properties() {
  return {
    countries: {
      type: Array,
    },
    filterText: {
      type: String,
    },
    currentCountries: {
      type: String,
      computed: '_getcurrentCountries(countries, filterText)',
    },
    criterium: {
      type: String,
    },
    descendingSort: {
      type: Boolean,
    },
    favoritesSort:{

    }
  }
}

yeet(){
  console.log("yeet");
}

_inputChange() {
  this.filterText = this.$.search.value;
  this.$.CountryList.render();
  document.getElementById("myDiv").style.display = "block";
}

_sortingChanged() {
  this.criterium = this.$.sort.selectedOptions[0].value;
  this.$.CountryList.render();
}

_descendingChange() {
  this.descendingSort = this.$.descending.checked;
  this.$.CountryList.render();
}

_countryFilter(item) {
    return item.name.match(new RegExp(this.filterText, 'i'));
}

_countrySorter(a, b) {
  var invert = 1;
  if (this.descendingSort) invert = -1;
  if(this.criterium=="review") invert =-invert;
  if ( a[this.criterium] === b[this.criterium] ) return 0;
  if ( a[this.criterium] < b[this.criterium] ) return -1*invert;
  if ( a[this.criterium] > b[this.criterium] ) return 1*invert;
}

_getcurrentCountries() {
  return this.countries.filter((item) => item.name.match(new RegExp(this.filterText, 'i'))).length;
}



async _getData() {
  try {
    const response = await fetch('/data/countries/countries.json');
    this.countries = await response.json();

  }
  catch (err) {
    console.log('fetch failed', err);
  }
}



constructor() {
  super();
  this.countries = [];
  this.criteria = [
    { name: "name", label: "Alphabetical"},
    { name: "review", label: "review" }
  ];

  this.criterium = this.criteria[0].name;
  console.log(this);
  this._getData();

}
}

// Associate the new class with an element name
customElements.define('favorites-list', FavList);
