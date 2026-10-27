/* Experiences Page - Save to Favourites */

const favouritesCount = document.getElementById("favouritesCount");
const favouriteButtons = document.querySelectorAll(".favourite-btn");
const favouritesHeart = document.getElementById("favouritesHeart");

if (favouritesCount) {

    // Load saved favourites from localStorage
    let savedFavourites = [];

    try {
        const storedFavourites = JSON.parse(
            localStorage.getItem("emeraldFavourites") || "[]"
        );
        // Only use saved IDs belonging to the current experience list.
        if (Array.isArray(storedFavourites)) {
            const validIds = new Set(Array.from(favouriteButtons, function (button) {
                return button.closest(".experience-card").dataset.id;
            }));
            savedFavourites = storedFavourites.filter(function (id) {
                return validIds.has(id);
            });
        }
    } catch (error) {
        savedFavourites = [];
    }

    const favourites = new Set(savedFavourites);


    /* Update Favourites Counter */

    function updateFavouritesCount() {

        const count = favourites.size;

        favouritesCount.textContent = "Show favourites (" + count + ")";
        favouritesHeart.textContent = count === 0 ? "♡" : "♥";
        document.dispatchEvent(new Event("favouritesChanged"));
    }


    /* Update Button Appearance */

    function updateButton(button, isSaved) {

        const experienceCard = button.closest(".experience-card");
        experienceCard.dataset.saved = String(isSaved);
        const title = experienceCard.querySelector("h2").textContent.trim();
        button.setAttribute("aria-label", isSaved
            ? "Remove " + title + " from favourites"
            : "Save " + title + " to favourites");

        // Update accessibility attribute
        button.setAttribute("aria-pressed", String(isSaved));

        // Change Bootstrap button colours
        button.classList.toggle("btn-success", isSaved);
        button.classList.toggle("btn-outline-success", !isSaved);

        // Change button text
        button.textContent = isSaved ?
            "♥ Saved to Favourites" :
            "♡ Save to Favourites";
    }


    /* Save Favourites to Browser */

    function saveFavourites() {

        try {
            localStorage.setItem(
                "emeraldFavourites",
                JSON.stringify([...favourites])
            );
        } catch (error) {
            console.warn("Unable to save favourites:", error);
        }
    }


    /* Handle Favourite Buttons */

    favouriteButtons.forEach(function (button) {

        // Find the experience associated with the button
        const card = button.closest(".experience-card");
        const experienceId = card.dataset.id;

        // Restore saved button appearance
        updateButton(button, favourites.has(experienceId));

        // Handle button clicks
        button.addEventListener("click", function () {

            // Add or remove the experience
            if (favourites.has(experienceId)) {
                favourites.delete(experienceId);
            } else {
                favourites.add(experienceId);
            }

            // Save changes
            saveFavourites();

            // Update the button
            updateButton(
                button,
                favourites.has(experienceId)
            );

            // Update the counter
            updateFavouritesCount();

            // Keep keyboard focus visible if removing a favourite hides its card.
            if (card.classList.contains("d-none") && document.activeElement === button) {
                document.getElementById("favouritesFilter").focus();
            }
        });
    });

    // Display the initial number of saved experiences
    updateFavouritesCount();
}
