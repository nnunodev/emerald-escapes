/* Shared light/dark theme. Load in the head to apply it before the page appears. */
(function () {
    const storageKey = "emeraldTheme";
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    let selectedTheme = null;

    function saveTheme() {
        try {
            localStorage.setItem(storageKey, selectedTheme);
        } catch (error) {
            // Local links still carry the choice when browser storage is blocked.
        }
    }

    function updateLocalLinks(theme) {
        if (location.protocol !== "file:" || selectedTheme === null) return;

        // Browsers may give each local HTML file its own storage.
        // Carry the choice in the address when opening another page offline.
        history.replaceState(null, "", "#theme=" + theme);
        const links = document.querySelectorAll("a[href]");
        links.forEach(function (link) {
            const url = new URL(link.href);
            if (url.protocol === "file:" && url.pathname.endsWith(".html")) {
                url.hash = "theme=" + theme;
                link.href = url.href;
            }
        });
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-bs-theme", theme);
        updateLocalLinks(theme);
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

    function loadTheme(fromLink) {
        try {
            const savedTheme = localStorage.getItem(storageKey);
            if (savedTheme === "light" || savedTheme === "dark") {
                selectedTheme = savedTheme;
            } else {
                selectedTheme = null;
            }
        } catch (error) {
            // Keep the current choice if browser storage is unavailable.
        }
        if (fromLink === true && location.protocol === "file:") {
            const linkedTheme = location.hash.slice(1);
            if (linkedTheme === "theme=light" || linkedTheme === "theme=dark") {
                selectedTheme = linkedTheme.slice(6);
                saveTheme();
            }
        }
        applyTheme(preferredTheme());
    }

    loadTheme(true);

    document.addEventListener("DOMContentLoaded", function () {
        loadTheme(true);
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
            saveTheme();
        });
    });

    systemTheme.addEventListener("change", function () {
        if (!selectedTheme) applyTheme(preferredTheme());
    });

    // Update other open pages when the saved theme changes.
    window.addEventListener("storage", function (event) {
        if (event.key === storageKey || event.key === null) {
            loadTheme();
        }
    });

    // Restore the latest choice when returning with Back or Forward.
    window.addEventListener("pageshow", function () {
        loadTheme(true);
    });

})();
