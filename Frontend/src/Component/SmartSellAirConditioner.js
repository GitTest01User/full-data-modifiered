import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

import ReadMoreLess from "./AddComponenet/ReadMore";
import StepSell from "./AddComponenet/StepSell";
import WebService from "../WebService/WebService";
import ServerAPI from "../WebService/Server/ServerAPI";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import $ from "jquery";

import { useAuthContext } from "./LocalData/AuthToken";
import { ChangeDetails } from "../Redux/Dataslice";
import { useDispatch } from "react-redux";
import Get from "../WebService/Fuction/Get";

export default function SmartSellAirConditioner() {
  const [validated, setValidated] = useState(false);
  var dispatch = useDispatch();
  var { token } = useAuthContext();
  var [useToken, setToken] = useState(token);
  var navigation = useNavigate();

  const productTypeSelectRef = useRef();
  const productBrandSelectRef = useRef();
  const productTechnologySelectRef = useRef();
  const buttonSelectRef = useRef();

  const [selectedType, setSelectedType] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState([]);


  useEffect(() => {
    $('label[for="id_url"]').hide();

    $("#ddlProductType").on("click", function () {
      $(
        "#ddlProductBrand"
      ).append(`"<option className='select2-results__options'  disabled selected hidden>
      --- Select Product Brand ---
      </option>" `);
      $(
        "#ddlProductTechnology"
      ).append(`"<option className='select2-results__options'  disabled selected hidden>
      --- Select Product Technology ---
    </option>" `);
    });
    $("#ddlProductBrand").on("click", function () {
      $(
        "#ddlProductTechnology"
      ).append(`"<option className='select2-results__options'  disabled selected hidden>
      --- Select Product Technology ---
        </option>" `);
    });
    GetProdType();
  }, [token]);

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

  const GetProdType = async () => {
    try {
      Get(`${ServerAPI.GetProductType}?catId=${4}`, token)
        .then(handleResponse)
        .then(processGetType)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const GetProdBrand = async (prodTypeId) => {
   
    $("#ddlProductBrand").val(0);
    $("#ddlProductTechnology").val(0);

    try {
      Get(
        `${ServerAPI.GetProductBrand}?catId=${4}&productTypeid=${prodTypeId}`,
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
    $("#ddlProductTechnology").val(0);
    try {
      Get(`${ServerAPI.GetProductTechnology}?catId=${4}`, token)
        .then(handleResponse)
        .then(processGetTechnology)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetType = (result) => {
    if (result.Status) {
      setSelectedType(result.data);
    } else {
      setSelectedType(result.data);
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

      var productCateDetails = {
        ProductCategory: "Air Conditioner",
        ProductCatId: 4,
        ProductCategoryData: { name: "AC", desc: "Air Conditioner" },
      };
      var productTypeDetails = getProductDetails(productTypeSelectRef);
      var productBrandDetails = getProductDetails(productBrandSelectRef);
      var productTechnologyDetails = getProductDetails(
        productTechnologySelectRef
      );

      var ProductDetails = {
        isActive: true,
        token: token,
        ProductCategory: productCateDetails.ProductCategory,
        ProductCatId: productCateDetails.ProductCatId,
        ProductCategoryData: productCateDetails.ProductCategoryData,

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
        navigation("/value-check/");
      } else {
        navigation("/smart-sell/");
      }
    }

    setValidated(true);
  };

  return (
    <div>
      <title>Smart Sell Air Conditioner - Digi2L</title>
      <div>
        <section
          id="smartSellHero"
          className="hero_section d-flex justify-content-center align-items-xl-center h-100"
          style={{
            backgroundImage: `url("/Digi2limage/hero.png")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            paddingTop: "80px",
          }}
        >
          <div className="smartSellHero pt-lg-5 heroform container">
            <div className="text-md-center text-white py-4 px-lg-1 px-4">
              <h1 className="poppins-SemiBold lh-base font_family">
                Sell Your Old AC
              </h1>
              <label className="mark-Medium">
                <p className="text-capitalize h4">
                  Time to upgrade! The more time you take to discard, the less
                  goes into your card.
                </p>
              </label>
            </div>

            <div className="row">
              <div className="col-md-12 mx-auto">
                <div className="wpcf7-form theme_0 smartform">
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Row className="py-2 ">
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom02"
                      >
                        <Form.Label className="form-label mb-0">
                          {" "}
                          <label className="mark-Bold">
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
                          required
                        >
                          <option selected disabled hidden>
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
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          Please choose a username.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom03"
                      >
                        <Form.Label className="form-label mb-0">
                          <label className="mark-Bold">
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
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          Please choose a username.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom04"
                      >
                        <Form.Label className="form-label mb-0">
                          <label className="mark-Bold">
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
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          Please choose a username.
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
                      className="btn poppins-SemiBold btn-gradient px-lg-4 py-3 Category_btn smartsell103"
                      id="GetPriceBtn"
                      disabled
                      ref={buttonSelectRef}
                    >
                      Get Your Best Price
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="smart_sell"
          className="smart_sell_section container pt-5 my-3"
        >
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-5 text-center">
              <img
                className="img-fluid"
                src="/Digi2limage/sell-your-old-AC.png"
                alt="sell ac online"
              />
            </div>
            <div className="col-lg-6 px-xl-5 pt-3">
              <h1
                className="poppins-SemiBold main_heading py-lg-1 py-2"
                id="smartsell8"
              >
                Is this a good time to sell your old AC?
              </h1>
              <p className="lh-base mark-Bold para_first" id="smartsell9">
                Summer! It is the time of the year when people use the AC to the
                fullest. But is you’re AC ready? <br />
                Hot afternoons when you come home with AC issues will make you
                sweat even more. The best thing will be to get your AC serviced
                or get it upgraded if there are issues. Even after time and
                again repair your AC shows up with issues costing you heavily
                every time or excessive light bills. This is when you know you
                need to sell your old AC and upgrade to a new one.
              </p>
            </div>
          </div>
        </section>

        <section
          id="smart_sell"
          className="smart_sell_section container pt-5 my-3"
        >
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 px-xl-5 pt-3">
              <h1
                className="poppins-SemiBold main_heading py-lg-1 py-2"
                id="smartsell8"
              >
                Benefits of discarding your old AC at an early stage
              </h1>

              <div>
                <ReadMoreLess />
              </div>
            </div>
            <div className="col-lg-5 text-center order-first order-lg-last">
              <img
                className="img-fluid"
                src="/Digi2limage/discarding-your-old-AC.png"
                alt="how to sell old ac"
              />
            </div>
          </div>
        </section>
        <section className="pt-5 pb-5">
          <div className="container">
            <div className="text-center">
              <h1 className="poppins-SemiBold main_heading lh-base">
                Steps to sell your old AC at Digi2L
              </h1>
            </div>
            <StepSell />
          </div>
        </section>
      </div>
    </div>
  );
}
