// $(document).ajaxStart(function () {
//     $("#loader").show();
//   });
  
//   $(document).ajaxStop(function () {
//     $("#loader").hide();
//   });
  
  
  // const baseURL = () => {
  //     return window.location.origin;
  // }
  
  if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
  }
  
  // $(document).ready(function () {
    
  //       var today = new Date();
  
  //       $('#validationInvoiceDate').datepicker({
  //         format: 'mm/dd/yyyy',
  //         endDate : today
  //       });
  //       var date = Date();
  //       const D = new Date();
  //       var month = D.getMonth() + 1 // 10 (PS: +1 since Month is 0-based)
  //       var day = D.getDate() // 30
  //       var year = D.getFullYear()
  
  //       var currdate = day + "/" + month + "/" + year;
  //       $('#validationUploadDate').val(currdate);
  
  //       //$('#validationUploadDate').datepicker('setDate', 'today');
  //     });
  
  
  
  $(document).ready(function () {
    
    $('#plan').hide();
    $('#smartSellPlanForm select').select2({
      minimumResultsForSearch: -1
    });
    $('#floatingProductGroup').select2({
      minimumResultsForSearch: -1
    });
  
    $('select').on("select2:selecting", function (e) {
      $(this).siblings('.floating-label').addClass('small-floating-label');
  
    });
  
    $('#floatingProductGroup').on("select2:selecting", function (e) {
      $(this).siblings('.floating-label').addClass('small-floating-label');
  
    });
  
  });
  
  
  $(document).ready(function (e) {
  
    $.post(`${baseURL()}/wp-content/Digi2limage/themes/digi2l/inc/abb/Main.php`, {
      function2call: 'GetCategoryList'
    }, function (response) {
      $(".GetCategoryListAPI").html(response);
    });
  });
  
  $(document).ready(function (e) {
    var productCatId = $('#ProdCatId').val();
    $.post(`${baseURL()}/wp-content/Digi2limage/themes/digi2l/inc/abb/Main.php`, {
      function2call: 'GetAllBrandDetails',
        productCatId: productCatId
    }, function (response) {
      $("#validationProductBrand").html(response);
    });
  });
  
  
  // $(document).ready(function () {
  //   $('#BSbtnsuccess').on('change', function () {
  //     var file_data = $('#BSbtnsuccess').prop('files')[0];
  //     var form_data = new FormData();
  //     form_data.append('file', file_data);
  //     $('#Mainloader').show();
  //     $.ajax({
  //       url: 'ORC.php',
  //       type: 'POST',
  //       data: form_data,
  //       contentType: false,
  //       processData: false,
  //       success: function (response) {
  //         $('#Mainloader').hide();
  //         $('#InvoiceFeedback').css('display', 'block');
  //         $('#InvoiceFeedback').html(response);
  //       }
  //     });
  //   });
  // });
  
  
  
  $('.GetCategoryListAPI').change(function () {
  
    var element = $(this).find('option:selected');
    var productCatId = element.val();
  
    $.post(`${baseURL()}/wp-content/Digi2limage/themes/digi2l/inc/abb/Main.php`, {
      function2call: 'GetProductTypeByCatId',
      productCatId: productCatId
    }, function (response) {
      $(".GetProductTypeAPI").html(response);
  
    });
      
      
  });
                                  
  
  
  $('#nxt-step').click(function () {
  
    var ProductType = $('.GetProductTypeAPI').find('option:selected');
    var ProductTypeID = ProductType.val();
  
    var productCat = $('.GetCategoryListAPI').find('option:selected');
    var productCatId = productCat.val();
  
    var productPrice = $('#productPrice').val();
  
    var productTypeText = $('.GetProductTypeAPI').find('option:selected').text();
    var productCatText = $('.GetCategoryListAPI').find('option:selected').text();
  
  
    if ($('.GetProductTypeAPI').val() == '') {
      $('#plan').hide();
      alert('Please select product type!')
    } else if ($('.GetCategoryListAPI').val() == '') {
      $('#plan').hide();
      alert('Please select product group!')
    } else if ($('#productPrice').val() == '') {
      $('#plan').hide();
      alert('Please enter product price!')	  
    }  else {
      $('#plan').show();
      $('html, body').animate({
        scrollTop: $("#plan").offset().top + 100
      }, 1000);
    }
  
  
  
    $('#productGroupText').val(productCatText);
    $('#productTypeText').val(productTypeText);
  
  
   $.post(`${baseURL()}/wp-content/Digi2limage/themes/digi2l/inc/abb/Main.php`, {
    function2call: 'GetPlanPriceDetails',
    productCatId: productCatId,
    ProductTypeID: ProductTypeID,
    productPrice: productPrice,
  }, function (response) {
    $("#PlanPriceDetails").html(response);
    
    // Check if the response contains the desired HTML element
    if ($(response).find('#NoPlanPriceFound').length) {
      
     $("#AcceptPlanBtn").hide();
        $(".plan-price-tbl").hide()
    } else {
       $.post(`${baseURL()}/wp-content/Digi2limage/themes/digi2l/inc/abb/Main.php`, {
        function2call: 'GetPlanDetails',
        productCatId: productCatId,
        ProductTypeID: ProductTypeID,
        productPrice: productPrice,
      }, function (response) {
           
           $("#AcceptPlanBtn").show();
           $(".plan-price-tbl").show()
        $("#planPriceDetailList").html(response);
      });  
    }
  });
  
  
  
  });
  
  
  $('#validationProductBrand').change(function () {
    var validationProductBrand = $('#validationProductBrand').find('option:selected').text();
    $('#validationProductBrandText').val(validationProductBrand);
  
    var validationProductBrand = $('#validationProductBrand').find('option:selected').text();
    $('#validationProductBrandText').val(validationProductBrand);
  });
  
  
  $('#AcceptPlanBtn').click(function () {
  
    var PlanPriceInput = $('#PlanPrice').text();
    var PlanPeriodInput = $('#PlanPeriod').text();
    var NoClaimPeriodInput = $('#NoClaimPeriod').text();
  
    $('#PlanPriceInput').val(PlanPriceInput);
    $('#PlanPeriodInput').val(PlanPeriodInput);
    $('#NoClaimPeriodInput').val(NoClaimPeriodInput);
  
  })
  
  
  $('#product-review-2-btn').click(function (e) {
    var validationProductBrand = $('#validationProductBrand').find('option:selected');
    if ($(validationProductBrand).attr('disabled')) {
      e.preventDefault();
      alert('Please select product brand!');
    }
  });
  
  $('.gobackbtn').click(function () {
    window.history.go(-1);
    return false;
  });
  
  
  
  $('#ProcessGIF').hide();
  $('#OrderPlaced').hide();
  
  $('#PostABBOrderbtnHidden').click(function () {
  
    $('#ProcessGIF').show();
  
    $('#Processbtns').hide();
  
    $.post(`${baseURL()}/wp-content/Digi2limage/themes/digi2l/inc/abb/PostABBOrder.php`, {
      function2call: 'PostABBOrder',
    }, function (data1) {
      
      $('#PostOrderResponse').text(data1);
  
  
    });
  
  });
  
  
  $('#PostABBOrderbtn').click(function () {
  
    $('#loader').hide();
  
    $('#ProcessGIF').show();
  
    $('#Processbtns').hide();
  
    $.post(`${baseURL()}/wp-content/Digi2limage/themes/digi2l/inc/abb/PostABBOrder.php`, {
      function2call: 'PostABBOrder',
    }, function (PaymentURL, orderRegdNo, data1) {
      
      $("#Mainloader").css('display', 'flex');
        
      setTimeout(function () {
        window.location.href = PaymentURL;
      }, 5000);
  
    });
  
  });
  
  
  $('#AcceptPlanBtn').click(function (e) {
  
        e.preventDefault();	
      
        // $('#mobileNumber').val('');
        // $('#validateOTP').val('');
    
        // $('#GetPriceModal').modal('show');
  
        $('#smartSellPlanForm').submit();
       
    
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
      `${baseURL()}/wp-content/Digi2limage/themes/digi2l/inc/abb/Main.php`,
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
      `${baseURL()}/wp-content/Digi2limage/themes/digi2l/inc/abb/Main.php`,
      {
        function2call: "VerifyOTP",
        OTPNumber: OTPNumber,
        OTP: OTP,
      },
      function (response) {
        
        if (response == "OTP Verified") {
      
          $('#hiddensubmitbtn').click();
  
          $('#smartSellPlanForm').submit();
          
        } else {
          $('#otpErr').show();
          $("#validateOTP").addClass("is-invalid");
          $("#otpErr").text("Please enter valid OTP!");
        }
      }
    );
  });
  
  
  $(document).on('keypress', function (e) {
      if (e.which == 13) {
          e.preventDefault();
          return false;
      }
  });





























// $(document).ready(function (e) {
//     $("#txtPincode").autocomplete();
//     $.post("/wp-content/Digi2limage/themes/digi2l/inc/smartsell-api/DropdownMaster.php", {
//         function2call: 'GetCategoryList'
//     }, function (response) {
//         //    var data = response.split('^');
//         // console.log(response);
//         $("#ddlProductCat").html(response);

//     });
//     GetProductPrice();
// });

function GetProductTypeByCatId(_productCatId) {
  var productCatId = _productCatId;
  // console.log(productCatId);
  $.post("/wp-content/Digi2limage/themes/digi2l/inc/smartsell-api/DropdownMaster.php", {
      function2call: 'GetProductTypeByCatId',
      productCatId: productCatId
  }, function (response) {
      var data = response.split('^');
      // console.log(data);
      $("#ddlProductType").html(response);
      GetProductBrandByCatId(productCatId);

  });
  GetProductPrice();
}

function GetProductBrandByCatId(_productCatId) {
  var productCatId = _productCatId;
  // console.log(productCatId);
  $.post("/wp-content/Digi2limage/themes/digi2l/inc/smartsell-api/DropdownMaster.php", {
      function2call: 'GetProductBrandByCatId',
      productCatId: productCatId
  }, function (response) {
      var data = response.split('^');
      // console.log(data);
      $("#ddlProductBrand").html(response);
  });
}


$('#ddlProductCat, #ddlProductType, #ddlProductBrand, input[type="radio"]').change(function () {
  GetProductPrice();
});

































  
  
  
    
  