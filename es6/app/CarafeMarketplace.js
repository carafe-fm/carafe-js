"use strict";

import CarafeMarketplace from "../lib/CarafeMarketplace/CarafeMarketplace";
import jQuery from "jquery";

window.$ = window.jQuery = jQuery;
const instance = new CarafeMarketplace();

window.CarafeMarketplace = instance;
