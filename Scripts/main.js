import {langDropdown} from "./Drop-down.js";
import {handleScroll} from "./Movie-Scroll.js";
import {handleAnswer} from "./handle-answer.js";
import {renderDigits} from "./digits.js";
document.addEventListener("DOMContentLoaded",function(){
  langDropdown()
  handleScroll()
  handleAnswer()
  renderDigits()
});