import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { QuetionDetails } from "../Redux/QuetionSlice";
import Get from "../WebService/Fuction/Get";
import APi from "../WebService/APi";

export default function Thankyou() {
  var [LinkBase, setLinkBase] = useState([]);
  var [loading, setLoading] = useState(false);
  var navigate = useNavigate();
  var dispatch = useDispatch();
  dispatch(QuetionDetails({ isActive: false }));
  var location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  var Id = queryParams.get("RegdNo");

  var RegdNoData = () => {
    setLoading(true);
    if (Id) {
      window.location.href = `https://utcbridge.com/erp/qcportal/selfqc?regdno=${Id}`;
      setLoading(false);
    }
  };

  var menu = async () => {
    try {
      Get(APi.HeaderMenuGetApi)
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetLink = (dataBase) => {
    console.log("result", dataBase);
    if (dataBase.Status) {
      setLinkBase(dataBase.result);
    } else {
      setLinkBase(dataBase.result);
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

  const RouteLink = (obj1) => {
    setLoading(true);
    try {
      if (obj1) {
        LinkBase.forEach((obj) => {
          if (obj.MenuKey == obj1) {
            const title = obj.tblBrowserRouters.BrowserRouterPermaLink;
            setLoading(false);
            navigate(title);

          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    menu();
  }, []);

  return (
    <div>
      <div>
        <section className=" pt-5">
          <div className="container">
            <div className="row">
              <div className="text-center">
                <img
                  className="wp-image-806 aligncenter"
                  title="noun tick"
                  src="/Digi2limage/noun-tick.svg"
                  alt="success"
                  width="110"
                  height="110"
                />
              </div>
              <h2 style={{ textAlign: "center" }}>YOUR ORDER IS CONFIRMED</h2>
              <div className="col-md-4 mt-3 mx-auto d-flex jusitfy-center text-center">
                <button
                  onClick={() => RouteLink("Smart_Sell")}
                  className="previous btn btn-light btn-previous text-uppercase px-4 mx-auto"
                >
                  Click Here to Sell more appliances
                </button>
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
              </div>
            </div>
          </div>
        </section>
        <section className="mt-5 pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <img
                  src="/Digi2limage/whatsapp.png"
                  className="img-fluid"
                  alt=""
                />
                <p className="text-start mt-2">
                  Just in case you missed it, here is the Link: One click and
                  self-QC completed in minutes.{" "}
                  <Link
                    onClick={RegdNoData}
                    style={{ color: "#7127DF", fontWeight: "600px" }}
                  >
                    CLICK ME
                  </Link>
                </p>
              </div>
              <div className="col-lg-9">
                <h1
                  style={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "30px",
                    lineHeight: "45x",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  These 4 easy steps and QC done! Yes, that’s how easy it is!
                </h1>

                <div className="row">
                  <div className="col-lg-6 mt-2">
                    <div
                      className=""
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "2px solid #BC4DFB",
                        borderRadius: "27px",
                        padding: "25px",
                        height: "100%",
                      }}
                    >
                      <div>
                        <span
                          className="btn text-white"
                          to=""
                          style={{
                            backgroundColor: "#BC4DFB",
                            borderRadius: "64px",
                          }}
                        >
                          Step 1
                        </span>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <p className="mt-2">
                            Upload the images on the Self QC link as directed.
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <img
                            className="img_qc"
                            src="/Digi2limage/step_1.png.webp"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mt-2">
                    <div
                      className=""
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "2px solid #BC4DFB",
                        borderRadius: "27px",
                        padding: "25px",
                        height: "100%",
                      }}
                    >
                      <div>
                        <button
                          className="btn text-white"
                          to=""
                          style={{
                            backgroundColor: "#BC4DFB",
                            borderRadius: "64px",
                          }}
                        >
                          Step 2
                        </button>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <p className="mt-2">
                            Sit back and relax! Our Quality Experts will get in
                            touch with you and give you the best price.
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <img
                            className="img_qc"
                            src="/Digi2limage/step_2.png.webp"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 mt-2">
                    <div
                      className=""
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "2px solid #BC4DFB",
                        borderRadius: "27px",
                        padding: "25px",
                        height: "100%",
                      }}
                    >
                      <div>
                        <button
                          className="btn text-white"
                          to=""
                          style={{
                            backgroundColor: "#BC4DFB",
                            borderRadius: "64px",
                          }}
                        >
                          Step 3
                        </button>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <p className="mt-2">
                            Book your suitable time slot for the pickup and
                            share your UPI ID on which you would like to receive
                            the payment.
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <img
                            className="img_qc"
                            src="/Digi2limage/step_3.png.webp"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mt-2 mb-5">
                    <div
                      className=""
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "2px solid #BC4DFB",
                        borderRadius: "27px",
                        padding: "25px",
                        height: "100%",
                      }}
                    >
                      <div>
                        <button
                          className="btn text-white"
                          to=""
                          style={{
                            backgroundColor: "#BC4DFB",
                            borderRadius: "64px",
                          }}
                        >
                          Step 4
                        </button>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <p className="mt-2">
                            Knock Knock! Here for your pickup. Once the pick-up
                            is done you will receive an instant payment.
                          </p>
                          <br />
                        </div>
                        <div className="col-lg-6">
                          <img
                            className="img_qc"
                            src="/Digi2limage/step_4.png.webp"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
