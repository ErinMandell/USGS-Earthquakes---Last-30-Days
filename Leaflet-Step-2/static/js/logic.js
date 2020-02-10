
 
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
    "Street Map": streetmap,
    "Satellite Map": satellite
};

var layers = {
    earthquakes: new L.LayerGroup(),
    plates: new L.LayerGroup()
};

var overlayMaps = {
    "Earthquakes": layers.earthquakes,
    "Tectonic Plates": layers.plates
};

var map = L.map("map", {
    center: [32.09, -0.71],
    zoom: 3,
    layers: [satellite, layers.earthquakes]
});
    
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);



    // Create a legend to display information about our map
    // When the layer control is added, insert a div with the class of "legend"
    // Add the info legend to the map
    
    // var info = L.control({
    //     position: "bottomleft"
    // });
  
    // info.onAdd = function() {
    //     var div = L.DomUtil.create("div", "legend");
    //     return div;
    // };

    // info.addTo(map)



    
var queryUrlPartial = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
var queryUrlWeekly = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var queryUrlFull = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

d3.json(queryUrlWeekly, function(response) {
    // console.log(response);

    var earthquakeInfo = response.features;
    console.log(earthquakeInfo);

    for (var i=0; i < earthquakeInfo.length; i++) {

        var location = [earthquakeInfo[i].geometry.coordinates[1], earthquakeInfo[i].geometry.coordinates[0]];
        // console.log(location);

        var color = "";         
        if (earthquakeInfo[i].properties.mag < 1) {
            color = "#7CFC00";
        }
        else if (earthquakeInfo[i].properties.mag <=2) {
            color = "#ffff99";
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
            color = "#cc3399";
        }

        var newCircle = L.circle(location, {
            fillOpacity: .50,
            color: color,
            // radius: earthquakeInfo[i].properties.mag * 30000
            radius: 30000
          });

        newCircle
            .addTo(layers.earthquakes)
            .bindPopup("<h3>" + earthquakeInfo[i].properties.place + "<hr>Magnitude: " + earthquakeInfo[i].properties.mag +
        "</h3><p>" + new Date(earthquakeInfo[i].properties.time) + "</p>");
    }
});


var geoData = "static/data/PB2002_plates.json";

d3.json(geoData, function(platesData) {
    console.log(platesData);

    L.geoJson(platesData, {
        style: function(feature) {
            return {
                color: "blue",
                fillColor: "",
                fillOpacity: 0.0,
                weight: 1.5
            };
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h1>" + feature.properties.PlateName + "</h1>");
        }
    }).addTo(layers.plates);
});