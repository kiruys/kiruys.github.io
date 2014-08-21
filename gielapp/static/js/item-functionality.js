$(document).ready(function () {

	$('.icon-close').on('click', closeItem);

	function closeItem() {
		$('.overview-wrapper').show();
		$('.item-wrapper').hide();
	}

	function showAlert() {
		console.log('uo')
		alert('Je bericht wordt helaas nog niet verzonden!');
	}



});