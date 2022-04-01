var h = 700
var w = 650
var rad = 90
var backColor = "black"
var starFrac = [1.6158, 1.6180339, 2.567, 0.654, 1.777]

var svg = d3.selectAll("svg")
	.attr("width",w)
	.attr("height",h)
	.style("background-color", backColor);


var defs = svg
     .append("defs");
var mask = defs
     .append("mask")
     .attr("id", "myMask");

//Filter for the outside glow
var filter = defs.append("filter")
    .attr("id","glow");

filter.append("feGaussianBlur")
    .attr("stdDeviation","6")
    .attr("result","coloredBlur");

var feMerge = filter.append("feMerge");
	feMerge.append("feMergeNode")
    .attr("in","coloredBlur");
	feMerge.append("feMergeNode")
    .attr("in","SourceGraphic");

var filter2 = defs.append("filter")
    .attr("id","blur");

filter2.append("feGaussianBlur")
    .attr("stdDeviation","3")
    .attr("result","coloredBlur");




var turnFraction =1.6180339
var numPoints = 2000
var canvasSize = 700

var highlight = 1

var arrData = []
var arrXData = []
var arrYData = []




for (var i = 1 ; i < numPoints; i++) {
    var circleColor = "white"

	var dst = Math.pow(i / (numPoints - 1),0.6)
	var angle = 2 * Math.PI * 1.68 * i

	var x = w/2 + 1000 * dst * Math.cos(angle)
	var y = h +300+ 700* dst * Math.sin(angle)


	arrData.push({distance: dst, xValue: x, yValue: y, color: circleColor})


}





circles = svg.selectAll("circle")
	.data(arrData)
	.join("circle")
	.attr("class","fibCircle")
	.attr("fill", function(d){
		return d.color;
	})
	.attr("cx",function(d){
		return d.xValue;
	})
	.attr("cy",function(d){
		return d.yValue;
	})
	.attr("r",2);




var random = Math.round(Math.random()*(starFrac.length-1))
console.log(random)
var i = starFrac[random]

function myLoop() {         //  create a loop function
  setTimeout(function() { 
  arrData.length=0  		//  call a 3s setTimeout when the loop is called
    for (var j = 210 ; j < numPoints; j++) {
    var circleColor = "white"

	var dst = Math.pow(j / (numPoints - 1),0.6)
	var angle = 2 * Math.PI * i * j

		var x = w/2 + 1000 * dst * Math.cos(angle)
var y = h +300+ 1200 * dst * Math.sin(angle)
	
	arrData.push({distance: dst, xValue: x, yValue: y, color: circleColor})

	}

	updateCirclePos() //  your code here
    i+=0.0000001;                    //  increment the counter
    if (i < 10) {           //  if the counter < 10, call the loop function
      myLoop();             //  ..  again which will trigger another 
    }                       //  ..  setTimeout()
  }, 10)
}

myLoop(); 


function updateCirclePos(){




circles = svg.selectAll(".fibCircle")
	.data(arrData)
	.join("circle")
	.attr("fill", function(d){
		return d.color;
	})
	.attr("cx",function(d){
		return d.xValue;
	})
	.attr("cy",function(d){
		return d.yValue;
	})
	.attr("r",2);
}




	




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




























svg.append("circle")
    .attr("cx", w/2)
    .attr("cy", h/2)
    .attr("r", rad)
    .style("fill", backColor)
    .style("opacity", 1);  

  mask.append("circle")
  	.attr("class","glowRecieve")
    .attr("cx", w/2)
    .attr("cy", h/2)
    .attr("r", rad)
    .style("fill", "white")
    .style("opacity", 1);    

var shadow = mask.append("circle")
    .attr("cx", w/2 + rad*2)
    .attr("cy", h/2)
    .attr("class", "blurRecieve")
    .attr("r", rad-1)
    .attr("fill","black");

var moon = svg
    .append("rect")
    .attr("class", "glowRecieve")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 800)
    .attr("height", 500)
    .attr("mask", "url(#myMask)")
    .style("fill", "white")

d3.selectAll(".glowRecieve")
	.style("filter", "url(#glow)");

d3.selectAll(".fibCircle")
	.style("filter", "url(#glow)");
	
d3.selectAll(".blurRecieve")
	.style("filter", "url(#blur)");



BeginMoonCycle()


function MoonCycleBuffer(){
	console.log("hello")
	BeginMoonCycle()
}


async function BeginMoonCycle(){

await shadow
	.attr("cx", w/2 + rad*2)
	.transition()
	.ease(d3.easeLinear)
	.duration(4000)
	.attr("cx", w/2 - rad*2)
	.end();

 	MoonCycleBuffer()
}




	



















function CalcCirclePos(centreX, centreY, distFromCentre, degreesToRotate){

	var angle = degreesToRotate * (Math.PI/180)

	var x = centreX + distFromCentre * Math.cos(angle)
	var y = centreY + distFromCentre * Math.sin(angle)

	return [x,y]

}

function DistributeAroundCircle(centreX, centreY, distFromCentre, amountOfPoints){

	var outputArr = []

	var pointSpacing = 1/amountOfPoints

	for (var i = 0; i < amountOfPoints; i++) {


		var angle = 2 * Math.PI * pointSpacing * i

		var x = centreX + distFromCentre * Math.cos(angle)
		var y = centreY + distFromCentre * Math.sin(angle)

		outputArr.push({"x":x,"y":y})
	}

	
	return outputArr

}
