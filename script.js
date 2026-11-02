
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

// EVENT REGISTRATION FUNCTIONALITY

const registrationModal = document.getElementById("registrationModal");
const registrationForm = document.getElementById("registrationForm");

const selectedEvent = document.getElementById("selectedEvent");
const registrationSuccess = document.getElementById("registrationSuccess");
const successMessage = document.getElementById("successMessage");

const registerButton = document.getElementById("registerButton");
const closeRegistration = document.getElementById("closeRegistration");
const finishRegistration = document.getElementById("finishRegistration");

// Open registration form
registerButton.addEventListener("click", () => {
    selectedEvent.value = modalTitle.textContent;

    registrationForm.hidden = false;
    registrationSuccess.hidden = true;

    eventModal.close();
    registrationModal.showModal();
});

// Close registration form
closeRegistration.addEventListener("click", () => {
    registrationModal.close();
});

finishRegistration.addEventListener("click", () => {
    registrationModal.close();
});

// Submit registration
registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!registrationForm.checkValidity()) {
        registrationForm.reportValidity();
        return;
    }

    const registration = {
        name: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        event: selectedEvent.value,
        registrationDate: new Date().toISOString()
    };

    // Save registration in Local Storage
    const registrations = JSON.parse(
        localStorage.getItem("eventoraRegistrations") || "[]"
    );

    registrations.push(registration);

    localStorage.setItem(
        "eventoraRegistrations",
        JSON.stringify(registrations)
    );

    // Display confirmation
    successMessage.textContent =
        `Thank you, ${registration.name}! Your registration for ${registration.event} has been saved.`;

    registrationForm.hidden = true;
    registrationSuccess.hidden = false;
});
