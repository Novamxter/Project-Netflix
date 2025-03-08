export function langDropdown() {
  const selectors = document.querySelectorAll(".lang-select-container");

  // Function to update all dropdowns with the stored language
  function updateDropdowns(lang) {
    document.querySelectorAll(".selected-lang").forEach(selectedLang => {
      selectedLang.textContent = lang;
    });
  }

  // Load saved language from localStorage (if available)
  const savedLanguage = localStorage.getItem("selectedLanguage");
  if (savedLanguage) {
    updateDropdowns(savedLanguage);
  }

  selectors.forEach(selector => {
    const selectedLang = selector.querySelector(".selected-lang");
    const dropdown = selector.querySelector(".lang-dropdown");
    const options = selector.querySelectorAll(".lang-option");

    // Toggle dropdown on click
    selector.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent event from bubbling to document
      const isOpen = dropdown.style.display === "block";
      closeAllDropdowns(); // Close other dropdowns
      dropdown.style.display = isOpen ? "none" : "block";
    });

    // Select a language and save to localStorage
    options.forEach(option => {
      option.addEventListener("click", function () {
        const selectedLanguage = this.textContent;
        localStorage.setItem("selectedLanguage", selectedLanguage); // Save selection
        updateDropdowns(selectedLanguage); // Update all dropdowns
        dropdown.style.display = "none"; // Hide dropdown after selection
      });
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", closeAllDropdowns);

  function closeAllDropdowns() {
    document.querySelectorAll(".lang-dropdown").forEach(dropdown => {
      dropdown.style.display = "none";
    });
  }
}