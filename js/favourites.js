/* Experiences Page - Save to Favourites */

const favouritesCount = document.getElementById("favouritesCount");
const favouriteButtons = document.querySelectorAll(".favourite-btn");
const favouritesHeart = document.getElementById("favouritesHeart");

if (favouritesCount) {

    // Keep saved experience IDs in an ordinary array.
    let favourites = [];
    const validIds = [];

    favouriteButtons.forEach(function (button) {
        validIds.push(button.closest(".experience-card").dataset.id);
    });

    // Restore only recognised IDs and avoid counting duplicates.
    try {
        const storedFavourites = JSON.parse(
            localStorage.getItem("emeraldFavourites") || "[]"
        );
        if (Array.isArray(storedFavourites)) {
            storedFavourites.forEach(function (id) {
                if (validIds.includes(id) && !favourites.includes(id)) {
                    favourites.push(id);
                }
            });
        }
    } catch (error) {
        favourites = [];
    }


    /* Update Favourites Counter */

    function updateFavouritesCount() {

        const count = favourites.length;

        favouritesCount.textContent = "Show favourites (" + count + ")";
        if (count === 0) {
            favouritesHeart.textContent = "♡";
        } else {
            favouritesHeart.textContent = "♥";
        }
        document.dispatchEvent(new Event("favouritesChanged"));
    }


    /* Update Button Appearance */

    function updateButton(button, isSaved) {

        const experienceCard = button.closest(".experience-card");
        experienceCard.dataset.saved = String(isSaved);
        const title = experienceCard.querySelector("h2").textContent.trim();

        if (isSaved) {
            button.setAttribute("aria-label", "Remove " + title + " from favourites");
            button.textContent = "♥ Saved to Favourites";
        } else {
            button.setAttribute("aria-label", "Save " + title + " to favourites");
            button.textContent = "♡ Save to Favourites";
        }

        // Update accessibility attribute
        button.setAttribute("aria-pressed", String(isSaved));

        // Change Bootstrap button colours
        button.classList.toggle("btn-success", isSaved);
        button.classList.toggle("btn-outline-success", !isSaved);

    }


    /* Save Favourites to Browser */

    function saveFavourites() {

        try {
            localStorage.setItem(
                "emeraldFavourites",
                JSON.stringify(favourites)
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
        updateButton(button, favourites.includes(experienceId));

        // Handle button clicks
        button.addEventListener("click", function () {

            // Add or remove the experience
            const favouriteIndex = favourites.indexOf(experienceId);
            if (favouriteIndex === -1) {
                favourites.push(experienceId);
            } else {
                favourites.splice(favouriteIndex, 1);
            }

            // Save changes
            saveFavourites();

            // Update the button
            updateButton(
                button,
                favourites.includes(experienceId)
            );

            // Update the counter
            updateFavouritesCount();

        });
    });

    // Display the initial number of saved experiences
    updateFavouritesCount();
}
