
// elements
var graphWrapperElement = document.getElementById('graph-wrapper');
var graphElement = document.getElementById('graph');
var canvasWidth = graphElement.width = graphWrapperElement.offsetWidth;
var canvasHeight = graphWrapperElement.offsetHeight;

// draw
var context = graphElement.getContext('2d');

// data
var minValue = 350, maxValue = 550;
var scale = canvasHeight / (maxValue - minValue);

$.getJSON('data/aex.json', function (data) {
	draw(data);
});

function draw (data) {
	var length = data.aex.length;
	var width = Math.ceil(canvasWidth / length);
	var x = 0;
	data.aex.forEach(function (row) {
		drawBar(x, getY(row.value), width, getHeight(row.value));
		x += width;
	});
}

function drawBar (x, y, width, height) {
	context.fillRect(x, y, width, height);
}

function getY (value) {
	return (maxValue - value) * scale;		
}

function getHeight (value) {
	return (value - minValue) * scale;
}
