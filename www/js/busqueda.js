	$(function() {
		s2.config = configbase();
        dwr.engine.setErrorHandler(function(e){
            console.log(e)
        });
        $('#query').bind('keyup', function(e) {
            delay(function() {

                $("#progreso").show();
                $('#search_results').empty();
                if ($('#query')[0].value === '') {
                    return;
                }

                // Prevent form send
                e.preventDefault();
                Server._path = pathToDwrServlet;
                stype = $('#searchType').val();
                qvalor = $('#query')[0].value;

                Server.suggest(stype, qvalor, function(results) {
                    $.each(results, function() {
                        var place = this;
                        $('<li class="list-group-item">').hide()
                                .append($('<span />', {
                                    text: place.label
                                })).appendTo('#search_results')
                                .click(function() {
                                    Server.select(place.type, place.id, null, 'public', function(results) {
                                        s2.selectResults(place.type, place.id, results);
                                        if (place.type == 'Address' ||
                                                place.type == 'Building' ||
                                                place.type == 'Business' ||
                                                place.type == 'Pointer' ||
                                                place.type == 'RUC') {
                                            buscaDescripcion(place.id);
                                        }
                                    });

                                }).show();
                    });
                    $("#progreso").hide();
                    $('#search_results').listview('refresh');
                });

            }, 1000);

        });

        // only listen to the first event triggered
        $('#query').focus();
    });


function buscaDescripcion(pBID) {
    $.getJSON(pathBaseServlet + "geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature"
            + "&srsName="
            + map.getProjection()
            + "&outputFormat=JSON"
            + "&typeName="
            + 'S2:DAD_Buildings'
            + '&CQL_FILTER=Dad_BuildingID in (' + pBID + ')',
            function(data) {
                var nuevasFeatures = data;
                var centro = nuevasFeatures[0].geometry.getBounds().getCenterLonLat();
                var lines = new Array();
                var resultLines = nuevasFeatures[0].data.InterfazAddress.split('<br/>');
                for (var l in resultLines) {
                    var line = resultLines[l];
                    if (line.indexOf('<') == -1 && line.indexOf(':') > 0) {
                        line = $.i18n.prop(line.substring(0, line.indexOf(':'))) + line.substring(line.indexOf(':'));
                    }
                    lines.push(line);
                }

            });
}

var delay = (function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();
