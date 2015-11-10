(function () {

	// elements
	var graphWrapperElement = document.getElementById('graph-wrapper');
	var graphElement = document.getElementById('graph');
	var programElement = document.getElementById('program');
	var canvasWidth, canvasHeight, scale;

	// draw
	var context = graphElement.getContext('2d');

	// data
	var minValue = 406, maxValue = 670;

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
		var height = Math.round((window.innerWidth / 1920) * 550) + 'px';
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
		context.fillStyle = '#FFF';
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
			context.fillStyle = '#000';
			context.fillText('AEX', 15, 24);
			context.font = '10px Helvetica';
			var today = new Date();
			var day = today.getDay();
			context.fillText(displayDate(today), 15, 40);
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
		img.src = '../img/img_graph04.jpg';
	}

	function drawLines (data) {

		var length = data.aex.length;
		var width, last;
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
			var value = last = row.value;
			var height;

			if (value) {
				drawLine(x, getHeight(value));
			} else if (new Date(row.date) > new Date(lastDate)) {
				drawLine(x - width, getHeight(maxValue));
				drawLine(x, getHeight(maxValue));
			}
			x += width;
		});
		drawLine(x, getHeight(last));
	}

	function drawLine (x, height) {
		context.lineTo(x, height);
	}

	function getHeight (value) {
		return (maxValue - value) * scale;
	}
}());
