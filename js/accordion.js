$(function () {

	$(document).on( "click", ".program-more", function (event) {

		$panelCollapse = $('.panel-collapse')

		var hash = $(event.target).attr('href');

		if (hash.match('#heading')) {
			var hash = hash.split('#heading')[1];
			hash = 'collapse' + hash;
			$panelCollapse.removeClass('in');
		    $('#' + hash).addClass('in');
		}
	});
});