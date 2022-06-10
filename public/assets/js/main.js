$(document).ready(function($) {
    "use strict";
    $("[data-background").each(function() {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
    });
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $("#header").addClass("fixed-nav");
        } else {
            $("#header").removeClass("fixed-nav");
        }
    });

    // hover
    $('.navbar-nav .nav-link').hover(
        function() {
            $(".navbar-nav .nav-link.active").addClass('inactive').removeClass('active');
        },
        function() {
            $(".navbar-nav .nav-link.inactive").addClass('active').removeClass('inactive');
        }
    );
    // partner slider


    $('.range-btn').on('click', '.btn', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
    // Magnific popup
    // $('.videos-icon').magnificPopup({
    //     type: 'iframe',
    //     iframe: {
    //         patterns: {
    //             youtube: {
    //                 index: 'youtube.com/',

    //                 id: 'v=',
    //                 src: 'https://www.youtube.com/embed/%id%?autoplay=1'
    //             }

    //         },
    //         srcAction: 'iframe_src',
    //     }
    // });




}(jQuery));