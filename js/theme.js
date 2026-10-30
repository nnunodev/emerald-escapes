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
            toggle.title = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
        }
        const themeColour = document.querySelector('meta[name="theme-color"]');
        if (themeColour) {
            themeColour.content = theme === "dark" ? "#101b17" : "#198754";
        }
    }

    function preferredTheme() {
        return selectedTheme || (systemTheme.matches ? "dark" : "light");
    }

    applyTheme(preferredTheme());

    document.addEventListener("DOMContentLoaded", function () {
        applyTheme(preferredTheme());
        const toggle = document.getElementById("themeToggle");
        if (!toggle) return;

        toggle.addEventListener("click", function () {
            const currentTheme = selectedTheme || document.documentElement.getAttribute("data-bs-theme");
            selectedTheme = currentTheme === "dark"
                ? "light" : "dark";
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

    // Keep open pages in step when the preference changes in another tab.
    window.addEventListener("storage", function (event) {
        if (event.key !== storageKey && event.key !== null) return;
        selectedTheme = event.newValue === "dark" || event.newValue === "light"
            ? event.newValue : null;
        applyTheme(preferredTheme());
    });
})();
