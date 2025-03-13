const digits = [1,2,3,4,5,6,7,8,9,10]
export function renderDigits(){
  let digitContainers = document.querySelectorAll('.digit')
  // Inject SVGs into each container
  digitContainers.forEach((container, index) => {
    if (digits[index]) {
      container.innerHTML = createSvg(digits[index]);
    }
  });
}
function createSvg(num){
  return `<svg width="100" height="90" xmlns="http://www.w3.org/2000/svg">
    <text x="1" y="70" font-size="var(--digit-font-size)" stroke="white" stroke-width="2" fill="black" class="${num === 4 ? 'four':''} ${num === 8?'eight':''}">
      ${num}
    </text>
  </svg>`
}