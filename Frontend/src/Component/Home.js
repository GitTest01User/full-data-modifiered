import React, { useEffect, useState } from "react";
import Partner from "./Slider/Partner";

import Trust from "./Slider/Trust";
import { Link, useNavigate } from "react-router-dom";

import Modalddd from "./AddComponenet/Modalddd";
import SmartBuyVideo from "./AddComponenet/SmartBuyVideo";

import Header from "./header";
import Serving from "./AddComponenet/Serving";

import APi from "../WebService/APi";

import MoblieSlider from "./MoblieSlider";
import HeroSlider from "./HeroSlider";
import Get from "../WebService/Fuction/Get";

export default function Home() {
  var [cards, SetCards] = useState([]);
  var [cardsFooter, SetCardsFooter] = useState([]);

  var navigate = useNavigate();
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

  var menuFooter = async () => {
    try {
      Get(APi.FooterMenu)
        .then(handleResponse)
        .then(processGetLinkFooter)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetLinkFooter = (result) => {
    if (result.Status && result.result.length != 0) {
      SetCardsFooter(result.result);
    } else {
      navigator("*");
    }
  };
  useEffect(() => {
    menu();
    menuFooter();
  }, []);

  const RouteLink = (obj1) => {
    if (obj1) {
      cards.forEach((obj) => {
        if (obj.MenuKey === obj1) {
          const title = obj.tblBrowserRouters.BrowserRouterPermaLink;
          navigate(title);
        }
      });
    }
  };
  var RouteFooterLink = (obj1) => {
    if (obj1) {
      cardsFooter.forEach((obj) => {
        if (obj.FooterKey === obj1) {
          const titleFooter = obj.tblBrowserRouters.BrowserRouterPermaLink;
          navigate(titleFooter);
        }
      });
    }
  };
  return (
    <div>
      <title>
        Digi2L - India's 1st Digital Platform To Sell Used Appliances
      </title>

      <HeroSlider />
      <MoblieSlider />

      <section className="smart_sell container mt-3 mb-3 py-3 overflow-hidden">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div
                className="card"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  position: " relative",
                }}
              >
                <div className="card-body">
                  <ul className="nav nav-pills nav-justified  justify-content-center">
                    <li
                      className="nav-item"
                      style={{
                        display: `flex`,
                        flex: `1`,
                        height: `100%`,
                        justifyContent: `center`,
                        overflow: `hidden`,
                        padding: `16px 0`,
                        position: `relative`,
                      }}
                    >
                      <Link
                        className="nav-link active"
                        data-bs-toggle="pill"
                        to="#smartsell"
                      >
                        Smart Sell
                      </Link>
                    </li>
                    <li
                      className="nav-item"
                      style={{
                        display: `flex`,
                        flex: `1`,
                        height: `100%`,
                        justifyContent: `center`,
                        overflow: `hidden`,
                        padding: `16px 0`,
                        position: `relative`,
                      }}
                    >
                      <Link
                        className="nav-link"
                        data-bs-toggle="pill"
                        to="#smartbuy"
                      >
                        Assured BuyBack
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane container active" id="smartsell">
                      <section className="smart_sell container">
                        <div className="row justify-content-center align-items-center">
                          <div className="col-lg-6 px-xl-5 col-md-6">
                            <h1
                              className="poppins-SemiBold main_heading"
                              id="SmartSellHeading"
                            >
                              Smart Sell
                            </h1>
                            <p
                              className="lh-base mark-Medium para_first"
                              id="SmartSellFirstPara"
                            >
                              Not sure how and where to sell your used home
                              appliances? Are you fed up with bargaining for the
                              best price? Are you tired of the endless wait for
                              customers?
                            </p>
                            <p
                              className="lh-base mark-Heavy para_second my-4"
                              id="SmartSellSecondPara"
                            >
                              Not anymore! With Digi2L, India’s 1st digital
                              platform to sell old appliances, you can easily
                              sell your used appliances and gadgets within
                              seconds and get the best value without any
                              hassles.{" "}
                            </p>

                            <button
                              onClick={() => RouteLink("Smart_Sell")}
                              className="btn poppins-SemiBold btn-gradient"
                              id="SmartSellBtn"
                            >
                              Sell Your Old Appliance Now
                            </button>
                          </div>
                          <div
                            className="col-lg-6 col-md-6 order-lg-last order-xl-last order-md-last order-first"
                            id="HomeSmartSellImg"
                          >
                            <div className="wplightbox">
                              <div
                                className="lightboxContainer1 text-center"
                                id="demo333"
                              >
                                <Modalddd />
                                <img
                                  className="img-fluid"
                                  src=".//Digi2limage/uploads/2022/09/smart_sell.png.webp"
                                  alt="smart-sell"
                                  width="auto"
                                  height="auto"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div className="tab-pane container fade" id="smartbuy">
                      <section className="smart_buy">
                        <div className="container">
                          <div className="row justify-content-center align-items-center">
                            <div
                              className="col-lg-6 col-md-6 text-center"
                              id="HomeSmartBuyimg"
                            >
                              <div className="wplightbox">
                                <div
                                  className="lightboxContainer1 text-center"
                                  id="demo222"
                                >
                                  <SmartBuyVideo />
                                  <img
                                    className="img-fluid"
                                    src=".//Digi2limage/uploads/2022/09/smart_buy.png.webp"
                                    width="auto"
                                    height="auto"
                                    alt="smart-buy"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 px-xl-5 col-md-6">
                              <h1
                                className="poppins-SemiBold main_heading"
                                id="SmartBuyHeading"
                              >
                                Assured BuyBack
                              </h1>
                              <p
                                className="lh-base mark-Medium para_first"
                                id="SmartBuyFirstPara"
                              >
                                Have you ever thought that you can predict the
                                resale price of your new appliances, that too
                                after 5 years of usage? Sounds unbelievable
                                right?
                              </p>
                              <p
                                className="lh-base mark-Heavy para_second"
                                id="SmartBuySecondFirstPara"
                              >
                                Digi2L’s Smart Buy Plan makes this seemingly
                                unbelievable wish possible by guaranteeing a
                                fixed buyback price for your used home
                                appliances, for up to 5 years from the date of
                                your purchase. So, you can upgrade your
                                Television from time to time without worrying
                                about selling your old TV.
                              </p>

                              <button
                                className="btn poppins-SemiBold btn-gradient"
                                id="smartbuybtn"
                                onClick={() => RouteLink("Assured_Buyback")}
                              >
                                Get Guaranteed Resale Price
                              </button>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="smart_buy section_bg overflow-hidden"
        style={{ paddingBottom: "100px" }}
      >
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-7" style={{ paddingTop: "40px" }}>
              <h1 className="poppins-SemiBold main_heading text-center">
                A Smart way to Sell with Digi2L
              </h1>
              <p className="poppins-SemiBold main_heading text-center">
                Experience the Joy of Effortlessly Selling Your Old Appliances
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className="mb-5"
        style={{ paddingTop: "40px", marginTop: "-105px" }}
      >
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3">
              <img
                className=""
                src="Digi2limage/themes/digi2l/assets/images/qc.png"
                alt=""
                style={{ paddingBottom: "20px" }}
              />
              <h3 className="text-center">Quality Check that's Hassle-free</h3>
              <p className="text-center">
                Do it yourself. Get a quality check done at the comfort of your
                home.
              </p>
            </div>
            <div className="col-md-3">
              <img
                className=""
                src="/Digi2limage/themes/digi2l/assets/images/best-price.png"
                alt=""
                style={{ paddingBottom: "20px" }}
              />
              <h3 className=" text-center">Best Price Quote Guarantee</h3>
              <p className="text-center">
                Get the best price quote from our customer support executive.
              </p>
            </div>
            <div className="col-md-3">
              <img
                className=""
                src="/Digi2limage/themes/digi2l/assets/images/free-pick-up.png"
                alt=""
                style={{ paddingBottom: "20px" }}
              />
              <h3 className="text-center">
                Free Pick-up
                <br /> Service
              </h3>
              <p className="text-center">
                Select your convenient date and get a free pickup done.
              </p>
            </div>
            <div className="col-md-3">
              <img
                className=""
                src="/Digi2limage/themes/digi2l/assets/images/instant-money-transfer.png"
                alt=""
                style={{ paddingBottom: "20px" }}
              />
              <h3 className="text-center">
                Instant <br />
                Money Transfer
              </h3>
              <p className="text-center">
                Money will be transferred to you instantly after pickup.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div>
        <Header />
      </div>
      <section className="smart_buy pt-5  mb-5 overflow-hidden">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-7">
              <h1 className="poppins-SemiBold main_heading text-center">
                Sell Your Appliance Smartly
              </h1>
            </div>
          </div>
          <div className="row justify-content-center align-items-center pt-5 pb-3">
            <div className="col-md-3 mb-4 text-center">
              <img
                onClick={() => RouteFooterLink("Television")}
                className="tv"
                src="/Digi2limage/themes/digi2l/assets/images/tv.png"
                alt=""
              />
            </div>
            <div className="col-md-3 mb-4 text-center">
              <img
                onClick={() => RouteFooterLink("Refrigerator")}
                className="refrigerator"
                src="/Digi2limage/themes/digi2l/assets/images/Refrigerator.png"
                alt=""
              />
            </div>
            <div className="col-md-3 mb-4 text-center">
              <img
                onClick={() => RouteFooterLink("Air_Conditioner")}
                className="ac"
                src="/Digi2limage/themes/digi2l/assets/images/ac.png"
                alt=""
              />
            </div>
            <div className="col-md-3 mb-4 text-center">
              <img
                onClick={() => RouteFooterLink("Washing_Machine")}
                className="washing-machine"
                src="/Digi2limage/themes/digi2l/assets/images/washing-machine.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section className="serving_in position-relative none d-lg-block  position-relative serving_in overflow-hidden ">
        <div id="serviceinMap" className="container">
          <Serving />
        </div>
      </section>

      <section className="testimonial_section py-5 bg-light overflow-hidden">
        <div className="home_testimonial">
          <div className="text-center px-5">
            <h1
              className="text-capitalize poppins-SemiBold main_heading lh-base"
              id="TestimonialHeading"
            >
              Over 50 Thousand Customers Trust Digi2L
            </h1>
          </div>

          <div className="testimonial">
            <div className="container">
              <Trust />
            </div>
            <div className="text-center pt-3 pb-3">
              <button
                className="btn poppins-SemiBold btn-gradient text w-auto"
                id="smartbuybtn"
                onClick={() => RouteLink("Customer_Reviews")}
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="our_partner py-5 section_bg overflow-hidden ">
        <div className="text-center">
          <h1 className="text-capitalize poppins-SemiBold">Our Partners</h1>
        </div>

        <div className="testimonial pb-5">
          <div className="container">
            <Partner />
          </div>
        </div>
      </section>
    </div>
  );
}
