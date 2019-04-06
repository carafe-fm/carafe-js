"use strict";

import Bundle from "./Bundle";

export default class CarafeMarketplace {
    buildBundleHtml(data, carafeSourceUrl, local) {
        let iframeSrc = "data:text/html;base64," + btoa(CarafeMarketplace.buildFrameSource(data, carafeSourceUrl));
        let bundle = new Bundle(data);
        let implementation = bundle.implementation;
        let folderName = implementation.name.replace(/ /g, '_') + '_v' + implementation.semanticVersion.replace(/\./g, '-');
        let implementationLink = '/carafe-implementations/' + folderName + '/template.html';
        let resetLink = '/?reset=' + folderName;
        let deleteLink = '/?delete=' + folderName;
        let copyLink = '/?copy=' + folderName;

        if (local) {
            return `
            <div class="card" style="margin-bottom:30px;">
                <h5 class="card-header">${[implementation.name]} (${[implementation.semanticVersion]})</h5>
                <iframe src="${iframeSrc}" class="carafeIframe"></iframe>
                <div class="card-body">
                    <div class="row bg-light">
                        <h6 class="card-subtitle mb-12 text-muted">${implementation.metaData.documentation.description}</h6>
                    </div>
                    <div class="row">
                        <a href="${implementationLink}" class="card-link">
                            <i class="fa fa-clipboard"></i> Preview
                        </a>
                        <a href="" class="card-link">
                            <i class="fa fa-copy"></i> Duplicate
                        </a>
                        <a href="" class="card-link">
                            <i class="fa fa-copy"></i> New Version
                        </a>
                        <a href="" class="card-link">
                            <i class="fa fa-copy"></i> Share
                        </a>
                        <a href="${copyLink}" class="card-link">
                            <i class="fa fa-exchange"></i> Copy to Carafe
                        </a>
                        <a href="${deleteLink}" class="card-link">
                            <i class="fa fa-trash"></i> Delete Bundle (and local folder)
                        </a>
                        <a href="${resetLink}" class="card-link">
                            <i class="fa fa-undo"></i> Reset to Bundle (local folder differs from bundle)
                        </a>
                    </div>
                </div>
            </div>
        `;

        }

        return `
            <div class="card" style="margin-bottom:30px;">
                <h5 class="card-header">${[implementation.name]} (${[implementation.semanticVersion]})</h5>
                <iframe src="${iframeSrc}" class="carafeIframe"></iframe>
                <div class="card-body">
                    <div class="row bg-light">
                        <h6 class="card-subtitle mb-12 text-muted">${[implementation.metaData.documentation.description]}</h6>
                    </div>
                    <div class="row">
                        <a href="${copyLink}" class="card-link">
                            <i class="fa fa-exchange"></i> Copy to Carafe
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    static buildFrameSource(bundle, carafeSourceUrl) {
        let implementationHtml = bundle.dist.implementationHtml;
        let carafeScriptTag = $('<script type="application/javascript" src="' + carafeSourceUrl + '">');
        let setDataTag = $('<script type="application/javascript">').text(
            'Carafe.setIsFileMakerWebViewer();' +
            'Carafe.setMetaData(' + JSON.stringify(bundle.implementation.metaData) + ');' +
            'Carafe.setData(' + JSON.stringify(bundle.implementation.exampleJsonData) + ');'
        );

        // @todo make tags configurable or an array of possible tags
        let carafeZoneTag = new RegExp("(<!-- carafeZoneStart -->)([\\s\\S]*?)(<!-- carafeZoneEnd  -->)", "g");

        if (null !== implementationHtml.match(carafeZoneTag) && implementationHtml.match(carafeZoneTag).length) {
            let content = $('<div>');
            content.append(carafeScriptTag).append("\n");
            content.append(setDataTag.clone()).append("\n");
            implementationHtml = implementationHtml.replace(carafeZoneTag, content.html());
        }

        return implementationHtml;
    }
}
