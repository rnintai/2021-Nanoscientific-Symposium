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

						const w_wgt =
							Math.round(
								(100 * that.naturalWidth) /
									1.5 /
									that.naturalHeight
							) / 100;
						const h_wgt =
							Math.round(
								(100 * that.naturalHeight) /
									1.5 /
									that.naturalWidth
							) / 100;

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
								console.log("w: ", wbound);
								console.log("h: ", hbound);
							}
						}
						console.log(prev_isCol, isCol);
						console.log(wbound, hbound);
						$('map[name="' + map + '"]')
							.find("area")
							.each(function () {
								var $this = $(this);
								if (!$this.data(c))
									$this.data(c, $this.attr(c));
								var coords = $this.attr(c).split(","),
									newCoords = new Array(coords.length);
								var org_coords = $this.data(c).split(",");

								for (var i = 0; i < newCoords.length; ++i) {
									if (newdW !== 0 && newdH === 0) {
										if (wbound) {
											if (prev_width + newdW >= wbound) {
												var notcoldW =
													wbound - prev_width;
												var coldW = newdW - notcoldW;
												if (i % 2 === 0) {
													newCoords[i] =
														parseInt(coords[i]) +
														notcoldW / 2;
													newCoords[i] += coldW / 2.5;
												} else {
													newCoords[i] =
														parseInt(coords[i]) +
														coldW * h_wgt;
												}
											} else {
												console.log(
													`${prev_width} + ${newdW} = ${that.width} < ${wbound}`
												);
												var notcoldW =
													wbound - prev_width;
												var coldW = newdW - notcoldW;
												if (i % 2 === 0) {
													newCoords[i] =
														parseInt(coords[i]) +
														notcoldW / 2;
													newCoords[i] += coldW / 2.5;
												} else {
													newCoords[i] =
														parseInt(coords[i]) +
														coldW * h_wgt;
												}
											}
										} else {
											if (isCol) {
												if (i % 2 === 0) {
													newCoords[i] =
														parseInt(coords[i]) +
														newdW / 2.5;
												} else {
													newCoords[i] =
														parseInt(coords[i]) +
														newdW * h_wgt;
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
										}
									} else if (newdH !== 0 && newdW === 0) {
										if (hbound) {
											if (prev_height + newdH >= hbound) {
												var coldH =
													hbound - prev_height;
												var notcoldH = newdH - coldH;
												if (i % 2 === 1) {
													newCoords[i] =
														parseInt(coords[i]) +
														coldH / 2;
												} else {
													//
													newCoords[i] = parseInt(
														coords[i]
													);
													//
												}
											} else {
												console.log(
													`${prev_height} + ${newdH} = ${that.width} < ${hbound}`
												);
												var coldH =
													hbound - prev_height;
												var notcoldH = newdH - coldH;
												if (i % 2 === 1) {
													newCoords[i] =
														parseInt(coords[i]) +
														coldH / 2;
												} else {
													//
													newCoords[i] = parseInt(
														coords[i]
													);
													//
												}
											}
										} else {
											if (isCol) {
												if (i % 2 === 1) {
													newCoords[i] = parseInt(
														coords[i]
													);
												} else {
													newCoords[i] = parseInt(
														coords[i]
													);
												}
											} else {
												if (i % 2 === 1) {
													newCoords[i] =
														parseInt(coords[i]) +
														newdH / 2;
												} else {
													// 좌우중
													newCoords[i] = parseInt(
														coords[i]
													);
													//
												}
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
									// 	console.log("height only");
									// 	if (isCol) {
									// 		if (i % 2 === 0) {
									// 			newCoords[i] = parseInt(
									// 				(org_coords[i] / rw) *
									// 					100 *
									// 					wPercent
									// 			);
									// 		} else {
									// 			newCoords[i] = parseInt(
									// 				coords[i]
									// 			);
									// 		}
									// 	} else {
									// 		if (i % 2 === 0) {
									// 			newCoords[i] = parseInt(
									// 				parseInt(
									// 					(org_coords[i] / rh) *
									// 						100 *
									// 						hPercent
									// 				) + newdH
									// 			);
									// 		} else {
									// 			newCoords[i] = parseInt(
									// 				(org_coords[i] / rh) *
									// 					100 *
									// 					hPercent
									// 			);
									// 		}
									// 	}
									// } else if (newdW !== 0 && newdH === 0) {
									// 	console.log("width only");
									// 	if (isCol) {
									// 		if (i % 2 === 0) {
									// 			newCoords[i] = parseInt(
									// 				(org_coords[i] / rw) *
									// 					100 *
									// 					wPercent
									// 			);
									// 		} else {
									// 			// width에 비율 맞춰 증가.
									// 			newCoords[i] = parseInt(
									// 				parseInt(
									// 					(org_coords[i] / rw) *
									// 						100 *
									// 						wPercent
									// 				) + newdW
									// 			);
									// 		}
									// 	} else {
									// 		if (i % 2 === 0) {
									// 			newCoords[i] = parseInt(
									// 				coords[i]
									// 			);
									// 		} else {
									// 			newCoords[i] = parseInt(
									// 				coords[i]
									// 			);
									// 		}
									// 	}
									// } else {
									// 	if (i % 2 === 0) {
									// 		newCoords[i] = parseInt(
									// 			(org_coords[i] / rw) *
									// 				100 *
									// 				wPercent
									// 		);
									// 	} else {
									// 		newCoords[i] = parseInt(
									// 			(org_coords[i] / rh) *
									// 				100 *
									// 				hPercent
									// 		);
									// 	}
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
