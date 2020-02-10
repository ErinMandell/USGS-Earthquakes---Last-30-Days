function createMap(earthquakes) {
 
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

    var overlayMaps = {
        "Earthquakes": earthquakes
    };

    var map = L.map("map", {
        center: [32.09, -0.71],
        zoom: 3,
        layers: [streetmap, earthquakes]
    });
    
    // earthquakeMarkers
    //  .addTo(map)
    //  .bindPopup("<h3>" + earthquakeInfo[i].properties.place + "<hr>Magnitude: " + earthquakeInfo[i].properties.mag +
    //  "</h3><p>" + new Date(earthquakeInfo[i].properties.time) + "</p>");

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

}

function createMarkers(response) {
    console.log(response);
    var earthquakeInfo = response.features;
    console.log(earthquakeInfo);

    for (var i=0; i < earthquakeInfo.length; i++) {

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
            fillOpacity: .85,
            color: color,
            // fillColor: getColor(feature.properties.mag),
            radius: earthquakeInfo[i].properties.mag * 50000
          });

        newCircle
        .bindPopup("<h3>" + earthquakeInfo[i].properties.place + "<hr>Magnitude: " + earthquakeInfo[i].properties.mag +
        "</h3><p>" + new Date(earthquakeInfo[i].properties.time) + "</p>");

        earthquakeMarkers.push(newCircle);
        // console.log(earthquakeMarkers);
    }

    createMap(L.layerGroup(earthquakeMarkers));
}

var queryUrlPartial = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
var queryUrlFull = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
var earthquakeMarkers = [];

d3.json(queryUrlPartial, createMarkers);