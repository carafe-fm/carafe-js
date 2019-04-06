"use strict";

import {getParameters} from 'codesandbox/lib/api/define';
import Swal from 'sweetalert2';

export default class CarafeTooling {
    constructor(Carafe) {
        this.carafeSource = null;
        this.carafeToolingJs = null;
        this.templateHtml = null;
        this.implementationData = null;
        this.exampleJsonData = null;
        this.swal = Swal;

        const fetchTemplate = fetch("./template.html")
            .then(response => response.text())
            .then(templateHtml => {
                this.templateHtml = templateHtml;
            });

        const fetchImplementation = fetch("./implementationData.json")
            .then(response => response.json())
            .then(implementationData => {
                this.implementationData = implementationData;
            });

        const fetchExampleJson = fetch("./exampleJsonData.json")
            .then(response => response.json())
            .then(exampleJsonData => {
                this.exampleJsonData = exampleJsonData;
            });

        const fetchCarafeSource = fetch("/carafe-packages-build/Carafe/Carafe.bundle.js")
            .then(response => response.text())
            .then(carafeSource => {
                this.carafeSource = carafeSource;
            });

        const fetchCarafeTooling = fetch("/apps/CarafeTooling.bundle.js")
            .then(response => response.text())
            .then(carafeToolingJs => {
                this.carafeToolingJs = carafeToolingJs;
            });

        Promise.all([
            fetchTemplate,
            fetchImplementation,
            fetchExampleJson,
            fetchCarafeSource,
            fetchCarafeTooling
        ]).then(
            resp => {
                this.appendCodeSandboxSubmissionFormToBody();

                window.addEventListener('keydown', (e) => {
                    if (e.keyCode === 83 && (e.metaKey && !e.ctrlKey) && (e.shiftKey)) {
                        let buttons = '<button type="button" style="margin-bottom:10px;" class="btn btn-primary"id="carafeImportPackage">Export to FileMaker Carafe</button>';

                        if (window.location.href.indexOf("codesandbox.io") === -1) {
                            buttons += '<button type="button" style="margin-bottom:10px;" class="btn btn-primary"id="carafeGotoMarketplace">Return to Marketplace</button>' +
                            '<button type="button" style="margin-bottom:10px;" class="btn btn-primary" id="carafeOpenInCodeSandbox">Open in Code Sandbox</button>';
                        }

                        this.swal({
                            title: 'Choose your action:',
                            html: '<div class="btn-group-vertical" style="padding:24px;">' + buttons + '</div>',
                            showCancelButton: false,
                            showConfirmButton: false,
                        });

                        if (window.location.href.indexOf("codesandbox.io") === -1) {
                            document.getElementById("carafeGotoMarketplace").onclick = e => {
                                window.location = "/";
                            };

                            document.getElementById("carafeOpenInCodeSandbox").onclick = e => {
                                document.getElementById('openCodeSandbox').submit();
                            };
                        }

                        document.getElementById("carafeImportPackage").onclick = e => {
                            CarafeTooling.assembleBundle()
                                .then(carafeBundle => {
                                    Carafe.getFMBridge().callFMScript(
                                        'Carafe',
                                        'Carafe Bundle Importer',
                                        JSON.stringify(carafeBundle)
                                    );
                                });
                        };
                    }
                });
                let timerInterval;
                this.swal({
                    title: 'Carafe Development:',
                    html: '<p>This page has been loaded with Carafe development tooling. Hit shift+command+s to get access to additional commands.</p>'
                });

            }
        ).catch(function () {
            console.debug('error fetching all');
        });
    }

    appendCodeSandboxSubmissionFormToBody() {
        let implementationHtml = this.templateHtml;
        const carafeZoneTag = new RegExp("(<!--\\s{1,}carafeZoneStart\\s{1,}-->)([\\s\\S]*?)(<!--\\s{1,}carafeZoneEnd\\s{1,}-->)", "g");

        if (null !== implementationHtml.match(carafeZoneTag) && implementationHtml.match(carafeZoneTag).length) {
            implementationHtml = implementationHtml.replace(carafeZoneTag,
                "<!-- carafeZoneStart -->\n" +
                "<script type=\"application/javascript\" src=\"./Carafe.bundle.js\"></script>\n" +
                "<script type=\"application/javascript\" src=\"./CarafeTooling.bundle.js\"></script>\n" +
                "<!-- carafeZoneEnd  -->"
            );
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
                    content: this.carafeSource
                },
                "CarafeTooling.bundle.js": {
                    content: this.carafeToolingJs
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

        document.getElementsByTagName('body')[0].appendChild(form);
    }


    /**
     * Assemble bundle from sparse bundle resources.
     * @returns {Promise<{dist: {builtCss: string, builtJs: string, implementationHtml: string}, implementation}>}
     */
    static assembleBundle() {
        let exampleJsonData = {};
        let implementationData = {};
        let templateHtml = '';
        let builtJs = '';
        let builtCss = '';

        const exampleJsonRequest = Carafe.getJsonFromUrl('./exampleJsonData.json')
            .then((respJson) => {
                exampleJsonData = respJson;
            });

        const metaDataRequest = Carafe.getJsonFromUrl('./implementationData.json')
            .then((respJson) => {
                implementationData = respJson;
            });

        const templateHtmlRequest = Carafe.getTextFromUrl('./template.html')
            .then((response) => {
                templateHtml = response;
                templateHtml = CarafeTooling.replaceCarafeZoneTagAndCodeSandboxLinks(templateHtml);
            });

        const builtJsRequest = Carafe.getTextFromUrl('/carafe-packages-build/Carafe/Carafe.bundle.js')
            .then((response) => {
                builtJs = response;
            });

        return Promise.all([exampleJsonRequest, metaDataRequest, templateHtmlRequest, builtJsRequest])
            .then(done => {
                implementationData.exampleJsonData = exampleJsonData;

                return {
                    "dist":
                        {
                            "builtCss": "",
                            "builtJs": builtJs,
                            "implementationHtml": templateHtml
                        },
                    "implementation": implementationData
                };
            }).catch(function () {
                console.debug('error fetching metaData from builtJs');
            });
    }

    /**
     * Replace everything between carafeZoneStart and carafeZoneEnd tags. In this case, with commented out
     * code so it doesn't run in FM.
     * @param templateHtml
     * @returns {*}
     */
    static replaceCarafeZoneTagAndCodeSandboxLinks(templateHtml) {
        const carafeZoneTag = new RegExp("(<!--\\s{1,}carafeZoneStart\\s{1,}-->)([\\s\\S]*?)(<!--\\s{1,}carafeZoneEnd\\s{1,}-->)", "g");
        const sandboxManifestTag = new RegExp("(([\\s]*?)<link rel=\"manifest\" href=\"/manifest.json\">\\n)", "g");
        const sandboxSseTag = new RegExp("(([\\s]*?)<script type=\"text/javascript\" src=\"https://codesandbox.io/public/sse-hooks/sse-hooks.js\"><\/script>\\n)", "g");

        if (null !== templateHtml.match(carafeZoneTag) && templateHtml.match(carafeZoneTag).length) {
            // @todo discuss if we should keep anything inside the tag in fm? Why keep the commented out script tag?
            templateHtml = templateHtml
                .replace(
                    carafeZoneTag,
                    "<!-- carafeZoneStart -->\n" +
                    "        <!-- Carafe Zone is mandatory. Do not modify. -->\n" +
                    "        <!-- <script src=\"./Carafe.bundle.js\"><\/script> -->\n" +
                    "    <!-- carafeZoneEnd  -->"
                )
                .replace(sandboxManifestTag, "\n")
                .replace(sandboxSseTag, "\n");
        }
        return templateHtml;
    }
}
