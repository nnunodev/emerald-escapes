/* Shared back-to-top button. Hidden until the user has scrolled down. */
(function () {
    const button = document.getElementById("backToTop");
    if (!button) return;

    function updateVisibility() {
        const shouldHide = window.scrollY <= 300;
        // Leave the button rendered so CSS can fade it in and out.
        button.classList.toggle("is-visible", !shouldHide);
        button.setAttribute("aria-hidden", String(shouldHide));
    }

    button.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", updateVisibility, {
        passive: true
    });
    window.addEventListener("resize", updateVisibility);
    window.addEventListener("pageshow", updateVisibility);
    // CSS now handles visibility; the initial hidden attribute prevents a pre-script flash.
    button.hidden = false;
    updateVisibility();
})();
