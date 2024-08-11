import React, { useRef } from "react";

import Partner from "./Slider/Partner";
import Exchangeslider from "./Slider/Exchangeslider";
import Exchangesales from "./Slider/Exchangesales";
import UpdateSlider from "./Slider/UpdateSlider";
import LetsPartnerUp from "./AddComponenet/LetsPartnerUp";
import PostApi from "../WebService/PostApi";

function Exchange() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <title>Exchange - Digi2L</title>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-10 pt-2" id="breadlink">
            <nav className="demo2" aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item">Corporate Enquiry</li>
                <li className="breadcrumb-item active" aria-current="page">
                  Exchange
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
          className="wrapper_herobanner1  border-0 common-shadow blog_card_path FeaturedBlogsCard2  demo32223333"
          style={{
            backgroundImage: `url('/Digi2limage/hero_bg-new.png')`,
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
                  style={{ paddingTop: " 120px" }}
                >
                  Powering The Exchange <br></br> Ecosystem For Brands
                </h1>

                <div>
                  <button
                    onClick={handleClick}
                    className="btn btn-simple mt-3 fw-bold  mb-md-5"
                    style={{ color: "#a70fea" }}
                  >
                    Become Exchange Partner
                  </button>
                </div>
              </div>
              <div className="col-lg-6 d-none d-lg-block">
                <img
                  style={{ position: "absolute", height: "430px" }}
                  src="/Digi2limage/hero_img-newa.png"
                  className="img-fluid "
                  alt="Digi2l"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="smart_exchange" className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <h1>Smart Exchange: Empowering your Business Growth</h1>
              <p>
                We understand that upgrading to a new appliance can be an
                exciting time for customers. However, we also recognize the
                challenges that arise when it comes to handling the exchange of
                old appliances. Digi2L’s streamlined process makes the exchange
                process easy and hassle-free. It also gives your brand an edge
                to provide an end-to-end customer support and build customer
                relationship.
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-12 col-sm-12 order-first order-md-last mx-auto text-center">
              <img
                src="/Digi2limage/1.png"
                className="img-fluid"
                style={{ width: "444px" }}
                alt="Digi2l"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-5">
        <div className="text-center">
          <h1 className="text-capitalize poppins-SemiBold">Our Partners</h1>
        </div>

        <div className="">
          <div className="container">
            <Partner />
          </div>
        </div>
      </section>

      <section className=" d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 ">
              <div className="owl-slider">
                <Exchangeslider />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <div
          className="text-center pt-md-5 pb-md-4 pb-4"
          style={{ backgroundColor: `#3C23B6`, height: `296px` }}
        >
          <h1 className="poppins-SemiBold main_heading lh-base text-white text-center">
            Elevate Your Brand with Digi2L <br />
            Exchange Plan{" "}
          </h1>
        </div>
        <div
          className="container-xxl pe-0"
          style={{ transform: `translateY(-100px)` }}
        >
          <div className="row justify-content-center">
            <div className="col-lg-11 col-11 pe-0">
              <div className="owl-slider">
                <Exchangesales />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="bottom_banner">
        <div
          className="wrapper_bottombanner d-none d-lg-block"
          style={{
            backgroundImage: `url(/Digi2limage/hero_bg.png)`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`,
            height: `450px`,
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-10 pt-5 mt-5">
                <h1 className='text-white'>
                  Level up your business! Partner with us now to provide your
                  customers a seamless exchange experience.
                </h1>
              </div>
              <div className="col-lg-6 mt-5 d-none d-lg-block">
                <img
                  style={{ position: `absolute`, height: `400px` }}
                  src="/Digi2limage/bottom_imge.png"
                  alt="Digi2l"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="d-lg-none position-relative">
          <img
            src="/Digi2limage/mobile_bottome.png"
            style={{ width: `100%` }}
            alt=""
            className="img-fluid"
          />
          <div className="position-absolute" style={{ top: `65%` }}>
            <h3 className="text-capitalize lh-base text-white poppins-Bold text-center">
              Embrace our transformative approach. Build a better world
              together.
            </h3>
          </div>
        </div>
      </section>

      <section>
        <div
          className="text-center pt-md-5"
          style={{ backgroundColor: `#3C23B6`, height: `296px` }}
        >
          <h1 className="poppins-SemiBold main_heading lh-base text-white text-center">
            Discover Our Featured News Articles:
            <br />
            Stay Updated!!
          </h1>
        </div>

        <div className="container" style={{ transform: "translateY(-100px)" }}>
          <div className="row justify-content-center">
            <div className="col-lg-2 col-1 d-none d-md-block"></div>
            <div className="col-lg-12 col-11 pe-0">
              <div className="owl-slider123131 mt-4">
                <UpdateSlider />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={ref}
        className="section_bg Become_partnetSection py-5 "
        id="contactform"
      >
        <div className="text-center pb-5">
          <h1 className="text-capitalize poppins-Bold ">Let's Partner Up</h1>
        </div>
        <LetsPartnerUp id="Exchange Enquiry" Api={PostApi.ExchangeFormApi} />
      </section>
    </>
  );
}

export default Exchange;
