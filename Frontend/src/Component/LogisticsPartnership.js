import React, { useRef } from "react";
import LetsPartnerUp from "./AddComponenet/LetsPartnerUp";
import UnlockingBenefits from "./Slider/UnlockingBenefits";
import PostApi from "../WebService/PostApi";

export default function LogisticsPartnership() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <title>Logistics Partnership - Digi2L</title>
      <div>
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-10 pt-2" id="breadlink">
              <nav className="demo2" aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">Home</li>
                  <li className="breadcrumb-item">Corporate Enquiry</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Logistics Partnership
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
            className="wrapper_herobanner9  border-0 common-shadow blog_card_path FeaturedBlogsCard2  demo32223333"
            style={{
              backgroundImage: `url("/Digi2limage/hero_bgrerwr.png")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-10 mt-5">
                  <h1
                    className="text-capitalize lh-base text-white poppins-Bold text-start pt-md-5 mt-md-5"
                    style={{ fontSize: "40px" }}
                  >
                    Embrace the Future: <br></br> Join Digi2L as a Logistics
                    Partner
                  </h1>
                  <button
                    className="btn btn-simple mt-3 fw-bold  mb-md-5"
                    style={{ color: "#ff6937" }}
                    onClick={handleClick}
                  >
                    Become A Partner
                  </button>
                </div>
                <div className="col-lg-6 mt-5 d-none d-lg-block">
                  <img
                    style={{ position: "absolute", height: "350px" }}
                    src="/Digi2limage/hero_imgaaaff.png"
                    className="img-fluid "
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="par" className="mt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <h1 className="poppins-SemiBold main_heading">
                  Join the logistic revolution: Become a Digi2L partner
                </h1>
                <p className="pclass">
                  Welcome to Digi2L, where we greatly appreciate your interest
                  in becoming a logistics partner. We recognize and respect your
                  industry knowledge and unwavering commitment to providing
                  outstanding service to our valued customers. By joining forces
                  with us, you have the opportunity to be at the forefront of
                  revolutionizing the appliance exchange process and actively
                  contributing to the development of a sustainable future.
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-12 col-sm-12 order-first order-md-last text-center">
                <img
                  src="/Digi2limage/sec_142322323.png"
                  className="img-fluid"
                  style={{ width: "445px" }}
                />
              </div>
            </div>
          </div>
        </section>
        <section id="wk" className="mt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <h1 className="poppins-SemiBold main_heading">
                  How does it work?
                </h1>
                <p className="pclass">
                  As a logistics partner, you can visit the Digi2L website or
                  download our app to register yourself. Simply fill out the
                  provided form, and our team will guide you through the
                  process. Upon registration, you will receive a confirmation
                  email with further instructions. The app will serve as your
                  primary tool for managing customer pickups, scheduling, and
                  updates.
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-12 col-sm-12 order-first order-md-last text-center">
                <img
                  src="/Digi2limage/sec_243422423.png"
                  className="img-fluid"
                  style={{ width: "445px" }}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="sl" className="mt-5">
          <div
            className="text-center pt-5"
            style={{ backgroundColor: "#3C23B6", height: "296px" }}
          >
            <h1 className="lh-base p-1 poppins-SemiBold text-center text-white">
              Unlocking Benefits with Digi2L: Simplifying <br />
              and Enhancing Your Operations{" "}
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
                  <UnlockingBenefits />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="bottom_banner">
          <div
            className="wrapper_bottombanner d-none d-lg-block rocket-lazyload"
            style={{
              backgroundImage: `url("/Digi2limage/hero_bg422223234.png")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "450px",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-5 col-10 pt-5">
                  <h2 className="text-capitalize lh-base text-white poppins-Bold text-start mt-5">
                    {" "}
                    Join Digi2L as a logistics partner and redefine convenience,
                    sustainability, and customer satisfaction together!
                  </h2>
                </div>
                <div className="col-lg-5 mt-5 d-none d-lg-block">
                  <img
                    style={{ position: "absolute", height: "400px" }}
                    src="/Digi2limage/hero_img4232243234.png"
                  />
                </div>
                <div className="col-lg-1"></div>
              </div>
            </div>
          </div>

          <div className="d-lg-none position-relative">
            <img
              src="/Digi2limage/mobile_bottom424323423.png"
              style={{ width: "100%" }}
              alt=""
              className="img-fluid"
            />
            <div className="position-absolute" style={{ top: "60%" }}>
              <h3 className="text-capitalize lh-base text-white poppins-Bold text-center">
                Join Digi2L as a logistics partner and redefine convenience,
                sustainability, and customer satisfaction together!
              </h3>
            </div>
          </div>
        </section>
        <section
          ref={ref}
          className="section_bg Become_partnetSection py-5"
          id="contactform"
        >
          <div className="text-center pb-5">
            <h1 className="text-capitalize poppins-Bold ">Let's Partner Up</h1>
          </div>

          <LetsPartnerUp
            id="Logistics Partnership Enquiry"
            Api={PostApi.LogisticsPartnershipFormApi}
          />
        </section>
      </div>
    </div>
  );
}
