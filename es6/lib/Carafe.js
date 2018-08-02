"use strict";

import * as fmBridge from 'fm-webviewer-bridge'
import InlineConsole from './InlineConsole';

export default class Carafe {
    constructor() {
        if (!Carafe.instance) {
            Carafe.instance = this;
        }

        this._fmBridge = fmBridge;
        this._isFileMakerWebViewer = false;
        return Carafe.instance;
    }

    setData(data) {
        this._data = data;
    }

    setIsFileMakerWebViewer() {
        this._isFileMakerWebViewer = true;
    }

    isFileMakerWebViewer() {
        return this._isFileMakerWebViewer;
    }

    getData() {
        return this._data;
    }

    getFMBridge() {
        return this._fmBridge;
    }

    enableConsole(pageWrapperSelector, navBar) {
        jQuery(document).ready(function () {
            new InlineConsole();
        });
    }
}
