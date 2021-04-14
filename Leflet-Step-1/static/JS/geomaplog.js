// Store API endpoint inside query URL
var query_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perforeme a get request
d3.jason(query_url, function(data) {
    create_features(data.features);
    console.log(data.features)
});

// Popup Function
function create_features(earthquake){
    function on_each_feature(feature, layer)
        layer.bind_popup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>")
}

// Circle Radius Function
function radius_size(magnitude){
    return magnitude * 20000;
}

// Circle Color Function
function circle_color(magnitude){
    if (magnitude < 1) {
        return "#ccff33"
    }
    else if (magnitude < 2) {
        return "#ffff33"
      }
      else if (magnitude < 3) {
        return "#ffcc33"
      }
      else if (magnitude < 4) {
        return "#ff9933"
      }
      else if (magnitude < 5) {
        return "#ff6633"
      }
      else {
        return "#ff3333"
      }
}

