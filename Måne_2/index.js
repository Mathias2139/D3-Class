var h = 720
var w = 1080
var rad = 90
var backColor = "black"

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

wheelBack = svg.append("g")
wheelBack.append("svg:image")
	.attr("xlink:href", "Back.png")

	
var moonCanvas = svg.append("g")
	.attr("class", "moonCanvas")

gearsBack = svg.append("g")
gearsBack.append("svg:image")
	.attr("xlink:href", "GearsBack.png")

mask.append("rect")
	.attr("fill", "white")
	.attr("x",0)
	.attr("y",0)
	.attr("height",300)
	.attr("width",800)
mask.append("rect")
	.attr("fill", "white")
	.attr("x",0)
	.attr("y",0)
	.attr("height",250)
	.attr("width",300)
	.attr("transform","translate(0,-130) rotate(-60)")

gearsParent = svg.append("g")
gearsParent.append("rect")
	.attr("x",620)
	.attr("y",400)
	.attr("height",350)
	.attr("width",8)
	//.attr("mask", "url(#gearMask)")
gearsParent.append("rect")
	.attr("x",640)
	.attr("y",400)
	.attr("height",350)
	.attr("width",12)
	//.attr("mask", "url(#gearMask)")
appendGear(700,275,"tandHjul3.png","medium",105)
appendGear(500,240,"stortTandHjul.png","huge",247)
appendGear(680,450,"lilleTandHjul2.png","small",50)
appendGear(730,420,"Tandhjul1.png","large",180)
appendGear(630,600,"lilleTandHjul1.png","small",60)
appendGear(425,420,"tandHjul2.png","medium",129)
gearsParent.append("rect")
	.attr("x",840)
	.attr("y",200)
	.attr("height",500)
	.attr("width",12)
	.attr("fill","grey")
	//.attr("mask", "url(#gearMask)")
gearsParent.append("rect")
	.attr("x",820)
	.attr("y",550)
	.attr("height",90)
	.attr("width",50)
	.attr("fill","rgb(229,175,0)")
	.attr("class","lever")
	//.attr("mask", "url(#gearMask)")

function appendGear(x,y,name,className,width){
	var temp = gearsParent.append("g")
	

	temp.append("svg:image")
	.attr("xlink:href", name)
			.attr("class",className)
		.attr("x",-width)
		.attr("y",-width)

	temp
	.attr("transform","translate("+(x+width)+","+(y+width)+")")

	
}

	

moonNameText = svg.append("g")


wheelTop = svg.append("g")
wheelTop.append("svg:image")
	.attr("xlink:href", "Clock.png")


oldMoonText = moonNameText.append("g")

var textCurve = 
[{x:422-547,y:375-323},
{x:547-547,y:323-323},
{x:667-547,y:375-323}]

var textPath = lineMaker(textCurve)
var phaseText = "New Moon"

oldMoonText.append("path")
	.attr("d", textPath)
	.attr("stroke","none")
	.attr("id","txCurve")
	.attr("fill","none")

oldMoonText.append("text")
	.append("textPath")
	.attr("xlink:href","#txCurve")
	.style("text-anchor","middle")
	.attr("startOffset", "50%")
	.style("font-size", "25px")
		.style("fill","white")

	.text(phaseText)

oldMoonText
	.attr("transform","translate(547,315)")



buttonsG = svg.append("g")

	buttonsG.append("rect")
		.attr("x",50)
		.attr("y",20)
		.attr("width", 55)
		.attr("height",60)
		.attr("fill", "white")
		.style("opacity",0.01)

		.on("click",function(){
			updateDay(1)
			updateDateDisplay()

		})
	buttonsG.append("rect")
		.attr("x",130)
		.attr("y",20)
		.attr("width", 55)
		.attr("height",60)
		.attr("fill", "white")
		.style("opacity",0.01)

		.on("click",function(){
			updateMonth(1)
			updateDateDisplay()

		})
	buttonsG.append("rect")
		.attr("x",210)
		.attr("y",20)
		.attr("width", 90)
		.attr("height",60)
		.attr("fill", "white")
		.style("opacity",0.01)

		.on("click",function(){
			updateYear(1)
			updateDateDisplay()

		})



	var dayDisplay = buttonsG.append("text")
		.attr("x",67)
		.attr("y",120)
		.style('fill', 'white')
		.text(function(){
			if(inputDay < 10){
				return "0"+inputDay
			}
			else{
				return ""+inputDay
			}
			})
	var monthDisplay = buttonsG.append("text")
		.attr("x",150)
		.attr("y",120)
		.style('fill', 'white')
		.text(function(){
			if(inputMonth < 10){
				return "0"+inputMonth
			}
			else{
				return ""+inputMonth
			}
			})
	var yearDisplay = buttonsG.append("text")
		.attr("x",240)
		.attr("y",120)
		.style('fill', 'white')
		.text(function(){
			return inputYear
			})

	updateDateDisplay()



	buttonsG.append("rect")
		.attr("x",50)
		.attr("y",150)
		.attr("width", 55)
		.attr("height",60)
		.attr("fill", "white")
		.style("opacity",0.01)

		.on("click",function(){
			updateDay(-1)
			updateDateDisplay()

		})
	buttonsG.append("rect")
		.attr("x",130)
		.attr("y",150)
		.attr("width", 55)
		.attr("height",60)
		.attr("fill", "white")
		.style("opacity",0.01)

		.on("click",function(){
			updateMonth(-1)
			updateDateDisplay()

		})
	buttonsG.append("rect")
		.attr("x",210)
		.attr("y",150)
		.attr("width", 90)
		.attr("height",60)
		.attr("fill", "white")
		.style("opacity",0.01)
		.on("click",function(){
			updateYear(-1)
			updateDateDisplay()

		})



	buttonsG.append("rect")
		.attr("x",50)
		.attr("y",220)
		.attr("width", 250)
		.attr("height",50)
		.attr("fill", "white")
		.style("opacity",0.01)

		.on("click",function(){
			createOutputDate()
			rotateGears()

		})

	buttonsG
	.attr("transform", "translate(60,405)")



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
	newText(phaseText)
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
		
	
	if(days == 0 || days-30 == 0 || Math.round(percentage)== 0){
		var thisTime = new Date(timeDelta).getTime()
		percentage = 0
		}

	if(days == 16 || days-30 == 15 || Math.round(percentage)== 100){
		var thisTime = new Date(timeDelta).getTime()
		percentage = 100
		}


	console.log("Moon is " + percentage + "% full")

	GenerateCircleCoordinates(percentage)

	determineMoonName(percentage)

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

function determineMoonName(p){
	console.log(p)
	if(p == 0){
		phaseText = "New Moon"
	}
	if(p>0){
		phaseText = "Waxing Cresent"
	}
	if(p>49){
		phaseText = "First Quater"
	}
	if(p>51){
		phaseText = "Waxing Gibbous"
	}
	if(p == 100){
		phaseText = "Full Moon"
	}
	if(p>100){
		phaseText = "Waning Gibbous"
	}
	if(p>149){
		phaseText = "Third Quater"
	}
	if(p>151){
		phaseText = "Waning Cresent"
	}
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

	oldMoon = moonCanvas.append("g")
		.attr("class", "oldMoon")
	//Create Mask
	var defs = oldMoon
	     .append("defs");
	var mask = defs
	     .append("mask")
	     .attr("id", "myMask")

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
		.attr("d", newPathData)
		.attr("stroke", "none")
		.attr("fill", "white")
		.attr("mask","url(#myMask)")

	oldMoon
		.attr("transform", "translate("+(w/2)+","+(h/2 - 225)+")")
}

function newText(text){


newMoonText = moonNameText.append("g")

newMoonText.append("path")
	.attr("d", textPath)
	.attr("stroke","none")
	.attr("id","txCurve")
	.attr("fill","none")

newMoonText.append("text")
	.append("textPath")
	.attr("xlink:href","#txCurve")
	.style("text-anchor","middle")
	.attr("startOffset", "50%")
	.style("font-size", "25px")
	.style("fill","white")
	.text(text)

newMoonText
	.attr("transform", "translate(0,-7) rotate(55, 0,200)")
	.transition()
	.duration(1500)
	.attrTween('transform', function() {
   	return interpolateSVGSegmentText(548, 545, 230, 330, 270);
 	})

 oldMoonText
.transition()
	.duration(1500)
	.attrTween('transform', function() {
   	return interpolateSVGSegmentText(548, 545, 230, 270, 210);
 	})

 oldMoonText = newMoonText

}

var gearRotation = 0
var leverState = false

function rotateGears(){
	gearRotation += 50
	leverState = !leverState

	if(leverState == true){
		d3.select(".lever")
			.transition()
			.ease(d3.easePolyIn.exponent(4))
			.duration(1300)
			.attr("y",300)
	}
	else{
		d3.select(".lever")
			.transition()
			.ease(d3.easePolyIn.exponent(4))
			.duration(1300)
			.attr("y",550)
	}

	RotateGearGroup(".medium",1)
	RotateGearGroup(".large",0.5)
	RotateGearGroup(".huge",0.45)
	RotateGearGroup(".small",-2)
}

function RotateGearGroup(group,magnitude){
	d3.selectAll(group)
		.transition()
		.ease(CustomEase)
		.duration(1500)
		.attr("transform","rotate("+(gearRotation*magnitude)+")")
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

function generateSVGSegmentText(x, y, r, startAngle, endAngle) {

 // convert angles to Radians
 startAngle *= (Math.PI / 180);
 endAngle *= (Math.PI / 180);


 var startA = startAngle 
 var endA = endAngle 

 var xPos =x + r * Math.cos(endA)
 var yPos =y+ r * Math.sin(endA)
//console.log(endA*(10*Math.PI))
 return "translate("+xPos+","+yPos+"), rotate("+(94 + endA*(18*Math.PI))+")";
}

// our custom interpolator, which returns an interpolator function
// which when called with a time (0-1), generates a segment sized according to time
function interpolateSVGSegmentText(x, y, r, startAngle, endAngle) {
 return function(t) {
   return generateSVGSegmentText(x, y, r, startAngle, startAngle + ((endAngle - startAngle) * t));
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



