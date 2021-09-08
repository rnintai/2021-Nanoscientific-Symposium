window.onload = function () {
	var modal_overlay = document.querySelector(".modal-overlay");

	jQuery(".modal-wrap").each((event) => {
		var old_dragX = 0;
		// var modal_wrap = document.querySelector(".modal-wrap--active");
		var model_name = jQuery(this).classList[1].replace("modal-", "");
		var current_str = modal_wrap.querySelector(".image-active");
		current_str = current_str.src.substr(56);
		current_str = current_str.replace(".jpg", "");
		current_str = current_str.replace(`${model_name}_`, "");
		var current_img = current_str.replaceAll("0", "");
		var counter = 0;

		document.addEventListener(
			"dragstart",
			function (e) {
				var img = document.createElement("img");
				img.src =
					"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
				e.dataTransfer.setDragImage(img, 0, 0);
			},
			false
		);
		document.addEventListener(
			"dragover",
			function (e) {
				var list = document
					.querySelector(".modal-wrap--active")
					.getElementsByClassName("modal-image-switch");
				e = e || window.event;
				var dragX = e.pageX;
				if (old_dragX < dragX) {
					counter--;
					if (counter === -3) {
						list[current_img].classList.remove("image-active");
						if (current_img == 0) {
							current_img = 17;
						} else {
							current_img--;
						}
						list[current_img].classList.add("image-active");
						counter = 0;
					}
				} else if (old_dragX > dragX) {
					counter++;
					if (counter === 3) {
						list[current_img].classList.remove("image-active");
						current_img = (current_img + 1) % 17;
						list[current_img].classList.add("image-active");
						counter = 0;
					}
				}
				old_dragX = dragX;
			},
			false
		);
	});

	jQuery(".map-wrap").each(function () {
		var model_name = jQuery(this)
			.attr("class")
			.replace("-map-wrap map-wrap", "")
			.replace("front-", "");
		var outer_circle = document.querySelector(
			`.front-${model_name}-map-wrap .outer-circle`
		);
		var tooltip_wrap = document.querySelector(`.tooltip-${model_name}`);
		var modal_exit = document.querySelector(
			`.modal-${model_name} .button-exit`
		);
		outer_circle.addEventListener("mouseover", (event) =>
			outerActive(`.tooltip-${model_name} `)
		);
		outer_circle.addEventListener("click", (event) => {
			openModal(`.modal-${model_name} `);
		});
		tooltip_wrap.addEventListener("mouseover", (event) => {
			outerActive(`.tooltip-${model_name} `);
		});
		tooltip_wrap.addEventListener("mouseout", (event) => {
			outerInactive(`.tooltip-${model_name} `);
		});
		tooltip_wrap.addEventListener("click", (event) => {
			openModal(`.modal-${model_name} `);
		});
		modal_exit.addEventListener("mouseover", (event) => {
			modal_exit.classList.add("button-exit--active");
		});
		modal_exit.addEventListener("mouseout", (event) => {
			modal_exit.classList.remove("button-exit--active");
		});
		modal_exit.addEventListener("click", (event) => {
			closeModal(`.modal-${model_name} `);
		});
	});
	modal_overlay.addEventListener("click", closeAllModals);

	function outerActive(parent) {
		document
			.querySelector(parent + ".outer-circle")
			.classList.add("outer-circle--active");
		document
			.querySelector(parent + ".inner-circle")
			.classList.add("inner-circle--active");
		document
			.querySelector(parent + " .cross-v")
			.classList.add("cross--active");
		document
			.querySelector(parent + " .cross-h")
			.classList.add("cross--active");
		document
			.querySelector(parent + ".zoom-1")
			.classList.add("zoom--active");
		document
			.querySelector(parent + ".zoom-2")
			.classList.add("zoom--active");
		document
			.querySelector(parent + ".zoom-3")
			.classList.add("zoom--active");
		document
			.querySelector(parent + ".zoom-4")
			.classList.add("zoom--active");
		document.querySelector(parent).classList.add("tooltip-wrap--active");
		document
			.querySelector(parent + ".tooltip-textbox")
			.classList.add("tooltip-textbox--active");
	}
	function outerInactive(parent) {
		document
			.querySelector(parent + ".outer-circle")
			.classList.remove("outer-circle--active");
		document
			.querySelector(parent + ".inner-circle")
			.classList.remove("inner-circle--active");
		document
			.querySelector(parent + " .cross-v")
			.classList.remove("cross--active");
		document
			.querySelector(parent + " .cross-h")
			.classList.remove("cross--active");
		document
			.querySelector(parent + ".zoom-1")
			.classList.remove("zoom--active");
		document
			.querySelector(parent + ".zoom-2")
			.classList.remove("zoom--active");
		document
			.querySelector(parent + ".zoom-3")
			.classList.remove("zoom--active");
		document
			.querySelector(parent + ".zoom-4")
			.classList.remove("zoom--active");
		document.querySelector(parent).classList.remove("tooltip-wrap--active");
		document
			.querySelector(parent + ".tooltip-textbox")
			.classList.remove("tooltip-textbox--active");
	}
	function openModal(parent) {
		document.querySelector(parent).classList.add("modal-wrap--active");
		modal_overlay.classList.add("modal-overlay--active");
	}
	function closeModal(parent) {
		document.querySelector(parent).classList.remove("modal-wrap--active");
		modal_overlay.classList.remove("modal-overlay--active");
	}
	function closeAllModals() {
		var modal_wrap = document.getElementsByClassName("modal-wrap");
		for (var i = 0; i < modal_wrap.length; i++) {
			modal_wrap[i].classList.remove("modal-wrap--active");
		}
		modal_overlay.classList.remove("modal-overlay--active");
	}

	function draggable() {
		var old_dragX = 0;
		var modal_wrap = document.querySelector(".modal-wrap--active");
		var model_name = modal_wrap.classList[1].replace("modal-", "");
		var current_str = modal_wrap.querySelector(".image-active");
		current_str = current_str.src.substr(56);
		current_str = current_str.replace(".jpg", "");
		current_str = current_str.replace(`${model_name}_`, "");
		var current_img = current_str.replaceAll("0", "");
		var counter = 0;

		document.addEventListener(
			"dragstart",
			function (e) {
				var img = document.createElement("img");
				img.src =
					"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
				e.dataTransfer.setDragImage(img, 0, 0);
			},
			false
		);
		document.addEventListener(
			"dragover",
			function (e) {
				var list = document
					.querySelector(".modal-wrap--active")
					.getElementsByClassName("modal-image-switch");
				e = e || window.event;
				var dragX = e.pageX;
				if (old_dragX < dragX) {
					counter--;
					if (counter === -3) {
						list[current_img].classList.remove("image-active");
						if (current_img == 0) {
							current_img = 17;
						} else {
							current_img--;
						}
						list[current_img].classList.add("image-active");
						counter = 0;
					}
				} else if (old_dragX > dragX) {
					counter++;
					if (counter === 3) {
						list[current_img].classList.remove("image-active");
						current_img = (current_img + 1) % 17;
						list[current_img].classList.add("image-active");
						counter = 0;
					}
				}
				old_dragX = dragX;
			},
			false
		);
	}
};
