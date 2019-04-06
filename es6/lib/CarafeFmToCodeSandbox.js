"use strict";

import {getParameters} from 'codesandbox/lib/api/define';

export default class CarafeFmToCodeSandbox {
    /**
     * this file is maintained in Carafe
     * https://github.com/soliantconsulting/carafe/
     *
     * @returns {CarafeFmToCodeSandbox}
     */
    constructor() {
        return this;
    }

    buildCodeSandboxForm (files) {
        if('' !== files["index.html"]) {
            files["index.html"]['content'] = this.carafeReplaceZoneTag(files["index.html"]['content']);
        }

        return getParameters({
            files: files
        });
    };

    carafeReplaceZoneTag (implementationHtml) {
        const carafeZoneTag = new RegExp("(<!--\\s{1,}carafeZoneStart\\s{1,}-->)([\\s\\S]*?)(<!--\\s{1,}carafeZoneEnd\\s{1,}-->)", "g");

        if (null !== implementationHtml.match(carafeZoneTag) && implementationHtml.match(carafeZoneTag).length) {
            const content = "<!-- carafeZoneStart -->\n" +
                "<!-- Carafe Zone is mandatory. Do not modify. -->\n" +
                "<script type=\"application/javascript\" src=\"./Carafe.bundle.js\"><\/script>\n" +
                "<script type=\"application/javascript\" src=\"./CarafeTooling.bundle.js\"><\/script>\n" +
                "<!-- carafeZoneEnd  -->";

            implementationHtml = implementationHtml.replace(carafeZoneTag, content);
        }

        return implementationHtml;
    };
}
