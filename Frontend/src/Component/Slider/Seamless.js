import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";
const options = {
  responsiveClass: true,
  nav: false,
  dots: false,
  autoplay: false,
  navText: ["Prev", "Next"],
  smartSpeed: 1000,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 1,
      dots: false,
      margin: 30,
    },
    600: {
      items: 2,
      dots: false,
    },
    700: {
      items: 3,
      dots: false,
    },
    1000: {
      items: 3,
      dots: false,
    },
  },
};

export class OwlDemo extends Component {
  render() {
    return (
      <div>
        <div id="abb2444" className="owl-carousel44444">
          <OwlCarousel items={3} margin={20} autoplay={true} {...options}>
            <div className="item">
              <div
                className="card border-0 mb-3 demo233"
                style={{
                  borderRadius: "15px",
                  minHeight: `400px`,
                  boxShadow: "0px 1px 20px 4px #00000021",
                }}
              >
                <img src="/Digi2limage/1_.png" className="card-img-top" />
                <div className="card-body mark-Medium pb-0">
                  <h4 className="poppins-SemiBold main_heading lh-base text-capitalize">
                    Simplify and Secure: <br /> ABB via QR Code:
                  </h4>
                  <p className="poppins-Regular text-black">
                    Scan the QR Code at the dealer store. Click on ABB plan and
                    secure your appliances return price at the time of purchase
                    itself.
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              <div
                className="card border-0 mb-3 demo233"
                style={{
                  borderRadius: "15px",
                  minHeight: `400px`,
                  boxShadow: "0px 1px 20px 4px #00000021",
                }}
              >
                <img src="/Digi2limage/2_.png" className="card-img-top" />
                <div className="card-body mark-Medium pb-0">
                  <h4 className="poppins-SemiBold main_heading lh-base text-capitalize">
                    ABB at Point Of Sale <br />
                    (POS) purchase:
                  </h4>
                  <p className="poppins-Regular text-black">
                    With Digi2L's Assured Buyback Plan, securing your
                    appliance's value is effortless, even at POS. Experience
                    peace of mind with protected investment and a seamless
                    process from purchase to upgrade.
                  </p>
                </div>
                <div className="card-footer border-0 p-0 bg-transparent"></div>
              </div>
            </div>
            <div className="item">
              <div
                className="card border-0 mb-3 demo233"
                style={{
                  borderRadius: "15px",
                  minHeight: `400px`,
                  boxShadow: "0px 1px 20px 4px #00000021",
                }}
              >
                <img src="/Digi2limage/3_.png" className="card-img-top" />
                <div className="card-body mark-Medium pb-0">
                  <h4 className="poppins-SemiBold main_heading lh-base text-capitalize">
                    Effortless Integration,
                    <br /> Assured Protection:{" "}
                  </h4>
                  <p className="poppins-Regular text-black">
                    Unlock potential with seamless API integration. Experience
                    secure, streamlined buyback protection. Simplify your
                    journey with Digi2L's ABB via API.
                  </p>
                </div>
                <div className="card-footer border-0 p-0 bg-transparent"></div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>
    );
  }
}

export default OwlDemo;
