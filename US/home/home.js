jQuery(document).ready(function () {
	var ctrlVideo = document.getElementById("video");

	jQuery("button").click(function () {
		if (jQuery("button").hasClass("active")) {
			ctrlVideo.play();

			jQuery("button").hide();
			jQuery("h2").hide();
			jQuery("p").hide();
			jQuery("img").hide();
			jQuery("button").toggleClass("active");
		}
	});
});
