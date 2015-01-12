$(function () {
	var album = $('#gallery-album');
	if (!album.length) {
		return;
	}
	
	// Grid
	var wall = new freewall("#gallery-album");
	wall.reset({
		selector: '.item',
		animate: true,
		cellW: 200,
		cellH: 'auto',
		onResize: function () {
			wall.fitWidth();
		}
	});
	wall.container.find('.item img').load(function () {
		wall.fitWidth();
	});

	// Handle click
	album.magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile mfp-fade',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function (item) {
				return item.el.parent().find('figcaption').text();
			}
		},
		iframe: {
			patterns: {
				dailymotion: {
					index: 'dailymotion.com',
					id: function (url) {
						var m = url.match(/^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
						if (m !== null) {
							if (m[4] !== undefined) {

								return m[4];
							}
							return m[2];
						}
						return null;
					},
					src: 'http://www.dailymotion.com/embed/video/%id%'

				}
			}
		}
	});

});