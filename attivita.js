/* =========================================================
   ATTIVITA.JS
   STADIO ARTURO COLLANA
   ========================================================= */


/* =========================================================
   ELEMENTI DOM
   ========================================================= */

const heroImage = document.querySelector(".activity-hero-image");
const storyImage = document.querySelector(".story-image-one");
const coursesBackground = document.querySelector(".courses-background");

const title = document.getElementById("activity-title");
const subtitle = document.getElementById("activity-subtitle");

const activitySociety =
    document.getElementById(
        "activity-society"
    );

const activitySocietyName =
    document.getElementById(
        "activity-society-name"
    );

const descriptionTitle = document.getElementById(
    "activity-description-title"
);

const description = document.getElementById(
    "activity-description"
);

const activityFederations =
    document.getElementById(
        "activity-federations"
    );

const activityFederationsLabel =
    document.getElementById(
        "activity-federations-label"
    );

const activityFederationsLogos =
    document.getElementById(
        "activity-federations-logos"
    );

const coursesContainer = document.getElementById(
    "courses-container"
);

const priceContainer = document.getElementById(
    "price-container"
);

const peopleGrid = document.getElementById(
    "people-grid"
);

const enrollmentContactName =
    document.getElementById(
        "enrollment-contact-name"
    );

const enrollmentContactPhone =
    document.getElementById(
        "enrollment-contact-phone"
    );

const activityContactEmail =
    document.getElementById(
        "activity-contact-email"
    );

const activityContactInstagram =
    document.getElementById(
        "activity-contact-instagram"
    );

const activityContactFacebook =
    document.getElementById(
        "activity-contact-facebook"
    );


/* =========================================================
   SPORT SELEZIONATO
   ========================================================= */

const params = new URLSearchParams(
    window.location.search
);

const sport = params.get("sport") || "arti";


/* =========================================================
   CONTATTI UFFICIALI STADIO ARTURO COLLANA
   ========================================================= */

/*
 * CONTATTI DI DEFAULT
 *
 * Questi campi vengono mostrati SEMPRE.
 * Quando avrai i dati definitivi potrai inserirli
 * direttamente dentro l'oggetto "contacts" della singola
 * attività o della singola ASD/società.
 *
 * Esempio:
 *
 * contacts: {
 *     enrollmentName: "Mario Rossi",
 *     enrollmentPhone: "3331234567",
 *     instagram: "https://instagram.com/...",
 *     facebook: "https://facebook.com/..."
 * }
 */



/* =========================================================
   FEDERAZIONI DI RIFERIMENTO
   ---------------------------------------------------------
   Gli SVG vengono caricati come immagini esterne:
   in questo modo mantengono i colori originali del file.
   Non viene applicato alcun filtro CSS.
========================================================= */

const federationLogosByActivity = {

    atletica: [
        {
            src: "federazione-atletica.jpg",
            alt: "Federazione di riferimento per l'Atletica"
        }
    ],

    arti: [
        {
            src: "federazione-artimarziali.jpg",
            alt: "Federazione di riferimento per le Arti Marziali"
        }
    ],

    taekwondo: [
        {
            src: "federazione-taekwondo.jpg",
            alt: "Federazione di riferimento per il Taekwondo"
        }
    ],

    kickboxing: [
        {
            src: "federazione-kickboxing.jpg",
            alt: "Federazione di riferimento per la Kickboxing"
        }
    ],

    mma: [
        {
            src: "federazione-mma.jpg",
            fallback: "federazione-kickboxing.jpg",
            alt: "Federazione di riferimento per le MMA"
        }
    ],

    pugilato: [
        {
            src: "federazione-pugilato.jpg",
            alt: "Federazione di riferimento per il Pugilato"
        }
    ],

    ginnastica: [
        {
            src: "federazione-ginnastica.jpg",
            alt: "Federazione di riferimento per la Ginnastica"
        }
    ],

    tennistavolo: [
        {
            src: "federazione-tennistavolo.jpg",
            alt: "Federazione di riferimento per il Tennistavolo"
        }
    ],

    piscina: [
        {
            src: "federazione-piscina1.jpg",
            fallback: "federazione-piscina.jpg",
            alt: "Federazione di riferimento per il Triathlon",
            label: "TRIATHLON"
        },
        {
            src: "federazione-piscina2.jpg",
            alt: "Federazione di riferimento per il Pentathlon",
            label: "PENTATHLON"
        }
    ],

    danza: [
        {
            src: "federazione-danza.jpg",
            alt: "Federazione di riferimento per la Danza"
        }
    ]

};

function renderFederationLogos() {

    if (
        !activityFederations ||
        !activityFederationsLogos
    ) {
        return;
    }

    const logos =
        federationLogosByActivity[sport] || [];

    activityFederationsLogos.innerHTML = "";

    activityFederations.classList.toggle(
        "has-multiple-federations",
        logos.length > 1
    );

    if (!logos.length) {

        activityFederations.hidden = true;
        return;

    }

    if (activityFederationsLabel) {

        activityFederationsLabel.textContent =
            logos.length > 1
                ? "FEDERAZIONI DI RIFERIMENTO"
                : "FEDERAZIONE DI RIFERIMENTO";

    }

    activityFederationsLogos.innerHTML =
        logos.map(logo => `

            <div class="federation-logo-card">

                <img
                    class="federation-logo"
                    src="${logo.src}"
                    alt="${logo.alt}"
                    loading="eager"
                    decoding="async"
                    ${logo.fallback ? `data-fallback="${logo.fallback}"` : ""}>

                ${
                    logo.label
                        ? `
                            <span class="federation-logo-name">
                                ${logo.label}
                            </span>
                        `
                        : ""
                }

            </div>

        `).join("");

    activityFederationsLogos
        .querySelectorAll(
            ".federation-logo[data-fallback]"
        )
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    const fallback =
                        image.dataset.fallback;

                    if (
                        fallback &&
                        !image.dataset.fallbackUsed
                    ) {

                        image.dataset.fallbackUsed =
                            "true";

                        image.src =
                            fallback;

                    }

                }
            );

        });

    activityFederations.hidden = false;

}

const defaultActivityContacts = {

    enrollmentName: "",

    enrollmentPhone: "",

    email: "infostadiocollana@gmail.com",

    instagram: "",

    facebook: ""

};


/* =========================================================
   DATI ATTIVITÀ
   ========================================================= */



/* =========================================================
   IMMAGINI DEDICATE MOBILE
   ---------------------------------------------------------
   Le pagine attività singole usano le stesse immagini
   verticali già preparate per l'elenco attività.
   La Piscina mantiene la fotografia desktop originale.
========================================================= */

const mobileActivityImages = {

    atletica:
        "atletica-mobile.jpg",

    arti:
        "artimarziali-mobile.jpg",

    taekwondo:
        "taekwondo-mobile.jpg",

    kickboxing:
        "kickboxing-mobile.jpg",

    mma:
        "mma-mobile.jpg",

    pugilato:
        "pugilato-mobile.jpg",

    ginnastica:
        "ginnastica-mobile.jpg",

    tennistavolo:
        "tennistavolo-mobile.jpg",

    danza:
        "danza-mobile.jpg"

};


function isActivityMobile() {

    return window.matchMedia(
        "(max-width: 700px)"
    ).matches;

}


function getActivityResponsiveImage(
    desktopImage
) {

    if (
        isActivityMobile() &&
        mobileActivityImages[sport]
    ) {

        return mobileActivityImages[sport];

    }

    return desktopImage;

}


const activities = {

    atletica: {

        title: "Atletica",
        subtitle: "Velocità, resistenza e passione.",
        descriptionTitle: "Corri al Collana.",
        description:
            "Scopri le società di atletica presenti allo Stadio Arturo Collana e scegli il percorso più adatto a te.",

        heroImage: "atletica.jpg",
        storyImage: "atletica.jpg",
        coursesImage: "atletica.jpg",

        /*
         * L'Atletica è composta da 6 società.
         * I prezzi verranno inseriti successivamente.
         */

        societies: [

            {
                id: "amatori-atletica-napoli",
                name: "A.P.D. Amatori Atletica Napoli",
                contactRole: "Referente",
                contactName: "Luigi Sabbato",
                phone: "3402229912",

                courses: [
                    {
                        name: "Corsa libera",
                        days: "Lunedì – Venerdì",
                        time: "09:00 – 16:00 / 19:00 – 21:00"
                    },
                    {
                        name: "Corsa libera",
                        days: "Sabato",
                        time: "09:00 – 19:00"
                    }
                ],

                prices: []
            },

            {
                id: "atletica-arenaccia",
                name: "A.S.D. Atletica Arenaccia",
                contactRole: "Referente",
                contactName: "Sandro Del Naia",
                phone: "3203783154",

                courses: [
                    {
                        name: "Corsa libera",
                        days: "Lunedì – Venerdì",
                        time: "09:00 – 16:00 / 19:00 – 21:00"
                    },
                    {
                        name: "Corsa libera",
                        days: "Sabato",
                        time: "09:00 – 19:00"
                    }
                ],

                prices: []
            },

            {
                id: "asa-detur-napoli",
                name: "A.S.D. ASA Detur Napoli",
                contactRole: "Referente",
                contactName: "Vincenzo Rossi",
                phone: "3274371029",

                courses: [
                    {
                        name: "Corsa libera",
                        days: "Lunedì – Venerdì",
                        time: "09:00 – 16:00 / 19:00 – 21:00"
                    },
                    {
                        name: "Corsa libera",
                        days: "Sabato",
                        time: "09:00 – 19:00"
                    }
                ],

                prices: []
            },

            {
                id: "enterprise",
                name: "A.S.D. ENTERPRISE",
                contactRole: "Referente",
                contactName: "Antonella De Donato",
                phone: "3929579764",

                courses: [
                    {
                        name: "Corsa libera",
                        days: "Lunedì – Venerdì",
                        time: "09:00 – 16:00 / 19:00 – 21:00"
                    },
                    {
                        name: "Corsa libera",
                        days: "Sabato",
                        time: "09:00 – 19:00"
                    }
                ],

                prices: []
            },

            {
                id: "la-corsa",
                name: "A.S.D. La Corsa",
                contactRole: "Referente",
                contactName: "Salvatore Forino",
                phone: "3280167970",

                courses: [
                    {
                        name: "Corsa libera",
                        days: "Lunedì – Venerdì",
                        time: "09:00 – 16:00 / 19:00 – 21:00"
                    },
                    {
                        name: "Corsa libera",
                        days: "Sabato",
                        time: "09:00 – 19:00"
                    }
                ],

                prices: []
            },

            {
                id: "atletica-vomero-sankaku",
                name: "A.S.D. ATLETICA VOMERO SANKAKU",
                contactRole: "Referente",
                contactName: "Raffaele Bevivino",
                phone: "3400077474",

                courses: [
                    {
                        name: "Corsa libera",
                        days: "Lunedì – Venerdì",
                        time: "09:00 – 16:00 / 19:00 – 21:00"
                    },
                    {
                        name: "Corsa libera",
                        days: "Sabato",
                        time: "09:00 – 19:00"
                    }
                ],

                prices: []
            }

        ]

    },


    /* =====================================================
       ARTI MARZIALI
       ===================================================== */

    arti: {

        title: "Arti Marziali",

        societyName:
            "A.S.D. Il Garofano",

        subtitle: "Tecnica, disciplina e passione.",
        descriptionTitle: "Disciplina in movimento.",
        description:
            "Scopri i percorsi di arti marziali presenti allo Stadio Arturo Collana e trova la disciplina più adatta a te.",

        heroImage: "arti.jpg",
        storyImage: "arti.jpg",
        coursesImage: "arti.jpg",

        /*
         * CONTATTI A.S.D. IL GAROFANO
         *
         * I nomi delle pagine social sono già noti.
         * I link esatti possono essere aggiunti in seguito
         * senza modificare il layout.
         */
        contacts: {

            enrollmentName:
                "Ferdinando Pellegrino",

            enrollmentPhone:
                "3356834632",

            email:
                "nando.pellegrino61@libero.it",

            instagram:
                "https://www.instagram.com/camcollana?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",

            instagramLabel:
                "Camcollana",

            facebook:
                "https://www.facebook.com/profile.php?id=100075899867655",

            facebookLabel:
                "Camcollana"

        },

        courses: [

            {
                name: "Jiu Jitsu",
                audience: "Amatoriali e adulti",
                days: "Martedì e Giovedì",
                time: "20:30 – 22:30",
                frequency: "Bisettimanale",
                instructor: "Maestro Clemente Maria Del Gaudio",
                phone: "3911835856",
                technicalManager: "Maestro M. Dell'Aquila",
                price: "€50 / mese",
                registration: "€50 iscrizione, tesseramento e assicurazione",
                extra: "Badge €5. Certificato medico agonistico valido. Informazioni presso lo Stadio Collana dal lunedì al venerdì dalle 16:00."
            },

            {
                name: "Aikido",
                audience: "Adulti M/F",
                days: "Lunedì, Mercoledì e Venerdì",
                time: "20:30 – 22:00",
                frequency: "Trisettimanale",
                instructor: "Professor Ferdinando Pellegrino",
                phone: "3356834632",
                technicalManager: "Maestro Vacca Corrado",
                price: "€50 / mese",
                registration: "€30 iscrizione"
            },

            {
                name: "Brazilian Jiu Jitsu (BJJ)",
                audience: "M/F",
                days: "Martedì e Giovedì",
                frequency: "Bisettimanale",
                instructor: "Professor Ferdinando Pellegrino",
                phone: "3356834632",
                technicalManager: "Maestro Giuseppe Chiapparino",
                technicalPhone: "3793809389",
                price: "€55 / mese",
                allAccess: "€75 All Access",
                registration: "€35 iscrizione",
                scheduleLabel: "Scopri livelli e orari",
                schedules: [
                    {
                        label: "Basic",
                        days: "Martedì e Giovedì",
                        time: "19:00 – 20:30"
                    },
                    {
                        label: "Advanced",
                        days: "Martedì e Giovedì",
                        time: "20:30 – 22:00"
                    },
                    {
                        label: "Open Mat",
                        days: "Sabato",
                        time: "11:00 – 13:00"
                    }
                ]
            },

            {
                name: "Grappling Basic No Gi",
                audience: "M/F",
                days: "Lunedì e Mercoledì",
                time: "20:30 – 22:30",
                extra: "Open Mat Sabato 11:00 – 13:00",
                frequency: "Bisettimanale",
                instructor: "Professor Ferdinando Pellegrino",
                phone: "3356834632",
                technicalManager: "Maestro Giuseppe Chiapparino",
                technicalPhone: "3793809389",
                price: "€55 / mese",
                allAccess: "€75 All Access",
                registration: "€35 iscrizione"
            },

            {
                name: "Baby Gym",
                audience: "Bambini 3/4 anni",
                days: "Lunedì e Mercoledì",
                time: "16:00 – 17:00",
                frequency: "Bisettimanale",
                instructor: "Professor Ferdinando Pellegrino",
                phone: "3356834632",
                technicalManager: "Istruttore Responsabile Musella Luca",
                price: "€55 / mese",
                registration: "€30 iscrizione"
            },

            {
                name: "Judo",
                audience: "Bambini, ragazzi e adulti",
                days: "Lunedì, Mercoledì e Venerdì",
                frequency: "Trisettimanale",
                instructor: "Professor Ferdinando Pellegrino",
                phone: "3356834632",
                technicalManager: "Musella Luca / M.L. Capezzuto",
                price: "€60 / mese",
                registration: "€60 iscrizione",
                scheduleLabel: "Scopri gli orari per età",
                schedules: [
                    {
                        label: "5–8 anni",
                        days: "Lunedì, Mercoledì e Venerdì",
                        time: "17:00 – 18:00"
                    },
                    {
                        label: "9–13 anni",
                        days: "Lunedì, Mercoledì e Venerdì",
                        time: "18:00 – 19:00"
                    },
                    {
                        label: "14+ anni",
                        days: "Lunedì, Mercoledì e Venerdì",
                        time: "19:00 – 20:00"
                    }
                ]
            },

            {
                name: "Karate",
                audience: "Bambini, agonisti e adulti",
                days: "Martedì e Giovedì",
                frequency: "Bisettimanale",
                instructor: "Maestro Clemente Maria Del Gaudio",
                phone: "3911835856",
                price: "€60 / mese",
                registration: "€60 iscrizione",
                scheduleLabel: "Scopri gli orari per età",
                schedules: [
                    {
                        label: "5–7 anni",
                        days: "Martedì e Giovedì",
                        time: "16:30 – 17:30"
                    },
                    {
                        label: "8–10 anni",
                        days: "Martedì e Giovedì",
                        time: "17:30 – 18:30"
                    },
                    {
                        label: "Agonisti",
                        days: "Martedì e Giovedì",
                        time: "18:30 – 19:30"
                    },
                    {
                        label: "Adulti",
                        days: "Martedì e Giovedì",
                        time: "19:30 – 20:30"
                    }
                ]
            }

        ]

    },


    /* =====================================================
       TAEKWONDO
       ===================================================== */

    taekwondo: {

        title: "Taekwondo",
        subtitle: "Tecnica, energia e disciplina.",
        descriptionTitle: "Allenati. Cresci. Superati.",
        description:
            "Un percorso sportivo dedicato a bambini, ragazzi e adulti, dalla formazione alla pratica agonistica.",

        heroImage: "taekwondo.jpg",
        storyImage: "taekwondo.jpg",
        coursesImage: "taekwondo.jpg",

        courses: [

            {
                name: "Mini",
                audience: "3 anni",
                days: "Lunedì, Mercoledì e Venerdì",
                time: "15:30 – 16:15",
                instructor: "Carmen",
                phone: "3931779047"
            },

            {
                name: "Esordienti",
                days: "Lunedì, Mercoledì e Venerdì",
                time: "16:30",
                instructor: "Carmen",
                phone: "3931779047"
            },

            {
                name: "Pre-agonisti",
                days: "Lunedì, Mercoledì e Venerdì",
                time: "17:30",
                instructor: "Carmen",
                phone: "3931779047"
            },

            {
                name: "Cadetti",
                days: "Lunedì, Mercoledì e Venerdì",
                time: "18:30",
                instructor: "Carmen",
                phone: "3931779047"
            },

            {
                name: "Junior / Senior",
                days: "Lunedì, Mercoledì e Venerdì",
                time: "19:30",
                instructor: "Carmen",
                phone: "3931779047"
            },

            {
                name: "Over 60",
                days: "Lunedì e Mercoledì",
                time: "09:00 – 10:00",
                instructor: "Carmen",
                phone: "3931779047"
            },

            {
                name: "Taekwondonna",
                days: "Lunedì e Mercoledì",
                time: "10:00 – 11:00",
                instructor: "Carmen",
                phone: "3931779047"
            }

        ]

    },


    /* =====================================================
       KICKBOXING
       ===================================================== */

    kickboxing: {

        title: "Kickboxing",
        subtitle: "Potenza, tecnica e controllo.",
        descriptionTitle: "Metti alla prova te stesso.",
        description:
            "Allenamento e tecnica per chi vuole avvicinarsi alla kickboxing o migliorare le proprie capacità.",

        heroImage: "kickboxing.jpg",
        storyImage: "kickboxing.jpg",
        coursesImage: "kickboxing.jpg",

        courses: [

            {
                name: "Cadetti",
                days: "Martedì e Giovedì",
                time: "17:00",
                instructor: "Gianluca Amato",
                phone: "3485659081"
            },

            {
                name: "Junior",
                days: "Martedì e Giovedì",
                time: "18:00",
                instructor: "Gianluca Amato",
                phone: "3485659081"
            },

            {
                name: "Senior",
                days: "Martedì e Giovedì",
                time: "19:00 – 21:00",
                instructor: "Gianluca Amato",
                phone: "3485659081"
            }

        ]

    },


    /* =====================================================
       MMA
       ===================================================== */

    mma: {

        title: "MMA",
        subtitle: "Tecnica completa. Mentalità da combattente.",
        descriptionTitle: "Combatti con intelligenza.",
        description:
            "Un percorso completo che unisce tecniche di combattimento, preparazione atletica e disciplina.",

        heroImage: "mma.jpg",
        storyImage: "mma.jpg",
        coursesImage: "mma.jpg",

        courses: [

            {
                name: "Cadetti",
                days: "Martedì e Giovedì",
                time: "16:00",
                instructor: "Gianluca Amato",
                phone: "3485659081"
            },

            {
                name: "Amatori",
                days: "Martedì e Giovedì",
                time: "18:00",
                extra: "Sabato 10:00",
                instructor: "Gianluca Amato",
                phone: "3485659081"
            },

            {
                name: "Agonisti",
                days: "Lunedì, Mercoledì e Venerdì",
                time: "20:00",
                extra: "Martedì e Giovedì 17:00 · Sabato 09:00",
                instructor: "Gianluca Amato",
                phone: "3485659081"
            }

        ]

    },


    /* =====================================================
       PUGILATO
       ===================================================== */

    pugilato: {

        title: "Pugilato",
        subtitle: "Tecnica, carattere e determinazione.",
        descriptionTitle: "Impara a combattere.",
        description:
            "Un percorso dedicato a chi vuole avvicinarsi al pugilato, allenarsi o prepararsi all'attività agonistica.",

        heroImage: "pugilato.jpg",
        storyImage: "pugilato.jpg",
        coursesImage: "pugilato.jpg",

        courses: [

            {
                name: "Under 12",
                days: "Lunedì, Mercoledì e Venerdì",
                time: "16:30",
                instructor: "Carmela Chiacchio",
                phone: "3922687942"
            },

            {
                name: "Amatori",
                days: "Lunedì, Mercoledì e Venerdì",
                time: "15:00 · 19:00 · 20:00",
                instructor: "Carmela Chiacchio",
                phone: "3922687942"
            },

            {
                name: "Agonisti",
                days: "Lunedì, Mercoledì e Venerdì",
                time: "17:30",
                instructor: "Carmela Chiacchio",
                phone: "3922687942"
            }

        ]

    },


    /* =====================================================
       GINNASTICA
       ===================================================== */

    ginnastica: {

        title: "Ginnastica",
        subtitle: "Movimento, equilibrio e benessere.",
        descriptionTitle: "Muoviti meglio.",
        description:
            "Scopri i percorsi di ginnastica artistica, aerea, acrobatica e posturale.",

        heroImage: "ginnastica.jpg",
        storyImage: "ginnastica.jpg",
        coursesImage: "ginnastica.jpg",

        courses: [

            {
                name: "Ginnastica Artistica",
                days: "Lunedì – Venerdì",
                time: "15:00 – 21:30",
                instructor: "Alberto Savarese",
                phone: "3388123693"
            },

            {
                name: "Ginnastica Aerea",
                days: "Martedì e Giovedì",
                time: "17:45 – 21:45",
                instructor: "Alberto Savarese",
                phone: "3388123693"
            },

            {
                name: "Trampolino / Acrobatica",
                days: "Lunedì e Mercoledì",
                time: "18:30 – 21:30",
                instructor: "Alberto Savarese",
                phone: "3388123693"
            },

            {
                name: "Posturale",
                days: "Martedì e Giovedì",
                time: "10:30",
                instructor: "Alberto Savarese",
                phone: "3388123693"
            }

        ]

    },


    /* =====================================================
       TENNISTAVOLO
       ===================================================== */

    tennistavolo: {

        title: "Tennistavolo",
        subtitle: "Precisione, velocità e concentrazione.",
        descriptionTitle: "Ogni punto conta.",
        description:
            "Allenati e gioca a tennistavolo, dai più giovani agli amatori e veterani.",

        heroImage: "tennistavolo.jpg",
        storyImage: "tennistavolo.jpg",
        coursesImage: "tennistavolo.jpg",

        courses: [

            {
                name: "Giovani",
                audience: "8–14 anni",
                days: "Lunedì e Mercoledì",
                time: "16:00 – 17:00 / 17:00 – 18:00",
                instructor: "Giancarlo Rizza",
                phone: "3395235977",
                price: "€25 / mese",
                registration:
                    "€10 iscrizione — tesseramento e assicurazione inclusi"
            },

            {
                name: "Amatori / Veterani",
                days: "Lunedì, Martedì, Mercoledì e Giovedì",
                instructor: "Valentina Milano",
                phone: "3388321540",
                price: "€35 / mese",
                registration:
                    "€10 iscrizione — tesseramento e assicurazione inclusi",
                scheduleLabel: "Scopri giorni e orari",
                schedules: [
                    {
                        label: "Pomeriggio",
                        days: "Martedì e Giovedì",
                        time: "15:00 – 21:00"
                    },
                    {
                        label: "Mattina",
                        days: "Lunedì e Mercoledì",
                        time: "09:00 – 13:00"
                    }
                ]
            }

        ]

    },


    /* =====================================================
       PISCINA
       ===================================================== */

    piscina: {

        title: "Piscina",
        subtitle: "Acqua, movimento e benessere.",
        descriptionTitle: "Entra in acqua.",
        description:
            "Scopri le attività della piscina del Collana, dalla scuola nuoto alle discipline dedicate ad adulti e ragazzi.",

        heroImage: "piscina.jpg",
        storyImage: "piscina.jpg",
        coursesImage: "piscina.jpg",

        courses: [

            {
                name: "Scuola Nuoto",
                days: "Lunedì – Venerdì",
                time: "07:00 – 20:30"
            },

            {
                name: "Nuoto Adulti",
                days: "Lunedì – Venerdì",
                time: "07:00 – 20:30"
            },

            {
                name: "Acquagym",
                days: "Lunedì – Venerdì",
                time: "07:00 – 20:30"
            },

            {
                name: "Acquagol",
                days: "Lunedì – Venerdì",
                time: "07:00 – 20:30"
            },

            {
                name: "Pentathlon",
                days: "Lunedì – Venerdì",
                time: "07:00 – 20:30"
            },

            {
                name: "Triathlon",
                days: "Lunedì – Venerdì",
                time: "07:00 – 20:30"
            },

            {
                name: "Attività piscina",
                days: "Sabato",
                time: "07:00 – 18:30"
            }

        ]

    },


    /* =====================================================
       DANZA
       ===================================================== */

    danza: {

        title: "Danza",
        subtitle: "Ritmo, espressione e movimento.",
        descriptionTitle: "Esprimi te stesso.",
        description:
            "Un'ampia proposta di discipline per bambini, ragazzi e adulti.",

        heroImage: "danza.jpg",
        storyImage: "danza.jpg",
        coursesImage: "danza.jpg",

        courses: [

            {
                name: "Pilates",
                days: "Lunedì, Mercoledì e Venerdì",
                time: "09:00 · 10:00 · 11:00 / 16:00 · 17:00 · 18:00 · 19:00",
                instructor: "Giuseppe Frattolillo",
                phone: "330580271"
            },

            {
                name: "Caraibiche",
                days: "Lunedì, Mercoledì e Venerdì",
                time: "20:00 · 21:00",
                instructor: "Giuseppe Frattolillo",
                phone: "330580271"
            },

            {
                name: "Balli di Gruppo",
                days: "Martedì e Giovedì",
                time: "09:00 · 10:00 · 11:00 – 20:30",
                instructor: "Giuseppe Frattolillo",
                phone: "330580271"
            },

            {
                name: "Danza del Ventre",
                days: "Martedì e Giovedì",
                time: "19:30",
                instructor: "Giuseppe Frattolillo",
                phone: "330580271"
            },

            {
                name: "Tango Argentino",
                days: "Martedì e Giovedì",
                time: "21:30",
                instructor: "Giuseppe Frattolillo",
                phone: "330580271"
            },

            {
                name: "Danza Latine",
                audience: "4–18 anni",
                days: "Martedì e Giovedì",
                time: "16:30 · 17:30 · 18:30",
                instructor: "Giuseppe Frattolillo",
                phone: "330580271"
            }

        ]

    }

};


/* =========================================================
   FUNZIONI UTILI
   ========================================================= */

function escapeHTML(value) {

    if (value === undefined || value === null) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function cleanPhone(phone) {

    return String(phone || "")
        .replace(/\s+/g, "")
        .replace(/[^\d+]/g, "");

}


function phoneLink(phone) {

    /*
     * Tutti i numeri presenti nelle schede attività
     * (referenti, istruttori, tecnici, responsabili, ecc.)
     * devono aprire direttamente una conversazione WhatsApp.
     */

    return whatsappLink(phone);
}


/* =========================================================
   LINK WHATSAPP
   ========================================================= */

function whatsappLink(phone) {

    const cleaned = cleanPhone(phone)
        .replace(/^\+/, "");

    if (!cleaned) {
        return "";
    }

    const internationalPhone =
        cleaned.startsWith("39")
            ? cleaned
            : `39${cleaned}`;

    return `https://wa.me/${internationalPhone}`;
}


/* =========================================================
   RENDER STAFF
   ========================================================= */

function renderPerson(person) {

    if (!person) {
        return "";
    }

    const phone = person.phone
        ? `
            <a
                class="person-contact"
                href="${phoneLink(person.phone)}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contatta ${escapeHTML(person.name || person.contactName || "il referente")} su WhatsApp">
                ${escapeHTML(person.phone)}
            </a>
        `
        : "";

    return `

        <article class="person-card">

            <div
                class="person-photo"
                aria-hidden="true">
            </div>

            <div class="person-info">

                <span class="person-role">
                    ${escapeHTML(person.role || person.contactRole || "Staff")}
                </span>

                <h3>
                    ${escapeHTML(person.name || person.contactName)}
                </h3>

                ${
                    person.activity
                        ? `<p>${escapeHTML(person.activity)}</p>`
                        : ""
                }

                ${phone}

            </div>

        </article>

    `;
}


/* =========================================================
   RENDER STAFF NORMALE
   ========================================================= */

function renderPeople(people) {

    if (!peopleGrid) {
        return;
    }

    if (!people || !people.length) {

        peopleGrid.innerHTML = "";

        return;
    }

    peopleGrid.innerHTML = people
        .map(renderPerson)
        .join("");

}


/* =========================================================
   RENDER SOCIETÀ ATLETICA
   ========================================================= */

function renderAthleticsSocieties() {

    if (!coursesContainer) {
        return;
    }

    const activity = activities.atletica;

    if (!activity.societies) {
        return;
    }

    coursesContainer.innerHTML = `

        <div class="athletics-societies">

            <div class="athletics-societies-heading">

                <span class="story-label">
                    SOCIETÀ SPORTIVE
                </span>

                <h3>
                    Scegli la tua società.
                </h3>

                <p>
                    Allo Stadio Arturo Collana sono presenti
                    sei società di atletica. Seleziona una società
                    per visualizzarne corsi, staff, contatti e costi.
                </p>

            </div>

            <div class="athletics-societies-grid">

                ${activity.societies.map((society) => `

                    <article
                        class="athletics-society-card"
                        data-society="${escapeHTML(society.id)}">

                        <span class="society-number">
                            ${String(
                                activity.societies.indexOf(society) + 1
                            ).padStart(2, "0")}
                        </span>

                        <h3>
                            ${escapeHTML(society.name)}
                        </h3>

                        <p>
                            ${escapeHTML(society.contactRole)}
                        </p>

                        <strong>
                            ${escapeHTML(society.contactName)}
                        </strong>

                        <span class="society-arrow">
                            Scopri la società →
                        </span>

                    </article>

                `).join("")}

            </div>

        </div>

    `;

    /*
     * La selezione della società viene gestita
     * successivamente dalla funzione dedicata.
     */

    document
        .querySelectorAll(".athletics-society-card")
        .forEach((card) => {

            card.addEventListener("click", () => {

                const societyId =
                    card.dataset.society;

                selectAthleticsSociety(societyId);

            });

        });

}


/* =========================================================
   SELEZIONE SOCIETÀ ATLETICA
   ========================================================= */

function selectAthleticsSociety(societyId) {

    const activity = activities.atletica;

    const society = activity.societies.find(
        item => item.id === societyId
    );

    if (!society) {
        return;
    }

    /*
     * Memorizziamo la società selezionata nell'URL.
     * In questo modo la pagina può essere condivisa
     * direttamente.
     */

    const newUrl =
        `${window.location.pathname}?sport=atletica&societa=${encodeURIComponent(society.id)}`;

    window.history.pushState(
        {},
        "",
        newUrl
    );

    renderAthleticsSocietyDetail(society);

}


/* =========================================================
   DETTAGLIO SOCIETÀ ATLETICA
   ========================================================= */

function renderAthleticsSocietyDetail(society) {

    if (!society) {
        return;
    }

    /*
     * Titolo principale
     */

    if (title) {
        title.textContent = society.name;
    }

    /*
     * Sottotitolo
     */

    if (subtitle) {
        subtitle.textContent =
            "Atletica allo Stadio Arturo Collana.";
    }

    /*
     * Descrizione
     */

    if (descriptionTitle) {
        descriptionTitle.textContent =
            "Scopri la società.";
    }

    if (description) {

        description.textContent =
            `Scopri i corsi, gli orari, il referente e le informazioni della ${society.name}.`;

    }


    /*
     * Corsi
     */

    if (coursesContainer) {

        coursesContainer.innerHTML = `

            <div class="selected-society">

                <button
                    type="button"
                    class="society-back"
                    id="society-back">

                    ← Torna alle società

                </button>

                <div class="selected-society-header">

                    <span class="story-label">
                        SOCIETÀ SELEZIONATA
                    </span>

                    <h3>
                        ${escapeHTML(society.name)}
                    </h3>

                </div>


                <div class="selected-society-contact">

                    <span>
                        ${escapeHTML(society.contactRole)}
                    </span>

                    <strong>
                        ${escapeHTML(society.contactName)}
                    </strong>

                    ${
                        society.phone
                            ? `
                                <a
                                    href="${whatsappLink(society.phone)}"
                                    class="course-phone"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Contatta ${escapeHTML(society.contactName)} su WhatsApp">

                                    WhatsApp · ${escapeHTML(society.phone)}

                                </a>
                            `
                            : ""
                    }

                </div>


                <div class="society-courses">

                    ${
                        society.courses && society.courses.length
                            ? society.courses.map(course => `

                                <article class="course-card">

                                    <div class="course-main">

                                        <h3>
                                            ${escapeHTML(course.name)}
                                        </h3>

                                        ${
                                            course.audience
                                                ? `
                                                    <p class="course-person">
                                                        ${escapeHTML(course.audience)}
                                                    </p>
                                                `
                                                : ""
                                        }

                                        <p>
                                            ${escapeHTML(course.days)}
                                        </p>

                                        <strong>
                                            ${escapeHTML(course.time)}
                                        </strong>

                                    </div>

                                </article>

                            `).join("")
                            : `
                                <p>
                                    I corsi e gli orari verranno
                                    inseriti prossimamente.
                                </p>
                            `
                    }

                </div>


                <div class="course-medical-note">

                    <span class="course-medical-note-label">
                        N.B.
                    </span>

                    <p>
                        <strong>
                            Documenti necessari per l'iscrizione:
                        </strong>

                        Certificato medico agonistico in corso di validità.
                    </p>

                </div>

            </div>

        `;


        const backButton =
            document.getElementById("society-back");

        if (backButton) {

            backButton.addEventListener(
                "click",
                renderAthleticsSocieties
            );

        }

    }


    /*
     * Costi
     *
     * Per ora non inseriamo prezzi inventati.
     * Verranno aggiunti quando verranno forniti.
     */

    if (priceContainer) {

        if (society.prices && society.prices.length) {

            priceContainer.innerHTML =
                society.prices.map(price => `

                    <div class="price-box">

                        <span>
                            ${escapeHTML(price.label)}
                        </span>

                        <strong>
                            ${escapeHTML(price.value)}
                        </strong>

                    </div>

                `).join("");

        } else {

            priceContainer.innerHTML = `

                <div class="price-box">

                    <span>
                        QUOTA / MENSILE
                    </span>

                    <strong>
                        —
                    </strong>

                    <small>
                        Informazioni sui costi disponibili prossimamente.
                    </small>

                </div>

            `;

        }

    }


    /*
     * STAFF
     *
     * Per l'Atletica mostriamo il referente
     * della singola società.
     */

    renderPeople([

        {
            role: society.contactRole,
            name: society.contactName,
            phone: society.phone
        }

    ]);


    /*
     * Torniamo all'inizio della pagina
     * per rendere evidente la nuova selezione.
     */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   RENDER CORSI
   ========================================================= */

function renderCourses(courses) {

    if (!coursesContainer) {
        return;
    }

    if (!courses || !courses.length) {

        coursesContainer.innerHTML = "";

        return;
    }

    coursesContainer.innerHTML = courses
        .map((course, courseIndex) => `

            <article class="course-card">

                <div class="course-main">

                    <h3>
                        ${escapeHTML(course.name)}
                    </h3>

                    ${
                        course.audience
                            ? `
                                <p class="course-person">
                                    ${escapeHTML(course.audience)}
                                </p>
                            `
                            : ""
                    }

                    <div class="course-detail">

                        ${
                            course.days
                                ? `
                                    <span>
                                        ${escapeHTML(course.days)}
                                    </span>
                                `
                                : ""
                        }

                        ${
                            course.time
                                ? `
                                    <strong>
                                        ${escapeHTML(course.time)}
                                    </strong>
                                `
                                : ""
                        }

                    </div>

                    ${
                        course.frequency
                            ? `
                                <p class="course-extra">
                                    ${escapeHTML(course.frequency)}
                                </p>
                            `
                            : ""
                    }

                    ${
                        course.extra
                            ? `
                                <p class="course-extra">
                                    ${escapeHTML(course.extra)}
                                </p>
                            `
                            : ""
                    }

                    ${
                        course.schedules && course.schedules.length
                            ? `
                                <div class="course-schedule-accordion">

                                    <button
                                        type="button"
                                        class="course-schedule-toggle"
                                        aria-expanded="false"
                                        aria-controls="course-schedule-${courseIndex}">

                                        <span>
                                            ${escapeHTML(
                                                course.scheduleLabel ||
                                                "Scopri gli orari"
                                            )}
                                        </span>

                                        <span
                                            class="course-schedule-arrow"
                                            aria-hidden="true">
                                            ↓
                                        </span>

                                    </button>

                                    <div
                                        class="course-schedule-panel"
                                        id="course-schedule-${courseIndex}"
                                        hidden>

                                        ${course.schedules.map(schedule => `

                                            <div class="course-schedule-row">

                                                <div class="course-schedule-group">

                                                    <strong>
                                                        ${escapeHTML(schedule.label)}
                                                    </strong>

                                                    ${
                                                        schedule.days
                                                            ? `
                                                                <span>
                                                                    ${escapeHTML(schedule.days)}
                                                                </span>
                                                            `
                                                            : ""
                                                    }

                                                </div>

                                                <strong class="course-schedule-time">
                                                    ${escapeHTML(schedule.time)}
                                                </strong>

                                            </div>

                                        `).join("")}

                                    </div>

                                </div>
                            `
                            : ""
                    }

                </div>


                <div class="course-side">

                    ${
                        course.instructor
                            ? `
                                <div class="course-person">

                                    <span>
                                        Istruttore / Referente
                                    </span>

                                    <strong>
                                        ${escapeHTML(course.instructor)}
                                    </strong>

                                    ${
                                        course.phone
                                            ? `
                                                <a
                                                    href="${phoneLink(course.phone)}"
                                                    class="course-phone"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="Contatta ${escapeHTML(course.instructor || "il referente")} su WhatsApp">

                                                    ${escapeHTML(course.phone)}

                                                </a>
                                            `
                                            : ""
                                    }

                                </div>
                            `
                            : ""
                    }


                    ${
                        course.technicalManager
                            ? `
                                <div class="course-person">

                                    <span>
                                        Responsabile tecnico
                                    </span>

                                    <strong>
                                        ${escapeHTML(course.technicalManager)}
                                    </strong>

                                    ${
                                        course.technicalPhone
                                            ? `
                                                <a
                                                    href="${phoneLink(course.technicalPhone)}"
                                                    class="course-phone"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="Contatta ${escapeHTML(course.technicalManager || "il responsabile tecnico")} su WhatsApp">

                                                    ${escapeHTML(course.technicalPhone)}

                                                </a>
                                            `
                                            : ""
                                    }

                                </div>
                            `
                            : ""
                    }


                    ${
                        course.price
                            ? `
                                <div class="course-price">

                                    <span>
                                        QUOTA
                                    </span>

                                    <strong>
                                        ${escapeHTML(course.price)}
                                    </strong>

                                </div>
                            `
                            : ""
                    }


                    ${
                        course.allAccess
                            ? `
                                <div class="course-all-access">
                                    ${escapeHTML(course.allAccess)}
                                </div>
                            `
                            : ""
                    }


                    ${
                        course.registration
                            ? `
                                <div class="course-footer">
                                    ${escapeHTML(course.registration)}
                                </div>
                            `
                            : ""
                    }

                </div>

            </article>

        `)
        .join("");


    coursesContainer.insertAdjacentHTML(
        "beforeend",
        `

            <div class="course-medical-note">

                <span class="course-medical-note-label">
                    N.B.
                </span>

                <p>
                    <strong>
                        Documenti necessari per l'iscrizione:
                    </strong>

                    Certificato medico agonistico in corso di validità.
                </p>

            </div>

        `
    );


    /*
     * Accordion orari:
     * viene attivato solo per i corsi che possiedono
     * l'array "schedules" (BJJ, Judo e Karate).
     */

    coursesContainer
        .querySelectorAll(".course-schedule-toggle")
        .forEach(button => {

            button.addEventListener("click", () => {

                const panelId =
                    button.getAttribute("aria-controls");

                const panel =
                    document.getElementById(panelId);

                if (!panel) {
                    return;
                }

                const isOpen =
                    button.getAttribute("aria-expanded") === "true";

                button.setAttribute(
                    "aria-expanded",
                    String(!isOpen)
                );

                panel.hidden = isOpen;

            });

        });

}


/* =========================================================
   RENDER PREZZI
   ========================================================= */

function renderPrices(activity) {

    if (!priceContainer) {
        return;
    }

    /*
     * Per attività senza prezzi specificati,
     * manteniamo il placeholder.
     */

    const courses =
        activity.courses || [];


    /*
     * CASO SPECIALE: TENNISTAVOLO
     *
     * Mostriamo separatamente la quota dei Giovani
     * e quella di Amatori / Veterani, includendo anche
     * la quota di iscrizione.
     */

    if (activity === activities.tennistavolo) {

        const tableTennisPrices = courses
            .filter(course => course.price);

        if (!tableTennisPrices.length) {

            priceContainer.innerHTML = `

                <div class="price-box">

                    <span>
                        QUOTA / MENSILE
                    </span>

                    <strong>
                        —
                    </strong>

                </div>

            `;

            return;
        }


        priceContainer.innerHTML =
            tableTennisPrices.map(course => `

                <div class="price-box">

                    <span>
                        ${escapeHTML(course.name)}
                    </span>

                    <strong>
                        ${escapeHTML(course.price)}
                    </strong>

                    ${
                        course.registration
                            ? `
                                <small class="price-extra">
                                    ${escapeHTML(course.registration)}
                                </small>
                            `
                            : ""
                    }

                </div>

            `).join("");

        return;
    }


    /*
     * CASO SPECIALE: ARTI MARZIALI
     *
     * Ogni disciplina deve comparire nella sezione Costi
     * anche quando condivide la stessa quota mensile
     * con un'altra attività.
     */

    if (activity === activities.arti) {

        const martialArtsPrices = courses
            .filter(course => course.price);

        if (!martialArtsPrices.length) {

            priceContainer.innerHTML = `

                <div class="price-box">

                    <span>
                        QUOTA / MENSILE
                    </span>

                    <strong>
                        —
                    </strong>

                </div>

            `;

            return;
        }


        priceContainer.innerHTML =
            martialArtsPrices.map(course => `

                <div class="price-box">

                    <span>
                        ${escapeHTML(course.name)}
                    </span>

                    <strong>
                        ${escapeHTML(course.price)}
                    </strong>

                    ${
                        course.allAccess
                            ? `
                                <small class="price-extra">
                                    ${escapeHTML(course.allAccess)}
                                </small>
                            `
                            : ""
                    }

                    ${
                        course.registration
                            ? `
                                <small class="price-extra">
                                    ${escapeHTML(course.registration)}
                                </small>
                            `
                            : ""
                    }

                </div>

            `).join("");

        return;
    }


    /*
     * Tutte le altre attività:
     * manteniamo il comportamento precedente.
     */

    const prices = courses
        .filter(course => course.price)
        .map(course => ({
            label: course.name,
            value: course.price
        }));


    if (!prices.length) {

        priceContainer.innerHTML = `

            <div class="price-box">

                <span>
                    QUOTA / MENSILE
                </span>

                <strong>
                    —
                </strong>

            </div>

        `;

        return;
    }


    /*
     * Evita di ripetere lo stesso prezzo
     * più volte nelle altre attività.
     */

    const uniquePrices = [];

    prices.forEach(price => {

        const exists =
            uniquePrices.some(
                item => item.value === price.value
            );

        if (!exists) {
            uniquePrices.push(price);
        }

    });


    priceContainer.innerHTML =
        uniquePrices.map(price => `

            <div class="price-box">

                <span>
                    ${escapeHTML(price.label)}
                </span>

                <strong>
                    ${escapeHTML(price.value)}
                </strong>

            </div>

        `).join("");

}


/* =========================================================
   CONTATTI STADIO
   ========================================================= */

function setOptionalContactLink(
    element,
    value,
    label,
    type = "url"
) {

    if (!element) {
        return;
    }


    if (value) {

        element.classList.remove(
            "is-placeholder"
        );

        element.removeAttribute(
            "aria-disabled"
        );


        if (type === "email") {

            element.href =
                `mailto:${value}`;

        } else if (type === "whatsapp") {

            element.href =
                whatsappLink(value);

            element.target =
                "_blank";

            element.rel =
                "noopener noreferrer";

        } else {

            element.href =
                value;

            element.target =
                "_blank";

            element.rel =
                "noopener noreferrer";

        }


        element.textContent =
            type === "whatsapp"
                ? value
                : label;

    } else {

        element.classList.add(
            "is-placeholder"
        );

        element.href =
            "#";

        element.setAttribute(
            "aria-disabled",
            "true"
        );

        element.removeAttribute(
            "target"
        );

        element.removeAttribute(
            "rel"
        );

        element.textContent =
            label;

    }

}


function getCurrentActivityContacts(
    activity
) {

    /*
     * Per l'Atletica, quando è selezionata una società,
     * diamo priorità ai contatti della società.
     */

    let societyContacts = {};


    if (
        sport === "atletica" &&
        Array.isArray(activity.societies)
    ) {

        const selectedSociety =
            params.get("societa");


        if (selectedSociety) {

            const society =
                activity.societies.find(
                    item =>
                        item.id ===
                        selectedSociety
                );


            if (
                society &&
                society.contacts
            ) {

                societyContacts =
                    society.contacts;

            }

        }

    }


    return {
        ...defaultActivityContacts,
        ...(activity.contacts || {}),
        ...societyContacts
    };

}


function setupActivityContacts(
    activity
) {

    const contacts =
        getCurrentActivityContacts(
            activity
        );


    /*
     * REFERENTE ISCRIZIONI
     */

    if (enrollmentContactName) {

        enrollmentContactName.textContent =
            contacts.enrollmentName ||
            "Da inserire";

    }


    setOptionalContactLink(
        enrollmentContactPhone,
        contacts.enrollmentPhone,
        contacts.enrollmentPhone
            ? contacts.enrollmentPhone
            : "Numero da inserire",
        "whatsapp"
    );


    /*
     * EMAIL ISTITUZIONALE
     * Rimane sempre visibile.
     */

    if (activityContactEmail) {

        const email =
            contacts.email ||
            defaultActivityContacts.email;

        activityContactEmail.href =
            `mailto:${email}`;

        activityContactEmail.textContent =
            email;

    }


    /*
     * SOCIAL
     *
     * Anche quando non abbiamo ancora il link,
     * la card resta visibile con "Link da inserire".
     */

    setOptionalContactLink(
        activityContactInstagram,
        contacts.instagram,
        contacts.instagram
            ? (
                contacts.instagramLabel ||
                "Apri Instagram"
            )
            : (
                contacts.instagramLabel ||
                "Link da inserire"
            )
    );


    setOptionalContactLink(
        activityContactFacebook,
        contacts.facebook,
        contacts.facebook
            ? (
                contacts.facebookLabel ||
                "Apri Facebook"
            )
            : (
                contacts.facebookLabel ||
                "Link da inserire"
            )
    );

}


/* =========================================================
   PARALLAX
   ========================================================= */

let ticking = false;


function updateParallax() {

    /*
     * Le fotografie verticali mobile sono già composte
     * appositamente per lo schermo del telefono.
     * Evitiamo quindi zoom/parallax che ne altererebbero
     * nuovamente l'inquadratura.
     */

    if (isActivityMobile()) {

        if (heroImage) {
            heroImage.style.transform =
                "none";
        }

        if (storyImage) {
            storyImage.style.transform =
                "none";
        }

        if (coursesBackground) {
            coursesBackground.style.transform =
                "none";
        }

        ticking = false;
        return;
    }


    const scrollY =
        window.scrollY;

    if (heroImage) {

        const heroOffset =
            Math.min(scrollY * 0.15, 100);

        heroImage.style.transform =
            `translate3d(0, ${heroOffset}px, 0) scale(1.05)`;

    }


    if (storyImage) {

        const rect =
            storyImage.getBoundingClientRect();

        const offset =
            (window.innerHeight - rect.top) * 0.04;

        storyImage.style.transform =
            `translate3d(0, ${offset}px, 0) scale(1.05)`;

    }


    if (coursesBackground) {

        const rect =
            coursesBackground.getBoundingClientRect();

        const offset =
            (window.innerHeight - rect.top) * 0.035;

        coursesBackground.style.transform =
            `translate3d(0, ${offset}px, 0) scale(1.05)`;

    }


    ticking = false;

}


function requestParallax() {

    if (!ticking) {

        window.requestAnimationFrame(
            updateParallax
        );

        ticking = true;

    }

}


window.addEventListener(
    "scroll",
    requestParallax,
    { passive: true }
);


/* =========================================================
   INTERSECTION OBSERVER
   ========================================================= */

const sections =
    document.querySelectorAll(
        ".activity-story, .activity-courses, .activity-prices, .activity-people, .activity-video, .activity-location"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "in-view"
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

} else {

    sections.forEach(section => {

        section.classList.add(
            "in-view"
        );

    });

}


/* =========================================================
   SCROLL INDICATOR
   ========================================================= */

const scrollIndicator =
    document.querySelector(
        ".activity-scroll"
    );


if (scrollIndicator) {

    scrollIndicator.addEventListener(
        "click",
        () => {

            const nextSection =
                document.querySelector(
                    ".activity-story"
                );

            if (nextSection) {

                nextSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

}


/* =========================================================
   PRELOAD IMMAGINI
   ========================================================= */

function preloadImage(src) {

    if (!src) {
        return;
    }

    const image =
        new Image();

    image.src = src;

}


/* =========================================================
   INIZIALIZZAZIONE
   ========================================================= */

function initActivityPage() {

    const activity =
        activities[sport];

    if (!activity) {
        return;
    }


    /*
     * Titoli e descrizione
     */

    if (title) {
        title.textContent =
            activity.title;
    }

    if (subtitle) {
        subtitle.textContent =
            activity.subtitle;
    }


    /*
     * Società sportiva nella HERO.
     * Se l'attività non ha ancora una società assegnata,
     * il blocco rimane nascosto.
     */

    if (
        activitySociety &&
        activitySocietyName
    ) {

        if (activity.societyName) {

            activitySocietyName.textContent =
                activity.societyName;

            activitySociety.hidden =
                false;

        } else {

            activitySociety.hidden =
                true;

        }

    }


    if (descriptionTitle) {
        descriptionTitle.textContent =
            activity.descriptionTitle;
    }

    if (description) {
        description.textContent =
            activity.description;
    }


    /*
     * Federazione / Federazioni di riferimento
     */
    renderFederationLogos();


    /*
     * Immagini
     */

    const responsiveHeroImage =
        getActivityResponsiveImage(
            activity.heroImage
        );

    const responsiveStoryImage =
        getActivityResponsiveImage(
            activity.storyImage
        );

    const responsiveCoursesImage =
        getActivityResponsiveImage(
            activity.coursesImage
        );


    if (heroImage && responsiveHeroImage) {

        heroImage.style.backgroundImage =
            `url("${responsiveHeroImage}")`;

        preloadImage(
            responsiveHeroImage
        );

    }


    if (storyImage && responsiveStoryImage) {

        storyImage.style.backgroundImage =
            `url("${responsiveStoryImage}")`;

        preloadImage(
            responsiveStoryImage
        );

    }


    if (
        coursesBackground &&
        responsiveCoursesImage
    ) {

        coursesBackground.style.backgroundImage =
            `url("${responsiveCoursesImage}")`;

        preloadImage(
            responsiveCoursesImage
        );

    }


    /*
     * CASO SPECIALE: ATLETICA
     */

    if (sport === "atletica") {

        const selectedSociety =
            params.get("societa");

        if (selectedSociety) {

            const society =
                activity.societies.find(
                    item =>
                        item.id === selectedSociety
                );

            if (society) {

                renderAthleticsSocietyDetail(
                    society
                );

            } else {

                renderAthleticsSocieties();

            }

        } else {

            renderAthleticsSocieties();

        }

    } else {

        /*
         * Attività normali
         */

        renderCourses(
            activity.courses
        );

        renderPrices(
            activity
        );


        /*
         * Staff
         *
         * Il prossimo passaggio permetterà di
         * definire separatamente lo staff completo
         * di ogni attività.
         */

        if (activity.people) {

            renderPeople(
                activity.people
            );

        } else {

            peopleGrid.innerHTML = "";

        }

    }


    /*
     * Come contattarci
     *
     * Il blocco viene mostrato sempre, anche se alcuni
     * dati non sono ancora disponibili.
     */

    setupActivityContacts(
        activity
    );


    /*
     * Parallax iniziale
     */

    updateParallax();

}


/* =========================================================
   PAGINA MOSTRATA
   ========================================================= */

window.addEventListener(
    "pageshow",
    () => {

        if (!window.location.hash) {

            window.scrollTo(
                0,
                0
            );

        }

    }
);




/* =========================================================
   PULSANTE — TORNA ALLA PAGINA PRECEDENTE
   ---------------------------------------------------------
   Se l'utente arriva da una pagina dello stesso sito,
   torna realmente indietro nella cronologia.
   Se la pagina è stata aperta direttamente, torna
   all'elenco delle attività sportive.
========================================================= */

const globalBackButton =
    document.getElementById(
        "global-back-button"
    );


if (globalBackButton) {

    globalBackButton.addEventListener(
        "click",
        () => {

            let canGoBackInsideSite =
                false;

            if (document.referrer) {

                try {

                    const previousPage =
                        new URL(
                            document.referrer
                        );

                    canGoBackInsideSite =
                        previousPage.origin ===
                        window.location.origin;

                } catch (error) {

                    canGoBackInsideSite =
                        false;

                }

            }


            if (canGoBackInsideSite) {

                window.history.back();

            } else {

                window.location.href =
                    "attivita_sportive.html";

            }

        }
    );

}


/* =========================================================
   AVVIO
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initActivityPage
);
