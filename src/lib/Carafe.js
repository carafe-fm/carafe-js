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
        this._version = '0.6.0';
        this._jsonData = {};
        this._metaData = {};
        this._fmBridge = fmBridge;
        this._isFileMakerWebViewer = false;

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
     * Tell carafe that the implementation will be run in a webviewer.
     * This is used to stop the loading of local resources used for dev/CodeSandbox.
     */
    setIsFileMakerWebViewer() {
        this._isFileMakerWebViewer = true;
    }

    /**
     * @returns {boolean}
     */
    isFileMakerWebViewer() {
        return this._isFileMakerWebViewer;
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
     * Fetch sparse bundle resources if not in FileMaker.
     * Load CDN resources.
     * Setup update bundle callback functions when not in FileMaker
     * Call the user callback.
     * @param callback
     */
    ready(callback) {
        new Promise((resolve, reject) => {
            // fetch example json if needed
            resolve(this.isFileMakerWebViewer() ? undefined : this.fetchLocalFileResources());
        }).then(() => {
            // load CDN resources
            return this.loadResources();
        }).then(() => {
            head.ready(() => {
                callback(this.getData());
            });
        }).catch(function () {
            console.debug('error fetching metaData from implementationData');
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
        const exampleJsonRequest = this.getJsonFromUrl('./exampleJsonData.json')
            .then((response) => {
                this.setData(response);
            });

        const metaDataRequest = this.getJsonFromUrl('./implementationData.json')
            .then((implementationData) => {
                // @todo trap for errors?
                this.setMetaData(implementationData.metaData);
            });

        return Promise.all([exampleJsonRequest, metaDataRequest])
            .catch(function () {
                console.debug('error fetching metaData from implementationData');
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
