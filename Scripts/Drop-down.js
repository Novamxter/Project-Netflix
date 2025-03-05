export function langDropdown(){
  const selector = document.querySelector(".lang-select-container");
  const selectedLang = document.querySelector(".selected-lang");
  const dropdown = document.querySelector(".lang-dropdown");
  const options = document.querySelectorAll(".lang-option");

  // Toggle dropdown on click
  selector.addEventListener("click", function () {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });

  // Select a language
  options.forEach(option => {
    option.addEventListener("click", function(){
      selectedLang.textContent = this.textContent;
      dropdown.style.display = "none"; // Hide dropdown after selection
      console.log(dropdown.style.display)
    });
  });
  // Close dropdown when clicking outside
  document.addEventListener("click", function(event){
    if (!selector.contains(event.target)) {
      dropdown.style.display = "none";
    }
  });
}