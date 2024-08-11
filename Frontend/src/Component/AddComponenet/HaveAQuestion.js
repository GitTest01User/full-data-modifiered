import React, { useEffect, useState } from "react";

import { useRef } from "react";
import $ from "jquery";
import APi from "../../WebService/APi";
import Get from "../../WebService/Fuction/Get";
import { PostData } from "../../WebService/Fuction/Post";

export default function HaveAQuestion(props) {
  var [Question, setQuestion] = useState([]);
  var nameBox = useRef();
  var phoneBox = useRef();
  var emailBox = useRef();
  var lookingBox = useRef();
  var messageBox = useRef();
  var sourcePageBox = useRef();
  const [clicked, setClicked] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  var [Detail, SetDetail] = useState([]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log("Error fetching user role:", error);
  };

  const processGetLink = (result) => {
    if (result.Status && result.result.length != 0) {
      SetDetail(result.result);
    } else {
      navigator("*");
    }
  };

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
  useEffect(() => {
    Details();
  }, []);

  useEffect(() => {
    $("#validationCustom09").keydown(
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

  var RegisterForm = async (event) => {
    event.preventDefault();
    var name = nameBox.current.value;
    var phone = phoneBox.current.value;
    var email = emailBox.current.value;
    var looking = lookingBox.current.value;
    var message = messageBox.current.value;
    var sourcePage = sourcePageBox.current.value;

    var obj = JSON.stringify({
      Name: name,
      Email: email,
      Looking: looking,
      Message: message,
      Phone: phone,
      SourcePage: sourcePage,
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

  const processPostData = (result, event) => {
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

  return (
    <div>
      <div>
        <div className="card border-0 rounded-20 common-shadow py-4 pb-5 pt-5">
          <div className="row m-0">
            <div className="col-lg-4 col-md-4">
              <div className="px-xl-4 border_bottom">
                <div className="border-bottom">
                  <img
                    className="img-fluid w-100 px-5 py-3"
                    src="/Digi2limage/contactSvg.svg"
                    alt=""
                  />
                </div>
                {Detail.map((obj, index) => {
                  if (obj.DetailsisActive === true && obj.Title != "Timing") {
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
                        <h6 className="mark-Medium details_color" id="about66">
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
            <div className="col-lg-8 col-md-8 border-start">
              <h3
                style={{ color: "#070139" }}
                className="poppins-Bold ps-2"
                id="eoffer5"
              >
                Have A Question? Just Write Us A Message
              </h3>
              <div
                className="wpcf7 no-js"
                id="wpcf7-f27-o6"
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
                    <div className="col-md-6 py-2 p-0 p-md-2">
                      <label
                        htmlFor="Name"
                        className="form-label poppins-Medium"
                      >
                        Name <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        id="validationCustom09"
                        size="40"
                        ref={nameBox}
                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control mark-Regular py-3"
                        placeholder="Enter Your Name"
                        required
                        maxLength={20}
                        autoComplete="off"
                      />{" "}
                      <div class="invalid-feedback">
                        Please provide your name.
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
                        autoComplete="off"
                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control mark-Regular py-3"
                      />
                      <div class="invalid-feedback">
                        Please provide your number.
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
                        ref={emailBox}
                        type="email"
                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control mark-Regular py-3"
                        placeholder="Email Address"
                        required
                        autoComplete="off"
                        maxLength={50}
                      />
                      <div class="invalid-feedback">
                        Please provide your email.
                      </div>
                    </div>

                    <div class="col-lg-6 py-2 p-0 p-md-2">
                      <label
                        for="validationCustom04"
                        class="form-label poppins-Medium"
                      >
                        What Are You Looking For?
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        ref={lookingBox}
                        class="form-select mark-Medium py-3"
                        id="validationCustom04"
                        required
                      >
                        <option selected disabled hidden value="">
                          Select Purpose...
                        </option>
                        <option value="To Know About Offers">
                          To Know About Offers
                        </option>
                        <option value="To Collab With Us">
                          To Collab With Us
                        </option>
                      </select>
                      <div class="invalid-feedback">
                        Please select your purpose.
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
                        autoComplete="off"
                        className="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required form-control mark-Regular"
                        ref={messageBox}
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
                    <input type="hidden" ref={sourcePageBox} value={props.id} />
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
  );
}
