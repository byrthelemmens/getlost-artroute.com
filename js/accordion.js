$(function () {

	$(document).on( "click", ".program-more", function (event) {

		$panelCollapse = $('.panel-collapse')

		var hash = $(event.target).attr('href');

		if (hash.match('#heading')) {
			var hash = hash.split('#heading')[1];
			hash = 'collapse' + hash;
			$panelCollapse.removeClass('in');
		    $('#' + hash).addClass('in');

		    // correct scrolling
		    window.setTimeout(function () {
		    	var y = parseInt(window.getComputedStyle(document.getElementById('graph-wrapper')).height, 10) - 140;
		    	window.scrollBy(0, -y);
		    }, 1);
		}
	});
});