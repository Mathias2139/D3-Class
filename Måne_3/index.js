var h = 720
var w = 1080
var rad = 90
var backColor = "white"

var firstNewMoon = new Date("01/02/2022");


var today = new Date()
	
var inputDay = today.getDate()
var inputMonth = today.getMonth() +1
var inputYear = today.getFullYear()

var stringDay = "02"
var stringMonth = "01"
var stringYear = "2022"

var outputDate

var daysInAMonth = [31,31,28,31,30,31,30,31,31,30,31,30,31]

var pointArr = []

var oldOldMoon

var moonYOffset = 275

var lineMaker = d3.line()
	.curve(d3.curveBundle.beta(1.1));

lineMaker
  .x(function(d) {
    return d.x;
  })
  .y(function(d) {
    return d.y;
  });



//testDays()

	var svg = d3.selectAll("svg")
		.attr("width",w)
		.attr("height",h)
		.style("background-color", backColor);

	var defs = svg
     .append("defs");
	var mask = defs
     .append("mask")
     .attr("id", "gearMask");



function updateDay(delta){
	inputDay = (inputDay + delta)

	var daysInThisMonth = daysInAMonth[inputMonth]
	if(inputYear%4 == 0 && inputMonth == 2){
		daysInThisMonth += 1
	}

	if(inputDay > daysInThisMonth){
		updateMonth(1)
		inputDay = 1
	}
	if(inputDay < 1){
		updateMonth(-1)
		daysInThisMonth = daysInAMonth[inputMonth]
		if(inputYear%4 == 0 && inputMonth == 2){
		daysInThisMonth += 1
		}
		inputDay = daysInThisMonth
	}
}

function updateMonth(delta){

	inputMonth = inputMonth + delta

	var daysInThisMonth = daysInAMonth[inputMonth]
	if(inputYear%4 == 0 && inputMonth == 2){
		daysInThisMonth += 1
	}

	if(inputMonth > 12){
		updateYear(1)
		inputMonth=1
	}
	if(inputMonth < 1){
		updateYear(-1)
		inputMonth=12
	}
	if(inputDay > daysInThisMonth){
		daysInThisMonth = daysInAMonth[inputMonth]
		if(inputYear%4 == 0 && inputMonth == 2){
		daysInThisMonth += 1
		}
		inputDay = daysInThisMonth
		
	}
}
function updateYear(delta){

	inputYear = inputYear + delta

	if((inputYear%4 == 3 || inputYear%4 == 1) && inputMonth == 2 && inputDay == 29){
		inputDay--
		updateDay(0)
	}
}


function updateDateDisplay(){

	dayDisplay

		.text(function(){
			if(inputDay < 10){
			stringDay = "0"+inputDay
			}
			else{
			stringDay = ""+inputDay
			}
			return stringDay
		})
	monthDisplay
		.text(function(){
			if(inputMonth < 10){
			stringMonth = "0"+inputMonth
			}
			else{
			stringMonth = ""+inputMonth
			}
			return stringMonth
		})
	yearDisplay
		.text(""+inputYear+"")
}

function createOutputDate(){
	outputDate = stringMonth +"/"+ stringDay +"/"+ inputYear
	var moonData = CreateMoon(difference(outputDate))
	appendNewMoon(moonData)
}

function difference(date){

// To calculate the time difference of two dates
var Difference_In_Time = new Date(date).getTime() - firstNewMoon.getTime();

// To calculate the no. of days between two dates
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  
 return Difference_In_Time;

}



var digitScale16 = d3.scaleLinear()
    .domain([0.1875, 0.9375])
    .range([0.0625, 0.9375])

var digitScale15 = d3.scaleLinear()
    .domain([1.054, 1.86])
    .range([1.0625, 1.93])


function CreateMoon(timeDelta){

	var dayDelta = timeDelta /(1000 * 3600 * 24)

	var days = Math.round(mod(dayDelta,59))

	var percentage
	
		if(days >= daysInAMonth[inputMonth]){
			var num = Math.abs(days%30)
			var digit = (num-15)/15 + 1
			console.log(digit)
			if(days>15){
				digit = digitScale15(digit)
			}
			percentage = Math.round(digit * 10000)/100 
		}
		else{
			var num = Math.abs(days)
			var digit = (num-16)/16 + 1
			console.log(digit)
			if(days>16){
				digit = digitScale16(digit)
			}
			percentage = Math.round(digit * 10000)/100 
		}
		
	
	if(days == 0 || days-30 == 0){
		var thisTime = new Date(timeDelta).getTime()
		percentage = 0
		}

	if(days == 16 || days-30 == 15){
		var thisTime = new Date(timeDelta).getTime()
		percentage = 100
		}


	console.log("Moon is " + percentage + "% full")

	GenerateCircleCoordinates(percentage)



	var pathData2 = lineMaker(pointArr)

	return pathData2
	

	/*
	path
		.transition()
		.duration(1000)
		.attr("d", pathData2)
		.attr("fill", "white")
	*/


	
}

function appendNewMoon(moonPath){

newMoon = moonCanvas.append("g")
	.attr("class", "newMoon")
//Create Mask
var defs = newMoon
     .append("defs");
var mask = defs
     .append("mask")
     .attr("id", "myMask")

//Create first moon
var newPathData = lineMaker(pointArr)

//Back black shadow circle
newMoon.append("circle")
	.attr("r", 104.8)
	.attr("cx", 175 -175)
	.attr("cy", 509.5 -500)

//mask for moon
mask.append("circle")
    .attr("cx", 175 -175)
    .attr("cy", 509.5 -500)
    .attr("r", 105)
    .style("fill", "white")
    .style("opacity", 1);    

//moon
var newPath = newMoon.append("path")
	.attr("d", newPathData)
	.attr("stroke", "none")
	.attr("fill", "white")
	.attr("mask","url(#myMask)")

newMoon
	.attr("transform", "translate("+(w/2 + 200)+","+h/2+") rotate(55, 0,220)")
	.transition()
	.duration(1500)
	.ease(CustomEase)
	.attrTween('transform', function() {
   	return interpolateSVGSegment(w/2, h/2+moonYOffset, 500, 320, 270);
 	})

	/*
	.transition()
	.duration(3000)
	.ease(d3.easeBackInOut.overshoot(1.11))
	.attr("transform", "translate("+(w/2)+","+h/2+")")
	.attr("class","oldMoon")
	*/


oldMoon
	.transition()
	.duration(1500)
	.ease(CustomEase)
	.attrTween('transform', function() {
   	return interpolateSVGSegment(w/2, h/2+moonYOffset, 500, 270, 220);
 	})

/*
	.transition()
	.duration(3000)
	.ease(d3.easeBackInOut.overshoot(1.11))
	.attr("transform", "translate("+(w/2 - 200)+","+h/2+")rotate(-55, 0,220)")
*/


	oldMoon = newMoon

}
	




//First starup moon
//createOutputDate()
var currentDate = stringMonth +"/"+ stringDay +"/"+ inputYear
var firstMoonData = CreateMoon(difference(currentDate))
appendFirstMoon(firstMoonData)

function appendFirstMoon(moonPath){

oldMoon = svg.append("g")
	.attr("class", "oldMoon")
//Create Mask
var defs = oldMoon
     .append("defs");
var mask = defs
     .append("mask")
     .attr("id", "myMask")

GenerateCircleCoordinates(50)

//Create first moon
var newPathData = lineMaker(pointArr)

//Back black shadow circle
oldMoon.append("circle")
	.attr("r", 104.8)
	.attr("cx", 175 -175)
	.attr("cy", 509.5 -500)

//mask for moon
mask.append("circle")
    .attr("cx", 175 -175)
    .attr("cy", 509.5 -500)
    .attr("r", 105)
    .style("fill", "white")
    .style("opacity", 1);    

//moon
var newPath = oldMoon.append("path")
	.attr("class","moonPath")
	.attr("d", newPathData)
	.attr("stroke", "none")
	.attr("fill", "white")
	.attr("mask","url(#myMask)")

oldMoon
	.attr("transform", "translate("+(w/2)+","+(h/2 - 225)+")")








}



async function rotateMoon1(){

GenerateCircleCoordinates(200)

var pathData2 = lineMaker(pointArr)

d3.select(".moonPath")
.transition()
.duration(2000)
.attr("d",pathData2)

await delay(2000)

rotateMoon2()

}


async function rotateMoon2(){

GenerateCircleCoordinates(200)

var pathData2 = lineMaker(pointArr)

d3.select(".moonPath")
.transition()
.duration(2000)
.attr("d",pathData2)
.end(function(){
	rotateMoon1()
})

}

function GenerateCircleCoordinates(perc){
	
		var yValue 

		var xValue

		var p = perc

		pointArr = []

		var yValues = [403,412,500,588,597];

//Left side forloop
	for (var i = 0; i < 5; i++) {

		if(perc > 100){
			p=100
		}


		yValue = yValues[i] -500

		if(i==0 || i==4){
			xValue = 175 -175
		}
		else if(i==1||i==3){
			xValue = 239 - (64*p*2/100) -175
		}
		else{
			xValue = 288 - (113*p*2/100) -175
		}

		pointArr.push({x: xValue, y: yValue})

	}
		p = perc
		p = p-100
//right side forloop
	for (var i = 4; i >= 0; i--) {

		console.log(p)
		if(perc < 100){
			p=0
		}


		yValue = yValues[i] -500

		if(i==0 || i==4){
			xValue = 175 -175
		}
		else if(i==1||i==3){
			xValue = 239 - (64*p*2/100) -175
		}
		else{
			xValue = 288 - (113*p*2/100) -175
		}


		
		pointArr.push({x: xValue, y: yValue})
	}

}

function mod(n, m) {
  return ((n % m) + m) % m;
}



function generateSVGSegment(x, y, r, startAngle, endAngle) {

 // convert angles to Radians
 startAngle *= (Math.PI / 180);
 endAngle *= (Math.PI / 180);

 var largeArc = endAngle - startAngle <= Math.PI ? 0 : 1; // 1 if angle > 180 degrees
 var sweepFlag = 1; // is arc to be drawn in +ve direction?
	
 var startA = startAngle 
 var endA = endAngle 

 var xPos =x + r * Math.cos(endA)
 var yPos =y+ r * Math.sin(endA)
//console.log(endA*(10*Math.PI))
 return "translate("+xPos+","+yPos+"), rotate("+(94 + endA*(18*Math.PI))+")";
}

// our custom interpolator, which returns an interpolator function
// which when called with a time (0-1), generates a segment sized according to time
function interpolateSVGSegment(x, y, r, startAngle, endAngle) {
 return function(t) {
   return generateSVGSegment(x, y, r, startAngle, startAngle + ((endAngle - startAngle) * t));
 };
}


var easeScale = d3.scaleLinear()
	.domain([0,1])
	.range([0,1.07])

function CustomEase(t) {
  var x = easeScale(t)
  var output = Math.sin(((Math.pow(x,1.9)-0.45)*2.8))/1.9 +0.5
  return output;
}



