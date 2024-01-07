// criarMapa
var map = new L.Map('map', {
    center: new L.LatLng(-7, -55),
    zoom: 4,
    attributionControl: true,
    zoomControl: false,
    minZoom: 0,
    maxZoom: 17,
    zoomSnap: 0.25,
});

var baselayer = new L.TileLayer(basemaps[3]['tilelayer'], {
    minZoom: basemaps[3]['minZoom'],
    maxZoom: basemaps[3]['maxZoom'],
    attribution: basemaps[3]['attribution']
});

map.addLayer(baselayer);

const provider = new window.GeoSearch.OpenStreetMapProvider();
const search = new GeoSearch.GeoSearchControl({
    provider: provider,
    style: 'bar',
    updateMap: true,
    autoClose: true,
    searchLabel: 'Buscar Endereço',
});

map.addControl(search);
// Fim criarMapa

// mudarMapa
$("#tipoMapa").on("change", "", function (e) {
    let num = $("#tipoMapa").val();

    var baselayer = new L.TileLayer(basemaps[num]['tilelayer'], {
        minZoom: basemaps[num]['minZoom'],
        maxZoom: basemaps[num]['maxZoom'],
        attribution: basemaps[num]['attribution']
    });

    map.addLayer(baselayer);

    // var servidorapp = 'https://seia.idema.rn.gov.br/geoserver/';
    // var cmds = {
    //     "wmsLimites": L.tileLayer.betterWms(servidorapp + "wms", {
    //         layers: 'idemarn:limites_municipais_rn',
    //         format: 'image/png',
    //         version: '1.3.0',
    //         transparent: true,
    //         name: 'Limites Municipais'
    //     }),
    // }
    // map.addLayer(cmds["wmsLimites"]);

});
// Fim mudarMapa


// Draw

var custon1 = L.Icon.extend({
    options: {
        shadowUrl: null,
        iconAnchor: new L.Point(12, 12),
        iconSize: new L.Point(24, 24),
        iconUrl: '../apis/img/icon.png',
    }
});

var custon2 = L.Icon.extend({
    options: {
        shadowUrl: null,
        iconAnchor: new L.Point(12, 12),
        iconSize: new L.Point(24, 24),
        iconUrl: '../apis/img/icon.png',
    }
});

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    position: 'topleft',
    draw: {
        polygon: {
            icon: new custon2(),
            allowIntersection: false,
            drawError: {
                color: '#e1e100',
                message: '<strong>Desenho do polígono não permitido!<strong> (allowIntersection: false)'
            },
            shapeOptions: {
                color: '#bada55'
            }
        },
        marker: {
        },
        polyline: false,
        rectangle: false,
        circle: false,
        circlemarker: false,
    },
    edit: {
        featureGroup: drawnItems,
    },
    toolbar: {
        buttons: {
            polygon: 'Desenhar Polígonos',
            marker: 'Draw a marker',
        }
    }
});


L.drawLocal.draw.toolbar.buttons.polygon = 'Desenhar Polígonos';
L.drawLocal.draw.toolbar.buttons.marker = 'Desenhar Pontos';
L.drawLocal.edit.toolbar.buttons.edit = 'Editar';
L.drawLocal.edit.toolbar.actions.save.text = 'Salvar';
L.drawLocal.edit.toolbar.actions.cancel.text = 'Cancelar';
L.drawLocal.edit.toolbar.buttons.remove = 'Deletar';
L.drawLocal.edit.toolbar.actions.clearAll.text = 'Limpar Todos';

map.addControl(drawControl);

map.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;

    if (type === 'marker') {
        layer.bindPopup('A popup!');
    }

    drawnItems.addLayer(layer);
});

// var servidorapp = 'https://seia.idema.rn.gov.br/geoserver/';
// var cmds = {
//     "wmsLimites": L.tileLayer.betterWms(servidorapp + "wms", {
//         layers: 'idemarn:limites_municipais_rn',
//         format: 'image/png',
//         version: '1.3.0',
//         transparent: true,
//         name: 'Limites Municipais'
//     }),
// }
// map.addLayer(cmds["wmsLimites"]);
