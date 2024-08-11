import React, { useRef } from "react";
import ProgramSlider from "./Slider/ProgramSlider";
import Voucher from "./Slider/Voucher";
import LetsPartnerUp from "./AddComponenet/LetsPartnerUp";
import PostApi from "../WebService/PostApi";

export default function ProgramPartnership() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <title>Program Partnership - Digi2L</title>
      <div>
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-10 pt-2" id="breadlink">
              <nav className="demo2" aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">Home</li>
                  <li className="breadcrumb-item">Corporate Enquiry</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Program Partnership
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-lg-6 mt-5 d-none d-lg-block"></div>
          </div>
        </div>

        <section id="hero_banner">
          <div
            className="wrapper_herobanner8 border-0 common-shadow blog_card_path FeaturedBlogsCard2  demo32223333"
            style={{
              backgroundImage: `url("/Digi2limage/hero_bg.png")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-10 mt-5 mb-5 pb-3">
                  <h2 className="text-capitalize lh-base text-white poppins-Bold text-start pt-md-5 mt-md-5">
                    Digi2L to amass 20 lakh customers in 2023.{" "}
                  </h2>
                  <button
                    onClick={handleClick}
                    className="btn btn-simple mt-3 fw-bold  mb-md-5"
                    style={{ color: "#7127df !important" }}
                  >
                    Maximize your brand's reach with us!
                  </button>
                </div>
                <div className="col-lg-6 mt-5 pt-5 d-none d-lg-block">
                  <img
                    style={{ position: "absolute" }}
                    src="/Digi2limage/hero_img24323423443.png"
                    className="h-70"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="cob">
          <div className="container">
            <div className="row align-items-center justify-content-between p-md-5 p-lg-5">
              <div className="col-lg-6 col-md-6">
                <h1 className="poppins-SemiBold">
                  Co-Branding Program Partnership: Thrive & Excel{" "}
                </h1>
                <p className="pclass">
                  At Digi2L, we believe in fostering strong alliances with
                  brands to provide exceptional benefits to our customers.
                  Through our Program Partnership, brands can join hands with us
                  to offer exclusive vouchers and launch new products, expanding
                  their reach and promoting their brand to a wider audience. By
                  partnering with Digi2L, brands can unlock numerous advantages,
                  get hot/cold leads data and create a lasting impact in the
                  market.
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-12 col-sm-12 order-first order-md-last text-center pt-5 pb-5">
                <img
                  src="/Digi2limage/sec_1dwd.png"
                  className="img-fluid"
                  style={{ width: "444px" }}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="smart_buy section_bg pt-5 pb-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12 col-12">
                <div className="row justify-content-center">
                  <div className="owl-slider">
                    <ProgramSlider />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="dc" className="pt-5">
          <div className="container">
            <div className="row align-items-center  p-md-5 p-lg-5">
              <div className="col-lg-6 col-md-6 col-12 col-sm-12 p-3">
                <img
                  src="/Digi2limage/sec_2aaaadad.png"
                  className="img-fluid"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-lg-6 col-md-6 p-3">
                <h1 className="poppins-SemiBold">Boost Your D2C Marketplace</h1>
                <p className="pclass">
                  Seize the opportunity to sell new appliances directly to
                  customers who are in the market for selling their old
                  appliances. Promote your D2C marketplace and connect with a
                  highly targeted audience, maximizing your sales potential.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="colab">
          <div className="container">
            <div className="row align-items-center justify-content-between p-md-5 p-lg-5">
              <div className="col-lg-6 col-md-6 p-3">
                <h1 className="poppins-SemiBold">
                  Seamless Collaboration: Amplify Your Brand
                </h1>
                <p className="pclass">
                  Through our Program Partnership, we have alliances with
                  renowned brands like MyGate to offer enhanced services and
                  convenience. MyGate enables customers to sell old appliances
                  through their app, effortlessly obtaining the best price.
                  Simply register online for the best price and free pickup from
                  home.
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-12 col-sm-12 order-first order-md-last text-center p-3">
                <img
                  src="/Digi2limage/sec_353355334.png"
                  className="img-fluid"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </section>
        <section id="pl">
          <div className="container">
            <div className="row align-items-center  p-md-5 p-lg-5">
              <div className="col-lg-6 col-md-6 col-12 col-sm-12 p-3">
                <img
                  src="/Digi2limage/sec_4.png"
                  className="img-fluid"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-lg-6 col-md-6 p-3">
                <h1 className="poppins-SemiBold">
                  Product Launch: Unleash Your Brand's Potential
                </h1>
                <p className="pclass">
                  By teaming up with Digi2L, brands can introduce their offers
                  through vouchers distributed to our vast customer base. This
                  strategic collaboration ensures widespread promotion and
                  enables brands to reach a large audience, maximizing their
                  product's visibility and potential.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="emp">
          <div className="container">
            <div className="row align-items-center justify-content-between p-md-5 p-lg-5">
              <div className="col-lg-6 col-md-6">
                <h1 className="poppins-SemiBold">
                  Empower Employees: Simplify Appliance Sales
                </h1>
                <p className="pclass">
                  Under the D to C model, customers can conveniently sell their
                  old appliances by visiting the provided link and registering
                  directly on our website. This streamlined process eliminates
                  the need for intermediaries and allows customers to seamlessly
                  complete the selling transaction with ease and efficiency.
                  Allow your employees the comfort of selling by implementing a
                  feature on your HRMS system.
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-12 col-sm-12 order-first order-md-last text-center p-3">
                <img
                  src="/Digi2limage/sec_5.png"
                  className="img-fluid"
                  style={{ width: "445px" }}
                />
              </div>
            </div>
          </div>
        </section>
        <section id="voucher">
          <div
            className="text-center pt-4 pb-0"
            style={{ backgroundColor: "#3C23B6", height: "300px" }}
          >
            <div className="container">
              <h1 className="poppins-SemiBold lh-base text-white text-center">
                Voucher Delights <br />
                Elevate Customer Experiences
              </h1>
              <p className="ppclassd  text-center">
                As part of our Program Partnership, brands have the opportunity
                to provide their <br />
                customers with exciting voucher benefits.
              </p>
            </div>
          </div>
          <div
            className="container"
            style={{ transform: "translateY(-100px)" }}
          >
            <div className="row justify-content-center">
              <div className="col-lg-2 col-1 d-none d-md-block"></div>
              <div className="col-lg-12 col-11 pe-0">
                <div className="owl-slider123131 mt-4">
                  <Voucher />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="bottom_banner">
          <div
            className="wrapper_bottombanner d-none d-lg-block rocket-lazyload"
            style={{
              backgroundImage: `url("/Digi2limage/hero_bg.png")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "450px",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-5 col-10 pt-5 mt-5">
                  <h2 className="text-capitalize lh-base text-white poppins-Bold text-start mt-5">
                    Join for growth & success. Create a seamless experience that
                    rewards customers & promotes your brand.
                  </h2>
                </div>
                <div className="col-lg-5 mt-5 d-none d-lg-block">
                  <img
                    style={{ position: "absolute", height: "400px" }}
                    src="/Digi2limage/bottom_imgdd.png"
                  />
                </div>
                <div className="col-lg-1"></div>
              </div>
            </div>
          </div>

          <div className="d-lg-none position-relative">
            <img
              src="/Digi2limage/mobile_bottom32424234.png"
              style={{ top: "100%" }}
              alt=""
              className="img-fluid"
            />
            <div className="position-absolute" style={{ top: "65%" }}>
              <h3 className="text-capitalize lh-base text-white poppins-Bold text-center">
                Join for growth & success. Create a seamless experience that
                rewards customers & promotes your brand.
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
            id="Program Partnership Enquiry"
            Api={PostApi.ProgramPartnershipFormApi}
          />
        </section>
      </div>
    </div>
  );
}
