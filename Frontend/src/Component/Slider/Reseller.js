import React, {  useEffect, useState } from "react";
import Slider from "react-slick";
import WebService from "../../WebService/WebService";
import APi from "../../WebService/APi";
import Get from "../../WebService/Fuction/Get";

export default function Reseller() {
  var [seller, setSeller] = useState([]);
  const settings = {
    speed: 700,
    draggable: true,
    infinite: true,
    slidesToShow: 2,
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
      setSeller(dataBase.result);
    } else {
      setSeller(dataBase.result);
    }
  };

  var testimonialReseller = async () => {
    try {
      Get(
        `${
          APi.CustomerReviewsGetApi
        }?TestimanialisActive=${true}&RoleTestimanial=${"Reseller"}`
      )
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }

    
  };

  useEffect(() => {
    testimonialReseller();
  }, []);
  return (
    <div>
      {" "}
      <div>
        <div className="testimonial__inner11 mb-4">
          <div className="testimonial-slider11">
            <Slider {...settings}>
              {seller.map((obj, index) => {
                if (
                  obj.TestimanialisActive == true &&
                  obj.TestimanialisActive != null
                ) {
                  return (
                    <>
                      <div className="testimonial-slide position-relative">
                        <img
                          className="img-fluid"
                          src="/Digi2limage/quote-2.svg"
                          alt=""
                          style={{ position: "absolute", top: "-11px" }}
                        />
                        <div className="testimonial_box">
                          <div className="testimonial_box-top">
                            <div className="testimonial_box-text pt-3">
                              <p className="mark-Medium">
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: obj.TestimonialDescription,
                                  }}
                                />
                              </p>
                            </div>
                            <div className="testimonial_box-img">
                              <img
                                src={`${APi.BaseURL}/${
                                  obj.TestimonialImage
                                    ? obj.TestimonialImage
                                    : "placeholder-01-01 1.png"
                                }`}
                                alt={obj.TestimonialFeaturedImageAlt}
                              />
                            </div>

                            <div className="">
                              <p
                                className="mark-Medium common_blue"
                                style={{ fontSize: "13px" }}
                              >
                                <span>
                                  {obj.TestimonialName} - {obj.CompanyName}{" "}
                                </span>{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                        <img
                          className="img-fluid"
                          src="/Digi2limage/quote-1.svg"
                          alt=""
                          style={{
                            position: "absolute",
                            bottom: "-11px",
                            right: "0px",
                            zIndex: "-1",
                          }}
                        />
                      </div>
                    </>
                  );
                }
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
