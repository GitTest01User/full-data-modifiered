import { useState } from "react";
import "../assets/style/about.css";

import "../assets/style/NewCss.css";
import Partner from "./Slider/Partner";
import Life from "./Slider/Life";
import News from "./Slider/News";

import Team from "./Slider/Team";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import $ from "jquery";
import { useEffect } from "react";

import ApplyNow from "./AddComponenet/ApplyNow";
import PostApi from "../WebService/PostApi";

import CurrentOpeningAbout from "./AddComponenet/CurrentOpeningAbout";
import AboutReadMore from "./AddComponenet/AboutReadMore";
import APi from "../WebService/APi";
import Get from "../WebService/Fuction/Get";

export default function About() {
  var [cards, SetCards] = useState([]);

  var navigate = useNavigate();
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
      SetCards(result.result);
    } else {
      navigator("*");
    }
  };

  useEffect(() => {
    menu();
  }, []);

  const RouteLink = (obj1) => {
    cards.forEach((obj) => {
      if (obj.MenuKey === obj1) {
        const title = obj.tblBrowserRouters.BrowserRouterPermaLink;
        navigate(title);
      }
    });
  };

  useEffect(() => {
    $(document).ready(function () {
      $(".upload input[type=file]").each(function () {
        var eventNamespace = ".upload";
        var labelInputValueAttr = "data-input-value";
        var $input = $(this);
        var $inputClone = $input.clone(!0, !0);
        $inputClone.removeClass("empty");
        var $label = $input.next("label");
        var setLabelInputValue = function () {
          var $input = $(this);
          if ($input.val() && $input.val() !== "") {
            $input.removeClass("empty");
            $label.attr(labelInputValueAttr, $input.val().split("\\").pop());
          } else {
            $label.attr(labelInputValueAttr, "");
            $input.addClass("empty");
          }
        };
        if (!$input.val() || $input.val() === "") {
          $input.addClass("empty");
        }
        $label.attr(labelInputValueAttr, "");
        $input.on("change" + eventNamespace, setLabelInputValue);
        $label.on("click" + eventNamespace, function (event) {
          if ($input.val() && $input.val() !== "" && $input.is(":valid")) {
            event.preventDefault();
            $input.remove();
            $label.before($inputClone);
            $input = $inputClone;
            if (!$input.val() || $input.val() === "") {
              $input.addClass("empty");
            }
            $inputClone = $input.clone(!0, !0);
            $inputClone.removeClass("empty");
            $input.off("change" + eventNamespace);
            $input.on("change" + eventNamespace, setLabelInputValue);
            $label.attr(labelInputValueAttr, "");
          }
        });
      });
    });
  }, []);

  return (
    <>
      <title>About - Digi2L</title>

      <section id="hero_banner">
        <div
          className=" position-relative "
          style={{
            backgroundImage: `url(/Digi2limage/img1about1.png)`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`,
          }}
        >
          <div className="">
            <div className="row flex-md-row">
              <div className="col-lg-1"></div>
              <div className="col-lg-5 m-auto pb-5">
                <h1
                  style={{
                    paddingTop: "60px",
                    paddingLeft: "20px",
                    paddingBottom: "50px",
                    fontSize: "41px",
                  }}
                  className="text-capitalize lh-base text-white poppins-Bold mt-5"
                  id="AboutHeading"
                >
                  About Digi2L{" "}
                </h1>
              </div>
              <div className="col-lg-6 " id="about2">
                <img
                  src="/Digi2limage/Untitled-design-4-3.png"
                  className="img-fluid222"
                  alt="Digi2l"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <AboutReadMore />
      </section>

      <section id="whatWeOffer" className="section_bg pb-3">
        <section className="smart_sell container py-3 my-5">
          <h1
            className="poppins-SemiBold main_heading text-center py-5"
            id="about10"
          >
            What Do We Offer{" "}
          </h1>
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 px-xl-5 col-md-6 px-4 mt-4">
              <h1 className="poppins-SemiBold main_heading" id="about11">
                Smart Sell
              </h1>
              <p
                className="lh-base mark-Bold para_first smart_description"
                id="about12"
              >
                Not sure how and where to sell your used home appliances? Are
                you fed up with bargaining for the best price? Are you tired of
                the endless wait for customers?
              </p>
              <p
                className="lh-base mark-Heavy para_second smart_description mb-4"
                id="about13"
              ></p>
          
              <button
                onClick={() => RouteLink("Smart_Sell")}
                className="btn poppins-SemiBold btn-gradient text-uppercase smart_btn"
              >
                Sell Your Old Appliance Now
              </button>
      
            </div>
            <div
              className="col-lg-5 col-md-6 order-lg-last order-xl-last text-center order-md-last order-first"
              id="about31"
            >
              <img
                className="img-fluid"
                src="/Digi2limage/uploads/2022/09/smart_sell.png.webp"
                alt="Digi2l"
              />
            </div>
          </div>
        </section>

        <section className="my-5 py-0 py-lg-3 smart_buy">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-6 col-md-6 text-center" id="about32">
                <img
                  className="img-fluid"
                  src="/Digi2limage/uploads/2022/09/smart_buy.png.webp"
                  alt="Digi2l"
                />
              </div>
              <div className="col-lg-6 col-md-6 px-4  mt-4">
                <h1 className="poppins-SemiBold main_heading" id="about16">
                  Assured Buyback
                </h1>
                <p className="lh-base mark-Bold para_first" id="about17">
                  Have you ever thought that you can predict the resale price of
                  your new appliances, that too after 5 years of usage? Sounds
                  unbelievable right?
                </p>
                <p className="lh-base mark-Heavy para_second mb-4" id="about18">
                  {" "}
                </p>
              
                <button
                  onClick={() => RouteLink("Assured_Buyback")}
                  className="btn poppins-SemiBold btn-gradient"
                  id="about20"
                >
                  Get Guaranteed Resale Price
                </button>
           
              </div>
            </div>
          </div>
        </section>

        <section className="product_exchange container my-5 py-0 py-lg-3">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 col-md-6  mt-4 px-4">
              <h1 className="poppins-SemiBold main_heading" id="about21">
                Enterprise Services Product Exchange Program
              </h1>
              <p className="lh-base mark-Bold para_first" id="about22">
                Productivity loss, logistics nightmare, retail trade partner
                scouting, reconciliation hassles and cost overruns! Are these
                the issues your experience when handling product exchange
                programs?
              </p>
              <p
                className="lh-base mark-Heavy para_second mb-4"
                id="about23"
              ></p>
             
              <button
                onClick={() => RouteLink("Corporate_Enquiry")}
                className="btn poppins-SemiBold btn-gradient"
                id="about24"
              >
                Know More
              </button>
           
            </div>
            <div
              className="col-lg-6 order-lg-last text-center order-xl-last order-md-last order-first col-md-6"
              id="about33"
            >
              <img
                className="img-fluid"
                src="/Digi2limage/uploads/2022/09/product_exchange.png"
                alt="Digi2l"
              />
            </div>
          </div>
        </section>

        <section className="product_reseller my-5 py-0 py-lg-3">
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-6 col-md-6 text-center" id="about34">
                <img
                  className="img-fluid"
                  src="/Digi2limage/uploads/2022/09/product_resellor.png.webp"
                  alt=""
                />
              </div>
              <div className="col-lg-6 col-md-6">
                <h1 className="poppins-SemiBold main_heading" id="about26">
                  Enterprise Services Product Resell Program
                </h1>
                <p className="lh-base mark-Bold para_first" id="about27">
                  Are you planning to upgrade the appliances in your
                  organization? But, are you clueless about what to do with the
                  used appliances?
                </p>
                <p className="lh-base mark-Heavy para_second" id="about28"></p>
                {cards.map((obj) => {
                  if (obj.MenuKey === "Corporate_Enquiry") {
                    return (
                      <HashLink
                        key={obj.MenuKey}
                        className="text-white"
                        to={`${obj.tblBrowserRouters.BrowserRouterPermaLink}#service_enterprise`}
                        scroll={(el) =>
                          el.scrollIntoView({ behavior: "auto", block: "end" })
                        }
                      >
                        <button
                          className="btn poppins-SemiBold btn-gradient"
                          id="about30"
                        >
                          Know More
                        </button>
                      </HashLink>
                    );
                  }
                  return null; 
                })}
              </div>
            </div>
          </div>
        </section>
      </section>

      <section id="ourTeam" className="team_section  pt-5">
        <div className="wrapper_team">
          <div className="container">
            <h2
              style={{ color: "#070139 !important" }}
              className=" text-center  poppins-SemiBold"
              id="about35"
            >
              Our Team
            </h2>
            <Team />
          </div>
        </div>
      </section>

      <section id="digi2lInNews" className="latest_blog_section py-4  pt-lg-5">
        <div className="d-flex align-items-center justify-content-center section_bg ">
          <h1
            className="poppins-SemiBold main_heading lh-base mt-5"
            id="about46"
          >
            Digi2L In The News
          </h1>
        </div>

        <div className="testimonial_section section_bg py-4">
          <div className="testimonial">
            <div className="container">
              <News />
            </div>
          </div>
        </div>
      </section>

      <section className=" pt-3 ">
        <h1 className="poppins-SemiBold  text-center " id="about47">
          Careers
        </h1>
        <p className="mark-Medium para_first text-center pb-4" id="about48">
          Find Your Dream Job Here
        </p>
        <div
          className="career-subsection"
          style={{
            background: `transparent linear-gradient(109deg, #AB01FC 0%, #3325B0
          100%) 0% 0% no-repeat padding-box`,
          }}
        >
          <div className="container work_space py-5 pb-5 pt-5">
            <div className="row">
              <div className="border-sm-bottom col-12 col-lg-6 col-md-6 col-sm-12 pt-4 px-4 pb-4">
                <h1
                  className="poppins-SemiBold career-heading text-white pb-3"
                  id="about49"
                >
                  Why Work With Digi2L?
                </h1>
                <p
                  className="mark-Medium text-white work_border"
                  style={{ fontSize: `18px` }}
                  id="about50"
                >
                  We are a young vibrant energetic team always willing to take
                  challenges head on and make things possible. If you see
                  yourself as a great enthusiast with some creative ideas for
                  transforming the appliance resale industry, then you’ll fit
                  perfectly here. This is an open opportunity for you to take
                  the leap, come and join us as we pioneer a new era in
                  appliance reselling through technology and innovation.
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-12 col-sm-12 border-start border-white border-2 ps-5 perks_working pt-4 pb-4">
                <h1
                  className="poppins-SemiBold career-heading text-white perks_head"
                  id="about51"
                >
                  Perks Of Working With Digi2L{" "}
                </h1>
                <div className="row">
                  <div className="col-lg-6 col-12 col-sm-12 d-flex py-3">
                    <img
                      src="/Digi2limage/working-hour.png"
                      width="40"
                      height="40"
                      alt="Digi2l"
                    />
                    <p
                      className="mark-Bold text-white ps-3"
                      style={{ fontSize: `18px` }}
                      id="about52"
                    >
                      Flexible Working Hours
                    </p>
                  </div>
                  <div className="col-lg-6 col-12 col-sm-12 d-flex py-3">
                    <img
                      src="/Digi2limage/rewards.png"
                      width="40"
                      height="40"
                      alt="Digi2l"
                    />
                    <p
                      className="mark-Bold text-white ps-3"
                      style={{ fontSize: `18px` }}
                      id="about53"
                    >
                      Rewards and Recognition
                    </p>
                  </div>
                  <div className="col-lg-6 col-12 col-sm-12 d-flex py-3">
                    <img
                      src="/Digi2limage/Curved-Chart.png"
                      width="40"
                      height="40"
                      alt="Digi2l"
                    />
                    <p
                      className="mark-Bold text-white ps-3"
                      style={{ fontSize: `18px` }}
                      id="about54"
                    >
                      Growth and Opportunities
                    </p>
                  </div>
                  <div className="col-lg-6 col-12 col-sm-12 d-flex py-3">
                    <img
                      src="/Digi2limage/Curved-3 User.png"
                      width="40"
                      height="40"
                      alt="Digi2l"
                    />
                    <p
                      className="mark-Bold text-white ps-3"
                      style={{ fontSize: `18px` }}
                      id="about55"
                    >
                      Employee Friendly Policies
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="lifeDigi2l" className="life-digi2l">
        <h1
          className="poppins-SemiBold main_heading text-center py-5"
          id="about56"
        >
          Life @ Digi2L
        </h1>
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-5 col-md-6">
              <p
                className="life-digi2l-heading mark-Medium"
                style={{ fontSize: `18px` }}
                id="about57"
              >
                At Digi2L, we believe that our mind has truly limitless
                potential, and everyone needs the right environment to unlock
                this potential. Therefore, we are committed to guiding our
                associates so that they can live out their dreams and purpose to
                the fullest. We also focus on nurturing people who are
                innovators, and problem solvers; people who don’t just follow
                the status quo, but can also set and drive the change.
                Collaboration, opportunities, diversity & inclusion – That’s
                what life at Digi2L is all about. Come, build a fulfilling
                career with us.
              </p>
            </div>

            <div
              className="col-lg-6 col-md-6 col-12 col-sm-12 order-first order-md-last"
              id="about58"
            >
              <img
                src="/Digi2limage/uploads/2022/12/life-sec-img-2.png.webp"
                alt="Digi2l"
                className="w-100"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="slick_slider" className="testimonial_section py-5">
        <div className="home_testimonial">
          <div className="testimonial">
            <div className="container" id="why_work_digi2l_career">
              <div className="testimonial__inner">
                <Life />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="CurrentOpeningSection ">
        <CurrentOpeningAbout />
      </section>

      <section
        className="querysection pt-5 px-4 pb-5"
        style={{ backgroundColor: "white" }}
      >
        <div className="container mb-5">
          <h1
            style={{ color: `#070139` }}
            className="pb-4 poppins-SemiBold text-center"
            id="about62"
          >
            Apply Now
          </h1>
          <ApplyNow id="About Us Enquiry" Api={PostApi.AboutFormPostApi} />
        </div>
      </section>

      <section className="our_partner py-5 section_bg">
        <div className="text-center">
          <h1 className="text-capitalize poppins-SemiBold">Our Partners</h1>
        </div>
        <div className="container mb-5">
          <Partner />
        </div>
      </section>
    </>
  );
}
