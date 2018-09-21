"use strict";

import * as fmBridge from 'fm-webviewer-bridge'
import 'headjs/dist/1.0.0/head.load';

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

    getJSON(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';

        xhr.onload = function () {
            let status = xhr.status;

            if (status === 200) {
                callback(xhr.response);
            } else {
                // todo: deal with error
                //alert(status);
            }
        };

        xhr.send();
    };

    css(resource) {
        return head.load(resource);
    };

    js(resource) {
        return head.js(resource);
    };

    callCallback(callback) {
        let data = this.getData();

        if (undefined !== data.carafe && undefined !== data.carafe.css) {
            this.css(data.carafe.css)
        }

        if (undefined !== data.carafe && undefined !== data.carafe.js) {
            this.js(data.carafe.js)
        }

        head.ready(() => {
            callback(data);
        });
    };

    ready(callback) {
        head.ready(() => {
            if (!this.isFileMakerWebViewer()) {
                this.getJSON('./ExampleData.json', (data) => {
                    this.setData(data);
                    this.callCallback(callback);
                });
            } else {
                this.callCallback(callback);
            }
        });
    }
}
