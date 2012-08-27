function resizeMap() {
  $('#map_canvas').css('height', $(window).height() - 100).gmap("refresh");
}

$(window).bind('orientationchange resize', resizeMap);

$('#locator').live('pageinit', function() {
  var canvas = $('#locator #map_canvas');
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
              canvas.gmap('openInfoWindow', {
               content: "<a href='/breweries/{0}'>{1}</a>".format(item.id, item.value.name)
              }, this);
            });
          }
        });
      }});
  };
  canvas.gmap({'zoom': 10, 'callback': function(map) {
    var self = this;
    self.watchPosition(function(position, status) {
      if ( status === 'OK' ) {
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(latlng);
        map.panTo(latlng);
      }
    });
  }}).bind("init", function(evt, map) {
    fetchBreweries();
		$(canvas.gmap("get", "map")).addEventListener('bounds_changed', function() {
      if (fetchBreweries.timer) {
        clearTimeout(fetchBreweries.timer);
      }
      fetchBreweries.timer = setTimeout(fetchBreweries, 300);
    });
    resizeMap();
  });
}).live('pageshow', function() {
  $('#locator #map_canvas').gmap("refresh");
});

$('#brewery').live('pageinit', function() {
  canvas = $('#brewery #map_canvas');
  var pos = new google.maps.LatLng(canvas.data("lat"), canvas.data("lng"))
  canvas.gmap({zoom: 15, center: pos, callback: function(map) {
    this.addMarker({position: pos, icon: '/assets/bar.png'})
  }});
}).live('pageshow', function() {
  $('#brewery #map_canvas').gmap('refresh');
});
