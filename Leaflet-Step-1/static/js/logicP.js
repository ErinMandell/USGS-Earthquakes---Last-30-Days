
// var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.streets",
//   accessToken: API_KEY
// });

// var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.satellite",
//   accessToken: API_KEY
// });

// var baseMaps = {
//     "Satellite Map": satellite,
//     "Street Map": streetmap
//   };


var layers = {
    Fault_Lines: new L.LayerGroup(),
    Earthquakes: new L.LayerGroup()
};

// var map = L.map("map", {
//     center: [37.09, -95.71],
//     zoom: 3,
//     layers: [
//         streetmap,
//         EarthquakesL
//     ]
// });

// var EarthquakesL = L.layerGroup(earthquakeMarkers);

// var overlayMaps = {
//     "Earthquakes": EarthquakesL,
//     "Fault Lines": layers.Fault_Lines
// };

// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
// }).addTo(map);



var queryUrlPartial = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
var queryUrlFull = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

var earthquakeMarkers = [];


d3.json(queryUrlPartial, function(earthquakeData) 
{
    // console.log(earthquakeData);
    // console.log(earthquakeData.features);
    var earthquakeInfo = earthquakeData.features;
    console.log(earthquakeInfo);


    for (var i=0; i < earthquakeInfo.length; i++)
    {
        var location = [earthquakeInfo[i].geometry.coordinates[1], earthquakeInfo[i].geometry.coordinates[0]];
        // console.log(location);

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
          fillColor: getColor(feature.properties.mag),
          radius: earthquakeInfo[i].properties.mag * 50000
        });

        // console.log(newCircle);
        earthquakeMarkers.push(newCircle);
        
        newCircle
        .addTo(map)
        .bindPopup("<h3>" + earthquakeInfo[i].properties.place + "<hr>Magnitude: " + earthquakeInfo[i].properties.mag +
        "</h3><p>" + new Date(earthquakeInfo[i].properties.time) + "</p>");
    }

    var legend = L.control({position: 'bottomright' });

    legend.onAdd = function(map) {

        var div = L.DomUtil.create('div', 'info legend');
            grades = [0, 1, 2, 3, 4, 5, 6];
            labels = [];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + 
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);
    
    console.log(earthquakeMarkers);
});

var earthquakesLayer = L.layerGroup(earthquakeMarkers);
console.log(earthquakeMarkers);


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
  

  var overlayMaps = {
    "Earthquakes": earthquakesLayer
};

var map = L.map("map", {
    center: [37.09, -0.71],
    zoom: 3,
    layers: [streetmap, earthquakesLayer]
});


L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);