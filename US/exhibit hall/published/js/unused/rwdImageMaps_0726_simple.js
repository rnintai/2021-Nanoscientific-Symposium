(function ($) {
	var prev_width = $("body").width();
	var prev_height = $("body").height();

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
							w = $that.attr(attrW),
							h = $that.attr(attrH);

						var isCol =
							that.width / that.height >
							that.naturalWidth / that.naturalHeight;

						if (!w || !h) {
							var temp = new Image();
							temp.src = $that.attr("src");
							if (!w) w = temp.width;
							if (!h) h = temp.height;
						}

						var wPercent = $that.width() / 100,
							hPercent = $that.height() / 100,
							map = $that.attr("usemap").replace("#", ""),
							c = "coords";

						$('map[name="' + map + '"]')
							.find("area")
							.each(function () {
								var $this = $(this);
								if (!$this.data(c))
									$this.data(c, $this.attr(c));

								var coords = $this.data(c).split(","),
									curCoords = $this.attr(c).split(","),
									newCoords = new Array(coords.length);

								var dW = current_width - prev_width;
								var dH = current_height - prev_height;

								for (var i = 0; i < newCoords.length; ++i) {
									if (dW === 0 && dH === 0) {
										if (i % 2 === 0)
											newCoords[i] = parseInt(
												(coords[i] / w) * 100 * wPercent
											);
										else
											newCoords[i] = parseInt(
												(coords[i] / h) * 100 * hPercent
											);
									} else if (dW === 0) {
										if (isCol) {
											if (i % 2 === 0) {
												newCoords[i] = curCoords[i];
											} else {
												newCoords[i] = parseInt(
													(coords[i] / h) *
														100 *
														hPercent
												);
											}
										} else {
											if (i % 2 === 0) {
												//좌, 중, 우로 움직여야
												newCoords[i] = curCoords[i];
											} else {
												newCoords[i] = parseInt(
													(coords[i] / h) *
														100 *
														hPercent
												);
											}
										}
									} else if (dH === 0) {
										if (isCol) {
											if (i % 2 === 0) {
												newCoords[i] = parseInt(
													(coords[i] / w) *
														100 *
														wPercent
												);
											} else {
												// 상,하
												newCoords[i] = curCoords[i];
											}
										} else {
											if (i % 2 === 0) {
												newCoords[i] = parseInt(
													(coords[i] / w) *
														100 *
														wPercent
												);
											} else {
												newCoords[i] = curCoords[i];
											}
										}
									} else {
										if (i % 2 === 0)
											newCoords[i] = parseInt(
												(coords[i] / w) * 100 * wPercent
											);
										else
											newCoords[i] = parseInt(
												(coords[i] / h) * 100 * hPercent
											);
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
