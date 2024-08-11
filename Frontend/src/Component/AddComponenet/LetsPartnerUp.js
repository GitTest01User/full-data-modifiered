import React, { useEffect } from "react";
import { useState } from "react";

import { useRef } from "react";
import $ from "jquery";
import APi from "../../WebService/APi";
import ServerApiSmartBuy from "../../WebService/Server/ServerApiSmartBuy";
import { useAuthContext } from "../LocalData/AuthToken";
import { PostData } from "../../WebService/Fuction/Post";
import Get from "../../WebService/Fuction/Get";

export default function LetsPartnerUp(props) {
  var { tokenSb } = useAuthContext();

  const [State, setState] = useState([]);
  const [Pincode, setPincode] = useState(false);
  const [City, setCity] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  var [Detail, SetDetail] = useState([]);

  var Details = async () => {
    try {
      Get(APi.GetDetailAPi)
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetLink = (result) => {
    if (result.Status && result.result.length != 0) {
      SetDetail(result.result);
    } else {
      navigator("*");
    }
  };
  useEffect(() => {
    Details();
  }, [tokenSb]);
  var [Question, setQuestion] = useState([]);
  var phoneBox = useRef();
  var NameBox = useRef();
  var companyNameBox = useRef();
  var PinCodeBox = useRef();
  var cityBox = useRef();
  var stateBox = useRef();
  var EmailBox = useRef();
  var MessageBox = useRef();
  var SourcePageBox = useRef();

  useEffect(() => {
    $("#validationCustom08").keydown(
      (e) => !String.fromCharCode(e.which).match(/\d/g)
    );
    $("#validationCustom01").keydown(
      (e) => !String.fromCharCode(e.which).match(/\d/g)
    );
  }, []);

  $(document).ready(function () {
    $(" #validationCustom03").on("input", function () {
      let inputValue = $(this)
        .val()
        .replace(/[^0-9 \-]/g, "");
      $(this).val(inputValue);
    });
  });
  $(document).ready(function () {
    $(" #validationCustom03").on("input", function () {
      let inputValue = $(this)
        .val()
        .replace(/[^0-9 \-]/g, "");
      $(this).val(inputValue);
    });
  });

  var RegisterForm = async (event) => {
    event.preventDefault();
    var Name = NameBox.current.value;
    var CompanyName = companyNameBox.current.value;
    var State = stateBox.current.value;
    var City = cityBox.current.value;
    var PinCode = PinCodeBox.current.value;
    var Email = EmailBox.current.value;
    var Phone = phoneBox.current.value;
    var Message = MessageBox.current.value;
    var SourcePage = SourcePageBox.current.value;
    var obj = JSON.stringify({
      Name: Name,
      CompanyName: CompanyName,
      State: State,
      City: City,
      PinCode: PinCode,
      Email: Email,
      Phone: Phone,
      Message: Message,
      SourcePage: SourcePage,
    });

    try {
      PostData(props.Api, obj)
        .then(handleResponse)
        .then((result) => processPostData(result, event))
        .catch(handleError);
    } catch (error) {
      console.log(error);
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
  const processPostData = (result, event) => {
    console.log("result:", result);
    if (result.status) {
      setQuestion(result.message);
      event.target.reset();
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
      setClicked(false);
    } else {
      event.target.reset();
      setQuestion(result.message);
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
  return (
    <div>
      <div>
        <div className="container">
          <div className="card border-0 rounded-20 common-shadow py-4 ">
            <div className="row m-0">
              <div className="col-lg-4 col-md-4">
                <div className="px-xl-4 border_bottom px-2">
                  <div className="border_bottom px-3 px-lg-0 px-xl-4">
                    <div className="border-bottom">
                      <img
                        className="mb-5"
                        src="/digi2limage/contactSvg.svg"
                        alt=""
                        width="100%"
                      />
                    </div>

                    {Detail.map((obj, index) => {
                      if (
                        obj.DetailsisActive === true &&
                        obj.Title != "Timing"
                      ) {
                        return (
                          <div className="py-2" key={index}>
                            <label className="poppins-Medium">
                              <small>
                                <i className={` ${obj.Icon}`}></i>{" "}
                                <span className="text-secondary" id="about65">
                                  {obj.Title}:
                                </span>
                              </small>
                            </label>
                            <h6
                              className="mark-Medium details_color"
                              id="about66"
                            >
                              <div
                                className="pxl-2"
                                dangerouslySetInnerHTML={{
                                  __html: obj.Description,
                                }}
                              ></div>
                            </h6>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-8 border-start ">
                <h3 className=" ps-lg-4 poppins-Bold">
                  Let's Level Up Your Brand, Together!
                </h3>

                <div
                  className="wpcf7 no-js"
                  id="wpcf7-f26-o6"
                  lang="en-US"
                  dir="ltr"
                >
                  <div className="screen-reader-response">
                    <p role="status" aria-live="polite" aria-atomic="true"></p>
                    <ul></ul>
                  </div>
                  <form
                    onSubmit={RegisterForm}
                    className={
                      clicked
                        ? "was-validated wpcf7-form init"
                        : "wpcf7-form init"
                    }
                  >
                    <div className="row m-0">
                      <div className="col-md-12 py-2 p-0 p-md-2">
                        <label
                          htmlFor="Name"
                          className="form-label poppins-Medium"
                        >
                          Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          id="validationCustom02"
                          size="40"
                          ref={NameBox}
                          className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control mark-Regular py-3"
                          placeholder="Enter Your Name"
                          required
                          maxLength={20}
                        />
                        <div class="invalid-feedback">
                          Please provide your name.
                        </div>
                      </div>
                      <div className="col-md-6 py-2 p-0 p-md-2">
                        <label
                          htmlFor="Company Name"
                          className="form-label poppins-Medium"
                        >
                          Company Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          id="validationCustom08"
                          size="40"
                          ref={companyNameBox}
                          className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control mark-Regular py-3"
                          placeholder="Enter Your Company Name"
                          required
                          maxLength={20}
                        />

                        <div class="invalid-feedback">
                          Please provide your company name.
                        </div>
                      </div>
                      <div className="col-md-6 py-2 p-0 p-md-2">
                        <label
                          htmlFor="PinCode "
                          className="form-label poppins-Medium"
                        >
                          PinCode <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          onInput={CustZipCode}
                          size="40"
                          ref={PinCodeBox}
                          id="ZipCodeBox"
                          maxlength="6"
                          required
                          autoComplete="one-time-code"
                          placeholder="Enter your pin code"
                          className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control mark-Regular py-3"
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
                      <div className="col-md-6 py-2 p-0 p-md-2">
                        <label className="form-label poppins-Medium">
                          State
                        </label>
                        <div>
                          <input
                            ref={stateBox}
                            type="text"
                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control mark-Regular py-3"
                            name="state"
                            id="validationCustom04ss"
                            value={State ? State : ""}
                            placeholder="Enter your state"
                            required
                            disabled
                          />
                          <div class="invalid-feedback">
                            Please select a state.
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 py-2 p-0 p-md-2">
                        <label className="form-label poppins-Medium">
                          City
                        </label>
                        <div>
                          <input
                            size="40"
                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control mark-Regular py-3"
                            ref={cityBox}
                            id="validationCustom05"
                            type="text"
                            name="your-city"
                            placeholder="Enter your city"
                            value={City ? City : ""}
                            required
                            disabled
                          />
                          <div class="invalid-feedback">
                            Please provide a valid city.
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 py-2 p-0 p-md-2">
                        <label
                          htmlFor="Email"
                          className="form-label poppins-Medium"
                        >
                          Email <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          size="40"
                          ref={EmailBox}
                          type="email"
                          className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control mark-Regular py-3"
                          placeholder="Email Address"
                          required
                          maxLength={50}
                        />
                        <div class="invalid-feedback">
                          Please provide your email.
                        </div>
                      </div>
                      <div className="col-md-6 py-2 p-0 p-md-2">
                        <label
                          htmlFor="Phone"
                          className="form-label poppins-Medium"
                        >
                          Phone <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          id="validationCustom03"
                          size="40"
                          ref={phoneBox}
                          placeholder="Enter Your Number"
                          maxLength={10}
                          required
                          className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control mark-Regular py-3"
                        />
                        <div class="invalid-feedback">
                          Please provide your number.
                        </div>
                      </div>
                      <div className="col-md-12 py-2 p-0 p-md-2">
                        <label
                          htmlFor="Message"
                          className="form-label poppins-Medium"
                        >
                          Message <span style={{ color: "red" }}>*</span>
                        </label>
                        <textarea
                          cols="40"
                          rows="4"
                          className="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required form-control mark-Regular"
                          ref={MessageBox}
                          placeholder="Enter Your Message"
                          required
                          maxLength={60}
                        ></textarea>
                        <div class="invalid-feedback">
                          Please provide your message.
                        </div>
                      </div>
                      <div className="col-md-12 py-2 p-0 p-md-2">
                        <input
                          className="wpcf7-form-control wpcf7-submit has-spinner btn btn-gradient w-100 poppins-Bold exciting_btn"
                          type="submit"
                          value="Submit"
                          onClick={() => setClicked(true)}
                        />
                      </div>
                      <input
                        type="hidden"
                        ref={SourcePageBox}
                        value={props.id}
                      />
                    </div>
                    {isAlertVisible && (
                      <div
                        className="wpcf7-response-output mt-2 mb-2 "
                        style={{ backgroundColor: "#f5f6ff" }}
                        aria-hidden="true"
                      >
                        {Question}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
