
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
});

var baseMaps = {
    "Satellite Map": satellite,
    "Street Map": streetmap
  };


var layers = {
    Fault_Lines: new L.LayerGroup(),
    Earthquakes: new L.LayerGroup()
};

var map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 3,
    layers: [
        layers.Earthquakes,
        layers.Fault_Lines
    ]
});

streetmap.addTo(map);

var overlays = {
    "Earthquakes": layers.Earthquakes,
    "Fault Lines": layers.Fault_Lines
};

L.control.layers(baseMaps, null, {
    collapsed: false
}).addTo(map);


var queryUrlPartial = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
var queryUrlFull = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"


d3.json(queryUrlPartial, function(earthquakeData) 
{
    console.log(earthquakeData);
    console.log(earthquakeData.features);
    var earthquakeInfo = earthquakeData.features;
    console.log(earthquakeInfo);

    var magnitude = {

    }

    for (var i=0; i < earthquakeInfo.length; i++)
    {
        var location = [earthquakeInfo[i].geometry.coordinates[1], earthquakeInfo[i].geometry.coordinates[0]];
        console.log(location);

        var color = "";
        
            if (earthquakeInfo[i].properties.mag < 1) {
                color = "#ffffcc";
            }

            else if (earthquakeInfo[i].properties.mag <=2) {
                color = "#ffd700";
            }

            else if (earthquakeInfo[i].properties.mag <=3) {
                color = "#ffa500";
            }

            else if (earthquakeInfo[i].properties.mag <=4) {
                color = "#ff8c00"
            }

            else if (earthquakeInfo[i].properties.mag <=5) {
                color = "#ff6347"
            }

            else {
                color = "#ff0000";
            }


      var newCircle = L.circle(location, {
          fillOpacity: .75,
          color: color,
          fillColor: color,
          radius: earthquakeInfo[i].properties.mag * 50000
      });

    console.log(newCircle);
      newCircle.addTo(map);
    }
});