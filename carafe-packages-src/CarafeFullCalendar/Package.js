"use strict";

import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './../../node_modules/fullcalendar/dist/fullcalendar.css';
import fullcalendar from 'fullcalendar';
import CarafeData from './ExampleData.json';
import Carafe from '../../es6/lib/Carafe';

const instance = new Carafe();
instance.setData(CarafeData);
module.exports = instance;
window.fullcalendar = fullcalendar;
