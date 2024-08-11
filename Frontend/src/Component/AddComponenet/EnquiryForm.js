import React from "react";
import { useState } from "react";


import { useRef } from "react";
import $ from "jquery";
import { useEffect } from "react";

import ServerApiSmartBuy from "../../WebService/Server/ServerApiSmartBuy";
import { useAuthContext } from "../LocalData/AuthToken";
import { PostData } from "../../WebService/Fuction/Post";
import Get from "../../WebService/Fuction/Get";
import APi from "../../WebService/APi";
export default function EnquiryForm() {
  const [isActive, setIsActive] = useState(false);

  var {  tokenSb } = useAuthContext();

  useEffect(() => {
    $(document).ready(function () {
      $("#validationCustom01").keydown(
        (e) => !String.fromCharCode(e.which).match(/\d/g)
      );
      $("#validationCustom02").keydown(
        (e) => !String.fromCharCode(e.which).match(/\d/g)
      );
      $("#validationCustom05").keydown(
        (e) => !String.fromCharCode(e.which).match(/\d/g)
      );
    });
  },[tokenSb]);

  const [isAlertVisible, setIsAlertVisible] = React.useState(false);

  const [clicked, setClicked] = useState(false);
  var [Question, setQuestion] = useState([]);

  var selectBox = useRef(null);
  var radioBox = useRef(null);
  var PinCodeBox = useRef(null);
  var nameBox = useRef(null);
  var phoneBox = useRef(null);
  var emailBox = useRef(null);
  var cityBox = useRef(null);
  var pinCodeBox = useRef(null);
  var messageBox = useRef(null);
  var sourcePageBox = useRef(null);

  const [State, setState] = useState([]);
  const [City, setCity] = useState([]);
  const [Pincode, setPincode] = useState(false);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log("Error fetching user role:", error);
  };
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
          tokenSb
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
    if (result.Status) {
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
  var RegisterForm = async (event) => {
    event.preventDefault();
    var selectedValue = selectBox.current.value.toString();
    var condition = radioBox.current.value.toString();
    var name = nameBox.current.value;
    var phone = phoneBox.current.value;
    var email = emailBox.current.value;

    var city = cityBox.current.value;
    var pinCode = PinCodeBox.current.value;

    var message = messageBox.current.value;
    var sourcePage = sourcePageBox.current.value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      Appliance: selectedValue,
      Condition: condition,
      Name: name,
      Phone: phone,
      Email: email,
      City: city,
      PinCode: pinCode,
      Message: message,
      SourcePage: sourcePage,
    });

    try {
      PostData(APi.EnquiryPostApi, raw)
        .then(handleResponse)
        .then((result) => processPostData(result, event))
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const processPostData = (result, event) => {
    if (result.status) {
      setQuestion(result.message);
      event.target.reset();
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
      setClicked(false);
      setCity("");
    } else {
      event.target.reset();
      setQuestion(result.message);
    }
  };

  const handleClick = (event) => {
    setIsActive((current) => !current);
  };
  return (
    <div>
      <div id="slideOut" className={isActive ? "showSlideOut" : ""}>
        <div className="slideOutTab d-none d-sm-block" onClick={handleClick}>
          <div>
            <p className="poppins-SemiBold common_blue enquiry1">
              Enquiry <i className="fa-solid fa-angle-up"></i>
            </p>
          </div>
        </div>
        <div className="modal-content border-0 slideOut h-100 modal-content">
          <div className="modal-header pb-0 border-0">
            <h6 className="poppins-Bold enquiry2">
              Hey, Wondering How To Sell/Buy Second Hand Appliances From Our
              Website? Let Us Help You Out.
            </h6>
          </div>
          <div className="modal-body py-0">
            <div
              className="wpcf7 no-js"
              id="wpcf7-f24-o5"
              lang="en-US"
              dir="ltr"
            >
              <div className="screen-reader-response">
                <p role="status" aria-live="polite" aria-atomic="true"></p>{" "}
                <ul></ul>
              </div>
              <form
                onSubmit={RegisterForm}
                className={clicked ? "was-validated" : ""}
              >
                <div className="row enquirywrapper">
                  <div className="col-md-12">
                    <select
                      ref={selectBox}
                      class="form-select"
                      required
                      aria-label="select example"
                    >
                      <option value="" selected disabled hidden>
                        {" "}
                        --- Select Product Appliance ---
                      </option>
                      <option value="Dishwasher">Dishwasher</option>
                      <option value="Air Conditioner">Air Conditioner</option>
                      <option value="Refrigerator">Refrigerator</option>
                      <option value="Washing Machine">Washing Machine</option>
                      <option value="Television">Television</option>
                    </select>
                    <div class="invalid-feedback">
                      Please fill select product appliance
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="conditionbox ml-2 py-2 mark-Medium my-1 rounded-3 d-flex">
                      <label className="mark-Bold ">
                        <small>Condition</small>
                      </label>
                      <span className="d-flex px-1 radiolabel wpcf7-form-control wpcf7-radio">
                        <div class="form-check ">
                          <input
                            type="radio"
                            class="form-check-input"
                            id="validationFormCheck2"
                            name="radio-stacked"
                            required
                            ref={radioBox}
                          />
                          <label
                            class="form-check-label"
                            for="validationFormCheck2"
                          >
                            Working
                          </label>
                          <div class="invalid-feedback">
                            Please fill out this field.
                          </div>
                        </div>
                        <div class="form-check mb-3">
                          <input
                            type="radio"
                            class="form-check-input"
                            id="validationFormCheck3"
                            name="radio-stacked"
                            required
                            ref={radioBox}
                          />
                          <label
                            class="form-check-label"
                            for="validationFormCheck3"
                          >
                            Non Working
                          </label>
                          <div class="invalid-feedback">
                            Please fill out this field.
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <input
                      size="40"
                      className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control py-2 mark-Medium my-1 rounded-3"
                      aria-required="true"
                      aria-invalid="false"
                      id="validationCustom01"
                      ref={nameBox}
                      placeholder="Enter Your Name"
                      type="text"
                      name="your-name"
                      required
                      autoComplete="off"
                    />
                    <div class="fa-1x invalid-feedback text-break">
                      Please fill out this field.
                    </div>
                  </div>
                  <div className="col-md-6">
                    <input
                      size="40"
                      maxlength="10"
                      minlength="10"
                      className="wpcf7-form-control wpcf7-tel wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-tel wpcf7-numbers-only form-control py-2 mark-Medium my-1 rounded-3"
                      aria-required="true"
                      aria-invalid="false"
                      autoComplete="off"
                      id="validationCustom03"
                      ref={phoneBox}
                      placeholder="Enter your phone no."
                      type="tel"
                      name="your-phone"
                      required
                    />

                    <div class="fa-1x invalid-feedback text-break">
                      Please fill out this field.
                    </div>
                  </div>
                  <div className="col-md-6">
                    <input
                      size="40"
                      className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email form-control py-2 mark-Medium my-1 rounded-3"
                      aria-required="true"
                      autoComplete="off"
                      aria-invalid="false"
                      ref={emailBox}
                      placeholder="Enter Email"
                      type="email"
                      name="email"
                      required
                    />
                    <div class="fa-1x invalid-feedback text-break">
                      Please fill out this field.
                    </div>
                  </div>

                  <div className="col-md-6">
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
                      required
                    />
                    <div class="fa-1x invalid-feedback text-break">
                      Please fill out this field.
                    </div>
                  </div>
                  <div className="col-md-6">
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
                  <div className="col-md-12 py-2 p-0 p-md-2">
                    <textarea
                      cols="40"
                      rows="2"
                      autoComplete="off"
                      className="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required form-control py-2 mark-Medium my-1 rounded-3  "
                      ref={messageBox}
                      placeholder="Enter Your Message"
                      required
                    ></textarea>
                    <div class="fa-1x invalid-feedback text-break">
                      Please fill out this field.
                    </div>
                  </div>

                  <input type="hidden" ref={sourcePageBox} value="Enquiry" />
                  <div className="col-md-12 py-2 p-0 p-md-2">
                    <input
                      onClick={() => setClicked(true)}
                      class="wpcf7-form-control wpcf7-submit has-spinner btn btn-sm-gradient btn-sm poppins-SemiBold rounded-3 ml-2"
                      id="SlideoutSubmitbtn"
                      type="submit"
                      value="Submit"
                    />
                    <input
                      type="reset"
                      value="Cancel"
                      class="btn btn-outline-dark btn-sm poppins-SemiBold enquiry-cancel"
                      onClick={handleClick}
                    />
                    {isAlertVisible && (
                      <div
                        className="wpcf7-response-output mt-2 mb-2 "
                        style={{ backgroundColor: "#f5f6ff" }}
                        aria-hidden="true"
                      >
                        {Question}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
