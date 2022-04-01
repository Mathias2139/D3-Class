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
	.style("background-color", "AliceBlue")


var blueMin = 0
var blueMax = d3.max(walkData, function(d){
	return walkData.coldness;
})

var blueScale = d3.scaleLinear()
					.domain([2, 6.5])
					.range([0, 255])

var footstepCount = 0

svg.append("text")
		.text(""+walkData[0].time+"")
		.attr("x",200)
		.attr("y",58)
		.style("border", "20px")

svg.append("line")
		.attr("stroke", "black")
		.attr("x1",  150- 20)
		.attr("x2", 190)
		.attr("y1", 54.5)
		.attr("y2", 54.5)

for (var i = 1; i < Object.keys(walkData).length; i++) {


	console.log((walkData[i].steps-walkData[i-1].steps)/100)
	

	for (var j = 0; j < (walkData[i].steps-walkData[i-1].steps)/100; j++) {
		svg.append("rect")
			.attr("fill", function(){

				var lastColor = walkData[i-1].coldness
				var nextColor = walkData[i].coldness
				var amountOfSteps = (walkData[i].steps-walkData[i-1].steps)/100
				var interpolatedColor = lastColor + ((nextColor-lastColor)/amountOfSteps) *j
				var invertedColor = 255 - blueScale(interpolatedColor)
				console.log(interpolatedColor)
				return "rgb("+invertedColor+", "+invertedColor+",255 )" 
			})
			.attr("x", 100 + (footstepCount%2)*20)
			.attr("y", footstepCount*50 + 50)
			.attr("width", 10)
			.attr("height", 15)

		stepPositionArr.push(footstepCount*50 + 50)


		footstepCount++
	}

	svg.append("text")
		.text(""+walkData[i].time+"")
		.attr("x",200)
		.attr("y",(footstepCount-1)*50 + 58)
		.style("border", "20px")

	svg.append("line")
		.attr("stroke", "black")
		.attr("x1",  150- (footstepCount%2)*20)
		.attr("x2", 190)
		.attr("y1", (footstepCount-1)*50 + 54.5)
		.attr("y2", (footstepCount-1)*50 + 54.5)

}

var maxY = d3.max(stepPositionArr)

var svg = d3.selectAll("svg")
	.attr("width",width)
	.attr("height",maxY + 50)
