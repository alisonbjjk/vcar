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
$(".geosearch").addClass("active");
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

var drawControl = new L.Control.Draw({
    position: 'topleft',
    draw: {
        polygon: {
            icon: new custon2(),
            allowIntersection: true,
            drawError: {
                color: '#e1e100',
            },
            shapeOptions: {
                color: '#bada55'
            }
        },
        polyline: false,
        rectangle: false,
        circle: false,
        circlemarker: false,
        polygon: false,
        marker: false,
    },
    edit: {
        featureGroup: drawnItems,
    },
});

L.drawLocal = {
    draw: {
        toolbar: {
            actions: {
                title: 'Cancelar desenho',
                text: 'Cancelar'
            },
            finish: {
                title: 'Concluir desenho',
                text: 'Concluir'
            },
            undo: {
                title: 'Excluir último ponto desenhado',
                text: 'Excluir último ponto'
            },
            buttons: {
                polygon: 'Desenhar Polígono',
                marker: 'Inserir Ponto',
            }
        },
        handlers: {
            circle: {
                tooltip: {
                    start: 'Clique e arraste para desenhar um círculo.'
                },
                radius: 'Raio'
            },
            circlemarker: {
                tooltip: {
                    start: 'Clique no mapa para colocar o marcador de círculo.'
                }
            },
            marker: {
                tooltip: {
                    start: 'Clique no mapa para colocar o marcador.'
                }
            },
            polygon: {
                tooltip: {
                    start: 'Clique para começar a desenhar.',
                    cont: 'Clique para continuar desenhando.',
                    end: 'Clique no primeiro ponto para fechar o desenho.'
                }
            },
            polyline: {
                error: '<strong>Erro: as bordas da forma não podem cruzar!</strong>',
                tooltip: {
                    start: 'Clique para começar a desenhar a linha.',
                    cont: 'Clique para continuar desenhando a linha.',
                    end: 'Clique no último ponto para terminar a linha.'
                }
            },
            rectangle: {
                tooltip: {
                    start: 'Clique e arraste para desenhar um retângulo.'
                }
            },
            simpleshape: {
                tooltip: {
                    end: 'Solte o mouse para terminar de desenhar.'
                }
            }
        }
    },
    edit: {
        toolbar: {
            actions: {
                save: {
                    title: 'Salvar alterações',
                    text: 'Salvar'
                },
                cancel: {
                    title: 'Cancelar edição, descarta todas as alterações',
                    text: 'Cancelar'
                },
                clearAll: {
                    title: 'Limpar todas as camadas',
                    text: 'Limpar tudo'
                }
            },
            buttons: {
                edit: 'Editae Camada',
                editDisabled: 'Nenhuma camada para editar',
                remove: 'Deletar Camada',
                removeDisabled: 'Nenhuma camada para excluir'
            }
        },
        handlers: {
            edit: {
                tooltip: {
                    text: 'Arraste para editar.',
                    subtext: 'Clique em cancelar para desfazer as alterações.'
                }
            },
            remove: {
                tooltip: {
                    text: 'Clique em um recurso para removê-lo.'
                }
            }
        }
    }
}


map.addControl(drawControl);
map.on('draw:created', function (e) {
    console.log(e.layer);
    drawnItems.addLayer(e.layer);
});


function limites() {
    L.tileLayer.betterWms("https://seia.idema.rn.gov.br/geoserver/wcs", {
        layers: 'idemarn:limites_municipais_rn',
        format: 'image/png',
        transparent: true,
    }).addTo(map);
}

limites();
