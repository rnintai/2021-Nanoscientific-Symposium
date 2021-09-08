/*
 * rwdImageMaps jQuery plugin v1.6
 *
 * Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
 *
 * Copyright (c) 2016 Matt Stow
 * https://github.com/stowball/jQuery-rwdImageMaps
 * http://mattstow.com
 * Licensed under the MIT license
 */

// var aw = window.screen.availWidth;
// var ah = window.screen.availHeight;
var ow = document.querySelector("body").clientWidth;
var oh = document.querySelector("body").clientHeight;
(function ($) {
	$.fn.rwdImageMaps = function () {
		var $img = this;

		var rwdImageMap = function () {
			$img.each(function () {
				if (typeof $(this).attr("usemap") == "undefined") return;

				var that = this,
					$that = $(that);

				// Since WebKit doesn't know the height until after the image has loaded, perform everything in an onload copy
				$("<img />")
					.on("load", function () {
						var attrW = "width",
							attrH = "height",
							w = $("body").width(),
							h = $("body").height(),
							rw = $that.attr(attrW),
							rh = $that.attr(attrH);

						var isHorCollapsed =
								that.width / that.height >
								that.naturalWidth / that.naturalHeight,
							isVerCollapsed =
								that.height / that.width >
								that.naturalHeight / that.naturalWidth;
						const ratioH = that.naturalWidth / that.naturalHeight;
						const ratioW = that.naturalHeight / that.naturalWidth;

						if (!rw || !rh) {
							var temp = new Image();
							temp.src = $that.attr("src");
							if (!rw) rw = temp.width;
							if (!rh) rh = temp.height;
						}

						var wPercent = $that.width() / 100,
							hPercent = $that.height() / 100,
							map = $that.attr("usemap").replace("#", ""),
							c = "coords";

						var delW = w - rw;
						var delH = h - rh;
						var newdW = w - ow;
						var newdH = h - oh;

						$('map[name="' + map + '"]')
							.find("area")
							.each(function () {
								var $this = $(this);
								if (!$this.data(c))
									$this.data(c, $this.attr(c));
								var coords = $this.data(c).split(","),
									coordsPercent = new Array(coords.length);

								console.log(newdW, newdH);

								for (var i = 0; i < coordsPercent.length; ++i) {
									var amount = parseInt(coords[i]);
									if (i % 2 === 0) {
										if (isVerCollapsed) {
											if (newdH !== 0) {
												amount += parseInt(
													(delH * ratioH) / 2
												);
											}
										}
										if (newdH === 0) {
											amount += delW / 2;
										}
									} else {
										if (isHorCollapsed) {
											if (newdW !== 0) {
												amount += parseInt(
													(delW * ratioW) / 2
												);
											}
										}
										if (newdW === 0) {
											amount += delH / 2;
										}
									}
									coordsPercent[i] = amount;
								}

								// for (var i = 0; i < coordsPercent.length; ++i) {
								// 	if (i % 2 === 0) {
								// 		var amount = parseInt(coords[i]);
								// 		console.log(delH);
								// 		if (isVerCollapsed) {
								// 			if (newdH !== 0) {
								// 				amount += parseInt(
								// 					(delH * 1.778) / 2
								// 				);
								// 			}
								// 		}
								// 		if (newdH === 0) {
								// 			amount += delW / 2;
								// 		}
								// 		coordsPercent[i] = amount;
								// 	} else {
								// 		var amount = parseInt(coords[i]);
								// 		if (isHorCollapsed) {
								// 			if (newdW !== 0) {
								// 				amount += parseInt(
								// 					(delW * 0.5625) / 2
								// 				);
								// 			}
								// 		}
								// 		if (newdW === 0) {
								// 			amount += delH / 2;
								// 		}
								// 		coordsPercent[i] = amount;
								// 	}
								// }
								console.log(coordsPercent);

								$this.attr(c, coordsPercent.toString());
							});
						ow = document.querySelector("body").clientWidth;
						oh = document.querySelector("body").clientHeight;
					})
					.attr("src", $that.attr("src"));
			});
		};
		$(window).resize(rwdImageMap).trigger("resize");
		return this;
	};
})(jQuery);
