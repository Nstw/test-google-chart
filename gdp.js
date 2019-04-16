// Load the Visualization API and the corechart package.
google.charts.load("current", { packages: ["corechart"] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and draws it.
function drawChart() {
  // Create the data table.
  $.get("GDP-Service-USD.csv", function(str) {
    var arrayData = $.csv.toArrays(str, {
      onParseValue: $.csv.hooks.castToScalar
    });
    var data = google.visualization.arrayToDataTable(arrayData);

    var view = new google.visualization.DataView(data);
    // Set chart options
    var options = {
      title: "GDP",
      width: 800,
      height: 400,
      isStacked: "true",
      legend: { position: "bottom", maxLines: 3 },
      vAxis: {
        minValue: 0
      }
    };
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.AreaChart(
      document.getElementById("gdp-chart")
    );
    chart.draw(view, options);
  });

  $(".dropdown dt a").on("click", function() {
    $(".dropdown dd ul").slideToggle("fast");
  });

  $(".dropdown dd ul li a").on("click", function() {
    $(".dropdown dd ul").hide();
  });

  function getSelectedValue(id) {
    return $("#" + id)
      .find("dt a span.value")
      .html();
  }

  $(document).bind("click", function(e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
  });

  $('.mutliSelect input[type="checkbox"]').on("click", function() {
    var title = $(this)
        .closest(".mutliSelect")
        .find('input[type="checkbox"]')
        .val(),
      title = $(this).val() + ",";

    if ($(this).is(":checked")) {
      var html = '<span title="' + title + '">' + title + "</span>";
      $(".multiSel").append(html);
      $(".hida").hide();
    } else {
      $('span[title="' + title + '"]').remove();
      var ret = $(".hida");
      $(".dropdown dt a").append(ret);
    }
  });

  var Bulgaria = document.getElementById("cb-Bulgaria");
  var Greece = document.getElementById("cb-Greece");
  var Romania = document.getElementById("cb-Romania");
  var Poland = document.getElementById("cb-Poland");
  var Russia = document.getElementById("cb-Russia");

  document.getElementById("multi-select").addEventListener("click", function() {
    var select = [0];
    if (Bulgaria.checked) {
      select.push(1);
    }
    if (Greece.checked) {
      select.push(2);
    }
    if (Romania.checked) {
      select.push(4);
    }
    if (Poland.checked) {
      select.push(3);
    }
    if (Russia.checked) {
      select.push(5);
    }

    $.get("GDP-Service-USD.csv", function(str) {
      var arrayData = $.csv.toArrays(str, {
        onParseValue: $.csv.hooks.castToScalar
      });
      var data = google.visualization.arrayToDataTable(arrayData);

      var view = new google.visualization.DataView(data);
      view.setColumns(select);
      var options = {
        title: "GDP",
        width: 800,
        height: 400,
        isStacked: "true",
        legend: { position: "bottom", maxLines: 3 },
        vAxis: {
          minValue: 0
        }
      };
      var chart = new google.visualization.AreaChart(
        document.getElementById("gdp-chart")
      );
      chart.draw(view, options);
    });
  });
}
