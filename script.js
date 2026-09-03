/* =========================================================
   STADIO ARTURO COLLANA
   HOMEPAGE — SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTI PRINCIPALI
    ====================================================== */

    const sections = Array.from(
        document.querySelectorAll(".sport-section")
    );

    const dots = Array.from(
        document.querySelectorAll(".nav-dot")
    );

    const discoverButtons = Array.from(
        document.querySelectorAll(".discover-btn")
    );


    /* =====================================================
       CONTROLLO ELEMENTI
    ====================================================== */

    if (!sections.length) {
        return;
    }


    /* =====================================================
       STATO
    ====================================================== */

    let currentSection = 0;

    let isAnimating = false;

    let touchStartY = 0;
    let touchEndY = 0;

    let wheelTimeout = null;


    /* =====================================================
       AGGIORNA SEZIONE ATTIVA
    ====================================================== */

    function updateSection(index, instant = false) {

        if (index < 0 || index >= sections.length) {
            return;
        }

        currentSection = index;


        /* ---------------------------------------------
           Aggiorna sezioni
        ---------------------------------------------- */

        sections.forEach((section, sectionIndex) => {

            section.classList.toggle(
                "active",
                sectionIndex === currentSection
            );

        });


        /* ---------------------------------------------
           Aggiorna pallini
        ---------------------------------------------- */

        dots.forEach((dot, dotIndex) => {

            const isActive = dotIndex === currentSection;

            dot.classList.toggle(
                "active",
                isActive
            );

            dot.setAttribute(
                "aria-current",
                isActive ? "true" : "false"
            );

        });


        /* ---------------------------------------------
           Aggiorna URL senza ricaricare
        ---------------------------------------------- */

        const sport = sections[currentSection]
            .querySelector(".discover-btn")
            ?.dataset.sport;

        if (sport) {

            try {

                const newUrl =
                    `${window.location.pathname}#${sport}`;

                window.history.replaceState(
                    null,
                    "",
                    newUrl
                );

            } catch (error) {

                /* Nessuna azione necessaria */

            }

        }


        /* ---------------------------------------------
           Fine animazione
        ---------------------------------------------- */

        if (!instant) {

            isAnimating = true;

            window.setTimeout(() => {

                isAnimating = false;

            }, 850);

        }

    }


    /* =====================================================
       CAMBIO SEZIONE
    ====================================================== */

    function goToSection(index) {

        if (isAnimating) {
            return;
        }

        if (index === currentSection) {
            return;
        }

        if (
            index < 0 ||
            index >= sections.length
        ) {
            return;
        }

        updateSection(index);

    }


    /* =====================================================
       SEZIONE SUCCESSIVA
    ====================================================== */

    function nextSection() {

        if (currentSection >= sections.length - 1) {
            return;
        }

        goToSection(currentSection + 1);

    }


    /* =====================================================
       SEZIONE PRECEDENTE
    ====================================================== */

    function previousSection() {

        if (currentSection <= 0) {
            return;
        }

        goToSection(currentSection - 1);

    }


    /* =====================================================
       NAVIGAZIONE CON ROTELLA
    ====================================================== */

    function handleWheel(event) {

        event.preventDefault();

        if (isAnimating) {
            return;
        }

        /*
         * Evita che piccoli movimenti della rotella
         * cambino immediatamente pagina.
         */

        if (Math.abs(event.deltaY) < 20) {
            return;
        }

        if (wheelTimeout) {
            return;
        }

        wheelTimeout = window.setTimeout(() => {

            wheelTimeout = null;

        }, 850);


        if (event.deltaY > 0) {

            nextSection();

        } else {

            previousSection();

        }

    }


    window.addEventListener(
        "wheel",
        handleWheel,
        {
            passive: false
        }
    );


    /* =====================================================
       NAVIGAZIONE CON TASTIERA
    ====================================================== */

    function handleKeyboard(event) {

        /*
         * Se l'utente sta usando un campo di testo,
         * non interferiamo con la tastiera.
         */

        const activeElement =
            document.activeElement;

        const tagName =
            activeElement?.tagName?.toLowerCase();

        if (
            tagName === "input" ||
            tagName === "textarea" ||
            tagName === "select"
        ) {
            return;
        }


        switch (event.key) {

            case "ArrowDown":
            case "PageDown":
            case " ":

                event.preventDefault();

                nextSection();

                break;


            case "ArrowUp":
            case "PageUp":

                event.preventDefault();

                previousSection();

                break;


            case "Home":

                event.preventDefault();

                goToSection(0);

                break;


            case "End":

                event.preventDefault();

                goToSection(
                    sections.length - 1
                );

                break;

        }

    }


    document.addEventListener(
        "keydown",
        handleKeyboard
    );


    /* =====================================================
       NAVIGAZIONE CON PALLINI
    ====================================================== */

    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                goToSection(index);

            }
        );

    });


    /* =====================================================
       TOUCH — INIZIO
    ====================================================== */

    document.addEventListener(
        "touchstart",
        (event) => {

            if (!event.touches.length) {
                return;
            }

            touchStartY =
                event.touches[0].clientY;

            touchEndY =
                touchStartY;

        },
        {
            passive: true
        }
    );


    /* =====================================================
       TOUCH — MOVIMENTO
    ====================================================== */

    document.addEventListener(
        "touchmove",
        (event) => {

            if (!event.touches.length) {
                return;
            }

            touchEndY =
                event.touches[0].clientY;

        },
        {
            passive: true
        }
    );


    /* =====================================================
       TOUCH — FINE
    ====================================================== */

    document.addEventListener(
        "touchend",
        () => {

            if (isAnimating) {
                return;
            }

            const difference =
                touchStartY - touchEndY;

            const minimumSwipe = 50;


            if (
                Math.abs(difference) <
                minimumSwipe
            ) {
                return;
            }


            if (difference > 0) {

                nextSection();

            } else {

                previousSection();

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       PULSANTI "SCOPRI DI PIÙ"
    ====================================================== */

    discoverButtons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();


                const sport =
                    button.dataset.sport;


                if (!sport) {
                    return;
                }


                /*
                 * La pagina dedicata viene caricata
                 * passando lo sport tramite query string.
                 *
                 * Esempio:
                 *
                 * attivita.html?sport=arti
                 *
                 */

                window.location.href =
                    `attivita.html?sport=${encodeURIComponent(sport)}`;

            }
        );

    });


    /* =====================================================
       GESTIONE HASH AL CARICAMENTO
    ====================================================== */

    function loadSectionFromHash() {

        const hash =
            window.location.hash
                .replace("#", "")
                .trim()
                .toLowerCase();


        if (!hash) {
            updateSection(0, true);
            return;
        }


        const sectionIndex =
            sections.findIndex((section) => {

                const sport =
                    section
                        .querySelector(".discover-btn")
                        ?.dataset.sport
                        ?.toLowerCase();

                return sport === hash;

            });


        if (sectionIndex >= 0) {

            updateSection(
                sectionIndex,
                true
            );

        } else {

            updateSection(0, true);

        }

    }


    /* =====================================================
       GESTIONE CAMBIO HASH
    ====================================================== */

    window.addEventListener(
        "hashchange",
        () => {

            loadSectionFromHash();

        }
    );


    /* =====================================================
       PRECARICAMENTO IMMAGINI
    ====================================================== */

    function preloadBackgroundImages() {

        const backgroundElements =
            document.querySelectorAll(
                ".sport-bg"
            );


        backgroundElements.forEach(
            (element) => {

                const backgroundImage =
                    window.getComputedStyle(
                        element
                    ).backgroundImage;


                if (
                    !backgroundImage ||
                    backgroundImage === "none"
                ) {
                    return;
                }


                const match =
                    backgroundImage.match(
                        /url\(["']?(.*?)["']?\)/
                    );


                if (!match || !match[1]) {
                    return;
                }


                const image =
                    new Image();

                image.src =
                    match[1];

            }
        );

    }


    /* =====================================================
       INIZIALIZZAZIONE
    ====================================================== */

    loadSectionFromHash();

    preloadBackgroundImages();


    /* =====================================================
       PREVENZIONE DI SCROLL DEL BODY
    ====================================================== */

    document.body.addEventListener(
        "touchmove",
        (event) => {

            /*
             * Manteniamo il controllo dello swipe
             * direttamente sulle sezioni.
             */

            event.preventDefault();

        },
        {
            passive: false
        }
    );


    /* =====================================================
       BLOCCO DOPPIO CLICK SUI PULSANTI
    ====================================================== */

    discoverButtons.forEach((button) => {

        let clicked = false;


        button.addEventListener(
            "click",
            () => {

                if (clicked) {
                    return;
                }

                clicked = true;

                window.setTimeout(
                    () => {
                        clicked = false;
                    },
                    1000
                );

            },
            {
                capture: true
            }
        );

    });

});
