import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import APi from "../WebService/APi";
import DataNotFound from "../js/DataNotFound";
import Get from "../WebService/Fuction/Get";
export default function SuccessStories() {
  var [Stories, SetStories] = useState([]);

  const processGetLink = (result) => {
    if (result.Status && result.result.length != 0) {
      SetStories(result.result);
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
  const handleError = (error) => {
    console.log("Error fetching user role:", error);
  };
  var stories = async () => {
    try {
      Get(`${APi.StoriesGetApi}?StoriesisActive=${true}`)
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    stories();
  }, []);

  return (
    <div>
      <title>Success Stories - Digi2L</title>
      <div>
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-10 pt-2" id="breadlink">
              <nav className="demo2" aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"> Home</li>
                  <li className="breadcrumb-item active"> Success Stories</li>
                </ol>
              </nav>
            </div>
            <div className="col-lg-6 mt-5 d-none d-lg-block"></div>
          </div>
        </div>

        <section id="hero_banner" className="d-none d-lg-block">
          <div
            className="wrapper_herobanner1 "
            style={{
              backgroundImage: `url("/Digi2limage/hero_bg.png")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "300px",
              width: "100%",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-6 pt-5">
                  <h1 className="text-capitalize lh-base text-white poppins-Bold text-start">
                    Thriving Together: <br />
                    Celebrating Our Partners Success Stories
                  </h1>
                </div>
                <div className="col-lg-6 col-6">
                  <img
                    style={{ position: "absolute", height: "300px" }}
                    src="/Digi2limage/hero_img.png"
                    className="img-fluid43422"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="hero_banner" className="d-lg-none">
          <div
            className="wrapper_herobanner543534 rocket-lazyload"
            style={{
              backgroundImage: `url("/Digi2limage/mobile_bg423423442.png")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-6 pt-5">
                  <p
                    style={{
                      color: "#FFF",
                      fontFamily: " Poppins",
                      fontSize: "normal",
                      fontWeight: "700",
                      lineHeight: "138%",
                    }}
                  >
                    Thriving Together: <br />
                    Celebrating Our Partners Success Stories
                  </p>
                </div>
                <div className="col-6">
                  <img
                    style={{ position: "absolute", width: "170px" }}
                    src="/Digi2limage/mobile_img.png"
                    className="img-fluid231423423 "
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-4 pb-5">
          {Stories.length === 0 ? (
            <>
              <DataNotFound />
            </>
          ) : (
            <>
              <div className="container pt-md-2 pt-2 ">
                <div className="row">
                  <h2 className="poppins-SemiBold lh-base">Success Stories</h2>
                </div>
              </div>
              <div className="container pt-md-2 pt-2 pt-md-4 pt-4 pb-md-4">
                <div className="row">
                  {Stories.map((obj) => {
                    if (
                      obj.StoriesisActive == true &&
                      obj.StoriesisActive != null
                    ) {
                      return (
                        <div className="col-md-3">
                          <div id="Success" className="card demo434">
                            <div className="card-body text-center">
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
                            <div className="card-footer11">
                              <Link
                                to={`/success-stories/${obj.StoriesPermalink}/`}
                                style={{ position: "relative", zIndex: "999" }}
                              >
                                <h3 className="font_family fw-normal text-center">
                                  Know More
                                </h3>{" "}
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
