var w = 500;
var h = 500;
var dogData = [17,5,10, 13, 7, 23, 18, 3, 14,17,5,10, 13, 7, 23, 18, 3, 14,17,5,10, 13, 7, 23, 18, 3, 14,17,5,10, 13, 7, 23, 18, 3, 14];

var myCanvas = d3.select("svg")
	.attr("width", w)
	.attr("height", h)
	.style("background-color", "lightblue")

var circle = myCanvas.selectAll("circle")
	.data(dogData)
	.join("circle")
	.attr("cx", function(d, i){
		return 50 + (i%5) * 100;
	})
	.attr("cy", function(d,i){
		return 40 + (i/5 - ((i%5)/10)*2) * 70;
	})
	.attr("r", function(d){
		return d;
	})
	.attr("fill", "black");
