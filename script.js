/* =========================================================
   STADIO ARTURO COLLANA
   SCRIPT PRINCIPALE
   ========================================================= */


/* =========================================================
   ELEMENTI
   ========================================================= */

const sections = document.querySelectorAll(".sport-section");
const dots = document.querySelectorAll(".nav-dot");

const discoverButtons = document.querySelectorAll(".discover-btn");

const detailsModal = document.getElementById("detailsModal");
const detailsContent = document.getElementById("detailsContent");
const closeDetails = document.getElementById("closeDetails");


/* =========================================================
   STATO
   ========================================================= */

let currentSection = 0;

let isAnimating = false;

let touchStartY = 0;
let touchEndY = 0;


/* =========================================================
   CAMBIO SEZIONE
   ========================================================= */

function goToSection(index) {

    if (index < 0) {
        index = 0;
    }

    if (index >= sections.length) {
        index = sections.length - 1;
    }

    if (index === currentSection || isAnimating) {
        return;
    }

    isAnimating = true;

    sections[currentSection].classList.remove("active");
    dots[currentSection].classList.remove("active");

    currentSection = index;

    sections[currentSection].classList.add("active");
    dots[currentSection].classList.add("active");

    setTimeout(() => {
        isAnimating = false;
    }, 1200);
}


/* =========================================================
   NAVIGAZIONE CON I PALLINI
   ========================================================= */

dots.forEach(dot => {

    dot.addEventListener("click", () => {

        const target = Number(dot.dataset.target);

        goToSection(target);

    });

});


/* =========================================================
   MOUSE WHEEL
   ========================================================= */

window.addEventListener(
    "wheel",
    event => {

        if (detailsModal.classList.contains("open")) {
            return;
        }

        if (isAnimating) {
            return;
        }

        if (event.deltaY > 0) {

            goToSection(currentSection + 1);

        } else if (event.deltaY < 0) {

            goToSection(currentSection - 1);

        }

    },
    { passive: true }
);


/* =========================================================
   TASTIERA
   ========================================================= */

window.addEventListener("keydown", event => {

    if (detailsModal.classList.contains("open")) {

        if (event.key === "Escape") {
            closeModal();
        }

        return;
    }


    if (
        event.key === "ArrowDown" ||
        event.key === "PageDown"
    ) {

        goToSection(currentSection + 1);

    }


    if (
        event.key === "ArrowUp" ||
        event.key === "PageUp"
    ) {

        goToSection(currentSection - 1);

    }

});


/* =========================================================
   TOUCH / SWIPE
   ========================================================= */

window.addEventListener(
    "touchstart",
    event => {

        if (detailsModal.classList.contains("open")) {
            return;
        }

        touchStartY = event.changedTouches[0].screenY;

    },
    { passive: true }
);


window.addEventListener(
    "touchend",
    event => {

        if (detailsModal.classList.contains("open")) {
            return;
        }

        touchEndY = event.changedTouches[0].screenY;

        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const difference = touchStartY - touchEndY;

    const minimumSwipe = 50;


    if (Math.abs(difference) < minimumSwipe) {
        return;
    }


    if (difference > 0) {

        // Swipe verso l'alto
        goToSection(currentSection + 1);

    } else {

        // Swipe verso il basso
        goToSection(currentSection - 1);

    }

}


/* =========================================================
   DATI DELLE ATTIVITÀ
   ========================================================= */

const sportsData = {


    /* -----------------------------------------------------
       ARTI MARZIALI
       ----------------------------------------------------- */

    arti: {

        company: "A.S.D. Il Garofano",

        title: "Arti Marziali",

        content: `

            <div class="course">

                <h3>Ju Jutsu</h3>

                <p>
                    <strong>Corsi:</strong>
                    Amatoriali e adulti
                </p>

                <p>
                    <strong>Giorni:</strong>
                    Martedì e Giovedì
                </p>

                <p>
                    <strong>Orari:</strong>
                    20:30 – 22:30
                </p>

                <p>
                    <strong>Frequenza:</strong>
                    Bisettimanale
                </p>

                <p class="contact">
                    <strong>
                        Maestro Clemente Maria Del Gaudio
                    </strong>
                    <br>
                    <a href="tel:3811835856">
                        📞 381 183 5856
                    </a>
                </p>

                <p>
                    <strong>
                        Responsabile Tecnico:
                    </strong>
                    Maestro M. Dell'Aquila
                </p>

            </div>


            <div class="course">

                <h3>Aikido</h3>

                <p>
                    <strong>Corsi:</strong>
                    Adulti – Maschile e Femminile
                </p>

                <p>
                    <strong>Giorni:</strong>
                    Lunedì, Mercoledì e Venerdì
                </p>

                <p>
                    <strong>Orari:</strong>
                    20:30 – 22:00
                </p>

                <p>
                    <strong>Frequenza:</strong>
                    Trisettimanale
                </p>

                <p class="contact">
                    <strong>
                        Professor Ferdinando Pellegrino
                    </strong>
                    <br>
                    <a href="tel:3356834632">
                        📞 335 683 4632
                    </a>
                </p>

                <p>
                    <strong>
                        Responsabile Tecnico:
                    </strong>
                    Maestro Vacca Corrado
                </p>

            </div>


            <div class="course">

                <h3>BJJ Basic</h3>

                <p>
                    <strong>Corsi:</strong>
                    Basic – Maschile / Femminile
                </p>

                <p>
                    <strong>Giorni:</strong>
                    Martedì e Giovedì
                </p>

                <p>
                    <strong>Orari:</strong>
                    19:00 – 20:30
                </p>

                <p>
                    <strong>Frequenza:</strong>
                    Bisettimanale
                </p>

            </div>


            <div class="course">

                <h3>BJJ Advanced</h3>

                <p>
                    <strong>Corsi:</strong>
                    Advanced – Maschile / Femminile
                </p>

                <p>
                    <strong>Giorni:</strong>
                    Martedì e Giovedì
                </p>

                <p>
                    <strong>Orari:</strong>
                    20:30 – 22:00
                </p>

                <p>
                    <strong>Open Mat:</strong>
                    Sabato · 11:00 – 13:00
                </p>

            </div>


            <div class="course">

                <h3>Grappling Basic – No Gi</h3>

                <p>
                    <strong>Giorni:</strong>
                    Lunedì e Mercoledì
                </p>

                <p>
                    <strong>Orari:</strong>
                    20:30 – 22:30
                </p>

                <p>
                    <strong>Open Mat:</strong>
                    Sabato · 11:00 – 13:00
                </p>

                <p class="contact">

                    <strong>
                        Professor Ferdinando Pellegrino
                    </strong>

                    <br>

                    <a href="tel:3356834632">
                        📞 335 683 4632
                    </a>

                    <br><br>

                    <strong>
                        Responsabile Tecnico:
                    </strong>

                    <br>

                    Maestro Giuseppe Chiapparino

                    <br>

                    <a href="tel:3793809389">
                        📞 379 380 9389
                    </a>

                </p>

            </div>


            <div class="course">

                <h3>Baby Gym</h3>

                <p>
                    <strong>Corsi:</strong>
                    Bambini/e 3–4 anni
                </p>

                <p>
                    <strong>Giorni:</strong>
                    Lunedì e Mercoledì
                </p>

                <p>
                    <strong>Orari:</strong>
                    16:00 – 17:00
                </p>

                <p>
                    <strong>Frequenza:</strong>
                    Bisettimanale
                </p>

                <p class="contact">

                    <strong>
                        Professor Ferdinando Pellegrino
                    </strong>

                    <br>

                    <a href="tel:3356834632">
                        📞 335 683 4632
                    </a>

                    <br><br>

                    <strong>
                        Istruttore Responsabile:
                    </strong>

                    Musella Luca

                </p>

            </div>


            <div class="course">

                <h3>Judo</h3>

                <p>
                    <strong>5–8 anni M/F:</strong>
                    Lunedì, Mercoledì e Venerdì
                    · 17:00 – 18:00
                </p>

                <p>
                    <strong>9–13 anni M/F:</strong>
                    Lunedì, Mercoledì e Venerdì
                    · 18:00 – 19:00
                </p>

                <p>
                    <strong>14+ anni M/F:</strong>
                    Lunedì, Mercoledì e Venerdì
                    · 19:00 – 20:00
                </p>

                <p class="contact">

                    <strong>
                        Professor Ferdinando Pellegrino
                    </strong>

                    <br>

                    <a href="tel:3356834632">
                        📞 335 683 4632
                    </a>

                    <br><br>

                    <strong>
                        Responsabili Tecnici:
                    </strong>

                    <br>

                    Musella Luca / M.L. Capezzuto

                </p>

            </div>


            <div class="course">

                <h3>Karate</h3>

                <p>
                    <strong>5–7 anni M/F:</strong>
                    Martedì e Giovedì
                    · 16:30 – 17:30
                </p>

                <p>
                    <strong>8–10 anni M/F:</strong>
                    Martedì e Giovedì
                    · 17:30 – 18:30
                </p>

                <p>
                    <strong>Agonisti M/F:</strong>
                    Martedì e Giovedì
                    · 18:30 – 19:30
                </p>

                <p>
                    <strong>Adulti M/F:</strong>
                    Martedì e Giovedì
                    · 19:30 – 20:30
                </p>

                <p class="contact">

                    <strong>
                        Maestro Clemente Maria Del Gaudio
                    </strong>

                    <br>

                    <a href="tel:3911835856">
                        📞 391 183 5856
                    </a>

                </p>

            </div>


            <div class="details-note">

                <strong>
                    Documenti necessari
                </strong>

                Certificato medico agonistico
                in corso di validità.

                <br><br>

                <strong>
                    Informazioni
                </strong>

                Per informazioni rivolgersi allo
                Stadio Collana dal Lunedì al Venerdì
                dalle ore 16:00 - +39 338 179 2654

            </div>

        `
    },


    /* -----------------------------------------------------
       ATLETICA
       ----------------------------------------------------- */

    atletica: {

        company: "Stadio Arturo Collana",

        title: "Atletica Leggera",

        content: `

            <div class="course">

                <h3>Corsa libera</h3>

                <p>
                    <strong>Lunedì – Venerdì:</strong>
                    09:00 – 16:00 e 19:00 – 21:00
                </p>

                <p>
                    <strong>Sabato:</strong>
                    09:00 – 19:00
                </p>

                <p>
                    Accesso previo contatto.
                </p>

                <p class="contact">

                    <strong>Contatti</strong><br>

                    <a href="tel:3402229912">
                        📞 Sabbato – 340 222 9912
                    </a>

                    <br>

                    <a href="tel:3203783154">
                        📞 Del Naia – 320 378 3154
                    </a>

                    <br>

                    <a href="tel:3274371029">
                        📞 Rossi – 327 437 1029
                    </a>

                    <br>

                    <a href="tel:3929579764">
                        📞 De Donato – 392 957 9764
                    </a>

                    <br>

                    <a href="tel:3280167970">
                        📞 Forino – 328 016 7970
                    </a>

                    <br>

                    <a href="tel:3400077474">
                        📞 Bevivino – 340 007 7474
                    </a>

                </p>

            </div>

        `
    },


    /* -----------------------------------------------------
       TAEKWONDO
       ----------------------------------------------------- */

    taekwondo: {

        company: "Stadio Arturo Collana",

        title: "Taekwondo",

        content: `

            <div class="course">

                <h3>Corsi</h3>

                <p>
                    <strong>Lunedì · Mercoledì · Venerdì</strong>
                </p>

                <p>
                    Mini Taekwondo · 3 anni
                    · 15:30 – 16:15
                </p>

                <p>
                    Esordienti · 16:30
                </p>

                <p>
                    Pre-agonisti · 17:30
                </p>

                <p>
                    Cadetti · 18:30
                </p>

                <p>
                    Junior / Senior · 19:30
                </p>

                <p>
                    Over60 · Lun/Mer · 09:00 – 10:00
                </p>

                <p>
                    Taekwondonna · 10:00 – 11:00
                </p>

                <p class="contact">

                    <strong>Carmen</strong><br>

                    <a href="tel:3931779047">
                        📞 393 177 9047
                    </a>

                </p>

            </div>

        `
    },


    /* -----------------------------------------------------
       KICKBOXING
       ----------------------------------------------------- */

    kickboxing: {

        company: "Stadio Arturo Collana",

        title: "Kickboxing",

        content: `

            <div class="course">

                <h3>Corsi</h3>

                <p>
                    <strong>Martedì e Giovedì</strong>
                </p>

                <p>
                    Cadetti · 17:00
                </p>

                <p>
                    Junior · 18:00
                </p>

                <p>
                    Senior · 19:00 – 21:00
                </p>

                <p class="contact">

                    <strong>Gianluca Amato</strong><br>

                    <a href="tel:3485659081">
                        📞 348 565 9081
                    </a>

                </p>

            </div>

        `
    },


    /* -----------------------------------------------------
       MMA
       ----------------------------------------------------- */

    mma: {

        company: "Stadio Arturo Collana",

        title: "MMA",

        content: `

            <div class="course">

                <h3>Cadetti</h3>

                <p>
                    Martedì e Giovedì · 16:00
                </p>

            </div>

            <div class="course">

                <h3>Amatori</h3>

                <p>
                    Martedì e Giovedì · 18:00
                </p>

                <p>
                    Sabato · 10:00
                </p>

            </div>

            <div class="course">

                <h3>Agonisti</h3>

                <p>
                    Lunedì · Mercoledì · Venerdì
                    · 20:00
                </p>

                <p>
                    Martedì · Giovedì · 17:00
                </p>

                <p>
                    Sabato · 09:00
                </p>

                <p class="contact">

                    <strong>Gianluca Amato</strong><br>

                    <a href="tel:3485659081">
                        📞 348 565 9081
                    </a>

                </p>

            </div>

        `
    },


    /* -----------------------------------------------------
       PUGILATO
       ----------------------------------------------------- */

    pugilato: {

        company: "Stadio Arturo Collana",

        title: "Pugilato",

        content: `

            <div class="course">

                <h3>Under 12</h3>

                <p>
                    Lunedì · Mercoledì · Venerdì
                    · 16:30
                </p>

            </div>

            <div class="course">

                <h3>Amatori</h3>

                <p>
                    15:00 · 19:00 · 20:00
                </p>

            </div>

            <div class="course">

                <h3>Agonisti</h3>

                <p>
                    17:30
                </p>

                <p class="contact">

                    <strong>Carmela Chiacchio</strong><br>

                    <a href="tel:3922687942">
                        📞 392 268 7942
                    </a>

                </p>

            </div>

        `
    },


    /* -----------------------------------------------------
       GINNASTICA
       ----------------------------------------------------- */

    ginnastica: {

        company: "Stadio Arturo Collana",

        title: "Ginnastica & Acrobatica",

        content: `

            <div class="course">

                <h3>Artistica</h3>

                <p>
                    Lunedì – Venerdì
                    · 15:00 – 21:30
                </p>

            </div>

            <div class="course">

                <h3>Aerea</h3>

                <p>
                    Martedì e Giovedì
                    · 17:45 – 21:45
                </p>

            </div>

            <div class="course">

                <h3>Trampolino / Acrobatica</h3>

                <p>
                    Lunedì e Mercoledì
                    · 18:30 – 21:30
                </p>

            </div>

            <div class="course">

                <h3>Posturale</h3>

                <p>
                    Martedì e Giovedì
                    · 10:30
                </p>

                <p class="contact">

                    <strong>Alberto Savarese</strong><br>

                    <a href="tel:3388123693">
                        📞 338 812 3693
                    </a>

                </p>

            </div>

        `
    },


    /* -----------------------------------------------------
       TENNISTAVOLO
       ----------------------------------------------------- */

    tennistavolo: {

        company: "Stadio Arturo Collana",

        title: "Tennistavolo",

        content: `

            <div class="course">

                <h3>8–14 anni</h3>

                <p>
                    Lunedì e Mercoledì
                </p>

                <p>
                    16:00 – 17:00
                </p>

                <p>
                    17:00 – 18:00
                </p>

            </div>

            <div class="course">

                <h3>Amatori / Veterani</h3>

                <p>
                    Martedì · Giovedì · Venerdì
                </p>

                <p>
                    09:00 – 21:00
                </p>

                <p class="contact">

                    <strong>Giancarlo Rizza</strong><br>

                    <a href="tel:3395235977">
                        📞 339 523 5977
                    </a>

                </p>

            </div>

        `
    },


    /* -----------------------------------------------------
       PISCINA
       ----------------------------------------------------- */

    piscina: {

        company: "Stadio Arturo Collana",

        title: "Piscina",

        content: `

            <div class="course">

                <h3>Attività</h3>

                <p>
                    Scuola Nuoto
                </p>

                <p>
                    Nuoto Adulti
                </p>

                <p>
                    Acquagym
                </p>

                <p>
                    Acquagol
                </p>

                <p>
                    Pentathlon
                </p>

                <p>
                    Triathlon
                </p>

            </div>

            <div class="course">

                <h3>Orari</h3>

                <p>
                    <strong>Lunedì – Venerdì:</strong>
                    07:00 – 20:30
                </p>

                <p>
                    <strong>Sabato:</strong>
                    07:00 – 18:30
                </p>

                <p class="contact">

                    <strong>WhatsApp</strong><br>

                    <a href="https://wa.me/393928172261"
                       target="_blank">
                        💬 392 817 2261
                    </a>

                </p>

            </div>

        `
    },


    /* -----------------------------------------------------
       DANZA
       ----------------------------------------------------- */

    danza: {

        company: "Stadio Arturo Collana",

        title: "Danza & Pilates",

        content: `

            <div class="course">

                <h3>Lunedì · Mercoledì · Venerdì</h3>

                <p>
                    Pilates · 09:00 / 10:00 / 11:00
                </p>

                <p>
                    Pilates · 16:00 / 17:00 /
                    18:00 / 19:00
                </p>

                <p>
                    Caraibiche · 20:00 / 21:00
                </p>

            </div>

            <div class="course">

                <h3>Martedì · Giovedì</h3>

                <p>
                    Balli di Gruppo
                    · 09:00 / 10:00 / 11:00
                    – 20:30
                </p>

                <p>
                    Danza del ventre · 19:30
                </p>

                <p>
                    Tango argentino · 21:30
                </p>

                <p>
                    Danza latine
                    (4–18 anni)
                    · 16:30 / 17:30 / 18:30
                </p>

                <p class="contact">

                    <strong>
                        Giuseppe Frattolillo
                    </strong><br>

                    <a href="tel:330580271">
                        📞 330 580 271
                    </a>

                </p>

            </div>

        `
    }

};


/* =========================================================
   APERTURA MODAL
   ========================================================= */

discoverButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.stopPropagation();

        const sport = button.dataset.sport;

        openModal(sport);

    });

});


function openModal(sport) {

    const data = sportsData[sport];

    if (!data) {
        return;
    }

    detailsContent.innerHTML = `

        <div class="company-name">
            ${data.company}
        </div>

        <h2 class="details-title">
            ${data.title}
        </h2>

        ${data.content}

    `;


    detailsModal.classList.add("open");

    detailsModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow = "hidden";

}


/* =========================================================
   CHIUSURA MODAL
   ========================================================= */

function closeModal() {

    detailsModal.classList.remove("open");

    detailsModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


closeDetails.addEventListener(
    "click",
    closeModal
);


/* Clic sullo sfondo */

document.querySelector(".details-backdrop")
    .addEventListener(
        "click",
        closeModal
    );


/* =========================================================
   BLOCCA LO SWIPE DELLA PAGINA QUANDO IL MODAL È APERTO
   ========================================================= */

detailsModal.addEventListener(
    "touchmove",
    event => {

        if (
            event.target.closest(".details-content")
        ) {
            return;
        }

        event.preventDefault();

    },
    { passive: false }
);


/* =========================================================
   INIZIALIZZAZIONE
   ========================================================= */

sections[0].classList.add("active");
dots[0].classList.add("active");