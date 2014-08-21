$(document).ready(function () {

	var $tileRow, tileRowTemp, tileContent;

	//prepare cloning of tiles 
	$tileRow = $('.tile-row');
	$tileRowTemp = $tileRow.clone();
	$tileRow.remove();

	//build up tiles
	setupTiles(4);
	setMargins();
	getTileContent();

	$('.tile-wrapper').on('click', openItem);



	
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
	 * extracts the content of each tile from tilecontent.json and inserts it into the tiles.
	 * 
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

	function openItem(evt) {
		var i, tile, content;
		tile = $(evt.target).closest('.tile');
		i = $('.tile-wrapper .tile').index(tile);

		if (tileContent[i].subTitle !== "") {
			content = '<h3>' + tileContent[i].subTitle + '</h3>' + tileContent[i].itemContent;
		}
		else {
			content = tileContent[i].itemContent;
		}

		$('.item-wrapper h2 span.item-title').text(tileContent[i].itemTitle)
		$('.content').html(content);

		$('.overview-wrapper').hide();
		$('.item-wrapper').show();

		$('button').on('click', showAlert);

		function showAlert() {
			alert(tileContent[i].alert);
		}
	}

	// function closeItem() {
	// 	$('.overview-wrapper').show();
	// 	$('.item-wrapper').hide();
	// }



});

$(window).resize(function(e) {

   setMargins();

});

function setMargins() {
	var val = $('.tile').offset().left - $('.tile-wrapper').offset().left;
	$('.tile').each(function(){
		$(this).css({'margin-bottom': val, 'margin-top': val});
	});
}

