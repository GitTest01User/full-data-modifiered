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