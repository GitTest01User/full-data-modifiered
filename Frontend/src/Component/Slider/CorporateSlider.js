import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Carousel } from "react-bootstrap";
import Get from "../../WebService/Fuction/Get";
import APi from "../../WebService/APi";

export default function CorporateSlider() {
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
          {[0, 1, 2].map((index) => (
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
             

              backgroundImage: "/Digi2limage/img121313123.png",
              heading: "Digi2L Enterprise Services-Product Exchange Program!",
              description: "Now Run Your Product Exchange Campaign Seamlessly.",
              buttonText: "EXPLORE",
              imgSrc: "/Digi2limage/img2-7.png.webp",
              imgId: "home105-img",
              headingId: "home104",
              buttonId: "home105",
              styleClass: "active",
            },
           
            {
              backgroundImage: "/Digi2limage/img154353453.png",
              heading: "Digi2L Enterprise Services-Product Exchange Program!",
              description:
                " No More Productivity Loss, Logistics Nightmare, Reseller Scoutingor Cost Overrun.",
              buttonText:'EXPLORE',
              imgSrc: "/Digi2limage/img2-8.png.webp",
              imgId: "home108-img",
              headingId: "home106",
              descriptionId: "home107",
              buttonId: "home108",
            },
           
            {
              backgroundImage: "/Digi2limage/img154353453.png",
              heading: "Customer Ready! Price Ready! Payment Ready!",
              description:
              "No More Productivity Loss, Logistics Nightmare, Reseller Scouting or Cost Overrun.",
              buttonText: "EXPLORE",
              imgSrc: "/Digi2limage/img2-9.png.webp",
              imgId: "home110-img",
              headingId: "home1081",
              descriptionId: "home109",
              buttonId: "home110",
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

export const CorporateMoblieSlider = () => {
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
      bgImage: "/Digi2limage/img121313123.png",
      title: "Digi2L Enterprise Services-Product Exchange Program!",
      subtitle: "Now Run Your Product Exchange Campaign Seamlessly.",
      buttonText: " EXPLORE ",
      //   buttonLink: "Smart_Sell",
      buttonColor: "orange",
      fontSize: "10px",
      imgSrc: "/Digi2limage/img2-7.png.webp",
    },
    {
      bgImage: "/Digi2limage/img154353453.png",
      title: "Digi2L Enterprise Services-Product Exchange Program!",
      subtitle:
        " No More Productivity Loss, Logistics Nightmare, Reseller Scoutingor Cost Overrun.",
      buttonText: "EXPLORE",

      buttonColor: "#a70fea",
      imgSrc: "/Digi2limage/img2-8.png.webp",
    },
    {
      bgImage: "/Digi2limage/img154353453.png",
      title: "Digi2L Enterprise Services-Product Exchange Program!",
      subtitle:
        "No More Productivity Loss, Logistics Nightmare, Reseller Scouting or Cost Overrun.",
      buttonText: "EXPLORE",

      buttonColor: "#a70fea",
      imgSrc: "/Digi2limage/img2-9.png.webp",
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
