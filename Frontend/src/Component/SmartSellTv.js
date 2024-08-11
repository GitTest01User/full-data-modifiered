import React from "react";
import StepSell from "./AddComponenet/StepSell";
import { Link, useNavigate } from "react-router-dom";
import WebService from "../WebService/WebService";
import ServerAPI from "../WebService/Server/ServerAPI";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import $ from "jquery";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useAuthContext } from "./LocalData/AuthToken";
import { ChangeDetails } from "../Redux/Dataslice";
import { useDispatch } from "react-redux";
import Get from "../WebService/Fuction/Get";
export default function SmartSellTv() {
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
    GetProdType()
  }, [token]);



  const GetProdType = async () => {
    try {
      Get(`${ServerAPI.GetProductType}?catId=${3}`, token)
        .then(handleResponse)
        .then(processGetType)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const GetProdBrand = async (prodTypeId) => {
    // var selectedTypeId = $("#ddlProductType").val();
    $("#ddlProductBrand").val(0);
    $("#ddlProductTechnology").val(0);

    try {
      Get(
        `${ServerAPI.GetProductBrand}?catId=${3}&productTypeid=${prodTypeId}`,
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
      Get(`${ServerAPI.GetProductTechnology}?catId=${3}`, token)
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

  const SmartSellTvRegister = (event) => {
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
        ProductCategory: "Television",
        ProductCatId: 3,
        ProductCategoryData: {
          name: "TV",
          desc: "Television",
        },
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
      <title>Smart Sell TV - Digi2L</title>
      <div>
        <section
          data-bg="/Digi2limage/hero.png"
          id="smartSellHero"
          className="hero_section d-flex justify-content-center align-items-xl-center  h-100"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            paddingTop: "80px",
          }}
        >
          <div className="smartSellHero pt-lg-5 heroform container">
            <div className="text-md-center text-white py-4 px-lg-1 px-4">
              <h1 className="poppins-SemiBold lh-base font_family">
                Sell Your Old Television
              </h1>
              <label className="mark-Medium">
                <p className="text-capitalize h4">
                  Time To Upgrade! The More Time You Take To Discard, The Less
                  Goes Into Your Card.
                </p>
              </label>
            </div>
            <div className="row">
              <div className="col-md-12 mx-auto">
                <div className="wpcf7-form theme_0 smartform">
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={SmartSellTvRegister}
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

        <section style={{ backgroundColor: "#F7EDFF" }}>
          <div className="container">
            {/* container-fluid */}
            <div className="row text-center p-5">
              <div className="col-lg-12">
                <h1 className="poppins-SemiBold">
                  Turn Your Old TV into Cash: Sell Your Used TV On Digi2L Today!
                </h1>
                <p className="lh-base mark-Bold para_first">
                  Digi2L provides a simple and convenient platform for selling
                  your used TV, with competitive prices and hassle-free
                  transactions.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row text-center p-5">
              <h1 className="poppins-SemiBold main_heading py-lg-1 py-2">
                New Types of TV and Advantages
              </h1>
              <p className="lh-base mark-Bold para_first">
                There are several types of televisions available on the market,
                each with its own advantages and disadvantages.
              </p>
            </div>
          </div>
          <div className="container">
            <div className="row row-flex text-center p-5">
              <div className="col-md-4 pb-4">
                <div
                  className="p-4 content"
                  style={{
                    height: "100%",
                    borderRadius: "40px",
                    border: "1px solid #C335F8",
                  }}
                >
                  <img
                    className="img-fluid"
                    src="/Digi2limage/tv1.png"
                    width="250px"
                    alt=""
                  />
                  <h4 className="poppins-SemiBold main_heading py-lg-1 py-2">
                    OLED TV
                  </h4>
                  <p className="lh-base mark-Bold para_first">
                    OLED(Organic Light Emitting Diode) TVs offer exceptional
                    picture quality with deep blacks and vibrant colors. They
                    have a slim design, making them ideal for any room, and
                    consume less energy than traditional LED/LCD TVs.
                  </p>
                </div>
              </div>
              <div className="col-md-4  pb-4">
                <div
                  className="p-4 content"
                  style={{
                    height: "100%",
                    borderRadius: "40px",
                    border: "1px solid #C335F8",
                  }}
                >
                  <img
                    className="img-fluid"
                    src="/Digi2limage/tv2.png"
                    width="250px"
                    alt=""
                  />
                  <h4 className="poppins-SemiBold main_heading py-lg-1 py-2">
                    QLED TV
                  </h4>
                  <p className="lh-base mark-Bold para_first">
                    QLED (Quantum Dot Light Emitting Diode) TVs use quantum dots
                    to produce brighter and more vivid colors than traditional
                    LED/LCD TVs. They also have a slim design and offer a higher
                    level of brightness than OLED TVs.
                  </p>{" "}
                  <br />
                </div>
              </div>
              <div className="col-md-4  pb-4">
                <div
                  className="p-4 content"
                  style={{
                    height: "100%",
                    borderRadius: "40px",
                    border: "1px solid #C335F8",
                  }}
                >
                  <img
                    className="img-fluid"
                    src="/Digi2limage/tv3.png"
                    width="250px"
                    alt=""
                  />
                  <h4 className="poppins-SemiBold main_heading py-lg-1 py-2">
                    4K Ultra HD TV
                  </h4>
                  <p className="lh-base mark-Bold para_first">
                    4K Ultra HD TVs have four times the resolution of standard
                    Full HD TVs, resulting in a much clearer and sharper
                    picture. They also offer a wider range of colors and a
                    better viewing experience.
                  </p>{" "}
                  <br />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row text-center p-5">
              <h1 className="poppins-SemiBold main_heading py-lg-1 py-2">
                Disadvantages of Old TV Models
              </h1>
            </div>
          </div>
          <div className="container">
            <div className="row row-flex text-center p-5">
              <div className="col-md-4  pb-4">
                <div
                  className="p-4 content"
                  style={{
                    height: "100%",
                    borderRadius: "40px",
                    border: "1px solid #C335F8",
                  }}
                >
                  <img
                    className="img-fluid"
                    src="/Digi2limage/tv4.png"
                    width="250px"
                    alt=""
                  />
                  <h4 className="poppins-SemiBold main_heading py-lg-1 py-2">
                    Picture Quality
                  </h4>
                  <p className="lh-base mark-Bold para_first">
                    Older TVs often have a lower resolution and picture quality
                    than new models, resulting in a less clear and less vibrant
                    image.
                  </p>
                </div>
              </div>
              <div className="col-md-4  pb-4">
                <div
                  className="p-4 content"
                  style={{
                    height: "100%",
                    borderRadius: "40px",
                    border: "1px solid #C335F8",
                  }}
                >
                  <img
                    className="img-fluid"
                    src="/Digi2limage/tv5.png"
                    width="250px"
                    alt=""
                  />
                  <h4 className="poppins-SemiBold main_heading py-lg-1 py-2">
                    Size and Weight
                  </h4>
                  <p className="lh-base mark-Bold para_first">
                    Older TVs tend to be larger and heavier than new models,
                    which can make them difficult to move or fit into certain
                    spaces.
                  </p>
                </div>
              </div>
              <div className="col-md-4  pb-4">
                <div
                  className="p-4 content"
                  style={{
                    height: "100%",
                    borderRadius: "40px",
                    border: "1px solid #C335F8",
                  }}
                >
                  <img
                    className="img-fluid"
                    src="/Digi2limage/tv6.png"
                    width="250px"
                    alt=""
                  />
                  <h4 className="poppins-SemiBold main_heading py-lg-1 py-2">
                    Energy Efficiency
                  </h4>
                  <p className="lh-base mark-Bold para_first">
                    Older TVs tend to consume more energy than new models,
                    resulting in higher electricity bills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row text-center p-5">
              <h1 className="poppins-SemiBold main_heading py-lg-1 py-2">
                Common Issues with Old Televisions
              </h1>
            </div>
          </div>
          <div className="container">
            <div className="row text-center p-5">
              <div className="col-md-4">
                <img
                  className="img-fluid"
                  src="/Digi2limage/Burn-In.png"
                  width="100px"
                  alt=""
                />
                <h4 className="poppins-SemiBold main_heading py-lg-1 py-2">
                  Dead Pixels
                </h4>
              </div>
              <div className="col-md-4">
                <img
                  className="img-fluid"
                  src="/Digi2limage/Dead-Pixels.png"
                  width="100px"
                  alt=""
                />
                <h4 className="poppins-SemiBold main_heading py-lg-1 py-2">
                  Burn-In
                </h4>
              </div>
              <div className="col-md-4">
                <img
                  className="img-fluid"
                  src="/Digi2limage/Sound-Quality.png"
                  width="100px"
                  alt=""
                />
                <h4 className="poppins-SemiBold main_heading py-lg-1 py-2">
                  Sound Quality
                </h4>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link
              className="btn btn-gradient my-3 py-3 "
              to="/smart-sell-tv/know-more-tv/"
            >
              Know More
            </Link>
          </div>
        </section>
        <section className="my-5 p-5" style={{ background: "#F7EDFF" }}>
          <div className="container">
            <div className="row text-center">
              <div className="col-lg-12">
                <p className="poppins-SemiBold main_heading">
                  If you currently own an older television, it may be worth
                  contemplating an upgrade to innovative models. Don't wait too
                  long to sell your old television, as Digi2L provides the best
                  value for your used device. Take advantage of our offer now.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 ">
          <div className="container">
            <div className="text-center">
              <h1 className="poppins-SemiBold main_heading lh-base">
                Steps to sell your old television at Digi2L
              </h1>
            </div>
            <StepSell />
          </div>
        </section>
      </div>
    </div>
  );
}
