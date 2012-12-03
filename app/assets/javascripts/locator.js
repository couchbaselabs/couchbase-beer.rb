$(document).ready(function() {
  var canvas = $('#locator #map_canvas');
  position = new google.maps.LatLng(37.3863, -122.076);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos){
      if (pos) {
        position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      }
      if (canvas.data("gmap")) {
        var map = canvas.gmap("get", "map");
        map.setCenter(position);
        map.panTo(position);
      }
    });
  }
  var markers = {}

  var fetchBreweries = function() {
    var map = canvas.gmap("get", "map");
    var bounds = map.getBounds();
    if (!bounds) {
      return;
    }
    var ne = bounds.getNorthEast(), sw = bounds.getSouthWest();
    var bbox = [sw.lng(), sw.lat(), ne.lng(), ne.lat()];
    var minMove = 5; // Must move at least five pixels
    var mh = Math.abs(bbox[1] - bbox[3]) / (canvas.height() / minMove);
    var mw = Math.abs(bbox[0] - bbox[2]) / (canvas.width() / minMove);

    $.ajax({
      url: '/locator.json',
      dataType: 'json',
      data: { bbox: bbox.join(",") },
      success: function(data) {
        $.each(data, function(_, item) {
          if (!markers[item.id]) {
            markers[item.id] = new google.maps.Marker({
              position: new google.maps.LatLng(item.value.geo.lat, item.value.geo.lng),
              map: map,
              icon: '/assets/bar.png'
            })
            $(markers[item.id]).click(function() {
              var location = [];
              if (item.doc.country) {
                location.push(item.doc.country);
              }
              if (item.doc.city) {
                location.push(item.doc.city);
              }
              canvas.gmap('openInfoWindow', {
               content: "<a href='/breweries/{0}'>{1}</a><p>{2}</p>".format(item.id, item.value.name, location.join(', '))
              }, this);
            });
          }
        });
      }});
  };

  canvas.gmap({'zoom': 10, 'callback': function(map) {
    map.setCenter(position);
    map.panTo(position);
  }}).bind("init", function(evt, map) {
    fetchBreweries();
    $(canvas.gmap("get", "map")).addEventListener('bounds_changed', function() {
      if (fetchBreweries.timer) {
        clearTimeout(fetchBreweries.timer);
      }
      fetchBreweries.timer = setTimeout(fetchBreweries, 300);
    });
  });

  var breweryCanvas = $('#brewery #map_canvas');
  var pos = new google.maps.LatLng(breweryCanvas.data("lat"), breweryCanvas.data("lng"));
  breweryCanvas.gmap({zoom: 15, center: pos, callback: function(map) {
    this.addMarker({position: pos, icon: '/assets/bar.png'})
  }});

  $('#map_canvas').gmap("refresh");
});
