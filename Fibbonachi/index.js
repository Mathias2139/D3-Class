var turnFraction =1.6180339
var numPoints = 1000
var canvasSize = 700

var highlight = 1

var arrData = []
var arrXData = []
var arrYData = []
var skyCols = ["lightblue","cadetblue", "grey", "pink", "orange"];




var svg = d3.selectAll("svg")
	.attr("width",canvasSize)
	.attr("height",canvasSize)


for (var i = 210 ; i < numPoints; i++) {
    var circleColor = skyCols[i%skyCols.length]

	var dst = Math.pow(i / (numPoints - 1),0.6)
	var angle = 2 * Math.PI * 1.68 * i

	var x = dst * Math.cos(angle)
	var y = dst * Math.sin(angle)


	arrData.push({distance: dst, xValue: x, yValue: y, color: circleColor})
	arrXData.push(x)
	arrYData.push(y)

}


var xMin = d3.min(arrXData)
var xMax = d3.max(arrXData)

var xScale = d3.scaleLinear()
				.domain([xMin,xMax])
				.range([15, canvasSize-15]);

var yMin = d3.min(arrYData)
var yMax = d3.max(arrYData)

var yScale = d3.scaleLinear()
				.domain([yMin,yMax])
				.range([15, canvasSize-15]);



circles = svg.selectAll("circle")
	.data(arrData)
	.join("circle")
	.attr("class","fibCircle")
	.attr("fill", function(d){
		return d.color;
	})
	.attr("cx",function(d){
		return xScale(d.xValue);
	})
	.attr("cy",function(d){
		return yScale(d.yValue);
	})
	.attr("r",4);


circles.transition()
	.duration(function(d){
		return 1000 * d.distance;
	})
	.attr("r",4)
	.transition()
	.duration(2000)
	.ease(d3.easeBackOut.overshoot(2))
	.attr("r",function(d){
		return d.distance * 4 + 6;
	});



var i = 0.5555555;                  //  set your counter to 1

function myLoop() {         //  create a loop function
  setTimeout(function() { 
  arrData.length=0  		//  call a 3s setTimeout when the loop is called
    for (var j = 210 ; j < numPoints; j++) {
    var circleColor = skyCols[j%skyCols.length]

	var dst = Math.pow(j / (numPoints - 1),0.6)
	var angle = 2 * Math.PI * i * j
	console.log(i)
	var x = dst * Math.cos(angle)
	var y = dst * Math.sin(angle)

	
	arrData.push({distance: dst, xValue: x, yValue: y, color: circleColor})
	arrXData.push(x)
	arrYData.push(y)
	}

	updateCirclePos() //  your code here
    i+=0.000006;                    //  increment the counter
    if (i < 10) {           //  if the counter < 10, call the loop function
      myLoop();             //  ..  again which will trigger another 
    }                       //  ..  setTimeout()
  }, 10)
}

myLoop(); 


function updateCirclePos(){

var xMin = d3.min(arrXData)
var xMax = d3.max(arrXData)

var xScale = d3.scaleLinear()
				.domain([xMin,xMax])
				.range([15, canvasSize-15]);

var yMin = d3.min(arrYData)
var yMax = d3.max(arrYData)

var yScale = d3.scaleLinear()
				.domain([yMin,yMax])
				.range([15, canvasSize-15]);



circles = svg.selectAll(".fibCircle")
	.data(arrData)
	.join("circle")
	.attr("fill", function(d){
		return d.color;
	})
	.attr("cx",function(d){
		return xScale(d.xValue);
	})
	.attr("cy",function(d){
		return yScale(d.yValue);
	})
	.attr("r",5);
}




var mid = svg.append("circle")
		.attr("cx", canvasSize/2)
		.attr("cy",canvasSize/2)

		.attr("r",120)
		.attr("id", "middle")


var thisColor;
circles.on("mouseover", function(d,i){
	d3.select(this)
		.transition()
		.duration(300)
		.attr("r",function(d, i){
//			console.log(d.color)
			thisColor = d.color
			updateMid()
			return d.distance * 4 + 10;
		})
		
		
		
	})
	

	.on("mouseout",function(d,i){
		d3.select(this)
		.transition()
		.duration(150)
		.attr("r",function(d ,i){
			return d.distance * 4 + 6;
		})
	})


svg.on("click", function(){
	updateData();
	updateVis();
})





function updateData(){
	highlight++
}

function updateVis(){

	d3.selectAll("circle")
		.data(arrData)
		.join("circle")
		.attr("fill", function(d,i){
			return highlightDecider(i);
		})
}

function updateMid(){
	console.log(thisColor)
	d3.select("#middle")
	.transition()
		.attr("fill", thisColor)
}

function highlightDecider(number){
	if(number%highlight == 0){
		return "orange"
	}
	else{
		return "lightgrey"
	}
}

