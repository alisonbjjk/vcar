// criarMapa
var map = new L.Map('map', {
    center: new L.LatLng(-5.9, -36.7),
    zoom: 8,
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

L.control.scale().addTo(map);

map.addLayer(baselayer);

const provider = new window.GeoSearch.OpenStreetMapProvider();
const search = new window.GeoSearch.GeoSearchControl({
    provider: provider,
    updateMap: true,
    autoClose: true,
    searchLabel: 'Buscar Endereço',
});

map.addControl(search);
// $(".geosearch").addClass("active");
// Fim criarMapa

// localizacaoAtual
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

function success(pos) {
    const crd = pos.coords;
    var mak = drawnItems.addLayer(L.marker([crd.latitude, crd.longitude]));
    map.setView([crd.latitude, crd.longitude], 18);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

function localAtual() {
    navigator.geolocation.getCurrentPosition(success, error, options);
}
// Fim localizacaoAtual


// mudarMapa
$("#tipoMapa").on("change", "", function (e) {
    let num = $("#tipoMapa").val();

    var baselayer = new L.TileLayer(basemaps[num]['tilelayer'], {
        minZoom: basemaps[num]['minZoom'],
        maxZoom: basemaps[num]['maxZoom'],
        attribution: basemaps[num]['attribution']
    });

    map.addLayer(baselayer);
    limites();
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

function limites() {
    var geojsonLayer = L.geoJSON(mapaRNGeojson, {
        "color": "#D6DAC8",
        "weight": 1.5,
        "fillOpacity": 0.1,
        "opacity": 0.7
    }).addTo(map);
}

limites();
