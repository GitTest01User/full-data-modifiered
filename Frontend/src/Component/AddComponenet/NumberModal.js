import React from "react";

import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";

import ServerAPI from "../../WebService/Server/ServerAPI";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { ASPDetails } from "../../Redux/GetProductASPSSell";
import Post, { Otp } from "../../WebService/Fuction/Post";

export default function CombinedModal() {
  var [mobileData, SetMobileData] = useState("");
  var dispatch = useDispatch();
  var [phoneErr, setPhoneErr] = useState("");

  var navigation = useNavigate();

  var btnSubmitValue = () => {
    var inputValue = $("#mobileNumberBox").val();
    if (inputValue === "") {
      setPhoneErr(" Please enter valid mobile number!");

      $("#mobileNumberBox").addClass("is-invalid");
    } else {
      if (inputValue.length != 10) {
        setPhoneErr("Please enter 10 Digits mobile number!");
        $("#mobileNumberBox").addClass("is-invalid");
      } else {
        sendSMS();
      }
    }
  };

  var OtpBoxModal = () => {
    var inputValue = $("#OtpBoxModalBox").val();
    if (inputValue === "") {
      setPhoneErr("Please enter valid OTP");

      $("#OtpBoxModalBox").addClass("is-invalid");
    } else {
      if (inputValue.length != 4) {
        setPhoneErr("Please enter 4 Digits OTP");
        $("#OtpBoxModalBox").addClass("is-invalid");
      } else {
        OtpBoxNew();
      }
    }
  };
  var sendSMS = async () => {
    try {
      const inputValue = $("#mobileNumberBox").val();
      sessionStorage.setItem("mobileNumberBox", JSON.stringify(inputValue));

      Post(ServerAPI.GetNumberOtp, inputValue)
        .then(handleResponse)
        .then((result) => processGetSendSMS(result, inputValue))
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const processGetSendSMS = (result, inputValue) => {
    if (result.status) {
      $(".progress-bar").css("width", "15%");
      SetMobileData(inputValue);
      window.$("#OTPModal").modal("show");
      window.$("#GetPriceModal").modal("hide");
    } else {
      navigation("/smart-sell");
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

  var OtpBoxNew = async (e) => {
    const mobileNumber = $("#mobileNumberBox").val();
    const otp = $("#OtpBoxModalBox").val();

    try {
      const details = {
        mobileNumber: mobileNumber,
        OtpBoxNumber: otp,
      };

      Otp(ServerAPI.GetVerifyOtp, details)
        .then(handleResponse)
        .then(processGetOtpBoxNew)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const processGetOtpBoxNew = (result) => {
    if (result.status) {
      var detailsAsp = { isActive: true, response: result };
      dispatch(ASPDetails(detailsAsp));
      window.$("#OTPModal").modal("hide");
      navigation("/get-exact-value");

      $(".progress-bar").css("width", "15%");
    } else {
      setPhoneErr("Enter valid OTP!");
      $("#OtpBoxModalBox").addClass("is-invalid");
    }
  };

  $("#OtpBoxModalBox").on("input", function () {
    setPhoneErr("");
    $("#OtpBoxModalBox").removeClass("is-invalid");
    $("#btnSubmit").removeAttr("disabled", "disabled");
  });

  var OtpBox = (e) => {
    e.preventDefault();
    $("#OtpBoxModalBox").on("input", function () {
      let inputValue = $(this)
        .val()
        .replace(/[^0-9 \-]/g, "");
      $(this).val(inputValue);
      inputValue = e.target.value;
    });
  };

  $("#mobileNumberBox").on("input", function () {
    setPhoneErr("");
    $("#btnSubmit").removeAttr("disabled", "disabled");
    $("#mobileNumberBox").removeClass("is-invalid");
  });
  var mobileNumberBox = (e) => {
    e.preventDefault();

    $("#mobileNumberBox").on("input", function () {
      let inputValue = $(this)
        .val()
        .replace(/[^0-9 \-]/g, "");
      $(this).val(inputValue);
      inputValue = e.target.value;
    });
  };

  return (
    <div>
      <button
        type="button"
        className="btn poppins-SemiBold btn-gradient px-lg-4 py-3 mt-2 Category_btn smartsell103"
        data-bs-toggle="modal"
        data-bs-target="#GetPriceModal"
      >
        Get Exact Value
      </button>

      <div
        className="modal fade"
        id="GetPriceModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-md-top text-center">
          <div className="modal-content cstmModal">
            <button
              type="button"
              className="btn-close ms-auto mt-2 me-3 border border-dark rounded-circle p-1"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>

            <div className="modal-body">
              <div className="text-center">
                <img className="img-fluid" src="/get_price.svg" />
              </div>
              <div className="text-center">
                <h4 className="poppins-Bold pt-3 text-capitalize">
                  Enter your mobile number to see your product's valuation
                </h4>
                <div className="mx-lg-5 px-lg-5 px-1 mx-1">
                  <div>
                    <div>
                      <input
                        minLength={10}
                        maxlength={10}
                        id="mobileNumberBox"
                        onChange={mobileNumberBox}
                        className="form-control  mark-Medium mt-4 py-3 rounded-3 "
                        name="phone"
                        placeholder="Enter Your Mobile Number"
                        autoComplete="off"
                        required
                      />

                      {phoneErr ? (
                        <label
                          className="Validation-Error"
                          style={{ color: "red" }}
                        >
                          {phoneErr}
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                    <input
                      type="button"
                      id="btnSubmit"
                      className="btn my-3 py-3 btn-gradient w-100 poppins-Bold  "
                      value=" Send OTP"
                      onClick={btnSubmitValue}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="OTPModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-md-top">
          <div className="modal-content cstmModal">
            <button
              type="button"
              className="btn-close ms-auto mt-2 me-3 border border-dark rounded-circle p-1"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="modal-body">
              <div className="text-center">
                <img className="img-fluid" src="/get_price.svg" />
              </div>
              <div className="text-center" style={{ height: "300px" }}>
                <h4 className="poppins-Bold pt-3">OTP Verification</h4>
                <label className="mark-Medium">
                  Enter OTP sent to<span id="UserNo">+91 {mobileData} </span>
                  <Link
                    id="EditNo"
                    data-bs-toggle="modal"
                    data-bs-target="#GetPriceModal"
                  >
                    EDIT
                  </Link>
                </label>

                <div className="mx-lg-5 px-lg-5 px-1 mx-1" id="btnSubmitOtp">
                  <input
                    className="form-control  mark-Medium mt-4 py-3 rounded-3"
                    placeholder="Enter The OTP"
                    name="validateOTP"
                    maxlength="4"
                    onChange={OtpBox}
                    id="OtpBoxModalBox"
                    autoComplete="off"
                    required
                  />

                  {phoneErr ? (
                    <label
                      className="Validation-Error"
                      style={{ color: "red" }}
                    >
                      {phoneErr}
                    </label>
                  ) : (
                    ""
                  )}
                  <input
                    type="button"
                    className="btn my-3 py-3 btn-gradient w-100 poppins-Bold"
                    id="verifyOTP"
                    value="Verify OTP"
                    onClick={OtpBoxModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
