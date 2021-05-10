// EarthquakesGeo JSON URL Variables
var earthquakes_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// Creat layer group
var earthquakes = new L.LayerGroup();

// Define Variables for Tile Layers
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

//Object to Hold oVerlay Layers
var overlayMaps = {
  'Earthquakes': earthquakes
}

