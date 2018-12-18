import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

// Import template repeater
import '@polymer/polymer/lib/elements/dom-repeat.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap';

import './country-list-item.js';


export class CountryList extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
      .favBtn{
        position:absolute;
      }

      </style>
      <div class="countries container">
        <div class="row">
          <div class="search_boxes"  style='margin-top: 195px; margin-bottom: 145px; margin-left: 30px'>


            <!--Sidebar content-->
            <!--Sidebar content-->
            <div class="form-group">
              <input
                  type="text"
                  class="form-control"
                  id="search"
                  placeholder="Entrez votre recherche"
                  on-input="_inputChange"
                  font-color="white"
                  style='background-color:rgba(180, 220, 255,1);'>
              <label for="sort" class="mt-3">Trier par</label>
              <select
                  id="sort"
                  class="form-control"
                  on-change='_sortingChanged'
                  style='background-color:rgba(180, 220, 255,1);'>
                <template is="dom-repeat" items="[[criteria]]">
                  <option
                      value="[[item.name]]">
                    [[item.label]]
                  </option>
                </template>
              </select>
              <label for="descending" class="mt-3">Descending sort</label>
              <input
                  id="descending"
                  type="checkbox"
                  on-change="_descendingChange">
              <input type="button" class='favBtn' style='margin-top: 10px;  margin-left: 20px' onclick="location.href='http://127.0.0.1:8081/components/TravelTo/?#/favorites';" value="Favorites" />
            </div>
          </div>
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
      }
    }
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
      { name: "name", label: "Ordre alphabetique"},
      { name: "review", label: "Evaluation" }
    ];

    this.criterium = this.criteria[0].name;

    this._getData();
  }
}

customElements.define('country-list', CountryList);
