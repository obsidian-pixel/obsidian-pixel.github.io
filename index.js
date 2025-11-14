// index.js
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const cards = document.querySelectorAll(".card");

function contextSearch() {
  const query = searchInput.value.toLowerCase().trim();

  cards.forEach((card) => {
    const title =
      card.querySelector(".card-title")?.textContent.toLowerCase() || "";
    const meta =
      card.querySelector(".card-meta")?.textContent.toLowerCase() || "";

    if (title.includes(query) || meta.includes(query)) {
      card.style.display = "block"; // visible in grid
    } else {
      card.style.display = "none";
    }
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

// trigger on button click
searchBtn.addEventListener("click", contextSearch);

// trigger on Enter key
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") contextSearch();
});

// optional: live search while typing
searchInput.addEventListener("input", contextSearch);

// Single rotating scroll button
const scrollBtn = document.getElementById("scrollBtn");

if (scrollBtn) {
  const SHOW_AFTER = 200; // px scrolled down before showing button
  const ROTATE_AT = 0.5; // rotate at 50% scroll

  function updateButton() {
    const scrolled = window.scrollY || document.documentElement.scrollTop;
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    const winHeight = window.innerHeight;
    const maxScroll = docHeight - winHeight;
    const scrollPercent = maxScroll > 0 ? scrolled / maxScroll : 0;

    // Show button after scrolling down a bit
    if (scrolled > SHOW_AFTER) {
      scrollBtn.classList.remove("hidden");
    } else {
      scrollBtn.classList.add("hidden");
    }

    // Rotate button at 50% scroll
    if (scrollPercent >= ROTATE_AT) {
      scrollBtn.classList.add("rotate-180");
    } else {
      scrollBtn.classList.remove("rotate-180");
    }
  }

  // Smooth scroll helper
  function smoothScrollTo(y, duration = 450) {
    const start = window.scrollY || document.documentElement.scrollTop;
    const change = y - start;
    const startTime = performance.now();

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuad(progress);
      window.scrollTo(0, Math.round(start + change * eased));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  scrollBtn.addEventListener("click", () => {
    const scrolled = window.scrollY || document.documentElement.scrollTop;
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    const winHeight = window.innerHeight;
    const maxScroll = docHeight - winHeight;
    const scrollPercent = maxScroll > 0 ? scrolled / maxScroll : 0;

    // Scroll to top if in bottom half, scroll to bottom if in top half
    if (scrollPercent >= ROTATE_AT) {
      smoothScrollTo(0);
    } else {
      smoothScrollTo(docHeight);
    }
  });

  // Initial state and listeners
  updateButton();
  window.addEventListener("scroll", () => requestAnimationFrame(updateButton), {
    passive: true,
  });
  window.addEventListener("resize", () => requestAnimationFrame(updateButton));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
