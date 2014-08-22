
/**
 * event triggered functionality:
 * - a tile can be clicked/touched to open the item
 * - the music icon can be clicked/touched to show the playlist
 * - an item can be closed by clicking/touching the cross, or the overview icon
 */

$(document).ready(function () {

	//$('.tile-wrapper').on('click touch', openItem);
	$('.playlist').on('click touch', showPlaylistAlert);
	$('.icon-close, .icon-list').on('click touch', closeItem);

	$('.tile-wrapper').click(function() {
		  // $( ".overview-wrapper" ).animate({
		  //   width: [ "toggle", "swing" ],
		  //   height: [ "toggle", "swing" ],
		  //   left: 50%,
		  //   opacity: "toggle"
		  // }, 5000, "swing", function() {
		  //   console.log('yo done');
		  // });
		$(".overview-wrapper").css({position: "absolute", width: "90%"}).animate({
        width: "toggle",
        height: "toggle",
        top: "50%",
        left: "50%",
        opacity: 0.4
    }, {
        duration: 500,
        easing: "swing"
    });

});




	/**
	 * Opens the item of the clicked tile:
	 * - gets the content of the tile (stored in global object tileContent)
	 * - sets subTitle, itemTitle, and additional specific content
	 * - hides the item overview and shows the item content
	 * - triggers 'itemSet' to activate item specific eventHandlers
	 */
	function openItem(evt) {
		var i, tile, content;
		tile = $(evt.target).closest('.tile');
		i = $('.tile-wrapper .tile').index(tile);
		content = '';

		if (tileContent[i].subTitle !== "") {
			content += '<h3>' + tileContent[i].subTitle + '</h3>';
		}

		if (tileContent[i].itemContent !== "") {
			content += tileContent[i].itemContent;
		}

		if (tileContent[i].itemTitle !== "") {
			$('.item-wrapper h2 span.item-title').text(tileContent[i].itemTitle);
		}
		
		$('.content').html(content);

		$( ".overview-wrapper" ).fadeOut( "fast", function(){
			$( ".item-wrapper" ).fadeIn( "fast" );
		});

		$.event.trigger({
			type: "itemSet",
			pass: i
		});
	}

	/**
	 * Closes the item:
	 * - hides the item and shows the item overview (tile view)
	 * - resets the margins between the tiles
	 */
	function closeItem() {
		$( ".item-wrapper" ).fadeOut( "fast", function(){
			$( ".overview-wrapper" ).fadeIn( "fast" );
			setMargins();
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