
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/app-route/app-route';
import '@polymer/app-route/app-location';

import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

import './country-list.js';
import './country-detail';
import './favorites-list.js'


export class CountryMain extends PolymerElement {

  static get template() {
    return html`


      <style include="granite-bootstrap"></style>

      <app-location route="{{route}}" use-hash-as-path></app-location>

      <app-route route="[[route]]" pattern="/countries" active="{{countryListActive}}"></app-route>
      <app-route route="[[route]]" pattern="/country/:id" data="{{CountryId}}" active="{{CountryIdActive}}"></app-route>
      <app-route route="[[route]]" pattern="/favorites" active="{{favoritesActive}}"></app-route>


      <template is="dom-if" if="{{countryListActive}}">

        <country-list></country-list>
      </template>

      <template is="dom-if" if="{{CountryIdActive}}">
        <country-detail id="[[CountryId.id]]"></country-detail>
      </template>

      <template is="dom-if" if="{{favoritesActive}}">
        <favorites-list></favorites-list>
      </template>

    `;
  }


  static get properties() {
    return {
      countryListActive: {
        type: Boolean,
      },
      CountryIdActive: {
        type: Boolean,
      },
      CountryId: {
        tpe: String,
      },
      route: {
        type: Object,
      },
      favoritesActive:{
        type:Boolean,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.route.path) {
      this.route = { ... this.route, path: '/countries' }
    }
  }
}


customElements.define('country-main', CountryMain);
