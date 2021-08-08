

(function ($) {
    "use strict";
    jQuery(document).on("ready", function () {
        //roadmap carosusel active
        $(".roadmap-carousel").owlCarousel({
            loop: false,
            nav: true,
            margin: 30,
            autoplay: true,
            autoplayspeed: 1000,
            navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 3
                }
            }
        });
        //faq area carousel active

        //animation active
        new WOW().init();
        //menu scrollr    
        $('.main-menu li a').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                    && location.hostname == this.hostname) {
                var $target = $(this.hash);
                $target = $target.length && $target
                        || $('[name=' + this.hash.slice(1) + ']');
                if ($target.length) {
                    var targetOffset = $target.offset().top - 60;
                    $('html,body').animate({scrollTop: targetOffset}, 400);
                    return false;
                }
            }
        });

        //scrolling menu adding active class 
//        var scrolllink = $('.scroll');
//
//        $(window).scroll(function () {
//            var scrollbarLocation = $(this).scrollTop();
//            scrolllink.each(function () {
//                var sectionOffset = $(this.hash).offset().top - 140
//                if (sectionOffset <= scrollbarLocation) {
//                    $(this).parent().addClass('active');
//                    $(this).parent().siblings().removeClass('active');
//                }
//            })
//        })

        $(window).scroll(function () {
            if ($(window).scrollTop() >= 60) {
                $(".header-area").addClass("navbar-sticky")
            } else {
                $(".header-area").removeClass("navbar-sticky")
            }
        });


        //mobile-menu
        $("#slick-nav").slicknav({
            prependTo: '.mobile-menu',
            allowParentlinks: true
        });


        //welcome particles

       
    });

    $('#a_on').on('click', function () {
        var play = document.querySelector("#audio")
        play.play();
        $(this).hide();
        $('#a_off').show();
    })
    $('#a_off').on('click', function () {
        var play = document.querySelector("#audio")
        play.loop = true;
        play.pause();
        $(this).hide();
        $('#a_on').show();
    })
    $('.copyboard').on('click', function (e) {
        e.preventDefault();
        var copyText = $(this).attr('data-text');
        var textarea = document.createElement("textarea");
        textarea.textContent = copyText;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    })
})(jQuery);





/*================================ End ====================================*/