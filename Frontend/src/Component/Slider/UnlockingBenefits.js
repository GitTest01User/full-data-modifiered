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
      items: 4,
      dots: true,
    },
  },
};

export class OwlDemo extends Component {
  render() {
    return (
      <div>
        <div id="circulareconomy14343" className="owl-carousel4343">
          <OwlCarousel items={3} margin={20} autoplay={true} {...options}>
            <div className="item">
              <div
                className="card border-0 mb-3 demo233"
                style={{
                  borderRadius: `15px`,
                  minHeight: `400px`,
                  boxShadow: `0px 1px 20px 4px #00000021`,
                }}
              >
                <img src="/Digi2limage/m.png" className="card-img-top" />
                <div className="card-body mark-Medium pb-0">
                  <h6 className="poppins-SemiBold main_heading lh-base text-capitalize">
                    Tech/App Integration:
                  </h6>
                  <p className="poppins text-black">
                    Our app simplifies logistics. Register, track orders, view
                    details, get real-time updates.
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              <div
                className="card border-0 mb-3 demo233"
                style={{
                  borderRadius: `15px`,
                  minHeight: `400px`,
                  boxShadow: `0px 1px 20px 4px #00000021`,
                }}
              >
                <img src="/Digi2limage/n.png" className="card-img-top" />
                <div className="card-body mark-Medium pb-0">
                  <h6 className="poppins-SemiBold main_heading lh-base text-capitalize">
                    Easy Onboarding:
                  </h6>
                  <p className="poppins text-black">
                    We prioritize a smooth onboarding process, ensuring that
                    logistics partners can start working with us seamlessly and
                    without any complications.
                  </p>
                </div>
                <div className="card-footer border-0 p-0 bg-transparent"></div>
              </div>
            </div>
            <div className="item">
              <div
                className="card border-0 mb-3 demo233"
                style={{
                  borderRadius: `15px`,
                  minHeight: `400px`,
                  boxShadow: `0px 1px 20px 4px #00000021`,
                }}
              >
                <img src="/Digi2limage/b.png" className="card-img-top" />
                <div className="card-body mark-Medium pb-0">
                  <h6 className="poppins-SemiBold main_heading lh-base text-capitalize">
                    Incentive Program:
                  </h6>
                  <p className="poppins text-black">
                    Earn more incentives by initiating more pickups and
                    delivering prompt service as our valued logistics partner.
                  </p>
                </div>
                <div className="card-footer border-0 p-0 bg-transparent"></div>
              </div>
            </div>
            <div className="item">
              <div
                className="card border-0 mb-3 demo233"
                style={{
                  borderRadius: `15px`,
                  minHeight: `400px`,
                  boxShadow: `0px 1px 20px 4px #00000021`,
                }}
              >
                <img src="/Digi2limage/v.png" className="card-img-top" />
                <div className="card-body mark-Medium pb-0">
                  <h6 className="poppins-SemiBold main_heading lh-base text-capitalize">
                    Registration Made Easy:
                  </h6>
                  <p className="poppins text-black">
                    Our registration process is quick and straightforward. Fill
                    in your details, and you'll be ready to enjoy the
                    streamlined process and associated benefits.
                  </p>
                </div>
                <div className="card-footer border-0 p-0 bg-transparent"></div>
              </div>
            </div>
            <div className="item">
              <div
                className="card border-0 mb-3 demo233"
                style={{
                  borderRadius: `15px`,
                  minHeight: `400px`,
                  boxShadow: `0px 1px 20px 4px #00000021`,
                }}
              >
                <img src="/Digi2limage/c.png" className="card-img-top" />
                <div className="card-body mark-Medium pb-0">
                  <h6 className="poppins-SemiBold main_heading lh-base text-capitalize">
                    PAN India Reach:
                  </h6>
                  <p className="poppins-Semibold">
                    Digi2L operates at scale, enabling high-volume pickups and
                    exchanges. Benefit from our PAN India coverage and vast
                    customer base.
                  </p>
                </div>
                <div className="card-footer border-0 p-0 bg-transparent"></div>
              </div>
            </div>
            <div className="item">
              <div
                className="card border-0 mb-3 demo233"
                style={{
                  borderRadius: `15px`,
                  minHeight: `400px`,
                  boxShadow: `0px 1px 20px 4px #00000021`,
                }}
              >
                <img src="/Digi2limage/x.png" className="card-img-top" />
                <div className="card-body mark-Medium pb-0">
                  <h6 className="poppins-SemiBold main_heading lh-base text-capitalize">
                    Security and Reliability:
                  </h6>
                  <p className="poppins text-black">
                    Our platform prioritizes security. Log in with phone number,
                    OTP, and two-factor authentication for data protection.
                  </p>
                </div>
                <div className="card-footer border-0 p-0 bg-transparent"></div>
              </div>
            </div>
            <div className="item">
              <div
                className="card border-0 mb-3 demo233"
                style={{
                  borderRadius: `15px`,
                  minHeight: `400px`,
                  boxShadow: `0px 1px 20px 4px #00000021`,
                }}
              >
                <img src="/Digi2limage/z.png" className="card-img-top" />
                <div className="card-body mark-Medium pb-0">
                  <h6 className="poppins-SemiBold main_heading lh-base text-capitalize">
                    Big Brands Partnership:
                  </h6>
                  <p className="poppins text-black">
                    Work with renowned brands endorsing our exchange program and
                    Assured buyback, boosting credibility and trust in your
                    services.
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
