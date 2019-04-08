"use strict";

import "es6-promise/auto";
import 'headjs/dist/1.0.0/head.load';
import * as fmBridge from 'fm-webviewer-bridge'

export default class Carafe {
    /**
     * Provides loader, bundler, access to FMBridge.
     * @returns {Carafe}
     */
    constructor() {
        this._version = '0.7.1';
        this._jsonData = {};
        this._metaData = {
            "cdns": {
                "css": [],
                "js": []
            }
        };
        this._fmBridge = fmBridge;
        this._useStandardDataLoading = true;

        return this;
    }

    /**
     * @param data
     */
    setData(data) {
        this._jsonData = data;
    }

    /**
     * @param data
     */
    setMetaData(data) {
        this._metaData = data;
    }

    /**
     * @param array
     */
    setCssCdnArray(array) {
        this._metaData.cdns.css = array;
    }

    /**
     * @param array
     */
    setJsCdnArray(array) {
        this._metaData.cdns.js = array;
    }

    /**
     * Tell carafe that the implementation will be run in a webviewer.
     * This is used to stop the loading of local resources used for dev/CodeSandbox.
     */
    setIsStandardDataLoading() {
        this._useStandardDataLoading = true;
    }

    setLocalResourceDataLoading() {
        this._useStandardDataLoading = false;
    }

    /**
     * @returns {boolean}
     */
    isStandardDataLoading() {
        return this._useStandardDataLoading;
    }

    /**
     * @returns {{}|*}
     */
    getData() {
        return this._jsonData;
    }

    /**
     * @returns {{}|*}
     */
    getMetaData() {
        return this._metaData;
    }

    /**
     * @returns {*}
     */
    getFMBridge() {
        return this._fmBridge;
    }

    /**
     * Fetch local file resources if configured.
     * Load CDN resources.
     * Call the user callback.
     * @param callback
     */
    ready(callback) {
        new Promise((resolve, reject) => {
            // fetch example json if needed
            resolve(this.isStandardDataLoading() ? undefined : this.fetchLocalFileResources());
        }).then(() => {
            // load CDN resources
            return this.loadResources();
        }).then(() => {
            head.ready(() => {
                callback(this.getData());
            });
        }).catch(function () {
            console.debug('error fetching metaData from configData');
        });
    }

    /**
     * load CDN urls from the metaData into the head loader
     */
    loadResources() {
        const metaData = this.getMetaData();

        if (undefined !== metaData.cdns) {
            if (undefined !== metaData.cdns.css) {
                head.load(metaData.cdns.css);
            }

            if (undefined !== metaData.cdns.js) {
                head.js(metaData.cdns.js);
            }
        }
    }

    /**
     * Fetch sparse bundle files for development.
     * @returns {Promise<[any]>}
     */
    fetchLocalFileResources() {
        const dataRequest = this.getJsonFromUrl('./data.json')
            .then((response) => {
                this.setData(response);
            });

        const configRequest = this.getJsonFromUrl('./config.json')
            .then((response) => {
                if (undefined !== response.metaData) {
                    this.setMetaData(response.metaData);
                }
            });

        return Promise.all([dataRequest, configRequest])
            .catch(function () {
                console.debug('error fetching local file data.json or config.json');
            });
    }

    /**
     * Fetch url and convert to text.
     * @param url
     * @returns {Promise<string>}
     */
    getTextFromUrl(url) {
        return fetch(url)
            .then((resp) => resp.text())
            .catch(function () {
                console.debug('error fetching metaData from builtJs');
            });
    }

    /**
     * Fetch url and convert to JSON
     * @param url
     * @returns {Promise<any>}
     */
    getJsonFromUrl(url) {
        return fetch(url)
            .then((resp) => resp.json())
            .catch(function () {
                console.debug('error fetching json from ' + url);
            });
    }
}
