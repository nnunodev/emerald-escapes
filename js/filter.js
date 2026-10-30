/* Experiences page - combine category, price and favourites filters. */

const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const favouritesFilter = document.getElementById("favouritesFilter");
const clearFilters = document.getElementById("clearFilters");
const cards = document.querySelectorAll(".experience-card");
const noResults = document.getElementById("noResults");
const resultsCount = document.getElementById("resultsCount");
const favouritesHint = document.getElementById("favouritesHint");

// Apply all filters and keep the results and guidance up to date.
function filterExperiences() {

    const selectedCategory = categoryFilter.value;
    const selectedPrice = priceFilter.value;
    const onlyFavourites = favouritesFilter.getAttribute("aria-pressed") === "true";
    let visibleCount = 0;
    let savedCount = 0;

    cards.forEach(function (card) {

        const category = card.dataset.category;
        const price = Number(card.dataset.price);
        const isSaved = card.dataset.saved === "true";
        if (isSaved) savedCount++;

        // Check if the category matches
        const matchesCategory =
            selectedCategory === "all" ||
            selectedCategory === category;

        // Check if the price matches
        let matchesPrice = true;

        if (selectedPrice === "0-100") {
            matchesPrice = price < 100;

        } else if (selectedPrice === "100-200") {
            matchesPrice = price >= 100 && price <= 200;

        } else if (selectedPrice === "200-9999") {
            matchesPrice = price > 200;
        }

        // All active filters must match.
        const matches = matchesCategory && matchesPrice && (!onlyFavourites || isSaved);
        card.classList.toggle("d-none", !matches);
        if (matches) visibleCount++;
    });

    let label = " experiences";
    if (visibleCount === 1) {
        label = " experience";
    }

    let resultText = "Showing " + visibleCount;
    if (onlyFavourites) {
        resultText += " saved";
    }
    resultsCount.textContent = resultText + label;
    noResults.classList.toggle("d-none", visibleCount > 0);

    if (onlyFavourites && savedCount === 0) {
        noResults.textContent = "No favourites saved yet. Switch off Show favourites to browse experiences and save some using their heart buttons.";
    } else if (onlyFavourites) {
        noResults.textContent = "None of your favourites match these filters. Change the category or price, or select Clear filters.";
    } else {
        noResults.textContent = "No experiences match these filters. Try another category or price, or select Clear filters.";
    }

    if (savedCount === 0) {
        favouritesHint.textContent = "Save experiences using the hearts below.";
    } else if (onlyFavourites) {
        favouritesHint.textContent = "Favourites filter on. Select again to turn it off.";
    } else {
        favouritesHint.textContent = "Select to show your saved experiences.";
    }

    clearFilters.disabled = selectedCategory === "all" && selectedPrice === "all" && !onlyFavourites;
}

// Listen for changes to the filters
if (categoryFilter && priceFilter && favouritesFilter) {

    categoryFilter.addEventListener("change", filterExperiences);
    priceFilter.addEventListener("change", filterExperiences);

    favouritesFilter.addEventListener("click", function () {
        const isPressed = favouritesFilter.getAttribute("aria-pressed") === "true";
        favouritesFilter.setAttribute("aria-pressed", String(!isPressed));
        filterExperiences();
    });

    clearFilters.addEventListener("click", function () {
        categoryFilter.value = "all";
        priceFilter.value = "all";
        favouritesFilter.setAttribute("aria-pressed", "false");
        filterExperiences();
    });

    // Update the results after favourites restores or changes saved cards.
    document.addEventListener("favouritesChanged", filterExperiences);

    // Apply filters when the page loads
    filterExperiences();
}
