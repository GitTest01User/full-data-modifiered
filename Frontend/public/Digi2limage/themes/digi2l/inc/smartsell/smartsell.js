$(document).ajaxStart(function () {
  $("#loader").show();
});

$(document).ajaxStop(function () {
  $("#loader").hide();
});

$(document).ready(function (e) {
	
  $('#GetPriceBtn').prop('disabled', true);
  $('#GetPriceBtnDirect').prop('disabled', true);
	
  $("input").on("keypress", function (e) {
    if (e.which === 32 && e.target.selectionStart === 0) {
      return false;
    }
  });

  $(".WorkingQuestions").hide();

  $.post(
    "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/Main.php",
    {
      function2call: "GetProductCategory",
    },
    function (response) {
      $("#ddProductCategory").html(response);
		
      var catid = getCategoryID();
      if ($('.singleCatPage').length) {
        $('#ddProductCategory').val(catid);
        $('#ddProductCategory option[value="' + catid + '"]').prop('selected', true);
      }
		
    }
  );
});

$("#ddProductCategory").change(function () {
  var catid = $(this).val();

  $.post(
    "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/Main.php",
    {
      function2call: "GetProductType",
      catid: catid,
    },
    function (response) {
      $("#ddlProductType").html(response);
    }
  );

  $("#ddlProductType").prop("disabled", false);
  $("#ddProductTechnology").prop("disabled", true);
  $("#ddlProductBrand").prop("disabled", true);
  $("#ddlProductBrand").html(
    '<option value="" disabled selected>--- Select Product Brand ---</option>'
  );
  $("#ddProductTechnology").html(
    '<option value="" disabled selected>--- Select Product Technology ---</option>'
  );
});

var catid;

$(document).ready(function() {

  var ddlProductType = $("#ddlProductType");
  var ddlProductBrand = $("#ddlProductBrand");
  var ddProductTechnology = $("#ddProductTechnology");
	
  var catid = getCategoryID();

  $.post(
    "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/Main.php", {
      function2call: "GetProductType",
      catid: catid,
    },
    function(response) {
      ddlProductType.html(response);
    }
  );

  ddProductTechnology.prop("disabled", true);
  ddlProductBrand.prop("disabled", true);
  ddlProductType.html('<option value="" disabled selected>--- Select Product Type ---</option>');
  ddlProductBrand.html('<option value="" disabled selected>--- Select Product Brand ---</option>');
  ddProductTechnology.html('<option value="" disabled selected>--- Select Product Technology ---</option>');

  ddlProductType.change(function() {
    var ProductTypeID = $(this).val();
	catid = getCategoryID();
    GetProductBrandByCatId(ProductTypeID, catid);
  });
});

function getCategoryID() {

  if ($('.ddlProductTypeAC').length) {
    return 4;
  } else if ($('.ddlProductTypeWM').length) {
    return 2;
  } else if ($('.ddlProductTypeTV').length) {
    return 3;
  } else if ($('.ddlProductTypeRF').length) {
    return 1;
  } else {
    return $("#ddProductCategory").val();
  }
	
}


function GetProductBrandByCatId(ProductTypeID, catid) {

  $.post(
    "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/Main.php", {
      function2call: "GetProductBrands",
      catid: catid,
      producttypeid: ProductTypeID,
    },
    function(response) {
      $("#ddlProductBrand").html(response);
      ProductASP();
    }
  );

  $("#ddlProductBrand").prop("disabled", false);
  $("#ddProductTechnology").prop("disabled", true);
  $("#ddProductTechnology").html('<option value="" disabled selected>--- Select Product Technology ---</option>');
  $("#QuestionBox").hide();
}

$("#ddlProductBrand").change(function () {
	
	var catid = getCategoryID();
	
  $.post(
    "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/Main.php",
    {
      function2call: "GetProductTechnology",
      catid: catid,
    },
    function (response) {
      $("#ddProductTechnology").html(response);
    }
  );

  $("#ddProductTechnology").prop("disabled", false);
});



$("#ddProductTechnology").change(function () {
  $.post(
    "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/Main.php",
    {
      function2call: "GetListofQuestions",
      catid: $("#ddProductCategory").val(),
    },
    function (response) {
      $("#QuestionBox").html(response);
      $(".ProdQuestions:not(#question-1)").hide();
    }
  );

  $("#PriceBox").hide();
  $("#QuestionBox").show();

  ProductASP();
});


function ProductASP() {


  var producttypeid = $("#ddlProductType").val();
  var techid = $("#ddProductTechnology").val();
  var brandid = $("#ddlProductBrand").val();


  if (producttypeid != null && techid != null && brandid != null) {
    $.ajax({
      url: "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/Main.php",
      type: "post",
      data: {
        function2call: "GetProductASP",
        producttypeid: producttypeid,
        techid: techid,
        brandid: brandid,
      },
      success: function (response) {
        var jsonData = JSON.parse(response);
        if (jsonData.status_Code === 200) {
          $("#AverageSellingPrice").val(jsonData.data.averageSellingPrice);
          $("#ExcellentPrice").val(jsonData.data.excellentPrice);
          $('#GetPriceBtn').prop('disabled', false);
          $('#GetPriceBtnDirect').prop('disabled', false);
        } else {
          alert('No price found for your product!');
          $('#GetPriceBtn').prop('disabled', true);
          $('#GetPriceBtnDirect').prop('disabled', true);
        }
    },
    error: function(xhr, textStatus, errorThrown) {
        console.log(errorThrown);
    },
    });
  } else {
    $('#GetPriceBtn').prop('disabled', true);
    $('#GetPriceBtnDirect').prop('disabled', true);
    $("#AverageSellingPrice").val('');
    $("#ExcellentPrice").val('');
  }
}


$('#GetPriceBtn').click(function (e) {

  e.preventDefault();
	
    
      $('#mobileNumber').val('');
      $('#validateOTP').val('');
  
  
      if ($('#nameform').valid()) {
          $('#GetPriceModal').modal('show');
      } else {
          return false;
      }
  
  });

  
$('#GetPriceBtnDirect').click(function (e) {

  e.preventDefault();


    var cartDataArray = {
            category: $("#ddProductCategory option:selected").text(),
            type: $("#ddlProductType option:selected").text(),
            brand: $("#ddlProductBrand option:selected").text(),
            technology: $("#ddProductTechnology option:selected").text(),
            categoryValue: $("#ddProductCategory option:selected").val(),
            typeValue: $("#ddlProductType option:selected").val(),
            brandValue: $("#ddlProductBrand option:selected").val(),
            technologyValue: $("#ddProductTechnology option:selected").val(),
            ExcellentPrice: $("#ExcellentPrice").val(),
            AverageSellingPrice: $("#AverageSellingPrice").val(),
		productTypeImage: $("#productTypeImage").val(),
          };
          var CartData = JSON.stringify(cartDataArray);
        
          $.post(
            "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/connections/insert_order.php",
            {
              function2call: "InsertDummyCustomer",
              CartData: CartData
            },
            function (response) {
            }
          );

          $('#nameform').submit();

});


$('#EditNo').click(function () {
    $('#OTPModal').modal('hide');
    $('#GetPriceModal').modal('show');
});

$('#mobileNumber').change(function () {
    var MobileNumber = $('#mobileNumber').val();
    $('#UserNo').html('+91 ' + MobileNumber);
    $('#hiddenphoneno').val(MobileNumber);
});

$('#mobileNumber').click(function () {
  $('#phoneErr').text('');
  $('#hiddenphoneno').val($(this).val());
});

$('#validateOTP').click(function () {
  $('#otpErr').hide();
});

$(document).on('keypress', function (e) {
  if (e.which == 13) {
      e.preventDefault();
      return false;
  }
});

$(document).ready(function () {

    $('#otpErr').hide();

});


function sendSMS() {
  var custMobNo = $('#customermobileno').val();
  $('#hiddenmobileno').val(custMobNo);
  $('#hiddenmobilenobtn').click();
}


$("#sendOTP").click(function (e) {

  $('#validateOTP').val('');

  e.preventDefault();

  var OTPNumber = $("#mobileNumber").val();

  if (!/^\d{10}$/.test(OTPNumber)) {
    $("#mobileNumber").addClass("is-invalid");
    $(".Validation-Error").text("Please enter valid mobile number!");
    return false;
  } else {
    $("#mobileNumber").removeClass("is-invalid");
    $(".Validation-Error").text("");

    $('#OTPModal').modal('show');
    $('#GetPriceModal').modal('hide');

    $.post(
      "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/Main.php",
      {
        function2call: "SendOTP",
        OTPNumber: OTPNumber,
      },
      function (response) {
        console.log('OTP Sent Successfully');
      }
    );
  }
});

$("#mobileNumber").click(function(){
  $(this).removeClass("is-invalid");
  $(".Validation-Error").text("");
});


$("#verifyOTP").click(function (e) {

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
			
		  $('#hiddensubmitbtn').click();

          var cartDataArray = {
            category: $("#ddProductCategory option:selected").text(),
            type: $("#ddlProductType option:selected").text(),
            brand: $("#ddlProductBrand option:selected").text(),
            technology: $("#ddProductTechnology option:selected").text(),
            categoryValue: $("#ddProductCategory option:selected").val(),
            typeValue: $("#ddlProductType option:selected").val(),
            brandValue: $("#ddlProductBrand option:selected").val(),
            technologyValue: $("#ddProductTechnology option:selected").val(),
            ExcellentPrice: $("#ExcellentPrice").val(),
            AverageSellingPrice: $("#AverageSellingPrice").val(),
			productTypeImage: $("#productTypeImage").val(),
          };
          var CartData = JSON.stringify(cartDataArray);
        
          $.post(
            "/wp-content/Digi2limage/themes/digi2l/inc/smartsell/connections/insert_order.php",
            {
              function2call: "InsertDummyCustomer",
              CartData: CartData,
              MobileNumber: OTPNumber
            },
            function (response) {
            }
          );

          $('#nameform').submit();
        } else {
          $('#otpErr').show();
          $("#validateOTP").addClass("is-invalid");
          $("#otpErr").text("Please enter valid OTP!");
        }
      }
    );


});


