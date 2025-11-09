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

// index.js (or append to your existing index.js)
// Smooth scroll to top and bottom with visibility toggles.

const scrollTopBtn = document.getElementById("scrollTopBtn");
const scrollBottomBtn = document.getElementById("scrollBottomBtn");

if (scrollTopBtn && scrollBottomBtn) {
  const SHOW_AFTER = 200; // px scrolled down before showing top button
  const HIDE_NEAR_BOTTOM = 120; // px from bottom to hide bottom button

  function updateButtons() {
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
    const distanceToBottom = docHeight - (scrolled + winHeight);

    // Show top button after user scrolls down a bit
    if (scrolled > SHOW_AFTER) {
      scrollTopBtn.classList.remove("hidden");
    } else {
      scrollTopBtn.classList.add("hidden");
    }

    // Show bottom button unless near the bottom
    if (distanceToBottom > HIDE_NEAR_BOTTOM) {
      scrollBottomBtn.classList.remove("hidden");
    } else {
      scrollBottomBtn.classList.add("hidden");
    }
  }

  // Smooth scroll helpers
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

  scrollTopBtn.addEventListener("click", () => {
    smoothScrollTo(0);
  });

  scrollBottomBtn.addEventListener("click", () => {
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    smoothScrollTo(docHeight, 450);
  });

  // initial state and listeners
  updateButtons();
  window.addEventListener(
    "scroll",
    () => requestAnimationFrame(updateButtons),
    { passive: true }
  );
  window.addEventListener("resize", () => requestAnimationFrame(updateButtons));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
