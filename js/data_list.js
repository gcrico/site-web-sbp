//see https://bost.ocks.org/mike/join/
//and http://bl.ocks.org/mbostock/3808218

d3.json("../js/songData.json", function(data){

var i = 0;
var barHeight = 40;
var width = window.innerWidth - 200;
var cornerRadius = 12;
var barColor = "#ff7b2e";
var barNameColor = "white";
var barVersionColor = "rgba(255, 241, 216, 0.35)";

function updateBarChart(){
  var chart = d3.select("#d3chart"); 
    
  var binding = chart.selectAll("g")
                     .data(songData, function(d) {
                     	return d.name;
                     });
    
  var enterG = binding.enter()
                      .append("g")
                      .on("click", function(d){ window.open("../db/" + d.id + ".html"); });
    
  enterG.append("rect")
	  	.attr("rx", cornerRadius)
		.attr("ry", cornerRadius)
		.attr("width", 100)
		.attr("height", barHeight - 10)
		.attr("fill", barColor)
		.attr("opacity", "0.9")
		.on("mouseover", handleMouseOver)
		.on("mouseout", handleMouseOut);
    
  enterG.append("text")
		.attr("x", 12)
		.attr("letter-spacing", "1.5")
		.attr("y", barHeight / 2 + 1)
		.attr("stroke", barNameColor)
		.attr("fill", barNameColor)
		.text(function(d) {return d.name;})
	  	.text(window.innerWidth);
 
  enterG.append("text")
        .attr("stroke", barVersionColor)
        .attr("fill", barVersionColor)
        .attr("y", barHeight / 2 + 1)
        .attr("x", 100)
        .text(function(d) {return "v0.0." + d.version;});

  binding.transition()
         .duration(1000)
         .attr("transform", function(d, n) {
            return "translate(0," + n * barHeight + ")";
         });
    
  binding.select("rect").enter()
        .attr("width", function(d) {
            return (180 + d.version * 4) * sqrt(window.innerWidth) / 100;
        });
    
  binding.select("text")
         .text(window.innerWidth);
};
	
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
  // update the EXISTING bar chart with the newly-sorted data
  updateBarChart();
};

    window.addEventListener("resize", function(){updateBarChart();});

    
 // Create Event Handlers for mouse
      function handleMouseOver(d, i) {  // Add interactivity

            // Use D3 to select element, change color and size
            d3.select(this).style("fill", "orange");
          };

      function handleMouseOut(d, i) {
            // Use D3 to select element, change color back to normal
            d3.select(this).transition().style("fill", barColor);
          };
    



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
    
    });

// Set the dimensions of the canvas / graph
/*var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 360 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom,
	i = 0,
	barHeight = 40,
	cornerRadius = 12,
	barColor = "#ff7b2e",
	barNameColor = "white",
	barVersionColor = "rgba(255, 241, 216, 0.35)";


// Parse the date / time
var parseDate = d3.time.format("%y-%m-%d").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
    .x(0)
    .y(20);
 

var chart = d3.select('.dataDiv'); 
    
  // Adds the svg canvas
var svg = d3.select(".dataDiv")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("js/songData.json", function(d) {

/*
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);
*/

/*    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));*/

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
	

	
  var chart = d3.select(".dataDiv"); 
    
  var binding = chart.selectAll("g")
                     .data(songData, function(d) {
                     	return d.name;
                     });
  var enterG = binding.enter()
                      .on("click", function(d){ window.open("../db/" + d.id + ".html"); });

  svg.append("rect")
	  	.attr("rx", cornerRadius)
		.attr("ry", cornerRadius)
		.attr("width", 100)
		.attr("height", barHeight - 10)
		.attr("fill", barColor)
		.attr("opacity", "0.9")
		.on("mouseover", handleMouseOver)
		.on("mouseout", handleMouseOut);
	
  enterG.append("text")
		.attr("x", 12)
		.attr("letter-spacing", "1.5")
		.attr("y", barHeight / 2 + 1)
		.attr("stroke", barNameColor)
		.attr("fill", barNameColor)
		.text(function(d) {return d.name;})
	  	.text(window.innerWidth);
 
  enterG.append("text")
        .attr("stroke", barVersionColor)
        .attr("fill", barVersionColor)
        .attr("y", barHeight / 2 + 1)
        .attr("x", 100)
        .text(function(d) {return "v0.0." + d.version;});

});*/