$('.owl-carousel').owlCarousel({
    loop: false,
	autoplay: true,
    autoplayTimeout:3200,
    autoplayHoverPause:true,
	touchThreshold:100,
    margin: 0,
    pagination: false,
    nav: true,
	items: 1,
    navText: [
        "<div class='navarrow'><button href='#' class='left-arrow'><i class='fas fa-chevron-left'></i></button></div>",
        "<div class='navarrow'><button href='#' class='right-arrow'><i class='fas fa-chevron-left'></i></button></div>"
    ],
    dotData: true,
    dotsData: true
});

$('.firmslider').addClass('owl-carousel').owlCarousel({
    loop: false,
    margin: 0,
    autoplay: true,
    autoplayTimeout:3600,
	touchThreshold:100,
    autoplayHoverPause:true,
    nav: true,
    dots: false,
    items: 3,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:3
        }
    },
    navText: [
        "<div class='navarrow'><button href='#' class='left-arrow'><i class='fas fa-chevron-left'></i></button></div>",
        "<div class='navarrow'><button href='#' class='right-arrow'><i class='fas fa-chevron-left'></i></button></div>"
    ],
});

$('.brand-slider').addClass('owl-carousel').owlCarousel({
    loop: false,
    margin: 0,
    autoplay: true,
    autoplayTimeout:3600,
    autoplayHoverPause:true,
	touchThreshold:100,
    nav: false,
    dots: false,
    pagination: false,
    items: 3,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:3
        }
    },
    navText: [
        "<div class='navarrow'><button href='#' class='left-arrow'><i class='fas fa-chevron-left'></i></button></div>",
        "<div class='navarrow'><button href='#' class='right-arrow'><i class='fas fa-chevron-left'></i></button></div>"
    ],
    
});

$('.testimonial').addClass('owl-carousel').owlCarousel({
    loop: false,
    margin: 0,
    autoplay: true,
    autoplayTimeout:10000,
    autoplayHoverPause:true,
	touchThreshold:100,
    nav: false,
    pagination: false,
    items: 1,
    navText: [
        "<div class='navarrow'><button href='#' class='left-arrow'><i class='fas fa-chevron-left'></i></button></div>",
        "<div class='navarrow'><button href='#' class='right-arrow'><i class='fas fa-chevron-left'></i></button></div>"
    ],
    dotData: true,
    
});



$(document).ready(function(){
    // Add minus icon for collapse element which is open by default
    $(".collapse.show").each(function(){
        $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
    });
    
    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on('show.bs.collapse', function(){
        $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
    }).on('hide.bs.collapse', function(){
        $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
    });
});

$(document).ready(function(){
    $('#locationselector').on('change', function(){
    	var demovalue = $(this).val(); 
        $("div.hiddenbox").hide();
        $("#"+demovalue).show();
    });
	
	 $('#selllocationselector').on('change', function(){
    	var demovalue = $(this).val(); 
        $("div.hiddenbox").hide();
        $("#"+demovalue).show();
    });
});

$("#slide").animate({width:'toggle'},350);
   