$(document).ready(function () {
	
	readClock();

	$('#check-input').on('click', matchInputWithClock);

	$(document).on("handsSet", function() {
		readClock();
	});

	/**
	 * presents the time on the clock in words on the screen. 
	 */
	function readClock() {
		var hourAngle, minuteAngle, minutes;
		hourAngle = resetAngle(hands.hour.angle);
		minuteAngle = resetAngle(hands.minute.angle);
		minutes = Math.floor(getMinutes(minuteAngle));
		if (minutes > 0) {
			$('#clock-time').text(getHour(hourAngle) + ' uur en ' + minutes + ' minuten');
			return;
		}
		if (minutes === 0) {
			$('#clock-time').text(getHour(hourAngle) + ' uur');
			return;
		}
		
	}

	function matchInputWithClock() {
		var hourDif, minuteDif;
		hourDif = $('input#hour').val() - getHour(resetAngle(hands.hour.angle));
		minuteDif = $('input#minute').val() - getMinutes(resetAngle(hands.minute.angle));
		if (hourDif === 0 & minuteDif === 0) {
			alert('Goed zo!');
			generateHandAngles();
			drawClock();
			setHands();
			$('input#hour').val('');
			$('input#minute').val('');
		}
		else {
			alert('Probeer het nog eens');
			if (hourDif !== 0) {
				$('input#hour').val('');
			}
			if (minuteDif !== 0) {
				$('input#minute').val('');
			}
		}
	}
	
});

/**
 * sets the angle to a number between 0 and 360
 */
function resetAngle(angle) {
	if (angle > 360) {
		return (angle -= 360);
	}
	if (angle <= 0) {
		return (angle += 360);
	}
	if (angle > 0 & angle <= 360) {
		return angle;
	}
}

/**
 * getMinutes returns the minutes rounded of to full minutes based on the angle of the minutehand.
 *
 */
function getMinutes(minuteAngle) {
	var angle, minutes;
	angle = resetAngle(minuteAngle - 270);
	minutes = Math.floor(angle/6 *100)/100;
	
	if (minutes < 60) {
		return minutes;
	}
	if (minutes === 60) {
		return 0;
	}
}

/**
 * getHour returns the hour, rounded off to full hours based on the angle of the hourhand.
 */
function getHour(hourAngle) {
	var angle, hour;
	angle = resetAngle(hourAngle-270);
	hour = Math.floor(angle/30);
	if (hour > 0) {
		return hour;
	}
	if (hour === 0) {
		return 12;
	}
}