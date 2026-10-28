/* Shared light/dark theme. Load in the head to apply it before the page appears. */
(function () {
    const storageKey = "emeraldTheme";
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let selectedTheme = null;
    let activeTransition = null;
    let fallbackFade = null;

    try {
        const savedTheme = localStorage.getItem(storageKey);
        if (savedTheme === "light" || savedTheme === "dark") {
            selectedTheme = savedTheme;
        }
    } catch (error) {
        // The switch still works if browser storage is unavailable.
    }

    function updateTheme(theme) {
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

    function applyTheme(theme, animate = false) {
        if (activeTransition) activeTransition.skipTransition();
        if (fallbackFade) fallbackFade.cancel();

        if (!animate || reducedMotion.matches) {
            updateTheme(theme);
            return;
        }

        // Crossfade the complete appearance so inherited text and surfaces stay in sync.
        if (typeof document.startViewTransition === "function") {
            const transition = document.startViewTransition(function () {
                updateTheme(theme);
            });
            activeTransition = transition;
            // A quick second toggle may intentionally skip the previous snapshot.
            transition.ready.catch(function () {});
            transition.finished.catch(function () {}).finally(function () {
                if (activeTransition === transition) activeTransition = null;
            });
        } else {
            updateTheme(theme);
            // Older browsers still get a brief fade into the selected appearance.
            if (typeof document.documentElement.animate === "function") {
                fallbackFade = document.documentElement.animate(
                    [{ opacity: 0.8 }, { opacity: 1 }],
                    { duration: 220, easing: "ease-out" }
                );
            }
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
            applyTheme(selectedTheme, true);
            try {
                localStorage.setItem(storageKey, selectedTheme);
            } catch (error) {
                // Keep the chosen appearance for this page even without storage.
            }
        });
    });

    systemTheme.addEventListener("change", function () {
        if (!selectedTheme) applyTheme(preferredTheme(), true);
    });

    reducedMotion.addEventListener("change", function () {
        if (reducedMotion.matches) applyTheme(preferredTheme());
    });

    // Keep open pages in step when the preference changes in another tab.
    window.addEventListener("storage", function (event) {
        if (event.key !== storageKey && event.key !== null) return;
        selectedTheme = event.newValue === "dark" || event.newValue === "light"
            ? event.newValue : null;
        applyTheme(preferredTheme(), true);
    });
})();
