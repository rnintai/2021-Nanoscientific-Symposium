var i = 1;

var $xe7_textbox = generateTextbox(
	"XE7",
	"The economical choice for innovative research"
);
var $nx10_textbox = generateTextbox(
	"NX10",
	"The quickest path to innovative research"
);

$(".hall-image-switch").on("load", function () {});

$("area").each(function () {
	var class_name = $(this).attr("class");
	var coor = $(this).attr("coords");
	var coorA = coor.split(",");
	var left = coorA[0];
	var top = coorA[1];
	var width = coorA[2] - coorA[0];
	var height = coorA[3] - coorA[1];

	var model_name = class_name.replace("front-", "");
	var tooltip_div = class_name.replace("front", "tooltip");
	var $div = $(`<div class="${class_name}-map-wrap map-wrap"></div>`);
	var $hotspot = $(`
    <div class="outer-circle">
        <div class="inner-circle">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
            preserveAspectRatio="xMidYMid meet"
            viewBox="-1.0036289068035202 -0.9996747277614659 47.88999999999999 47.999999999999986" width="43.89"
            height="44" class="cross-zoom-svg">
            <defs>
              <path class="cross cross-v"
                d="M23.4 17.68C23.4 17.68 23.4 17.68 23.4 17.68C23.4 23.11 23.4 26.12 23.4 26.72C23.4 26.72 23.4 26.72 23.4 26.72C23.01 26.72 22.8 26.72 22.75 26.72C22.75 26.72 22.75 26.72 22.75 26.72C22.75 21.3 22.75 18.28 22.75 17.68C22.75 17.68 22.75 17.68 22.75 17.68C23.14 17.68 23.35 17.68 23.4 17.68Z"
                id="g1biIP06Yw-${i}" />
              <path class="cross cross-h"
                d="M27.59 22.52C27.59 22.52 27.59 22.52 27.59 22.52C22.17 22.52 19.16 22.52 18.56 22.52C18.56 22.52 18.56 22.52 18.56 22.52C18.56 22.14 18.56 21.92 18.56 21.88C18.56 21.88 18.56 21.88 18.56 21.88C23.98 21.88 26.99 21.88 27.59 21.88C27.59 21.88 27.59 21.88 27.59 21.88C27.59 22.26 27.59 22.48 27.59 22.52Z"
                id="aiTp6JzbI-${i}" />
              <path class="zoom zoom-1"
                d="M0.18 0L0 0L0 0.19L0 10.39L0.18 10.39L0.18 0.19L10.38 0.19L10.38 0L10.38 0L0.18 0Z"
                id="a3rf5jiyfR-${i}" />
              <path class="zoom zoom-2"
                d="M43.89 0.19L43.89 0L43.7 0L33.5 0L33.5 0.19L43.7 0.19L43.7 10.39L43.89 10.39L43.89 10.39L43.89 0.19Z"
                id="cBrYcMxvl-${i}" />
              <path class="zoom zoom-3"
                d="M0.18 44L0 44L0 43.81L0 33.61L0.18 33.61L0.18 43.81L10.38 43.81L10.38 44L10.38 44L0.18 44Z"
                id="bHITJpG9n-${i}" />
              <path class="zoom zoom-4"
                d="M43.69 44L43.88 44L43.88 43.81L43.88 33.61L43.69 33.61L43.69 43.81L33.49 43.81L33.49 44L33.49 44L43.69 44Z"
                id="c33nJnWRqb-${i}" />
            </defs>
            <g>
              <g>
                <use xlink:href="#g1biIP06Yw-${i}" opacity="1" fill="#ffffff" fill-opacity="0" />
                <g>
                  <use xlink:href="#g1biIP06Yw-${i}" opacity="1" fill-opacity="0" stroke="#ffffff" stroke-width="1"
                    stroke-opacity="1" />
                </g>
              </g>
              <g>
                <use xlink:href="#aiTp6JzbI-${i}" opacity="1" fill="#ffffff" fill-opacity="0" />
                <g>
                  <use xlink:href="#aiTp6JzbI-${i}" opacity="1" fill-opacity="0" stroke="#ffffff" stroke-width="1"
                    stroke-opacity="1" />
                </g>
              </g>
              <g>
                <use xlink:href="#a3rf5jiyfR-${i}" opacity="1" fill="#ffffff" fill-opacity="0" />
                <g>
                  <use xlink:href="#a3rf5jiyfR-${i}" opacity="1" fill-opacity="0" stroke="#ffffff" stroke-width="1"
                    stroke-opacity="1" />
                </g>
              </g>
              <g>
                <use xlink:href="#cBrYcMxvl-${i}" opacity="1" fill="#ffffff" fill-opacity="0" />
                <g>
                  <use xlink:href="#cBrYcMxvl-${i}" opacity="1" fill-opacity="0" stroke="#ffffff" stroke-width="1"
                    stroke-opacity="1" />
                </g>
              </g>
              <g>
                <use xlink:href="#c33nJnWRqb-${i}" opacity="1" fill="#ffffff" fill-opacity="0" />
                <g>
                  <use xlink:href="#c33nJnWRqb-${i}" opacity="1" fill-opacity="0" stroke="#ffffff" stroke-width="1"
                    stroke-opacity="1" />
                </g>
              </g>
              <g>
                <use xlink:href="#bHITJpG9n-${i}" opacity="1" fill="#ffffff" fill-opacity="0" />
                <g>
                  <use xlink:href="#bHITJpG9n-${i}" opacity="1" fill-opacity="0" stroke="#ffffff" stroke-width="1"
                    stroke-opacity="1" />
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>`);

	$div.css({
		top: top + "px",
		left: left + "px",
		width: width + "px",
		height: height + "px",
		position: "absolute",
	});
	$div.appendTo(`.${tooltip_div}`);
	$hotspot.clone().appendTo(`.${class_name}-map-wrap`);
	eval("$" + model_name + "_textbox").appendTo(`.${class_name}-map-wrap`);
	// eval("$" + model_name + "_textbox").appendTo(`.${tooltip_div} .outer-circle`);
	i = i + 1;
});

var left_coor = [];
var top_coor = [];
var width = [];
var height = [];

var timer = null;

$(window).resize(function () {
	clearTimeout(timer);

	timer = setTimeout(function () {
		setSize();
	}, 150);
});

function setSize() {
	var i = 0;
	$("area").each(function () {
		var class_name = $(this).attr("class");
		var coor = $(this).attr("coords");
		var coorA = coor.split(",");
		left_coor[i] = coorA[0];
		top_coor[i] = coorA[1];
		width[i] = coorA[2] - coorA[0];
		height[i] = coorA[3] - coorA[1];
		i = i + 1;
	});
	i = 0;
	$(".map-wrap").each(function () {
		// $(this).css("left", left_coor[i]);
		// $(this).css("top", top_coor[i]);
		// $(this).width(width[i]);
		// $(this).height(height[i]);
		$(this).css({
			left: left_coor[i],
			top: top_coor[i],
			width: width[i],
			height: height[i],
		});
		i = i + 1;
	});
}

function generateTextbox(model, subheading) {
	return $(`
      <div class="tooltip-textbox">
        <div class="tooltip-content">
          <p class="heading">
            <span class="park">Park </span>
            <span class="model-name">${model}</span>
          </p>
          <p class="sub-heading">${subheading}</p>
        </div>
        <div class="tooltip-img">
          https://us.nanoscientific.org/wp-content/uploads/2021/07/${model}-tooltip.png
        </div>
      </div>
      `);
}
