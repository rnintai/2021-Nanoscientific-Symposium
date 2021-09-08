window.addEventListener("DOMContentLoaded", function () {
	if (jQuery("body").hasClass("logged-in")) {
		window.location =
			window.location.search === ""
				? "/"
				: decodeURIComponent(
						window.location.search.replace("?url=", "")
				  );
	}
});
