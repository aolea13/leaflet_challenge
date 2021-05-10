// EarthquakesGeo JSON URL variables
var earthquakes_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// Layer group
var earthquakes = new L.LayerGroup();

// Variables for tile layers
var satellite_map = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
  maxZoom: 15,
  id: 'mapbox/satellite-v9',
  accessToken: API_KEY
});

var grayscale_map = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
  maxZoom: 15,
  id: 'mapbox/dark-v10',
  accessToken: API_KEY
});

var outdoors_map = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
  maxZoom: 15,
  id: 'mapbox/outdoors-v11',
  accessToken: API_KEY
});

// BaseMaps to hold base layers
var baseMaps = {
  'Satellite': satellite_map,
}

// Object to hold overlay layers
var overlayMaps = {
  'Earthquakes': earthquakes
}

// Default map
var myMap = L.map('map', {
  center: [34.05, -118.24],
  zoom: 3,
  layers: [satellite_map, earthquakes]
});

// Retrieve earthquake data
d3.json(earthquakes_URL, function(data) {


  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // Define the color of the marker based on the magnitude of the earthquake
  function getColor(magnitude) {
    switch (true) {
      case magnitude > 5:
        return "darkred";
      case magnitude > 4:
        return "red";
      case magnitude > 3:
        return "orange";
      case magnitude > 2:
        return "yellow";
      case magnitude > 1:
        return "green";
      default:
        return "lightgreen";
    }
  }

  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }

    return magnitude * 3;
  }

  // Add GeoJSON layer to the map
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }

  }).addTo(earthquakes);

  earthquakes.addTo(myMap);


  var legend = L.control({
    position: "bottomright"
  });


  legend.onAdd = function() {
    var div = L
      .DomUtil
      .create("div", "info legend");

    var grades = [0, 1, 2, 3, 4, 5];
    var colors = [
      "lightgreen",
      "green",
      "yellow",
      "orange",
      "red",
      "darkred"
    ];


    for (var i = 0; i < grades.length; i++) {
      div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
        grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;
  };

  legend.addTo(myMap);
});
