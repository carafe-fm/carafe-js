"use strict";

import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'justifiedGallery';
import './../../node_modules/justifiedGallery/dist/css/justifiedGallery.css'

import Carafe from '../../es6/lib/Carafe';

const instance = new Carafe();
module.exports = instance;
