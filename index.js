// index.js

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

// trigger on button click
searchBtn.addEventListener("click", contextSearch);

// trigger on Enter key
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") contextSearch();
});

// optional: live search while typing
searchInput.addEventListener("input", contextSearch);
