"use strict";

import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'justifiedGallery';
import './../../node_modules/justifiedGallery/dist/css/justifiedGallery.css'

import CarafeData from './ExampleData.json';
import Carafe from '../../es6/lib/Carafe';

const instance = new Carafe();
instance.setData(CarafeData);
module.exports = instance;
