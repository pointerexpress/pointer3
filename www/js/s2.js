var seleccionbusqueda = new Array();
var marcabusqueda = new Array();

s2.setWFSLayer = function(name, layerName, filter) {

    console.log("setWFSLayer: " + name);
    var wfsurl = pathBaseServlet + "geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature"
            + "&srsName="
            + s2.config.maxBounds.srs
            + "&outputFormat=JSON"
            + "&typeName="
            + layerName + filter;

    $.getJSON(wfsurl,
            function(data) {

                var resultados = data.features.length;

                if (resultados == 1 || layerName == "S2:DAD_Roads" || layerName == "S2:DAD_Barrio") {
                    try {
                        for (i = 0; i < marcabusqueda.length; i++) {
                            map.removeLayer(marcabusqueda[i]);
                        }
                        for (i = 0; i < seleccionbusqueda.length; i++) {
                            map.removeLayer(seleccionbusqueda[i]);
                        }
                    } catch (e) {
                        console.log(e);
                    }

                    for (var poligono in data.features) {
                        seleccionind = new L.geoJson(data.features[poligono]);
                        seleccionbusqueda.push(seleccionind)
                        map.addLayer(seleccionind);
                        if (resultados == 1) {
                            marcaind = new L.marker(seleccionind.getBounds().getCenter());
                            var etiqueta = "";
                            if (layerName == "S2:DAD_Barrio") {
                                etiqueta = data.features[poligono].properties.DAD_BarrioName;
                            } else {
                                etiqueta = data.features[poligono].properties.InterfazAddress;
                            }

                            map.addLayer(marcaind);
                            marcaind.bindPopup(etiqueta).openPopup();
                            marcabusqueda.push(marcaind);
                        }
                        map.fitBounds(seleccionind);
                    }
                }

                $("#lista").hide();


            });

    console.log("Layer setWFSLayer: " + name);
    console.log("Protocol setWFSLayer: " + wfsurl);
};



s2.searchResults = function(results) {
    s2.results = results;

    // Highlight Buildings on map
    if (results.buildings.length) {
        var bs = '';
        for (var b in results.buildings) {
            if (bs != '')
                bs += ',';
            bs += results.buildings[b].id;
        }
        s2.setWFSLayer('SearchBuildings2', 'S2:DAD_Buildings', bs ? '&CQL_FILTER=Dad_BuildingID in (' + bs + ')' : null);
    }
}

s2.selectResults = function(type, id, results) {
    s2.results = results;

    s2.searchResults(results);

    if (type == 'Roads') {
        s2.setWFSLayer('SearchWFS', 'S2:DAD_Roads', '&CQL_FILTER=Dad_RoadSegmentID in (' + results.subIds.join(',') + ')');
    }
    else if (type == "Barrio") {
        var ids = id.split('.');
        s2.setWFSLayer('SearchWFS', 'S2:DAD_' + type, "&CQL_FILTER=DAD_BarrioID eq '" + ids[0] + "' and DAD_CorregID eq '" + ids[1] + "'");
    }

};

s2.clickBusqueda = function(lonlatclone) {

    Proj4js.defs["EPSG:32617"] = "+proj=utm +zone=17 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";
    var source = new Proj4js.Proj("EPSG:4326");
    var dest = new Proj4js.Proj("EPSG:" + s2.config.dataSrid);


    var p = new Proj4js.Point(lonlatclone.lng, lonlatclone.lat);
    Proj4js.transform(source, dest, p);
    console.log(p);

    Server._path = pathToDwrServlet;
    Server.search('POINT(' + p.x + ' ' + p.y + ')', s2.config.dataSrid, 'point', null, 'public', function(results) {
        if (results.buildings.length > 0) {
            s2.setWFSLayer('SearchBuildings2', 'S2:DAD_Buildings', results.buildings[0].id ? '&CQL_FILTER=Dad_BuildingID in (' + results.buildings[0].id + ')' : null);
        } else {
            popup
                    .setLatLng(lonlatclone)
                    .setContent("No encontrado.")
                    .openOn(map);
        }

    });
};