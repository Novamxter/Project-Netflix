const getStartedButtons = document.querySelectorAll(".get-started-button");
const floatingButton = document.querySelector(".floating-get-started-container");
export function floatBtn() {
  floatingButton.classList.remove("hide-btn");
  const observer = new IntersectionObserver(entries => {
    // Check if any button is in the viewport
    const anyVisible = entries.some(entry => entry.isIntersecting);
    // hide floating button only if both are in view
    if (anyVisible) {
      floatingButton.classList.add("hide-btn");
    } else {
      floatingButton.classList.remove("hide-btn");
    }
  }, { threshold: 0.1});
  // Observe both "Get Started" buttons
  getStartedButtons.forEach(button => observer.observe(button));
}