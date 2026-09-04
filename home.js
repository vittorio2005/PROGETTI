document.addEventListener("DOMContentLoaded", () => {

    const carousel =
        document.querySelector(".intro-carousel");

    if (!carousel) {
        return;
    }


    const slides =
        Array.from(
            carousel.querySelectorAll(".intro-slide")
        );

    const dots =
        Array.from(
            carousel.querySelectorAll(".intro-carousel-dot")
        );

    const prevButton =
        carousel.querySelector(".intro-carousel-prev");

    const nextButton =
        carousel.querySelector(".intro-carousel-next");


    if (slides.length <= 1) {
        return;
    }


    let currentIndex = 0;
    let autoplayTimer = null;
    let touchStartX = 0;
    let touchEndX = 0;

    const AUTOPLAY_DELAY = 5000;


    function showSlide(index) {

        currentIndex =
            (index + slides.length) % slides.length;


        slides.forEach((slide, slideIndex) => {

            const isActive =
                slideIndex === currentIndex;

            slide.classList.toggle(
                "active",
                isActive
            );

        });


        dots.forEach((dot, dotIndex) => {

            const isActive =
                dotIndex === currentIndex;

            dot.classList.toggle(
                "active",
                isActive
            );


            if (isActive) {

                dot.setAttribute(
                    "aria-current",
                    "true"
                );

            } else {

                dot.removeAttribute(
                    "aria-current"
                );

            }

        });

    }


    function nextSlide() {

        showSlide(
            currentIndex + 1
        );

    }


    function previousSlide() {

        showSlide(
            currentIndex - 1
        );

    }


    function stopAutoplay() {

        if (autoplayTimer) {

            window.clearInterval(
                autoplayTimer
            );

            autoplayTimer = null;

        }

    }


    function startAutoplay() {

        stopAutoplay();

        autoplayTimer =
            window.setInterval(
                nextSlide,
                AUTOPLAY_DELAY
            );

    }


    function restartAutoplay() {

        startAutoplay();

    }


    prevButton?.addEventListener(
        "click",
        () => {

            previousSlide();

            restartAutoplay();

        }
    );


    nextButton?.addEventListener(
        "click",
        () => {

            nextSlide();

            restartAutoplay();

        }
    );


    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                showSlide(index);

                restartAutoplay();

            }
        );

    });


    carousel.addEventListener(
        "mouseenter",
        stopAutoplay
    );


    carousel.addEventListener(
        "mouseleave",
        startAutoplay
    );


    carousel.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    carousel.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;

            const distance =
                touchEndX - touchStartX;


            if (Math.abs(distance) < 45) {
                return;
            }


            if (distance < 0) {

                nextSlide();

            } else {

                previousSlide();

            }


            restartAutoplay();

        },
        { passive: true }
    );


    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                stopAutoplay();

            } else {

                startAutoplay();

            }

        }
    );


    showSlide(0);

    startAutoplay();

});