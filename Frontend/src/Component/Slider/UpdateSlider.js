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
        <div id="exchange23333" className="owl-carouse2221">
          <OwlCarousel items={3} margin={20} autoplay={true} {...options}>
            <div className="item">
              <div
                className="card border-0 mb-3 demo233"
                style={{
                  borderRadius: `15px`,
                  minHeight: `275px`,
                  boxShadow: `0px 1px 20px 4px #00000021`,
                }}
              >
                <img src="/Digi2limage/ad_1.png" className="card-img" />
              </div>
            </div>
            <div className="item">
              <div
                className="card border-0 mb-3 demo233"
                style={{
                  borderRadius: `15px`,
                  minHeight: `275px`,
                  boxShadow: `0px 1px 20px 4px #00000021`,
                }}
              >
                <img src="/Digi2limage/ad_2.png" className="card-img-top" />
              </div>
            </div>
            <div className="item">
              <div
                className="card border-0 mb-3 demo233"
                style={{
                  borderRadius: `15px`,
                  minHeight: `275px`,
                  boxShadow: `0px 1px 20px 4px #00000021`,
                }}
              >
                <img src="/Digi2limage/ad_3.png" className="card-img-top" />
              </div>
            </div>
            <div className="item">
              <div
                className="card border-0 mb-3 demo233"
                style={{
                  borderRadius: `15px`,
                  minHeight: `275px`,
                  boxShadow: `0px 1px 20px 4px #00000021`,
                }}
              >
                <img src="/Digi2limage/ad_4.png" className="card-img-top" />
              </div>
            </div>
            <div className="item">
              <div
                className="card border-0 mb-3 demo233"
                style={{
                  borderRadius: `15px`,
                  minHeight: `275px`,
                  boxShadow: `0px 1px 20px 4px #00000021`,
                }}
              >
                <img src="/Digi2limage/ad_5.png" className="card-img-top" />
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>
    );
  }
}

export default OwlDemo;
