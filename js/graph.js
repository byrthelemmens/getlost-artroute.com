
// elements
var graphWrapperElement = document.getElementById('graph-wrapper');
var graphElement = document.getElementById('graph');
var wrapElement = document.getElementById('wrap');
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

window.addEventListener('resize', setCanvasDimensions);

function setCanvasDimensions () {
	var height = Math.round((graphWrapperElement.offsetWidth / 1920) * 550) + 'px';
	graphWrapperElement.setAttribute('style', 'height: ' + height);
	canvasWidth = graphElement.width = graphWrapperElement.offsetWidth;
	canvasHeight = graphElement.height = graphWrapperElement.offsetHeight;
	setWrapPaddingTop();
	scale = canvasHeight / (maxValue - minValue);
	if (values) {
		draw(values);
	}
}

function setWrapPaddingTop() {
	graphWrapperElement.setAttribute('style', 'position: fixed;');
	wrapElement.setAttribute('style', 'padding-top: ' + canvasHeight + 'px;');
}

function draw (values) {

	context.save();
	context.beginPath();
	context.moveTo(0, 0);
	drawLines(values);
	context.lineTo(canvasWidth, 0);
	context.closePath();
	context.fill();
	context.clip();

	var img = new Image();
	img.onload = function () {
	    context.drawImage(img, 0, 0);
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
		drawLine(x, getHeight(row.value));
		x += width;
	});
}

function drawLine (x, height) {
	context.lineTo(x, height);
}

function getHeight (value) {
	return (value - minValue) * scale;
}
