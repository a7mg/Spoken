var isMobile = (function (a) { return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)) })(navigator.userAgent || navigator.vendor || window.opera);

/***************************************************************************
 * Scroll 
 * *************************/
function windowLoaded() {
    $('#loading').removeClass('white').addClass('img_hide').addClass('scale');
    setTimeout(() => {
        // $('html').addClass('is-ready');
    }, 1000);
}
$(window).on('load', function () {
    windowLoaded();
    setTimeout(() => {
        smoothScroll();
        if ($('.home-page').length) {
            parallex();
            scrollAnimate();
        }
    }, 1000);
})
var scroller;
function smoothScroll() {
    if (!isMobile || true) {
        $("body").niceScroll({
            background: "white",
            cursorcolor: "#7A52F6",
            cursorborder: "0",
            cursorborderradius: "5px",
            cursorwidth: "8px",
            scrollspeed: 250,
            zindex: 999,
            autohidemode: false
        });
    }
}
function parallex() {
    // ScrollMagic
    var controller = new ScrollMagic.Controller();
    var slides = $('.home-section:not(.investing-section):not(.blog-news)');
    for (var i = 0; i < slides.length; i++) {
        var scrollScene = new ScrollMagic.Scene({
            triggerElement: slides[i],
            triggerHook: 'onLeave'
        })
            .setPin(slides[i])
            .addTo(controller);
    }
    // GSAP
    // gsap.utils.toArray(".home-section:not(.investing-section)").forEach((panel, i) => {
    //     ScrollTrigger.create({
    //         trigger: panel,
    //         start: "top top",
    //         pin: true,
    //         pinSpacing: false,
    //         anticipatePin: 1,
    //         scrub: true,
    //         invalidateOnRefresh: true,
    //     });
    // });
}
function scrollAnimate() {
    gsap.registerPlugin(ScrollTrigger);

    var heroInfo = gsap.timeline();
    heroInfo.staggerFrom(
        new SplitText(".hero-info h3", { type: "words" }).words, 0.5,
        { y: 100, autoAlpha: 0 }, 0.03);
    heroInfo.staggerFromTo('.hero-info .more-btn', 1,
        { opacity: 0 }, { opacity: 1, ease: 'back' }, 0.05);
    ScrollTrigger.create({
        trigger: ".hero-info",
        scroller: '#html',
        start: "top 70%",
        toggleActions: "restart reset play",
        animation: heroInfo.play(),
    })

    $('.home-section').each(function (i, n) {
        var newTimeline = gsap.timeline();

        var splitwords = new SplitText('.' + n.classList[0] + ' .title', { type: "words" });
        newTimeline.staggerFrom(splitwords.words, 0.5, { y: 100, autoAlpha: 0 }, 0.03);

        // let h5 = '.' + n.classList[0] + ' h5';
        // if ($(h5).length) {
        //     newTimeline.staggerFromTo(h5, 0.5,
        //         { y: 10, opacity: 0 }, { y: 0, opacity: 1, ease: 'back' }, 0.2);
        // }
        // let h6 = '.' + n.classList[0] + ' h6';
        // if ($(h6).length) {
        //     newTimeline.staggerFromTo(h6, 0.5,
        //         { y: 10, opacity: 0 }, { y: 0, opacity: 1, ease: 'back' }, 0.2);
        // }

        let imgCard = '.' + n.classList[0] + ' .img-card';
        if ($(imgCard).length) {
            newTimeline
                .set(imgCard, { autoAlpha: 1 })
                .from(imgCard, .8, { xPercent: -110, ease: Power2.out })
                .from(imgCard + ' img', .8, { xPercent: 110, scale: 1.3, delay: -.8, ease: Power2.out });
        }

        // var splitwords2 = new SplitText('.' + n.classList[0] + ' p', { type: "words", position: "absolute" });
        // newTimeline.staggerFrom(splitwords2.words, 0.5, { y: 100, autoAlpha: 0 }, 0.03);
        // newTimeline.staggerFrom(splitwords2.chars, 0.5, { y: 100, autoAlpha: 0 }, 0.03);

        // var split = new SplitText('.' + n.classList[0] + ' p', { type: "chars", position: "absolute" });
        // newTimeline.staggerFrom(split.chars, 0.5, { y: 100, autoAlpha: 0 }, 0.03);

        let compareItems = '.' + n.classList[0] + ' .compare-item-section';
        if ($(compareItems).length) {
            newTimeline.staggerFromTo(compareItems, 1,
                { y: 10, opacity: 0 }, { y: 0, opacity: 1, ease: 'back' }, 0.2);
        }

        let blogItem = '.' + n.classList[0] + ' .blog-item';
        if ($(blogItem).length) {
            newTimeline.staggerFromTo(blogItem, 1,
                { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: 'back' }, .05);
        }
        let listItems = '.' + n.classList[0] + ' .list > a';
        if ($(listItems).length) {
            newTimeline.staggerFromTo(listItems, 1,
                { y: 10, opacity: 0 }, { y: 0, opacity: 1, ease: 'back' }, 0.2);
        }

        let btns = '.' + n.classList[0] + ' .long-arrow-btn';
        if ($(btns).length) {
            newTimeline.staggerFromTo(btns, 1,
                { opacity: 0 }, { opacity: 1, ease: 'back' }, 0.05);
        }

        let pricingItem = '.' + n.classList[0] + ' .pricing-item';
        if ($(pricingItem).length) {
            newTimeline.staggerFromTo(pricingItem, 1,
                { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: 'back' }, .05);
        }

        ScrollTrigger.create({
            trigger: '.' + n.classList[0],
            scroller: '#html',
            start: "top 70%",
            toggleActions: "restart play complete reset",
            animation: newTimeline.play(),
        })
    });
}

$(".backtop").on('click', function () {
    scroller.scrollTo(0, 0, 0)
});
