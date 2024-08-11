import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import WebService from "../../WebService/WebService";
import APi from "../../WebService/APi";
import Get from "../../WebService/Fuction/Get";

export default function Success() {
  var [Stories, SetStories] = useState([]);

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
      SetStories(dataBase.result);
    } else {
      SetStories(dataBase.result);
    }
  };
  var stories = async () => {
    try {
      Get(`${APi.StoriesGetApi}?StoriesisActive=${true}`)
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const settings = {
    autoplay: true,
    // autoplaySpeed: 1000,
    speed: 700,
    draggable: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
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
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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
  useEffect(() => {
    stories();
  }, []);

  return (
    <div>
      <div id="circulareconomy25454" className="owl-carousel54545 ">
        <Slider {...settings}>
          {Stories.map((obj) => {
            if (obj.StoriesisActive == true) {
              return (
                <div className="item">
                  <div className=" card demo434 demo4444444">
                    <div className="card-body text-center">
                      <img
                        src={`${APi.BaseURL}/${
                          obj.StoriesImage
                            ? obj.StoriesImage
                            : "placeholder-01-01 1.png"
                        }`}
                        className="card-img-top  w-auto m-auto"
                        alt={obj.StoriesFeaturedImageAlt}
                        height={93}
                      />
                    </div>
                    <div className="card-footer11">
                      <Link
                        to={`/success-stories/${obj.StoriesPermalink}/`}
                        style={{ position: "relative", zIndex: "999" }}
                      >
                        <h3 className="font_family fw-normal text-center">
                          Know More
                        </h3>{" "}
                      </Link>
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
