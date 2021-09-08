//<script>
if (document.querySelector("#eael-lr-reg-toggle")) {
	var $reg_now = jQuery("#eael-lr-reg-toggle");
	if (location.search !== "") {
		$reg_now[0].href += location.search;
	} else {
		const encoded_URI = encodeURIComponent(location.pathname);
		$reg_now[0].href += `?url=${encoded_URI}`;
	}
}

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
//</script>
