"use strict";

import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../../es6/css/CarafeHomePage.css';
import * as d3 from 'd3';
import CarafeData from './ExampleData.json';
import Carafe from '../../es6/lib/Carafe';

const instance = new Carafe();
instance.setData(CarafeData);
module.exports = instance;

// export to window
window.d3 = d3;
