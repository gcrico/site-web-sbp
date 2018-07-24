// Data source:
// http://tech.mit.edu/V132/N59/pressure/breakdown/residence/index.htm
//
// These attributes represent the percentage of YES answers for each dorm
// - happierThanAvg: "I am happier than the average MIT student."
// - extroverted: "Are you extroverted?"
// - workLifeBalance: "I strike a good balance between my personal life and work."
var mitPressureSurvey = [
{dorm: 'Baker House', happierThanAvg: 49, extroverted: 44, workLifeBalance: 54},
{dorm: 'Bexley Hall', happierThanAvg: 36, extroverted: 41, workLifeBalance: 38},
{dorm: 'Burton Connor', happierThanAvg: 50, extroverted: 39, workLifeBalance: 43},
{dorm: 'East Campus', happierThanAvg: 46, extroverted: 31, workLifeBalance: 46},
{dorm: 'MacGregor House', happierThanAvg: 42, extroverted: 25, workLifeBalance: 49},
{dorm: 'Maseeh Hall', happierThanAvg: 45, extroverted: 38, workLifeBalance: 43},
{dorm: 'McCormick Hall', happierThanAvg: 46, extroverted: 32, workLifeBalance: 47},
{dorm: 'New House', happierThanAvg: 41, extroverted: 24, workLifeBalance: 48},
{dorm: 'Next House', happierThanAvg: 35, extroverted: 18, workLifeBalance: 45},
{dorm: 'Random Hall', happierThanAvg: 47, extroverted: 29, workLifeBalance: 37},
{dorm: 'Senior House', happierThanAvg: 38, extroverted: 29, workLifeBalance: 38},
{dorm: 'Simmons Hall', happierThanAvg: 41, extroverted: 22, workLifeBalance: 49},
{dorm: 'Fraternities', happierThanAvg: 54, extroverted: 40, workLifeBalance: 54},
{dorm: 'Sororities', happierThanAvg: 56, extroverted: 52, workLifeBalance: 45},
{dorm: 'ILGs', happierThanAvg: 63, extroverted: 22, workLifeBalance: 33},
{dorm: 'Off Campus', happierThanAvg: 46, extroverted: 37, workLifeBalance: 41},
{dorm: 'Ashdown House', happierThanAvg: 37, extroverted: 25, workLifeBalance: 34},
{dorm: 'Edgerton House', happierThanAvg: 40, extroverted: 21, workLifeBalance: 47},
{dorm: 'Sidney-Pacific', happierThanAvg: 42, extroverted: 31, workLifeBalance: 33},
{dorm: 'Tang Hall', happierThanAvg: 34, extroverted: 26, workLifeBalance: 33},
{dorm: 'The Warehouse', happierThanAvg: 50, extroverted: 47, workLifeBalance: 41},
{dorm: 'Eastgate', happierThanAvg: 56, extroverted: 30, workLifeBalance: 51},
{dorm: 'Westgate', happierThanAvg: 43, extroverted: 30, workLifeBalance: 43}
]

var songData = [
{name: "Cadavre Exquis", id: "cadavre", created: "2017-04-01", modified: "2017-04-11", version: 5, modifiedBy: "GuiLLm", type: "instru"},
{name: "L'entraide", id: "qua", created: "2017-07-29", modified: "2017-10-09", version: 14, modifiedBy: "Rasok", type: "rap", emcees: ["Rasok","Maud","GuiLLm","Fallon","Julian","Sonny Do"]},
{name: "Confiture", id: "jam", created: "2015-10-19", modified: "2015-10-19", version: 1, modifiedBy: "GuiLLm", type: "instru"},
{name: "Spaz", id: "spaz", created: "2017-05-19", modified: "2017-08-02", version: 8, modifiedBy: "Rasok", type: "rap", emcees: ["Rasok","Deden","GuiLLm"]},
{name: "Sakoto", id: "sakoto", created: "2015-01-01", modified: "2015-01-01", version: 1, modifiedBy: "Rasok", type: "instru"},
{name: "Temps Durs", id: "temps_durs", created: "2015-09-28", modified: "2016-09-28", version: 4, modifiedBy: "Rasok", type: "instru"},
]

var i = 0;
var width = 420
var barHeight = 40;
var cornerRadius = 12;
var barColor = "hsla(22, 100%, 59%, 0.8)";
// utility function that maps [0 to 100] to [0, width]
// draw this on the board as a map of two lines
var scaleFunction = d3.scale.linear().domain([0, 100]).range([0, width]);
// the main function that uses d3 to both create and update the bar chart
function updateBarChart() {
  var chart = d3.select("#d3chart"); // select the chart itself
  // This line binds our data to a set of DOM elements, specifically:
  //
  //   mitPressureSurvey <--> '#d3chart g'
  //
  // Each element in the mitPressureSurvey list corresponds to a SVG 'g'
  // element inside of #d3chart.
  var binding = chart.selectAll("g")
                     .data(songData, function(d) {
                       // This function, passed as the second argument
                       // to data(), specifies that the dorm name should
                       // be used as the identifying key for each
                       // element in mitPressureSurvey. Without this
                       // function, the sorting won't work properly.
                       return d.name;
                     });
  // enter() specifies what happens when you create the bar chart FOR
  // THE FIRST TIME. first append a SVG 'g' element for each element in
  // mitPressureSurvey ...
  var enterG = binding.enter()
                      .append("g")
  // ... then append a 'rect' (rectangle) inside of each 'g', with a
  // width proportional to happierThanAvg, to represent each bar.
  enterG
     .append("rect")
     .attr("rx", cornerRadius)
     .attr("ry", cornerRadius)
     .attr("width", function(d) {
       return d.name.length * 10 + scaleFunction(d.version) * 5;
     })
     .attr("height", barHeight - 10)
     .attr("fill", barColor)
     .on("click", function() { window.open("http://google.com"); }); // when clicked, opens window with google.com.;
  // ... then append a 'text' node inside of each 'g' (after 'rect')
  // with the dorm name as the label.
  enterG
     .append("text")
     .attr("x", 12)
     .attr("letter-spacing", "1.5")
     .attr("y", barHeight / 2 + 1)
     .attr("stroke", "white")
     .attr("fill", "white")
     .text(function(d) {return d.name;});
  
  // OK here's the really subtle part: If we call methods directly on
  // the binding variable (without first calling .enter()), it specifies
  // what happens EVERY TIME this updateBarChart() runs, not just the
  // first time. Remember, all the code above in the enter() section ran
  // only once when the chart was first created. The code below runs
  // every time you call updateBarChart().
  //
  // So what does this code do? It first initiates a smooth transition
  // with a duration of 1500ms (1.5 seconds). This transition sets the
  // "transform" attribute of each 'g' element to the appropriate
  // coordinates, based on the index (i) of the corresponding element in
  // mitPressureSurvey.
  //
  // Thus, when you sort the list, the index (i) of each element
  // corresponds to its sort order, and d3 knows to move it into the
  // proper coordinates.
  //
  // In d3 terminology, this is called an 'update' selection. See:
  // - http://bost.ocks.org/mike/join/
  // - http://bl.ocks.org/mbostock/3808218
  binding.transition()
         .duration(1000)
         .attr("transform", function(d, n) {
           return "translate(0," + n * barHeight + ")";
         });
}
// sort mitPressureSurvey by happierThanAvg and update the chart
function sortAndUpdate(i) {
  songData.sort(function(a, b) {
    if (i == 1) {
      return d3.ascending(a.name, b.name);
    }
    else if (i == 2) {
      return d3.descending(a.created, b.created);
    }
    else  {
      return d3.descending(a.version, b.version);
    }
  });
  // update the EXISTING bar chart with the newly-sorted mitPressureSurvey
  updateBarChart();
}
/*function handleMouseOver() {  // Add interactivity

            // Use D3 to select element, change color and size
            d3.select(this).attr(fill: "blue");
          }*/
// run this code after your page loads
$(function() {
  // set the initial dimensions for the SVG container
  // (very important or else the entire chart won't display)
  d3.select("#d3chart")
    .attr("width", width)
    .attr("height", barHeight * songData.length);
  // create the bar chart for the first time
  updateBarChart();
  // set button click handlers
  $("#sortNameButton").click(function() {sortAndUpdate(1);});
  $("#sortDateButton").click(function() {sortAndUpdate(2);});
  $("#sortVersionButton").click(function() {sortAndUpdate(3);});
});