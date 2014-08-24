
/**
 * event triggered functionality:
 * - a tile can be clicked/touched to open the item
 * - the music icon can be clicked/touched to show the playlist
 * - an item can be closed by clicking/touching the cross, or the overview icon
 */

$(document).ready(function () {

	var overviewPos = {};

	$('.tile-wrapper').on('click touch', openItem);
	$('.playlist').on('click touch', showPlaylistAlert);
	$('.icon-close, .icon-list').on('click touch', closeItem);

	/**
	 * Opens the item of the clicked tile:
	 * - gets the content of the tile (stored in global object tileContent)
	 * - sets subTitle, itemTitle, and additional specific content
	 * - animates the transition between item overview and item content
	 * - triggers 'itemSet' to activate item specific eventHandlers
	 */
	function openItem(evt) {
		var i, tile, content;
		tile = $(evt.target).closest('.tile');
		i = $('.tile-wrapper .tile').index(tile);
		content = '';

		if (tileContent[i].subTitle !== '') {
			content += '<h3>' + tileContent[i].subTitle + '</h3>';
		}

		if (tileContent[i].itemContent !== '') {
			content += tileContent[i].itemContent;
		}

		if (tileContent[i].itemTitle !== '') {
			$('.item-wrapper h2 span.item-title').text(tileContent[i].itemTitle);
		}
		
		$('.content').html(content);

		animateTransition();

		$.event.trigger({
			type: 'itemSet',
			pass: i
		});
	}

	/**
	 * Item overview is scaled down to its center until it's no longer visible,
	 * Item rolls out from top.
	 */
	function animateTransition() {
		var $overview, $item;
		$overview = $('.overview-wrapper');
		$item = $('.item-wrapper');

		overviewPos = getAndSetPosition($overview);	//jQuery animate likes absolutely positioned elements!

		$overview.animate({
			width: ['toggle', 'swing'],
			height: ['toggle', 'swing'],
			left : '50%',
			top : '50%',
			opacity: 'toggle'
		}, 400, 'swing', function() {
			$item.animate({
				height: ['toggle', 'swing'],
				opacity: 'toggle'
			}, 400, 'swing');
		});
	}

	/**
	 * gets the position of $el, sets $el to position absolute with the retrieved width, left, and top,
	 * and returns the position. 
	 */
	function getAndSetPosition($el) {
		var $el, pos;
		$el = $el;
		pos = {};

		pos.w = $el.width();
		pos.l = $el.position().left;
		pos.t = $el.position().top;

		$el.css({position: 'absolute', left:pos.l, top:pos.t, width:pos.w});
		return pos;
	}

	/**
	 * Closes the item:
	 * - hides the item and shows the item overview (tile view)
	 * - resets the margins between the tiles
	 */
	function closeItem() {
		var $overview = $('.overview-wrapper');

		if ($overview.is(':visible')) {
			return;
		}

		$('.item-wrapper').animate({
				height: ['toggle', 'swing'],
				opacity: 'toggle'
			}, 400, 'swing', function() {
				$overview.animate({
					width: ['toggle', 'swing'],
					height: ['toggle', 'swing'],
					left : overviewPos.l,
					top : overviewPos.t,
					opacity: 'toggle'
				}, 400, 'swing', function() {
					$overview.css({position: 'relative', left: '', top: '', width: ''});
					setMargins();
			});
		});

	}

	/**
	 * shows an alert when the playlist icon is clicked/touched
	 */
	function showPlaylistAlert() {
		alert('Nu hoor je bij de playlist van vandaag uit te komen!');
	}

});

/**
 * When a specific item appears on the screen, an item specific eventhandler is activated:
 * - Clicking/touching a button or play-icon triggers an item specific alert (retrieved from tileContent)
 * to catch item specific actions.
 */
$(document).on("itemSet", function(data) {
	
	setEventHandlers(data.pass);

	function setEventHandlers(i) {
		$('button, .video span.icon-play').on('click', showAlert);

		function showAlert() {
			alert(tileContent[i].alert);
		}
	}
});