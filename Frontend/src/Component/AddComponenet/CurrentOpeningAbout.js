import React, { useEffect, useState } from "react";

import APi from "../../WebService/APi";
import { Link } from "react-router-dom";
import $ from "jquery";
import Get from "../../WebService/Fuction/Get";
export default function CurrentOpeningAbout() {
  var [openings, setOpening] = useState([]);
  var Openings = async () => {
    try {
      Get(`${APi.OpeningsGetApi}?OpeningsisActive=${true}`)
        .then(handleResponse)
        .then(processGetLink)
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

  const processGetLink = (result) => {
    if (result.Status && result.result.length != 0) {
      setOpening(result.result);
    } else {
      navigator("*");
    }
  };

  $(document).ready(function () {
    $(
      ".accordion:first .accordion-button.bg-transparent.poppins-Medium.collapsed:first"
    ).removeClass("collapsed");
    $(".accordion-collapse.collapse:first").addClass("show");
  });

  useEffect(() => {
    Openings();
  }, []);
  return (
    <div>
      <div className="frequentlyAsk_question section_bg">
        <div className="container">
          <div className="text-center pt-5 px-4">
            <h1 className="lh-base poppins-SemiBold" id="about59">
              Current Openings
            </h1>
            <p className="para_first mark-Medium" id="about60">
              Below are the positions that we are looking for someone to fill.
              If you think you are the right person to fill any of these
              positions then apply right away. Mail your resume on the email id
              mentioned below with the designation.
            </p>
            <p className="para_first mark-Medium">
              Id :-{" "}
              <Link
                to="mailto:hr@utcdigital.com"
                className="mark-Medium"
                style={{ color: `#3C23B6` }}
                id="about61"
              >
                hr@utcdigital.com
              </Link>
            </p>
          </div>
          <div className="row ">
            <div className="col-md-12 ">
              <div className="accordion accordion-flush" id="faqlist">
                {openings.map((obj, index) => {
                  if (
                    obj.OpeningsisActive == true &&
                    obj.OpeningsisActive != null
                  ) {
                    return (
                      <div className="accordion-item bg-white mt-4 mb-5 rounded-20 px-3 shadow position-relative">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button bg-transparent poppins-Medium collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            aria-expanded="false"
                            data-bs-target={`#faq-content-${index + 1}`}
                          >
                            {obj.OpeningsTitle}
                          </button>
                          <div className="d-flex align-items-center poppins-SemiBold pb-3 d-none d-sm-block">
                            <label
                              className="pe-2 mark-Medium"
                              style={{
                                fontSize: `18px`,
                                borderRight: `1px solid
    #5f5f5f`,
                              }}
                            >
                              <small>
                                <i className="fa-solid fa-briefcase pe-2 common_blue"></i>
                                {obj.OpeningsExperience}
                              </small>
                            </label>
                            <label
                              className="px-2 mark-Medium"
                              style={{ fontSize: `18px` }}
                            >
                              <small>
                                <i className="fa-solid fa-location-dot pe-2 common_blue"></i>
                                {}
                              </small>
                              {obj.OpeningsCity}
                            </label>
                          </div>
                        </h2>
                        <div
                          id={`faq-content-${index + 1}`}
                          className="accordion-collapse collapse"
                          data-bs-parent="#faqlist"
                        >
                          <div
                            className="accordion-body px-0 bg-transparent mark-Bold para_first"
                            dangerouslySetInnerHTML={{
                              __html: obj.OpeningsContents,
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
