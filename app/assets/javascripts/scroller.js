function formatBrewery(url, item) {
  var tmpl = '<tr><td><a href="{0}">{1}</a></td><td>{2}</td></tr>';
  var location = [];
  if (item.country) {
    location.push(item.country);
  }
  if (item.city) {
    location.push(item.city);
  }
  return tmpl.format(url.replace('.json', '/' + item.id), item.name, location.join(', '));
}

function formatBeer(url, item) {
  var tmpl = '<tr><td><a href="{0}">{1}</a></td><td>{2}</td></tr>';
  theItem = item;
  return tmpl.format(url.replace('.json', '/' + item.id), item.name, item.abv);
}

function fetch(onComplete) {
  var table = $("#lookup_table");
  var url = table.data("url");
  var startKey = table.data("start-key");
  var endKey = table.data("end-key");
  var searchVal = $("#start_key").val();

  $.ajax({
    "url": url,
    "dataType": 'json',
    "data": {"start_key": startKey, "end_key": endKey},
    "complete": onComplete,
    "success": function(data) {
      $.each(data.items, function(_, item) {
        if (url.match(/beers.json$/)) {
          table.append(formatBeer(url, item));
        } else if (url.match(/breweries.json$/)) {
          table.append(formatBrewery(url, item));
        }
      });
      if (data.last_key) {
        table.data("start-key", data.last_key.toLowerCase());
        $("#more-btn").show();
      } else {
        $("#more-btn").hide();
      }
      if (searchVal.trim()) {
        table.data("end-key", searchVal + "\uefff");
      } else {
        table.data("end-key", null);
      }
    }});
}

$(document).ready(function() {
  $("#more-btn").on('click', function() {
    var button = $(this);
    button.html('<i class="icon-refresh icon-white"></i>');
    button.attr("disabled", true);
    fetch(function() {
      var table = $("#lookup_table");
      button.html("More");
      button.attr("disabled", null);
    });
  });

  $(".form-search").bind("submit", function() {
    var searchVal = $("#start_key").val().toLowerCase();
    var table = $("#lookup_table");
    table.find("tr").remove();
    if (searchVal) {
      table.data("start-key", searchVal);
      table.data("end-key", searchVal + "\uefff");
    } else {
      table.data("start-key", null);
      table.data("end-key", null);
    }
    fetch();
  });
});
