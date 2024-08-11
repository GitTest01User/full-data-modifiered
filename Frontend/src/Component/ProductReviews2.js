import React, { useState } from "react";
import { useRef } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import { useEffect } from "react";

import ServerApiSmartBuy from "../WebService/Server/ServerApiSmartBuy";
import { useAuthContext } from "./LocalData/AuthToken";
import { useDispatch } from "react-redux";
import { ProductSbDetails } from "../Redux/ProductSbSlice";
import APi from "../WebService/APi";
import Get from "../WebService/Fuction/Get";

export default function ProductReviews2() {
  var dispatch = useDispatch();

  const [clicked, setClicked] = useState(false);
  var { detailSb, tokenSb } = useAuthContext();
  const [base64DataList, setBase64DataList] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [startBrand, SetstartBrand] = useState([]);
  const [startDate1, setStartDate1] = useState(
    new Date().toISOString().substring(0, 10)
  );
  var navigator = useNavigate();
  var brandBox = useRef();
  var serialBox = useRef();
  var InvoiceDateBox = useRef();
  var InvoiceNumberBox = useRef();
  var InvoiceImageBox = useRef(null);
  var UploadDateBox = useRef();
  var checkboxBox = useRef();
  var checkbox1Box = useRef();
  var checkbox2Box = useRef();

  var productCategoryDetails = detailSb.productCategoryDetails;
  var productSubCategoryDetails = detailSb.productSubCategoryDetails;
  var productPrice = detailSb.productPrice;

  var [cardsFooter, setCardsFooter] = useState([]);

  var navigate = useNavigate();

  var menu = async () => {
    try {
      Get(APi.FooterMenu)
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetLink = (dataBase) => {
    if (dataBase.Status) {
      setCardsFooter(dataBase.result);
    } else {
      setCardsFooter(dataBase.result);
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

  const RouteLink = (obj1) => {
    try {
      if (obj1) {
        cardsFooter.forEach((obj) => {
          if (obj.FooterKey == obj1) {
            const title = obj.tblBrowserRouters.BrowserRouterPermaLink;

            navigate(title);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    menu();
  }, []);

  var ProductNewSelectBrand = async (productCatId) => {
    try {
      var productCatId = detailSb.productCatId;
      Get(
        `${ServerApiSmartBuy.GetAllBrandDetails}?ProdCatId=${productCatId}`,
        tokenSb
      )
        .then(handleResponse)
        .then(processGetSelectBrand)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetSelectBrand = (dataBase) => {
    if (dataBase.Status) {
      SetstartBrand(dataBase.Detail);
    } else {
      SetstartBrand(dataBase.Detail);
    }
  };
  var handleFileInputChange = (event) => {
    event.preventDefault();

    let file = event.target.files[0];

    if (!file) {
      alert("No file selected.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    let reader = new FileReader();

    reader.onloadend = () => {
      const ImageBox = reader.result;
      if (ImageBox) {
        const Image64Data = ImageBox.replace(/^data:image\/\w+;base64,/, "");

        setBase64DataList(Image64Data);
      }
    };

    reader.onerror = () => {
      alert("There was an error reading the file. Please try again.");
    };

    reader.readAsDataURL(file);
  };

  const ProductInformation = async (event) => {
    event.preventDefault();

    const serialValue = serialBox.current.value;
    const invoiceNumberValue = InvoiceNumberBox.current.value;

    const checkboxValue = checkboxBox.current.checked;
    const checkbox1Value = checkbox1Box.current.checked;
    const checkbox2Value = checkbox2Box.current.checked;

    const validationProductBrand =
      brandBox.current.options[brandBox.current.selectedIndex].text;
    const validationProductBrandValue = brandBox.current.value;
    const validationUploadDate = $("#validationUploadDate").val();
    const validationInvoiceDate = $("#validationInvoiceDate").val();
    const InvoiceImage = InvoiceImageBox.current.value.replace(
      "C:\\fakepath\\",
      ""
    );

    const obj = {
      BrandId: validationProductBrandValue,
      Brand: validationProductBrand,
      Serial: serialValue,
      InvoiceNumber: invoiceNumberValue,
      InvoiceDate: validationInvoiceDate,
      InvoiceImage: InvoiceImage,
      UploadDate: validationUploadDate,
      Checkbox: checkboxValue,
      Checkbox1: checkbox1Value,
      Checkbox2: checkbox2Value,
      base64Image: base64DataList,
    };
    if (obj != null) {
      var Result = { isActive: true, obj: obj };
      dispatch(ProductSbDetails(Result));
      setClicked(false);
      navigator("/product-review3");
    } else {
      navigator("/product-review");
    }
  };

  useEffect(() => {
    ProductNewSelectBrand();
  }, []);
  $(document).ready(function () {
    $(".form-control").each(function () {
      var $input = $(this);
      var $label = $input.next();
      var $span = $label.find("span");

      $input.on("change", function (e) {
        var fileName = "";
        if (this.files && this.files.length > 1) {
          fileName = $(this).attr("data-multiple-caption") || "";
          fileName = fileName.replace("{count}", this.files.length);
        } else {
          fileName = e.target.value.split("\\").pop();
        }

        if (fileName) {
          $span.html(fileName);
        } else {
          $span.html($label.html());
        }
      });

      $input.on("focus", function () {
        $input.addClass("has-focus");
      });

      $input.on("blur", function () {
        $input.removeClass("has-focus");
      });
    });
  });

  $(".gobackbtn").click(function () {
    navigator("/product-review");
  });

  $(" #validationInvoiceNumber").on("input", function () {
    let inputValue = $(this)
      .val()
      .replace(/[^0-9 \-]/g, "");
    $(this).val(inputValue);
  });

  $(" #validationCustom03").on("input", function () {
    let inputValue = $(this)
      .val()
      .replace(/[^0-9 \-]/g, "");
    $(this).val(inputValue);
  });

  function addBorderDanger() {
    const inputElement = $("#file2");
    const file1Value = $("#file1").val();
    if (clicked === true && file1Value == "") {
      inputElement.addClass("border-danger");
    } else {
      inputElement.removeClass("border-danger");
    }
  }

  addBorderDanger();

  return (
    <div>
      <title>Product Review &#8211; Digi2L</title>
      <section>
        <div id="exciting-offers-page">
          <div
            id="smartSellHero"
            style={{
              backgroundImage: `url('/Digi2limage/payment_page2.png')`,
              backgroundRepeat: "round",
              backgroundSize: "cover",
            }}
            class="align-items-xl-center d-flex hero_section px-lg-5"
          >
            <div class="mx-4 pt-lg-4 pt-xl-5 px-xl-5">
              <div class="px-2 px-lg-1 pb-3 product-review-banner-text">
                <h1 class="poppins-SemiBold lh-base">
                  Worried about shipping your <br />
                  used appliance to a buyer?
                </h1>
                <label>
                  <small>
                    Get Assured Buyback Value only with a <br /> DIGI2L ABB
                    Plan.
                  </small>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="product-review-form">
        <div class="py-5">
          <div class="text-center">
            <h3 class="poppins-SemiBold main_heading lh-base">
              Review your product details
            </h3>
          </div>
          <div class="container">
            <ul class="navbar-nav flex-lg-row justify-content-between my-5 p-0 align-items-center container appliance_card_nav ">
              <li class="nav-item  text-start px-3 appliances_card w-100">
                <label class="mark-Light">
                  <small>Product group</small>
                </label>
                <p class="poppins-Medium para_first m-0">
                  {productCategoryDetails}
                </p>
              </li>
              <span class="border-start d-none d-md-block"></span>
              <span class="border-bottom d-block d-md-none"></span>
              <li class="nav-item  px-3 appliances_card w-100">
                <label class="mark-Light">
                  <small>Product type</small>
                </label>
                <p class="poppins-Medium para_first m-0">
                  {productSubCategoryDetails}
                </p>
              </li>
              <span class="border-start d-none d-md-block"></span>
              <span class="border-bottom d-block d-md-none"></span>
              <li class="nav-item  px-3 appliances_card w-100">
                <p class="mark-Bold para_first m-0">
                  &#8377; <span class="poppins-Regular">{productPrice}</span>
                </p>
              </li>
            </ul>
          </div>
          <div class="align-items-center container d-flex justify-content-center mb-lg-5 pb-lg-5 px-4 px-lg-0">
            <div class="progresses mobile-only" style={{ width: "90%" }}>
              <span class="d-none sdsdsdline active"></span>
              <div class="steps active">
                <span>2</span>
              </div>
              <span class="step-label active">Product details</span>
              <div class="progress sdsdsdline">
                <div
                  class="progress-bar w-15"
                  role="progressbar"
                  aria-valuenow="15%"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="desktop-only justify-content-center progresses">
              <span class="d-none sdsdsdline active"></span>
              <div class="steps active">
                <span>1</span>
                <span class="step-label active">Customer details</span>
              </div>
              <div class="progress sdsdsdline">
                <div
                  class="progress-bar w-100"
                  role="progressbar"
                  aria-valuenow="15%"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>

              <div class="steps active">
                <span>2</span>
                <span class="step-label active">Product details</span>
              </div>
              <div class="progress sdsdsdline">
                <div
                  class="progress-bar w-15"
                  role="progressbar"
                  aria-valuenow="15%"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div class="steps">
                <span>3</span>
                <span class="step-label">Order summary</span>
              </div>
              <span class="sdsdsdline"></span>
              <div class="steps">
                <span>4</span>
                <span class="step-label">Payment details</span>
              </div>
              <span class="d-none sdsdsdline"></span>
            </div>
          </div>

          <div class="container px-5 px-lg-0">
            <form
              onSubmit={ProductInformation}
              className={clicked ? "was-validated" : ""}
            >
              <div class="row gx-5 gy-4 mt-4 needs-validation review-form">
                <div class="col-12">
                  <h5 class="w-100 p-0 mb-2">Product information</h5>
                </div>
                <div class="col-md-6 mb-2 mt-4">
                  <label for="validationCustom04" class="form-label">
                    Product brand<sup class="text-danger">*</sup>
                  </label>
                  <div className="">
                    <select
                      ref={brandBox}
                      class="bg-light card form-select "
                      style={{ padding: "10px" }}
                      id="validationCustom04"
                      required
                      autoComplete="off"
                    >
                      <option selected disabled hidden value="">
                        -- Select Product Brand --
                      </option>
                      {startBrand.map((obj) => {
                        return (
                          <option style={{ font: "10px" }} value={obj.Id}>
                            {obj.Name}
                          </option>
                        );
                      })}
                    </select>

                    <div class="invalid-feedback">
                      Please select a Product Brand.
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mb-2 mt-4">
                  <label for="validationProductSerial" class="form-label">
                    Product serial number<sup class="text-danger">*</sup>
                  </label>

                  <div class="">
                    <input
                      size="40"
                      maxlength="10"
                      minlength="6"
                      className="form-control input-wrapper py-2 px-3"
                      aria-required="true"
                      aria-invalid="false"
                      // onChange={phoneHandler}
                      id="validationCustom03"
                      ref={serialBox}
                      placeholder="Enter your Serial no"
                      type="tel"
                      name="your-phone"
                      required
                      autoComplete="off"
                    />
                    <div class="invalid-feedback">
                      Please provide a valid serial number.
                    </div>
                  </div>
                </div>

                <div class="col-md-6 mb-2 mt-4">
                  <label for="validationInvoiceDate" class="form-label">
                    Invoice date<sup class="text-danger">*</sup>
                  </label>
                  <div class="">
                    <input
                      type="date"
                      ref={InvoiceDateBox}
                      className="dateNew form-control input-wrapper px-3 pyr-3   py-2"
                      placeholder="DD/MM/YYYY"
                      onChange={(e) => setStartDate(e.target.value)}
                      id="validationInvoiceDate"
                      required
                      aria-describedby="inputGroupPrepend"
                      autoComplete="off"
                      max={startDate}
                    />
                    <div class="invalid-feedback">
                      Please provide Invoice date.
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mb-2 mt-4">
                  <label for="validationInvoiceNumber" class="form-label">
                    Invoice number<sup class="text-danger">*</sup>
                  </label>
                  <div class="">
                    <input
                      maxlength="10"
                      minlength="6"
                      ref={InvoiceNumberBox}
                      type="text"
                      class="form-control input-wrapper py-2 px-3"
                      id="validationInvoiceNumber"
                      name="validationInvoiceNumber"
                      placeholder="Enter your Invoice no"
                      required
                      autoComplete="off"
                    />
                    <div class="invalid-feedback">
                      Please provide a valid Invoice number.
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mb-2 mt-4">
                  <label for="validationInvoiceImage" class="form-label">
                    Invoice image<sup class="text-danger">*</sup>
                  </label>

                  <div className="" id="imageUp">
                    <div className="bg-white border-0 input-wrapper">
                      <input
                        type="file"
                        placeholder="Image"
                        className="border-0 form-control"
                        ref={InvoiceImageBox}
                        id="file1"
                        required
                        autoComplete="off"
                        onChange={(e) => handleFileInputChange(e)}
                      />

                      <label for="file1" id="file2" class="border label-file ">
                        <span></span>
                      </label>
                      <div class="bg-white border-0 invalid-feedback">
                        Please provide Invoice image.
                      </div>
                    </div>
                  </div>

                  <div class="input-group ">
                    <div class="invalid-feedback">Please add valid date .</div>
                  </div>
                  <p class="pt-2 small">
                    You can only upload jpg, jpeg & pdf files.
                  </p>
                </div>
                <div class="col-md-6 mb-2 mt-4 email-field">
                  <label for="validationUploadDate" class="form-label">
                    Upload date
                  </label>
                  <div class="">
                    <input
                      placeholderText="DD/MM/YYYY"
                      type="date"
                      ref={UploadDateBox}
                      className="form-control input-wrapper py-2 px-3"
                      defaultValue={startDate1}
                      onChange={(date) => setStartDate1(date)}
                      id="validationUploadDate"
                      required
                      disabled
                      autoComplete="off"
                    />
                    <div class="invalid-feedback">
                      Please add valid Upload date.
                    </div>
                  </div>
                </div>
                <div class="col-12 mb-2 mt-4 checkboxes">
                  <div class="form-check my-3">
                    <input
                      ref={checkboxBox}
                      class="form-check-input"
                      type="checkbox"
                      required
                    />

                    <label class="form-check-label">
                      I am above the age of 18 years.
                    </label>
                    <div class="invalid-feedback">
                      You must agree before submitting.
                    </div>
                  </div>
                  <div class="form-check my-3">
                    <input
                      ref={checkbox1Box}
                      class="form-check-input"
                      type="checkbox"
                      required
                    />

                    <label class="form-check-label">
                      I agree to the{" "}
                      <p
                        className="cursor-pointer d-inline"
                        style={{ color: "#0a58ca" }}
                        id="smartbuybtn"
                        onClick={() => RouteLink("Exchange_Terms_Condition")}
                      >
                        Terms and conditions
                      </p>{" "}
                      of the Assured Buyback Program.
                    </label>
                    <div class="invalid-feedback">
                      You must agree before submitting.
                    </div>
                  </div>
                  <div class="form-check my-3">
                    <input
                      ref={checkbox2Box}
                      class="form-check-input"
                      type="checkbox"
                      required
                    />

                    <label class="form-check-label">
                      I agree to receive other communications from Digi2L.
                    </label>
                    <div class="invalid-feedback">
                      You must agree before submitting.
                    </div>
                  </div>
                </div>
                <div class="col-12 d-flex btn-wrapper justify-content-end">
                  <Link
                    Link
                    to="/product-review"
                    class="btn btn-purple-secondary poppins-Medium mx-lg-3 py-3 px-5 gobackbtn"
                    type="button"
                  >
                    PREVIOUS
                  </Link>
                  <input
                    style={{ color: "white", border: "none" }}
                    class="btn btn-gradient poppins-Medium py-3 px-5 btn  poppins-Medium mx-lg-3 py-3 px-5 "
                    id="product-review-2-btn"
                    type="submit"
                    value="NEXT STEP"
                    onClick={() => setClicked(true)}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
