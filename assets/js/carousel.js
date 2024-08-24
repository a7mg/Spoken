var lang = localStorage.getItem('language') || 'en';

smoothCarousel($('.left-slider'));
smoothCarousel($('.right-slider'), true);

function smoothCarousel(element, rtl = false) {
    element.owlCarousel({
        center: true,
        items: 2,
        loop: true,
        margin: 50,
        nav: false,
        dots: true,
        autoplay: true,
        rtl: rtl,
        autoWidth: true,
        slideTransition: 'linear',
        autoplayTimeout: 6000,
        autoplaySpeed: 6000,
        // autoplayHoverPause: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 2
            },
            1000: {
                items: 2
            }
        }
    });
}