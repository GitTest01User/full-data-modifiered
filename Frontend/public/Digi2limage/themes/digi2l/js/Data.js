// // NOTICE: This pen may appear to not work on mobile devices, but it is  due to the codepen footer and the browser's bottom menu bar that hide the button. It should work fine when implemented for your website

// // used to avoid using 255, thus generating white-ish backgrounds that make text unreadable
// const colorMax = 192;

// // gets the breakpoint at which the scroll-to-top button should appear
// const scrollBreakpoint = window.innerHeight * 0.9;

// document.addEventListener('DOMContentLoaded', () => {
//   randomizeBackgrounds();
//   setupScrollListener();
//   setupScrollEvent();  
// });




  $(document).ajaxStart(function () {
    $("#loader").show();
  });

  $(document).ajaxStop(function () {
    $("#loader").hide();
  });
  
// 	  Initializing Questions with Slider
  $(document).ready(function () {
    
    $('#formspinner').hide();

    $('#OTPModalbtn').hide();
    
  $("#QuestionBox").hide();
    
    $('#NonWorkingPricebtn').hide();
    
    $('#ExactPriceBtn').hide();
    
    $('#nextbtn').hide();
    
    $.post(
      "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/Main.php",
      {
        function2call: "GetListofQuestions",
        catid: 2,
      },
      function (response) {
          
        $("#QuestionBox").html(response);

    $("#QuestionBox").show();
    
    
  var questionboxslider = $('#QuestionBox').slick({
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
    draggable: false,
    swipe: false,
          prevArrow: $('#previousbtn'),
          nextArrow: $('#nextbtn')
        });
    
    $('#nextbtn').hide();

        function checkAllSelected() {
          var allSelected = true;
          $('.question-option').each(function () {
            if ($(this).val() === null) {
              allSelected = false;
              return false; 
            }
          });
          return allSelected;
        }
    
function isLastSlide() {
var currentSlide = questionboxslider.slick('slickCurrentSlide');
var slideCount = questionboxslider.slick('getSlick').slideCount;
return currentSlide === slideCount - 1;
}

var allSelectsSelected = false;

// Hide the prevarrow button on initialization
if (questionboxslider.slick('slickCurrentSlide') === 0) {
$('#previousbtn').hide();
}

    var progressBar = $('.progress-bar');
    
questionboxslider.on('afterChange', function (event, slick, currentSlide, nextSlide) {
 var progress = ((currentSlide / (slick.slideCount - 1)) * 75) + 20;
progressBar.css('width', progress + '%').attr('aria-valuenow', progress + '%');
if (checkAllSelected() && isLastSlide()) {
  $('#ExactPriceBtn').show();
  $('#nextbtn').hide();
} else {
  $('#ExactPriceBtn').hide();
  if (isLastSlide()) {
    $('#nextbtn').hide();
  } else {
    $('#nextbtn').show();
  }
}

if (currentSlide === 0) {
  $('#previousbtn').hide();
} else {
  $('#previousbtn').show();
}
});



    $(".ProdQuestions:not(#question-1)").hide();

        $('.question-option').change(function () {
          if (checkAllSelected() && isLastSlide()) {
            allSelectsSelected = true;
            $('#ExactPriceBtn').show();
            $('#nextbtn').hide();
          }
        });

        $('#previousbtn').click(function () {
          $('#ExactPriceBtn').hide();
          $('#nextbtn').show();
        });
      }
    );
  });


  
// Customer data handling
  $(document).ready(function () {
  

    $('#CustomerNewDetailSavebtn').hide();


    $('#CustCity').prop('disabled', true);
    var pincodeSelected = false;
    var pincodeList = [];

    $('#CustZipCode').on('input', function () {
      $('.CustZipCodeError').text('');
      $('#CustCity').val('');
    $('#CustState').val('');
      $('#loader').hide();
      $('.CustCityError').text('');

      var pincode = $(this).val();


      if (pincode.length === 6) {

        $.post(
          "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/Pincode.php",
          {
            function2call: "GetPincode",
            pincode: pincode,
          },
          function (response) {

            if (response && response.trim() !== "") {
              var data = JSON.parse(response);
      var pincodeList = data.Detail.Data;
        
              if (pincodeList && pincodeList.length > 0) {

                $.post(
                  "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/Pincode.php",
                  {
                    function2call: "GetCitybyPincode",
                    pincode: pincode,
                  },
                  function (response) {
                    if (response && response.trim() !== "") {
                      var data = JSON.parse(response);

                      if (data.Status) {
                        var city = data.Detail.Data.CityName;
          var state = data.Detail.Data.StateName;

                        if (city === null) {
                          $('.CustZipCodeError').text('Sorry, we are not available in your area for now!');
                        } else {
                          $('#CustCity').val(city);
              $('#CustState').val(state);
                          $('.CustZipCodeError').text('');
                        }
                      }
                    }
                  }
                );

              } else {
        $('.CustZipCodeError').text('Sorry, we are not available in your area for now!');
      }
            }
          }
        ).always(function () {
          $('#loader').hide();
        });
      }
    });
  });


  $('#ExactPriceBtn').on('click', function () {

    var ProdQuestionCount = $('.ProdQuestions').length;

    var dataArray = [];

    var j = 1;
    for (var i = 0; i < ProdQuestionCount; i++) {

      var questionerLovidValue = parseInt($("#question-" + j + " select").find(":selected").data('questionerlovid'));

      if (isNaN(questionerLovidValue)) {
        questionerLovidValue = 1;
      }

      var data = {
        qcratingId: $("#question-" + j + " select").data("qcratingid"),
        productCatId: 2,
        qcquestion: $("#question-" + j + " .QuestionText span").text(),
        ratingWeightage: parseInt($("#question-" + j + " select").find(":selected").data("ratingweightage")),
        questionerLovid: questionerLovidValue,
        condition: parseInt($("#question-" + j + " select").find(":selected").val()),
        averageSellingPrice: 14850,
        sweetner: 0.0,
        commentByQC: 'N/A',
      };

      j++;

      dataArray.push(data);
    }

    var QuestionData = JSON.stringify(dataArray);

    $.post("/wp-content/Digi2limage/themes/digi2l/inc/smartsell/Main.php", {
      function2call: 'GetQuatedPrice',
      QuestionData: QuestionData,
    }, function (response) {

      var jsonData = JSON.parse(response);
      if (jsonData.status_Code === 200) {
        $("#QuotedPrice span").text(jsonData.data.quotedPrice);
        $('#QuestionsFieldset').hide();
        $('#ResultFieldset').show();
      } else {
        alert('Something went wrong!');
      }

    });
  
  var sectionOffset = $('#ResultFieldset').offset().top;

$('html, body').animate({
scrollTop: sectionOffset
}, 1000);

  });


// Customer details data handling
  $('#CustomerEditbtn').click(function () {

    var CustomerDetailsInput = $('.customerdetailsrow input');
CustomerDetailsInput.not('#CustPhoneNumber, #CustCity, #CustState').prop('disabled', false);

    $.ajax({
      url: '/wp-content/Digi2limage/themes/digi2l/inc/smartsell/connections/signout.php',
      method: 'POST',
      success: function (response) {
          $('#OTPModalbtn').show();
      },
      error: function (xhr, status, error) {
        console.error('Error destroying session:', error);
      }
    });

    $(this).hide();

    $('#CustomerNewDetailSavebtn').show();

  });
  
  
  // otp handling 

  $('#OTPModalbtn').click(function(){
      $('#GetPriceModal').modal('show');
  });
  
$('#verifyOTPExactValuePage').click(function(e) {

e.preventDefault();

  var OTPNumber = $("#mobileNumber").val();
  var OTP = $("#validateOTP").val();

  $.post(
    "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/Main.php",
    {
      function2call: "VerifyOTP",
      OTPNumber: OTPNumber,
      OTP: OTP,
    },
    function (response) {
      if (response == "OTP Verified") {
    
    $('#CustPhoneNumber').val(OTPNumber);
    $('#OTPModal').modal('hide');

      } else {
        $('#otpErr').show();
        $("#validateOTP").addClass("is-invalid");
        $("#otpErr").text("Please enter valid OTP!");
      }
    }
  );
  })

// 	  Saving new details as new customer
  $("#CustomerNewDetailSavebtn").click(function () {
    var name = $("#CustName").val();
    var names = name.trim().split(" ");
    var fname = names[0];
    var lname = names[1] || ''; // Handle the case when last name is not provided

    var CustomerData = {
      FirstName: fname,
      LastName: lname,
      Email: $("#CustEmail").val(),
      ZipCode: $("#CustZipCode").val(),
      City: $("#CustCity").val(),
      State: $("#CustState").val(),
      Address1: $("#CustAddress1").val(),
      Address2: $("#CustAddress2").val(),
      CustName: $("#CustName").val(),
      PhoneNumber: $("#CustPhoneNumber").val(),
    };

    var CustomerDataJson = JSON.stringify(CustomerData);

    $.post(
      "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/connections/update_customer.php",
      {
        CustomerData: CustomerDataJson,
      },
      function (response) {
        $("#loader").hide();
      }
    );
  });


// Get non working price on first question select
  $(document).on("change", "#question-1 select", function () {
    if ($("#question-1 select").val() == "6") {
      $(".ProdQuestions").show();
  $('.ProdQuestions').addClass('ProdQuestions-bordered');
  $('#NonWorkingPricebtn').hide();
      $('#nextbtn').show();
  
    } else {
  $('#nextbtn').hide();
// Remove all existing answerHtml elements
  $('.AnswersBox ul').remove();
    $('.progress-bar').css('width', '90%');

  // Append the currently selected answerHTML
  var questionText = $("#question-1 .QuestionText").text();
  var answerHtml = '<ul><li>' + questionText + '</li><li>' + $('option:selected', this).text() + '</li></ul>';
  $('.AnswersBox').append(answerHtml);
      $(".ProdQuestions:not(#question-1)").hide();

    $('#NonWorkingPricebtn').show();
        $('#nextbtn').hide();

      $.post(
        "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/Main.php",
        {
          function2call: "GetProductNonWorkingPrice",
          producttypeid: 96,
          techid: 3,
        },
        function (response) {

          var jsonData = JSON.parse(response);

          if (jsonData.status_Code === 200) {
            $("#QuotedPrice span").text(jsonData.data.nonWorkingPrice);
            $('#QuestionsFieldset').hide();
            $('#ResultFieldset').show();
          } else {
            alert('Something went wrong!');
          }
        }
      );
      
    }
  });
  $(document).on('change', '.question-option', function () {
    $(".AnswersBox").animate({ scrollTop: $('.AnswersBox').prop("scrollHeight")}, 1000);
  
  
  var selectedOption = $(this).val();
  var questionText = $(this).closest('.card').find('.QuestionText').text();
  
  var existingAnswer = $('.AnswersBox').find('ul').filter(function () {
    return $(this).find('li:first').text() === questionText;
  });
  
  if (existingAnswer.length > 0) {
    existingAnswer.find('li:last').text($('option:selected', this).text());
  } else {
    var answerHtml = '<ul><li>' + questionText + '</li><li>' + $('option:selected', this).text() + '</li></ul>';
    var questionNumber = parseInt(questionText.match(/^\d+/));
    var inserted = false;
    $('.AnswersBox ul').each(function () {
      var currentQuestionNumber = parseInt($(this).find('li:first').text().match(/^\d+/));
      if (questionNumber < currentQuestionNumber) {
        $(this).before(answerHtml);
        inserted = true;
        return false;
      }
    });
    if (!inserted) {
      $('.AnswersBox').append(answerHtml);
    }
  }
  });
  
  
  $('#NonWorkingPricebtn').click(function() {
    $.post(
        "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/Main.php",
        {
          function2call: "GetProductNonWorkingPrice",
          producttypeid: 96,
          techid: 3,
        },
        function (response) {

          var jsonData = JSON.parse(response);

          if (jsonData.status_Code === 200) {
            $("#QuotedPrice span").text(jsonData.data.nonWorkingPrice);
            $('#QuestionsFieldset').hide();
            $('#ResultFieldset').show();
          } else {
            alert('Something went wrong!');
          }
        }
      );
  });


// Adding question and answer to right sidebar


  $('#ViewProductreport').click(function () {
    $('#QuestionsFieldset').show();
    $('#ResultFieldset').hide();
  });
  
$('input').on('input', function() {
    $(this).closest('div').find('.ErrorMsg').text('');
  });

// Order place handling
  $("#PlaceOrderbtn").on("click", function (e) {
  
  $(this).hide();
  
  $('#formspinner').show();

    e.preventDefault(); 
    
    var valid = true;

    // Validate name
    var name = $("#CustName").val();
    if (name.trim().split(" ").length < 2 || name.trim() === "") {
      $("#CustName").addClass("is-invalid");
      $(".CustNameError").text("Please enter your first name & last name.");
      valid = false;
    } else {
      $("#CustName").removeClass("is-invalid");
      $(".CustNameError").text("");
    }

    // Validate phone number
    var phone = $("#CustPhoneNumber").val();
    if (!/^\d{10}$/.test(phone) || phone.trim() === "") {
      $("#CustPhoneNumber").addClass("is-invalid");
      $(".CustPhoneNumberError").text("Please enter a valid phone number.");
      valid = false;
    } else {
      $("#CustPhoneNumber").removeClass("is-invalid");
      $(".CustPhoneNumberError").text("");
    }

    // Validate email
    var email = $("#CustEmail").val();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.trim() === "") {
      $("#CustEmail").addClass("is-invalid");
      $(".CustEmailError").text("Please enter a valid email address.");
      valid = false;
    } else {
      $("#CustEmail").removeClass("is-invalid");
      $(".CustEmailError").text("");
    }

    // Validate pincode
    var pincode = $("#CustZipCode").val();
    if (!/^\d{6}$/.test(pincode) || pincode.trim() === "") {
      $("#CustZipCode").addClass("is-invalid");
      $(".CustZipCodeError").text("Please enter your pincode.");
      valid = false;
    } else {
      $("#CustZipCode").removeClass("is-invalid");
      $(".CustZipCodeError").text("");
    }

    // Validate address line 1
    var address1 = $("#CustAddress1").val();
    if (address1.trim() === "") {
      $("#CustAddress1").addClass("is-invalid");
      $(".CustAddress1Error").text("Please enter your address.");
      valid = false;
    } else {
      $("#CustAddress1").removeClass("is-invalid");
      $(".CustAddress1Error").text("");
    }

    // Validate city
    var city = $("#CustCity").val();
    if (city.trim() === "") {
      $("#CustCity").addClass("is-invalid");
      $(".CustCityError").text("Please enter a valid city.");
      valid = false;
    } else {
      $("#CustCity").removeClass("is-invalid");
      $(".CustCityError").text("");
    }

if (valid) {
var question1Value = parseInt($("#question-1 select").val());
var productCondition = '';

if (question1Value === 6) {
productCondition = 'Excellent';
} else {
productCondition = 'Not Working';
}

var OrderDataRaw = {
  CustomerID: '7598',
  ProductID: '2',
  BrandId: '1',
  bonus: 0,
  ProductCondition: productCondition,
  CompanyName: "D2C",
  ProductTypeId: '96',
  AverageSellingPrice: '14850',
  ExcellentPriceByASP: 0,
  QuotedPrice: parseFloat($("#QuotedPrice span").text()),
  Sweetner: 0.0,
  QuotedPriceWithSweetner: parseFloat($("#QuotedPrice span").text()),
  FinalPrice: parseFloat($("#QuotedPrice span").text()),
  NonWorkingPrice: parseFloat($("#QuotedPrice span").text()),
  ProductTechnologyId: '3'
};

var OrderData = JSON.stringify(OrderDataRaw);
  

$.ajax({
type: "POST",
url: "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/connections/insert_order.php",
data: {
  function2call: "InsertProduct",
  OrderData: OrderData
},
success: function (response) {
  InsertQuestions();
},
error: function (xhr, status, error) {
  console.error("Error occurred:", error);
  alert('Something went wrong, please try again!');
window.location.href = '/smart-sell/?msg=nosession';
}
});
} else {
$('#PlaceOrderbtn').show();
$('#formspinner').hide();
}

});

function InsertQuestions() {

   var ProdQuestionCount = $(".ProdQuestions").length;

  
    var QuestiondataArray = [];

    var j = 1;
    for (var i = 0; i < ProdQuestionCount; i++) {
var questionerLovidValue = parseInt($("#question-" + j + " select").find(":selected").data('questionerlovid'));

if (isNaN(questionerLovidValue)) {
  questionerLovidValue = 1;
}

var ratingWeightageValue = parseInt($("#question-" + j + " select").find(":selected").data("ratingweightage"));
if (isNaN(ratingWeightageValue)) {
  ratingWeightageValue = 0;
}

// Get condition value
var conditionValue = parseInt($("#question-" + j + " select").find(":selected").val());
var condition = null;
if (!isNaN(conditionValue)) {
  condition = conditionValue;
}

var Questiondata = {
  qcratingId: $("#question-" + j + " select").data("qcratingid"),
  productCatId: 2,
  qcquestion: $("#question-" + j + " .QuestionText span").text(),
  ratingWeightage: ratingWeightageValue,
  questionerLovid: questionerLovidValue,
  condition: condition,
  averageSellingPrice: 14850,
  sweetner: 0.0,
  commentByQC: 'N/A',
};

j++;

QuestiondataArray.push(Questiondata);
}



var QuestionerData = JSON.stringify(QuestiondataArray);

  
$.ajax({
type: "POST",
url: "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/connections/insert_order.php",
data: {
  function2call: "InsertQuestions",
  QuestionerData: QuestionerData
},
success: function (response) {
  PlaceOrder();
},
error: function (xhr, status, error) {
 console.error("xhr:" + xhr);
console.error("Status: " + status);
console.error("Error: " + error);
alert('Something went wrong, please try again!');
window.location.href = '/smart-sell/?msg=nosession';
}
});


}

function PlaceOrder() {
  
  var name = $("#CustName").val();
  var names = name.trim().split(" ");
  var fname = names[0];
  var lname = names[1];

  var CustomerData = {
    FirstName: fname,
    LastName: lname,
    Email: $("#CustEmail").val(),
    ZipCode: $("#CustZipCode").val(),
    City: $("#CustCity").val(),
    State: $("#CustState").val(),
    Address1: $("#CustAddress1").val(),
    Address2: $("#CustAddress2").val(),
    CustName: $("#CustName").val(),
    PhoneNumber: $("#CustPhoneNumber").val(),
  };

try {
  var CustomerDataJson = JSON.stringify(CustomerData);
} catch (error) {
  console.error("Error occurred while converting data to JSON:", error);
  return;
}

$.post(
  "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/connections/post_order.php",
  {
    CustomerData: CustomerDataJson,
  },
  function (response) {
    $('#loader').hide();
    try {
      var JSONresponse = JSON.parse(response);

      if (JSONresponse.status === true) {
        var orderRegdNo = JSONresponse.data[0].orderRegdNo;
        window.location.href = '/thank-you/?RegdNo=' + orderRegdNo;
      } else {
     alert('Something went wrong, please try after sometime!');
     window.location.href = '/smart-sell/?msg=nosession';
        console.error("Error occurred:", JSONresponse.errors);
      }
    } catch (error) {
    alert('Something went wrong, please try after sometime!');
    window.location.href = '/smart-sell/?msg=nosession';
      console.error("Error occurred while processing the server response:", error);
    }
  }
);
}

  
$(document).ready(function(){

console.log(7598);

var catid = 2;
var producttypeid = 96;

$.post(
  "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/Main.php", {
    function2call: "GetProductTypeImage",
    catid: catid,
  producttypeid: producttypeid
  },
  function(response) {
  $('#main-image').attr('src', response);
  }
);
});
  



