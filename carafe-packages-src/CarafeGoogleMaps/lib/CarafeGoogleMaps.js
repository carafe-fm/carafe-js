"use strict";

import 'bootstrap/dist/js/bootstrap.js';
import MarkerClusterer from '../node_modules/v3-utility-library/markerclustererplus/src/markerclusterer';

export default class CarafeGoogleMaps {
    initialize(selector, data) {
        let mapConfig = undefined === data.mapConfig ? {} : data.mapConfig;
        this._markers = [];

        this._map = new google.maps.Map(document.getElementById(selector), mapConfig);

        let markerBounds = new google.maps.LatLngBounds();

        if (data.markers.length) {
            for (let i = 0; i < data.markers.length; i++) {
                let markerConfig = data.markers[i];

                // inject data based icons
                if (undefined !== data && undefined !== markerConfig.icon && undefined !== markerConfig.icon.iconFromData) {
                    if (undefined !== data.icons[markerConfig.icon.iconFromData]) {
                        markerConfig.icon.url = data.icons[markerConfig.icon.iconFromData];
                        delete markerConfig.icon.iconFromData;
                        delete markerConfig.icon.path;
                    }
                }

                let marker = new google.maps.Marker(markerConfig);
                marker.setMap(this._map);

                markerBounds.extend(markerConfig.position);
                this._markers.push(marker);
            }

            this._map.setCenter(markerBounds.getCenter());
            this._map.fitBounds(markerBounds);

            new MarkerClusterer(this._map, this._markers);

        }
    }

    get map() {
        return this._map;
    }


    get markers() {
        return this._markers;
    }
};
