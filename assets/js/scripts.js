/*****************************/
//Global
var
    lang = localStorage.getItem('language') || 'en',
    carousels = [];
//WINDOW EVENTS
$(window)
    .on('load', onWindowLoad)
    .on('resize scroll', onWindowResize)

//DOCUMENT EVENTS
$(document)
    .ready(onDocumentReady)

//FUNCTIONS
function onDocumentReady() {
    if (location.href.includes('127.0.0.1')) {
        $("header").load("partial/header.html");
        $("footer").load("partial/footer.html");
    }
    smoothCarousel($('.left-slider'));
    smoothCarousel($('.right-slider'), true);
    playLottie();
    if (document.getElementById('imagesGrid')) {
        document.getElementById('imagesGrid').play();
    }
}
function onWindowLoad() {
    carousels.forEach(c => { c.trigger('refresh.owl.carousel') });
    window.dispatchEvent(new Event('resize'));

    $('.nav-list > li, .nav-list > li > a, menu div > a').removeClass('active');
    $('.nav-list > li > a, menu div > a').each((i, el) => {
        if ($(el).attr('href').includes(location.pathname)) {
            $(el).parent().addClass('active');
            $(el).addClass('active');
        }
    });
}

function onWindowResize() {
    playLottie();
    $($("section").get().reverse()).each((i, n) => {
        if ($(n).offset().top >= $(window).scrollTop()) {
            $('.nav-list ul a, menu ul a').removeClass('active');
            let target = $('.nav-list ul, menu ul').find('a[href="#' + $(n).attr('id') + '"]');
            if (target) target.addClass('active');
        }
    });
}

$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

function imagesGrid() {
    $('.grid').masonry({
        itemSelector: '.grid-item',
        // percentPosition: true,
        // gutter: 15,
    });
    // var $grid = $('.grid').imagesLoaded(function () {
    //     $grid.masonry({
    //         itemSelector: '.grid-item',
    //         percentPosition: true,
    //         gutter: 20,
    //         columnWidth: '.grid-sizer'
    //     });
    // });
}

function playLottie() {
    $('lottie-player').each(function (i, n) {
        if ($(n).isInViewport()) {
            $(n).get(0).play();
        } else {
            $(n).get(0).stop();
        }
    })
}

// GSAP Smoother
function createSmooth() {
    scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        // lerp: 0.05,
        multiplier: 1,
        class: 'is-reveal',
    });
    scroller.update();
    scroller.on('scroll', (event) => {
        playLottie();
    });
    // scroller.on('call', (func, way, obj) => {
    //     if (func === 'refreshAOS') {
    //         AOS.refresh();
    //     }
    // });
}

// Page Scroll Interactions
function pageScroll() {
    let splitElems = document.querySelectorAll('.split-words')
    splitElems.forEach(function (e, i) {
        if (!e.classList.contains('inview')) {
            if (ScrollTrigger.isInViewport(e)) {
                e.classList.add('inview')
                const splitWords = new SplitText(e, { type: "words" });
                gsap.from(splitWords.words, 0.3, { x: 100, y: 100, autoAlpha: 0 }, 0.05);
            }
        }
    })
}

$(document)
    .on('mouseenter', '.icons-grid .icon', function () {
        var me = $(this);
        let parent = me.parents('.icons');
        parent.find('.icons-grid .icon').removeClass('active');
        me.toggleClass('active');
        parent.find('.icon-large img').attr('src', me.find('img:last').attr('src'));
        parent.find('.icon-large h3').text(me.find('h6').text());
    })
    .on('mouseenter', '.visuals-grid .visual', function () {
        var me = $(this);
        let parent = me.parents('.visuals');
        parent.find('.visuals-grid .visual').removeClass('active');
        me.toggleClass('active');
        parent.find('.visuals-large img').attr('src', me.find('img').attr('src'));
    })
    .on('mouseenter', '.color-list > div', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    })
    .on('click', '.nav-btn', function () {
        $('body').toggleClass('menu-opened');
    })
    .on('click', '.nav-list a, menu ul a', function () {
        if (!$($(this).attr('href')).length) return;
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        })
    })
    .on('click', 'menu a', function () {
        $('body').removeClass('menu-opened');
    })

function smoothCarousel(element, rtl = false) {
    let slider = element.owlCarousel({
        center: true,
        items: 2,
        loop: true,
        margin: 50,
        nav: false,
        dots: true,
        rtl,
        autoWidth: true,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 6000,
        autoplaySpeed: 6000,
        autoplayHoverPause: true,
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
    carousels.push(slider);
}