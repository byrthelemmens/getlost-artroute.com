
// elements
var graphWrapperElement = document.getElementById('graph-wrapper');
var graphElement = document.getElementById('graph');
var wrapElement = document.getElementById('wrap');
var programElement = document.getElementById('program');
var canvasWidth, canvasHeight, scale;

// draw
var context = graphElement.getContext('2d');

// data
var minValue = 350, maxValue = 550;

setCanvasDimensions();

var url = 'data/aex.json'; 
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
	}, 500);
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
	} else {
		wrapElement.setAttribute('style', 'padding-top: ' + canvasHeight + 'px;');
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

		// text AEX value
		context.font = '14px Helvetica';
		context.fillText('AEX', 15, 30);
		context.font = 'bold 18px Helvetica';
		context.fillText(values.aex[values.aex.length - 1].value.toFixed(2), 15, 50);

		context.restore();
	}
	img.src = '../img/img_graph01.png';

}

function drawLines (data) {

	var length = data.aex.length;
	var width = Math.ceil(canvasWidth / length);
	var x = 0;
	
	// draw 
	data.aex.forEach(function (row) {
		var value = row.value;
		var height;
		if (new Date(row.date) > new Date('06-22-2015')) {
			value = undefined;
		}
		if (value) {
			drawLine(x, getHeight(value));
		} else {
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
