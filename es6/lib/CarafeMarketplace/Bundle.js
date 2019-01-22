"use strict";

export default class Bundle {
    constructor(bundle) {
        this._implementation = bundle.implementation;
        this._metaData = bundle.metaData;
        this._title = 'title';
        this._subtitle = 'subtitle';
        this._text = 'text';
    }

    get metaData() {
        return this._metaData;
    }

    get implementation() {
        return this._implementation;
    }

    get title() {
        return this._title;
    }

    get subtitle() {
        return this._subtitle;
    }

    get text() {
        return this._text;
    }

    get implementationName() {
        return this._implementationName;
    }
}
