var height = 700
var width = 1500
var birthData = [
{Date : 25, Month: 1, Year: 2000},
{Date: 18, Month: 10, Year: 1995},
{Date: 5, Month: 12, Year: 1997}
]

var arrData = []
var numPoints = 10

var days= 30
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


var svg = d3.selectAll("svg")
	.attr("width",width)
	.attr("height",height)


for (var i = 0 ; i < numPoints; i++) {


	var angle = 2 * Math.PI * 1/numPoints * i

	var x = 50 * Math.cos(angle)
	var y = 50 * Math.sin(angle)


	arrData.push({xValue: x, yValue: y})


}

var circles = svg.selectAll("circle")
	.data(birthData)
	.join("circle")
	.attr("fill", "black")
	.attr("cx",function(d){
		return 50 + d.Month * 100;
	})
	.attr("cy",function(d){
		return height - d.Date * 10;
	})
	.attr("r",function(d){
		return Math.abs((d.Year - 1990) - 31);
	});

svg.append("line")
	.attr("x1",25)
	.attr("y1",5)
	.attr("y2", height-25)
	.attr("x2",25)
 	.attr("stroke", "black")

	svg.append("line")
	.attr("x1",25)
	.attr("y1",height-25)
	.attr("y2", height-25)
	.attr("x2",width-25)
	.attr("stroke", "black")

	d3.select("#canvas").selectAll("text")
		.data(months)
		.join("text")
		.text(function(d){
			return d;
		})
		.attr("x", 50)
				.attr("y", 50)
		.style("border", "20px")

var square = svg.append("rect")
		.attr("x", 50)
		.attr("y", 50)
		.attr("width", 200)
		.attr("height",100)
		.attr("fill","none")

square.selectAll("p")
.data(months)
.join("p")
.text("hello")

