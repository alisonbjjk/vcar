<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificador</title>
    <link rel="icon" type="image/x-icon" href="../apis/img/icon.png">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <!-- <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" /> -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        #map {
            height: 300px;
        }
    </style>
</head>

<body>
    <div class="d-flex justify-content-center">
        <div class="card mt-4 col-8 mb-3">
            <div class="card-header">
                <h2 class="mt-2 text-muted text-center text-uppercase">
                    <i class="fa-solid fa-map-location-dot"></i> Verificador
                </h2>
            </div>
            <div class="card-body">
                <form class="d-flex justify-content-center">
                    <div class="row g-3">
                        <div class="my-4" id="map"></div>
                        <div class="col-md-6">
                            <label for="nome" class="form-label text-uppercase">Nome <label
                                    class="text-danger">*</label></label>
                            <input type="text" class="form-control" id="nome">
                        </div>
                        <div class="col-md-6">
                            <label for="email" class="form-label text-uppercase">Email <label
                                    class="text-danger">*</label></label>
                            <input type="email" class="form-control" id="email">
                        </div>
                        <div class="col-md-6">
                            <label for="cpf" class="form-label text-uppercase">CPF <label
                                    class="text-danger">*</label></label>
                            <input type="text" class="form-control" id="cpf">
                        </div>
                        <div class="col-md-6">
                            <label for="telefone" class="form-label text-uppercase">TELEFONE</label>
                            <input type="text" class="form-control" id="telefone">
                        </div>
                        <div class="col-md-4">
                            <label for="email" class="form-label text-uppercase">CEP / Código Postal</label>
                            <input type="email" class="form-control" id="email">
                        </div>
                        <div class="col-md-4">
                            <label for="email" class="form-label text-uppercase">País</label>
                            <input type="email" class="form-control" id="email">
                        </div>
                        <div class="col-md-4">
                            <label for="email" class="form-label text-uppercase">Estado</label>
                            <input type="email" class="form-control" id="email">
                        </div>
                        <div class="col-md-4">
                            <label for="nome" class="form-label text-uppercase">Cidade</label>
                            <input type="text" class="form-control" id="nome">
                        </div>
                        <div class="col-md-6">
                            <label for="rua" class="form-label text-uppercase">Endereço</label>
                            <input type="text" class="form-control" id="rua">
                        </div>
                        <div class="col-md-2">
                            <label for="rua" class="form-label text-uppercase">NÚMERO</label>
                            <input type="text" class="form-control" id="rua">
                        </div>
                        <div class="col-md-12">
                            <label for="apartamento" class="form-label text-uppercase">Apartamento, suite,
                                etc...</label>
                            <input type="text" class="form-control" id="apartamento">
                        </div>
                        <div class="col-md-6">
                            <label for="file" class="form-label text-uppercase">Enviar arquivos georeferenciados (Shape
                                e
                                KML)</label>
                            <input type="file" class="form-control" id="file" accept=".kml, .geojson, .kmz">
                        </div>
                        <div class="col-md-12">
                            <button type="button" class="btn btn-primary mt-3">ENVIAR</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.7.1.js"
        integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-geosearch@3.1.0/dist/geosearch.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet-geosearch@3.1.0/dist/bundle.min.js"></script>
    <script>
        jQuery(document).ready(function ($) {
            var map = new L.Map('map', {
                center: new L.LatLng(-7, -55),
                zoom: 4,
                attributionControl: true,
                zoomControl: false,
                minZoom: 0,
                maxZoom: 17,
                zoomSnap: 0.25,
            });

            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                subdomains: ['a', 'b', 'c']
            }).addTo(map);

            const provider = new window.GeoSearch.OpenStreetMapProvider();
            const search = new GeoSearch.GeoSearchControl({
                provider: provider,
                style: 'bar',
                updateMap: true,
                autoClose: true,
                searchLabel: 'Buscar Endereço',
            });

            map.addControl(search);
        });
    </script>
</body>


</html>