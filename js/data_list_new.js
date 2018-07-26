d3.json("../js/songData.json", function(songData) {
//console.log(songData);
	
var i = 0,
	margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom,
    barHeight = 40,
    cornerRadius = 12,
    barColor = "#ff7b2e",
    barNameColor = "white",
    barVersionColor = "rgba(255, 241, 216, 0.35)";

function updateBarChart() {

/*var svg = d3.select(".dataDiv")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		*/
    
var chart = d3.select("#d3chart");

var binding = chart.selectAll("g").data(songData, function(d) {
                       // This function, passed as the second argument
                       // to data(), specifies that the dorm name should
                       // be used as the identifying key for each
                       // element in mitPressureSurvey. Without this
                       // function, the sorting won't work properly.
                       return d.name;
                     });

var enterG = binding.enter()
                    .append("g")
                    .on("click", function(d) {
                        window.open("/db/" + d.id + ".html"); 
                    });
  
  enterG.append("rect")
        .attr("rx", cornerRadius)
        .attr("ry", cornerRadius)
        .attr("width", function(d) {
            return 180 + window.innerWidth * ( d.version * 4) / 200;
        })
        .attr("height", barHeight - 10)
        .attr("fill", barColor)
        .attr("opacity", "0.9");
        
  enterG.append("text")
        .attr("x", 12)
        .attr("letter-spacing", "1.5")
        .attr("y", barHeight / 2 + 1)
        .attr("stroke", barNameColor)
        .attr("fill", barNameColor)
        .text(function(d) {return d.name;})
        //.text(window.innerWidth);
 // on ajoute la version à droite.
  enterG
    .append("text")
    .attr("stroke", barVersionColor)
    .attr("fill", barVersionColor)
    .attr("y", barHeight / 2 + 1)
    .attr("x", function(d) {
       return 180 + window.innerWidth * ( d.version * 4) / 200 - (d.version-d.version%10)*.7 - 45;
     })
    .text(function(d) {return "v0.0." + d.version;});
    
  binding.transition()
         .duration(1000)
         .attr("transform", function(d, n) {
           return "translate(0," + n * barHeight + ")";
         });
    
 binding.on("mouseover", function(){
            d3.select(this).select("rect").style("fill", "orange")
        })
        .on("mouseout", function(){
            d3.select(this).select("rect").transition().style("fill", barColor)
        });
}

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
}
    
d3.select("#d3chart")
    .attr("width", width)
    .attr("height", barHeight * songData.length);

updateBarChart();
    
$(function() {
  // set the initial dimensions for the SVG container
  // (very important or else the entire chart won't display)

  // create the bar chart for the first time

  // set button click handlers
  $("#sortNameButton").click(function() {sortAndUpdate(1);console.log("button 1");});
  $("#sortDateButton").click(function() {sortAndUpdate(2);console.log("button 2");});
  $("#sortVersionButton").click(function() {sortAndUpdate(3);console.log("button 3");});
 
});	
});

