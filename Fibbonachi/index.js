var turnFraction =1.6180339
var numPoints = 1000
var canvasSize = 700

var highlight = 1

var arrData = []
var arrXData = []
var arrYData = []
var skyCols = ["lightblue","cadetblue", "grey", "pink", "orange"];
var circleObjArr = []



var svg = d3.selectAll("svg")
	.attr("width",canvasSize)
	.attr("height",canvasSize)


for (var i = 210 ; i < numPoints; i++) {
    var color = skyCols[i%skyCols.length]

	var dst = Math.pow(i / (numPoints - 1),0.6)
	var angle = 2 * Math.PI * turnFraction * i

	var x = dst * Math.cos(angle)
	var y = dst * Math.sin(angle)



	placePoint(x,y,5)
	arrData.push({distance: dst, xValue: x, yValue: y, number: i, colour: color})
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




var circles = svg.selectAll("circle")
	.data(arrData)
	.join("circle")
	.attr("fill", function(d){
		return d.colour;
	})
	.attr("cx",function(d){
		return xScale(d.xValue);
	})
	.attr("cy",function(d){
		return yScale(d.yValue);
	})
	.attr("r",0);
	


circles.transition()
	.duration(function(d){
		return 1000 * d.distance;
	})
	.attr("r",0)
	.transition()
	.duration(2000)
	.ease(d3.easeBackOut.overshoot(2))
	.attr("r",function(d){
		return d.distance * 4 + 6;
	});



var mid = svg.append("circle")
		.attr("cx", canvasSize/2)
		.attr("cy",canvasSize/2)
		.attr("fill", "black")
		.attr("r",120)
		.attr("id", "middle")



circles.on("mouseover", function(d,i){
	d3.select(this)
		.transition()
		.duration(300)
		.attr("r",function(d, i){
			return d.distance * 4 + 10;
		})
		var thisColor = function(d){
			return this.fill;
		}
		console.log(d.xValue)

	d3.selectAll("middle")
		.attr("fill", "white")
		
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



function placePoint(x,y,r)
{
	var tempCircle = svg.append("circle")
		.attr("cx", x)
		.attr("cy",y)
		.attr("fill", "black")
		.attr("r",r)
}

function updateData(){
	highlight++
}

function updateVis(){

	d3.selectAll("circle")
		.data(arrData)
		.join("circle")
		.attr("fill", function(d){
			return highlightDecider(d.number);
		})
}

function highlightDecider(number){
	if(number%highlight == 0){
		return "orange"
	}
	else{
		return "lightgrey"
	}
}

