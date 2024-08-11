import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APi from "../WebService/APi";

import Get from "../WebService/Fuction/Get";

export default function HeroSlider() {
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

  return (
    <section className="hero_section overflow-hidden d-none d-lg-block">
      <div
        id="carouselExampleCaptions"
        className="carousel slide position-relative"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {[
            {
              backgroundImage: "/Digi2limage/slide1/img1.png",
              heading:
                "India's First Digital Platform To Sell Used Appliances!",
              buttonText: "Sell your old appliances now",
              imgSrc: "/Digi2limage/uploads/2023/04/8.png.webp",
              imgId: "home105-img",
              headingId: "home104",
              buttonId: "home105",
              styleClass: "active",
            },
            {
              backgroundImage: "/Digi2limage/img1.png",
              heading: "Sell Your Second-Hand Appliances In Seconds!",
              description:
                "India's 1st Digital Platform To Sell Used Appliances!",
              buttonText: "Best Price Guaranteed",
              imgSrc: "/Digi2limage/uploads/2022/12/img2-3.png.webp",
              imgId: "home108-img",
              headingId: "home106",
              descriptionId: "home107",
              buttonId: "home108",
            },
            {
              backgroundImage: "/Digi2limage/slide3/img1.png",
              heading: "Customer Ready! Price Ready! Payment Ready!",
              description:
                "India's 1st Digital Platform To Sell Used Appliances!",
              buttonText: "Smart Sell Instant Payment",
              imgSrc: "/Digi2limage/uploads/2022/12/img2-2.png.webp",
              imgId: "home110-img",
              headingId: "home1081",
              descriptionId: "home109",
              buttonId: "home110",
            },
            {
              backgroundImage: "/Digi2limage/slide4/img1.png",
              heading: "No Jhanjhat, No Bak Bak <br /> Just Sell!",
              description:
                "India's 1st Digital Platform To Sell Used Appliances!",
              buttonText: "Get Doorstep pickup of old appliance",
              imgSrc: "/Digi2limage/uploads/2022/12/img2-1.png.webp",
              imgId: "home113-img",
              headingId: "home110-heading",
              descriptionId: "home112",
              buttonId: "home113",
            },
            {
              backgroundImage: "/Digi2limage/slide5/img1.png",
              heading: "Say Goodbye To Unwanted Calls And Messages",
              description: "Decide Your Next Move.",
              buttonText: "Smart Sell Now",
              imgSrc: "/Digi2limage/uploads/2023/04/9.png.webp",
              imgId: "home113-5-img",
              headingId: "home110-5-heading",
              descriptionId: "home112-5",
              buttonId: "home113-5",
            },
          ].map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${slide.styleClass || ""}`}
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="row align-items-center justify-content-center">
                <div className="col-lg-1"></div>
                <div className="col-10 col-lg-5 mt-2 mt-lg-5 pt-5 pt-lg-5">
                  <h1
                    className="text-capitalize lh-base text-white poppins-SemiBold"
                    id={slide.headingId}
                    dangerouslySetInnerHTML={{ __html: slide.heading }}
                  ></h1>
                  {slide.description && (
                    <p
                      className="text-white mark-Medium"
                      id={slide.descriptionId}
                    >
                      {slide.description}
                    </p>
                  )}
                  <button
                    onClick={() => RouteLink("Smart_Sell")}
                    className={`btn ${
                      index === 0
                        ? "btn-simple_1"
                        : index === 1
                        ? "btn-simple_3"
                        : index === 2
                        ? "btn-simple_3"
                        : index === 3
                        ? "btn-simple_4"
                        : "btn-simple_5"
                    } mt-3 poppins-Bold fw-bold`}
                    id={slide.buttonId}
                  >
                    {slide.buttonText}
                  </button>
                </div>
                <div className="col-10 col-lg-5 mt-lg-5" id={slide.imgId}>
                  <img
                    style={{
                      position: "absolute",
                      bottom: "0.5%",
                      right: "0.5%",
                    }}
                    src={slide.imgSrc}
                    className="img-fluid d-sm-block"
                    alt="slide"
                  />
                </div>
                <div className="col-lg-1"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
