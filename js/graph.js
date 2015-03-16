
// elements
var graphBackgroundElement = document.getElementById('graph-background');
var graphElement = document.getElementById('graph');
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
	showBackground();
});

window.addEventListener('resize', setCanvasDimensions);

function setCanvasDimensions () {
	var height = Math.round((graphBackgroundElement.offsetWidth / 1920) * 550) + 'px';
	graphBackgroundElement.setAttribute('style', 'height: ' + height);
	canvasWidth = graphElement.width = graphBackgroundElement.offsetWidth;
	canvasHeight = graphElement.height = graphBackgroundElement.offsetHeight;
	scale = canvasHeight / (maxValue - minValue);
	if (values) {
		draw(values);
	}
}

function showBackground () {
	graphBackgroundElement.classList.remove('background-hidden');
}

function draw (data) {
	var length = data.aex.length;
	var width = Math.ceil(canvasWidth / length);
	var x = 0;
	// draw 
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
