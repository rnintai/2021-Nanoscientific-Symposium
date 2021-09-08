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

var prev_width = $("body").width();
var prev_height = $("body").height();

const h_wgt = 0.7;
const offset_err = 10;

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

						var wbound = 0;
						var hbound = 0;

						if (prev_isCol !== isCol) {
							if (newdW !== 0 && newdH === 0) {
								wbound = Math.round(
									(that.height * that.naturalWidth) /
										that.naturalHeight
								);
								console.log("w: ", wbound);
							} else if (newdH !== 0 && newdW === 0) {
								hbound = Math.round(
									(that.width * that.naturalHeight) /
										that.naturalWidth
								);
								console.log("h: ", hbound);
							} else {
								wbound = Math.round(
									(that.height * that.naturalWidth) /
										that.naturalHeight
								);
								hbound = Math.round(
									(that.width * that.naturalHeight) /
										that.naturalWidth
								);
							}
						}

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
								console.log($hotspot);
								var pos_x =
									(2 * $hotspot.offset().left +
										$hotspot.width()) /
									2;
								var pos_y =
									(2 * $hotspot.offset().top +
										$hotspot.height()) /
									2;

								if (prev_isCol !== isCol) {
									console.log("isCol changed!");
									$this.attr(c, coords);
								}
								for (var i = 0; i < newCoords.length; ++i) {
									if (wbound || hbound) {
										console.log("changed");
										newCoords[i] = parseInt(coords[i]);
									} else {
										if (newdH !== 0 && newdW === 0) {
											if (isCol) {
												if (i % 2 === 0) {
													newCoords[i] = parseInt(
														(org_coords[i] / rw) *
															100 *
															wPercent
													);
												} else {
													newCoords[i] = parseInt(
														coords[i]
													);
												}
											} else {
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
															parseInt(
																coords[i]
															) +
															parseInt(
																h_wgt *
																	(parseInt(
																		(org_coords[
																			i +
																				1
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
															parseInt(
																coords[i]
															) -
															parseInt(
																h_wgt *
																	(parseInt(
																		(org_coords[
																			i +
																				1
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

														console.log(
															"(",
															org_coords[i],
															"/",
															rw,
															") * 100 *",
															wPercent,
															" = ",
															(org_coords[i] /
																rw) *
																100 *
																wPercent
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
										} else if (newdW !== 0 && newdH === 0) {
											if (isCol) {
												if (i % 2 === 0) {
													newCoords[i] = parseInt(
														(org_coords[i] / rw) *
															100 *
															wPercent
													);
												} else {
													// width에 비율 맞춰 증가.
													newCoords[i] = parseInt(
														parseInt(
															(org_coords[i] /
																rw) *
																100 *
																wPercent
														) + newdW
													);
												}
											} else {
												if (i % 2 === 0) {
													newCoords[i] =
														parseInt(coords[i]) +
														newdW / 2;
												} else {
													newCoords[i] = parseInt(
														coords[i]
													);
												}
											}
										} else {
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
