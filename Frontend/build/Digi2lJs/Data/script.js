$(document).ready(function () {
    $(".menu-close").hide();
    $(".menu").click(function () {
        $(".menu-panel").toggleClass("show");
        $(".menu-background").toggleClass("show");
        $(".menu").show();
        $(".menu-close").show();
    });
    $(".menu-close").click(function () {
        $(".menu-panel").removeClass("show");
        $(".menu-background").removeClass("show");
        $(".menu").show();
        $(".menu-close").hide();
    });
    $('input[type="text"]').on("input", function () {
        var input = $(this).val();
        if (input.charAt(0) === " ") {
            input = input.slice(1);
            $(this).val(input);
        }
    });
});
$(".toggle-password").click(function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});
$(".toggle-cpassword").click(function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});
$(document).ready(function () {
    $(".testimonial-slider").slick({
        autoplay: !0,
        autoplaySpeed: 1000,
        speed: 900,
        draggable: !0,
        infinite: !0,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: !0,
        dots: !0,
        responsive: [
            { breakpoint: 991, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 575, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    });
    $(".Digi2l_news_slider").slick({
        autoplay: !0,
        autoplaySpeed: 2000,
        speed: 900,
        draggable: !0,
        infinite: !0,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: !0,
        dots: !1,
        responsive: [
            { breakpoint: 991, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 575, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    });
    $(".gallery-slider").slick({
        autoplay: !0,
        autoplaySpeed: 2000,
        speed: 900,
        draggable: !0,
        infinite: !0,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: !0,
        dots: !1,
        responsive: [
            { breakpoint: 991, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 575, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    });
    $(".offers-slider").slick({
        autoplay: !0,
        autoplaySpeed: 2000,
        speed: 900,
        draggable: !0,
        infinite: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: !0,
        dots: !0,
        responsive: [
            { breakpoint: 991, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            { breakpoint: 575, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    });
    $(".vouchers-slider").slick({
        autoplay: !1,
        autoplaySpeed: 2000,
        speed: 900,
        draggable: !0,
        infinite: !0,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: !1,
        dots: !0,
        centerMode: !0,
        centerPadding: "90px",
        responsive: [
            { breakpoint: 991, settings: { slidesToShow: 2, slidesToScroll: 1, centerMode: !0, centerPadding: "60px" } },
            { breakpoint: 575, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    });
    $(".blog-slider").slick({
        autoplay: !0,
        autoplaySpeed: 2000,
        speed: 900,
        draggable: !0,
        infinite: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: !0,
        dots: !0,
        responsive: [
            { breakpoint: 991, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 575, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    });
    $(".latest_blog-slider").slick({
        autoplay: !0,
        autoplaySpeed: 2000,
        speed: 900,
        draggable: !0,
        infinite: !0,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: !0,
        dots: !0,
        responsive: [
            { breakpoint: 991, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 575, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    });
    $(".blogTab-slider").slick({
        autoplay: !0,
        autoplaySpeed: 2000,
        speed: 900,
        draggable: !0,
        infinite: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: !0,
        dots: !0,
        responsive: [
            { breakpoint: 991, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 575, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    });

    $(".partner-slider").slick({
        autoplay: !1,
        autoplaySpeed: 900,
        speed: 900,
        draggable: !0,
        infinite: !0,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: !1,
        dots: !0,
        responsive: [
            { breakpoint: 991, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 575, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        ],
    });
});
this.$slideOut = $("#slideOut");
this.$slideOut.find(".slideOutTab").on("click", function () {
    $("#slideOut").toggleClass("showSlideOut");
});
$(".enquiry-cancel").click(function () {
    $("#slideOut").toggleClass("showSlideOut");
});
jQuery("#exchange1").owlCarousel({
    autoplay: !1,
    rewind: !1,
    margin: 20,
    autoplayHoverPause: !0,
    autoHeight: !0,
    autoplayTimeout: 4000,
    smartSpeed: 800,
    arrows: !0,
    dots: !0,
    responsive: { 0: { items: 1 }, 600: { items: 2 }, 1024: { items: 3 } },
});
jQuery("#exchange2").owlCarousel({
    autoplay: !1,
    rewind: !1,
    margin: 20,
    autoplayHoverPause: !0,
    autoHeight: !0,
    autoplayTimeout: 4000,
    smartSpeed: 800,
    arrows: !0,
    dots: !0,
    responsive: { 0: { items: 1 }, 600: { items: 2 }, 1024: { items: 3 } },
});
jQuery("#exchange3").owlCarousel({ autoplay: !1, rewind: !1, margin: 20, autoplayHoverPause: !0, autoplayTimeout: 4000, smartSpeed: 800, arrows: !0, dots: !0, responsive: { 0: { items: 1 }, 600: { items: 1 } } });
jQuery("#exchange4").owlCarousel({ autoplay: !1, rewind: !1, margin: 20, autoplayHoverPause: !0, autoplayTimeout: 4000, smartSpeed: 800, arrows: !0, dots: !0, responsive: { 0: { items: 1 }, 600: { items: 1 } } });
jQuery("#abb1").owlCarousel({
    autoplay: !1,
    rewind: !1,
    margin: 20,
    autoplayHoverPause: !0,
    autoHeight: !0,
    autoplayTimeout: 4000,
    smartSpeed: 800,
    arrows: !0,
    dots: !0,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1024: { items: 4 } },
});
jQuery("#abb2").owlCarousel({ autoplay: !1, rewind: !1, margin: 20, autoplayHoverPause: !0, autoplayTimeout: 4000, smartSpeed: 800, arrows: !0, dots: !0, responsive: { 0: { items: 1 }, 600: { items: 3 } } });
jQuery("#circulareconomy1").owlCarousel({
    autoplay: !1,
    rewind: !1,
    margin: 20,
    autoplayHoverPause: !0,
    autoHeight: !0,
    autoplayTimeout: 4000,
    smartSpeed: 800,
    arrows: !0,
    dots: !0,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1024: { items: 4 } },
});
jQuery("#circulareconomy2").owlCarousel({
    autoplay: !1,
    rewind: !1,
    margin: 20,
    autoplayHoverPause: !0,
    autoHeight: !0,
    autoplayTimeout: 4000,
    smartSpeed: 800,
    arrows: !0,
    dots: !0,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1024: { items: 4 } },
});
jQuery("#circulareconomy3").owlCarousel({
    autoplay: !1,
    rewind: !1,
    margin: 20,
    autoplayHoverPause: !0,
    autoHeight: !0,
    autoplayTimeout: 4000,
    smartSpeed: 800,
    arrows: !0,
    dots: !0,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1024: { items: 4 } },
});
jQuery("#enterprisesales1").owlCarousel({ autoplay: !1, rewind: !1, margin: 20, autoplayHoverPause: !0, autoplayTimeout: 4000, smartSpeed: 800, arrows: !0, dots: !0, responsive: { 0: { items: 1 }, 600: { items: 2 }, 1024: { items: 3 } } });
jQuery("#enterprisesales2").owlCarousel({
    autoplay: !1,
    rewind: !1,
    margin: 20,
    autoplayHoverPause: !0,
    autoHeight: !0,
    autoplayTimeout: 4000,
    smartSpeed: 800,
    arrows: !0,
    dots: !0,
    responsive: { 0: { items: 1 }, 600: { items: 2 }, 1024: { items: 4 } },
});
jQuery("#enterprisesales3").owlCarousel({ autoplay: !1, rewind: !1, margin: 20, autoplayTimeout: 4000, smartSpeed: 800, nav: !1, dots: !0, responsive: { 0: { items: 1 }, 600: { items: 3 }, 1024: { items: 3 } } });
jQuery("#programpartnership").owlCarousel({ autoplay: !1, rewind: !1, margin: 20, autoplayTimeout: 4000, smartSpeed: 800, responsive: { 0: { items: 1 }, 600: { items: 3 }, 1024: { items: 4 } } });
jQuery("#programpartnership2").owlCarousel({ autoplay: !1, rewind: !1, margin: 20, autoplayTimeout: 4000, smartSpeed: 800, responsive: { 0: { items: 1 }, 600: { items: 3 }, 1024: { items: 2 } } });
jQuery("#circulareconomy3").owlCarousel({
    autoplay: !1,
    rewind: !1,
    margin: 20,
    autoplayHoverPause: !1,
    responsiveClass: !0,
    autoHeight: !0,
    autoplayTimeout: 4000,
    smartSpeed: 800,
    arrows: !0,
    dots: !0,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1024: { items: 4 }, 1366: { items: 4 } },
});
jQuery("#SmartSellPlan").owlCarousel({
    autoplay: !0,
    rewind: !1,
    margin: 20,
    responsiveClass: !0,
    autoHeight: !0,
    autoplayTimeout: 4000,
    smartSpeed: 800,
    nav: !1,
    dots: !1,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1024: { items: 4 }, 1366: { items: 5 } },
});
jQuery("#PExchangeProgram").owlCarousel({
    autoplay: !1,
    rewind: !1,
    margin: 20,
    autoplayHoverPause: !1,
    responsiveClass: !0,
    autoHeight: !0,
    autoplayTimeout: 4000,
    smartSpeed: 800,
    nav: !0,
    dots: !1,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1024: { items: 4 }, 1366: { items: 4 } },
});
jQuery("#PResellProgram").owlCarousel({
    autoplay: !1,
    rewind: !1,
    margin: 20,
    responsiveClass: !0,
    autoHeight: !0,
    autoplayTimeout: 4000,
    smartSpeed: 800,
    nav: !0,
    dots: !1,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1024: { items: 4 }, 1366: { items: 4 } },
});
jQuery("#Digi2lPartner").owlCarousel({
    autoplay: !1,
    rewind: !1,
    margin: 20,
    responsiveClass: !0,
    autoHeight: !0,
    autoplayTimeout: 4000,
    smartSpeed: 800,
    nav: !0,
    dots: !1,
    slideBy: 1,
    responsive: { 0: { items: 1 }, 600: { items: 2 }, 1024: { items: 3 }, 1366: { items: 4 } },
});
jQuery("#SmartBuyPlan").owlCarousel({
    autoplay: !0,
    rewind: !0,
    margin: 20,
    responsiveClass: !0,
    autoHeight: !0,
    autoplayTimeout: 4000,
    smartSpeed: 800,
    nav: !0,
    dots: !1,
    responsive: { 0: { items: 1 }, 600: { items: 2 }, 1024: { items: 3 }, 1366: { items: 4 } },
});
setTimeout(function () {
    jQuery("#Digi2lPartner .owl-nav button.owl-next").addClass("slick-next slick-arrow");
    jQuery("#Digi2lPartner .owl-nav button.owl-prev").addClass("slick-prev slick-arrow");
    jQuery("#Digi2lPartner .owl-nav button.owl-next").removeClass("owl-next");
    jQuery("#Digi2lPartner .owl-nav button.owl-prev").removeClass("owl-prev");
    jQuery("#Digi2lPartner .owl-nav button.slick-prev").css("left", "10px");
    jQuery("#Digi2lPartner .owl-nav button.slick-next").css("right", "20px");
    jQuery("#PExchangeProgram .owl-nav button.owl-next").addClass("slick-next slick-arrow");
    jQuery("#PExchangeProgram .owl-nav button.owl-prev").addClass("slick-prev slick-arrow");
    jQuery("#PExchangeProgram .owl-nav button.owl-next").removeClass("owl-next");
    jQuery("#PExchangeProgram .owl-nav button.owl-prev").removeClass("owl-prev");
    jQuery("#PExchangeProgram .owl-nav button.slick-prev").css("left", "10px");
    jQuery("#PExchangeProgram .owl-nav button.slick-next").css("right", "20px");
    jQuery("#PResellProgram .owl-nav button.owl-next").addClass("slick-next slick-arrow");
    jQuery("#PResellProgram .owl-nav button.owl-prev").addClass("slick-prev slick-arrow");
    jQuery("#PResellProgram .owl-nav button.owl-next").removeClass("owl-next");
    jQuery("#PResellProgram .owl-nav button.owl-prev").removeClass("owl-prev");
    jQuery("#PResellProgram .owl-nav button.slick-prev").css("left", "10px");
    jQuery("#PResellProgram .owl-nav button.slick-next").css("right", "20px");
}, 100);
$.fn.jQuerySimpleCounter = function (options) {
    var settings = $.extend({ start: 0, end: 100, easing: "swing", duration: 400, complete: "" }, options);
    var thisElement = $(this);
    $({ count: settings.start }).animate(
        { count: settings.end },
        {
            duration: settings.duration,
            easing: settings.easing,
            step: function () {
                var mathCount = Math.ceil(this.count);
                thisElement.text(mathCount);
            },
            complete: settings.complete,
        }
    );
};
$("#number1").jQuerySimpleCounter({ end: 100, duration: 3000 });
$("#number2").jQuerySimpleCounter({ end: 50000, duration: 3000 });
$("#number3").jQuerySimpleCounter({ end: 26000, duration: 3000 });
$("#number4").jQuerySimpleCounter({ end: 100, duration: 3000 });
$.fn.jQuerySimpleCounter = function (options) {
    var settings = $.extend({ start: 0, end: 100, easing: "swing", duration: 400, complete: "" }, options);
    var thisElement = $(this);
    $({ count: settings.start }).animate(
        { count: settings.end },
        {
            duration: settings.duration,
            easing: settings.easing,
            step: function () {
                var mathCount = Math.ceil(this.count);
                thisElement.text(mathCount);
            },
            complete: settings.complete,
        }
    );
};
$("#num1").jQuerySimpleCounter({ end: 100, duration: 3000 });
$("#num2").jQuerySimpleCounter({ end: 900, duration: 3000 });
$("#num3").jQuerySimpleCounter({ end: 20000, duration: 20000 });
$("#num4").jQuerySimpleCounter({ end: 3500, duration: 3500 });

function copyToClipboard(text, el) {
    var copyTest = document.queryCommandSupported("copy");
    var elOriginalText = el.attr("data-original-title");
    if (copyTest === !0) {
        var copyTextArea = document.createElement("textarea");
        copyTextArea.value = text;
        document.body.appendChild(copyTextArea);
        copyTextArea.select();
        try {
            var successful = document.execCommand("copy");
            var msg = successful ? "Copied!" : "Whoops, not copied!";
            el.attr("data-original-title", msg).tooltip("show");
        } catch (err) {
            console.log("Oops, unable to copy");
        }
        document.body.removeChild(copyTextArea);
        el.attr("data-original-title", elOriginalText);
    } else {
        window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
    }
}

$(document).ready(function () {
    $(".js-tooltip").tooltip({ trigger: "click" });
    $("#postlinkcopybtn").click(function () {
        var text = $(this).attr("data-copy");
        var el = $(this);
        copyToClipboard(text, el);
    });
});
setTimeout(function () {
    $(".js-tooltip").tooltip("hide");
}, 3000);
$("#dropdownMenuButton1").append($('<i class="fa fa-angle-down"></i>'));
$(function () {
    $('input[type="tel"], input[type="email"]').on("keypress", function (e) {
        if (e.which == 32) {
            return !1;
        }
    });
});
// $(function () {
//     var url = window.location.pathname;
//     $(".navbar .navbar-nav .nav-item a").each(function () {
//         var href = $(this).attr("href");
//         if (url.startsWith(href)) {
//             $(this).parents(".nav-item").addClass("active");
//         }
//     });
// });
$("#SlideoutSubmitbtn").click(function () {
    $("#slideOut .wpcf7-spinner").css("display", "inline-block");
});
function funCity() {
    document.getElementById("city").style.display = "block";
    document.getElementById("city_desc").style.display = "none";
    document.getElementById("cityheading").style.display = "none";
    document.getElementById("mapcard").style.background = "transparent linear-gradient(109deg, #AB01FC 0%, #3325B0 100%) 0% 0% no-repeat padding-box";
    document.getElementById("mapcard").style.border = "unset";
    document.getElementById("mapcardlabel").style.color = "unset";
}
function funCityDesc() {
    document.getElementById("mapcard").style.background = "white";
    document.getElementById("mapcard").style.border = "1px solid #3C23B6";
    document.getElementById("mapcardlabel").style.color = "#3C23B6";
    document.getElementById("city_desc").style.display = "block";
    document.getElementById("cityheading").style.display = "block";
    document.getElementById("city").style.display = "none";
}
function scrollSmoothTo(elementId) {
    var element = document.getElementById(elementId);
    element.scrollIntoView({ block: "start", behavior: "smooth" });
}
