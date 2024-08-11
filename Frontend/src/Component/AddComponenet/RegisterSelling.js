import React, { useRef } from "react";

import ServerAPI from "../../WebService/Server/ServerAPI";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import $ from "jquery";
import { useEffect } from "react";
import ServerApiSmartBuy from "../../WebService/Server/ServerApiSmartBuy";
import { useAuthContext } from "../LocalData/AuthToken";

import Get from "../../WebService/Fuction/Get";
import { PostData } from "../../WebService/Fuction/Post";
export default function RegisterSelling(props) {
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);

  const [clicked, setClicked] = useState(false);
  const [clickedLorder, setClickedLorder] = useState(false);

  var {
    token,
    detail,
    getIsDetailInTC,
    tokenSb,
    smartSellQuetion,
    smartSellDataPrice,
    smartSellASPrice,
  } = useAuthContext();

  var [Detail, setDetail] = useState(getIsDetailInTC);
  var tokenPinCode = tokenSb;
  var [UserPhone, SetUserPhone] = useState("1234567890");
  var navigation = useNavigate();
  var ScrollById = useRef();
  var [NewSet, setNewSet] = useState([]);
  var [ChackPriceImage, SetChackPriceImage] = useState([]);
  useEffect(() => {
    Get();
    UPTOImage();
    SetUserPhone(Phone);
  }, [
    smartSellASPrice,
    smartSellDataPrice,
    token,
    getIsDetailInTC,
    tokenSb,
    smartSellQuetion,
    detail,
  ]);
  const [loading, setLoading] = useState(false);

  var [ChackPriceImage, SetChackPriceImage] = useState([]);

  const CategoryId = detail.ProductCatId;

  const TypeId = detail.ProductTypeId;

  var mobileNumberBox = sessionStorage.getItem("mobileNumberBox");
  const Phone = JSON.parse(mobileNumberBox);

  const [State, setState] = useState([]);
  const [City, setCity] = useState([]);
  const [Pincode, setPincode] = useState(false);

  var UPTOImage = async () => {
    setLoading(true);
    setIsAlertVisible(true);
    try {
      Get(`${ServerAPI.GetProductType}?catId=${CategoryId}`, token)
        .then(handleResponse)
        .then(processGetImage)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetImage = (result) => {
    if (result.status) {
      SetChackPriceImage(result.data);
      setIsAlertVisible(false);
      setLoading(false);
    } else {
      navigation(-1);
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

  var GetNewValue = async () => {
    if (Detail) {
      var CategoryId = Detail.ProductCatId;
      var producttypeid = Detail.ProductTypeId;
      var techid = Detail.productTechnologyId;
    }

    try {
      Get(
        CategoryId
          ? `${ServerAPI.GetProductNonWorkingPrice}?producttypeid=${producttypeid}&techid=${techid}`
          : `${ServerAPI.GetProductNonWorkingPrice}?producttypeid=30&techid=2`,
        token
      )
        .then(handleResponse)
        .then(processGetNewPrice)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetNewPrice = (result) => {
    if (result.status) {
      setNewSet(result.data);
    } else {
      navigation(-1);
    }
  };
  var ViewProductreports = () => {
    $("#QuestionsFieldset").show();
    $("#ResultFieldset").hide();
    $("#nextbtn").hide();
    $("#NonWorkingPricebtn").show();
  };

  var firstNameBox = useRef();

  var telBox = useRef();
  var emailBox = useRef();
  var addressOneBox = useRef();
  var addressTwoBox = useRef();
  var PinCodeBox = useRef();
  var cityBox = useRef();
  var stateBox = useRef();
  useEffect(() => {
    GetNewValue();
    $(document).ready(function () {
      $("#validationCustom02").keydown(
        (e) => !String.fromCharCode(e.which).match(/\d/g)
      );
      $("#validationCustom05").keydown(
        (e) => !String.fromCharCode(e.which).match(/\d/g)
      );
    });
  }, []);

  $(document).ready(function () {
    $(" #ZipCodeBox").on("input", function () {
      let inputValue = $(this)
        .val()
        .replace(/[^0-9 \-]/g, "");
      $(this).val(inputValue);
    });
  });

  async function CustZipCode(e) {
    setPincode("");
    let inputValue = e.target.value.replace(/[^0-9\-]/g, "");
    $(this).val(inputValue);

    inputValue = e.target.value;
    var PinCodeHere = inputValue;
    if (PinCodeHere.length === 6) {
      try {
        Get(
          `${ServerApiSmartBuy.GetStateAndCityByPincode}?pintext=${PinCodeHere}`,
          tokenPinCode
        )
          .then(handleResponse)
          .then(processGetCustZipCode)
          .catch(handleError);
      } catch (error) {
        console.log(error);
      }
    }
  }
  const processGetCustZipCode = (result) => {
    console.log("result result", result);
    if (result.Status) {
      console.log("result result", result);
      if (
        result.Detail.Data.StateName != null &&
        result.Detail.Data.CityName != null
      ) {
        setState(result.Detail.Data.StateName);
        setCity(result.Detail.Data.CityName);

        setPincode(false);
      } else {
        setPincode(true);
      }

      setLoading(false);
    } else {
      setPincode("");
    }
  };

  $(document).ready(function () {
    $("#validationCustom09").keydown(
      (e) => !String.fromCharCode(e.which).match(/\d/g)
    );
  });

  $(document).ready(function () {
    $(" #validationCustom03").on("input", function () {
      let inputValue = $(this)
        .val()
        .replace(/[^0-9 \-]/g, "");
      $(this).val(inputValue);
    });
  });

  const BasicInformation = async (event) => {
    event.preventDefault();

    const firstName = firstNameBox.current.value;
    const tel = telBox.current.value;
    const email = emailBox.current.value;
    const addressOne = addressOneBox.current.value;
    const addressTwo = addressTwoBox.current.value;
    const PinCode = PinCodeBox.current.value;
    const city = cityBox.current.value;
    const state = stateBox.current.value;

    if (
      !firstName ||
      !tel ||
      !email ||
      !addressOne ||
      !PinCode ||
      !city ||
      !state
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const BrandIdVal = JSON.parse(detail.ProductBrandId);
    const TypeIdVal = JSON.parse(detail.ProductTypeId);
    const TechnologyIdVal = JSON.parse(detail.productTechnologyId);

    const productCondition = props.value ? "Excellent" : "Not Working";

    const customerDetails = JSON.stringify({
      orderCount: 1,
      CustomerDetailViewModel: {
        FirstName: firstName,
        LastName: "Test",
        PhoneNumber: tel,
        Email: email,
        Address1: addressOne,
        Address2: addressTwo,
        ZipCode: PinCode,
        City: city,
        State: state,
        CustName: firstName,
      },
      productDetailsDataViewModels: [
        {
          BrandId: BrandIdVal,
          bonus: 0,
          ProductCondition: productCondition,
          ProductTypeId: TypeIdVal,
          CompanyName: "D2C",
          questionerViewModel: {
            AverageSellingPrice: smartSellASPrice.averageSellingPrice,
            ExcellentPriceByASP: smartSellASPrice.excellentPrice,
            QuotedPrice: smartSellDataPrice.quotedPrice,
            Sweetner: smartSellDataPrice.sweetnerPrice,
            QuotedPriceWithSweetner: smartSellDataPrice.quotedWithSweetnerPrice,
            FinalPrice: smartSellDataPrice.finalPrice,
            NonWorkingPrice: NewSet.nonWorkingPrice,
            ProductTechnologyId: TechnologyIdVal,
          },
          qCRatingViewModels: smartSellQuetion,
        },
      ],
    });
    setClickedLorder(true);
    setIsAlertVisible(true);

    try {
      PostData(ServerAPI.AddProducts, customerDetails, token)
        .then(handleResponse)
        .then(processBasicInformatione)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const processBasicInformatione = (result) => {
    if (result.status) {
      setClicked(false);
      const NumberBox = result.data[0].orderRegdNo;
      if (NumberBox != null) {
        setIsAlertVisible(false);
        navigation(`/thank-you?RegdNo=${NumberBox}`);
      }
    } else {
      setClickedLorder(false);
      alert("Something went wrong, please try again!");
    }
  };

  return (
    <div>
      <div className="row">
        <div
          className="col-md-8"
          style={{
            backgroundColor: "#FCFCFF",
            border: "1px solid #DDE2FF",
            borderRadius: "12px",
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <div className="images p-3">
                <div className="text-center p-4">
                  {loading ? (
                    <>
                      <div className="loader">
                        <div class="loaderwrap">
                          <img src="/Digi2limage/digi2l-gif.gif" />
                          <p>Please Wait ...</p>
                        </div>
                      </div>
                    </>
                  ) : null}
                  {ChackPriceImage.map((obj) => {
                    if (obj.id == TypeId) {
                      return (
                        <>
                          <img id="main-image" src={obj.productTypeImage} />
                        </>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <div class="product p-4">
                <div class="mb-2">
                  <span class="text-uppercase text-muted brand">GET UP TO</span>
                  <div class="row">
                    <div class="col-6">
                      <h2
                        class="text-uppercase poppins-SemiBold"
                        id="QuotedPrice"
                      >
                        ₹
                        <span>
                          {props.value ? props.value : NewSet.nonWorkingPrice}
                        </span>
                      </h2>
                    </div>
                    <div class="col-6 text-center">
                      <button
                        onClick={() => ScrollById.current.scrollIntoView()}
                        className="sellnowbtn btn btn-outline-dark"
                      >
                        Sell Now
                      </button>
                    </div>
                  </div>
                </div>
                <span class="disclaimertxt">
                  <span style={{ color: "red" }}>*</span>
                  T&amp;C apply. Subject to Quality Check. Product Must Be Ready
                  and uninstalled for pickup.
                </span>
                <div class="mt-2">
                  <Link
                    style={{ color: "#rgb(81 0 146)", fontWeight: "700" }}
                    onClick={ViewProductreports}
                  >
                    View/Change Product Answers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 BuyAssuredBuybackBox">
          <div
            className="p-4"
            style={{
              backgroundColor: "#510092",
              border: "1px solid #DCE2FF",
              borderRadius: "12px",
              height: "100%",
            }}
          >
            <h1
              style={{
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "28px",
                lineHeight: "36px",
                textAlign: "center",
                textTransform: "uppercase",
                color: "#FFFFFF",
              }}
            >
              Buy assured buyback plan
            </h1>
            <p
              style={{
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "12px",
                lineHeight: "20px",
                textAlign: "center",
                color: "rgba(255, 255, 255, 0.78)",
              }}
            >
              Give us a Call/WhatsApp today and secure your product resale
              value.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <Link
                to="tel:919321276341"
                className="btn price-social-btn btn-light text-uppercase mr-2 px-4"
              >
                <img src="/Digi2limage/image-removebg-preview-2-1.png" />
                Call US
              </Link>
              <Link
                to="https://wa.me/919321276341"
                className="btn price-social-btn btn-light text-uppercase mr-2 px-4"
              >
                <img src="/Digi2limage/whatsapp-1.png" />
                WhatsApp
              </Link>
            </div>
            <div className="m-4">
              <p
                style={{
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "12px",
                  lineHeight: "20px",
                  textAlign: "center",
                  color: "rgba(255, 255, 255, 0.78)",
                }}
              >
                View Our Happy Customer Review
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        id="customerdetailsrowmd"
        ref={ScrollById}
        className="row mt-5 customerdetailsrow"
      >
        <div className="col-md-12">
          <h2 className="text-center" style={{ color: "#170F49" }}>
            You are just one step away from selling your old appliance. Register
            Now
          </h2>

          <form
            onSubmit={BasicInformation}
            className={clicked ? "was-validated" : ""}
          >
            <div className="row mt-5">
              <div className="col-md-6 mb-3">
                <label for="">
                  Your Name <span className="text-danger">*</span>
                </label>
                <input
                  aria-required="true"
                  aria-invalid="false"
                  id="validationCustom09"
                  size="40"
                  maxlength="20"
                  ref={firstNameBox}
                  className="form-control"
                  placeholder="Enter Your Name"
                  required
                  autoComplete="one-time-code"
                />
                <div class="fa-1x invalid-feedback text-break ">
                  Please enter your first name & last name.
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label for="">
                  Phone<span className="text-danger">*</span>
                </label>

                <input
                  size="40"
                  maxlength="10"
                  minlength="10"
                  className="form-control"
                  aria-required="true"
                  aria-invalid="false"
                  id="validationCustom03"
                  ref={telBox}
                  value={UserPhone}
                  type="tel"
                  name="your-phone"
                  disabled
                />

                <div class="fa-1x invalid-feedback text-break ">
                  Please enter a valid phone number.
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label for="">
                  Email<span className="text-danger">*</span>
                </label>
                <input
                  size="40"
                  maxlength="50"
                  className="form-control"
                  aria-required="true"
                  aria-invalid="false"
                  ref={emailBox}
                  placeholder="Enter Email"
                  type="email"
                  name="email"
                  id="emailHandler"
                  autoComplete="one-time-code"
                  required
                />

                <div class="fa-1x invalid-feedback text-break ">
                  Please enter a valid email address.
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label for="">
                  Pincode<span className="text-danger">*</span>
                </label>
                <input
                  onInput={CustZipCode}
                  size="40"
                  ref={PinCodeBox}
                  id="ZipCodeBox"
                  maxlength="6"
                  required
                  autoComplete="one-time-code"
                  placeholder="Enter a pin code"
                  className="form-control"
                />

                {Pincode ? (
                  <div className="ErrorMsg CustZipCodeError">
                    Sorry, we are not available in your area for now!
                  </div>
                ) : (
                  <div className="fa-1x invalid-feedback text-break">
                    Please enter a valid Pincode.
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label for="">
                  Address Line 1<span className="text-danger">*</span>
                </label>
                <input
                  maxlength="50"
                  className="form-control"
                  ref={addressOneBox}
                  placeholder="Address line "
                  id="Address1"
                  autoComplete="one-time-code"
                  required
                />

                <div class="fa-1x invalid-feedback text-break">
                  Please enter your address.
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label for="">Address Line 2</label>

                <input
                  maxlength="50"
                  className="form-control"
                  ref={addressTwoBox}
                  placeholder="Address line "
                  id="Address1"
                  autoComplete="one-time-code"
                />

                <div class="fa-1x invalid-feedback text-break">
                  Please enter your address two.
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label for="">
                  State <span className="text-danger">*</span>
                </label>
                <input
                  ref={stateBox}
                  maxlength="20"
                  type="text"
                  class="form-control"
                  name="state"
                  id="CustState"
                  placeholder="State"
                  value={State ? State : ""}
                  disabled
                  required
                />
                <div class="fa-1x invalid-feedback text-break">
                  Please fill out this field.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label for="">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  size="40"
                  maxlength="20"
                  className="form-control"
                  ref={cityBox}
                  id="CustCity"
                  type="text"
                  name="your-city"
                  placeholder="City"
                  value={City ? City : ""}
                  disabled
                  required
                />
                <div class="fa-1x invalid-feedback text-break">
                  Please fill out this field.
                </div>
              </div>
              <div className="col-12 my-4">
                {Pincode ? (
                  <input
                    type="submit"
                    onClick={() => setClicked(true)}
                    className="submit btn btn-gradient text-uppercase px-4 poppins-SemiBold"
                    id="PlaceOrderbtn"
                    value="SUBMIT"
                    disabled
                  />
                ) : (
                  <>
                    {isAlertVisible ? (
                      <>
                        <div className="loader">
                          <div class="loaderwrap">
                            <img src="/Digi2limage/digi2l-gif.gif" />
                            <p>Please Wait ...</p>
                          </div>
                        </div>
                      </>
                    ) : null}
                    {clickedLorder ? (
                      <img src="./loader-large.gif" style={{ width: "54px" }} />
                    ) : (
                      <input
                        type="submit"
                        onClick={() => setClicked(true)}
                        className="submit btn btn-gradient text-uppercase px-4 poppins-SemiBold"
                        id="PlaceOrderbtn"
                        value="SUBMIT"
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <p
        style={{
          color: "#9C9C9C",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "20px",
        }}
        className="mt-4"
      >
        Note: You will receive a self QC link once you click on submit.
      </p>
    </div>
  );
}
