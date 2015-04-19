(function () {

	// elements
	var programElement = document.getElementById('program');
	var monthsElement = document.getElementById('program-months');
	var eventDataElement = document.getElementById('program-event-data');

	var url = 'data/aex_generated.json'; 
	var json;
	$.getJSON(url, function (data) {
		json = data;
		initProgram();
	});

	window.addEventListener('resize', resizeHandler);

	var timeout;
	function resizeHandler (event) {
		if (timeout) {
			window.clearTimeout(timeout);
		}
		timeout = window.setTimeout(function () {
			resetEvents();
		}, 500);
	}

	function resetEvents () {

		var elements = monthsElement.querySelectorAll('.program-event');
		Array.prototype.forEach.call(elements, function (elem) {
			monthsElement.removeChild(elem);
		});
		json.aex.forEach(addDayEvents);
	}

	function initProgram () {

		json.aex.forEach(addDayBar);
		json.aex.forEach(addDayEvents);
	}

	function addDayBar (day) {

		// bar
		var div = document.createElement('div');
		div.classList.add('program-bar');
		var percentage = 100 / json.aex.length;
		div.style.width = percentage + '%';
		programElement.insertBefore(div, programElement.firstChild);
	}

	function addDayEvents (day, index) {

		// event
		if (typeof day.events !== 'undefined' && day.events.length) {
			day.events.forEach(function (event) {

				var elem = document.createElement('span');

				// position
				elem.classList.add('program-event');
				// 5 is width circle + 1
				elem.style.left = (index * parseFloat(window.getComputedStyle(document.querySelector('.program-bar')).width) - 5) + 'px';

				// color
				elem.style.backgroundColor = event.type === 'milestone' ? '#E8A60C' : '#FFCC00';

				// data
				elem.setAttribute('data-event-date', day.date);
				elem.setAttribute('data-event-title', event.title);
				elem.setAttribute('data-event-hash', event.hash);
				elem.setAttribute('data-event-type', event.type);

				// event listener
				elem.addEventListener('mouseover', mouseoverHandler);

				// append to DOM
				monthsElement.appendChild(elem);
			});
		}
	}

	function mouseoverHandler (event) {

		var date = displayDate(event.currentTarget.getAttribute('data-event-date'));
		var title = event.currentTarget.getAttribute('data-event-title');
		var hash = event.currentTarget.getAttribute('data-event-hash');
		eventDataElement.innerHTML = '<h1><a class="program-more" href="#' + hash + '">' + date + ':<br>' + title + '</a></h1>';

		// position
		var left = parseInt(event.currentTarget.style.left, 10)
		var programElementWidth = programElement.offsetWidth;
		var eventDataElementWidth = eventDataElement.offsetWidth;
		left = left > programElementWidth - eventDataElementWidth ? programElementWidth - eventDataElementWidth : left;
		eventDataElement.style.left = left + 'px';

	}
}());
