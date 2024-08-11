import React from "react";
import { useRef } from "react";

import { useState } from "react";
import $ from "jquery";
import { useEffect } from "react";
import APi from "../../WebService/APi";
import Get from "../../WebService/Fuction/Get";
import { PostData } from "../../WebService/Fuction/Post";
export default function ApplyNow(props) {
  const [clicked, setClicked] = useState(false);
  const [uploadBoxErr, setuploadBoxErr] = useState("");
  var nameBox = useRef();
  var emailBox = useRef();
  var phoneBox = useRef();
  var messageBox = useRef();
  var positionBox = useRef();
  var resumeBox = useRef();
  var sourcePageBox = useRef();
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
  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  useEffect(() => {
    Details();
    $(" #validationCustom03").on("input", function () {
      let inputValue = $(this)
        .val()
        .replace(/[^0-9 \-]/g, "");
      $(this).val(inputValue);
    });
  }, []);
  useEffect(() => {
    $(document).ready(function () {
      $("#validationCustom06").keydown(
        (e) => !String.fromCharCode(e.which).match(/\d/g)
      );

      $("#validationCustom02").keydown(
        (e) => !String.fromCharCode(e.which).match(/\d/g)
      );
    });
  });

  const [isAlertVisible, setIsAlertVisible] = React.useState(false);

  var [Question, setQuestion] = useState([]);

  const [ResumesBase, setResumes] = useState("");

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    if (!file.type.startsWith("application/pdf")) {
      alert("Please select an image file.");
    } else {
      reader.onloadend = () => {
        setResumes(reader.result);
        console.log("reader.result", reader.result);
      };

      reader.readAsDataURL(file);

      let item = e.target.value;
      if (item === "") {
        setuploadBoxErr("Please Enter File Attachment");
      } else {
        setuploadBoxErr("");
      }
    }
  };

  var Register = async (event) => {
    event.preventDefault();

    var Name = nameBox.current.value;
    var Email = emailBox.current.value;
    var Phone = phoneBox.current.value;
    var Message = messageBox.current.value;
    var Position = positionBox.current.value;
    var Resume = ResumesBase;

    var SourcePage = sourcePageBox.current.value;

    var obj = JSON.stringify({
      Name: Name,
      Email: Email,
      Phone: Phone,
      Message: Message,
      Position: Position,
      Resume: Resume,
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
  $(document).ready(function () {
    $(" #validationCustom03").on("input", function () {
      let inputValue = $(this)
        .val()
        .replace(/[^0-9 \-]/g, "");
      $(this).val(inputValue);
    });
  });

  return (
    <div>
      <div>
        <div className="card border-0 rounded-20 common-shadow py-4">
          <div className="row m-0">
            <div className="col-lg-4 col-md-4">
              <div className="border_bottom px-3 px-lg-0 px-xl-4">
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
                style={{ color: `#070139` }}
                className=" poppins-Bold ps-3 ps-lg-0"
                id="about69"
              >
                {" "}
                Start Your Digi2L Journey Here
              </h3>

              <div
                className="wpcf7 js"
                id="wpcf7-f99-o6"
                lang="en-US"
                dir="ltr"
              >
                <div className="screen-reader-response">
                  <p role="status" aria-live="polite" aria-atomic="true"></p>
                  <ul></ul>
                </div>
                <form
                  onSubmit={Register}
                  className={
                    clicked
                      ? "was-validated wpcf7-form init theme_0 errorMsgshow"
                      : "wpcf7-form init theme_0 errorMsgshow"
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
                        id="validationCustom06"
                        size="40"
                        ref={nameBox}
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
                        maxLength={20}
                      />
                      <div class="invalid-feedback">
                        Please provide your email.
                      </div>
                    </div>

                    <div className="col-md-6 py-2 p-0 p-md-2">
                      <label
                        htmlFor="Company Name"
                        className="form-label poppins-Medium"
                      >
                        Position <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        id="validationCustom02"
                        size="40"
                        ref={positionBox}
                        className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control mark-Regular py-3"
                        placeholder="Applied Position"
                        required
                        maxLength={20}
                      />
                      <div class="invalid-feedback">
                        Please provide your position.
                      </div>
                    </div>

                    <div className="styled-file-select col-md-12 py-2 ">
                      <label className="form-label poppins-Medium">
                        Resume
                      </label>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="FileUploader">
                          <div className="upload">
                            <input
                              size="40"
                              className=" form-control  mt-2"
                              id="upload"
                              aria-invalid="false"
                              type="file"
                              accept="application/pdf,application/vnd.ms-excel"
                              name="resume"
                              ref={resumeBox}
                              required
                              onChange={handleImageChange}
                            />

                            <label
                              for="upload"
                              data-input-value=""
                              data-select-text="BROWSE"
                              data-remove-text="Remove file"
                              data-drag-text="Upload A File Or drag and drop here"
                            >
                              Upload
                            </label>
                          </div>
                          <div class="invalid-feedback">
                            Please provide your resume.
                          </div>
                          {uploadBoxErr ? uploadBoxErr : null}
                        </div>
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
                        ref={messageBox}
                        placeholder="Enter Your Message"
                        required
                        maxLength={60}
                      ></textarea>
                      <div class="invalid-feedback">
                        Please provide your message.
                      </div>
                    </div>
                    <input type="hidden" ref={sourcePageBox} value={props.id} />
                    <div className="col-md-12 py-2 p-0 p-md-2">
                      <input
                        className="wpcf7-form-control wpcf7-submit has-spinner btn btn-gradient w-100 poppins-Bold exciting_btn"
                        type="submit"
                        value="Submit"
                        onClick={() => setClicked(true)}
                      />
                    </div>
                    <input type="hidden" ref={sourcePageBox} value={props.id} />
                  </div>{" "}
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
