
// EVENT SEARCH AND CATEGORY FILTER

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const eventCards = document.querySelectorAll(".event-card");

function filterEvents() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    eventCards.forEach((card) => {
        const eventText = card.textContent.toLowerCase();
        const category = card.querySelector(".event-category")
            .textContent.toLowerCase();

        const matchesSearch = eventText.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

searchInput.addEventListener("input", filterEvents);

categoryFilter.addEventListener("change", filterEvents);
