const backToTopButton = document.getElementById("backToTopBtn");
let buttonVisible = false; // Flag to track button visibility


function handleScroll() {
  if (window.pageYOffset > 300 && !buttonVisible) {
    backToTopButton.style.display = "flex";
    buttonVisible = true; // Set flag to prevent further showing
  } else if (window.pageYOffset <= 300 && buttonVisible) {
    backToTopButton.style.display = "none";
    buttonVisible = false; // Reset flag
  }
}

function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

window.addEventListener('load', () => {
  window.addEventListener('scroll', handleScroll);
  backToTopButton.addEventListener('click', goToTop);
});

