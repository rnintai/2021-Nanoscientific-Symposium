window.onload = function () {
	jQuery(".map-wrap").each(function () {
		var model_name = jQuery(this)
			.attr("class")
			.replace("-map-wrap map-wrap", "")
			.replace("front-", "");
		var outer_circle = document.querySelector(
			`.front-${model_name}-map-wrap .outer-circle`
		);
		var tooltip_wrap = document.querySelector(`.tooltip-${model_name}`);

		outer_circle.addEventListener("click", (event) => {
			draggable();
		});
		tooltip_wrap.addEventListener("click", (event) => {
			draggable();
		});
	});
};

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
			// var crt = this.cloneNode(true);
			// crt.style.backgroundColor = "red";
			// crt.style.display =
			//   "none"; /* or visibility: hidden, or any of the above */
			// document.body.appendChild(crt);
			// e.dataTransfer.setDragImage(crt, 0, 0);
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
				// console.log("left");
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
				// console.log("right");
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
