import React, { useRef } from "react";

import "../assets/style/abb.css";

import "../assets/style/NewCss.css";
import "../assets/style/exchange.css";

import AbbPlan from "./Slider/ABBplan";
import Seamless from "./Slider/Seamless";
import LetsPartnerUp from "./AddComponenet/LetsPartnerUp";
import PostApi from "../WebService/PostApi";

export default function BuybackPlan() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <title>ABB - Digi2L</title>
      <div>
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-10 pt-2" id="breadlink">
              <nav className="demo2" aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">Home</li>
                  <li className="breadcrumb-item">Corporate Enquiry</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Buyback Plan /ABB
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-lg-5 mt-5 d-none d-lg-block"></div>
            <div className="col-lg-1"></div>
          </div>
        </div>

        <section id="hero_banner">
          <div
            className="wrapper_herobanner5  border-0 common-shadow blog_card_path FeaturedBlogsCard2  demo32223333"
            style={{
              backgroundImage: `url('/Digi2limage/hero_bgssa.png')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "450px",
              width: "100%",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-10">
                  <h1
                    className="text-capitalize lh-base text-white poppins-Bold text-start"
                    style={{ paddingTop: " 130px" }}
                  >
                    Unlock The Power Of Digi2L <br></br> Assured Buyback Plan
                  </h1>

                  <div>
                    <button
                      onClick={handleClick}
                      style={{ color: "#ff7b50" }}
                      className="btn btn-simple mt-3 fw-bold  mb-md-5"
                    >
                      Upgrade with Confidence
                    </button>
                  </div>
                </div>
                <div className="col-lg-6 d-none d-lg-block">
                  <img
                    style={{ position: "absolute", height: "430px" }}
                    src="/Digi2limage/hero_imgsasa.png"
                    className="img-fluid "
                    alt="Digi2l"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="abb" className="mt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <h1 className="poppins-SemiBold main_heading">
                  Digi2L Assured Buyback Plan: Upgrade with Best Returns{" "}
                </h1>
                <p className="pclass">
                  At Digi2L, we offer the Assured Buyback Plan (ABB), a unique
                  opportunity for brands to provide their customers with a
                  trustworthy upgrade and buyback solution at the time of new
                  product purchase. By promoting our ABB plan, brands can
                  instill trust in their customers by offering them the ability
                  to determine the return value of their new appliance at the
                  time of purchase itself.
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-12 col-sm-12 order-first order-md-last text-center">
                <img
                  src="/Digi2limage/sec_3.png"
                  className="img-fluid"
                  style={{ width: "444px" }}
                  alt="Digi2l"
                />
              </div>
            </div>
          </div>
        </section>
        <section
          className="smart_buy section_bg"
          style={{ paddingBottom: "100px" }}
        >
          <div className="container">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-7" style={{ paddingTop: "45px" }}>
                <h1 className="poppins-SemiBold main_heading text-center">
                  Thriving Indian Home Appliance Market
                </h1>
              </div>
            </div>
          </div>
        </section>

        <section
          className="mb-5"
          style={{ paddingTop: "42px", marginTop: "-105px" }}
        >
          <div className="container">
            <div className="row text-center">
              <div className="col-md-4">
                <img
                  src="/Digi2limage/Group_1.png"
                  style={{ width: "180px", paddingBottom: "20px" }}
                  alt="Digi2l"
                />
                <p className="gclass text-center">
                  The market size reached a value of approximately USD 73.55
                  billion in 2022.
                </p>
              </div>
              <div className="col-md-4">
                <img
                  src="/Digi2limage/Group_2.png"
                  style={{ width: "180px", paddingBottom: "20px" }}
                  alt="Digi2l"
                />
                <p className="gclass text-center">
                  The market is expected to grow at a CAGR of 5.70% between 2023
                  and 2028.
                </p>
              </div>
              <div className="col-md-4">
                <img
                  src="/Digi2limage/Group_3.png"
                  style={{ width: "180px", paddingBottom: "20px" }}
                  alt="Digi2l"
                />
                <p className="gclass text-center">
                  Forecasted healthy growth: USD 101.8B by 2028, forecast period
                  2023-2028.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="abb" className="mt-5 mb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <h1 className="poppins-SemiBold main_heading">
                  Why Choose Digi2L <br />
                  ABB Plan?
                </h1>
                <p className="pclass">
                  Our Assured Buyback plan is designed to provide numerous
                  advantages and benefits that make it a compelling choice for
                  brands. By choosing Digi2L’s Assured Buyback Plan, brands can
                  provide their customers with a seamless upgrade experience.
                  Don't miss out on the opportunity to promote this valuable
                  plan to your customers.
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-12 col-sm-12 order-first order-md-last text-center">
                <img
                  src="/Digi2limage/sec_2.png"
                  className="img-fluid"
                  style={{ width: "444px" }}
                  alt="Digi2l"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <div
            className="text-center pt-5"
            style={{ backgroundColor: " #3C23B6", height: "296px" }}
          >
            <h1 className="poppins-SemiBold main_heading lh-base text-white text-center">
              Here's why brands should choose <br /> Digi2L ABB plan:
            </h1>
          </div>

          <div
            className="container"
            style={{ transform: "translateY(-100px)" }}
          >
            <div className="row justify-content-center">
              <div className="col-lg-2 col-1 d-none d-md-block"></div>
              <div className="col-lg-12 col-11 pe-0">
                <div className="owl-slider123131 mt-4">
                  <AbbPlan />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="abb" className="mx-md-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <h1 className="poppins-SemiBold main_heading">
                  Here's <br />
                  How it works?
                </h1>
                <p className="pclass">
                  If a customer wishes to upgrade their appliance after 5 years,
                  they can make use of the Digi2L’s ABB plan and take advantage
                  of the buyback price provided at the time of purchase. This
                  makes upgrading hassle-free, as customers have already availed
                  Digi2L's buyback plan and can easily purchase a new appliance
                  while conveniently discarding the old one, all while obtaining
                  a good return value.
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-12 col-sm-12 order-first order-md-last text-center">
                <img
                  src="/Digi2limage/sec_1.png"
                  className="img-fluid"
                  style={{ width: "444px" }}
                  alt="Digi2l"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pt-5 ">
          <div
            className="text-center pt-md-5"
            style={{ backgroundColor: " #3C23B6", height: "255px" }}
          >
            <h1 className="poppins-SemiBold main_heading lh-base text-white text-center pb-5">
              Seamless Path to <br /> Upgradation
            </h1>
          </div>

          <div
            className="container"
            style={{ transform: "translateY(-100px)" }}
          >
            <div className="row justify-content-center">
              <div className="col-lg-2 col-1 d-none d-md-block"></div>
              <div className="col-lg-12 col-11 pe-0">
                <div className="owl-slider123131 mt-4">
                  <Seamless />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="bottom_banner">
          <div
            className="wrapper_bottombanner d-none d-lg-block "
            style={{
              backgroundImage: `url("/Digi2limage/hero_bg22322.png")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "400px",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-6 pt-5  col-10">
                  <h2 className="text-capitalize lh-base text-white poppins-Bold text-start mt-5">
                    Join us in providing comprehensive after-sales services that
                    add value & set your brand apart from the competition.
                  </h2>
                </div>
                <div className="col-lg-6 d-none d-lg-block">
                  <img
                    style={{ position: "absolute", height: "400px" }}
                    src="/Digi2limage/bottom_img.png"
                    alt="Digi2l"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-lg-none position-relative">
            <img
              src="/Digi2limage/mobile_bottom33232.png"
              style={{ width: "100%" }}
              alt=""
              className="img-fluid"
            />
            <div className="position-absolute" style={{ top: "55%" }}>
              <h3 className="text-capitalize lh-base text-white poppins-Bold text-center">
                Join us in providing comprehensive after-sales services that add
                value & set your brand apart from the competition.
              </h3>
            </div>
          </div>
        </section>

        <section
          ref={ref}
          className="section_bg Become_partnetSection py-5 "
          id="contactform"
        >
          <div className="text-center pb-5">
            <h1 className="text-capitalize poppins-Bold main_heading">
              Let's Partner Up
            </h1>
          </div>
          <LetsPartnerUp id="ABB Enquiry" Api={PostApi.AbbFormApi} />
        </section>
      </div>
    </div>
  );
}
