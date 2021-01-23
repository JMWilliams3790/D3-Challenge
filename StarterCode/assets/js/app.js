// Load data from hours-of-tv-watched.csv
// Best to open HTML in an incognito window!
d3.csv("/assets/data/data.csv").then(function(riskData) {

    console.log(riskData);
    // Cast each hours value in riskData as a number using the unary + operator
    riskData.forEach(function(data) {
        data.healthcareLow = +data.healthcareLow;
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
        data.age = +data.age;
        data.smokes = +data.smokes;
        data.income = +data.income;
    });
    //Make chart
    var svgWidth = 960;
    var svgHeight = 500;
    
    var margin = {
      top: 20,
      right: 40,
      bottom: 60,
      left: 50
    };
    
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    
    var svg = d3
      .select("body")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    /* Step 4:
     * Scales and axes
     */
    // =================================
    var xLinearScale = d3.scaleLinear()
      .domain(d3.extent(riskData, d => d.healthcareLow))
      .range([0, width]);
  
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(riskData, d => d.poverty)])
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




    var xLinearScale = d3.scaleLinear()
       .domain(d3.extent(riskData, d => d.healthcareLow))
       .range([0, width]);
   
    var yLinearScale = d3.scaleLinear()
       .domain([0, d3.max(riskData, d => d.poverty)])
       .range([height, 0]);

  // Add dots
  svg.append("g")
    .selectAll("dot")
    .data(riskData)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return (d.healthcareLow); } )
      .attr("cy", function (d) { return (d.poverty); } )
      .attr("r", 7)
      .style("fill", "#69b3a2")
      .style("opacity", 0.3)
      .style("stroke", "white");


  }
  , function(error) {
    console.log(error);
  });
  