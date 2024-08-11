import React, { Component } from "react";
import Slider from "react-slick";

export default class Voucher extends Component {
  render() {
    const settings = {
      autoplay: true,
      autoplaySpeed: 1000,
      speed: 700,
      draggable: true,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div>
        <div id="programpartnership2565" className="owl-carousel6555556 ">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <Slider {...settings}>
                <div className=" item ">
                  <img
                    src="/Digi2limage/slider1.png"
                    className="card-img-top"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="item">
                  <img
                    src="/Digi2limage/slider2.png"
                    className="card-img-top"
                    style={{ width: "100%" }}
                  />
                </div>

                <div className=" item ">
                  <img
                    src="/Digi2limage/slider1.png"
                    className="card-img-top"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="item">
                  <img
                    src="/Digi2limage/slider2.png"
                    className="card-img-top"
                    style={{ width: "100%" }}
                  />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
