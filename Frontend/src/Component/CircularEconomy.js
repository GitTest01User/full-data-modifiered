import React, { useRef } from "react";

import Revolutionizing from "./Slider/Revolutionizing";
import Goals from "./Slider/Goals";
import Green from "./Slider/Green";
import LetsPartnerUp from "./AddComponenet/LetsPartnerUp";
import PostApi from "../WebService/PostApi";

function CorporateEnquiry() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <title>Circular Economy - Digi2L</title>
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-10 pt-2" id="breadlink">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item">Corporate Enquiry</li>
                <li className="breadcrumb-item active" aria-current="page">
                  Circular Economy
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
          className="wrapper_herobanner6  border-0 common-shadow blog_card_path FeaturedBlogsCard2  demo32223333"
          style={{
            backgroundImage: `url("/Digi2limage/hero_bgssss.png")`,
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
                  Foster Brand Expansion <br></br>While Reducing Carbon<br></br>{" "}
                  Footprint
                </h1>

                <div>
                  <button
                    onClick={handleClick}
                    style={{ color: "#7127df" }}
                    className="btn btn-simple mt-3 fw-bold  mb-md-5"
                  >
                    Join Us Now
                  </button>
                </div>
              </div>
              <div className="col-lg-6 d-none d-lg-block text-center">
                <img
                  src="/Digi2limage/hero_imgqwe.png"
                  className="img-fluid detaimg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="circular_economy_1 container py-3 my-3">
        <div className="justify-content-center px-3 px-md-0 row">
          <div className="col-lg-6 mt-4 mt-lg-0 order-1 order-lg-0">
            <h1 className="poppins-SemiBold px-0">
              Introducing Digi2L's Green Exchange Program
            </h1>
            <p className="pclass">
              In the modern era, businesses increasingly acknowledge the need to
              adopt the circular economy for environmental benefits. At Digi2L,
              we embrace the circular economy and proudly introduce our Green
              Exchange program. By adhering to MOEF guidelines and utilizing
              Green Certificates, our Green Exchange program actively combats
              e-waste pollution and promotes environmental sustainability.
              Through "Reduce, Reuse, and Recycle," brands make environmental
              contributions while boosting their bottom line.
            </p>
          </div>
          <div
            className="col-lg-6 col-md-5 order-lg-last order-xl-last order-md-last order-first"
            id="corporate12"
          >
            <img
              className="img-fluid"
              src="/Digi2limage/exchange1222.png"
              alt=""
            />
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
            Revolutionizing E-waste <br /> Management:
          </h1>
        </div>
        <div className="container" style={{ transform: "translateY(-100px)" }}>
          <div className="row justify-content-center">
            <div className="col-lg-2 col-1 d-none d-md-block"></div>
            <div className="col-lg-12 col-11 pe-0">
              <div className="owl-slider123131 mt-4">
                <Revolutionizing />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section id="revo">
        <div
          className="text-center pt-4"
          style={{ backgroundColor: "#3C23B6", height: "250px" }}
        >
          <h1 className="poppins-SemiBold main_heading lh-base text-white text-center"></h1>
        </div>
        <div
          className="container-fluid"
          style={{ transform: "translateY(-80px)" }}
        >
          <div className="row justify-content-center">
            <div className="col-lg-2 col-1 d-none d-md-block"></div>
            <div className="col-lg-11 col-11 pe-0">
              <div className="owl-slider"></div>
            </div>
          </div>
        </div>
      </section> */}

      <section id="Sustainability_Goals" className="section_bg">
        <div className="text-center py-5">
          <h1 className="poppins-SemiBold main_heading text-capitalize lh-base text-dark px-3">
            Achieve Your Sustainability <br /> Goals
          </h1>

          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-2 col-1 d-none d-md-block"></div>
              <div className="col-lg-12 col-11 pe-0">
                <div className="owl-slider123131 mt-4">
                  <Goals />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="green_exchange">
        <div
          className="text-center pt-4"
          style={{ backgroundColor: "#3C23B6", height: "250px" }}
        >
          <h1 className="poppins-SemiBold main_heading lh-base text-white text-center">
            Digi2L Green Exchange Program: <br />
            Maximizing Sustainability
          </h1>
        </div>

        <div className="container" style={{ transform: "translateY(-100px)" }}>
          <div className="row justify-content-center">
            <div className="col-lg-2 col-1 d-none d-md-block"></div>
            <div className="col-11 col-lg-12 pe-0 pt-4">
              <div className="owl-slider123131 mt-4">
                <Green />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="bottom_banner2">
        <div
          className="wrapper_bottombanner2 d-none d-lg-block "
          style={{
            backgroundImage: `url("/Digi2limage/bg.png")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "750px",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-1"></div>
              <div className="col-lg-5 col-10 pt-5 mt-5"></div>
              <div className="col-lg-5 mt-5 d-none d-lg-block align-items-center justify-content-between mt-5">
                <img
                  style={{ position: "absolute", height: "500px", left: "35%" }}
                  src="/Digi2limage/bg_bg.png"
                />
              </div>
              <div className="col-lg-1"></div>
            </div>
          </div>
        </div>
        <div className="d-lg-none position-relative ">
          <img
            src="/Digi2limage/mobile_bg_bg.png"
            style={{ width: "100%" }}
            alt=""
            className="img-fluid"
          />
        </div>
      </section>

      <section id="bottom_banner">
        <div
          className="wrapper_bottombanner d-none d-lg-block"
          style={{
            backgroundImage: `url("/Digi2limage/bottom_bg43434.png")`,
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
                  Join us in embracing this transformative approach and
                  together,let's build a better world for generations to come.
                </h2>
              </div>
              <div className="col-lg-5 mt-5 d-none d-lg-block">
                <img
                  style={{ position: "absolute", height: "400", left: "60%" }}
                  src="/Digi2limage/bottom_img233323.png"
                />
              </div>
              <div className="col-lg-1"></div>
            </div>
          </div>
        </div>
        <div className="d-lg-none position-relative">
          <img
            src="/Digi2limage/mobile_bottom.png"
            style={{ width: "100%" }}
            alt=""
            className="img-fluid"
          />
          <div className="position-absolute" style={{ top: "60%" }}>
            <h3 className="text-capitalize lh-base text-white poppins-Bold text-center">
              Join us in embracing this transformative approach and
              together,let's build a better world for generations to come.
            </h3>
          </div>
        </div>
      </section>

      <section
        className="section_bg Become_partnetSection py-5"
        id="dealercontact"
        ref={ref}
      >
        <div className="text-center pb-5">
          <h1
            className="text-capitalize poppins-Bold main_heading"
            id="dealer20"
          >
            Register To Become A Reseller
          </h1>
        </div>
        <LetsPartnerUp
          id="Circular Economy Enquiry"
          Api={PostApi.CircularEconomyFormApi}
        />
      </section>
    </>
  );
}

export default CorporateEnquiry;
