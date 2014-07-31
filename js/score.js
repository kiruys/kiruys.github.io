var player = {score: 0};

$(document).ready(function () {
	
	$('.score-field').text(player.score);

});

function changeScore() {
	player.score++;
	$('.score-field').text(player.score);
}