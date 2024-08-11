import React from "react";
import { useState } from "react";

import { useRef } from "react";
import $ from "jquery";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import WebService from "../WebService/WebService";

import ServerApiSmartBuy from "../WebService/Server/ServerApiSmartBuy";
import { useAuthContext } from "./LocalData/AuthToken";
import { useDispatch } from "react-redux";
import { CustomerSbDetails } from "../Redux/CustomerSbSlice";
import Get from "../WebService/Fuction/Get";

export default function ProductTabForm() {
  const [clicked, setClicked] = useState(false);

  var dispatch = useDispatch();
  var { tokenSb } = useAuthContext();

  var tokenPinCode = tokenSb;
  const [State, setState] = useState([]);
  const [Pincode, setPincode] = useState(false);
  const [City, setCity] = useState([]);

  var navigator = useNavigate();
  var firstNameBox = useRef();
  var lastNameBox = useRef();
  var telBox = useRef();
  var emailBox = useRef();
  var addressOneBox = useRef();
  var addressTwoBox = useRef();
  var PinCodeBox = useRef();
  var cityBox = useRef();
  var stateBox = useRef();
  useEffect(() => {
    $(document).ready(function () {
      $("#validationCustom02").keydown(
        (e) => !String.fromCharCode(e.which).match(/\d/g)
      );
      $("#validationCustom05").keydown(
        (e) => !String.fromCharCode(e.which).match(/\d/g)
      );
    });
  });

  $(" #validationCustom04").on("input", function () {
    setPincode("");
    setState("");
    setCity("");
  });

  var BasicInformation = (event) => {
    event.preventDefault();
    var firstName = firstNameBox.current.value;
    var lastName = lastNameBox.current.value;
    var tel = telBox.current.value;
    var email = emailBox.current.value;
    var addressOne = addressOneBox.current.value;
    var addressTwo = addressTwoBox.current.value;
    var PinCode = PinCodeBox.current.value;
    var city = cityBox.current.value;
    var state = stateBox.current.value;
    if (
      firstName != "" &&
      lastName != "" &&
      tel != "" &&
      email != "" &&
      addressOne != "" &&
      PinCode != "" &&
      city != "" &&
      state != ""
    ) {
      var obj = {
        firstName: firstName,
        lastName: lastName,
        tel: tel,
        email: email,
        addressOne: addressOne,
        addressTwo: addressTwo,
        PinCode: PinCode,
        city: city,
        state: state,
      };
      var Result = { isActive: true, obj: obj };

      dispatch(CustomerSbDetails(Result));
      setClicked(false);
      navigator("/product-review2");
    } else {
      alert("'Something went wrong, please try again!");
    }
  };

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
  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log("Error fetching user role:", error);
  };
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
    $("#validationCustom06").keydown(
      (e) => !String.fromCharCode(e.which).match(/\d/g)
    );
  });

  $(" #validationCustom03").on("input", function () {
    let inputValue = $(this)
      .val()
      .replace(/[^0-9 \-]/g, "");
    $(this).val(inputValue);
  });

  async function CustZipCode(e) {
    setPincode("");
    let inputValue = $(this).val();

    $(this).val(inputValue);
    inputValue = e.target.value;
    var PinCodeHere = inputValue;
    if (PinCodeHere.length === 6) {
      var response = await WebService.GetApiCallServer(
        `${ServerApiSmartBuy.GetStateAndCityByPincode}?pintext=${PinCodeHere}`,
        tokenPinCode
      );
      if (
        response.data.Detail.Data.StateName != null &&
        response.data.Detail.Data.CityName != null
      ) {
        setState(response.data.Detail.Data.StateName);
        setCity(response.data.Detail.Data.CityName);

        setPincode(false);
      } else {
        setPincode(true);
      }
    } else {
      setPincode("");
    }
  }
  return (
    <div>
      <div id="tab1">
        <div class="align-items-center container d-flex justify-content-center mb-lg-5 pb-lg-5 px-4 px-lg-0">
          <div class="progresses mobile-only " style={{ width: "90%" }}>
            <span class="d-none sdsdsdline active"></span>
            <div class="steps active">
              <span>1</span>
            </div>
            <span class="step-label active">Customer details</span>
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
          <div class="desktop-only justify-content-center ">
            <span class="d-none sdsdsdline active"></span>
            <div class="steps active">
              <span>1</span>
              <span class="step-label active">Customer details</span>
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
              <span>2</span>
              <span class="step-label">Product details</span>
            </div>
            <span class="sdsdsdline"></span>
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
            id="formUser"
            onSubmit={BasicInformation}
            className={clicked ? "was-validated" : ""}
          >
            <div className="row gx-5 gy-4 mt-4 needs-validation review-form ">
              <div class="col-12">
                <h5 class="w-100 p-0 mb-2">Basic information</h5>
              </div>

              <div class="col-md-6 mb-2 mt-4">
                <label for="validationCustom01" class="form-label">
                  First name<sup class="text-danger">*</sup>
                </label>
                <div>
                  <input
                    aria-required="true"
                    aria-invalid="false"
                    id="validationCustom09"
                    size="40"
                    maxLength={20}
                    ref={firstNameBox}
                    className=" form-control input-wrapper px-3 py-2"
                    placeholder="Mark"
                    required
                    autoComplete="off"
                  />
                  <div class="fa-1x invalid-feedback text-break ">
                    Please enter your first name .
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-2 mt-4">
                <label for="validationCustom02" class="form-label">
                  Last name<sup class="text-danger">*</sup>
                </label>
                <div>
                  <input
                    size="40"
                    maxLength={20}
                    className=" form-control input-wrapper px-3 py-2"
                    aria-required="true"
                    aria-invalid="false"
                    id="validationCustom06"
                    ref={lastNameBox}
                    placeholder="Otto"
                    type="text"
                    name="your-name"
                    required
                    autoComplete="off"
                  />
                  <div class="fa-1x invalid-feedback text-break ">
                    Please enter your last name .
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-2 mt-4">
                <label for="validationMobileNumber" class="form-label">
                  Mobile number<sup class="text-danger">*</sup>
                </label>
                <div>
                  <input
                    size="40"
                    maxlength="10"
                    minlength="10"
                    className=" form-control input-wrapper px-3 py-2"
                    aria-required="true"
                    aria-invalid="false"
                    id="validationCustom03"
                    ref={telBox}
                    placeholder="9876543210"
                    type="tel"
                    name="your-phone"
                    required
                    autoComplete="off"
                  />
                  <div class="fa-1x invalid-feedback text-break ">
                    Please enter your phone number .
                  </div>
                </div>

                <p class="pt-2 small">
                  Mobile number should be linked with your bank account.
                </p>
              </div>
              <div class="col-md-6 mb-2 mt-4 email-field">
                <label for="validationCustomEmail" class="form-label">
                  Email<sup class="text-danger">*</sup>
                </label>
                <div>
                  <input
                    size="40"
                    className=" form-control input-wrapper px-3 py-2"
                    aria-required="true"
                    aria-invalid="false"
                    ref={emailBox}
                    id="emailForm"
                    placeholder="john@xyz.com"
                    type="email"
                    name="email"
                    required
                    autoComplete="off"
                  />
                  <div class="fa-1x invalid-feedback text-break ">
                    Please enter your email address .
                  </div>
                </div>
              </div>
              <div class="col-12">
                <h5 class="w-100 p-0 mb-2">Address information</h5>
              </div>
              <div class="col-12 mb-2 mt-4">
                <label for="validationAddressInformation" class="form-label">
                  Address line 1<sup class="text-danger">*</sup>
                </label>
                <div>
                  <input
                    className=" form-control input-wrapper px-3 py-2"
                    ref={addressOneBox}
                    placeholder="Enter address 1"
                    required
                    autoComplete="off"
                  />
                  <div class="fa-1x invalid-feedback text-break">
                    Please enter your address.
                  </div>
                </div>
              </div>
              <div class="col-12 mb-2 mt-4">
                <label for="validationAddressInformation1" class="form-label">
                  Address line 2
                </label>
                <div>
                  <input
                    className=" form-control input-wrapper px-3 py-2"
                    ref={addressTwoBox}
                    placeholder="Enter address 2"
                  />
                  <div class="fa-1x invalid-feedback text-break">
                    Please enter your address 2.
                  </div>
                </div>
              </div>

              <div class="col-md-4 mb-2 mt-4">
                <label for="Pin" class="form-label">
                  Pin Code<sup class="text-danger">*</sup>
                </label>
                <div>
                  <input
                    onInput={CustZipCode}
                    size="40"
                    ref={PinCodeBox}
                    id="ZipCodeBox"
                    maxlength="6"
                    required
                    placeholder="Enter a pin code"
                    className="form-control input-wrapper px-3 py-2"
                    autoComplete="off"
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
              </div>

              <div class="col-md-4 mb-2 mt-4">
                <label for="validationCustom03" class="form-label">
                  City
                </label>
                <div>
                  <input
                    size="40"
                    className=" form-control input-wrapper px-3 py-2"
                    ref={cityBox}
                    id="validationCustom05"
                    type="text"
                    name="your-city"
                    value={City}
                    disabled
                    required
                  />
                </div>

                <div class="invalid-feedback">Please provide a valid city.</div>
              </div>
              <div class="col-md-4 mb-2 mt-4">
                <label for="validationCustom04ss" class="form-label">
                  State
                </label>
                <div>
                  <input
                    ref={stateBox}
                    type="text"
                    className=" form-control input-wrapper px-3 py-2"
                    name="state"
                    id="validationCustom04ss"
                    disabled
                    value={State}
                    required
                  />
                </div>
                <div class="invalid-feedback">Please select a state.</div>
              </div>

              <div class="col-12 my-4" style={{ textAlign: "right" }}>
                <input
                  id="STEP"
                  onClick={() => setClicked(true)}
                  type="submit"
                  class="btn btn-gradient poppins-Medium px-5 py-3"
                  value="NEXT STEP"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
