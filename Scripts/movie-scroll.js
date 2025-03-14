const scrollContainer = document.querySelector(".movies-container");
const movies = document.querySelectorAll(".movie");
const leftArrow = document.querySelector(".left-button-container");
const rightArrow = document.querySelector(".right-button-container");
const gap = 20; // Column gap from CSS
const leftPadding = 43; // Space from the left side
let isScrolling;
let isTouching = false; // Tracks if the user is still touching

// Function to check if the scroll position is already correct
function isAligned() {
  let scrollLeft = scrollContainer.scrollLeft;
  let closestMovie = null;
  let closestOffset = Infinity;

  movies.forEach(movie => {
    let movieLeft = movie.offsetLeft - scrollContainer.offsetLeft - scrollLeft;
    let offset = Math.abs(movieLeft - leftPadding);

    if (offset < closestOffset) {
      closestOffset = offset;
      closestMovie = movie;
    }
  });

  // If already aligned, return true; otherwise, return false
  return (
    closestMovie &&
    Math.abs(
      closestMovie.offsetLeft -
        scrollContainer.offsetLeft -
        leftPadding -
        scrollLeft
    ) < 2
  );
}

// Function to align movies only if needed
function alignMovies() {
  if (isAligned()) return; // Skip alignment if already in the correct position

  let scrollLeft = scrollContainer.scrollLeft;
  let closestMovie = null;
  let closestOffset = Infinity;
  let lastMovie = movies[movies.length - 1];

  // Check if last movie is fully visible
  let lastMovieRight = lastMovie.offsetLeft + lastMovie.offsetWidth;
  let containerRight = scrollContainer.scrollLeft + scrollContainer.clientWidth;

  if (lastMovieRight <= containerRight) {
    return; // Don't align if last movie is fully visible
  }

  // Find closest movie to left padding
  movies.forEach(movie => {
    let movieLeft = movie.offsetLeft - scrollContainer.offsetLeft - scrollLeft;
    let offset = Math.abs(movieLeft - leftPadding);

    if (offset < closestOffset) {
      closestOffset = offset;
      closestMovie = movie;
    }
  });

  if (closestMovie) {
    let newScrollLeft =
      closestMovie.offsetLeft - scrollContainer.offsetLeft - leftPadding;

    requestAnimationFrame(() => {
      scrollContainer.scrollTo({ left: newScrollLeft, behavior: "instant" });
    });
  }
}
export function handleScroll() {
  // Detect when user starts scrolling (disable alignment temporarily)
  scrollContainer.addEventListener("touchstart", () => {
    isTouching = true; // User is still holding
    clearTimeout(isScrolling);
  });
  scrollContainer.addEventListener("mousedown", () => {
    isTouching = true;
    clearTimeout(isScrolling);
  });
  // Detect when user lifts their finger (now allow alignment)
  scrollContainer.addEventListener("touchend", () => {
    isTouching = false; // Now allow alignment
    handleScrollStop();
  });
  scrollContainer.addEventListener("mouseup", () => {
    isTouching = false;
    handleScrollStop();
  });
  scrollContainer.addEventListener("mouseleave", () => {
    isTouching = false;
    handleScrollStop();
  });

  // Ensure button clicks also align properly
  document
    .querySelector(".scroll-left-button")
    .addEventListener("click", () => {
      scrollContainer.scrollBy({ left: - getScrollWidth(), behavior: "smooth" });
      setTimeout(() => handleScrollStop(), 500); // Wait for scrolling to settle
    });
  document
    .querySelector(".scroll-right-button")
    .addEventListener("click", () => {
      scrollContainer.scrollBy({ left: getScrollWidth(), behavior: "smooth" });
      setTimeout(() => handleScrollStop(), 500); // Wait for scrolling to settle
    });
  // Scroll event listener
  scrollContainer.addEventListener("scroll", checkScroll);

  // Initial check on load
  checkScroll();
}
// Detect when scrolling stops (align only if user lifts their finger)
function handleScrollStop() {
  if (!isTouching) {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      requestAnimationFrame(() => {
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth <
          scrollContainer.scrollWidth
        ) {
          alignMovies();
        }
      });
    }, 150); // Small delay ensures scrolling completes
  }
}
function checkScroll() {
  let lastMovie = movies[movies.length - 1];
  let lastMovieRight = lastMovie.offsetLeft + lastMovie.offsetWidth;
  let containerRight = scrollContainer.scrollLeft + scrollContainer.clientWidth;

  leftArrow.classList.toggle("disabled", scrollContainer.scrollLeft === 0);
  rightArrow.classList.toggle("disabled", lastMovieRight <= containerRight);
}

function getScrollWidth(){
  let width = scrollContainer.clientWidth-60
  return width
}