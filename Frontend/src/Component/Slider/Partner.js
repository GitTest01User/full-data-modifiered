import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import APi from "../../WebService/APi";
import Get from "../../WebService/Fuction/Get";
import { useNavigate } from "react-router-dom";

export default function Trust() {
 var navigator=useNavigate()
  var [Partner, SetPartner] = useState([[]]);
  useEffect(() => {
    partner();
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

  const processGetLink = (result) => {
    if (result.Status && result.result.length != 0) {
      SetPartner(result.result);
    } else {
      navigator("*");
    }
  };

  var partner = async () => {
    try {
      Get(`${APi.PartnerGetApi}?PartnerISActive=${true}`)
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const settings = {
    autoplay: true,

    speed: 700,
    draggable: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          autoplay: false,
        },
      },
    ],
  };

  return (
    <div>
      <div id="circulareconomy25454" className="owl-carousel54545">
        <Slider {...settings}>
          {Partner.map((obj) => {
            if (obj.PartnerISActive == true && obj.PartnerISActive != null) {
              return (
                <div className="item">
                  <div className="demo4444444">
                    <div className="p-2">
                      <img
                        style={{ maxWidth: "188px" }}
                        className="img-fluid p-lg-0"
                        src={`${APi.BaseURL}/${obj.PartnerImage}`}
                        alt={obj.PartnerAlt}
                      />
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
