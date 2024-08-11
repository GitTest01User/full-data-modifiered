import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import { useNavigate } from "react-router-dom";
import Get from "../../WebService/Fuction/Get";
import APi from "../../WebService/APi";

export default function Exchangeslider() {
  var navigator = useNavigate();

  var [cards, SetCards] = useState([]);

  var menu = async () => {
    try {
      Get(APi.HeaderMenuGetApi)
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log("Error fetching user role:", error);
  };

  const processGetLink = (dataBase) => {
   
    if (dataBase.Status) {
      SetCards(dataBase.result);
    } else {
      SetCards(dataBase.result);
    }
  };

  useEffect(() => {
    menu();
  }, []);

  const exchangeVideoNavigator = (value) => {
    cards.forEach((obj) => {
      if (obj.MenuKey === "Exchange_With_Digi2L") {
        const title = obj.tblBrowserRouters.BrowserRouterPermaLink;
        navigator(`${title}video?Id=${value}`);
      }
    });
  };

  const settings = {
    // autoplay: true,
    // autoplaySpeed: 220,
    speed: 700,
    draggable: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
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
      <div id="exchange31" className="owl-carousel1 ">
        <Slider {...settings}>
          <div className="item">
            <div className="card border-0 mb-3">
              <div className="row no-gutters">
                <div className="col-md-4 p-3">
                  <a
                    href="javascript:void(0)"
                    className="wplightbox"
                    id="scan43434"
                  >
                    <div
                      className=" lightboxContainer w-100"
                      onClick={() => exchangeVideoNavigator(1)}
                    >
                      <img
                        src="/Digi2limage/scan.gif"
                        style={{ borderRadius: `30px` }}
                        className="card-img"
                        alt="scan"
                      />
                    </div>
                  </a>
                </div>
                <div className="col-md-8 order-first order-md-last mx-auto p-3">
                  <div className="card-body">
                    <h1 className="poppins-SemiBold text-capitalize pb-3">
                      Seamless Appliance Exchange with QR Code: Scan it! Fill
                      it! Exchange it!
                    </h1>
                    <p
                      style={{
                        color: `#555`,
                        fontFamily: `Poppins`,
                        fontSize: `18px`,
                        fontStyle: `normal`,
                        fontWeight: `500`,
                        lineHeight: `250.15%`,
                      }}
                    >
                      For brands promoting our exchange programs on their
                      websites or online portals, integration can be done via
                      API. Digi2L has partnered with renowned brands like
                      Samsung, Panasonic and Whirlpool, offering customers the
                      option to exchange their appliances at the time of new
                      appliance purchase. Customers can select the product
                      condition and receive a price quote from Digi2L.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="card border-0 mb-3">
              <div className="row no-gutters">
                <div className="col-md-4 p-3">
                  <a
                    href="javascript:void(0)"
                    className="wplightbox"
                    id="api34343"
                  >
                    <div
                      className="lightboxContainer w-100"
                      onClick={() => exchangeVideoNavigator(2)}
                    >
                      <img
                        src="/Digi2limage/api.gif"
                        style={{ borderRadius: `30px` }}
                        className="card-img"
                        alt="..."
                      />
                    </div>
                  </a>
                </div>
                <div className="col-md-8 order-first order-md-last mx-auto p-3">
                  <div className="card-body">
                    <h1 className="poppins-SemiBold main_heading text-capitalize  order-sm-1">
                      Seamless Brand Website Integration: Boost Sales with
                      Digi2L's Exchange API!
                    </h1>
                    <p
                      style={{
                        color: `#555`,
                        fontFamily: `Poppins`,
                        fontSize: `18px`,
                        fontStyle: `normal`,
                        fontWeight: `500`,
                        lineHeight: `250.15%`,
                      }}
                    >
                      For brands promoting our exchange programs on their
                      websites or online portals, integration can be done via
                      API. Digi2L has partnered with renowned brands like
                      Samsung, Panasonic and Whirlpool, offering customers the
                      option to exchange their appliances at the time of new
                      appliance purchase. Customers can select the product
                      condition and receive a price quote from Digi2L.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="card border-0 mb-3">
              <div className="row no-gutters">
                <div className="col-md-4 p-3">
                  <a
                    href="javascript:void(0)"
                    className="wplightbox"
                    id="api434344"
                  >
                    <div
                      className="lightboxContainer w-100"
                      onClick={() => exchangeVideoNavigator(3)}
                    >
                      <img
                        src="/Digi2limage/pos.gif"
                        style={{ borderRadius: `30px` }}
                        className="card-img"
                        alt="..."
                      />
                    </div>
                  </a>
                </div>

                <div className="col-md-8 order-first order-md-last mx-auto p-3">
                  <div className="card-body">
                    <h1 className="poppins-SemiBold main_heading text-capitalize  order-sm-1">
                      Seamless Brand Website Integration: Boost Sales with
                      Digi2L's Exchange API!
                    </h1>
                    <p
                      style={{
                        color: `#555`,
                        fontFamily: `Poppins`,
                        fontSize: `18px`,
                        fontStyle: `normal`,
                        fontWeight: `500`,
                        lineHeight: `250.15%`,
                      }}
                    >
                      For brands promoting our exchange programs on their
                      websites or online portals, integration can be done via
                      API. Digi2L has partnered with renowned brands like
                      Samsung, Panasonic and Whirlpool, offering customers the
                      option to exchange their appliances at the time of new
                      appliance purchase. Customers can select the product
                      condition and receive a price quote from Digi2L.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
