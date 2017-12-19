// THE EXPENSE CATEGORY CHART

var dataset = [
	{ name: 'Payroll', percent: 33 },
	{ name: 'Overtime', percent: 5 },
	{ name: 'Health & Welfare', percent: 13 },
	{ name: 'Pension', percent: 8 },
	{ name: 'Other labor', percent: 3 },
	{ name: 'Non-labor', percent: 22 },
	{ name: 'Debt service', percent: 16 }
];

var pie=d3.layout.pie()
		.value(function(d){return d.percent})
		.sort(null)
		pie.padAngle(.03);

var w=500,h=500;

var outerRadius=w/2;
var innerRadius=150;

// green, blue, yellow, orange, red, purple, pink, another blue
var colors = ['#69c242', '#64bbe3', '#ffcc00', '#ff7300', '#cf2030', '#971497', '#DB4777', '#3668c9'];

// Do not include a domain
var color = d3.scale.ordinal()
.range(colors);

var arc=d3.svg.arc()
		.outerRadius(outerRadius)
		.innerRadius(innerRadius);

var svg=d3.select("#category-chart")
		.append("svg")
		.attr({
			width:w,
			height:h,
			class:'shadow'
		}).append('g')
		.attr({
			transform:'translate('+w/2+','+h/2+')'
		});
var path=svg.selectAll('path')
		.data(pie(dataset))
		.enter()
		.append('path')
		.attr({
			d:arc,
			fill:function(d,i){
				return color(d.data.name);
			}
		});

path.transition()
		.duration(1000)
		.attrTween('d', function(d) {
			var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
			return function(t) {
				return arc(interpolate(t));
			};
		});


var restOfTheData=function(){
	var text=svg.selectAll('text')
			.data(pie(dataset))
			.enter()
			.append("text")
			.transition()
			.duration(200)
			.attr("transform", function (d) {
				return "translate(" + arc.centroid(d) + ")";
			})
			.attr("dy", ".4em")
			.attr("text-anchor", "middle")
			.text(function(d){
				return d.data.percent+"%";
			})
			.style({
				fill:'#fff',
				'font-size':'25px'
			});

	var legendRectSize=20;
	var legendSpacing=7;
	var legendHeight=legendRectSize+legendSpacing;


	var legend=svg.selectAll('.legend')
			.data(color.domain())
			.enter()
			.append('g')
			.attr({
				class:'legend',
				transform:function(d,i){
					//Just a calculation for x & y position
					return 'translate(-55,' + ((i*legendHeight)-85) + ')';
				}
			});
	legend.append('rect')
			.attr({
				width:legendRectSize,
				height:legendRectSize,
				rx:20,
				ry:20
			})
			.style({
				fill:color,
				stroke:color
			});

	legend.append('text')
			.attr({
				x:30,
				y:15
			})
			.text(function(d){
				return d;
			}).style({
				fill:'#000000',
				'font-size':'15px'
			});
};

setTimeout(restOfTheData,1000);


// THE MTA AGENCY CHART

var dataset = [
	{ name: 'NYCT/SIR', percent: 54 },
	{ name: 'LIRR', percent: 10 },
	{ name: 'MNR', percent: 8 },
	{ name: 'MTABC', percent: 4 },
	{ name: 'HQ/FMTAC', percent: 4 },
	{ name: 'B&T', percent: 3 },
	{ name: 'Debt service', percent: 16 },
	{ name: 'General Reserve', percent: 1}
];

var pie=d3.layout.pie()
		.value(function(d){return d.percent})
		.sort(null)
		pie.padAngle(.03);

var w=500,h=500;

var outerRadius=w/2;
var innerRadius=150;

// green, blue, yellow, orange, red, purple, pink, another blue
var colors = ['#69c242', '#64bbe3', '#ffcc00', '#ff7300', '#cf2030', '#971497', '#DB4777', '#3668c9'];

var color = d3.scale.ordinal()
.range(colors);

var arc=d3.svg.arc()
		.outerRadius(outerRadius)
		.innerRadius(innerRadius);

var svg=d3.select("#agency-chart")
		.append("svg")
		.attr({
			width:w,
			height:h,
			class:'shadow'
		}).append('g')
		.attr({
			transform:'translate('+w/2+','+h/2+')'
		});
var path=svg.selectAll('path')
		.data(pie(dataset))
		.enter()
		.append('path')
		.attr({
			d:arc,
			fill:function(d,i){
				return color(d.data.name);
			}
		});

path.transition()
		.duration(1000)
		.attrTween('d', function(d) {
			var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
			return function(t) {
				return arc(interpolate(t));
			};
		});


var restOfTheData=function(){
	var text=svg.selectAll('text')
			.data(pie(dataset))
			.enter()
			.append("text")
			.transition()
			.duration(200)
			.attr("transform", function (d) {
				return "translate(" + arc.centroid(d) + ")";
			})
			.attr("dy", ".4em")
			.attr("text-anchor", "middle")
			.text(function(d){
				return d.data.percent+"%";
			})
			.style({
				fill:'#fff',
				'font-size':'25px'
			});

	var legendRectSize=20;
	var legendSpacing=7;
	var legendHeight=legendRectSize+legendSpacing;


	var legend=svg.selectAll('.legend')
			.data(color.domain())
			.enter()
			.append('g')
			.attr({
				class:'legend',
				transform:function(d,i){
					//Just a calculation for x & y position
					return 'translate(-75,' + ((i*legendHeight)-100) + ')';
				}
			});
	legend.append('rect')
			.attr({
				width:legendRectSize,
				height:legendRectSize,
				rx:20,
				ry:20
			})
			.style({
				fill:color,
				stroke:color
			});

	legend.append('text')
			.attr({
				x:30,
				y:15
			})
			.text(function(d){
				return d;
			}).style({
				fill:'#000000',
				'font-size':'15px'
			});
};

setTimeout(restOfTheData,1000);