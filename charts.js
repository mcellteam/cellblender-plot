var ypts = new Array();
for (var i = 0; i <= 1000; i++) ypts.push(i * i);

$(function () { 
	$('#container').highcharts({
		chart: {
			type: 'line',
			zoomType: 'xy'
		},

		credits: {
			enabled: false
		},
	
		title: {
			text: 'Position vs. Time'
		},
		
		xAxis: {
			title: {
				text: 'Time (ms)'
			}
		},
			
		yAxis: {
			title: {
				text: 'Number of Molecules'
			}
		},

		series: [{
			id: 'Molecule',
			name: 'Molecule',
			data: ypts
		}]
	});

	var chart = $('#container').highcharts();
	var series = chart.series[0];

	var buttons = $('#select-buttons');

	$('#change-title').click(function() {
		var prevContent = $('.select').detach();

		// Enter new settings
		var submitName = "Change title to <input type = 'text' id = 'enter-title'>";
		var submitColor = "Change color to <input type = 'color' id = 'enter-color'>";
		var submitButton = "<button id = 'submit-title'>Submit</button>";
		buttons.prepend(submitName + '<br/>' + submitColor + '<br/>' + submitButton);

		// make changes
		$('#submit-title').click(function() {
			var newTitle = $('#enter-title').val();	
			if (newTitle != "")
				chart.setTitle({ text: newTitle });

			var newColor = $('#enter-color').val();
			if (newColor != "")
				chart.setTitle({ style: { color: newColor }});

			buttons.empty();
			buttons.prepend(prevContent);
		});
	});

	$('#change-background').click(function() {
		var prevContent = $('.select').detach();
		var submitColor = "Change background color to <input type = 'color' id = 'enter-color'>";
		var submitButton = "<button id = 'submit-color'>Submit</button>";
		buttons.prepend(submitColor + '<br/>' + submitButton);

		$('#submit-color').click(function() {
			var newColor = $('#enter-color').val();
			if (newColor != "") {
				chart.chartBackground.css({ color: newColor });
			}

			buttons.empty();
			buttons.prepend(prevContent);
		});
	});

	$('#change-axes').click(function() {
		var prevContent = $('.select').detach();
		var submitNameX = "Change x-axis title to <input type = 'text' id = 'enter-x'>";
		var submitNameY = "Change y-axis title to <input type = 'text' id = 'enter-y'>";
		var submitColorX = "Change x-axis color to <input type = 'color' id = 'enter-x-color'>";
		var submitColorY = "Change y-axis color to <input type = 'color' id = 'enter-y-color'>";
		var submitButton = "<button id = 'submit-axes'>Submit</button>";
		buttons.prepend(submitNameX + submitNameY + '<br/>' + submitColorX + submitColorY + '<br/>' + submitButton);
		$('#submit-axes').click(function() {
			var xlabel = $('#enter-x').val();
			var ylabel = $('#enter-y').val();
			var xcolor = $('#enter-x-color').val();
			var ycolor = $('#enter-y-color').val();

			if (xlabel != "") chart.xAxis[0].setTitle({ text: xlabel });
			if (ylabel != "") chart.yAxis[0].setTitle({ text: ylabel });
			if (xcolor != "") chart.xAxis[0].setTitle({ style: { color: xcolor }});
			if (ycolor != "") chart.yAxis[0].setTitle({ style: { color: ycolor }});

			buttons.empty();
			buttons.prepend(prevContent);
		});
	});

	$('#change-lines').click(function() {
		var prevContent = $('.select').detach();
		var submitName = "Series name <input type = 'text' id = 'enter-series-name'>";
		var submitColor = "Change line color to <input type = 'color' id = 'enter-line-color'>";
		var submitWidth = "Change thickness to <select name = 'line-width' id = 'enter-thickness'>" +
		"<option value = 'thin'>Thin</option>" +
		"<option value = 'norm'>Normal</option>" +
		"<option value = 'thick'>Thick</option>";
		var submitButton = "<input id = 'submit-lines' type = 'submit'></input>";
		buttons.prepend(submitName + '<br/>' + submitColor + '<br/>' + submitWidth + '<br></br>' + submitButton);
		$('#submit-lines').click(function() {
			var curName = $('#enter-series-name').val();
			var newColor = $('#enter-line-color').val();
			var thickness = $('#enter-thickness').val();
			var series = chart.get(curName);

			if (series == null) {
				alert("Please enter a valid series name.");
			} else {
				if (newColor != "") {
					series.update({ color: newColor });
				}
			
				function toWidth(thicknessOption) {
					if (thicknessOption == "thin") return 2;
					else if (thicknessOption == "normal") return 5;
					return 10;
				}

				series.update({ lineWidth: toWidth(thickness) });
			}

			buttons.empty();
			buttons.prepend(prevContent);
		});
	});

	$('#add-series').click(function() {
		var prevContent = $('.select').detach();
		var submitName = "Enter series name <input type = 'text' id = 'enter-sname'>"
		var submitSeries = "Enter data separated by commas <input type = 'text' id = 'enter-series'> <br/> <button id = 'submit-series'>Submit</button>"
		buttons.prepend(submitName + "<br/>" + submitSeries);

		$('#submit-series').click(function() {
			var newName = $('#enter-sname').val();
			var dataStr = $('#enter-series').val();
			var newSeries = parseData(dataStr);
		
			/* validate newSeries */			
			/* ***** */

			if (newSeries.length > 0) {
				chart.addSeries({
					data: newSeries,
					id: newName,
					name: newName
				});
			} else {
				alert("Invalid series");
			}
			
			buttons.empty();
			buttons.prepend(prevContent);
		});
	});
});

/* aux functions */
function parseData(str) {
	var strArr = str.split(',');
	var series = new Array();	
	for (var i = 0; i < strArr.length; i++) {
		var next = parseInt(strArr[i]);
		//if (next == NaN) return [];
		series.push(next);
	}
	return series;
}
