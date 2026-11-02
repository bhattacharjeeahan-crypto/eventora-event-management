
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

// EVENT DETAILS FUNCTIONALITY

const eventModal = document.getElementById("eventModal");
const closeModal = document.getElementById("closeModal");

const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalVenue = document.getElementById("modalVenue");
const modalDescription = document.getElementById("modalDescription");

const detailButtons = document.querySelectorAll(".event-button");

detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".event-card");

        const image = card.querySelector("img");
        const category = card.querySelector(".event-category");
        const title = card.querySelector("h3");
        const details = card.querySelectorAll(".event-info p");

        modalImage.src = image.src;
        modalImage.alt = image.alt;
        modalCategory.textContent = category.textContent;
        modalTitle.textContent = title.textContent;
        modalDate.textContent = details[0].textContent;
        modalVenue.textContent = details[1].textContent;
        modalDescription.textContent = details[2].textContent;

        eventModal.showModal();
    });
});

closeModal.addEventListener("click", () => {
    eventModal.close();
});

eventModal.addEventListener("click", (event) => {
    if (event.target === eventModal) {
        eventModal.close();
    }
});
