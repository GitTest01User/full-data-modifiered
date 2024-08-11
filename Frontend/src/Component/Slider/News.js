import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import APi from "../../WebService/APi";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import Get from "../../WebService/Fuction/Get";

export default function News() {
  var [News, SetNews] = useState([]);

  var news = async () => {
    try {
      Get(`${APi.PressGetAPi}?PressISActive=${true}`)
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }

   
  };

  useEffect(() => {
    news();
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
      SetNews(result.result);
    } else {
      navigator("*");
    }
  };





  const settings = {
    autoplay: true,
    // autoplaySpeed: 400,
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
      <div className="testimonial__inner">
        <div className="Digi2l_news_slider1">
          <Slider {...settings}>
            {News.map((obj) => {
              if (obj.PressISActive == true) {
                return (
                  <div
                    className="testimonial-slide py-0 position-relative px-2"
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <div
                      className="card rounded-20 border-0   FeaturedBlogsCard2"
                      style={{
                        display: "flex",
                        padding: "0.5em",
                        marginRight: "1%",
                        marginBottom: "20px",
                        minHeight: "350px",
                      }}
                    >
                      <div className="card-header m-3 bg-transparent border-0 d-flex align-items-center">
                        <Link to={obj.PressLink} target="_blank">
                          <img
                            src={`${APi.BaseURL}/${
                              obj.PressImage
                                ? obj.PressImage
                                : "placeholder-01-01 1.png"
                            }`}
                            alt={obj.PressFeaturedImageAlt}
                            className="img-fluid mx-auto"
                            style={{ width: "300px", height: "280px" }}
                          />
                        </Link>
                      </div>
                      <div className="card-body px-4 py-0">
                        <h6 className="poppins-SemiBold news-heading mt-2 mb-2">
                          {obj.PressTitle}
                        </h6>
                        <p className="mark-Medium common_lighGray">
                          By {obj.PressAuthor} -
                          {dateFormat(obj.PressDate, "mmmm dS, yyyy")}
                        </p>
                        <p className="mark-Medium"></p>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: obj.PressDescription,
                          }}
                        />
                      </div>
                      <div className="bg-transparent border-0 pb-3 pt-0 px-4">
                        <Link
                          to={obj.PressLink}
                          target="_blank"
                          className="poppins-Bold text-decoration-none common_blue"
                          tabindex="-1"
                        >
                          READ MORE
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }
            })}

            {/* <div className="testimonial-slide py-0 position-relative px-2" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <div className="card rounded-20 border-0   FeaturedBlogsCard2" style={{ display: 'flex', padding: '0.5em', marginRight: '1%', marginBottom: '20px', minHeight: '350px' }}>
                                    <div className="m-3 bg-transparent border-0 d-flex align-items-center">
                                       <Link to="https://www.cxotoday.com/specials/is-there-a-new-market-emerging-in-the-sale-of-used-appliances-and-electronic-gadgets/" target='_blank'>
                                            <img className="w-100"
                                                src="/Digi2limage/uploads/2023/03/Image-_Co-Founder-Alok-Mathur-DIGI2L-jpeg.webp"
                                                alt="Is there a new market emerging in the sale of used appliances and electronic gadgets?" /></a>
                                    </div>
                                    <div className="card-body px-4 py-0">
                                        <h6 className="poppins-SemiBold news-heading">Is there a new market emerging in the sale of used appliances and electronic gadgets?</h6>
                                        <p className="mark-Medium common_lighGray"><small>By CXO Today - March 25, 2023 </small>
                                        </p>
                                        <p className="mark-Medium para_first"><p>Today we live in an era of rapid transformation. Technology has become an integral part of our existence and is driving speedy change in our Lives. [&hellip;]</p>
                                        </p>
                                    </div>
                                    <div className="card-footer border-0 bg-transparent px-4 pt-0">
                                       <Link to="" target='_blank' className="poppins-Bold text-decoration-none common_blue">READ MORE</a>
                                    </div>
                                </div>
                            </div>
                            <div className="testimonial-slide py-0 position-relative px-2" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <div className="card rounded-20 border-0   FeaturedBlogsCard2" style={{ display: 'flex', padding: '0.5em', marginRight: '1%', marginBottom: '20px', minHeight: '350px' }}>
                                    <div className="m-3 bg-transparent border-0 d-flex align-items-center">
                                       <Link to="https://www.cxotoday.com/specials/is-there-a-new-market-emerging-in-the-sale-of-used-appliances-and-electronic-gadgets/" target='_blank'>
                                            <img className="w-100"
                                                src="/Digi2limage/uploads/2023/03/Image-_Co-Founder-Alok-Mathur-DIGI2L-jpeg.webp"
                                                alt="Is there a new market emerging in the sale of used appliances and electronic gadgets?" /></a>
                                    </div>
                                    <div className="card-body px-4 py-0">
                                        <h6 className="poppins-SemiBold news-heading">Is there a new market emerging in the sale of used appliances and electronic gadgets?</h6>
                                        <p className="mark-Medium common_lighGray"><small>By CXO Today - March 25, 2023 </small>
                                        </p>
                                        <p className="mark-Medium para_first"><p>Today we live in an era of rapid transformation. Technology has become an integral part of our existence and is driving speedy change in our Lives. [&hellip;]</p>
                                        </p>
                                    </div>
                                    <div className="card-footer border-0 bg-transparent px-4 pt-0">
                                       <Link to="" target='_blank' className="poppins-Bold text-decoration-none common_blue">READ MORE</a>
                                    </div>
                                </div>
                            </div>
                            <div className="testimonial-slide py-0 position-relative px-2" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <div className="card rounded-20 border-0   FeaturedBlogsCard2" style={{ display: 'flex', padding: '0.5em', marginRight: '1%', marginBottom: '20px', minHeight: '350px' }}>
                                    <div className="m-3 bg-transparent border-0 d-flex align-items-center">
                                       <Link to="https://www.cxotoday.com/specials/is-there-a-new-market-emerging-in-the-sale-of-used-appliances-and-electronic-gadgets/" target='_blank'>
                                            <img className="w-100"
                                                src="/Digi2limage/uploads/2023/03/Image-_Co-Founder-Alok-Mathur-DIGI2L-jpeg.webp"
                                                alt="Is there a new market emerging in the sale of used appliances and electronic gadgets?" /></a>
                                    </div>
                                    <div className="card-body px-4 py-0">
                                        <h6 className="poppins-SemiBold news-heading">Is there a new market emerging in the sale of used appliances and electronic gadgets?</h6>
                                        <p className="mark-Medium common_lighGray"><small>By CXO Today - March 25, 2023 </small>
                                        </p>
                                        <p className="mark-Medium para_first"><p>Today we live in an era of rapid transformation. Technology has become an integral part of our existence and is driving speedy change in our Lives. [&hellip;]</p>
                                        </p>
                                    </div>
                                    <div className="card-footer border-0 bg-transparent px-4 pt-0">
                                       <Link to="" target='_blank' className="poppins-Bold text-decoration-none common_blue">READ MORE</a>
                                    </div>
                                </div>
                            </div> */}
          </Slider>
        </div>
      </div>
    </div>
  );
}
