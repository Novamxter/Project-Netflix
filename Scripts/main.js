import {langDropdown} from "./drop-down.js";
import {handleScroll} from "./movie-scroll.js";
import {handleAnswer} from "./handle-answer.js";
import {renderDigits} from "./digits.js";
document.addEventListener("DOMContentLoaded",function(){
  langDropdown()
  handleScroll()
  handleAnswer()
  renderDigits()
});