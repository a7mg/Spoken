/*****************************/
//Global

//WINDOW EVENTS
$(window)
    .on('load', onWindowLoad)
    .on('resize scroll', onWindowResize)

//DOCUMENT EVENTS
$(document)
    .ready(onDocumentReady)

//FUNCTIONS
function onDocumentReady() {
    imagesGrid()
    createSmooth();
    initAos();
    playLottie();
}
function onWindowLoad() {
    // gsap.config({ nullTargetWarn: false })
    // gsap.registerPlugin(ScrollTrigger)
    // gsap.registerPlugin(SplitText)
    // gsap.registerPlugin(ScrollSmoother)
    // createSmooth();
}

function onWindowResize() {

    playLottie();

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
        // initAos();
        // AOS.refresh();
        // setTimeout(() => {
        //     AOS.refresh();
        // }, 300); // Adjust the delay as necessary
    });
    // scroller.on('call', (func, way, obj) => {
    //     if (func === 'refreshAOS') {
    //         AOS.refresh();
    //     }
    // });
}
function initAos() {
    AOS.init({
        easing: "ease-in-out-sine",
        offset: ($(window).height() * 0.3),
        once: true,
        delay: 200,
        // duration: 1e3,
        duration: 700,
        mirror: false,
    });
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
    .on('click', '.icons-grid .icon', function () {
        $('.icons-grid .icon').removeClass('active');
        var me = $(this);
        me.toggleClass('active');
        $('.icon-large img').attr('src', me.find('img').attr('src'));
        $('.icon-large h3').text(me.find('h6').text());
    })