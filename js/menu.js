$(document).ready(function () {

	var menuState = true;

	activateLevel();

	$('a[data-link]').on('click', toggleMenu);
	$('button[data-level]').on('click', setLevel);

	function activateLevel() {
		var level = localStorage['level'];
		if (level === undefined) {
			localStorage['level'] = '1';
			console.log(localStorage['level'])
			return;
		}
		if (level !== undefined) {
			$('button[data-level]').removeClass('active-level');
			$('button[data-level="' + level + '"]').addClass('active-level');
			return;
		}
	}

	function toggleMenu(evt) {
		evt.preventDefault();
		var id = $(evt.target).closest('a').data('link');

		if (menuState) {
			$('.menu-option').show();
			menuState = false;
			return;
		}
		if (!menuState) {
			$('.menu-option').hide();
			$(evt.target).closest('.menu-option').show();
			showChoice(id);
			menuState = true;
			return;
		}
	}

	function showChoice(id) {
		$('.menu-item').each(function(index) {
			if($(this).attr('id') === id) {
				$(this).find('input').val('');
				$(this).show();
			}
			if($(this).attr('id') !== id) {
				$(this).hide();
			}
		});
	}

	function setLevel(evt) {
		localStorage['level'] = $(evt.target).data('level');
		activateLevel();
	}

});