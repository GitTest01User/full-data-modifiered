import React, { useRef } from "react";

import Partner from "./Slider/Partner";
import LetsPartnerUp from "./AddComponenet/LetsPartnerUp";
import BenefitFrom from "./Slider/BenefitFrom";
import ReadMoreEnquire from "./AddComponenet/ReadMoreEnquire";
import Swiper2 from "./Slider/Swiper2";
import PostApi from "../WebService/PostApi";
import Experiences from "./Slider/Experiences";
import FAQSection from "./FAQ/FAQSection";
import CountUp from "react-countup";
import CorporateSlider, {
  CorporateMoblieSlider,
} from "./Slider/CorporateSlider";
import { Outlet } from "react-router-dom";
export default function CorporateEnquiry() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (

    <div>
   
      <title>Corporate Enquiry - Digi2L</title>
      <div>
        <CorporateSlider />
        <CorporateMoblieSlider />


        <section className="smart_sell container py-3 my-5">
          <div className="justify-content-center px-3 px-md-0 row">
            <div className="col-lg-6 mt-4 mt-lg-0 order-1 order-lg-0">
              <h1
                className="main_heading poppins-SemiBold px-0"
                id="corporate10"
              >
                Enterprise Services Product Exchange Program
              </h1>
              <p
                className="lh-base mark-Medium mb-0 more para_first px-0"
                id="corporate11"
              >
                <ReadMoreEnquire />
              </p>
            </div>
            <div
              className="col-lg-5 col-md-5 order-lg-last order-xl-last order-md-last order-first"
              id="corporate12"
            >
              <img
                className="img-fluid"
                src="/Digi2limage/p_exchange.png.webp"
                alt=""
              />
            </div>
          </div>
        </section>

        <section id="how_works">
          <div className="wrapper_works">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h1 className="pt-5 poppins-SemiBold" id="corporate13">
                    {" "}
                    How It Works?
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="works_section">
            <div className="container">
              <div className="justify-content-start row">
                <div className="col-lg-auto mt-2 text-center" id="corporate15">
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_1-2.png.webp"
                    alt=""
                  />
                </div>
                <div className="col-lg-3 order-lg-0 order-first">
                  <div className="row justify-content-center">
                    <div className="col-lg-2 col-auto text-end">
                      <h1 className="poppins-SemiBold">1</h1>
                    </div>
                    <div className="col-lg-10 col-4 text-start">
                      <h5 className="mt-2 poppins-SemiBold" id="corporate14">
                        {" "}
                        Meeting With Digi2L Team
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 text-center work_line">
                  <img
                    src="/Digi2limage/work_line.png"
                    className="img-fluid d-none d-lg-block"
                  />
                  <div className="d-block d-lg-none text-center">
                    <img
                      src="/Digi2limage/work_line.png"
                      className="img-fluid "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="works_section">
            <div className="container">
              <div className="justify-content-end row">
                <div className="col-lg-3 text-center work_line">
                  <img
                    src="/Digi2limage/work_line2.png"
                    className="img-fluid d-none d-lg-block"
                  />
                  <div className="d-block d-lg-none text-center">
                    <img
                      src="/Digi2limage/work_line2.png"
                      className="img-fluid "
                    />
                  </div>
                </div>
                <div className="col-lg-3 order-lg-0 order-first">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 col-auto text-end">
                      <h1 className="poppins-SemiBold">2</h1>
                    </div>
                    <div className="col-lg-9 col-6 text-start">
                      <h5 className="poppins-SemiBold" id="corporate16">
                        {" "}
                        Digi2L Submits Campaign Execution Strategy
                      </h5>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-auto order-first order-lg-last text-center text-lg-end"
                  id="corporate17"
                >
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_2-1.png.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="works_section">
            <div className="container">
              <div className="justify-content-center row">
                <div
                  className="col-lg-auto mt-lg-5 mt-3 text-center"
                  id="corporate19"
                >
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_3-1.png.webp"
                    alt=""
                  />
                </div>
                <div className="col-lg-3 order-lg-0 order-first">
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-auto text-end">
                      <h1 className="mt-2 poppins-SemiBold">3</h1>
                    </div>
                    <div className="col-lg-8 col-5 text-start">
                      <h5 className="mt-2 poppins-SemiBold" id="corporate18">
                        {" "}
                        Customer Registers Exchange Details
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 text-center work_line">
                  <img
                    src="/Digi2limage/work_line.png"
                    className="img-fluid d-none d-lg-block"
                  />
                  <div className="d-block d-lg-none text-center">
                    <img
                      src="/Digi2limage/work_line.png"
                      className="img-fluid "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 mt-lg-5 works_section">
            <div className="container">
              <div className="justify-content-end row">
                <div className="col-lg-3 text-center work_line">
                  <img
                    src="/Digi2limage/work_line2.png"
                    className="img-fluid d-none d-lg-block"
                  />
                  <div className="d-block d-lg-none text-center">
                    <img
                      src="/Digi2limage/work_line2.png"
                      className="img-fluid "
                    />
                  </div>
                </div>
                <div className="col-lg-3 order-lg-0 order-first">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 col-auto text-end">
                      <h1 className="poppins-SemiBold">4</h1>
                    </div>
                    <div className="col-lg-9 col-5 text-start">
                      <h5 className="poppins-SemiBold" id="corporate20">
                        {" "}
                        Customer Approves Exchange Price
                      </h5>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-auto mt-3 mt-lg-0 order-first order-lg-last"
                  id="corporate21"
                >
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_4-2.png.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="works_section">
            <div className="container">
              <div className="justify-content-center row">
                <div className="col-lg-auto mt-lg-5 mt-3" id="corporate23">
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_7-3.png.webp"
                    alt=""
                  />
                </div>
                <div className="col-lg-3 order-lg-0 order-first">
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-auto text-end">
                      <h1 className="mt-2 poppins-SemiBold">5</h1>
                    </div>
                    <div className="col-lg-8 col-5 text-start">
                      <h5 className="mt-2 poppins-SemiBold" id="corporate22">
                        {" "}
                        Product Quality Check
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 text-center work_line">
                  <img
                    src="/Digi2limage/work_line.png"
                    className="img-fluid d-none d-lg-block"
                  />
                  <div className="d-block d-lg-none text-center">
                    <img
                      src="/Digi2limage/work_line.png"
                      className="img-fluid "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 mt-lg-5 works_section">
            <div className="container">
              <div className="justify-content-end row">
                <div className="col-lg-1"></div>
                <div className="col-lg-3 text-center work_line">
                  <img
                    src="/Digi2limage/work_line2.png"
                    className="img-fluid d-none d-lg-block"
                  />
                  <div className="d-block d-lg-none text-center">
                    <img
                      src="/Digi2limage/work_line2.png"
                      className="img-fluid "
                    />
                  </div>
                </div>
                <div className="col-lg-3 order-lg-0 order-first">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 col-auto text-end">
                      <h1 className="poppins-SemiBold">6</h1>
                    </div>
                    <div className="col-lg-9 col-4 text-start">
                      <h5 className="mt-2 poppins-SemiBold" id="corporate24">
                        {" "}
                        Free Doorstep Pickup
                      </h5>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-auto order-first order-lg-last"
                  id="corporate25"
                >
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_6-2.png.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="works_section">
            <div className="container">
              <div className="justify-content-center row">
                <div className="col-lg-auto mt-lg-5 mt-3" id="corporate27">
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_7-4.png.webp"
                    alt=""
                  />
                </div>
                <div className="col-lg-3 order-lg-0 order-first">
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-auto text-end">
                      <h1 className="mt-2 poppins-SemiBold">7</h1>
                    </div>
                    <div className="col-lg-8 col-5 text-start">
                      <h5 className="mt-2 poppins-SemiBold" id="corporate26">
                        {" "}
                        Spot Payment To Customer
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto text-center work_line">
                  <img
                    src="/Digi2limage/work_line.png"
                    className="img-fluid d-none d-lg-block"
                  />
                  <div className="d-block d-lg-none text-center">
                    <img
                      src="/Digi2limage/work_line.png"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 mt-lg-5 works_section">
            <div className="container">
              <div className="justify-content-center row">
                <div className="col-lg-3 text-center work_line">
                  <img
                    src="/Digi2limage/work_line2.png"
                    className="img-fluid d-none d-lg-block"
                  />
                  <div className="d-block d-lg-none text-center">
                    <img
                      src="/Digi2limage/work_line2.png"
                      className="img-fluid "
                    />
                  </div>
                </div>
                <div className="col-lg-3 order-lg-0 order-first">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 col-auto text-end">
                      <h1 className="poppins-SemiBold">8</h1>
                    </div>
                    <div className="col-lg-9 col-5 text-start">
                      <h5 className="poppins-SemiBold" id="corporate28">
                        {" "}
                        Digi2L Submits Campaign Report
                      </h5>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-auto order-first order-lg-last"
                  id="corporate29"
                >
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_8.png.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="works_section">
            <div className="container">
              <div className="row text-center">
                <div className="col-lg-1"></div>
                <div className="col-lg-4 mt-2 mt-lg-5" id="corporate31">
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_9-2.png.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="">
          <div
            className="text-center pt-4 "
            style={{ backgroundColor: "#3C23B6", height: "250px" }}
          >
            <h1
              className="poppins-SemiBold main_heading lh-base text-white "
              id="corporate32"
            >
              How Can You Benefit From <br /> The Product Exchange Program?
            </h1>
          </div>
          <div
            className="container"
            style={{ transform: "translateY(-100px)" }}
          >
            <div className="row justify-content-center">
              <div className="col-lg-2 col-1 d-none d-md-block"></div>
              <div className="col-lg-11 col-11 pe-0">
                <div className="owl-slider123131 mt-4">
                  <Swiper2 />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="service_enterprise">
          <div className="enterprise_services enterprise_services p-0 pb-5">
            <div className="container">
              <div className="justify-content-center px-3 px-md-0 row">
                <div className="col-lg-6 mt-4 mt-lg-0 order-1 order-lg-0">
                  <h1
                    className="poppins-SemiBold main_heading"
                    id="corporate42"
                  >
                    {" "}
                    Enterprise Services Product Resell Program
                  </h1>
                  <p
                    className="lh-base mark-Medium para_first more mb-0"
                    id="corporate44"
                  >
                    Hotels, hospitality, and often big corporates need frequent
                    and mass product upgradation of their gadgets and appliances
                    for catering to premium clients. But more than often, they
                    are stuck with the disposal of used appliances and gadgets
                    as it involves major administrative procedures and may act
                    as a major road block for upgradation. Digi2L, India’s 1st
                    digital platform to sell used appliances, can now help you
                    facilitate mass disposal of your used gadgets for a value
                    that is best in the market. Digi2L Enterprise Service
                    Product Resell Program can provide an end-to-end execution
                    strategy including product quality inspection,
                    deinstallation, logistics, storage, value assessment and
                    even spot payment. All this without any cost overrun, so
                    that you can completely focus on the upgradation of your new
                    systems.
                  </p>
                </div>
                <div
                  className="col-lg-5 order-0 order-lg-1 text-center"
                  id="corporate43"
                >
                  <img
                    className="img-fluid"
                    src="/Digi2limage/p_resell-1.png.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how_works">
          <div className="wrapper_works">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h1 className="pt-5 poppins-SemiBold" id="corporate13">
                    {" "}
                    How It Works?
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="works_section">
            <div className="container">
              <div className="justify-content-start row">
                <div className="col-lg-auto mt-2 text-center" id="corporate15">
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_1-2.png.webp"
                    alt=""
                  />
                </div>
                <div className="col-lg-3 order-lg-0 order-first">
                  <div className="row justify-content-center">
                    <div className="col-lg-2 col-auto text-end">
                      <h1 className="poppins-SemiBold">1</h1>
                    </div>
                    <div className="col-lg-10 col-4 text-start">
                      <h5 className="mt-2 poppins-SemiBold" id="corporate14">
                        {" "}
                        Meeting With Digi2L Team
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 text-center work_line">
                  <img
                    src="/Digi2limage/work_line.png"
                    className="img-fluid d-none d-lg-block"
                  />
                  <div className="d-block d-lg-none text-center">
                    <img
                      src="/Digi2limage/work_line.png"
                      className="img-fluid "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="works_section">
            <div className="container">
              <div className="justify-content-end row">
                <div className="col-lg-3 text-center work_line">
                  <img
                    src="/Digi2limage/work_line2.png"
                    className="img-fluid d-none d-lg-block"
                  />
                  <div className="d-block d-lg-none text-center">
                    <img
                      src="/Digi2limage/work_line2.png"
                      className="img-fluid "
                    />
                  </div>
                </div>
                <div className="col-lg-3 order-lg-0 order-first">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 col-auto text-end">
                      <h1 className="poppins-SemiBold">2</h1>
                    </div>
                    <div className="col-lg-9 col-6 text-start">
                      <h5 className="poppins-SemiBold" id="corporate16">
                        Submits Execution Strategy
                      </h5>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-auto order-first order-lg-last text-center text-lg-end"
                  id="corporate17"
                >
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_2-1.png.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="works_section">
            <div className="container">
              <div className="justify-content-center row">
                <div
                  className="col-lg-auto mt-lg-5 mt-3 text-center"
                  id="corporate19"
                >
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_3-1.png.webp"
                    alt=""
                  />
                </div>
                <div className="col-lg-3 order-lg-0 order-first">
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-auto text-end">
                      <h1 className="mt-2 poppins-SemiBold">3</h1>
                    </div>
                    <div className="col-lg-8 col-5 text-start">
                      <h5 className="mt-2 poppins-SemiBold" id="corporate18">
                        {" "}
                        Quality Check & Assessment
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 text-center work_line">
                  <img
                    src="/Digi2limage/work_line.png"
                    className="img-fluid d-none d-lg-block"
                  />
                  <div className="d-block d-lg-none text-center">
                    <img
                      src="/Digi2limage/work_line.png"
                      className="img-fluid "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 mt-lg-5 works_section">
            <div className="container">
              <div className="justify-content-end row">
                <div className="col-lg-3 text-center work_line">
                  <img
                    src="/Digi2limage/work_line2.png"
                    className="img-fluid d-none d-lg-block"
                  />
                  <div className="d-block d-lg-none text-center">
                    <img
                      src="/Digi2limage/work_line2.png"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col-lg-3 order-lg-0 order-first">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 col-auto text-end">
                      <h1 className="poppins-SemiBold">4</h1>
                    </div>
                    <div className="col-lg-9 col-5 text-start">
                      <h5 className="poppins-SemiBold" id="corporate20">
                        Quote & Price Approval
                      </h5>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-auto mt-3 mt-lg-0 order-first order-lg-last"
                  id="corporate21"
                >
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_4-2.png.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="works_section">
            <div className="container">
              <div className="justify-content-center row">
                <div className="col-lg-auto mt-lg-5 mt-3" id="corporate23">
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_7-3.png.webp"
                    alt=""
                  />
                </div>
                <div className="col-lg-3 order-lg-0 order-first">
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-auto text-end">
                      <h1 className="mt-2 poppins-SemiBold">5</h1>
                    </div>
                    <div className="col-lg-8 col-5 text-start">
                      <h5 className="mt-2 poppins-SemiBold" id="corporate22">
                        {" "}
                        Deinstallation
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 text-center work_line">
                  <img
                    src="/Digi2limage/work_line.png"
                    className="img-fluid d-none d-lg-block"
                  />
                  <div className="d-block d-lg-none text-center">
                    <img
                      src="/Digi2limage/work_line.png"
                      className="img-fluid "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 mt-lg-5 works_section">
            <div className="container">
              <div className="justify-content-end row">
                <div className="col-lg-1"></div>
                <div className="col-lg-3 text-center work_line">
                  <img
                    src="/Digi2limage/work_line2.png"
                    className="img-fluid d-none d-lg-block"
                  />
                  <div className="d-block d-lg-none text-center">
                    <img
                      src="/Digi2limage/work_line2.png"
                      className="img-fluid "
                    />
                  </div>
                </div>
                <div className="col-lg-3 order-lg-0 order-first">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 col-auto text-end">
                      <h1 className="poppins-SemiBold">6</h1>
                    </div>
                    <div className="col-lg-9 col-4 text-start">
                      <h5 className="mt-2 poppins-SemiBold" id="corporate24">
                        {" "}
                        Payment & Settlement
                      </h5>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-auto order-first order-lg-last"
                  id="corporate25"
                >
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_6-2.png.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="works_section">
            <div className="container">
              <div className="justify-content-center row">
                <div className="col-lg-auto mt-lg-5 mt-3" id="corporate27">
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_7-4.png.webp"
                    alt=""
                  />
                </div>
                <div className="col-lg-3 order-lg-0 order-first">
                  <div className="row justify-content-center">
                    <div className="col-lg-4 col-auto text-end">
                      <h1 className="mt-2 poppins-SemiBold">7</h1>
                    </div>
                    <div className="col-lg-8 col-5 text-start">
                      <h5 className="mt-2 poppins-SemiBold" id="corporate26">
                        Free Doorstep Pickup
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-lg-auto text-center work_line">
                  <img
                    src="/Digi2limage/work_line.png"
                    className="img-fluid d-none d-lg-block"
                  />
                  <div className="d-block d-lg-none text-center">
                    <img
                      src="/Digi2limage/work_line.png"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 mt-lg-5 works_section">
            <div className="container">
              <div className="justify-content-center row">
                <div className="col-lg-3 text-center work_line">
                  <img
                    src="/Digi2limage/work_line2.png"
                    className="img-fluid d-none d-lg-block"
                  />
                  <div className="d-block d-lg-none text-center">
                    <img
                      src="/Digi2limage/work_line2.png"
                      className="img-fluid "
                    />
                  </div>
                </div>
                <div className="col-lg-3 order-lg-0 order-first">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 col-auto text-end">
                      <h1 className="poppins-SemiBold">8</h1>
                    </div>
                    <div className="col-lg-9 col-5 text-start">
                      <h5 className="poppins-SemiBold" id="corporate28">
                        {" "}
                        Digi2L Submits Campaign Report
                      </h5>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-auto order-first order-lg-last"
                  id="corporate29"
                >
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_8.png.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="works_section">
            <div className="container">
              <div className="row text-center">
                <div className="col-lg-1"></div>
                <div className="col-lg-4 mt-2 mt-lg-5" id="corporate31">
                  <img
                    className="img-fluid"
                    src="/Digi2limage/works_9-2.png.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="">
          <div
            className="text-center pt-4 "
            style={{ backgroundColor: "#3C23B6", height: "250px" }}
          >
            <h1
              className="poppins-SemiBold main_heading lh-base text-white "
              id="corporate32"
            >
              How Can You Benefit From <br /> The Product Resell Program?
            </h1>
          </div>
          <div
            className="container"
            style={{ transform: "translateY(-100px)" }}
          >
            <div className="row justify-content-center">
              <div className="col-lg-2 col-1 d-none d-md-block"></div>
              <div className="col-lg-11 col-11 pe-0">
                <div className="owl-slider123131 mt-4">
                  <BenefitFrom />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="frequentlyAsk_question mb-3">
          <FAQSection value="CorporateEnquiry" />
        </section>

        <section className="testimonial_section">
          <div className="home_testimonial section_bg pb-3">
            <div className="text-center">
              <h1
                className="text-capitalize poppins-Bold main_heading pt-5"
                id="corporate67"
              >
                Partners Experience
              </h1>
            </div>

            <div className="testimonial">
              <div className="container">
                <div className="testimonial__inner mb-4">
                  <Experiences value="Partners" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div
            id="projectFactsCoporeteEnquiry"
            class="py-5"
            style={{ backgroundColor: "#3C23B6" }}
          >
            <div class="fullWidth eight columns container ">
              <div class="justify-content-center m-3 row text-center">
                <div
                  class="col-lg-3 col-md-4 col-sm-12  jshover text-center"
                  data-number="50"
                  style={{ visibility: "visible" }}
                >
                  <div
                    class="p-3 m-lg-4 mx-1 my-3 rounded-20 text-white hover_effecta hoverCard"
                    style={{ border: "1px solid#ffffff49" }}
                  >
                    <div class="text-end overclass0"></div>
                    <div class="d-flex justify-content-md-center align-items-center poppins-SemiBold">
                      <p id="num1" class="fs-1">
                        <CountUp
                          duration={2.75}
                          separator=" "
                          decimal=","
                          end={100}
                        />
                      </p>
                      <p class="fs-2">+</p>
                    </div>

                    <p
                      class="poppins-Regular fs-6 text-lg-center text-start"
                      id="dealer17"
                    >
                      Cities In India
                    </p>
                  </div>
                </div>
                <div
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
                        <CountUp
                          duration={2.75}
                          separator=""
                          decimal=","
                          end={50000}
                        />
                      </p>
                      <p class="fs-2">+</p>
                    </div>

                    <p
                      class="poppins-Regular fs-6 text-lg-center text-start"
                      id="dealer18"
                    >
                      Happy Users
                    </p>
                  </div>
                </div>
                <div
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
                        <CountUp
                          duration={2.75}
                          separator=""
                          decimal=","
                          end={26000}
                        />
                      </p>
                      <p class="fs-2">+</p>
                    </div>
                    <p
                      class="poppins-Regular fs-6 text-lg-center text-start"
                      id="dealer19"
                    >
                      ABB Plans Sold
                    </p>
                  </div>
                </div>
                <div
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
                        <CountUp
                          duration={2.75}
                          separator=""
                          decimal=","
                          end={100}
                        />
                      </p>
                      <p class="fs-2">+</p>
                    </div>

                    <p
                      class="poppins-Regular fs-6 text-lg-center text-start"
                      id="dealer20"
                    >
                      Brands
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="our_partner py-5  overflow-hidden">
          <div className="text-center">
            <h1 className="text-capitalize poppins-SemiBold">Our Partners</h1>
          </div>

          <div className="testimonial">
            <div className="container">
              <Partner />
            </div>
          </div>
        </section>
        <section
          ref={ref}
          className="section_bg Become_partnetSection py-5"
          id="contactformewed442332"
        >
          <div className="text-center pb-5">
            <h1 className="text-capitalize poppins-Bold main_heading">
              Let's Partner Up
            </h1>
          </div>

          <LetsPartnerUp
            id="Corporate Enquiry"
            Api={PostApi.CorporateEnquiryFormApi}
          />
        </section>
      </div>
    </div>
  );

}
