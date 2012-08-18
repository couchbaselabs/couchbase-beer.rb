function bindListHandler(list) {
  var source = list.data("url");
  // fetch content starting from list.data("start-key")
  // accepts optional "complete" callback for $.ajax()
  var fetch = function(oncomplete) {
    $.ajax({
      url: source,
      dataType: 'json',
      data: {
        start_key: list.data("start-key"),
        end_key: list.data("end-key")
      },
      complete: oncomplete,
      success: function(data) {
        $.each(data.items, function(_, item) {
          list.append('<li><a href="{0}" data-transition="none">{1}</a></li>'
            .format(source.replace('.json', '/' + item.id), item.key));
        });
        list.data("start-key", data.last_key);
        list.listview('refresh');
      }});
  }
  var scrollHandler = function(evt) {
    if ($(document).height() - $(window).scrollTop() <= $(window).height() * 1.3) {
      fetch(function() {
        $(window).bind('scrollstop', scrollHandler);
      });
      $(window).unbind('scrollstop');
    }
  }
  $(window).bind('scrollstop', scrollHandler);

  var search = list.prev().find('input');
  search.unbind("keyup change");
  var searchHandler = function() {
    var val = search.val();
    if (val.trim()) {
      list.data("start-key", search.val());
      list.data("end-key", search.val() + "\uefff");
    } else {
      list.data("start-key", null);
      list.data("end-key", null);
    }
    list.find(">li").remove();
    fetch();
    clearTimeout(searchHandler.timer);
  };
  search.bind("keyup change", function() {
    if (searchHandler.timer) {
      clearTimeout(searchHandler.timer);
    }
    searchHandler.timer = setTimeout(searchHandler, 200);
  });
}

$('#breweries').live('pageinit', function() {
  bindListHandler($('#breweries-list'));
});

$('#beers').live('pageinit', function() {
  bindListHandler($('#beers-list'));
});
