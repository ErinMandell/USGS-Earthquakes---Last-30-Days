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
        "Earthquakes": earthquakes,
    };

    var map = L.map("map", {
        center: [32.09, -0.71],
        zoom: 3,
        layers: [satellite, earthquakes]
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

}



function createMarkers(response) {
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
        .bindPopup("<h3>" + earthquakeInfo[i].properties.place + "<hr>Magnitude: " + earthquakeInfo[i].properties.mag +
        "</h3><p>" + new Date(earthquakeInfo[i].properties.time) + "</p>");

        earthquakeMarkers.push(newCircle);
        // console.log(earthquakeMarkers);



    }
    
    function getColor(mag) {
        console.log(mag);
        return  mag < 1 ? "#ffffcc":
                mag < 2 ? "#ffd700":
                mag < 3 ? "#ffa500":
                mag < 4 ? "#ff8c00":
                mag < 5? "#ff6347":
                        "#ff0000";
                break;
    }


    // var legend = L.control({position: 'bottomleft'});

    // legend.onAdd = function() 
    // {
    //     var div = L.DomUtil.create('dev', 'info legend');
    //     var mag = [0, 1, 2, 3, 4, 5];
    //     var colors = ["#ffffcc", "#ffd700", "#ffa500", "#ff8c00", "#ff6347", "#ff0000"];
    //     var labels = [];

    //     var legendInfo = "<h1>Magnitude Scale</h1>" +
    //         "<div class=\"labels\">" +
    //         "<div class=\""

    //     for (var i = 0; i < mag.length; i++) 
    //     {
    //         div.innerHTML +=
    //         '<i style="background:' + getColor(mag[i] + 1) + '"></i> ' +
    //         mag[i] + (mag[i + 1] ? '&ndash;' + mag[i + 1] + '<br>' : '+');
    //     }

    //     return div;
    // };

    // legend.addTo(map);

    createMap(L.layerGroup(earthquakeMarkers));
    
}




var queryUrlPartial = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
var queryUrlWeekly = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var queryUrlFull = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
var earthquakeMarkers = [];

d3.json(queryUrlWeekly, createMarkers);