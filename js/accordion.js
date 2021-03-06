$(function () {

	function setAccordion () {

		var hash = window.location.hash;

		if (hash.match('#heading')) {
			var hash = hash.split('#heading')[1];
			hash = 'collapse' + hash;
			$panelCollapse = $('.panel-collapse')
			$panelCollapse.removeClass('in');
		    $('#' + hash).addClass('in');

		    // correct scrolling
		    window.setTimeout(function () {
		    	var y = parseInt(window.getComputedStyle(document.getElementById('graph-wrapper')).height, 10) - 140;
		    	window.scrollBy(0, -y);
		    }, 1);
		}
	}

	window.addEventListener('hashchange', setAccordion, false);

	setAccordion();
});