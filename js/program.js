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
				elem.classList.add('program-event');
				elem.style.left = (index * (programElement.offsetWidth / json.aex.length)) + 'px';
				elem.setAttribute('data-event-date', day.date);
				elem.setAttribute('data-event-title', event.title);
				elem.setAttribute('data-event-description', event.description);
				elem.setAttribute('data-event-hash', event.hash);
				elem.addEventListener('mouseover', mouseoverHandler);
				monthsElement.appendChild(elem);
			});
		}
	}

	function mouseoverHandler (event) {

		var date = getDisplayDate(event.currentTarget.getAttribute('data-event-date'));
		var title = event.currentTarget.getAttribute('data-event-title');
		var description = event.currentTarget.getAttribute('data-event-description');
		var hash = event.currentTarget.getAttribute('data-event-hash');
		eventDataElement.innerHTML = '<h1>' + date + ': ' + title + '</h1><p>' + description + '</p><a class="program-more" href="#' + hash + '">Lees meer</a>';

		var left = parseInt(event.currentTarget.style.left, 10)
		var programElementWidth = programElement.offsetWidth;
		var eventDataElementWidth = eventDataElement.offsetWidth;
		left = left > programElementWidth - eventDataElementWidth ? programElementWidth - eventDataElementWidth : left;
		eventDataElement.style.left = left + 'px';
	}

	function getDisplayDate (date) {
		var date = new Date(date);
		var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return date.getDate() + ' ' + monthNames[date.getMonth()];
	}
}());
