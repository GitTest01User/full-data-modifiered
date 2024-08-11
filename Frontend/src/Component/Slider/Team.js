import React, {  useState } from "react";

import Slider from "react-slick";


export default function Team() {
  const [isShowMore, setIsShowMore] = useState(false);
  const [isShowMore1, setIsShowMore1] = useState(false);

  const toggleReadMoreLess = () => {
    setIsShowMore(!isShowMore);
  };
  const toggleReadMoreLess1 = () => {
    setIsShowMore1(!isShowMore1);
  };
  const settings = {
    autoplay: true,
    // autoplaySpeed: 1000,
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
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      {" "}
      <div>
        <div className="row justify-content-center mb-3">
          <div className="col-lg-10 col-sm-10">
            <div className="row justify-content-center p-3">
              <Slider {...settings}>
                <div className="col-lg-3 col-md-3 mb-3">
                  <div className="box shadow">
                    <div className="content">
                      <img
                        src="/Digi2limage/uploads/2023/01/Tarun-Bhardwaj.jpg.webp"
                        className="img-fluid"
                        alt=""
                        id="about36"
                      />
                      <h5
                        style={{ color: "#3325B0" }}
                        className="text-center pt-2 poppins-SemiBold mt-3"
                        id="about37"
                      >
                        Tarun Bhardwaj
                      </h5>
                      <h6
                        className="text-center poppins-Medium  d-sm-block d-lg-none"
                        style={{ color: "black" }}
                        id="about38"
                      >
                        Co-Founder
                      </h6>
                    </div>
                    <div className="content-hover">
                      <h6 className="text-center text-white" id="about39">
                        About Tarun
                      </h6>
                      <div className="text-center">
                        <a
                          href="https://www.linkedin.com/in/tarun-bhardwaj-a30795a/"
                          target="_blank"
                        >
                          <i
                            style={{
                              borderRight: "1px solid #fff",
                              paddingRight: "10px",
                            }}
                            className="fab fa-linkedin text-white"
                            aria-hidden="true"
                          ></i>
                        </a>
                        <a href="https://www.linkedin.com/in/tarun-bhardwaj-a30795a/">
                          <i
                            style={{ paddingLeft: "10px" }}
                            className="fa fa-envelope text-white"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                      <p
                        style={{ fontSize: "14px" }}
                        className="text-center more"
                        id="about40"
                      >
                        After garnering 20 years of work experience and playing
                        leadership roles in the top consumer electronics
                        companies in the country, Tarun Observed a huge
                        opportunity in the unorganized market of open box/used
                        products - a market which had the potential to become
                        the next billion dollar industry. He ventured solo into
                        the unexplored territory to create a leading all India
                        market-network dealing in surplus and open-box stocks
                        for large home appliances. His passion to build a
                        technology enabled ecosystem for the manufacturers,
                        retailers/etailers, retail trade partners and buyers is
                        a visionary idea which is the cornerstone of this
                        organization.
                      </p>
                      {isShowMore && (
                        <p
                          style={{ fontSize: "14px" }}
                          className="text-center more"
                          id="about40"
                        >
                          Tarun is leading through the time and the industry
                          with his increasing army of service and sales teams
                          across the country. He has a keen eye for talent and
                          upholds his team to share the limelight in days of
                          success and uses his aura to light up the path on days
                          that go bad. Sounds like a fantasy? His doors are open
                          and he loves to catch up on interesting conversations
                          over a cup of coffee.{" "}
                        </p>
                      )}
                      <span
                        className="p-3 pt-0 text-center text-light"
                        onClick={toggleReadMoreLess}
                      >
                        {isShowMore ? "Read Less" : "Read More"}
                      </span>
                      <h5 className="text-center text-white">Tarun Bhardwaj</h5>
                      <h6 className="text-center text-white">Co-Founder</h6>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 mb-3">
                  <div className="box shadow">
                    <div className="content">
                      <img
                        src="/Digi2limage/uploads/2023/02/wq.webp"
                        className="img-fluid"
                        alt=""
                        id="about41"
                      />
                      <h5
                        style={{ color: "#3325B0" }}
                        className="text-center pt-2 poppins-SemiBold mt-3"
                        id="about42"
                      >
                        Alok Mathur
                      </h5>
                      <h6
                        className="text-center poppins-Medium  d-sm-block d-lg-none"
                        style={{ color: "black" }}
                        id="about38"
                      >
                        Co-Founder
                      </h6>
                    </div>
                    <div className="content-hover">
                      <h6 className="text-center text-white " id="about44">
                        About Alok
                      </h6>
                      <div className="text-center">
                        <a
                          href="https://www.linkedin.com/in/alok-mathur-3762851/"
                          target="_blank"
                        >
                          <i
                            style={{
                              borderRight: "1px solid #fff",
                              paddingRight: "10px",
                            }}
                            className="fab fa-linkedin text-white"
                            aria-hidden="true"
                          ></i>
                        </a>
                        <a href="https://www.linkedin.com/in/tarun-bhardwaj-a30795a/">
                          <i
                            style={{ paddingLeft: "10px" }}
                            className="fa fa-envelope text-white"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                      <p
                        style={{ fontSize: "14px" }}
                        className="text-center more"
                        id="about45"
                      >
                        With over 20 years of mainstream experience in the
                        consumer durable industry. Alok knows the electronics
                        and consumer durable industry inside and out. He has an
                        understanding of how electronics business run, what
                        works and what doesn't. Throughout his work experience.
                        He has taken up leadership roles and helped some global
                        businesses to venture through new times and see newer
                        glory. Alok ventured into entrepreneurship in 2010 and
                        has since contributed to shape this new era of
                        re-commerce industry in India.
                      </p>
                      {isShowMore1 && (
                        <p
                          style={{ fontSize: "14px" }}
                          className="text-center more"
                          id="about45"
                        >
                          {" "}
                          Digi2L is not just a brand but a vision that Alok sees
                          as the future of the global re-commerce industry. With
                          time as he is creating magic in securing alliances
                          with the top brands, Alok is also paving the way for
                          future leaders to be a part of his magical journey and
                          create history. Detailed oriented, strategic and
                          certain of what he wants, Alok shares the skill of
                          holding amazing and insightful conversations that will
                          keep your heart and the coffee mug full.
                        </p>
                      )}

                      <span
                        className="p-3 pt-0 text-center text-light"
                        onClick={toggleReadMoreLess1}
                      >
                        {isShowMore1 ? "Read Less" : "Read More"}
                      </span>
                      <h5 className="text-center text-white">Alok Mathur</h5>
                      <h6 className="text-center text-white">Co-Founder</h6>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
