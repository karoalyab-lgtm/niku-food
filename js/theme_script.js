jQuery(document).ready(function ($) {
    "use strict";

    $(document).ready(function () {

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

        type();
    });

    if ($('.scrollToTop').length) {
        $(window).scroll(function () {
            "use strict";
            if ($(this).scrollTop() > 100) {
                $('.scrollToTop').fadeIn();
            } else {
                $('.scrollToTop').fadeOut();
            }
        });

        $('.scrollToTop').on('click', function (e) {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    }


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


    if ($('.defaultCountdown').length) {
        var austDay = new Date();
        austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
        $('.defaultCountdown').countdown({
            until: austDay
        });
        $('#year').text(austDay.getFullYear());
    }

    // Función para manejar el estado del header y el logo al hacer scroll
    function handleHeaderState() {
        if ($('.head-row-2').hasClass('header-static')) return;

        // Verificar la posición del scroll
        if ($(window).scrollTop() > 50) {
            // Si está ABAJO (> 50px)
            $('.head-row-2').addClass('head-row-2-scroll');
            $('strong.logo').removeClass('logo-no-show'); // Muestra el logo
        } else {
            // Si está ARRIBA (<= 50px)
            $('.head-row-2').removeClass('head-row-2-scroll');
            $('strong.logo').addClass('logo-no-show'); // Oculta el logo
        }
    }

    // 1. Ejecuta la función tan pronto como el DOM esté listo para evitar el parpadeo.
    handleHeaderState();
    // 2. Vuelve a ejecutar la función en cada evento de scroll para el comportamiento normal.
    $(window).on('scroll', handleHeaderState);

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

    $('.view-detail').on('click', function () {
        var $this = $(this);
        var title = $this.data('title');
        var desc = $this.data('desc');
        var img = $this.data('img');
        var origin = $this.data('origin');

        var $pane = $this.closest('.tab-pane');
        var $detailBox = $pane.find('.product-list-box');

        $detailBox.hide().fadeIn(500);
        $detailBox.find('.detail-title').text(title);
        $detailBox.find('.detail-desc').text(desc);
        $detailBox.find('.detail-img').attr('src', img);
        $detailBox.find('.detail-origin').html('<strong>Origen:</strong> ' + origin);

        $('html, body').animate({
            scrollTop: $detailBox.offset().top - 150
        }, 500);
    });

    (function () {
        var el = document.querySelector('.about-history-thumb');
        if (!el) {
            return;
        }

        function showInView() {
            if (el.classList.contains('in-view')) {
                return;
            }
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    el.classList.add('in-view');
                });
            });
        }

        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.classList.add('about-history-no-motion');
            return;
        }

        if (!('IntersectionObserver' in window)) {
            el.classList.add('about-history-no-motion');
            return;
        }

        el.classList.add('about-history-animate');

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    showInView();
                    try {
                        observer.unobserve(el);
                    } catch (err) { /* ignore */ }
                }
            });
        }, { root: null, rootMargin: '40px 0px 120px 0px', threshold: 0 });

        observer.observe(el);

        window.setTimeout(function () {
            var r = el.getBoundingClientRect();
            var vh = window.innerHeight || document.documentElement.clientHeight;
            if (r.top < vh && r.bottom > 0 && !el.classList.contains('in-view')) {
                showInView();
                try {
                    observer.unobserve(el);
                } catch (e2) { /* ignore */ }
            }
        }, 100);

        window.setTimeout(function () {
            if (!el.classList.contains('in-view')) {
                showInView();
            }
        }, 3000);
    })();

});