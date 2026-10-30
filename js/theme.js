/* Shared light/dark theme. Load in the head to apply it before the page appears. */
(function () {
    const storageKey = "emeraldTheme";
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    let selectedTheme = null;

    try {
        const savedTheme = localStorage.getItem(storageKey);
        if (savedTheme === "light" || savedTheme === "dark") {
            selectedTheme = savedTheme;
        }
    } catch (error) {
        // The switch still works if browser storage is unavailable.
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-bs-theme", theme);
        const toggle = document.getElementById("themeToggle");
        if (toggle) {
            toggle.setAttribute("aria-checked", String(theme === "dark"));
            if (theme === "dark") {
                toggle.title = "Switch to light mode";
            } else {
                toggle.title = "Switch to dark mode";
            }
        }
        const themeColour = document.querySelector('meta[name="theme-color"]');
        if (themeColour) {
            if (theme === "dark") {
                themeColour.content = "#101b17";
            } else {
                themeColour.content = "#198754";
            }
        }
    }

    function preferredTheme() {
        if (selectedTheme) {
            return selectedTheme;
        }
        if (systemTheme.matches) {
            return "dark";
        }
        return "light";
    }

    applyTheme(preferredTheme());

    document.addEventListener("DOMContentLoaded", function () {
        applyTheme(preferredTheme());
        const toggle = document.getElementById("themeToggle");
        if (!toggle) return;

        toggle.addEventListener("click", function () {
            if (selectedTheme === null) {
                selectedTheme = document.documentElement.getAttribute("data-bs-theme");
            }
            if (selectedTheme === "dark") {
                selectedTheme = "light";
            } else {
                selectedTheme = "dark";
            }

            applyTheme(selectedTheme);
            try {
                localStorage.setItem(storageKey, selectedTheme);
            } catch (error) {
                // Keep the chosen appearance for this page even without storage.
            }
        });
    });

    systemTheme.addEventListener("change", function () {
        if (!selectedTheme) applyTheme(preferredTheme());
    });

})();
