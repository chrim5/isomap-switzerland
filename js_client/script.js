var map = new L.Map("map", {
  scrollWheelZoom: false,
  zoomControl: false,
  photonControl: true,
  photonControlOptions: {
    onSelected: showSearchPoints,
    placeholder: "Search...",
    position: "topleft",
    url: 'https://photon.komoot.de/api/?',
    limit: 5
  },
  center: [47, 8],
  maxBounds: [[45, 4], [48, 11]],
  minZoom: 7,
  maxZoom: 18,
  zoom: 9
});

//create a layerGroup for adding and removing geojson-layers from isochrone service
var isoLayerGroup = new L.LayerGroup();
isoLayerGroup.addTo(map);

//declare legend member
this.legend;

// Bind searched address to popup
var searchPoints = L.geoJson(null, {
  onEachFeature: function(feature, layer) {
    layer.bindPopup(feature.properties.name);
  }
});

// Zoom to searched points on map
function showSearchPoints(geojson) {
  searchPoints.clearLayers();
  searchPoints.addData(geojson);
  // Flying zooom
  map.flyToBounds(searchPoints.getBounds(), {duration: 2.0, maxZoom: 10});
  // Get coordinates from bounds
  var point = [];
  point.push(searchPoints.getBounds().getNorthEast().lat)
  point.push(searchPoints.getBounds().getNorthEast().lng)
  //console.log(point);
  // Get isochrones for searched address
  getIsochrones(point);
}

// Add search points to map
searchPoints.addTo(map);

//create a dropdown for selecting a swiss airport
var menuControls = L.control({position: 'topright'});
menuControls.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'menu legend');
  div.innerHTML = `
  <select class='leaflet-control'>
    <option selected>Flughafen auswählen</option>
    <option value='47.451542, 8.564572'>Flughafen Zürich</option>
    <option value='47.5994823, 7.5326228'>Flughafen Basel-Mulhouse</option>
    <option value='46.236389, 6.107222'>Flughafen Genf</option>
  </select>
  <button ion-button  id='clearBtn' class='leaflet-control button-action'  block>Clear all</button>
  `;
  
  div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
  return div;
  };
  menuControls.addTo(map);

var colors = {
  1800: "#756bb1",
  3600: "#3366ff"
};

$('select').change(function(){
  getIsochrones(this.value.split(','));
});

$('#clearBtn').click(function(){
  console.log("Clearing all Isochrone Layers, markers and legend...");
  isoLayerGroup.clearLayers();
  map.removeControl(legend);
  legend = null;
  $("select").val("Flughafen auswählen");
});

// Light OSM layer
var osmLayer = L.tileLayer(
  "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
  {
    attribution:
      "Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
  }
).addTo(map);

// Add zoom control on map
var zoomControl = new L.Control.Zoom({ position: "topright" }).addTo(map);

// Which isochrones to calculate? (in seconds)
var cutoffSec = [1800, 3600];
// Which from place -> ZRH airport
var fromPlace = [];
//console.log(fromPlace);

// Get the isochrone polygons from the OTP server
// The request URL for 30 and 60 minutes isochrones
// by public transportation is something like:
//
// http://localhost:8080/otp/routers/current/isochrone?
//    fromPlace=47.451542,8.564572&
//    mode=WALK,TRANSIT&
//    date=11-14-2018&
//    time=8:00am&
//    maxWalkDistance=1500&
//    cutoffSec=1800&
//    cutoffSec=3600
function getIsochrones(from) {
  fromPlace = from;
  // The cutoffSec parameter in the URL is repeated which is a
  // non-standard behaviour. cutoffSec[]=1800&cutoffSec[]=3600
  // does not work. Build this part of the URL manually.
  var cutoffSecParam = cutoffSec
    .map(function(v) {
      return "cutoffSec=" + v;
    })
    .join("&");

  $.ajax({
    url:
      "http://localhost:8080/otp/routers/current/isochrone?" + cutoffSecParam,
    type: "GET",
    dataType: "json",
    data: {
      fromPlace: from.join(","),
      mode: "TRANSIT,WALK",
      maxWalkDistance: 1500
    },
    success: drawIsochrone,
    error: isochroneError
  });
}

// Draw isochrones in different colors
function drawIsochrone(data) {
  if (data.features.length == 0) {
    alert("No isochrone found.");
    return;
  }



  // Define isochrones from geoJSON time properties
  var isochrones = L.geoJSON(null, {
    style: function(feature) {
      return {
        fillColor: colors[feature.properties.time],
        color: "#ffffff",
        weight: 0.5,
        fillOpacity: 0.5
      };
    }
  });
  isochrones.addData(data);
  isoLayerGroup.addLayer(isochrones);

  // Show travel time in minutes as tool tip
  isochrones
    .bindTooltip(
      function(e) {
        var t = e.feature.properties.time;
        return t / 60 + " minutes";
      },
      {
        sticky: true,
        opacity: 0.5
      }
    )
    .addTo(map);

  // Add the from point location as a marker.
  var origin = L.circleMarker(fromPlace, {
    color: "#000000",
    fillOpacity: 0.5,
    fillColor: "#ff0000"
  });
  isoLayerGroup.addLayer(origin);

  // Zoom to the isochrones extent.
  map.flyToBounds(isochrones.getBounds());

  //create a legend for the chosen time intervals
  addLegend();
}

// Error during isochrone calc
function isochroneError(error) {
  alert("Error during isochrone calculation.");
  console.log("Isochrone error", error);
}

// Create a legend for the current intervals on the left bottom
function addLegend(){
  if( this.legend )return;
  this.legend = L.control({position: 'bottomleft'});
  this.legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'legend');
  labels = ['<strong>Intervalle</strong>'];
  for (var color in colors) {
        div.innerHTML += 
        labels.push(
            '<div class="circle" style="background:' + colors[color] + '"></div><div class="legendEntry">' + color / 60 + ' min</div>'
        );
    }
    div.innerHTML = labels.join('<br>');
  return div;
  };
  this.legend.addTo(map);
}