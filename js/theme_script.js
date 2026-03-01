jQuery(document).ready(function ($) {
    "use strict";
    //Home Banner
    // if ($('#home-banner').length) {
    //     $('#home-banner').owlCarousel({
    //         loop: true,
    //         dots: false,
    //         nav: true,
    //         items: 1,
    //         autoplay: true,
    //         smartSpeed: 2000,
    //         animateOut: 'flipOutX',
    //         animateIn: 'fadeIn',
    //         URLhashListener: true,
    //         autoplayHoverPause: false,


    //     });
    // }

    $(document).ready(function () {
        // Tu código de scroll que ya tienes...

        // Lógica para el texto que se escribe solo
        const ciudades = ["Durango", "Culiacán", "Hermosillo", "Mazatlán"];
        let i = 0;
        let j = 0;
        let isDeleting = false;

        function type() {
            const currentWord = ciudades[i];
            const displayWord = isDeleting
                ? currentWord.substring(0, j--)
                : currentWord.substring(0, j++);

            $('#typed-text').text(displayWord);

            if (!isDeleting && j > currentWord.length) {
                isDeleting = true;
                setTimeout(type, 1500);
            } else if (isDeleting && j < 0) {
                isDeleting = false;
                i = (i + 1) % ciudades.length;
                setTimeout(type, 1000);
            } else {
                setTimeout(type, isDeleting ? 50 : 150);
            }
        }

        type(); // Inicia el efecto
    });

    //Back To Top
    if ($('.scrollToTop').length) {
        $(window).scroll(function () {
            "use strict";
            if ($(this).scrollTop() > 100) {
                $('.scrollToTop').fadeIn();
            } else {
                $('.scrollToTop').fadeOut();
            }
        });

        //Click event to scroll to top
        $('.scrollToTop').on('click', function (e) {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    }


    //ISOTOPE GALLERY ELITE
    if ($(".gallery-metro-2 .isotope").length) {
        var $container = $('.gallery-metro-2 .isotope');
        $container.isotope({
            itemSelector: '.item',
            transitionDuration: '0.6s',
            masonry: {
                columnWidth: $container.width() / 12
            },
            layoutMode: 'masonry'
        });

        $(window).resize(function () {
            $container.isotope({
                masonry: {
                    columnWidth: $container.width() / 12
                }
            });
        });
    }


    //Scroll
    if ($('#content-3dtd').length) {
        $(window).on('load', function (e) {
            "use strict";
            $.mCustomScrollbar.defaults.scrollButtons.enable = true;
            $.mCustomScrollbar.defaults.axis = "yx";
            $("#content-3dtd").mCustomScrollbar({
                theme: "3d-thick-dark"
            })
        });
    }

    //Coming Soon
    if ($('.defaultCountdown').length) {
        var austDay = new Date();
        austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
        $('.defaultCountdown').countdown({
            until: austDay
        });
        $('#year').text(austDay.getFullYear());
    }

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 50) {
            $('.head-row-2').addClass('head-row-2-scroll');
        } else {
            console.log('entra')
            $('.head-row-2').removeClass('head-row-2-scroll');
        }
    });

});