import React, { useState } from "react";

import Serving from "./AddComponenet/Serving";
import Partner from "./Slider/Partner";
import LetsPartnerUp from "./AddComponenet/LetsPartnerUp";
import { Link } from "react-router-dom";
import Swiper from "./Slider/Swiper";
import ResellerVideo from "./AddComponenet/ResellerVideo";
import { useEffect } from "react";

import $ from "jquery";
import PostApi from "../WebService/PostApi";

import FAQSection from "./FAQ/FAQSection";
import Experiences from "./Slider/Experiences";
import CountUp from "react-countup";
import APi from "../WebService/APi";
import Get from "../WebService/Fuction/Get";

function ResellerEnquiry() {
  var [counter, setCounter] = useState([]);
  useEffect(() => {
    $(".jshover").hover(
      function () {
        $(".jshoverdefault p").addClass("text-black");
        $(".jshoverdefault .overclass0").css({
          background:
            "url(/Digi2limage/Location.svg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
        });
        $(".jshoverdefault .hover_effect2").css({ background: "url()" });
      },
      function () {
        $(".jshoverdefault p").removeClass("text-black");
        $(".jshoverdefault .overclass0").css({
          background:
            "url(/Digi2limage/Location.svg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
        });
        $(".jshoverdefault .hover_effect2").css({
          background:
            "url(/Digi2limage/hover/hover.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        });
      }
    );
  });

  var Counter = () => {
    try {
      Get(APi.GetCounterAPi)
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetLink = (result) => {
    if (result.Status && result.result.length != 0) {
      setCounter(result.result);
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

  useEffect(() => {
    Counter();
  }, []);

  return (
    <>
      <title>Reseller Enquiry - Digi2L</title>
      <section id="hero_banner">
        <div
          class="wrapper_herobanner10 rocket-lazyload"
          style={{
            backgroundImage: `url("/Digi2limage/img34422.png")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-1"></div>
              <div className="col-lg-5 col-10 mt-3">
                <h1
                  className="text-capitalize lh-base text-white poppins-Bold "
                  id="dealer1"
                  style={{ paddingTop: "100px", fontSize: "42px" }}
                >
                  India's First Digital Platform For Used Appliance!
                </h1>
                <Link
                  to="https://utcbridge.com/erp/EVCOnboarding"
                  className="btn btn-simple  fw-bold"
                  id="dealer2"
                >
                  Register To Become Reseller{" "}
                </Link>
              </div>
              <div className="col-lg-6 mt-3 d-none d-lg-block" id="dealer3">
                <img
                  style={{ position: "absolute", height: "600px" }}
                  src="/Digi2limage/img2-10.png"
                  className="img-fluid "
                />
              </div>
              <div className="col-lg-1"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="smart_sell container py-5 my-5">
        <div className="row justify-content-center align-items-center px-3">
          <div className="col-lg-6 px-xl-5 col-md-6 text-para-div">
            <p className="lh-base mark-Heavy para_second" id="dealer4">
              Founded in 2021 with a vision to transform the way second-hand
              trade is done in India, Digi2L is the first digital platform,
              which uses technology to offer end to end visibility of
              transactions right from the time the old appliances are picked up
              from consumer homes till the time they get delivered to mapped
              retail trade partner.
            </p>
            <p className="lh-base mark-Bold para_first" id="dealer5">
              Digi2L is solving core trade problems faced by the second-hand
              appliances dealers, through its unique “Wallet Management System”
              that helps them scale the trade and grow their business while
              offering a much higher ROI.
            </p>
          </div>

          <div className="col-lg-6 col-md-6 text-center order-lg-last order-xl-last order-md-last order-first mb-4">
            <a className="wplightbox" id="reseller434423 ">
              <div className=" text-center d-lg-block">
                <ResellerVideo />
                <img
                  className="img-fluid mt-3 "
                  src="/Digi2limage/dealerEnq-1.png"
                />
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="d-lg-none d-md-none ">
        <div
          className="text-center py-5 "
          style={{ backgroundColor: "#3C23B6", height: "215px" }}
        >
          <h1 className="text-capitalize text-white" id="dealer7">
            Why Partner With Digi2L?
          </h1>
        </div>

        <div className="container" style={{ transform: "translateY(-100px)" }}>
          <div className="row justify-content-center">
            <div className="col-lg-2 col-1 d-none d-md-block"></div>
            <div className="col-lg-12 col-11 pe-0">
              <div className="owl-slider123131 mt-4">
                <Swiper />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="d-none d-lg-block ">
        <div
          className="text-center py-5 "
          style={{ backgroundColor: "#3C23B6", height: "215px" }}
        >
          <h1
            className="poppins-SemiBold main_heading lh-base text-white text-capitalize"
            id="dealer7"
          >
            Why Partner With Digi2L?
          </h1>
        </div>

        <div className="container" style={{ transform: "translateY(-100px)" }}>
          <div className="row justify-content-center">
            <div className="col-lg-2 col-1 d-none d-md-block"></div>
            <div className="col-lg-12 col-11 pe-0">
              <div className="owl-slider123131 mt-4">
                <Swiper />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="frequentlyAsk_question pb-5">
        <FAQSection value="Reseller" />
      </section>

      <section class="testimonial_section py-5 section_bg">
        <div class="home_testimonial">
          <div class="text-center ">
            <h1 class="text-capitalize poppins-Bold " id="dealer16">
              Reseller Experiences
            </h1>
          </div>

          <div class="">
            <div class="container">
              <div class="testimonial__inner5555">
                <Experiences value="Reseller" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          id="projectFactsResller"
          class="py-5"
          style={{ backgroundColor: "#3C23B6" }}
        >
          <div class="fullWidth eight columns container ">
            <div class="justify-content-center m-3 row text-center">
              {counter.map((obj) => {
                if (obj.CounterISActive == true) {
                  return (
                    <>
                      <div
                        class="col-lg-3 col-md-4 col-sm-12  jshover text-center"
                        data-number="50"
                        style={{ visibility: "visible" }}
                      >
                        <div
                          class="p-3 m-lg-4 mx-1 my-3 rounded-20 text-white hover_effecta hoverCard"
                          style={{ border: "1px solid#ffffff49" }}
                        >
                          <div class={`text-end ${obj.ImageCounter}`}></div>
                          <div class="d-flex justify-content-md-center align-items-center poppins-SemiBold">
                            <p id="num1" class="fs-1">
                              <CountUp duration={2} end={obj.Reseller_count} />
                            </p>
                            <p class="fs-2">+</p>
                          </div>

                          <p
                            class="poppins-Regular fs-6 text-lg-center text-start"
                            id="dealer17"
                          >
                            {obj.Title}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                }
              })}

              {/* {/* <div
                class="col-lg-3 col-md-4 col-sm-12 jshover text-center"
                data-number="500"
                style={{ visibility: "visible" }}
              >
                <div
                  class="p-3 m-lg-4 mx-1 my-3 rounded-20 text-white hover_effecta hoverCard"
                  style={{ border: "1px solid#ffffff49" }}
                >
                  <div class="text-end overclass333 "></div>

                  <div class="d-flex justify-content-md-center align-items-center poppins-SemiBold">
                    <p id="num2" class="fs-1">
                      <CountUp end={900} />
                    </p>
                    <p class="fs-2">+</p>
                  </div>

                  <p
                    class="poppins-Regular fs-6 text-lg-center text-start"
                    id="dealer18"
                  >
                    Resellers
                  </p>
                </div>
              </div> */}
              {/* <div
                class="col-lg-3 col-md-4 col-sm-12 jshover text-center"
                data-number="20000"
                style={{ visibility: "visible" }}
              >
                <div
                  class="p-3 m-lg-4 mx-1 my-3 rounded-20 text-white hover_effecta hoverCard"
                  style={{ border: "1px solid#ffffff49" }}
                >
                  <div class="text-end overclass222"></div>

                  <div class="d-flex justify-content-md-center align-items-center poppins-SemiBold">
                    <p id="num3" class="fs-1">
                      <CountUp end={3500} />
                    </p>
                    <p class="fs-2">+</p>
                  </div>
                  <p
                    class="poppins-Regular fs-6 text-lg-center text-start"
                    id="dealer19"
                  >
                    Products Sold
                  </p>
                </div>
              </div> */}
              {/* <div
                class="col-lg-3 col-md-4 col-sm-12 jshover text-center"
                data-number="16000"
                style={{ visibility: "visible" }}
              >
                <div
                  class="p-3 m-lg-4 mx-1 my-3 rounded-20 text-white hover_effecta hoverCard"
                  style={{ border: "1px solid#ffffff49" }}
                >
                  <div class="text-end overclass444"></div>

                  <div class="d-flex justify-content-md-center align-items-center poppins-SemiBold">
                    <p id="num4" class="fs-1">
                      <CountUp end={16000} />
                    </p>
                    <p class="fs-2">+</p>
                  </div>

                  <p
                    class="poppins-Regular fs-6 text-lg-center text-start"
                    id="dealer20"
                  >
                    Become A Reseller
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="serving_in position-relative">
        <div id="serviceinMap" className="container">
          <Serving />
        </div>
      </section>

      <section class="section_bg Become_partnetSection py-5" id="dealercontact">
        <div class="text-center pb-5">
          <h1 class="text-capitalize poppins-Bold " id="dealer20">
            Register To Become A Reseller
          </h1>
        </div>
        <LetsPartnerUp id="ResellerEnquiry" Api={PostApi.ResellerFormApi} />
      </section>

      <section class="our_partner py-5 ">
        <div class="text-center">
          <h1 class="text-capitalize poppins-Bold" id="dealer21">
            Our Partner
          </h1>
        </div>

        <div class="testimonial">
          <div class="container">
            <Partner />
          </div>
        </div>
      </section>
    </>
  );
}

export default ResellerEnquiry;
