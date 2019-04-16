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
    console.log(data);
    var view = new google.visualization.DataView(data);
    // Set chart options
    var options = {
      title: "GDP",
      width: 800,
      height: 400,
      legend: {
        position: "bottom"
      },
      vAxis: {
        title: "Tax value",
        viewWindowMode: "explicit",
        viewWindow: {
          min: 0
        }
      }
    };
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(
      document.getElementById("gdp-chart")
    );
    chart.draw(view, options);
  });
}
