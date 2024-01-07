// Atributos, créditos e notas de rodapé (externos)
var basemaps = [{
    tilelayer: '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
    minZoom: 0,
    label: 'osm0' // optional label used for tooltip
},
{
    tilelayer: '//mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}',
    attribution: 'Google Maps Roadmap',
    maxZoom: 18,
    minZoom: 0,
    label: 'googlemaproad' // optional label used for tooltip
},
{
    tilelayer: '//mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}',
    attribution: 'Google Maps Hybrid',
    maxZoom: 18,
    minZoom: 0,
    label: 'googlemaphyb' // optional label used for tooltip
},

{
    tilelayer: '//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18,
    minZoom: 0,
    label: 'esrisat' // optional label used for tooltip
},

{
    tilelayer: '//{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
    attribution: '&copy; Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    maxZoom: 18,
    minZoom: 0,
    label: 'carto1' // optional label used for tooltip
},
{
    tilelayer: '//{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Kartendaten: &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende, <a href="http://viewfinderpanoramas.org">SRTM</a> | Kartendarstellung: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    maxZoom: 15,
    minZoom: 3,
    label: 'hipsometrico' // optional label used for tooltip
},
{
    tilelayer: '//map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/GoogleMapsCompatible_Level{maxZoom}/{z}/{y}/{x}.jpg',
    attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System with funding provided by NASA/HQ.',
    maxZoom: 8,
    minZoom: 3,
    time: '',
    label: 'nasaearthnigth', // optional label used for tooltip
},
{
    tilelayer: 'https://basemaps-api.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/resources/fonts/{fontstack}/{range}.pbf?token=AAPKb10821df102a46a4b930958d7a6a06593sdla7i0cMWoosp7XXlYflDTAxsZMUq-oKvVOaom9B8CokPvJFd-sE88vOQ2B_rC',
    attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System with funding provided by NASA/HQ.',
    maxZoom: 14,
    minZoom: 3,
    time: '',
    label: 'esrimapgreyv2', // optional label used for tooltip
}
];