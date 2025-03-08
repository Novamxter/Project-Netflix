const scrollContainer = document.querySelector(".movies-container");
const movies = document.querySelectorAll(".movie");
const gap = 20; // Column gap from CSS
const leftPadding = 5; // Space from the left side
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
    return closestMovie && Math.abs(closestMovie.offsetLeft - scrollContainer.offsetLeft - leftPadding - scrollLeft) < 2;
}

// Function to align movies only if needed
function alignMovies() {
    if (isAligned()) return; // Skip alignment if already in the correct position

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

    // Align the closest movie with a 5px gap from the left
    if (closestMovie) {
        let newScrollLeft = closestMovie.offsetLeft - scrollContainer.offsetLeft - leftPadding;
        
        requestAnimationFrame(() => {
            scrollContainer.scrollTo({ left: newScrollLeft, behavior: "instant" }); // Instant snap prevents lag
        });
    }
}
export function handleScroll(){
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
document.querySelector(".scroll-left-button").addEventListener("click", () => {
    scrollContainer.scrollBy({ left: -120, behavior: "smooth" });
    setTimeout(() => requestAnimationFrame(alignMovies), 200); // Align after animation
});
document.querySelector(".scroll-right-button").addEventListener("click", () => {
    scrollContainer.scrollBy({ left: 120, behavior: "smooth" });
    setTimeout(() => requestAnimationFrame(alignMovies), 200); // Align after animation
});
}


// Detect when scrolling stops (align only if user lifts their finger)
function handleScrollStop() {
    if (!isTouching) {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            requestAnimationFrame(alignMovies);
        }, 100); // Lower delay (100ms) for smoother effect
    }
}

