import HowitWorks from "./Slider/HowItWorks";
import Beyond from "./Slider/Beyond";
import ResellProgram from "./Slider/ResellProgram";
import Partner from "./Slider/Partner";
import LetsPartnerUp from "./AddComponenet/LetsPartnerUp";
import { useRef } from "react";
import PostApi from "../WebService/PostApi";

export default function EnterpriseSales() {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <title>Enterprise Sales - Digi2L</title>
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-10 pt-2" id="breadlink">
            <nav className="demo2" aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item">Corporate Enquiry</li>
                <li className="breadcrumb-item active" aria-current="page">
                  Enterprise Sales
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-lg-6 mt-5 d-none d-lg-block"></div>
        </div>
      </div>

      <section id="hero_banner">
        <div
          className="wrapper_herobanner7  border-0 common-shadow blog_card_path FeaturedBlogsCard2  demo32223333"
          style={{
            backgroundImage: `url("/Digi2limage/hero_bg.png")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
          }}
        >
          <div className="container">
            <div className="row">
              <div id="exp" className="col-lg-6 col-10">
                <h1
                  className="text-capitalize lh-base text-white poppins-Bold text-start pt-md-5 mt-md-5"
                  style={{ paddingTop: "130px" }}
                >
                  Digi2L Enterprise Services-Product Exchange Program!
                </h1>
                <button
                  onClick={handleClick}
                  className="btn btn-simple mt-3 fw-bold  mb-md-5"
                  style={{ color: "#7127df!important;" }}
                >
                  Explore More
                </button>
              </div>
              <div className="col-lg-6 mt-5 d-none d-lg-block">
                <img
                  style={{ position: "absolute", height: "400px" }}
                  src="/Digi2limage/hero_img2424242.png"
                  className="img-fluid "
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="esp" className="mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <h1 className="poppins-SemiBold mt-4">
                Enterprise Services Product Exchange Program
              </h1>
              <p className="pclass">
                Upgrade hassle-free with us. Dispose of your used gadgets and
                appliances effortlessly at the best market value. Our end-to-end
                solution includes quality inspection, logistics, storage, and
                instant spot payment. Say goodbye to cost overruns and
                administrative hassles. Focus on upgrading your new systems with
                confidence.
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-12 col-sm-12 order-first order-md-last text-center">
              <img
                src="/Digi2limage/sec_1432223.png"
                className="img-fluid"
                style={{ width: "444px" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="hiw" className="mt-5">
        <div
          className="text-center pt-5"
          style={{ backgroundColor: "#3C23B6", height: "296px" }}
        >
          <h1 className="poppins-SemiBold lh-base text-white text-center">
            How It Works?
          </h1>
        </div>
        <div className="container" style={{ transform: "translateY(-140px)" }}>
          <div className="row justify-content-center">
            <div className="col-lg-2 col-1 d-none d-md-block"></div>
            <div className="col-lg-12 col-11 pe-0">
              <div className="owl-slider123131 mt-4">
                <HowitWorks />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="str" style={{ marginTop: "-90px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <h1 className="poppins-SemiBold mt-4">
                Streamline Your Product Exchange Program with Digi2L
              </h1>
              <p className="pclass">
                Unlock the full potential of your product exchange program with
                Digi2L. Managing a complex campaign in India's unorganized used
                appliances market can be challenging, with cost overruns,
                logistics hurdles, and the need for reseller scouting. We offer
                a seamless end-to-end solution that eliminates these obstacles.
                Experience a simplified product exchange program and unleash new
                possibilities for your business with Digi2L.
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-12 col-sm-12 order-first order-md-last text-center">
              <img
                src="/Digi2limage/sec_26.png"
                className="img-fluid"
                style={{ width: "444px" }}
              />
            </div>
          </div>
        </div>
      </section>
      <section id="howItWorks" className="how_it_work_section section_bg mt-5">
        <div className="container">
          <div className="text-center pt-5 pb-4">
            <h1 className="poppins-SemiBold lh-base text-capitalize">
              Beyond Boundaries: The <br /> Unstoppable Expansion of Digi2L!
            </h1>
          </div>
          <div className="row d-flex justify-content-center mx-auto pb-4">
            <div className="owl-slider">
              <Beyond />
            </div>
          </div>
        </div>
      </section>
      <section id="sbl" className="mt-5 mb-5" style={{ marginTop: "-90px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <h1 className="poppins-SemiBold mt-4">
                Simplify Bulk Liquidation with Digi2L
              </h1>
              <p className="pclass">
                Maximize liquidation with Digi2L as your trusted partner. Our
                advanced tech and streamlined operations ensure a seamless
                experience. Efficient warehouse management and an extensive
                reseller network facilitate smooth liquidation. Let us handle
                logistics while you focus on your core business. Partner with
                Digi2L to eliminate complexities and challenges associated with
                bulk liquidation. Experience hassle-free liquidation with
                Digi2L.
              </p>
            </div>
            <div className="col-lg-6 col-md-6 col-12 col-sm-12 order-first order-md-last text-center">
              <img
                src="/Digi2limage/sec_36.png"
                className="img-fluid"
                style={{ width: "444px" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="howItWorks" className="how_it_work_section section_bg mt-5">
        <div className="container">
          <div className="text-center pt-5">
            <h1 className="poppins-SemiBold lh-base text-capitalize">
              How Can You Benefit From
              <br />
              The Product Resell Program
            </h1>
          </div>
          <div className="row d-flex justify-content-center mx-auto pt-4 pb-5">
            <div className="owl-slider">
              <ResellProgram />
            </div>
          </div>
        </div>
      </section>

      <section id="bottom_banner mt-5 mb-5 pb-5 pt-5">
        <div
          className="wrapper_bottombanner d-none d-lg-block rocket-lazyload"
          style={{
            backgroundImage: `url("/Digi2limage/hero_bg.png")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "250px",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-1"></div>
              <div className="col-lg-5 col-10  mt-5">
                <h2 className="text-capitalize lh-base text-white poppins-Bold text-start mt-5">
                  Join us and explore endless opportunities.
                </h2>
              </div>
              <div className="col-lg-5 mt-5 d-none d-lg-block">
                <img
                  style={{ position: "absolute", height: "200px", left: "70%" }}
                  src="/Digi2limage/bottom_img5333.png"
                />
              </div>
              <div className="col-lg-1"></div>
            </div>
          </div>
        </div>

        <div className="d-lg-none position-relative">
          <img
            src="/Digi2limage/mobile_bottomes.png"
            style={{ width: "100%" }}
            alt=""
            className="img-fluid"
          />
          <div className="position-absolute" style={{ top: "75%" }}>
            <h3 className="text-capitalize lh-base text-white poppins-Bold text-center">
              Join us and explore endless opportunities.
            </h3>
          </div>
        </div>
      </section>
      <section className="our_partner pt-5 py-5">
        <div className="text-center">
          <h1
            style={{ color: "#070139;" }}
            className="text-capitalize poppins-Bold"
            id="about70"
          >
            {" "}
            Our Partners
          </h1>
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
        id="contactform"
      >
        <div className="text-center pb-5">
          <h1 className="text-capitalize poppins-Bold">Let's Partner Up</h1>
        </div>
        <LetsPartnerUp
          id="EnterpriseSales Enquiry"
          Api={PostApi.EnterpriseSalesFormApi}
        />
      </section>
    </div>
  );
}
