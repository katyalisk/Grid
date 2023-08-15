am4core.useTheme(am4themes_microchart);

const svgCheck = (id, chart, svgFlag) => {
	if (svgFlag) {
		chart.events.on("ready", function() {
		let target = chart.chartAndLegendContainer;
		let svgString = chart.exporting.normalizeSVG(
		  chart.exporting.serializeElement(target.dom),
		  {},
		  target.pixelWidth,
		  target.pixelHeight
		);
		chart.dispose();
		
		document.getElementById(id).innerHTML += svgString;
		document.getElementById(id).setAttribute("style", "pointer-events: none;");
		});
	}
};

const drawLine = (id, svgFlag) => {
	let chart = am4core.create(id, am4charts.XYChart);
	chart.padding(0, 0, 0, 0);

	chart.data = [ {
			"date": new Date(2018, 0, 1, 8, 0, 0),
			"value": 57
		}, {
			"date": new Date(2018, 0, 1, 9, 0, 0),
			"value": 27
		}, {
			"date": new Date(2018, 0, 1, 10, 0, 0),
			"value": 24
		}, {
			"date": new Date(2018, 0, 1, 11, 0, 0),
			"value": 59
		}, {
			"date": new Date(2018, 0, 1, 12, 0, 0),
			"value": 33
		}, {
			"date": new Date(2018, 0, 1, 13, 0, 0),
			"value": 46
		}, {
			"date": new Date(2018, 0, 1, 14, 0, 0),
			"value": 20
		}, {
			"date": new Date(2018, 0, 1, 15, 0, 0),
			"value": 42
		}, {
			"date": new Date(2018, 0, 1, 16, 0, 0),
			"value": 59,
		"opacity": 1
		}
	];

	let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

	let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

	let series = chart.series.push(new am4charts.LineSeries());
	series.dataFields.dateX = "date";
	series.dataFields.valueY = "value";
	series.tensionX = 0.8;
	series.strokeWidth = 2;

	let bullet = series.bullets.push(new am4charts.CircleBullet());
	bullet.circle.opacity = 0;
	bullet.circle.propertyFields.opacity = "opacity";
	bullet.circle.radius = 2;
	
	svgCheck(id, chart, svgFlag);
};

const drawColumn = (id, svgFlag) => {
	let chart = am4core.create(id, am4charts.XYChart);
	chart.padding(0, 10, 0, 10);

	chart.data = [ {
			"date": new Date(2018, 0, 1, 8, 0, 0),
			"value": 57
		}, {
			"date": new Date(2018, 0, 1, 9, 0, 0),
			"value": 27
		}, {
			"date": new Date(2018, 0, 1, 10, 0, 0),
			"value": 24
		}, {
			"date": new Date(2018, 0, 1, 11, 0, 0),
			"value": 59
		}, {
			"date": new Date(2018, 0, 1, 12, 0, 0),
			"value": 33
		}, {
			"date": new Date(2018, 0, 1, 13, 0, 0),
			"value": 46
		}, {
			"date": new Date(2018, 0, 1, 14, 0, 0),
			"value": 20
		}, {
			"date": new Date(2018, 0, 1, 15, 0, 0),
			"value": 42
		}, {
			"date": new Date(2018, 0, 1, 16, 0, 0),
			"value": 59,
		"opacity": 1
		}
	];
	
	let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

	let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

	let series = chart.series.push(new am4charts.ColumnSeries());
	series.dataFields.dateX = "date";
	series.dataFields.valueY = "value";
	
	svgCheck(id, chart, svgFlag);
};

const drawPie = (id, svgFlag) => {
	let chart = am4core.create(id, am4charts.PieChart);
	chart.chartContainer.minHeight = 20;
	chart.chartContainer.minWidth = 20;

	chart.data = [{
	  "country": "Lithuania",
	  "litres": 501.9
	}, {
	  "country": "Czech Republic",
	  "litres": 301.9
	}, {
	  "country": "Ireland",
	  "litres": 201.1
	}, {
	  "country": "Germany",
	  "litres": 165.8
	}];

	let pieSeries = chart.series.push(new am4charts.PieSeries());
	pieSeries.dataFields.value = "litres";
	pieSeries.dataFields.category = "country";
	
	let hs = pieSeries.slices.template.states.getKey("hover");
	hs.properties.scale = 1;

	let as = pieSeries.slices.template.states.getKey("active");
	as.properties.shiftRadius = 0;
	
	svgCheck(id, chart, svgFlag);
};

const setTableData = (companyID, companyName) => {
	const gridTable = document.getElementById('gridTable');
	const svgFlag = false;
	
	const id  = document.createElement('div');
	id.className = 'companyID';
	id.textContent = companyID;
	gridTable.appendChild(id);

	const name = document.createElement('div');
	name.className = 'companyName';
	name.textContent = companyName;
	gridTable.appendChild(name);
	
	const lineChart = document.createElement('div');
	lineChart.id = `lineChart${companyID}`;
	lineChart.style.cssText = 'grid-column: 3 / 4;';
	gridTable.appendChild(lineChart);
	drawLine(lineChart.id, svgFlag);
	
	const columnChart = document.createElement('div');
	columnChart.id = `columnChart${companyID}`;
	columnChart.style.cssText = 'grid-column: 4 / 5;';
	gridTable.appendChild(columnChart);
	drawColumn(columnChart.id, svgFlag);
	
	const pieChart = document.createElement('div');
	pieChart.id = `pieChart${companyID}`;
	pieChart.style.cssText = 'grid-column: 5 / 6;';
	gridTable.appendChild(pieChart);
	drawPie(pieChart.id, svgFlag);
};

setTableData(1, "Zilencio");
setTableData(2, "Nikuda");
setTableData(3, "Yurture");

drawLine("textLine", false);
drawColumn("textColumn", false);
drawPie("textPie", false);

const setComparedData = (svgFlag) => {
	const grid = document.getElementById('gridComparison');
	
	const lineChart = document.createElement('div');
	lineChart.id = `lChart${svgFlag}`;
	lineChart.style.cssText = 'grid-column: 2 / 3;';
	grid.appendChild(lineChart);
	drawLine(lineChart.id, svgFlag);
	
	const columnChart = document.createElement('div');
	columnChart.id = `cChart${svgFlag}`;
	columnChart.style.cssText = 'grid-column: 3 / 4;';
	grid.appendChild(columnChart);
	drawColumn(columnChart.id, svgFlag);
	
	const pieChart = document.createElement('div');
	pieChart.id = `pChart${svgFlag}`;
	pieChart.style.cssText = 'grid-column: 4 / 5;';
	grid.appendChild(pieChart);
	drawPie(pieChart.id, svgFlag);
};
setComparedData(false);
setComparedData(true);