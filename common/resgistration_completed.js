var i = 3;

function go_home_handler() {
	if (i > 0) {
		document.querySelector(".go-home a").innerText = `Go Home (${i})`;
		i--;
	} else {
		document.querySelector(".go-home a").innerText = `Go Home (0)`;
		location.href = "/";
		return false;
	}
}

setInterval(function () {
	go_home_handler();
}, 1000);
