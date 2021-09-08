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

const w_wgt = 1.7778; // 16/9
const h_wgt = 0.5625; // 9/16
const offset_err = 15; // 10px
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

						var prev_isCol =
							prev_width / prev_height >
							that.naturalWidth / that.naturalHeight;
						var isCol =
							that.width / that.height >
							that.naturalWidth / that.naturalHeight;

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

						var newdW = current_width - prev_width;
						var newdH = current_height - prev_height;

						$('map[name="' + map + '"]')
							.find("area")
							.each(function () {
								var $this = $(this);
								if (!$this.data(c))
									$this.data(c, $this.attr(c));
								var coords = $this.attr(c).split(","),
									newCoords = new Array(coords.length);
								var org_coords = $this.data(c).split(",");

								var $hotspot = $(
									`.${$this[0].className}-map-wrap`
								);
								var pos_x =
									(2 * $hotspot.offset().left +
										$hotspot.width()) /
									2;
								var pos_y =
									(2 * $hotspot.offset().top +
										$hotspot.height()) /
									2;

								for (var i = 0; i < newCoords.length; ++i) {
									if (newdW === 0 && newdH === 0) {
										console.log("initial case");
										if (i % 2 === 0) {
											newCoords[i] = parseInt(
												(org_coords[i] / rw) *
													100 *
													wPercent
											);
										} else {
											newCoords[i] = parseInt(
												(org_coords[i] / rh) *
													100 *
													hPercent
											);
										}
									} else if (isCol) {
										// width가 collapse. height는 아님.
										// width 조정의 경우에는 비율증가.
										if (newdH === 0) {
											console.log("case 1");

											if (i % 2 === 0) {
												newCoords[i] = parseInt(
													(org_coords[i] / rw) *
														100 *
														wPercent
												);
											} else {
												if (
													pos_y >
													current_height / 2 +
														offset_err
												) {
													console.log(
														"case 1 - height - 1"
													);
													newCoords[i] =
														parseInt(coords[i]) +
														parseInt(
															h_wgt *
																(parseInt(
																	(org_coords[
																		i - 1
																	] /
																		rw) *
																		100 *
																		wPercent
																) -
																	parseInt(
																		coords[
																			i -
																				1
																		]
																	))
														);
												} else if (
													pos_y <
													current_height / 2 -
														offset_err
												) {
													console.log(
														"case 1 - height - 2"
													);

													newCoords[i] =
														parseInt(coords[i]) -
														parseInt(
															h_wgt *
																(parseInt(
																	(org_coords[
																		i - 1
																	] /
																		rw) *
																		100 *
																		wPercent
																) -
																	parseInt(
																		coords[
																			i -
																				1
																		]
																	))
														);
												}
											}
										}
										// height 조정의 경우에는 y축 좌표만 증가.
										else if (newdW === 0) {
											console.log("case 2");
											if (i % 2 === 0) {
												newCoords[i] = parseInt(
													coords[i]
												);
											} else {
												newCoords[i] =
													parseInt(coords[i]) +
													newdH / 2;
											}
										} else {
											console.log("isCol else");
											if (i % 2 === 0) {
												newCoords[i] = parseInt(
													(org_coords[i] / rw) *
														100 *
														wPercent
												);
											} else {
												newCoords[i] = parseInt(
													(org_coords[i] / rh) *
														100 *
														hPercent
												);
											}
										}
									} else if (!isCol) {
										// height 조정의 경우에는 비율 증가.
										if (newdW === 0) {
											console.log("case 3");
											if (i % 2 === 0) {
												if (
													pos_x >
													current_width / 2 +
														offset_err
												) {
													console.log(
														"case 1 - width - 1"
													);
													newCoords[i] =
														parseInt(coords[i]) +
														parseInt(
															w_wgt *
																(parseInt(
																	(org_coords[
																		i + 1
																	] /
																		rh) *
																		100 *
																		hPercent
																) -
																	parseInt(
																		coords[
																			i +
																				1
																		]
																	))
														);
													// newCoords[i] =
													// 	parseInt(coords[i]) +
													// 	(newdW / 2) * h_wgt;
												} else if (
													pos_x <
													current_width / 2 -
														offset_err
												) {
													console.log(
														"case 1 - width - 2"
													);
													newCoords[i] =
														parseInt(coords[i]) -
														parseInt(
															w_wgt *
																(parseInt(
																	(org_coords[
																		i + 1
																	] /
																		rh) *
																		100 *
																		hPercent
																) -
																	parseInt(
																		coords[
																			i +
																				1
																		]
																	))
														);
												}
											} else {
												newCoords[i] = parseInt(
													(org_coords[i] / rh) *
														100 *
														hPercent
												);
											}
										}
										//
										// width 조정의 경우에는 x축 좌표만 증가.
										else if (newdH === 0) {
											console.log("case 4");
											if (i % 2 === 0) {
												newCoords[i] =
													parseInt(coords[i]) +
													newdW / 2;
											} else {
												newCoords[i] = parseInt(
													coords[i]
												);
											}
										} else {
											console.log("!isCol else");
											if (i % 2 === 0) {
												newCoords[i] = parseInt(
													(org_coords[i] / rw) *
														100 *
														wPercent
												);
											} else {
												newCoords[i] = parseInt(
													(org_coords[i] / rh) *
														100 *
														hPercent
												);
											}
										}
									}
								}

								// console.log(coordsPercent.toString());
								$this.attr(c, newCoords.toString());
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
