/* =========================================================
   STADIO ARTURO COLLANA
   ATTIVITÀ SPORTIVE — SCRIPT.JS
   ========================================================= */

(function () {
    "use strict";

    function initActivitiesPage() {
        const sections = Array.from(document.querySelectorAll(".sport-section"));
        const dots = Array.from(document.querySelectorAll(".nav-dot"));

        if (!sections.length) return;

        let currentIndex = sections.findIndex(section => section.classList.contains("active"));
        if (currentIndex < 0) currentIndex = 0;

        let navigationLocked = false;
        let touchStartY = 0;
        let touchEndY = 0;

        const NAVIGATION_LOCK_MS = 750;
        const TOUCH_THRESHOLD = 55;

        function clampIndex(index) {
            return Math.max(0, Math.min(index, sections.length - 1));
        }

        function updateSection(index) {
            const nextIndex = clampIndex(index);

            sections.forEach((section, sectionIndex) => {
                const active = sectionIndex === nextIndex;
                section.classList.toggle("active", active);
                section.setAttribute("aria-hidden", active ? "false" : "true");
            });

            dots.forEach((dot, dotIndex) => {
                const active = dotIndex === nextIndex;
                dot.classList.toggle("active", active);
                if (active) dot.setAttribute("aria-current", "true");
                else dot.removeAttribute("aria-current");
            });

            currentIndex = nextIndex;
        }

        function goToSection(index) {
            const nextIndex = clampIndex(index);
            if (navigationLocked || nextIndex === currentIndex) return;

            navigationLocked = true;
            updateSection(nextIndex);
            window.setTimeout(() => { navigationLocked = false; }, NAVIGATION_LOCK_MS);
        }

        function goNext() { goToSection(currentIndex + 1); }
        function goPrevious() { goToSection(currentIndex - 1); }

        window.addEventListener("wheel", event => {
            if (navigationLocked || Math.abs(event.deltaY) < 18) return;
            if (event.deltaY > 0) goNext();
            else goPrevious();
        }, { passive: true });

        window.addEventListener("touchstart", event => {
            if (!event.changedTouches.length) return;
            touchStartY = event.changedTouches[0].screenY;
        }, { passive: true });

        window.addEventListener("touchend", event => {
            if (!event.changedTouches.length) return;
            touchEndY = event.changedTouches[0].screenY;
            const distance = touchEndY - touchStartY;
            if (Math.abs(distance) < TOUCH_THRESHOLD) return;
            if (distance < 0) goNext();
            else goPrevious();
        }, { passive: true });

        window.addEventListener("keydown", event => {
            const target = event.target;
            const isTyping = target && (
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.tagName === "SELECT" ||
                target.isContentEditable
            );
            if (isTyping) return;

            switch (event.key) {
                case "ArrowDown":
                case "PageDown":
                    event.preventDefault();
                    goNext();
                    break;
                case "ArrowUp":
                case "PageUp":
                    event.preventDefault();
                    goPrevious();
                    break;
                case "Home":
                    event.preventDefault();
                    goToSection(0);
                    break;
                case "End":
                    event.preventDefault();
                    goToSection(sections.length - 1);
                    break;
            }
        });

        dots.forEach(dot => {
            dot.addEventListener("click", () => {
                const targetIndex = Number(dot.dataset.target);
                if (!Number.isNaN(targetIndex)) goToSection(targetIndex);
            });
        });

        /*
         * NOTA IMPORTANTE:
         * I tasti "Scopri di più" sono link HTML veri e propri.
         * Qui NON esiste alcun listener che modifica la destinazione.
         */

        updateSection(currentIndex);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initActivitiesPage, { once: true });
    } else {
        initActivitiesPage();
    }
})();
