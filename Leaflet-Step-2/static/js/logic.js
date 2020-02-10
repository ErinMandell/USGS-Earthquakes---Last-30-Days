// *********************************************************
// Create Map with basemaps and overlay maps
// *********************************************************
 
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
    earthquakesDaily: new L.LayerGroup(),
    earthquakesWeekly: new L.LayerGroup(),
    earthquakesMonthly: new L.LayerGroup(),
    plates: new L.LayerGroup(),
    legend: new L.LayerGroup()
};

var overlayMaps = {
    "Earthquakes - Past 24 Hours": layers.earthquakesDaily,
    "Earthquakes - Past 7 Days": layers.earthquakesWeekly,
    "Earthquakes - Past 30 Days": layers.earthquakesMonthly,
    "Tectonic Plates (with Plate Name)": layers.plates
};

var map = L.map("map", {
    center: [32.09, -0.71],
    zoom: 3,
    layers: [satellite, layers.earthquakesWeekly, layers.legend]
});
    
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);




// ************************************************************************
//   set URLs for links to 3 earthquake data sets
// *************************************************************************
    
var queryUrlDaily = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
var queryUrlWeekly = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var queryUrlMonthly = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"


// **************************************************************
// *****  Earthquake Data for past 24 hours ********************

d3.json(queryUrlDaily, function(response) {
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
            radius: earthquakeInfo[i].properties.mag * 30000
            // radius: 30000
          });

        newCircle
            .addTo(layers.earthquakesDaily)
            .bindPopup("<h3>" + earthquakeInfo[i].properties.place + "<hr>Magnitude: " + earthquakeInfo[i].properties.mag +
        "</h3><p>" + new Date(earthquakeInfo[i].properties.time) + "</p>");
    }
});



// **********************************************************
// *****  Earthquake Data for past 7 days *******************

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
            radius: earthquakeInfo[i].properties.mag * 30000
            // radius: 30000
          });

        newCircle
            .addTo(layers.earthquakesWeekly)
            .bindPopup("<h3>" + earthquakeInfo[i].properties.place + "<hr>Magnitude: " + earthquakeInfo[i].properties.mag +
        "</h3><p>" + new Date(earthquakeInfo[i].properties.time) + "</p>");
    }
});


// **********************************************************
// *****  Earthquake Data for past 30 days *******************

d3.json(queryUrlMonthly, function(response) {
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
            radius: earthquakeInfo[i].properties.mag * 30000
            // radius: 30000
          });

        newCircle
            .addTo(layers.earthquakesMonthly)
            .bindPopup("<h3>" + earthquakeInfo[i].properties.place + "<hr>Magnitude: " + earthquakeInfo[i].properties.mag +
        "</h3><p>" + new Date(earthquakeInfo[i].properties.time) + "</p>");
    }
});


// ********************************************************************
// ADD Tecotonic Plates layer, with popup for plate name
// ********************************************************************

var geoData = "static/data/PB2002_plates.json";

d3.json(geoData, function(platesData) {
    console.log(platesData);

    L.geoJson(platesData, {
        style: function() {
            return {
                color: "blue",
                fillColor: "",
                fillOpacity: 0.0,
                weight: 1.5
            };
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>Plate Name:  " + feature.properties.PlateName + "</h3>");
        }
    }).addTo(layers.plates);
});



// *********************************************************
// ATTEMPT to add Legend, which is not going well :(
// *********************************************************

function getColor(mag) {
    console.log(mag);
    return  mag < 1 ? "#ffffcc":
            mag < 2 ? "#ffd700":
            mag < 3 ? "#ffa500":
            mag < 4 ? "#ff8c00":
            mag < 5? "#ff6347":
                    "#ff0000";
}


var legend = L.control({position: 'bottomleft'});

legend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = ['<strong> MAGNITUDE </strong>'],
        from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades [i];
        to = grades[i+1];

        labels.push(
            '<i style="background:' + getColor(from + 1) + '"></i> ' +
            from + (to ? '&ndash;' + to : '+'));
        }
        div.innerHTML = labels.join('<br>');
        return div;
};

legend.addTo(map);