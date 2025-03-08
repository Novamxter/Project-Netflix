export function handleAnswer(){
  document.querySelector(".questions").addEventListener('click',function(event){
    let question = event.target.closest(".question-container")
    if(question){
      let answer = question.querySelector(".answer");
      let plusLarge = question.querySelector('.large-plus-icon')
      let plusSmall = question.querySelector('.small-plus-icon')
      if(answer.style.maxHeight){
        answer.style.maxHeight = null;
        answer.classList.remove("show")
        plusLarge.style.display = "flex"
        plusSmall.style.display = "none"
      }else{
        answer.classList.add("show")
        answer.style.maxHeight = answer.scrollHeight + "px"
        plusSmall.style.display = "flex"
        plusLarge.style.display = "none"
      }
    }
  })
}
