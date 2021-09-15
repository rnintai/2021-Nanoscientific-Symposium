var i = 1;

var $hdm_textbox = generateTextbox(
	"HDM",
	"自動欠陥レビューと表面粗さ測定に最適なAFM"
);
var $nxwafer_textbox = generateTextbox(
	"NX-Wafer",
	"自動欠陥レビュー機能を備えた唯一のウェハー製造AFM"
);
//
var $nxtsh_textbox = generateTextbox(
	"NX-TSH",
	"超大型で重いフラットパネルディスプレイに対応するインライン不良解析原子間力顕微鏡（AFM）システム"
);
//
var $nx20_300mm_textbox = generateTextbox(
	"NX20 300mm",
	"ウェハー測定および分析のための自動化ナノ測定装置"
);
var $nx10_textbox = generateTextbox(
	"NX10",
	"最も正確で使いやすい原子間力顕微鏡（AFM）"
);
var $fx40_textbox = generateTextbox(
	"FX40",
	"次世代の新機能を搭載した原子間力顕微鏡：自動 AFM"
);
//
var $nxhivac_textbox = generateTextbox(
	"NX-Hivac",
	"故障解析アプリケーションに適した真空環境スキャニング"
);
var $smartscan_textbox = generateTextboxTM(
	"SmartScan",
	"すべての人にAFMテクノロジーのパワーと多様性を the power and versatility of AFM technology to everyone"
);

append3D();

generateSingleModalImage("hdm");
generateModalImages("nxwafer", 35, 15);
//
// generateModalImages("nxtsh", 35, 15);
generateSingleModalImage("nxtsh");
//
generateSingleModalImage("nx20_300mm");
generateModalImages("nx10", 17, 9);
generateModalImages("fx40", 17, 9);
//
generateModalImages("nxhivac", 17, 9);
generateSingleModalImage("smartscan");

jQuery(document).ready(function () {
	var imageLoaded = 0;
	var total_cnt = jQuery(".exhibit-image-wrap img").length;
	jQuery(".exhibit-image-wrap img").each(function () {
		if (jQuery(this)[0].complete) {
			disableSpinner();
			return false;
		} else {
			jQuery(this)[0].onload = function () {
				imageLoaded++;
				if (imageLoaded === total_cnt) {
					disableSpinner();
				}
			};
		}
	});
});

function disableSpinner() {
	jQuery(".load-wrap").css("display", "none");
}

jQuery("area").each(function () {
	var class_name = jQuery(this).attr("class");
	var coor = jQuery(this).attr("coords");
	var coorA = coor.split(",");
	var left = coorA[0];
	var top = coorA[1];
	var width = coorA[2] - coorA[0];
	var height = coorA[3] - coorA[1];

	var model_name = class_name.replace("area-", "");
	var tooltip_div = class_name.replace("area", "tooltip");
	var $div = jQuery(`<div class="${class_name}-map-wrap map-wrap"></div>`);
	var $hotspot = jQuery(`
    <div class="outer-circle">
        <div class="inner-circle">
          <svg xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" version="1.1"
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

	$div.offset({
		left: left + "px",
		top: top + "px",
	});

	$div.css({
		width: width + "px",
		height: height + "px",
		position: "absolute",
	});
	$div.appendTo(`.${tooltip_div}`);
	$hotspot.clone().appendTo(`.${class_name}-map-wrap`);
	eval("$" + model_name + "_textbox").appendTo(`.${class_name}-map-wrap`);
	i = i + 1;
});

var left_coor = [];
var top_coor = [];
var width = [];
var height = [];

var timer = null;

jQuery(window).resize(function () {
	clearTimeout(timer);

	timer = setTimeout(function () {
		setSize();
	}, 100);
});

function setSize() {
	var i = 0;
	jQuery("area").each(function () {
		// var class_name = jQuery(this).attr("class");
		var coor = jQuery(this).attr("coords");
		var coorA = coor.split(",");
		left_coor[i] = coorA[0];
		top_coor[i] = coorA[1];
		width[i] = coorA[2] - coorA[0];
		height[i] = coorA[3] - coorA[1];
		i = i + 1;
	});
	i = 0;
	jQuery(".map-wrap").each(function () {
		jQuery(this).offset({
			left: left_coor[i],
			top: top_coor[i],
		});
		jQuery(this).css({
			width: width[i],
			height: height[i],
		});
		i = i + 1;
	});
}

function generateTextbox(model, subheading) {
	return jQuery(`
      <div class="tooltip-textbox">
        <div class="tooltip-content">
          <p class="heading">
            <span class="dark-blue">Park </span>
            <span class="light-blue">${model}</span>
          </p>
          <p class="sub-heading">${subheading}</p>
        </div>
        <div class="tooltip-img">
          <img src="https://d25unujvh7ui3r.cloudfront.net/exhibit-hall/tooltip/${model}-tooltip.png" alt="${model}-tooltip-picture" />  
        </div>
      </div>
      `);
}

function generateTextboxTM(model, subheading) {
	return jQuery(`
      <div class="tooltip-textbox">
        <div class="tooltip-content">
          <p class="heading">
            <span class="dark-blue">Park </span>
            <span class="light-blue">${model}™</span>
          </p>
          <p class="sub-heading">${subheading}</p>
        </div>
        <div class="tooltip-img">
          <img src="https://d25unujvh7ui3r.cloudfront.net/exhibit-hall/tooltip/${model}-tooltip.png" alt="${model}-tooltip-picture" />  
        </div>
      </div>
      `);
}

function generateModalImages(model, last, center) {
	var img_num = 0;
	var $img = null;
	for (var i = 0; i <= last; i++) {
		img_num = i < 10 ? "00" + i : "0" + i;
		if (i === center) {
			$img = jQuery(`
      <img src="https://d25unujvh7ui3r.cloudfront.net/exhibit-hall/keyshot/${model}_${img_num}.jpg" alt="${model}-3d" class="modal-image-switch image-active">
      `);
		} else {
			$img = jQuery(`
      <img data-src="https://d25unujvh7ui3r.cloudfront.net/exhibit-hall/keyshot/${model}_${img_num}.jpg" alt="${model}-3d" class="modal-image-switch lazy">
      `);
		}
		$img.appendTo(jQuery(`.modal-${model} .modal-image-wrap`));
	}
}

function generateSingleModalImage(model) {
	var $img = jQuery(`
      <img src="https://d25unujvh7ui3r.cloudfront.net/exhibit-hall/keyshot/${model}.jpg" alt="${model}-3d" class="modal-image-switch image-active">
      `);

	$img.appendTo(jQuery(`.modal-${model} .modal-image-wrap`));
}

function append3D() {
	var $icon = jQuery(`
  <img src="https://d25unujvh7ui3r.cloudfront.net/360-degrees.png" class="keyshot-icon" alt="360-icon">
  `);
	jQuery(`.modal-wrap.3d .modal-image-wrap`).each(function () {
		$icon.clone().appendTo(jQuery(this));
	});
}
