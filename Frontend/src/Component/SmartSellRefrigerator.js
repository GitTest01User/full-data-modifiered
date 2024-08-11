import React from "react";
import StepSell from "./AddComponenet/StepSell";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import $ from "jquery";
import { useEffect } from "react";
import WebService from "../WebService/WebService";
import ServerAPI from "../WebService/Server/ServerAPI";
import APi from "../WebService/APi";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useAuthContext } from "./LocalData/AuthToken";
import { ChangeDetails } from "../Redux/Dataslice";
import { useDispatch } from "react-redux";
import Get from "../WebService/Fuction/Get";

export default function SmartSellRefrigerator() {
  const [validated, setValidated] = useState(false);
  var dispatch = useDispatch();
  var { token } = useAuthContext();
  var [useToken, setToken] = useState(token);
  var navigation = useNavigate();
  const productCategorySelectRef = useRef();
  const productTypeSelectRef = useRef();
  const productBrandSelectRef = useRef();
  const productTechnologySelectRef = useRef();
  const buttonSelectRef = useRef();

  const [selectedType, setSelectedType] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState([]);

  const [error, setError] = useState();

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
    GetProdType();
  }, [token]);

  const GetProdType = async () => {
    try {
      Get(`${ServerAPI.GetProductType}?catId=${1}`, token)
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
        `${ServerAPI.GetProductBrand}?catId=${1}&productTypeid=${prodTypeId}`,
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
      Get(`${ServerAPI.GetProductTechnology}?catId=${1}`, token)
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
      setError("Please select a valid product type");
      $("#ddlProductBrand").val(0);

      $("label#select_error1").show();
    }
  };

  const handleBrand = async (selectedBrand) => {
    if (selectedBrand != 0) {
      GetProdTechnology();
      $("label#select_error2").hide();
    } else {
      setError("Please select a valid product brand");
      $("label#select_error2").show();
    }
  };

  const handleTechnology = async (selectedTechnology) => {
    if (selectedTechnology != 0) {
      $("label#select_error3").hide();
    } else {
      setError("Please select a valid product technology");
      $("label#select_error3").show();
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();

      const getProductDetails = (selectRef) => {
        const $selectedOption = $(selectRef.current).find(":selected");
        return {
          text: $selectedOption.text(),
          value: $selectedOption.val(),
          data: $selectedOption.data(),
        };
      };

      const productCateDetails = {
        ProductCategory: "Refrigerator",
        ProductCatId: 1,
        ProductCategoryData: { name: "RF", desc: "Refrigerator" },
      };

      const productTypeDetails = getProductDetails(productTypeSelectRef);
      const productBrandDetails = getProductDetails(productBrandSelectRef);
      const productTechnologyDetails = getProductDetails(
        productTechnologySelectRef
      );

      const ProductDetails = {
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

      if (ProductDetails) {
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
      <title>Smart Sell Refrigerator - Digi2L</title>
      <div>
        <section
          data-bg="/Digi2limage/hero.png"
          id="smartSellHero"
          className="hero_section d-flex justify-content-center align-items-xl-center  h-70"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            paddingTop: "80px",
          }}
        >
          <div className="smartSellHero pt-lg-5 heroform container">
            <div className="text-md-center text-white py-4 px-lg-1 px-4">
              <h1 className="poppins-SemiBold lh-base font_family">
                Sell Your Old Refrigerator
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
                <div>
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
                                      <option
                                        data-name={obj.code}
                                        value={obj.id}
                                      >
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
                        ref={buttonSelectRef}
                        disabled
                      >
                        Get Your Best Price
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className=" py-5">
          <div className="container">
            <div className="text-center">
              <h1 className="poppins-SemiBold main_heading">
                What are the most common issues with a refrigerator and how do
                we resolve it
              </h1>
              <p className="lh-base mark-Bold para_first">
                Refrigerators usually have a longer life and there are several
                common issues that can arise with a refrigerator:
              </p>
            </div>
          </div>
        </section>
        <section className="section_bg111 pt-5 pb-3">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-3">
                <div
                  className="card bg-transparent border-0 text-center"
                  style={{ minHeight: "275px" }}
                >
                  <div
                    className="card-header border-0 bg-transparent"
                    id="smartsell18"
                  >
                    <img
                      className="img-fluid"
                      src="/Digi2limage/frame-1.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="card bg-transparent border-0 text-center"
                  style={{ minHeight: "275px" }}
                >
                  <div
                    className="card-header border-0 bg-transparent"
                    id="smartsell18"
                  >
                    <img
                      className="img-fluid"
                      src="/Digi2limage/frame-2.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="card bg-transparent border-0 text-center"
                  style={{ minHeight: "275px" }}
                >
                  <div
                    className="card-header border-0 bg-transparent"
                    id="smartsell18"
                  >
                    <img
                      className="img-fluid"
                      src="/Digi2limage/frame-3.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="card bg-transparent border-0 text-center"
                  style={{ minHeight: "275px" }}
                >
                  <div
                    className="card-header border-0 bg-transparent"
                    id="smartsell18"
                  >
                    <img
                      className="img-fluid"
                      src="/Digi2limage/frame-4.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  className="card bg-transparent border-0 text-center"
                  style={{ minHeight: "275px" }}
                >
                  <div
                    className="card-header border-0 bg-transparent"
                    id="smartsell18"
                  >
                    <img
                      className="img-fluid"
                      src="/Digi2limage/frame-5.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  className="card bg-transparent border-0 text-center"
                  style={{ minHeight: "275px" }}
                >
                  <div
                    className="card-header border-0 bg-transparent"
                    id="smartsell18"
                  >
                    <img
                      className="img-fluid"
                      src="/Digi2limage/frame-6.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  className="card bg-transparent border-0 text-center"
                  style={{ minHeight: "275px" }}
                >
                  <div
                    className="card-header border-0 bg-transparent"
                    id="smartsell18"
                  >
                    <img
                      className="img-fluid"
                      src="/Digi2limage/frame-7.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Link to="/smart-sell-refrigerator/knowmore/">
                  <button className="btn my-3 py-3 btn-gradient">
                    Know More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="text-center pt-5 px-4">
            <p className="para_first mark-Medium">
              If you are experiencing any of these issues with your
              refrigerator, it is best to call a professional repair service to
              diagnose and fix the problem. Even after this your refrigerator
              still shows up with issues you should consider selling your old
              refrigerator for a better price before it completely stops working
              or causes any more issue.
            </p>
          </div>
        </div>
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
                How To Care For A Refrigerator And Increase Its Life Span
              </h1>
              <p className="lh-base mark-Bold para_first" id="smartsell10">
                <ul>
                  <li> Don't forget to swiftly close the refrigerator door.</li>
                  <li>Examine the door seal of the refrigerator.</li>
                  <li>Set the proper temperature for efficient cooling.</li>
                  <li>
                    Arrange and cover objects correctly in the refrigerator.
                  </li>
                  <li>Keep the vents inside the refrigerator clear.</li>
                  <li>The collection of empty ice. </li>
                </ul>
              </p>
              <div>
                <Link to="/smart-sell-refrigerator/knowmore-2/">
                  <button className="btn my-3 py-3 btn-gradient">
                    Know More
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-lg-5 text-center order-first order-lg-last">
              <img
                className="img-fluid"
                src="/Digi2limage/refrigerator-1.png"
                alt=""
              />
            </div>
          </div>
        </section>

        <section className="py-5 ">
          <div className="container">
            <div className="text-center">
              <h1 className="poppins-SemiBold main_heading lh-base">
                Steps to sell your old Refrigerator at Digi2L
              </h1>
            </div>
            <StepSell />
          </div>
        </section>
      </div>
    </div>
  );
}
