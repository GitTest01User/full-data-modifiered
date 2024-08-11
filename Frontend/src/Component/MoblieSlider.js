import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import APi from "../WebService/APi";

import Get from "../WebService/Fuction/Get";

const MoblieSlider = () => {
  var [cards, SetCards] = useState([]);
 

  var navigate = useNavigate();
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
      SetCards(result.result);
    } else {
      navigator("*");
    }
  };

 
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

  useEffect(() => {
    menu();
  }, []);

  const RouteLink = (obj1) => {
    if (obj1) {
      cards.forEach((obj) => {
        if (obj.MenuKey === obj1) {
          const title = obj.tblBrowserRouters.BrowserRouterPermaLink;
          navigate(title);
        }
      });
    }
  };

  const slides = [
    {
      bgImage: "/Digi2limage/slide1/img1.png",
      title: "India's First Digital Platform To Sell Used Appliances!",
      subtitle: "India's First Digital Platform To Sell Used Appliances!",
      buttonText: "Sell Now",
      buttonLink: "Smart_Sell",
      buttonColor: "orange",
      fontSize: "10px",
      imgSrc: "/Digi2limage/uploads/2023/04/8.png.webp",
    },
    {
      bgImage: "/Digi2limage/img1.png",
      title: "Sell Your Second-Hand Appliances In Seconds!",
      subtitle: "India's 1st Digital Platform To Sell Used Appliances!",
      buttonText: "Sell Now",
      buttonLink: "Smart_Sell",
      buttonColor: "#a70fea",
      imgSrc: "/Digi2limage/img2.png",
    },
    
  ];

  return (
    <section className="hero_section d-lg-none d-block">
      <Carousel>
        {slides.map((slide, index) => (
          <Carousel.Item
            key={index}
            style={{
              backgroundImage: `url(${slide.bgImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="align-items-center justify-content-center pt-4 px-3 px-4 row">
              
              <div className="col-6">
                <h6
                  style={{ fontSize: "12px !important" }}
                  className="text-capitalize lh-base text-white poppins-SemiBold"
                >
                  {slide.title}
                </h6>
                <p
                  style={{ fontSize: "10px !important" }}
                  className="text-white "
                >
                  {slide.subtitle}
                </p>
                <button
                  onClick={() => RouteLink(slide.buttonLink)}
                  className="btn btn-simple_4 poppins-Bold fw-bold"
                  style={{
                    fontSize: "10px  !important",
                    padding: "6px !important",
                    borderRadius: "5px",
                    width: "110px",
                    textAlign: "center",
                    color: slide.buttonColor,
                  }}
                >
                  {slide.buttonText}
                </button>
              </div>
              <div className="col-5">
                <img
                  src={slide.imgSrc}
                  style={{
                    position: "absolute",
                    bottom: "0.5%",
                    right: "0.5%",
                    height: "66%",
                  }}
                  className="img-fluid "
                  alt={`slide-${index}`}
                />
              </div>
            
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default MoblieSlider;
