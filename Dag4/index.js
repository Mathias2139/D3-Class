var height = 700
var width = 1500
var birthData = [
{Name: "Mathias", Date : 25, Month: 7, Year: 2000},
{Name: "Stine",Date: 18, Month: 10, Year: 1995},
{Name: "Jonas",Date: 4, Month: 10, Year: 1999}
];
//Where Age is the lenght of the hypotenuse, Month is the Opposite (vertical) and Day is the Adjacent (bottom)
var hypo; // b
var opp; // c
var adj; // a

var onePiece = []
onePiece.push(birthData[1])


var svg = d3.selectAll("svg")
	.attr("width",width)
	.attr("height",height)

var Adjacent = svg.selectAll(".adjLine")
	.data(birthData)
	.join("line")
	.attr("class", function(d){
		defineVariables(d)

		return d.Name;
	})
	.attr("x1", function(d,i){
		return 100+i*140;
	})
	.attr("y1", 200)

	.attr("x2", function(d,i){

		return 100+i*140 + d.Date;
	})
	.attr("y2", 200)

	.attr("stroke", "black");

var Hypotenuse = svg.selectAll(".hypLine")
	.data(birthData)
	.join("line")
	.attr("class", function(d){
		defineVariables(d)

		return d.Name;
	})
	.attr("x1", function(d,i){

		var a2 = pow(d.Date)
		var c2 = pow(d.Month)
		var b2 = pow(Math.abs((d.Year - 1990) - 31))
		var a = d.Date
		var c = d.Month

		var cosB = (a2 + c2 - b2)/(2*a*c)

		console.log(cosB)

		var B = Math.acos(cosB)

		console.log(B)

		var x = Math.abs((d.Year - 1990) - 31) * cosB


		return 100+i*140 + x;
	})
	.attr("y1", function(d){
		var a2 = pow(d.Date)
		var c2 = pow(d.Month)
		var b2 = pow(Math.abs((d.Year - 1990) - 31))
		var a = d.Date
		var c = d.Month

		var cosB = (a2 + c2 - b2)/(2*a*c)

		console.log(cosB)

		var B = Math.acos(cosB)

		console.log(B)


		var y = Math.abs((d.Year - 1990) - 31) * Math.sin(B)


		return 200 - y;
	})

	.attr("x2", function(d,i){

		return 100+i*140 + d.Date;
	})
	.attr("y2", 200)
	.attr("stroke", "black");


var Opposite = svg.selectAll(".oppLine")
	.data(birthData)
	.join("line")
	.attr("class", function(d){
		defineVariables(d)

		return d.Name;
	})
	.attr("x2", function(d,i){

		var a2 = pow(d.Date)
		var c2 = pow(d.Month)
		var b2 = pow(Math.abs((d.Year - 1990) - 31))
		var a = d.Date
		var c = d.Month

		var cosB = (a2 + c2 - b2)/(2*a*c)

		console.log(cosB)

		var B = Math.acos(cosB)

		console.log(B)

		var x = Math.abs((d.Year - 1990) - 31) * cosB


		return 100+i*140 + x;
	})
	.attr("y2", function(d){
		var a2 = pow(d.Date)
		var c2 = pow(d.Month)
		var b2 = pow(Math.abs((d.Year - 1990) - 31))
		var a = d.Date
		var c = d.Month

		var cosB = (a2 + c2 - b2)/(2*a*c)

		console.log(cosB)

		var B = Math.acos(cosB)

		console.log(B)


		var y = Math.abs((d.Year - 1990) - 31) * Math.sin(B)


		return 200 - y;
	})

	.attr("x1", function(d,i){

		return 100+i*140;
	})
	.attr("y1", 200)
	.attr("stroke", "black");
	

function defineVariables(d){
		
	hypo = Math.abs((d.Year - 1990) - 31);
		
	opp = d.Month;
		
	adj = d.Date;
		
}

function pow(a){
	return Math.pow(a,2)
}