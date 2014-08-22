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
			$('.tile').eq(tile).css({'background': 'url("' + photo + '")', 'background-size': '100%' });
		}
	}

});

$(window).resize(function(e) {
   setMargins();
});

/**
 * computes and sets vertical margins between tiles based on horizontal margins between tiles.
 */
function setMargins() {
	var val = $('.tile').offset().left - $('.tile-wrapper').offset().left;
	$('.tile').each(function(){
		$(this).css({'margin-bottom': val, 'margin-top': val});
	});
}

