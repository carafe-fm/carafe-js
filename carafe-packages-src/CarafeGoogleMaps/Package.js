"use strict";

import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import MarkerClusterer from './node_modules/v3-utility-library/markerclustererplus/src/markerclusterer';

import CarafeData from './ExampleData.json';
import Carafe from '../../es6/lib/Carafe';
import CarafeGoogleMaps from "./lib/CarafeGoogleMaps";

const instance = new Carafe();
instance.setData(CarafeData);
window.carafeGoogleMaps = new CarafeGoogleMaps();
window.MarkerClusterer = MarkerClusterer;

module.exports = instance;
