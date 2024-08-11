import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Get from "../../WebService/Fuction/Get";
import APi from "../../WebService/APi";
import { useNavigate } from "react-router-dom";

export default function Trust() {
  var navigator=useNavigate()
  var [Trust, SetTrust] = useState([[]]);
  useEffect(() => {
    trust();
  }, []);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log("Error fetching user role:", error);
  };
  var trust = async () => {
    try {
      Get(
        `${
          APi.CustomerReviewsGetApi
        }?TestimanialisActive=${true}&RoleTestimanial=${"Customer"}`
      )
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const processGetLink = (result) => {
    if (result.Status && result.result.length != 0) {
      SetTrust(result.result);
    } else {
      navigator("*");
    }
  };

  const settings = {
    autoplay: true,
    autoplaySpeed: 1000,
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

  return (
    <div>
      <div className="testimonial__inner11 mb-5 mt-4">
        <div className="testimonial-slider11">
          <Slider {...settings}>
            {Trust.map((obj, index) => {
              if (
                obj.TestimanialisActive == true &&
                obj.TestimanialisActive != null
              ) {
                return (
                  <div
                    className="testimonial-slide position-relative mb-4"
                    key={index + 1}
                  >
                    <img
                      className="img-fluid"
                      src="/Digi2limage/themes/digi2l/assets/images/quote-2.svg"
                      alt=""
                      style={{ position: "absolute", top: "-11px" }}
                    />
                    <div
                      className="testimonial_box"
                      style={{
                        display: "flex",
                        padding: "0.5em",
                        marginRight: "1%",
                        marginTop: "20px",
                        marginBottom: "20",
                        height: "450px",
                      }}
                    >
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
                              -{obj.TestimonialName} - {obj.TestimonialAddress}{" "}
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <img
                      className="img-fluid"
                      src="/Digi2limage/themes/digi2l/assets/images/quote-1.svg"
                      alt=""
                      style={{
                        position: "absolute",
                        bottom: "-11px",
                        right: "0px",
                        zIndex: "-1",
                      }}
                    />
                  </div>
                );
              }
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}
