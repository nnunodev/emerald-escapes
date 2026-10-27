/* One shared highlight follows the desktop navigation, then returns to the current page. */
(function () {
    const nav = document.querySelector(".navbar-nav");
    if (!nav) return;

    const links = Array.from(nav.querySelectorAll(".nav-link"));
    const activeLink = nav.querySelector('[aria-current="page"]') || links[0];
    const desktop = window.matchMedia("(min-width: 992px)");
    const indicator = document.createElement("span");
    let hoveredLink = null;
    let instantFrame = null;

    indicator.className = "nav-indicator";
    indicator.setAttribute("aria-hidden", "true");
    nav.appendChild(indicator);

    function positionIndicator(instant = false) {
        nav.classList.toggle("has-nav-indicator", desktop.matches);
        if (!desktop.matches || !activeLink) return;

        const focusedLink = links.find(function (link) {
            return link === document.activeElement;
        });
        const target = hoveredLink || focusedLink || activeLink;
        const bounds = target.getBoundingClientRect();
        const container = nav.getBoundingClientRect();

        cancelAnimationFrame(instantFrame);
        indicator.classList.toggle("is-instant", instant);
        indicator.style.width = bounds.width + "px";
        indicator.style.height = bounds.height + "px";
        indicator.style.transform = "translate(" + (bounds.left - container.left) + "px, "
            + (bounds.top - container.top) + "px)";

        if (instant) {
            // Set the initial position before enabling transitions, avoiding a startup slide.
            indicator.getBoundingClientRect();
            instantFrame = requestAnimationFrame(function () {
                indicator.classList.remove("is-instant");
            });
        }
    }

    links.forEach(function (link) {
        link.addEventListener("pointerenter", function (event) {
            if (event.pointerType === "touch") return;
            hoveredLink = link;
            positionIndicator();
        });
    });

    nav.addEventListener("pointerleave", function () {
        hoveredLink = null;
        positionIndicator();
    });

    nav.addEventListener("focusin", function () {
        hoveredLink = null;
        positionIndicator();
    });

    nav.addEventListener("focusout", function () {
        requestAnimationFrame(function () {
            positionIndicator();
        });
    });

    window.addEventListener("resize", function () {
        hoveredLink = null;
        positionIndicator(true);
    });

    document.fonts.ready.then(function () {
        positionIndicator(true);
    });
    positionIndicator(true);
})();
