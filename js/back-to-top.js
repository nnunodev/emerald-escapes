/* Shared back-to-top button. Hidden until the visitor has scrolled down. */
(function () {
    const button = document.getElementById("backToTop");
    const topLink = document.querySelector(".navbar-brand");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!button) return;

    function updateVisibility() {
        const shouldHide = window.scrollY <= 300;
        if (shouldHide && document.activeElement === button && topLink) {
            topLink.focus({ preventScroll: true });
        }
        // Leave the button rendered for the fade, but remove hidden controls from interaction.
        button.classList.toggle("is-visible", !shouldHide);
        button.tabIndex = shouldHide ? -1 : 0;
        button.setAttribute("aria-hidden", String(shouldHide));
    }

    button.addEventListener("click", function () {
        // Move keyboard focus back with the viewport so the next Tab starts at the top.
        if (topLink) topLink.focus({ preventScroll: true });
        window.scrollTo({
            top: 0,
            behavior: reducedMotion.matches ? "auto" : "smooth"
        });
    });

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    window.addEventListener("pageshow", updateVisibility);
    // CSS now handles visibility; the initial hidden attribute prevents a pre-script flash.
    button.hidden = false;
    updateVisibility();
})();
