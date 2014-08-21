$(document).ready(function () {

	var menuState = true;

	activateLevel();
	setMinuteDropdown();

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
		setMinuteDropdown();
	}

	function setMinuteDropdown() {
		var level, $minuteOptions;
		level = localStorage['level'];
		$minuteOptions = $('select#minute');

		$minuteOptions.find('option').each(function(i, option) {
			if ($(option).val() !== "" ) {
				$(option).remove();
			}
		});

		if (level === '1') {
			steps = 2;
		}
		if (level === '2') {
			steps = 4;
		}
		if (level === '3') {
			steps = 60;
		}

		for (var i = 0; i < steps; i++) {
			var value = 60/steps * i;
			$minuteOptions.append($('<option />').val(value).text(value));
		}
	}

});