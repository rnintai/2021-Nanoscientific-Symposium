var cur_deg = 0;
var bar_zero = document.querySelector(".helper-1");
var bar_zero_wrap = document.querySelector(".helper-wrap-1");
var bar_ninty = document.querySelector(".helper-2");
var bar_ninty_wrap = document.querySelector(".helper-wrap-2");
var bar_oneeighty = document.querySelector(".helper-3");
var bar_oneeighty_wrap = document.querySelector(".helper-wrap-3");
var arrow_left_wrap = document.querySelector(".arrow-left-wrap");
var arrow_right_wrap = document.querySelector(".arrow-right-wrap");
var image_list = document.getElementsByClassName("hall-image-switch");

function addDisabled(){
    document.querySelector(".arrows-wrap").classList.add("inactive");
    document.querySelector(".helper-wrap").classList.add("inactive");

    bar_zero_wrap.removeAttribute("onclick");
    bar_ninty_wrap.removeAttribute("onclick");
    bar_oneeighty_wrap.removeAttribute("onclick");
    arrow_left_wrap.removeAttribute("onclick");
    arrow_right_wrap.removeAttribute("onclick");
}
function removeDisabled(){
    document.querySelector(".arrows-wrap").classList.remove("inactive");
    document.querySelector(".helper-wrap").classList.remove("inactive");

    bar_zero_wrap.setAttribute("onclick", "degZero()");
    bar_ninty_wrap.setAttribute("onclick", "degNinty()");
    bar_oneeighty_wrap.setAttribute("onclick", "degOneEighty()");
    arrow_left_wrap.setAttribute("onclick", "clickLeft()");
    arrow_right_wrap.setAttribute("onclick", "clickRight()");
}

function clickLeft(){
    addDisabled();
    switch(cur_deg){
        case 1:
            image_slide_neg(10,0, image_list);
            cur_deg = 1;
            activateZero();
            break;
        case 2:
            image_slide_neg(20,10, image_list);
            cur_deg = 1;
            activateZero();
            break;
        case 3:
            image_slide_neg(30,20, image_list);
            cur_deg = 2;
            activateNinty();
            break;
        case 4:
            image_slide_neg(39,30, image_list);
            cur_deg = 2;
            activateNinty();
            break;
        default:
            removeDisabled();
    }
}
function clickRight(){
    addDisabled();
    switch(cur_deg){
        case 1:
            image_slide_pos(0,20, image_list);
            cur_deg = 2;
            activateNinty();
            break;
        case 2:
            image_slide_pos(20,39, image_list);
            cur_deg = 3;
            activateOneEighty();
            break;
        default:
            removeDisabled();
    }
}


function degZero(){
    addDisabled();
    activateZero();
    switch (cur_deg){
        case 2:
            image_slide_neg(20, 0, image_list);
            break;
        case 3:
            image_slide_neg(39, 0, image_list);
            break;
        }
    cur_deg = 1;
}

function degNinty(){
    addDisabled();
    activateNinty();		
    switch (cur_deg){
        case 1:
            image_slide_pos(0, 20, image_list);
            break;
        case 3:
            image_slide_neg(39, 20, image_list);
            break;
    }
    cur_deg = 2;
}

function degOneEighty(){
    addDisabled();
    activateOneEighty();
    switch (cur_deg){
        case 1:
            image_slide_pos(0, 39, image_list);
            break;
        case 2:
            image_slide_pos(20, 39, image_list);
            break;
    }
    cur_deg = 3;
}

async function image_slide_neg(from, to, list){
    for(var i=from;i>to;i--){
        list[i].classList.remove("image-active");
        list[i-1].classList.add("image-active");
        await sleep(40);
    }
    removeDisabled();
}
async function image_slide_pos(from, to, list){
    for(var i=from;i<to;i++){
        list[i].classList.remove("image-active");
        list[i+1].classList.add("image-active");
        await sleep(40);
    }
    removeDisabled();
}

function activateZero(){
    bar_zero.classList.add("helper-1--active");
    bar_zero_wrap.classList.add("helper-wrap-1--active");
    bar_ninty.classList.remove("helper-2--active");
    bar_ninty_wrap.classList.remove("helper-wrap-2--active");
    bar_oneeighty.classList.remove("helper-3--active");
    bar_oneeighty_wrap.classList.remove("helper-wrap-3--active");
}
function activateNinty(){
    bar_ninty.classList.add("helper-2--active");
    bar_ninty_wrap.classList.add("helper-wrap-2--active");
    bar_zero.classList.remove("helper-1--active");
    bar_zero_wrap.classList.remove("helper-wrap-1--active");
    bar_oneeighty.classList.remove("helper-3--active");
    bar_oneeighty_wrap.classList.remove("helper-wrap-3--active");
}
function activateOneEighty(){
    bar_oneeighty.classList.add("helper-3--active");
    bar_oneeighty_wrap.classList.add("helper-wrap-3--active");
    bar_zero.classList.remove("helper-1--active");
    bar_zero_wrap.classList.remove("helper-wrap-1--active");
    bar_ninty.classList.remove("helper-2--active");
    bar_ninty_wrap.classList.remove("helper-wrap-2--active");
}

function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }