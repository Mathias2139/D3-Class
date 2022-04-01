var height = 2000
var width = 500

var walkData =[
		{
			"time": "18:34",
			"steps": 6100,
			"coldness": 3
		},
		{
			"time": "18:41",
			"steps": 6700,
			"coldness": 5
		},
		{
			"time": "18:44",
			"steps": 7050,
			"coldness": 6.5
		},
		{
			"time": "18:49",
			"steps": 7550,
			"coldness": 5
		},
		{
			"time": "18:52",
			"steps": 7925,
			"coldness": 4
		},
		{
			"time": "18:56",
			"steps": 8410,
			"coldness": 3.5
		},
		{
			"time": "19:00",
			"steps": 8750,
			"coldness": 4
		},
		{
			"time": "19:03",
			"steps": 9000,
			"coldness": 4.5
		}
	]

var stepPositionArr = []

var svg = d3.selectAll("svg")
	.attr("width",width)
	.attr("height",height)
	.style("background-color", "rgb(50,50,50)")

svg.append("svg:image")
	.attr("xlink:href", "img3.png")
	.attr("width", 180)
	.attr("x", 65)
	.attr("y",150)

svg.append("svg:image")
	.attr("xlink:href", "img2.png")
	.attr("width", 180)
	.attr("x", 65)
	.attr("y",60)

svg.append("svg:image")
	.attr("xlink:href", "img.png")
	.attr("width", 70)
	.attr("x", 114)
	.attr("y",111)

colorScale = d3.scaleSequential()
    .domain([-69,-39])
    .interpolator(d3.interpolate("green", "black"));

var outputArr = []
var amountOfPoints = 302
var distFromCentre = 70
var centreX = 150
var centreY = 150

	var pointSpacing = 1/amountOfPoints

for (var j = 1; j < 7; j++) {

	for (var i = 0; i < amountOfPoints; i++) {


		var angle = 2 * Math.PI * pointSpacing * i
		var wave = Math.sin(i/3 + j*2.7)*3.5/(j/1)

		var x = centreX + (j*5 - distFromCentre + wave) * Math.cos(angle)
		var y = centreY + (j*5 - distFromCentre + wave) * Math.sin(angle)

		var newColor = colorScale((j*5 - distFromCentre + wave))

		console.log((j*5 - distFromCentre + wave))
		outputArr.push({"x":x,"y":y, "color": newColor})
	}
}

	



svg.selectAll("circle")
	.data(outputArr)
	.join("circle")
	.attr("r",2)
	.attr("cx", function(d){
		return d.x
	})
	.attr("cy",function(d){
		return d.y
	})
	.attr("fill",function(d){
		return d.color
	})





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
