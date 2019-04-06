"use strict";

import {getParameters} from 'codesandbox/lib/api/define';
import "jquery";
import ButtonModalHtml from "./ButtonModal.html";

export default class ButtonModal {
    constructor() {
        this.carafeText = null;
        this.templateHtml = null;
        this.implementationData = null;
        this.exampleJsonData = null;

        const fetchTemplate = fetch("./template.html")
            .then(response => response.text())
            .then(templateHtml => {
                this.templateHtml = templateHtml;
            })
            .catch(function () {
                console.debug('error fetching template.html');
            });

        const fetchImplementation = fetch("./implementationData.json")
            .then(response => response.json())
            .then(implementationData => {
                this.implementationData = implementationData;
            })
            .catch(function () {
                console.debug('error fetching implementationData.json');
            });

        const fetchExampleJson = fetch("./exampleJsonData.json")
            .then(response => response.json())
            .then(exampleJsonData => {
                this.exampleJsonData = exampleJsonData;
            })
            .catch(function () {
                console.debug('error fetching exampleJsonData.json');
            });

        const fetchCarafeSource = fetch("/carafe-packages-build/Carafe/Carafe.bundle.js")
            .then(response => response.text())
            .then(carafeText => {
                this.carafeText = carafeText;
            })
            .catch(function () {
                console.debug('error fetching Carafe.bundle.js');
            });

        Promise.all([
            fetchTemplate,
            fetchImplementation,
            fetchExampleJson,
            fetchCarafeSource
        ]).then(
            resp => {
                this.buildModal();

                this.buildCodeSandboxButton();

                $(document).keydown((e) => {
                    e = e || event; // to deal with IE @todo check to be sure this fails without to be sure it's necessary

                    if (e.keyCode === 77 && (e.metaKey && !e.ctrlKey) && (e.shiftKey)) {
                        e.preventDefault();
                        ButtonModal.openModal();
                    }
                });
            }
        );
    }

    buildModal() {
        let modalContent = $(ButtonModalHtml);

        modalContent.find('li.codeSandbox').on('click', () => {
            this.openCodeSandboxButton();
            $('#buttonModal').modal('hide');
        });

        modalContent.find('li.buildImplementation').on('click', () => {
            this.buildImplementation();
            $('#buttonModal').modal('hide');
        });

        modalContent.find('li.createBundle').on('click', () => {
            this.postData('/', {bundle: this.buildImplementation()})
                .then(data => {
                    if (undefined !== data.location) {
                        window.location = data.location;
                    }
                })
                .catch(error => console.error(error));

            $('#buttonModal').modal('hide');
        });

        modalContent.find('li.marketplace').on('click', () => {
            window.location = '/';
        });

        $('body').append(modalContent);
    }

    static openModal() {
        $('#buttonModal').modal('show');
    }

    downloadObjectAsJson(exportObj, exportName) {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    buildImplementation() {
        let templateHtml = this.templateHtml;
        let returnJson = {
            "implementation": this.implementationData,
            "dist": {
                "implementationHtml": templateHtml,
                "builtCss": "",
                "builtJs": ""
            }
        };

        returnJson.implementation.exampleJsonData = this.exampleJsonData;

        return returnJson;
    }

    openCodeSandboxButton() {
        $('form#openCodeSandbox').submit();
    }

    buildCodeSandboxButton() {
        let implementationHtml = this.templateHtml;
        const carafeZoneTag = new RegExp("(<!--\\s{1,}carafeZoneStart\\s{1,}-->)([\\s\\S]*?)(<!--\\s{1,}carafeZoneEnd\\s{1,}-->)", "g");

        if (null !== implementationHtml.match(carafeZoneTag) && implementationHtml.match(carafeZoneTag).length) {
            let content = $('<div>')
                .append('<!-- carafeZoneStart -->')
                .append("\n")
                .append(('<script type="application/javascript" src="./Carafe.bundle.js">'))
                .append("\n")
                .append('<script type="application/javascript">Carafe.enablePostBundleToFileMaker();</script>')
                .append("\n")
                .append("<!-- carafeZoneEnd  -->")
            ;
            implementationHtml = implementationHtml.replace(carafeZoneTag, content.html());
        }

        const parameters = getParameters({
            files: {
                "package.json": {
                    content: {
                        "name": "static",
                        "version": "1.0.0",
                        "description": "This is a static template with no bundling",
                        "main": "index.html"
                    }
                },
                "sandbox.config.json": {
                    content: {
                        "template": "static"
                    }
                },
                "index.html": {
                    content: implementationHtml
                },
                "Carafe.bundle.js": {
                    content: this.carafeText
                },
                "implementationData.json": {
                    content: this.implementationData
                },
                "exampleJsonData.json": {
                    content: this.exampleJsonData
                }
            }
        });

        const form = document.createElement("form");
        form.style = 'display:none';
        form.id = 'openCodeSandbox';
        form.action = 'https://codesandbox.io/api/v1/sandboxes/define';
        form.method = 'POST';
        form.target = '_blank';
        const parameterInput = document.createElement("input");
        parameterInput.type = 'hidden';
        parameterInput.name = 'parameters';
        parameterInput.value = parameters;
        form.append(parameterInput);
        const buttonInput = document.createElement("input");
        buttonInput.type = 'submit';
        buttonInput.value = 'Open in sandbox';
        form.append(buttonInput);

        $('body').append(form);
    }

    postData(url = ``, data = {}) {
        return fetch(
            url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json()); // parses response to JSON
    }
}
