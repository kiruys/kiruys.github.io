/**
 * creates an overview of the giel-app items in tiles. Content for the items is retrieved with json.
 * appropriate margins between tiles are computed and recomputed on window-resize.
 */

var tileContent;

$(document).ready(function () {

	var $tileRow, tileRowTemp;

	//prepare cloning of tiles 
	$tileRow = $('.tile-row');
	$tileRowTemp = $tileRow.clone();
	$tileRow.remove();

	//build up tiles
	setupTiles(4);
	setMargins();
	getTileContent();
	
	/**
	 * draws the given number of tileRows using $tileRowTemp
	 */
	function setupTiles(tileRows) {
		var $tileRowClone, $base;
		$base = $('.tile-wrapper');	

		for (var i = 0; i < tileRows; i++) {
			$tileRowClone = $tileRowTemp.clone();
			$base.append($tileRowClone);
		}
	}

	/**
	 * extracts the content of each tile from tilecontent.json, stores it in the global 
	 * variable tileContent, and inserts it into the tiles.
	 */
	function getTileContent() {

		$.getJSON('static/ajax/tilecontent.json', function(data) {
			tileContent = data.items;

			for (var i = 0; i < tileContent.length; i++) {

				setBackgroundColor(i, tileContent[i].bgcolor);
				setFontColor(i, tileContent[i].fontcolor);
				setTitle(i, tileContent[i].title);
				showIcon(i, tileContent[i].icon);
				setPhoto(i, tileContent[i].photo);
			}
		});
	}

	function showIcon(tile, type) {	
		if (type !== '') {
			type = 'icon-' + type;
			$('.tile').eq(tile).find('span.icons').css('opacity', 100).addClass(type);
		}
	}

	function setBackgroundColor(tile, color) {
		if (color !== '') {
			$('.tile').eq(tile).css('background', color);
		}
	}

	function setFontColor(tile, color) {
		if (color !== '') {
			$('.tile').eq(tile).find('h2').css('color', color);
		}
	}

	function setTitle(tile, title) {
		if (title !== '') {
			$('.tile').eq(tile).find('h2').text(title);
		}
	}

	function setPhoto(tile, photo) {	
		if (photo !== '') {
			photo = 'static/img/' + photo;
			$('.tile').eq(tile).css({'background': 'url("' + photo + '")', 'background-size': '100%'});
		}
	}

});

$(window).resize(function(e) {
	setMargins();
});

/**
 * Computes and sets vertical margins between tiles based on horizontal margins between tiles.
 */
function setMargins() {
	var val = $('.tile').offset().left - $('.tile-wrapper').offset().left;

	safariHack();

	$('.tile').each(function(){
		$(this).height($(this).width());
		$(this).css({'margin-bottom': val, 'margin-top': val});
	});
}

/**
 * Ugly hack for Safari to reload sizes that are indicated in vw.
 */
function safariHack() {
	var $tile, $item, $video, $recorder;
	$tile = $('.tile');
	$item = $('.item-wrapper');
	$video = $('.video');
	$recorder = $('.recorder');

	$('.icons').css({'padding': '2vw', 'font-size': '4vw', 'top': '3vw'});
	$('h1').css({'font-size': '8vw'});
	$('h2').css({'font-size': '4vw', 'line-height': '4vw'});
	$('p').css({'font-size': '4vw'});
	$tile.find('.icons').css({'padding': '1vw', 'font-size': '3vw', 'top': '1vw', 'right': '1vw'});
	$tile.find('h2').css({'bottom': '-2vw'});

	$item.find('h2').css({'font-size': '5vw', 'line-height': 0});
	$item.find('h3').css({'font-size': '8vw', 'line-height': '8vw'});
	$item.find('.pink-icon').css({'font-size': '3vw', 'padding': '1vw', 'margin-right': '2vw'});

	$video.css({'height': '40vw', 'border-radius': '1vw'});
	$video.find('.icon-play').css({'font-size': '8vw', 'top':'30%'});

	$recorder.css({'border-radius': '1vw'});
	$recorder.find('.top').css({'border-top-left-radius': '1vw', 'border-top-right-radius': '1vw', 'height': '8vw'});
	$recorder.find('.bottom').css({'border-bottom-left-radius': '1vw', 'border-bottom-right-radius': '1vw', 'height': '8vw'});
	$recorder.find('p').css({'font-size': '6vw'});

	$('button, table').css({'font-size': '3.5vw'});
	$('button table span').css({'top': '0'});

	$('textarea').css({'font-size': '3vw', 'height': '30vw'});
}

