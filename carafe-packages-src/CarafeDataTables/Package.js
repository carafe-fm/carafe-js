"use strict";

import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import './lib/style.scss';
import CarafeData from './ExampleData.json';
import Carafe from '../../es6/lib/Carafe';

const instance = new Carafe();
instance.setData(CarafeData);
module.exports = instance;
