(function () {

	// elements
	var graphWrapperElement = document.getElementById('graph-wrapper');
	var graphElement = document.getElementById('graph');
	var programElement = document.getElementById('program');
	var canvasWidth, canvasHeight, scale;

	// draw
	var context = graphElement.getContext('2d');

	// data
	var minValue = 350, maxValue = 900;

	setCanvasDimensions();

	var url = 'data/aex_generated.json'; 
	var values;

	$.getJSON(url, function (data) {
		values = data;
		draw(values);
	});

	window.addEventListener('resize', resizeHandler);

	var timeout;
	function resizeHandler (event) {
		if (timeout) {
			window.clearTimeout(timeout);
		}
		timeout = window.setTimeout(function () {
			setCanvasDimensions();
		}, 200);
	}

	function setCanvasDimensions () {
		var height = Math.round((graphWrapperElement.offsetWidth / 1920) * 550) + 'px';
		graphWrapperElement.setAttribute('style', 'height: ' + height + ';');
		canvasWidth = graphElement.width = graphWrapperElement.offsetWidth;
		canvasHeight = graphElement.height = graphWrapperElement.offsetHeight;
		setWrapPaddingTop();
		scale = canvasHeight / (maxValue - minValue);
		if (values) {
			draw(values);
		}
	}

	function setWrapPaddingTop() {
		var styleAttribute = graphWrapperElement.getAttribute('style') + ' position:fixed;';
		graphWrapperElement.setAttribute('style', styleAttribute);
		if (programElement) {
			programElement.style.height = canvasHeight + 'px';
		}
	}

	function draw (values) {

		// graph
		context.save();
		context.beginPath();
		context.moveTo(0, 0);
		drawLines(values);
		context.lineTo(canvasWidth, 0);
		context.closePath();
		context.fill();
		context.clip();

		// image
		var img = new Image();
		img.onload = function () {

		    context.drawImage(img, 0, 0, canvasWidth, canvasHeight);

		    var lastDay;
			values.aex.forEach(function (day) {
				if (day.value) {
					lastDay = day;
				}
			});

			// text AEX value
			context.font = '14px Helvetica';
			context.fillText('AEX', 15, 24);
			context.font = '10px Helvetica';
			context.fillText(displayDate(lastDay.date), 15, 40);
			var day = (new Date()).getDay();
			// weekend
			if (day === 0 || day === 6) {
				context.font = '10px Helvetica';
				context.fillText('closed', 15, 55);
			} 
			// week day 
			else {
				context.font = '10px Helvetica';
				context.fillText('opening:', 15, 55);
				context.font = '14px Helvetica';
				context.fillText(parseFloat(lastDay.value, 10).toFixed(2), 15, 75);
			}
			context.restore();
		}
		img.src = '../img/img_graph04.png';
	}

	function drawLines (data) {

		var length = data.aex.length;
		var width;
		if (document.querySelector('.program-bar')) {
			width = parseFloat(window.getComputedStyle(document.querySelector('.program-bar')).width);
		} else {
			width = Math.ceil(canvasWidth / length);
		}
		var x = 0;
		
		// get last date
		var lastDate;
		data.aex.forEach(function (row) {
			if (row.value) {
				lastDate = row.date;
			}
		});

		// draw 
		data.aex.forEach(function (row) {
			var value = row.value;
			var height;

			if (value) {
				drawLine(x, getHeight(value));
			} else if (new Date(row.date) > new Date(lastDate)) {
				drawLine(x - width, getHeight(maxValue));
				drawLine(x, getHeight(maxValue));
			}
			x += width;
		});
	}

	function drawLine (x, height) {
		context.lineTo(x, height);
	}

	function getHeight (value) {
		return (maxValue - value) * scale;
	}
}());
