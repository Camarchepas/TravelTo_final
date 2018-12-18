import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@granite-elements/granite-bootstrap/granite-bootstrap';


export class CountryDetail extends PolymerElement {

  static get template() {
    return html`
      <style include="granite-bootstrap"></style>
      <style>
        .country {
          -webkit-box-sizing: content-box;
          -moz-box-sizing: content-box;
          box-sizing: content-box;
          padding: 42px;
          border: none;
          font: normal 16px/1 "Karla", Times, serif;
          color: black;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          -webkit-box-shadow: 5px 5px 8px 2px rgba(0,0,0,0.4) ;
          box-shadow: 5px 5px 8px 2px rgba(0,0,0,0.4) ;
          text-align: justify;
          background-color:rgba(136, 167, 255,0.7);
        }
        .back {
          width: 50px;
          height: 50px;
        }
        .img {
          float: right;
          margin-right: 1em;
          margin-bottom: 1em;
          background-color: none;
          padding: 1em;
          max-height: 600px;
          max-width: 600px;
        }

        .name{
          margin-top:20px;
        }


        div.name-flag {
          margin: 1;
          list-style: none;
          display: inline-block;
          background-color: none;
        }

        div.name-flag img {
          max-height: 100px;
          max-width: 100px;
          padding: 1em;
        }

        ul.specs {
          clear: both;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        ul.specs > li{
          display: inline-block;
          width: 200px;
          vertical-align: top;
        }

        ul.specs > li > span{
          font-weight: bold;
          font-size: 1.2em;
        }

        ul.specs dt {
          font-weight: bold;
        }
        p.description{
          -webkit-box-sizing: content-box;
          -moz-box-sizing: content-box;
          box-sizing: content-box;
          font-size:25px;
          padding: 8px;
          border-radius: 7px;
          background-color:rgba(160, 190, 255,0.95);
          margin-top:20px;
          max-width: 750px;
        }

        h1 {

        }
      </style>

      <div id="[[country.id]]" class="country clearfix">
        <div class="name-flag">
        <h1 class="name">[[country.name]]</h1>
        <img src="/data/[[country.label]]" country="[[country.label]]" on-click="setImage"/>
        </div>
        <img class="pull-right img" src="/data/[[country.imgdetails]]"/>
        <p class="description">[[country.description2]]</p>
        <ul class="specs">
          <li>
            <dl>
              <dt>Evaluation</dt>
              <dd>[[country.review]]/5</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>Continent</dt>
              <dd>[[country.continent]]</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>Budget</dt>
              <dd>[[country.budget]]</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>Gastronomie</dt>
              <dd>[[country.gastronomie]]</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>Favoris</dt>
              <input type="checkbox" id="[[country.name]]" on-change="_changeJson"/>
            </dl>
          </li>
          <li>
          <dt>Distant de</dt>
          <dd>[[distance]] km</dd>
          </li>
        </ul>
      </div>
    `;
  }

  _changeJson(){
    //console.log(this.countries[this.id].favoris);
    this.countries[this.id].favoris = "1";
    //console.log(this.countries[this.id].favoris);
  }


  static get properties() {
    return {
      id: {
        type: String,
        observer: '_onIdChange',
      },
      country: {
        type: Object,
      },

      distance : {
        type: Number
      }
    };
  }


    //var x = document.getElementById("demo");
    _getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.myPosition.bind(this),this.myErrorPosition);
        console.log("geo is active");
  } else {
        this.x.innerHTML = "Geolocation is not supported by this browser.";
        //console.log(this.x);
    }
  }

  myPosition(position) {

  var latitudeFr = position.coords.latitude* Math.PI / 180;
  var longitudeFr = position.coords.longitude* Math.PI / 180;
  var latitudeEtr = this.countries[this.id].Latitude* Math.PI / 180;
  var longitudeEtr = this.countries[this.id].Longitude * Math.PI / 180;
  var Dist =6371*  Math.acos(
                    (Math.sin(latitudeFr))*(Math.sin(latitudeEtr))
                    +
                    (Math.cos(latitudeFr))*(Math.cos(latitudeEtr)) * Math.cos(longitudeFr-longitudeEtr));

  console.log(Dist);
  this.distance = Dist.toFixed(2);;
  //this.distance = infopos;
}

  myErrorPosition(err)
  {
    console.log(err)
  }


  async _onIdChange() {
    const url = `/data/countries/countries.json`;

    try {

      const response = await fetch(url);
      this.countries = await response.json();
      this.country = this.countries[this.id];

      this._getLocation();
    }
    catch (err) {
      console.log('fetch failed', err);
    }
  }

  constructor() {
    super();
    //this.infopos=
  }

  ready(){
    super.ready();

    //this._getLocation();
  }
}


customElements.define('country-detail', CountryDetail);
