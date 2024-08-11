import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";

import APi from "../../WebService/APi";
import Get from "../../WebService/Fuction/Get";

export default function Life() {
  var [Life, setLife] = useState([]);

  useEffect(() => {
    life();
  });

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log("Error fetching user role:", error);
  };

  const processGetLink = (result) => {
    if (result.Status && result.result.length != 0) {
      setLife(result.result);
    } else {
      navigator("*");
    }
  };
  var life = async () => {
    try {
      Get(`${APi.LifeSliderGetAPi}?LifeSilderisActive=${true}`)
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const settings = {
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 700,
    draggable: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
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
      <div className="gallery-slider1">
        <Slider {...settings}>
          {Life.map((obj) => {
            if (obj.LifeSilderisActive == true) {
              return (
                <div className="testimonial-slide position-relative">
                  <div className="testimonial_box">
                    <div className="">
                      <div className="testimonial_box-text p-0">
                        <img
                          src={`${APi.BaseURL}/${obj.LifeSilderimage}`}
                          className="img-fluid mx-auto"
                          alt={obj.LifeSilderAlt}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </Slider>
      </div>
    </div>
  );
}
