$(".Digi2l_team_slider").slick({
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
        { breakpoint: 991, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        { breakpoint: 575, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
});


$(document).ready(function () {
    $(".upload input[type=file]").each(function () {
        var eventNamespace = ".upload";
        var labelInputValueAttr = "data-input-value";
        var $input = $(this);
        var $inputClone = $input.clone(!0, !0);
        $inputClone.removeClass("empty");
        var $label = $input.next("label");
        var setLabelInputValue = function () {
            var $input = $(this);
            if ($input.val() && $input.val() !== "") {
                $input.removeClass("empty");
                $label.attr(labelInputValueAttr, $input.val().split("\\").pop());
            } else {
                $label.attr(labelInputValueAttr, "");
                $input.addClass("empty");
            }
        };
        if (!$input.val() || $input.val() === "") {
            $input.addClass("empty");
        }
        $label.attr(labelInputValueAttr, "");
        $input.on("change" + eventNamespace, setLabelInputValue);
        $label.on("click" + eventNamespace, function (event) {
            if ($input.val() && $input.val() !== "" && $input.is(":valid")) {
                event.preventDefault();
                $input.remove();
                $label.before($inputClone);
                $input = $inputClone;
                if (!$input.val() || $input.val() === "") {
                    $input.addClass("empty");
                }
                $inputClone = $input.clone(!0, !0);
                $inputClone.removeClass("empty");
                $input.off("change" + eventNamespace);
                $input.on("change" + eventNamespace, setLabelInputValue);
                $label.attr(labelInputValueAttr, "");
            }
        });
    });
});
