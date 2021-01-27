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
      bottom: 100,
      left: 100
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
  
    var t = d3.transition().duration(500)
    var currentXlabel = "Poverty"
    var currentYlabel = "Healthcare"

    /* Initialize tooltip */
    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function(d) {
      var xvalue = null
      var yvalue = null
      if (currentXlabel === "Poverty"){
        xvalue = d.poverty;
      }
      else if (currentXlabel === "Age"){
        xvalue = d.age;
      }
      else{
        xvalue = d.income;
      };
      if (currentYlabel === "Healthcare"){
        yvalue = d.healthcare;
      }
      else if (currentYlabel === "Smokes"){
        yvalue = d.smokes;
      }
      else{
        yvalue = d.obesity;
      }

       return `${d.state}<br/>${currentXlabel}: ${xvalue}<br/>${currentYlabel}: ${yvalue}`; 
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
    .attr("id", "xaxis")
    .call(bottomAxis);

    chartGroup.append("g")
        .attr("stroke", "blue")
        .attr("id", "yaxis")
        .call(leftAxis);


//add state abbreviations
  var circleLabels = chartGroup
    .selectAll(null)
    .data(riskData)
    .enter()
    .append("text")
      .classed("stateText", true)
      .attr("x", function (d) { return xLinearScale(d.poverty); } )
      .attr("y", function (d) { return yLinearScale(d.healthcare); } )
      .attr("dy", "0.4em")
      .text(function (d) { return (d.abbr)})

  


  // Add circles
  var circles = chartGroup
    .selectAll("circle")
    .data(riskData)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return xLinearScale(d.poverty); } )
      .attr("cy", function (d) { return yLinearScale(d.healthcare); } )
      .attr("r", 15)
      .style("fill", "#69b3a2")
      .style("opacity", 0.3)
      .style("stroke", "#69b3a2")
      .on("mouseover", function(d){
        d3.select(this)
        .style("stroke", "red");
        tip.show(d,this);
      })

      .on("mouseout", function(d){
        d3.select(this)
        .style("stroke", "transparent");
        tip.hide(d,this);
      })
      



      
// Name X-axis
// Poverty
  chartGroup
  .append("text")
      .attr("transform", `translate (${width/2},${height + 30})`)
      .text("Poverty %")
      .on("click", function(){
        currentXlabel = "Poverty"
        var extentX = d3.extent(riskData, d => d.poverty);
        var rangeX = extentX[1] - extentX[0]
        var domainX = [
          extentX[0] - rangeX * .04,
          extentX[1] + rangeX * .04
        ]
        var xLinearScale = d3.scaleLinear()
           .domain(domainX)
           .range([0, width]);

        
        var bottomAxis = d3.axisBottom(xLinearScale)
        var leftAxis = d3.axisLeft(yLinearScale);
        d3.select("#xaxis")
        .transition(t)
        .call(bottomAxis);
        circles
        .transition(t)
          .attr("cx", function (d) { return xLinearScale(d.poverty); } )
        circleLabels
          .classed("stateText", true)
          .transition(t)
          .attr("x", function (d) { return xLinearScale(d.poverty); } )
       })
  //Age
  chartGroup
  .append("text")
      .attr("transform", `translate (${width/2},${height + 50})`)
      .text("Age (Median)")
      .on("click", function(){
        currentXlabel = "Age"
        var extentX = d3.extent(riskData, d => d.age);
        var rangeX = extentX[1] - extentX[0]
        var domainX = [
          extentX[0] - rangeX * .04,
          extentX[1] + rangeX * .04
        ]
        var xLinearScale = d3.scaleLinear()
           .domain(domainX)
           .range([0, width]);

        
        var bottomAxis = d3.axisBottom(xLinearScale)
        var leftAxis = d3.axisLeft(yLinearScale);
        d3.select("#xaxis")
        .transition(t)
        .call(bottomAxis);
        circles
        .transition(t)
          .attr("cx", function (d) { return xLinearScale(d.age); } )
        circleLabels
          .classed("stateText", true)
          .transition(t)
          .attr("x", function (d) { return xLinearScale(d.age); } )


       })
  //Income
  chartGroup
  .append("text")
      .attr("transform", `translate (${width/2},${height + 70})`)
      .text("Household Income (Median)")
      .on("click", function(){
        currentXlabel = "Income"
        var extentX = d3.extent(riskData, d => d.income);
        var rangeX = extentX[1] - extentX[0]
        var domainX = [
          extentX[0] - rangeX * .04,
          extentX[1] + rangeX * .04
        ]
        var xLinearScale = d3.scaleLinear()
           .domain(domainX)
           .range([0, width]);

        
        var bottomAxis = d3.axisBottom(xLinearScale)
        var leftAxis = d3.axisLeft(yLinearScale);
        d3.select("#xaxis")
        .transition(t)
        .call(bottomAxis);
      circles
        .attr("cx", function (d) { return xLinearScale(d.income); } )
      circleLabels
        .classed("stateText", true)
        .attr("x", function (d) { return xLinearScale(d.income); } )
       })
// Name Y-axis
//Healthcare Label
  chartGroup
  .append("text")
      .attr("transform", "rotate (-90)")
      .attr("x", 0-height/2)
      .attr("y", 0-margin.left + 70)
      .text("Lacks Healthcare %")
      .on("click", function(){
        currentYlabel = "Healthcare"
        var extentY = d3.extent(riskData, d => d.healthcare);
        var rangeY = extentY[1] - extentY[0]
        var domainY = [
          extentY[0] - rangeY * .04,
          extentY[1] + rangeY * .04
        ]
   var yLinearScale = d3.scaleLinear()
        .domain(domainY)
        .range([height, 0]);  
      var leftAxis = d3.axisLeft(yLinearScale);
      d3.select("#yaxis")
        .transition(t)
        .call(leftAxis);
      circles
        .attr("cy", function (d) { return yLinearScale(d.healthcare); } )      
      circleLabels
       .classed("stateText", true)
       .attr("y", function (d) { return yLinearScale(d.healthcare); } )
       .attr("dy", "0.4em")
        })
  //Smokes label      
  chartGroup
  .append("text")
      .attr("transform", "rotate (-90)")
      .attr("x", 0-height/2)
      .attr("y", 0-margin.left + 50)
      .text("Smokes %")
      .on("click", function(){
      currentYlabel = "Smokes"
        var extentY = d3.extent(riskData, d => d.smokes);
        var rangeY = extentY[1] - extentY[0]
        var domainY = [
          extentY[0] - rangeY * .04,
          extentY[1] + rangeY * .04
        ]
     var yLinearScale = d3.scaleLinear()
        .domain(domainY)
        .range([height, 0]);  
        var leftAxis = d3.axisLeft(yLinearScale);
        d3.select("#yaxis")
          .transition(t)
          .call(leftAxis);
      circles
      .transition(t)
        .attr("cy", function (d) { return yLinearScale(d.smokes); } )
      circleLabels
        .classed("stateText", true)
        .transition(t)
        .attr("y", function (d) { return yLinearScale(d.smokes); } )
        .attr("dy", "0.4em")
      })

      //Obesity label
      chartGroup
  .append("text")
      .attr("transform", "rotate (-90)")
      .attr("x", 0-height/2)
      .attr("y", 0-margin.left + 30)
      .text("Obese %")
      .on("click", function(){
      currentYlabel = "Obese"
        var extentY = d3.extent(riskData, d => d.obesity);
        var rangeY = extentY[1] - extentY[0]
        var domainY = [
          extentY[0] - rangeY * .04,
          extentY[1] + rangeY * .04
        ]
     var yLinearScale = d3.scaleLinear()
        .domain(domainY)
        .range([height, 0]);  
        var leftAxis = d3.axisLeft(yLinearScale);
        d3.select("#yaxis")
          .transition(t)
          .call(leftAxis);
      circles
        .transition(t)
        .attr("cy", function (d) { return yLinearScale(d.obesity); } )
       
      circleLabels
       .classed("stateText", true)
       .transition(t)
       .attr("y", function (d) { return yLinearScale(d.obesity); } )
       .attr("dy", "0.4em")
      })
  }
  , function(error) {
    console.log(error);
  });
  