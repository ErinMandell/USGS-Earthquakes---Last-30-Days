
// ***************************************************************************
// Set URLs for partial data set to use in development/testing, and also the full 30 day data set

var queryUrlPartial = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
var queryUrlFull = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 3,
});


// Define streetmap and darkmap layers
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});



d3.json(queryUrlPartial, function(data) 
  {
    console.log(data);
    console.log(data.features);
    createFeatures(data.features);
    // createMap(earthquakes);
  });

  function createFeatures(earthquakeData) 
  {
      for (var i = 0; i < earthquakeData.length; i++) 
      {
        var geometry = earthquakeData[i].geometry;
        var property = earthquakeData[i].properties;
        var location = [earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]];
        console.log(location);

        // // Conditionals for countries points
        // var color = "";
        // if (earthquakeData.features[i].mag > 6) {
        //   color = "red";
        // }
        // else if (earthquakeData.features[i].mag > 5) {
        //   color = "orange";
        // }
        // else if (earthquakeData.features[i].mag > 3) {
        //   color = "yellow";
        // }
        // else {
        //   color = "white";
        // }
      
        L.circle(earthquakeData[i].location,  
        {
          fillOpacity: .5,
          fillColor: "red",
          radius: earthquakeData[i].properties.mag * 1500
        })
        .bindPopup("<h3>" + property.place + "<hr>Magnitude: " + property.mag +
        "</h3><hr><p>" + property.time + "</p>");
      }
  
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    // var earthquakes = L.geoJSON(earthquakeData)
    // // , {
    // //   onEachFeature: onEachFeature
    // // });
  
    // // Sending our earthquakes layer to the createMap function
    // createMap(earthquakes);
  }

  // // function createMap(earthquakes) 
  // // {
  //   // Define streetmap and darkmap layers
  //   var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  //     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //     maxZoom: 18,
  //     id: "mapbox.streets",
  //     accessToken: API_KEY
  //   });

  
  //   // var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  //   //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   //   maxZoom: 18,
  //   //   id: "mapbox.light",
  //   //   accessToken: API_KEY
  //   // });

  //   // var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  //   //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   //   maxZoom: 18,
  //   //   id: "mapbox.satellite",
  //   //   accessToken: API_KEY
  //   // });
  

  //   // Define a baseMaps object to hold our base layers
  //   var baseMaps = {
  //     "Street Map": streetmap,
  //     // "Grayscale Map": graymap,
  //     // "Satellite Map": satellite
  //   };
  
    
  //   // // Create overlay object to hold our overlay layer
  //   // var overlayMaps = {
  //   //   Earthquakes: earthquakes
  //   // };
  
  //   // Create our map, giving it the streetmap and earthquakes layers to display on load
  //   var myMap = L.map("map", {
  //     center: [37.09, -95.71],
  //     zoom: 3,
  //     layers: [streetmap]
  //   });
  

  //   L.control.layers(baseMaps, {
  //     collapsed: false
  //   }).addTo(myMap);
  // }