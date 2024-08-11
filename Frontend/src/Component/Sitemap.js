import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Get from "../WebService/Fuction/Get";
import APi from "../WebService/APi";

export default function Sitemap() {
  var [SideMap, setSideMap] = useState([]);
  var [SideMapPolicy, setSideMapPolicy] = useState([]);
  var [QuickLink, SetQuickLink] = useState([]);
  var [allData, setAllData] = useState(false);
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
  const processGetLink = (result) => {
    if (result.Status) {
      setSideMap(result.result);
      console.log("result.result", result.result);
    } else {
      navigator("*");
    }
  };
  var menuPolicy = async () => {
    try {
      Get(APi.PolicyDetailGetAPi)
        .then(handleResponse)
        .then(processGetLinkPolicy)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetLinkPolicy = (result) => {
    if (result.Status) {
      setSideMapPolicy(result.result);
      console.log("result.result", result.result);
    } else {
      navigator("*");
    }
  };

  var footerQuickLink = async () => {
    try {
      Get(APi.GetQuickLinkAPi)
        .then(handleResponse)
        .then(processGetQuicklink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetQuicklink = (result) => {
    if (result.Status && result.result.length != 0) {
      SetQuickLink(result.result);
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
  var allDatas = () => {
    setAllData(!allData);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    menu();
    footerQuickLink();
    menuPolicy();
  }, []);
  return (
    <div>
      <title>SideMap -Digi2l</title>
      <div>
        <section
          className="blog_detail_hero position-relative py-2 mb-5 rocket-lazyload"
          style={{
            backgroundImage: `url(/Digi2limage/img1.png)`,
            backgroundSize: "cover",
          }}
        >
          <img
            src="./blog_detail1.svg"
            alt=""
            style={{ position: "absolute", right: "0px; bottom: 0px" }}
          />

          <img
            src="./blog_detail2.svg"
            alt=""
            style={{ position: "absolute", left: "0px; top: 0px" }}
          />
          <div className="text-center py-5">
            <h2 className="poppins-SemiBold lh-base py-4 text-white">
              Posts And Sitemap Digi2L
            </h2>
          </div>
        </section>
        <div>
          <div className="text-center p-5">
            <h1>Digi2L is India’s first platform Posts</h1>
          </div>
          <section>
            <div class="container ">
              <div className="justify-content-evenly row">
                <div className="col-lg-4  my-4">
                  {" "}
                  <div class="card-left">
                    <div class="card-image">
                      <img src="/Digi2limage/s_10.png" />
                    </div>
                    <div class="card-text">
                      <p>
                        How to Sell Old appliance Online? – The Evolving Saga of
                        Re-commerce in India
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4  my-4">
                  {" "}
                  <div class="card-left">
                    <div class="card-image">
                      <img src="/Digi2limage/s_20.png" />
                    </div>
                    <div class="card-text">
                      <p>Is Selling Old Appliances a Challenge?</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4  my-4">
                  {" "}
                  <div class="card-left">
                    <div class="card-image">
                      <img src="/Digi2limage/sec_1dwd.png" />
                    </div>
                    <div class="card-text">
                      <p>Planning To Sell Old AC: 3 Common AC Issues</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4  my-4">
                  {" "}
                  <div class="card-left">
                    <div class="card-image">
                      <img src="/Digi2limage/sell-your-old-AC.png" />
                    </div>
                    <div class="card-text">
                      <p>Common Issues With AC Compressor</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4  my-4">
                  {" "}
                  <div class="card-left">
                    <div class="card-image">
                      <img src="/Digi2limage/sec_142322323.png" />
                    </div>
                    <div class="card-text">
                      <p>
                        Discarding old appliances can be a bigger task than
                        buying a new one
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4  my-4">
                  {" "}
                  <div class="card-left">
                    <div class="card-image">
                      <img src="/Digi2limage/sec_2543533.png" />
                    </div>
                    <div class="card-text">
                      <p>What are the most basic refrigerator problems?</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4  my-4">
                  {" "}
                  <div class="card-left">
                    <div class="card-image">
                      <img src="/Digi2limage/sec_243422423.png" />
                    </div>
                    <div class="card-text">
                      <p>Circular Economy: A Global Need</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4  my-4">
                  <div class="card-left">
                    <div class="card-image">
                      <img src="/Digi2limage/doorstep-pickup.png" />
                    </div>
                    <div class="card-text">
                      <p>
                        Cleaning vs. Replacing AC Filters: Which is the Better
                        Choice?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4  my-4">
                  {" "}
                  <div class="card-left">
                    <div class="card-image">
                      <img src="/Digi2limage/1_.png" />
                    </div>
                    <div class="card-text">
                      <p>
                        A Breath of Fresh Air: Cleaning Your Air Conditioner to
                        Prevent Mold Growth
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {allData ? (
                <div className="justify-content-evenly row ">
                  <div className="col-lg-4  my-4">
                    {" "}
                    <div class="card-left">
                      <div class="card-image">
                        <img src="/Digi2limage/s_10.png" />
                      </div>
                      <div class="card-text">
                        <p>
                          How to Sell Old appliance Online? – The Evolving Saga
                          of Re-commerce in India
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4  my-4">
                    {" "}
                    <div class="card-left">
                      <div class="card-image">
                        <img src="/Digi2limage/s_20.png" />
                      </div>
                      <div class="card-text">
                        <p>Is Selling Old Appliances a Challenge?</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4  my-4">
                    {" "}
                    <div class="card-left">
                      <div class="card-image">
                        <img src="/Digi2limage/sec_1dwd.png" />
                      </div>
                      <div class="card-text">
                        <p>Planning To Sell Old AC: 3 Common AC Issues</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4  my-4">
                    {" "}
                    <div class="card-left">
                      <div class="card-image">
                        <img src="/Digi2limage/sell-your-old-AC.png" />
                      </div>
                      <div class="card-text">
                        <p>Common Issues With AC Compressor</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4  my-4">
                    {" "}
                    <div class="card-left">
                      <div class="card-image">
                        <img src="/Digi2limage/sec_142322323.png" />
                      </div>
                      <div class="card-text">
                        <p>
                          Discarding old appliances can be a bigger task than
                          buying a new one
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4  my-4">
                    {" "}
                    <div class="card-left">
                      <div class="card-image">
                        <img src="/Digi2limage/sec_2543533.png" />
                      </div>
                      <div class="card-text">
                        <p>What are the most basic refrigerator problems?</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4  my-4">
                    {" "}
                    <div class="card-left">
                      <div class="card-image">
                        <img src="/Digi2limage/sec_243422423.png" />
                      </div>
                      <div class="card-text">
                        <p>Circular Economy: A Global Need</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4  my-4">
                    <div class="card-left">
                      <div class="card-image">
                        <img src="/Digi2limage/doorstep-pickup.png" />
                      </div>
                      <div class="card-text">
                        <p>
                          Cleaning vs. Replacing AC Filters: Which is the Better
                          Choice?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4  my-4">
                    {" "}
                    <div class="card-left">
                      <div class="card-image">
                        <img src="/Digi2limage/1_.png" />
                      </div>
                      <div class="card-text">
                        <p>
                          A Breath of Fresh Air: Cleaning Your Air Conditioner
                          to Prevent Mold Growth
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4  my-4">
                    {" "}
                    <div class="card-left">
                      <div class="card-image">
                        <img src="/Digi2limage/discarding-your-old-AC.png" />
                      </div>
                      <div class="card-text">
                        <p>
                          A Breath of Fresh Air: Cleaning Your Air Conditioner
                          to Prevent Mold Growth
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="text-center pt-1 pb-5">
              <button
                onClick={() => allDatas()}
                className=" moreellipses text-white btn poppins-SemiBold btn-gradient"
              >
                {allData ? "less More" : "Read More"}
              </button>
            </div>
          </section>

          <section className="bg-light pb-5 pt-5">
            <footer className="w-100 py-3 flex-shrink-0">
              <div className="container py-2">
                <h4 className="fa-2xl py-5 text-capitalize">Company</h4>
                <div className="row gy-4 gx-5">
                  {SideMap.map((obj) => {
                    if (obj.HeaderisActive == true) {
                      return (
                        <div className="col-lg-3  my-4 col-md-3">
                          <ul className="list-unstyled">
                            <li className="pt-2">
                              <Link
                                to={obj.HeaderPermaLink}
                                className="opacity-75 text-black"
                              >
                                {obj.HeaderTitle}
                              </Link>
                            </li>
                          </ul>
                        </div>
                      );
                    }
                  })}

                  {/* <div className="col-lg-3  my-4 col-md-3">
                    <h5 className="mb-3">Company</h5>
                    <ul className="list-unstyled">
                      <li className="pt-2">
                        <Link to="/about/" className="opacity-75 text-black">
                          About Us
                        </Link>
                      </li>
                      <li className="pt-2"></li>
                      <li className="pt-2">
                        <Link to="/blogs/" className="opacity-75 text-black">
                          Digi2L Blogs
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link to="/press/" className="opacity-75 text-black">
                          Press Releases
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link
                          to="/corporate-enquiry/circular-economy/"
                          className="opacity-75 text-black"
                        >
                          Partner With Us
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link
                          to="/reseller-enquiry/"
                          className="opacity-75 text-black"
                        >
                          Become Digi2L Reseller
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link
                          to="/success-stories/"
                          className="opacity-75 text-black"
                        >
                          Success Stories
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3  my-4 col-md-3">
                    <h5 className="mb-3">Sell Appliances</h5>
                    <ul className="list-unstyled">
                      <li className="pt-2">
                        <Link
                          to="/smart-sell-air-conditioner/"
                          className="opacity-75 text-black"
                        >
                          AC
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link
                          to="/smart-sell-refrigerator/"
                          className="opacity-75 text-black"
                        >
                          Refrigerator
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link
                          to="/smart-sell-tv/"
                          className="opacity-75 text-black"
                        >
                          Tv
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link
                          to="/smart-sell-washing-machine/"
                          className="opacity-75 text-black"
                        >
                          Washing Machine
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3  my-4 col-md-3">
                    <h5 className="mb-3">Help & Support</h5>
                    <ul className="list-unstyled">
                      <li className="pt-2">
                        <Link to="/faq/" className="opacity-75 text-black">
                          FAQ
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link to="/contact/" className="opacity-75 text-black">
                          Contact Us
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link
                          to="/abb-policies/"
                          className="opacity-75 text-black"
                        >
                          ABB Policy
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link to="/policies/" className="opacity-75 text-black">
                          Refund policy
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3  my-4 col-md-3">
                    <h5 className="mb-3">More Info</h5>
                    <ul className="list-unstyled text-muted">
                      <li className="pt-2">
                        <Link
                          to="/exchange-terms-condition/"
                          className="opacity-75 text-black"
                        >
                          Exchange Terms & Conditions
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link
                          to="/privacy-policy/"
                          className="opacity-75 text-black"
                        >
                          Privacy Policy
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link to="/posh-law/" className="opacity-75 text-black">
                          POSH Law
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link
                          to="/cookie-policy/"
                          className="opacity-75 text-black"
                        >
                          Cookie Policy
                        </Link>
                      </li>

                      <li className="pt-2">
                        <Link to="" className="opacity-75 text-black">
                          Sitemap
                        </Link>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
              <div className="container py-2">
                <h4 className="fa-2xl py-5 text-capitalize">Policies</h4>
                <div className="row gy-4 gx-5">
                  {SideMapPolicy.map((obj) => {
                    if (obj.PolicyConditionisActive == true) {
                      return (
                        <div className="col-lg-3  my-4 col-md-3">
                          <ul className="list-unstyled">
                            <li className="pt-2">
                              <Link
                                to={obj.Route}
                                className="opacity-75 text-black"
                              >
                                {obj.Title}
                              </Link>
                            </li>
                          </ul>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="container py-2">
                <h4 className="fa-2xl py-5 text-capitalize">Quick Link</h4>
                <div className="row gy-4 gx-5">
                  {QuickLink.map((obj) => {
                    if (obj.QuickLinkIsActive == true) {
                      return (
                        <div className="col-lg-3  my-4 col-md-3">
                          <ul className="list-unstyled">
                            <li className="pt-2">
                              <Link
                                to={obj.PermaLink}
                                className="opacity-75 text-black"
                              >
                                {obj.Title}
                              </Link>
                            </li>
                          </ul>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}
