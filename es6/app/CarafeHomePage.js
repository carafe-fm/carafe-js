"use strict";

import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/CarafeHomePage.css';
import CarafeMarketplace from "../lib/CarafeMarketplace/CarafeMarketplace";

jQuery(document).ready(function () {
    new PostToJsFiddle();
});

window.CarafeMarketplace = new CarafeMarketplace();