// Load data from hours-of-tv-watched.csv
// Best to open HTML in an incognito window!
d3.csv("assets/data/data.csv").then(function(riskData) {

    console.log(riskData);
    // Cast each hours value in riskData as a number using the unary + operator
    riskData.forEach(function(data) {
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
        data.age = +data.age;
        data.smokes = +data.smokes;
        data.income = +data.income;
    });
    //Make chart
    var svgWidth = 1000;
    var svgHeight = 650;
    
    var margin = {
      top: 20,
      right: 40,
      bottom: 60,
      left: 50
    };
    
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    
    var svg = d3
      .select("#scatter")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
      
    
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    /* Initialize tooltip */
    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function(d) {
       return `${d.state}<br/>Poverty: ${d["poverty"]}<br/>Healthcare: ${d.healthcare}`; 
    });

    /* Invoke the tip in the context of your visualization */
    svg.call(tip)

    var extentX = d3.extent(riskData, d => d.poverty);
    var rangeX = extentX[1] - extentX[0]
    var domainX = [
      extentX[0] - rangeX * .04,
      extentX[1] + rangeX * .04
    ]
    var xLinearScale = d3.scaleLinear()
       .domain(domainX)
       .range([0, width]);
   


    var extentY = d3.extent(riskData, d => d.healthcare);
       var rangeY = extentY[1] - extentY[0]
       var domainY = [
         extentY[0] - rangeY * .04,
         extentY[1] + rangeY * .04
       ]
    var yLinearScale = d3.scaleLinear()
       .domain(domainY)
       .range([height, 0]);

    
    var bottomAxis = d3.axisBottom(xLinearScale)
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .attr("stroke", "blue")
    .call(bottomAxis);

    chartGroup.append("g")
        .attr("stroke", "blue")
        .call(leftAxis);

  // Add dots
  chartGroup
    .selectAll("circle")
    .data(riskData)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return xLinearScale(d.poverty); } )
      .attr("cy", function (d) { return yLinearScale(d.healthcare); } )
      .attr("r", 15)
      .style("fill", "#69b3a2")
      .style("opacity", 0.3)
      .style("stroke", "69b3a2")
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

  chartGroup
    .selectAll(null)
    .data(riskData)
    .enter()
    .append("text")
      .classed("stateText", true)
      .attr("x", function (d) { return xLinearScale(d.poverty); } )
      .attr("y", function (d) { return yLinearScale(d.healthcare); } )
      .attr("dy", "0.4em")
      .text(function (d) { return (d.abbr)})
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

  chartGroup
  .append("text")
      .attr("transform", `translate (${width/2},${height + 40})`)
      .text("Poverty %")
  chartGroup
  .append("text")
      .attr("transform", "rotate (-90)")
      .attr("x", 0-height/2)
      .attr("y", 0-margin.left + 25)
      .text("Lacks Healthcare %")
    
  }
  , function(error) {
    console.log(error);
  });
  