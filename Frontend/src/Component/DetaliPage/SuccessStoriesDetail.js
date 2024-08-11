import React from "react";

import { useEffect } from "react";
import { useState } from "react";
import Success from "../Slider/Success";

import { useNavigate, useParams } from "react-router-dom";

import dateFormat from "dateformat";
import WebService from "../../WebService/WebService";
import APi from "../../WebService/APi";
import Get from "../../WebService/Fuction/Get";
export default function SuccessStoriesDetail() {
  var userId = useParams();

  var navigator = useNavigate();
  var StoriesPermalink = userId.id;
  var [SuccessStories, setSuccessStories] = useState([[]]);

  useEffect(() => {
    Successdetail();
  }, [StoriesPermalink]);

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
      setSuccessStories(result.result);
    } else {
      navigator("*");
    }
  };

  var Successdetail = async () => {
    try {
      Get(`${APi.StoriesGetApi}?StoriesPermalink=${StoriesPermalink}`)
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {SuccessStories.map((obj) => {
        if (obj.StoriesisActive == true && obj.StoriesisActive != null) {
          return (
            <>
              <title>{obj.StoriesSponsorName} - Digi2L</title>
            </>
          );
        }
      })}

      <div>
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-10 pt-2" id="breadlink">
              {SuccessStories.map((obj) => {
                if (
                  obj.StoriesisActive == true &&
                  obj.StoriesisActive != null
                ) {
                  return (
                    <nav className="demo2" aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item">Success Story</li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          {obj.StoriesSponsorName}
                        </li>
                      </ol>
                    </nav>
                  );
                }
              })}
            </div>
            <div className="col-lg-6 mt-5 d-none d-lg-block"></div>
          </div>
        </div>
        <section className="section_bg d-none d-lg-block itemSuccess">
          <div className="container">
            <div className="row">
              {SuccessStories.map((obj) => {
                if (
                  obj.StoriesisActive == true &&
                  obj.StoriesisActive != null
                ) {
                  return (
                    <>
                      {" "}
                      <div className="col-lg-10" style={{ marginTop: "10px" }}>
                        <h1 className="poppins-SemiBold text-start">
                          {obj.StoriesProgram}
                        </h1>
                      </div>
                      <div className="col-lg-2">
                        <img
                          src={`${APi.BaseURL}/${
                            obj.StoriesLogo
                              ? obj.StoriesLogo
                              : "placeholder-01-01 1.png"
                          }`}
                          className="card-img-top"
                          alt={obj.StoriesFeaturedImageAlt}
                        />
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </div>
        </section>
        <section className="section_bg p-2 d-block d-lg-none">
          <div className="container">
            <div className="row">
              {SuccessStories.map((obj) => {
                if (
                  obj.StoriesisActive == true &&
                  obj.StoriesisActive != null
                ) {
                  return (
                    <>
                      {" "}
                      <div className="col-lg-8 col-sm-6">
                        <h1 className="poppins-SemiBold text-center">
                          {obj.StoriesProgram}
                        </h1>
                      </div>
                      <div className="col-lg-4 col-sm-6">
                        <img
                          src={`${APi.BaseURL}/${
                            obj.StoriesImage
                              ? obj.StoriesImage
                              : "placeholder-01-01 1.png"
                          }`}
                          className="card-img-top  w-auto m-auto"
                          alt={obj.StoriesFeaturedImageAlt}
                          height={93}
                        />
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </div>
        </section>

        <section id="bosch" className=" pt-4">
          <div className="container">
            <div className="row pt-4">
              {SuccessStories.map((obj) => {
                if (
                  obj.StoriesisActive == true &&
                  obj.StoriesisActive != null
                ) {
                  return (
                    <div className="col-lg-4 col-md-4 mb-4 ">
                      <div className="sticky-top mb-3">
                        <div className="card-body demo444 ">
                          <h3 className="poppins-Regular fw-bold text-start lh-lg">
                            Sponsor Name
                          </h3>
                          <p className="poppins-Regular text-boby-font text-start lh-lg">
                            {obj.StoriesSponsorName}
                          </p>
                        </div>
                        <div className="card-body demo444">
                          <h3 className="poppins-Regular fw-bold text-start lh-lg">
                            Program Name
                          </h3>
                          <p className="poppins-Regular text-boby-font text-start lh-lg">
                            {obj.StoriesProgramName}
                          </p>
                        </div>
                        <div className="card-body demo444">
                          <h3 className="poppins-Regular fw-bold text-start lh-lg">
                            Agreement Date
                          </h3>
                          <p className="poppins-Regular text-boby-font text-start lh-lg">
                            {dateFormat(
                              obj.StoriesAgreementDate,
                              "mmmm dS, yyyy"
                            )}
                          </p>
                        </div>
                        <div className="card-body demo444">
                          <h3 className="poppins-Regular fw-bold text-start lh-lg">
                            Launch Date
                          </h3>
                          <p className="poppins-Regular text-boby-font text-start lh-lg">
                            {dateFormat(
                              obj.StoriesAgreementDate,
                              "mmmm dS, yyyy"
                            )}
                          </p>
                        </div>
                        <div className="card-body demo444">
                          <h3 className="poppins-Regular fw-bold text-start lh-lg">
                            Pin-Codes
                          </h3>
                          <p className="poppins-Regular text-boby-font text-start lh-lg">
                            {obj.StoriesPinCodes}
                          </p>
                        </div>

                        <div className="card-body demo444">
                          <h3 className="poppins-Regular fw-bold text-start lh-lg">
                            City Coverage
                          </h3>
                          <p className="poppins-Regular text-boby-font text-start lh-lg">
                            {obj.StoriesCityCoverage}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}

              <div className="col-lg-8 col-md-8 position-relative">
                {SuccessStories.map((obj) => {
                  if (
                    obj.StoriesisActive == true &&
                    obj.StoriesisActive != null
                  ) {
                    return (
                      <div>
                        <img
                          src={`${APi.BaseURL}/${
                            obj.StoriesSuccessImage
                              ? obj.StoriesSuccessImage
                              : "placeholder-01-01 1.png"
                          }`}
                          className="card-img-top"
                          alt={obj.StoriesFeaturedImageAlt}
                        />

                        <ul
                          className="poppins-Regular mt-5"
                          style={{
                            fontSize: "20px",
                            color: "black",
                            lineHeight: "211.5%",
                          }}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: `${obj.StoriesContent}`,
                            }}
                          />
                        </ul>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="success_stories1" className="pt-2">
          <div className="container">
            <h3 className="poppins-Regular fw-bold text-start lh-lg pt-3">
              View other success stories
            </h3>
            <div className="pb-5 mb-3">
              <Success />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
