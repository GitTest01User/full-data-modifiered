import React from "react";

import Slider from "react-slick";

import APi from "../../WebService/APi";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Get from "../../WebService/Fuction/Get";

export default function Offers() {
  var [Offers, SetOffers] = useState([[]]);
  useEffect(() => {
    offers();
  }, []);

  var offers = async () => {
    try {
      Get(`${APi.OngoingOffersGetAPi}?OngoingOffersisActive=${true}`)
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
      SetOffers(dataBase.result);
    } else {
      SetOffers(dataBase.result);
    }
  };

 

  const settings = {
    autoplay: true,

    speed: 2000,
    draggable: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <div>
      <div className="testimonial">
        <div className="container">
          <div className="testimonial__inner">
            <div className="offers-slider">
              <Slider {...settings} className="mb-3 testimonial-slide-doted">
                {Offers.map((obj) => {
                  if (obj.OngoingOffersisActive == true) {
                    return (
                      <div
                        className="testimonial-slide py-0 position-relative"
                        style={{ padding: "40px 20px" }}
                      >
                        <div className="card border-0 offers_card">
                          <div className="row  pb-3 pt-3">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-4">
                              <img
                                className="  exciting_offers_img"
                                src={`${APi.BaseURL}/${
                                  obj.OngoingOffersImage
                                    ? obj.OngoingOffersImage
                                    : "placeholder-01-01 1.png"
                                }`}
                                width="300"
                                height="300"
                              />
                            </div>
                            <div className="col-lg-7 p-5 position-relative text-white">
                              <div className="px-xl-5">
                                <h2 className="poppins-Medium lh-base">
                                  {obj.OngoingOffersTitle}
                                </h2>
                              </div>
                              <div className="d-flex align-items-center px-xl-5 btn_section">
                                <Link
                                  to={obj.OngoingOffersLink}
                                  className="btn btn-simple px-3 poppins-Bold offer_btn"
                                  target="blank"
                                >
                                  Avail Offer
                                </Link>
                              </div>
                            </div>
                          </div>
                          <img
                            style={{
                              width: "100px",
                              position: "absolute",
                              top: "-30px",
                              right: "-18px",
                            }}
                            src="/Digi2limage/offer.png"
                            alt=""
                            className="existoffer_img"
                          />
                          <img
                            style={{
                              width: "420px",
                              position: "absolute",
                              bottom: "-282px",
                              right: "-141px",
                              opacity: "0.3",
                            }}
                            src="/Digi2limage/offerBg.png"
                            alt=""
                            className="offer_img"
                          />
                        </div>
                      </div>
                    );
                  }
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
