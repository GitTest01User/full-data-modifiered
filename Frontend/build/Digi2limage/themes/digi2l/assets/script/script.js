// custom nav
$(document).ready(function(){
  $('.menu-close').hide();

  $('.menu').click(function(){
      $('.menu-panel').toggleClass('show');
      $('.menu-background').toggleClass('show');
      $('.menu').hide();
      $('.menu-close').show();
  });
  $('.menu-close').click(function(){
      $('.menu-panel').removeClass('show');
      $('.menu-background').removeClass('show');
      $('.menu').show();
      $('.menu-close').hide();
  });
	
	$('input[type="text"]').on('input', function() {
  var input = $(this).val(); // get the current value of the input field
  if (input.charAt(0) === ' ') { // check if the first character is a space
    input = input.slice(1); // remove the first character
    $(this).val(input); // update the value of the input field
  }
});
	
});



// login js
$(".toggle-password").click(function() {
  
  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});

$(".toggle-cpassword").click(function() {

$(this).toggleClass("fa-eye fa-eye-slash");
var input = $($(this).attr("toggle"));
if (input.attr("type") == "password") {
  input.attr("type", "text");
} else {
  input.attr("type", "password");
}
});






//slick slider 
$(document).ready(function() {
    $('.testimonial-slider').slick({
        autoplay: true,
        autoplaySpeed: 1000,
        speed: 900,
        draggable: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        dots: true,

        responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
                breakpoint: 575,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
            }
        ]
    });

    $('.Digi2l_news_slider').slick({
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 900,
      draggable: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
    
      responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
          {
              breakpoint: 575,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
          }
      ]
    });

    $('.gallery-slider').slick({
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 900,
      draggable: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
  
      responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
              breakpoint: 575,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
          }
      ]
  });

    $('.offers-slider').slick({
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 900,
      draggable: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,

      responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
          {
              breakpoint: 575,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
          }
      ]
  });

  $('.vouchers-slider').slick({
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 900,
    draggable: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    /*centerMode: true,
    centerPadding: '20%',*/
    centerMode: true,
    centerPadding: '90px',

    responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '60px',
          }
        },
        {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
        }
    ]
});


$('.blog-slider').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 900,
  draggable: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  dots: true,

  responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
          breakpoint: 575,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
      }
  ]
});

$('.latest_blog-slider').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 900,
  draggable: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  dots: true,

  responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
          breakpoint: 575,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
      }
  ]
});


$('.blogTab-slider').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 900,
  draggable: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  dots: true,

  responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
          breakpoint: 575,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
      }
  ]
});

    $('.partner-slider').slick({
        autoplay: false,
        autoplaySpeed: 900,
        speed: 900,
        draggable: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        dots: true,

        responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
                breakpoint: 575,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                }
            }
        ]
    });
}); 


// side toggle js
this.$slideOut = $('#slideOut');
    
// Slideout show
this.$slideOut.find('.slideOutTab').on('click', function() {
  $("#slideOut").toggleClass('showSlideOut');
});

$('.enquiry-cancel').click(function(){
  $("#slideOut").toggleClass('showSlideOut');
})
// owl slider

jQuery("#exchange1").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  autoplayHoverPause: true,
  autoHeight: true,
  autoplayTimeout: 4000,
  smartSpeed: 800,
  arrows: true,
  dots: true,
  responsive:{
    0:{
        items:1,
        
    },
    600:{
        items:2,
       
    },
    1024:{
        items:3,
        
    }
  }
});
jQuery("#exchange2").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  autoplayHoverPause: true,
  autoHeight: true,
  autoplayTimeout: 4000,
  smartSpeed: 800,
  arrows: true,
  dots: true,
  responsive:{
    0:{
        items:1,
        
    },
    600:{
        items:2,
       
    },
    1024:{
        items:3,
        
    }
  }
});
jQuery("#exchange3").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  autoplayHoverPause: true,
  autoplayTimeout: 4000,
  smartSpeed: 800,
  arrows: true,
  dots: true,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 1
    },
  }
});
jQuery("#exchange4").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  autoplayHoverPause: true,
  autoplayTimeout: 4000,
  smartSpeed: 800,
  arrows: true,
  dots: true,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 1
    },
  }
});
jQuery("#abb1").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  autoplayHoverPause: true,
  autoHeight: true,
  autoplayTimeout: 4000,
  smartSpeed: 800,
  arrows: true,
  dots: true,
  responsive:{
    0:{
        items:1,
        
    },
    600:{
        items:3,
       
    },
    1024:{
        items:4,
        
    }
  }
});
jQuery("#abb2").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  autoplayHoverPause: true,
  autoplayTimeout: 4000,
  smartSpeed: 800,
  arrows: true,
  dots: true,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 3
    },
  }
});
jQuery("#circulareconomy1").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  autoplayHoverPause: true,
  autoHeight: true,
  autoplayTimeout: 4000,
  smartSpeed: 800,
  arrows: true,
  dots: true,
  responsive:{
    0:{
        items:1,
        
    },
    600:{
        items:3,
       
    },
    1024:{
        items:4,
        
    }
  }
});
jQuery("#circulareconomy2").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  autoplayHoverPause: true,
  autoHeight: true,
  autoplayTimeout: 4000,
  smartSpeed: 800,
  arrows: true,
  dots: true,
  responsive:{
    0:{
        items:1,
        
    },
    600:{
        items:3,
       
    },
    1024:{
        items:4,
        
    }
  }
});
jQuery("#circulareconomy3").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  autoplayHoverPause: true,
  autoHeight: true,
  autoplayTimeout: 4000,
  smartSpeed: 800,
  arrows: true,
  dots: true,
  responsive:{
    0:{
        items:1,
        
    },
    600:{
        items:3,
       
    },
    1024:{
        items:4,
        
    }
  }
});
jQuery("#enterprisesales1").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  autoplayHoverPause: true,
  autoplayTimeout: 4000,
  smartSpeed: 800,
  arrows: true,
  dots: true,
  responsive:{
    0:{
        items:1,
        
    },
    600:{
        items:2,
       
    },
    1024:{
        items:3,
        
    }
  }
});
jQuery("#enterprisesales2").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  autoplayHoverPause: true,
  autoHeight: true,
  autoplayTimeout: 4000,
  smartSpeed: 800,
  arrows: true,
  dots: true,
  responsive:{
    0:{
        items:1,
        
    },
    600:{
        items:2,
       
    },
    1024:{
        items:4,
        
    }
  }
});

// owl slider
jQuery("#enterprisesales3").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  autoplayTimeout: 4000,
  smartSpeed: 800,
  nav: false,
  dots: true,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 3
    },

    1024: {
      items: 3
    },

  }
});
jQuery("#programpartnership").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  autoplayTimeout: 4000,
  smartSpeed: 800,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 3
    },

    1024: {
      items: 4
    },

  }
});
jQuery("#programpartnership2").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  autoplayTimeout: 4000,
  smartSpeed: 800,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 3
    },

    1024: {
      items: 2
    },

  }
});
jQuery("#circulareconomy3").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  autoplayHoverPause: false,
  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 4000,
  smartSpeed: 800,
  arrows: true,
  dots: true,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 3
    },

    1024: {
      items: 4
    },

    1366: {
      items: 4
    }
  }
});


jQuery("#SmartSellPlan").owlCarousel({
  autoplay: true,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 4000,
  smartSpeed: 800,
  nav: false,
  dots: false,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 3
    },

    1024: {
      items: 4
    },

    1366: {
      items: 5
    }
  }
});


// owl slider
jQuery("#PExchangeProgram").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  autoplayHoverPause: false,
  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 4000,
  smartSpeed: 800,
  nav: true,
  dots: false,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 3
    },

    1024: {
      items: 4
    },

    1366: {
      items: 4
    }
  }
});

// owl slider
jQuery("#PResellProgram").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 4000,
  smartSpeed: 800,
  nav: true,
  dots: false,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 3
    },

    1024: {
      items: 4
    },

    1366: {
      items: 4
    }
  }
});


// owl slider
jQuery("#Digi2lPartner").owlCarousel({
  autoplay: false,
  rewind: false, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 4000,
  smartSpeed: 800,
  nav: true,
  dots: false,
  slideBy:1,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 2
    },

    1024: {
      items: 3
    },

    1366: {
      items: 4
    }
  }
});

/*jQuery("#Digi2lPartner").on('mousewheel', '.owl-stage', function (e) {
    if (e.deltaY>0) {
        jQuery("#Digi2lPartner").trigger('next.owl');
    } else {
        jQuery("#Digi2lPartner").trigger('prev.owl');
    }
    e.preventDefault();
});*/

// owl slider
jQuery("#SmartBuyPlan").owlCarousel({
  autoplay: true,
  rewind: true, /* use rewind if you don't want loop */
  margin: 20,
   /*
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  */
  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 4000,
  smartSpeed: 800,
  nav: true,
  dots: false,
  responsive: {
    0: {
      items: 1
    },

    600: {
      items: 2
    },

    1024: {
      items: 3
    },

    1366: {
      items: 4
    }
  }
});

setTimeout(function() {
    jQuery('#Digi2lPartner .owl-nav button.owl-next').addClass('slick-next slick-arrow');
    jQuery('#Digi2lPartner .owl-nav button.owl-prev').addClass('slick-prev slick-arrow');
    jQuery('#Digi2lPartner .owl-nav button.owl-next').removeClass('owl-next');
    jQuery('#Digi2lPartner .owl-nav button.owl-prev').removeClass('owl-prev');
    jQuery('#Digi2lPartner .owl-nav button.slick-prev').css('left', '10px');
    jQuery('#Digi2lPartner .owl-nav button.slick-next').css('right', '20px');

    jQuery('#PExchangeProgram .owl-nav button.owl-next').addClass('slick-next slick-arrow');
    jQuery('#PExchangeProgram .owl-nav button.owl-prev').addClass('slick-prev slick-arrow');
    jQuery('#PExchangeProgram .owl-nav button.owl-next').removeClass('owl-next');
    jQuery('#PExchangeProgram .owl-nav button.owl-prev').removeClass('owl-prev');
    jQuery('#PExchangeProgram .owl-nav button.slick-prev').css('left', '10px');
    jQuery('#PExchangeProgram .owl-nav button.slick-next').css('right', '20px');

    jQuery('#PResellProgram .owl-nav button.owl-next').addClass('slick-next slick-arrow');
    jQuery('#PResellProgram .owl-nav button.owl-prev').addClass('slick-prev slick-arrow');
    jQuery('#PResellProgram .owl-nav button.owl-next').removeClass('owl-next');
    jQuery('#PResellProgram .owl-nav button.owl-prev').removeClass('owl-prev');
    jQuery('#PResellProgram .owl-nav button.slick-prev').css('left', '10px');
    jQuery('#PResellProgram .owl-nav button.slick-next').css('right', '20px');
}, 100);


// counter js
$.fn.jQuerySimpleCounter = function( options ) {
  var settings = $.extend({
      start:  0,
      end:    100,
      easing: 'swing',
      duration: 400,
      complete: ''
  }, options );

  var thisElement = $(this);

  $({count: settings.start}).animate({count: settings.end}, {
  duration: settings.duration,
  easing: settings.easing,
  step: function() {
    var mathCount = Math.ceil(this.count);
    thisElement.text(mathCount);
  },
  complete: settings.complete
});
};


$('#number1').jQuerySimpleCounter({end: 100,duration: 3000});
$('#number2').jQuerySimpleCounter({end: 50000,duration: 3000});
$('#number3').jQuerySimpleCounter({end: 26000,duration: 3000});
$('#number4').jQuerySimpleCounter({end: 100,duration: 3000});


// counter js
$.fn.jQuerySimpleCounter = function( options ) {
  var settings = $.extend({
      start:  0,
      end:    100,
      easing: 'swing',
      duration: 400,
      complete: ''
  }, options );

  var thisElement = $(this);

  $({count: settings.start}).animate({count: settings.end}, {
  duration: settings.duration,
  easing: settings.easing,
  step: function() {
    var mathCount = Math.ceil(this.count);
    thisElement.text(mathCount);
  },
  complete: settings.complete
});
};


$('#num1').jQuerySimpleCounter({end: 100,duration: 3000});
$('#num2').jQuerySimpleCounter({end: 900,duration: 3000});
$('#num3').jQuerySimpleCounter({end: 20000,duration: 20000});
$('#num4').jQuerySimpleCounter({end: 3500,duration: 3500});

// COPY TO CLIPBOARD
// Attempts to use .execCommand('copy') on a created text field
// Falls back to a selectable alert if not supported
// Attempts to display status in Bootstrap tooltip
// ------------------------------------------------------------------------------

function copyToClipboard(text, el) {
  var copyTest = document.queryCommandSupported('copy');
  var elOriginalText = el.attr('data-original-title');

  if (copyTest === true) {
    var copyTextArea = document.createElement("textarea");
    copyTextArea.value = text;
    document.body.appendChild(copyTextArea);
    copyTextArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'Copied!' : 'Whoops, not copied!';
      el.attr('data-original-title', msg).tooltip('show');
    } catch (err) {
      console.log('Oops, unable to copy');
    }
    document.body.removeChild(copyTextArea);
    el.attr('data-original-title', elOriginalText);
  } else {
    // Fallback if browser doesn't support .execCommand('copy')
    window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
  }
}

$(document).ready(function() {
  // Initialize
  // ---------------------------------------------------------------------

  // Tooltips
  // Requires Bootstrap 3 for functionality
  $('.js-tooltip').tooltip({ trigger: 'click'});

  // Copy to clipboard
  // Grab any text in the attribute 'data-copy' and pass it to the 
  // copy function
  $('#postlinkcopybtn').click(function() {
    var text = $(this).attr('data-copy');
    var el = $(this);
    copyToClipboard(text, el);
  });
  
});

setTimeout(function(){ $('.js-tooltip').tooltip('hide'); }, 3000);

$(document).ready(function() {
  $(".smartform").validate();
  });


$('#dropdownMenuButton1').append($('<i class="fa fa-angle-down"></i>'));

$(function() {
  $('input[type="tel"], input[type="email"]').on('keypress', function(e) {
      if (e.which == 32){
          return false;
      }
  });
});

//   $(function () {
//             var url = window.location.pathname;
//             $('.navbar .navbar-nav .nav-item a').each(function () {
//                 var href = $(this).attr('href');
//                 if (url.startsWith(href)) {
//                     $(this).parents('.nav-item').addClass('active');
//                 }
//             });
// });


$('#SlideoutSubmitbtn').click(function(){
	$('#slideOut .wpcf7-spinner').css('display', 'inline-block');
});

function funCity() {
	document.getElementById('city').style.display = "block";
			document.getElementById('city_desc').style.display = "none";
			document.getElementById('cityheading').style.display = "none";
			document.getElementById("mapcard").style.background =
				"transparent linear-gradient(109deg, #AB01FC 0%, #3325B0 100%) 0% 0% no-repeat padding-box";
			document.getElementById("mapcard").style.border = "unset";
			document.getElementById("mapcardlabel").style.color = "unset";
}

function funCityDesc() {

			document.getElementById("mapcard").style.background = "white";
			document.getElementById("mapcard").style.border = "1px solid #3C23B6";
			document.getElementById("mapcardlabel").style.color = "#3C23B6";
			document.getElementById('city_desc').style.display = "block";
			document.getElementById('cityheading').style.display = "block";
			document.getElementById('city').style.display = "none";

}
function scrollSmoothTo(elementId) {
  var element = document.getElementById(elementId);
  element.scrollIntoView({ block: 'start',  behavior: 'smooth' });
}

		
		
