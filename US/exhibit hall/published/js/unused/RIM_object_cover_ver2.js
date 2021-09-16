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
var prev_width = $("body").width();
var prev_height = $("body").height();
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
							current_width = $("body").width(),
							current_height = $("body").height(),
							rw = $that.attr(attrW),
							rh = $that.attr(attrH);

						var isCol =
							that.width / that.height >
							that.naturalWidth / that.naturalHeight;
						// true면 좌우, false면 상하

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

						var delW = current_width - rw;
						var delH = current_height - rh;
						var newdW = current_width - prev_width;
						var newdH = current_height - prev_height;

						console.log(
							"cur",
							current_width,
							"rw",
							rw,
							"prev",
							prev_width
						);

						$('map[name="' + map + '"]')
							.find("area")
							.each(function () {
								var $this = $(this);
								console.log($this.data(c));
								if (!$this.data(c))
									$this.data(c, $this.attr(c));
								var coords = $this.attr(c).split(","),
									coordsPercent = new Array(coords.length);

								for (var i = 0; i < coordsPercent.length; ++i) {
									// console.log(coords[i]);

									if (isCol) {
										// width가 collapse. height는 아님.
										// width 조정의 경우에는 비율증가.
										// console.log(coords[i], rh, wPercent);
										if (newdH === 0) {
											// 1)
											console.log("case 1");
											if (i % 2 === 0)
												coordsPercent[i] = parseInt(
													(coords[i] / rw) *
														100 *
														wPercent
												);
											else
												coordsPercent[i] = parseInt(
													(coords[i] / rh) *
														100 *
														hPercent
												);
										}
										// height 조정의 경우에는 y축 좌표만 증가.
										else if (newdW === 0) {
											var amount = parseInt(coords[i]);
											console.log("case 2");
											if (i % 2 === 0) {
											} else {
												amount += delH / 2;
											}
											coordsPercent[i] = amount;
										}
									} else {
										if (newdW === 0 && newdH === 0) {
											console.log("initial case");
											if (i % 2 === 0) {
												coordsPercent[i] =
													parseInt(
														(coords[i] / rw) *
															100 *
															wPercent
													) + newdW;
											} else {
												coordsPercent[i] =
													parseInt(
														(coords[i] / rh) *
															100 *
															hPercent
													) + newdH;
											}
										}
										// height 조정의 경우에는 y축 좌표만 증가.
										else if (newdW === 0) {
											console.log("case 3");
											console.log(newdH);
											if (i % 2 === 0)
												coordsPercent[i] = parseInt(
													(coords[i] / rw) *
														100 *
														wPercent
												);
											else
												coordsPercent[i] = parseInt(
													(coords[i] / rh) *
														100 *
														hPercent
												);
										}
										// width 조정의 경우에는 x축 좌표만 증가.
										else {
											console.log("case 4");
											console.log(
												"delta Width[",
												i,
												"]: ",
												newdW
											);
											if (i % 2 === 0) {
												coordsPercent[i] =
													parseInt(
														(coords[i] / rw) *
															100 *
															wPercent
													) + newdW;

												//
												// console.log(`coordsPercent[${i}] =
												// 	parseInt(
												// 		(coords[i] / rw) *
												// 			100 *
												// 			wPercent
												// 	) + newdW = (${coords[i]} / ${rw})*100*${wPercent})+${newdW} = ${
												// 	parseInt(
												// 		(coords[i] / rw) *
												// 			100 *
												// 			wPercent
												// 	) + newdW
												// }`);
											} else {
												coordsPercent[i] =
													parseInt(
														(coords[i] / rh) *
															100 *
															hPercent
													) + newdH;
											}
										}
									}
								}

								// console.log(coordsPercent.toString());
								$this.attr(c, coordsPercent.toString());
								console.log("after: ", $this.attr(c));
							});
						prev_width = document.querySelector("body").clientWidth;
						prev_height =
							document.querySelector("body").clientHeight;
					})
					.attr("src", $that.attr("src"));
			});
		};
		$(window).resize(rwdImageMap).trigger("resize");
		return this;
	};
})(jQuery);
