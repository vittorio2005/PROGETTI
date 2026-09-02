const sections = [...document.querySelectorAll(".sport-section")];
const dots = [...document.querySelectorAll(".nav-dot")];

let currentIndex = 0;
let isScrolling = false;

let touchStartY = 0;
let touchStartX = 0;


/* =========================
   ATTIVAZIONE SEZIONE
========================= */

function setActive(index) {

    if (index < 0 || index >= sections.length) {
        return;
    }

    currentIndex = index;

    sections.forEach((section, i) => {
        section.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
        const active = i === index;

        dot.classList.toggle("active", active);

        dot.setAttribute(
            "aria-current",
            active ? "true" : "false"
        );
    });

    document.body.classList.toggle(
        "scrolled",
        index > 0
    );
}


/* =========================
   CAMBIO SEZIONE
========================= */

function goToSection(index) {

    if (
        index < 0 ||
        index >= sections.length ||
        isScrolling
    ) {
        return;
    }

    isScrolling = true;

    setActive(index);

    sections[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    setTimeout(() => {
        isScrolling = false;
    }, 850);
}


/* =========================
   INTERSECTION OBSERVER
========================= */

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (
                entry.isIntersecting &&
                entry.intersectionRatio >= 0.55
            ) {

                const index =
                    Number(entry.target.dataset.section);

                setActive(index);
            }
        });
    },
    {
        threshold: [0.55, 0.75]
    }
);

sections.forEach((section) => {
    observer.observe(section);
});


/* =========================
   PALLINI NAVIGAZIONE
========================= */

dots.forEach((dot) => {

    dot.addEventListener("click", () => {

        const target =
            Number(dot.dataset.target);

        goToSection(target);
    });
});


/* =========================
   ROTELLA MOUSE
========================= */

window.addEventListener(
    "wheel",
    (event) => {

        if (window.innerWidth <= 700) {
            return;
        }

        if (Math.abs(event.deltaY) < 10) {
            return;
        }

        event.preventDefault();

        if (event.deltaY > 0) {
            goToSection(currentIndex + 1);
        } else {
            goToSection(currentIndex - 1);
        }
    },
    {
        passive: false
    }
);


/* =========================
   SWIPE MOBILE
========================= */

window.addEventListener(
    "touchstart",
    (event) => {

        const touch =
            event.changedTouches[0];

        touchStartY = touch.clientY;
        touchStartX = touch.clientX;
    },
    {
        passive: true
    }
);


window.addEventListener(
    "touchend",
    (event) => {

        const touch =
            event.changedTouches[0];

        const deltaY =
            touchStartY - touch.clientY;

        const deltaX =
            touchStartX - touch.clientX;

        if (
            Math.abs(deltaY) < 45 ||
            Math.abs(deltaY) < Math.abs(deltaX)
        ) {
            return;
        }

        if (deltaY > 0) {
            goToSection(currentIndex + 1);
        } else {
            goToSection(currentIndex - 1);
        }
    },
    {
        passive: true
    }
);


/* =========================
   TASTIERA
========================= */

window.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "ArrowDown" ||
            event.key === "PageDown"
        ) {

            event.preventDefault();

            goToSection(currentIndex + 1);
        }

        if (
            event.key === "ArrowUp" ||
            event.key === "PageUp"
        ) {

            event.preventDefault();

            goToSection(currentIndex - 1);
        }

        if (event.key === "Home") {

            event.preventDefault();

            goToSection(0);
        }

        if (event.key === "End") {

            event.preventDefault();

            goToSection(sections.length - 1);
        }
    }
);


/* =========================
   SCOPRI DI PIÙ
========================= */

document
    .querySelectorAll(".discover-btn")
    .forEach((button) => {

        button.addEventListener("click", () => {

            const section =
                button.closest(".sport-section");

            const title =
                section
                    .querySelector("h1")
                    .textContent
                    .trim();

            alert(
                `${title}\n\nGli orari e i contatti verranno inseriti nella scheda dettagli.`
            );
        });
    });


/* =========================
   STATO INIZIALE
========================= */

setActive(0);