var cur_deg = 1;
var cur_index = 10;
var bar_a = document.querySelector(".helper-1");
var bar_a_wrap = document.querySelector(".helper-wrap-1");
var bar_b = document.querySelector(".helper-2");
var bar_b_wrap = document.querySelector(".helper-wrap-2");
var bar_c = document.querySelector(".helper-3");
var bar_c_wrap = document.querySelector(".helper-wrap-3");
var bar_d = document.querySelector(".helper-4");
var bar_d_wrap = document.querySelector(".helper-wrap-4");
var arrow_left_wrap = document.querySelector(".arrow-left-wrap");
var arrow_right_wrap = document.querySelector(".arrow-right-wrap");
var image_list = document.getElementsByClassName("hall-image-switch");
var tooltip_section_a = document.querySelector(".tooltip-a");
var tooltip_section_b = document.querySelector(".tooltip-b");
var tooltip_section_c = document.querySelector(".tooltip-c");
var tooltip_section_d = document.querySelector(".tooltip-d");

function addDisabled(){
    document.querySelector(".arrows-wrap").classList.add("inactive");
    document.querySelector(".helper-wrap").classList.add("inactive");

    bar_a_wrap.removeAttribute("onclick");
    bar_b_wrap.removeAttribute("onclick");
    bar_c_wrap.removeAttribute("onclick");
    bar_d_wrap.removeAttribute("onclick");
    arrow_left_wrap.removeAttribute("onclick");
    arrow_right_wrap.removeAttribute("onclick");
}
function removeDisabled(){
    document.querySelector(".arrows-wrap").classList.remove("inactive");
    document.querySelector(".helper-wrap").classList.remove("inactive");

    bar_a_wrap.setAttribute("onclick", "degA()");
    bar_b_wrap.setAttribute("onclick", "degB()");
    bar_c_wrap.setAttribute("onclick", "degC()");
    bar_d_wrap.setAttribute("onclick", "degD()");
    arrow_left_wrap.setAttribute("onclick", "clickLeft()");
    arrow_right_wrap.setAttribute("onclick", "clickRight()");
}
// A: 10, B:20, C:30, D:0
function clickLeft(){
    addDisabled();
    switch(cur_index){
        case 0:
            activateC();
            break;
        case 10:
            activateD();
            break;
        case 20:
            activateA();
            break;
        case 30:
            activateB();
            break;
          }
    image_slide_neg(image_list);
  }
function clickRight(){
  addDisabled();
  switch(cur_index){
      case 0:
          activateA();
          break;
      case 10:
          activateB();
          break;
      case 20:
          activateC();
          break;
      case 30:
          activateD();
          break;
  }
  image_slide_pos(image_list);
}
// A: 10, B:20, C:30, D:0
function degA(){
    addDisabled();
    switch (cur_index){
        case 20:
          image_slide_neg(image_list);
          break;
        case 30:
          image_slide_neg(image_list);
          image_slide_neg(image_list);
          break;
        case 0:
          image_slide_neg(image_list);
          image_slide_neg(image_list);
          image_slide_neg(image_list);
          break;
        default:
          removeDisabled();
    }
    activateA();
}
// A: 10, B:20, C:30, D:0
function degB(){
  addDisabled();
  switch (cur_index){
      case 10:
        image_slide_pos(image_list);
        break;
      case 30:
        image_slide_neg(image_list);
        break;
      case 0:
        image_slide_neg(image_list);
        image_slide_neg(image_list);
        break;
      default:
        removeDisabled();
  }
  activateB();
}
// A: 10, B:20, C:30, D:0
function degC(){
  addDisabled();
  switch (cur_index){
      case 10:
        image_slide_pos(image_list);
        image_slide_pos(image_list);
        break;
      case 20:
        image_slide_pos(image_list);
        break;
      case 0:
        image_slide_neg(image_list);
        break;
      default:
        removeDisabled();
  }
  activateC();
}
// A: 10, B:20, C:30, D:0
function degD(){
  addDisabled();
  switch (cur_index){
      case 10:
        image_slide_pos(image_list);
        image_slide_pos(image_list);
        image_slide_pos(image_list);
        break;
      case 20:
        image_slide_pos(image_list);
        image_slide_pos(image_list);
        break;
      case 30:
        image_slide_pos(image_list);
        break;
      default:
        removeDisabled();
  }
  activateD();
}

async function image_slide_neg(list){
    for(var i=0; i<10; i++){
      if (cur_index == 0){
        list[cur_index].classList.remove("image-active");
        list[39].classList.add("image-active");
        cur_index = 39;
      }
      else{
        list[cur_index].classList.remove("image-active");
        list[cur_index-1].classList.add("image-active");
        cur_index--;
      }
      await sleep(40);
    }
    removeDisabled();
}
async function image_slide_pos(list){
  for(var i=0; i<10; i++){
    if (cur_index == 39){
      list[cur_index].classList.remove("image-active");
      list[0].classList.add("image-active");
      cur_index = 0;
    }
    else{
      list[cur_index].classList.remove("image-active");
      list[cur_index+1].classList.add("image-active");
      cur_index++;
    }
    await sleep(40);
  }
  removeDisabled();
}
// A: 10, B:20, C:30, D:0
function activateA(){
    bar_a.classList.add("helper-1--active");
    bar_a_wrap.classList.add("helper-wrap-1--active");
    tooltip_section_a.classList.add("tooltip-section--active");
    bar_b.classList.remove("helper-2--active");
    bar_b_wrap.classList.remove("helper-wrap-2--active");
    tooltip_section_b.classList.remove("tooltip-section--active");
    bar_c.classList.remove("helper-3--active");
    bar_c_wrap.classList.remove("helper-wrap-3--active");
    tooltip_section_c.classList.remove("tooltip-section--active");
    bar_d.classList.remove("helper-4--active");
    bar_d_wrap.classList.remove("helper-wrap-4--active");
    tooltip_section_d.classList.remove("tooltip-section--active");
    
}
function activateB(){
    bar_b.classList.add("helper-2--active");
    bar_b_wrap.classList.add("helper-wrap-2--active");
    tooltip_section_b.classList.add("tooltip-section--active");
    bar_a.classList.remove("helper-1--active");
    bar_a_wrap.classList.remove("helper-wrap-1--active");
    tooltip_section_a.classList.remove("tooltip-section--active");
    bar_c.classList.remove("helper-3--active");
    bar_c_wrap.classList.remove("helper-wrap-3--active");
    tooltip_section_c.classList.remove("tooltip-section--active");
    bar_d.classList.remove("helper-4--active");
    bar_d_wrap.classList.remove("helper-wrap-4--active");
    tooltip_section_d.classList.remove("tooltip-section--active");

}
function activateC(){
    bar_c.classList.add("helper-3--active");
    bar_c_wrap.classList.add("helper-wrap-3--active");
    tooltip_section_c.classList.add("tooltip-section--active");
    bar_a.classList.remove("helper-1--active");
    bar_a_wrap.classList.remove("helper-wrap-1--active");
    tooltip_section_a.classList.remove("tooltip-section--active");
    bar_b.classList.remove("helper-2--active");
    bar_b_wrap.classList.remove("helper-wrap-2--active");
    tooltip_section_b.classList.remove("tooltip-section--active");
    bar_d.classList.remove("helper-4--active");
    bar_d_wrap.classList.remove("helper-wrap-4--active");
    tooltip_section_d.classList.remove("tooltip-section--active");
}
function activateD(){
  bar_d.classList.add("helper-4--active");
  bar_d_wrap.classList.add("helper-wrap-4--active");
  tooltip_section_d.classList.add("tooltip-section--active");
  bar_a.classList.remove("helper-1--active");
  bar_a_wrap.classList.remove("helper-wrap-1--active");
  tooltip_section_a.classList.remove("tooltip-section--active");
  bar_b.classList.remove("helper-2--active");
  bar_b_wrap.classList.remove("helper-wrap-2--active");
  tooltip_section_b.classList.remove("tooltip-section--active");
  bar_c.classList.remove("helper-3--active");
  bar_c_wrap.classList.remove("helper-wrap-3--active");
  tooltip_section_c.classList.remove("tooltip-section--active");
}

function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }