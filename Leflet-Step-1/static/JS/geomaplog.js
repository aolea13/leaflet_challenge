// EarthquakesGeo JSON URL Variables
var earthquakes_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// Layer group
var earthquakes = new L.LayerGroup();

// Variables for Tile Layers
var satellite_map = L.titleLayer ('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
  maxZoom: 15,
  id: 'mapbox.satellite',
  accessToken: API_KEY
});

var grayscale_map = L.titleLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
  maxZoom: 15,
  id: 'mapbox.light',
  accessToken: API_KEY
});

var outdoors_map = L.titleLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
  maxZoom: 15,
  id: 'mapbox.outdoors',
  accessToken: API_KEY
});

// BaseMaps to Hold Base Layers
var baseMaps = {
  'Satellite': satellite_map,
  'Grayscale': grayscale_map,
  'Outdoors': outdoors_map
};

// Object to Hold oVerlay Layers
var overlayMaps = {
  'Earthquakes': earthquakes
}

// Default Map
var myMap = L.map('map'{
  center: [34.0522, -118.2437],
  zoom: 1,
  layers: [satellite_map, earthquakes]
});

// Layer Control
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

// Retrieve Earthquake URL
d3.json(earthquakes_URL, function(earthquakeData) {
  
  //Markers
  function markerSize(magnitude){
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: chooseColor(feature.properties.mag),
      color: '#000000',
      radius: markerSize(feature.properties.mag),
      stroke: true,
      weight: 1
    };
  }
  function chooseColor(magnitude) {
    switch (true){
      case magnitude > 5:
          return '#581845';
      case magnitude > 4:
          return '#900C3F';
      case magnitude > 3:
          return '#C70039';
      case magnitude > 2:
          return '#FF5733';
      case magnitude > 1:
          return '#FFC300';
      default:
          return '#DAF7A6';
      }
    }
