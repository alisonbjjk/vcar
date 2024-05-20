// CriarMapa
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
    drawnItems.clearLayers();
    var mak = drawnItems.addLayer(L.marker([crd.latitude, crd.longitude]));
    map.setView([crd.latitude, crd.longitude], 18);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}


function localAtual() {
    Swal.fire({
        icon: "info",
        title: "Atenção...",
        text: "Verifique com atenção a coordenada inserida, pois há possibilidade de ocorrer imprecisão na busca da sua localização. Caso isso ocorra, você tem a opção de ajustar o ponto utilizando a ferramenta \"Editar Camada\", localizada no canto superior esquerdo do mapa.",
    }).then(function (isConfirm) {
        navigator.geolocation.getCurrentPosition(success, error, options);
    });
}

function resetar() {
    Swal.fire({
        title: "Deseja Atualizar a Página?",
        showCancelButton: true,
        confirmButtonText: "Atualizar",
        cancelButtonText: `Cancelar`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location.reload(true)
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });

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
                polygon: 'Selecionar Polígono',
                marker: 'Inserir Ponto',
            }
        },
        handlers: {
            circle: {
                tooltip: {
                    start: 'Clique e arraste para selecionar um círculo.'
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
                    start: 'Clique para começar a selecionar.',
                    cont: 'Clique para continuar desenhando.',
                    end: 'Clique no primeiro ponto para fechar o desenho.'
                }
            },
            polyline: {
                error: '<strong>Erro: as bordas da forma não podem cruzar!</strong>',
                tooltip: {
                    start: 'Clique para começar a selecionar a linha.',
                    cont: 'Clique para continuar desenhando a linha.',
                    end: 'Clique no último ponto para terminar a linha.'
                }
            },
            rectangle: {
                tooltip: {
                    start: 'Clique e arraste para selecionar um retângulo.'
                }
            },
            simpleshape: {
                tooltip: {
                    end: 'Solte o mouse para terminar de selecionar.'
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
                edit: 'Editar Camada',
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

// Variável para armazenar o marcador desenhado
map.on('draw:created', function (e) {
    var layer = e.layer;

    function isGroupEmpty(group) {
        return group.getLayers().length === 0;
    }

    if (isGroupEmpty(drawnItems)) {
        var teste = false;
    } else {
        var teste = true;
    }

    drawnItems.clearLayers();
    drawnItems.addLayer(layer);

    if (layer instanceof L.Marker) {
        if (teste) {
            // Remova o marcador anterior, se existir
            Swal.fire({
                icon: "error",
                title: "Atenção...",
                text: "A área selecionada excede uma marcação. Por favor, para mais marcações, entre em contato com nossa equipe para contratar uma análise que atenda à área requisitada e tenha o benefício de uma análise mais completa!",
            });
        }
        var layer = e.layer;
    } else {
        // Verifique a área do polígono desenhado
        var area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
        // Converta a área para hectares (1 metro quadrado = 0.0001 hectares)
        var areaHectares = area * 0.0001;
        // Se a área for maior que 5 hectares, informe ao usuário e limpe a área desenhada
        if (areaHectares > 5) {
            Swal.fire({
                icon: "error",
                title: "Atenção...",
                text: "A área selecionada excede 5 hectares. Por favor, delimite uma área menor ou entre em contato com nossa equipe para contratar uma análise que atenda à área requisitada e tenha o benefício de uma análise mais completa!",
            });
            drawnItems.removeLayer(layer);
        }
    }
});

function limites() {
    var geojsonLayer = L.geoJSON(mapaRNGeojson, {
        "color": "#D6DAC8",
        "weight": 1.5,
        "fillOpacity": 0.1,
        "opacity": 0.7
    }).addTo(map);
}

limites();