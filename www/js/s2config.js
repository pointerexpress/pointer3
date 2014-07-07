function configbase() {
    json_text = {
        "baseMapXYZURL": "geoserver/cache/S2BaseMap/${z}/${x}/${y}",
        "dataSrid": 32617,
        "helpPage": "help/index.html",
        "layers": [
            {
                "name": "S2BaseSatellite",
                "xzyURL": "geoserver/cache/S2BaseSatellite/${z}/${x}/${y}"
            },
            {
                "name": "S2:DAD_Correg",
                "xzyURL": "geoserver/cache/S2:DAD_Correg/${z}/${x}/${y}"
            },
            {
                "name": "S2:DAD_Barrio",
                "xzyURL": "geoserver/cache/S2:DAD_Barrio/${z}/${x}/${y}"
            }
        ],
        "mapSrs": "EPSG:900913",
        "maxBounds": {
            "maxX": -79.15046233995301,
            "maxY": 9.23154819993418,
            "minX": -79.69535621252196,
            "minY": 8.9062335142172,
            "srs": "EPSG:4326"
        },
        "maxHoverZoom": 16,
        "maxZoom": 18,
        "minZoom": 8,
        "poi": [
            "BK",
            "CR",
            "FA",
            "HP",
            "HT",
            "MS",
            "RT",
            "SM",
            "UN"
        ],
        "resolutions": [
            156543.03390625,
            78271.516953125,
            39135.7584765625,
            19567.87923828125,
            9783.939619140625,
            4891.9698095703125,
            2445.9849047851562,
            1222.9924523925781,
            611.4962261962891,
            305.74811309814453,
            152.87405654907226,
            76.43702827453613,
            38.218514137268066,
            19.109257068634033,
            9.554628534317017,
            4.777314267158508,
            2.388657133579254,
            1.194328566789627,
            0.5971642833948135,
            0.29858214169740677,
            0.14929107084870338,
            0.07464553542435169,
            0.037322767712175846,
            0.018661383856087923,
            0.009330691928043961,
            0.004665345964021981,
            0.0023326729820109904,
            0.0011663364910054952,
            0.0005831682455027476,
            0.0002915841227513738,
            0.0001457920613756869
        ],
        "sessionTimeoutSecs": 3600,
        "units": "meters",
        "user": {
            "role": "PUBLIC",
            "username": "public"
        }
    };
    return json_text;
}