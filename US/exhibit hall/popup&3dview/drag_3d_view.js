var old_dragX = 0;
var current_img = 20;
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
    var list = document.querySelector(".modal-wrap--active").getElementsByClassName("modal-image-switch");
    e = e || window.event;
    var dragX = e.pageX;
    if (old_dragX < dragX) {
      // console.log("left");
      counter--;
      if (counter === -3) {
        list[current_img].classList.remove("image-active");
        if (current_img == 0) {
          current_img = 39;
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
        current_img = (current_img + 1) % 39;
        list[current_img].classList.add("image-active");
        counter = 0;
      }
    }
    old_dragX = dragX;
  },
  false
);