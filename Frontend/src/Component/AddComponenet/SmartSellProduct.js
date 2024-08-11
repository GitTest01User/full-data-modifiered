import React, { useRef } from "react";

import { useEffect } from "react";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import Row from "react-bootstrap/Row";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

import ServerAPI from "../../WebService/Server/ServerAPI";

import { useAuthContext } from "../LocalData/AuthToken";
import { useDispatch } from "react-redux";
import { ChangeDetails } from "../../Redux/Dataslice";
import Get from "../../WebService/Fuction/Get";

export default function SmartSellProduct() {
  var dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  var { token } = useAuthContext();

  var navigation = useNavigate();
  const productCategorySelectRef = useRef(null);
  const productTypeSelectRef = useRef(null);
  const productBrandSelectRef = useRef(null);
  const productTechnologySelectRef = useRef(null);
  const buttonSelectRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState([]);

  useEffect(() => {
    GetProdCate();
    $('label[for="id_url"]').hide();
    $().prop("disabled", true);
    $(buttonSelectRef.current).prop("disabled", true);
    $(productBrandSelectRef.current).prop("disabled", true);
    $(productTechnologySelectRef.current).prop("disabled", true);

    $(productCategorySelectRef.current).on("change", () => {
      const selectedCategory = $(productCategorySelectRef.current).val();

      if (selectedCategory !== "--- Select Product Category ---") {
        $(productTypeSelectRef.current).prop("disabled", false);
        $("#ddlProductTechnology").prop("disabled", true);
        $("#ddlProductBrand").prop("disabled", true);
      } else {
        $(productCategorySelectRef.current).on("change", () => {
          const selectedCategory = $(productCategorySelectRef.current).val();

          if (selectedCategory !== "--- Select Product Category ---") {
            $("#ddlProductType").prop("disabled", false);
            $("#ddlProductTechnology").prop("disabled", true);
            $("#ddlProductBrand").prop("disabled", true);
          } else {
            $("#ddlProductType").prop("disabled", false);
            $("#ddlProductTechnology").prop("disabled", true);
            $("#ddlProductBrand").prop("disabled", true);
          }
        });
      }
    });
    $(productTypeSelectRef.current).on("change", () => {
      const selectedType = $(productTypeSelectRef.current).val();

      if (selectedType !== "--- Select Product Type ---") {
        $(productBrandSelectRef.current).prop("disabled", false);

        $("#ddlProductTechnology").prop("disabled", true);
      } else {
        $("#ddlProductType").prop("disabled", false);
        $("#ddlProductTechnology").prop("disabled", true);
        $("#ddlProductBrand").prop("disabled", true);
      }
    });
    $(productBrandSelectRef.current).on("change", () => {
      const selectedBrand = $(productBrandSelectRef.current).val();

      if (selectedBrand !== "--- Select Product Brand ---") {
        $(productTechnologySelectRef.current).prop("disabled", false);
      } else {
        $(productTypeSelectRef.current).prop("disabled", true);
        $(productBrandSelectRef.current).prop("disabled", true);
        $(productTechnologySelectRef.current).prop("disabled", true);
      }
    });
    $(productTechnologySelectRef.current).on("change", () => {
      const selectedButton = $(productTechnologySelectRef.current).val();

      if (selectedButton !== "--- Select Product Button ---") {
        $(buttonSelectRef.current).prop("disabled", false);
      } else {
        $(productTypeSelectRef.current).prop("disabled", true);
        $(productBrandSelectRef.current).prop("disabled", true);
        $(productTechnologySelectRef.current).prop("disabled", true);
      }
    });
  }, [token]);

  const GetProdCate = async (e) => {
    try {
      Get(ServerAPI.GetProductCategory, token)
        .then(handleResponse)
        .then(processGetCate)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const GetProdType = async (selectedCategoryId) => {
    $("#ddlProductType").val(0);
    $("#ddlProductBrand").val(0);
    $("#ddlProductTechnology").val(0);

    try {
      Get(`${ServerAPI.GetProductType}?catId=${selectedCategoryId}`, token)
        .then(handleResponse)
        .then(processGetType)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const GetProdBrand = async (prodTypeId) => {
    var selectedCategoryId = $("#ddProductCategory").val();

    $("#ddlProductBrand").val(0);
    $("#ddlProductTechnology").val(0);
    try {
      Get(
        `${ServerAPI.GetProductBrand}?catId=${selectedCategoryId}&productTypeid=${prodTypeId}`,
        token
      )
        .then(handleResponse)
        .then(processGetBrand)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const GetProdTechnology = async (e) => {
    var selectedCategoryId = $("#ddProductCategory").val();
    $("#ddlProductTechnology").val(0);
    try {
      Get(
        `${ServerAPI.GetProductTechnology}?catId=${selectedCategoryId}`,
        token
      )
        .then(handleResponse)
        .then(processGetTechnology)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const processGetCate = (result) => {
    if (result.Status) {
      setSelectedCategory(result.data);
    } else {
      setSelectedCategory(result.data);
    }
  };
  const processGetType = (result) => {
    if (result.Status) {
      setSelectedType(result.data);
    } else {
      setSelectedType(result.data);
    }
    if (result.data) {
    }
  };
  const processGetBrand = (result) => {
    if (result.Status) {
      setSelectedBrand(result.data);
    } else {
      setSelectedBrand(result.data);
    }
  };
  const processGetTechnology = (result) => {
    if (result.Status) {
      setSelectedTechnology(result.data);
    } else {
      setSelectedTechnology(result.data);
    }
  };
  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log("Error fetching user role:", error);
  };

  const handleCategoryChange = async (selectedCategoryId) => {
    if (selectedCategoryId != 0) {
      GetProdType(selectedCategoryId);
      $("label#select_error").hide();
    } else {
      $("label#select_error").show();
    }
  };

  const handleType = async (prodTypeId) => {
    if (prodTypeId != 0) {
      GetProdBrand(prodTypeId);
      $("label#select_error1").hide();
    } else {
      $("#ddlProductBrand").val(0);

      $("label#select_error1").show();
    }
  };

  const handleBrand = async (selectedBrand) => {
    if (selectedBrand != 0) {
      GetProdTechnology();
      $("label#select_error2").hide();
    } else {
      $("label#select_error2").show();
    }
  };

  const handleTechnology = async (selectedTechnology) => {
    if (selectedTechnology != 0) {
      $("label#select_error3").hide();
    } else {
      $("label#select_error3").show();
    }
  };
  $("#ddProductCategory").on("click", function () {
    $("#ddlProductType").append(
      `"<option disabled="" selected="" hidden="">--- Select Product Type ---</option>" `
    );
    $("#ddlProductBrand").append(
      `"<option disabled="" selected="" hidden="">--- Select Product Brand ---</option>" `
    );
    $("#ddlProductTechnology").append(
      `"<option disabled="" selected="" hidden="">--- Select Product Technology ---</option>" `
    );
    $("#ddlProductBrand").prop("disabled", true);
    $("#ddlProductTechnology").prop("disabled", true);

    $("#GetPriceBtn").prop("disabled", true);
  });

  $("#ddlProductType").on("click", function () {
    $("#ddlProductBrand").append(
      `"<option disabled="" selected="" hidden="">--- Select Product Type ---</option>" `
    );
    $("#ddlProductTechnology").append(
      `"<option disabled="" selected="" hidden="">--- Select Product Technology ---</option>" `
    );
    $("#GetPriceBtn").prop("disabled", true);
  });

  $("#ddlProductBrand").on("click", function () {
    $("#ddlProductTechnology").append(
      `"<option disabled="" selected="" hidden="">--- Select Product Type ---</option>" `
    );
    $("#GetPriceBtn").prop("disabled", true);
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      var getProductDetails = function (selectRef) {
        var $selectedOption = $(selectRef.current).find(":selected");
        var text = $selectedOption.text();
        var value = $selectedOption.val();
        var data = $selectedOption.data();

        return {
          text: text,
          value: value,
          data: data,
        };
      };

      var productCategoryDetails = getProductDetails(productCategorySelectRef);
      var productTypeDetails = getProductDetails(productTypeSelectRef);
      var productBrandDetails = getProductDetails(productBrandSelectRef);
      var productTechnologyDetails = getProductDetails(
        productTechnologySelectRef
      );

      var ProductDetails = {
        isActive: true,
        token: token,
        ProductCategory: productCategoryDetails.text,
        ProductCatId: productCategoryDetails.value,
        ProductCategoryData: productCategoryDetails.data,

        ProductType: productTypeDetails.text,
        ProductTypeId: productTypeDetails.value,
        ProductTypeData: productTypeDetails.data,

        ProductBrand: productBrandDetails.text,
        ProductBrandId: productBrandDetails.value,
        ProductBrandData: productBrandDetails.data,

        productTechnology: productTechnologyDetails.text,
        productTechnologyId: productTechnologyDetails.value,
        productTechnologyData: productTechnologyDetails.data,
      };

      if (ProductDetails != null) {
        dispatch(ChangeDetails(ProductDetails));

        setClicked(false);
        navigation("/value-check/");
      } else {
        navigation("/smart-sell/");
      }
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12 mx-auto">
          <div className="wpcf7-form theme_0 smartform">
            <Form
              noValidate
              onSubmit={handleSubmit}
              className={clicked ? "was-validated" : ""}
            >
              <Row className="py-2 ">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label className="form-label mb-0">
                    <label className="mark-Bold my-1">
                      <small>Appliance Category</small>
                    </label>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    ref={productCategorySelectRef}
                    name="ddProductCategory[]"
                    id="ddProductCategory"
                    className="nav-link mb-3 mark-Medium para_first custom-select selectwrap3 form-select required error"
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    <option value="" selected disabled hidden>
                      --- Select Product Category ---
                    </option>
                    {selectedCategory.length > 0 ? (
                      selectedCategory.map((obj) => (
                        <option
                          key={obj.id}
                          value={obj.id}
                          data-desc={obj.description}
                          data-name={obj.code}
                        >
                          {obj.description}
                        </option>
                      ))
                    ) : (
                      <p>Fetching Category ...</p>
                    )}
                  </Form.Select>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please choose a this field.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label className="form-label mb-0">
                    {" "}
                    <label className="mark-Bold my-1">
                      <small>Product Type</small>
                    </label>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    ref={productTypeSelectRef}
                    onChange={(e) => handleType(e.target.value)}
                    name="ddProductType[]"
                    id="ddlProductType"
                    className="nav-link mb-3 mark-Medium para_first custom-select selectwrap3 form-select required error"
                    disabled
                    required
                  >
                    <option value="0" selected disabled hidden>
                      --- Select Product Type ---
                    </option>
                    {selectedType.length > 0 ? (
                      selectedType.map((obj) => {
                        if (obj != null) {
                          return (
                            <>
                              <option data-name={obj.code} value={obj.id}>
                                {" "}
                                {obj.description} ({obj.size}){" "}
                              </option>
                            </>
                          );
                        }
                      })
                    ) : (
                      <p>Fetching Product Type...</p>
                    )}
                  </Form.Select>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please choose a this field.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  <Form.Label className="form-label mb-0">
                    <label className="mark-Bold my-1">
                      <small>Product Brand</small>
                    </label>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    ref={productBrandSelectRef}
                    onChange={(e) => handleBrand(e.target.value)}
                    name="ddProductBrands[]"
                    id="ddlProductBrand"
                    className="nav-link mb-3 mark-Medium para_first custom-select selectwrap3 form-select required error"
                    disabled
                    required
                  >
                    <option selected disabled hidden>
                      --- Select Product Brand ---
                    </option>

                    {selectedBrand.length > 0 ? (
                      selectedBrand.map((obj, index) => {
                        if (obj != null) {
                          return (
                            <>
                              {" "}
                              <option
                                data-name={obj.name}
                                value={obj.id}
                                key={index}
                              >
                                {obj.name}
                              </option>
                            </>
                          );
                        }
                      })
                    ) : (
                      <p>Fetching Product Brand...</p>
                    )}
                  </Form.Select>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please choose a this field.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom04">
                  <Form.Label className="form-label mb-0">
                    <label className="mark-Bold my-1">
                      <small>Product Technology</small>
                    </label>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => handleTechnology(e.target.value)}
                    ref={productTechnologySelectRef}
                    id="ddlProductTechnology"
                    className="nav-link mb-3 mark-Medium para_first custom-select selectwrap3 form-select required error"
                    disabled
                    required
                  >
                    <option selected disabled hidden>
                      --- Select Product Technology---
                    </option>
                    {selectedTechnology.length > 0 ? (
                      selectedTechnology.map((obj) => {
                        if (obj != null) {
                          return (
                            <>
                              <option
                                data-name={obj.code}
                                value={obj.productTechnologyId}
                              >
                                {obj.productTechnologyName}
                              </option>
                            </>
                          );
                        }
                      })
                    ) : (
                      <p>Fetching Product Technology...</p>
                    )}
                  </Form.Select>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please choose a this field.
                  </Form.Control.Feedback>
                </Form.Group>{" "}
              </Row>

              <Form.Group className="mb-3" hidden>
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group>
              <Button
                type="submit"
                onClick={() => setClicked(true)}
                className="btn poppins-SemiBold btn-gradient px-lg-4 py-3 Category_btn smartsell103"
                id="GetPriceBtn"
                disabled={
                  !selectedCategory ||
                  !selectedType ||
                  !selectedBrand ||
                  !selectedTechnology
                }
                ref={buttonSelectRef}
              >
                Get Your Best Price
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
