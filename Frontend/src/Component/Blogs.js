import React, { useEffect, useState } from "react";

import "../assets/style/resources.css";
import { Link, Outlet } from "react-router-dom";

import APi from "../WebService/APi";

import dateFormat from "dateformat";
import $ from "jquery";
import ReactPaginate from "react-paginate";
import DataNotFound from "../js/DataNotFound";
import Get from "../WebService/Fuction/Get";
export default function Blogs() {
  var [blog, setBlog] = useState([[]]);

  const [itemOffset, setItemOffset] = useState([]);


  const processGetLink = (result) => {
    if (result.Status && result.result.length != 0) {
      setBlog(result.result);
    } else {
      navigator("*");
    }
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

  var Blogs = async () => {
    try {
      Get(`${APi.BlogsGetApi}?BlogISActive=${true} `)
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Blogs();
  }, []);

  var itemsPerPage = 9;
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = blog.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(blog.length / itemsPerPage);

  const handlePageClick = (event) => {
    $("html, body").animate(
      {
        scrollTop: $(".itemBlog").offset().top - $(window).height() / 2,
      },
      200
    );
    const newOffset = (event.selected * itemsPerPage) % blog.length;

    setItemOffset(newOffset);
  };
  function truncateByWords(str, numWords) {
    const words = str.split(" ");
    if (words.length <= numWords) {
      return str;
    }
    return words.slice(0, numWords).join(" ") + "[...]";
  }

  return (
    <div>
      <title>Blogs - Digi2L</title>
      <div>
        <Outlet/>
        <section id="hero_banner">
          <div
            className="wrapper_herobanner32321312321 position-relative rocket-lazyload deta"
            style={{
              backgroundImage: `url("/Digi2limage/img1.png")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-5 pt-5 col-md-5 mt-5 px-4">
                  <h2
                    className="text-capitalize lh-base text-white poppins-Bold px-3 pt-5  blogpage1"
                    style={{ fontSize: "30px" }}
                  >
                    Articles, Blogs, And Guides From The World Of Recommerce.
                  </h2>
                </div>
                <div className="col-lg-5 col-md-5 py-4">
                  <img
                    style={{ position: "absolute", height: "450px" }}
                    src="/Digi2limage/img2-12.png.webp"
                    className="img-fluid mt-2 accessories_img blogpage-img"
                    alt="Digi2l"
                  />
                </div>
                <div className="col-lg-1"></div>
              </div>
              <div
                style={{ bottom: "0", left: "16%", top: "75%" }}
                className=" position-absolute d-none d-sm-block"
              >
                <img
                  className="bx-fade-down"
                  src="/Digi2limage/scroll_down.svg"
                  alt="Digi2l"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="align-items-center justify-content-center mb-3 ">
          <div className="bg-white py-5 section_bg text-center">
            <h1 className="poppins-SemiBold  lh-base">Latest Blog</h1>
          </div>

          <div
            className="bg-body container mb-5 "
            style={{ display: "flex", flexWrap: "wrap" }}
            id="blogs"
          >
            {currentItems.length === 0 ? (
              <>
                <DataNotFound />
              </>
            ) : (
              <>
                <div className="itemBlog  mt-5 row">
                  {currentItems &&
                    currentItems.map((obj) => {
                      if (obj.BlogISActive == true) {
                        return (
                          <div
                            className="col-lg-4 mb-4"
                            style={{ display: "flex", flexWrap: "wrap" }}
                          >
                            <div
                              className="py-0 position-relative px-2"
                              style={{
                                display: "flex",
                                padding: "0.5em",
                                marginRight: "1%",
                                marginBottom: "20px",
                              }}
                            >
                              <div
                                style={{
                                  backgroundImage: `url("/Digi2limage/card1.png")`,
                                }}
                                className="card rounded-20 border-0 common-shadow blog_card_path FeaturedBlogsCard2 rocket-lazyload demo32223333"
                              >
                                <div className="card-header m-3 bg-transparent border-0 d-flex align-items-center">
                                  <Link to={`/${obj.BlogPermalink}/`}>
                                    <img
                                      src={`${APi.BaseURL}/${
                                        obj.BlogImage
                                          ? obj.BlogImage
                                          : "placeholder-01-01 1.png"
                                      }`}
                                      alt={obj.BlogFeaturedImageAlt}
                                      className="img-fluid mx-auto"
                                      style={{
                                        width: "400px",
                                        height: "250px",
                                      }}
                                    />
                                  </Link>
                                </div>
                                <div className="card-body px-4 py-0">
                                  <Link
                                    to={`/${obj.BlogPermalink}/`}
                                    className="text-body"
                                  >
                                    <h6 className="poppins-SemiBold">
                                      {obj.BlogTitle}
                                    </h6>
                                  </Link>
                                  <p className="mark-Medium common_lighGray">
                                    {obj.BlogAuthor} -
                                    {dateFormat(obj.BlogDate, "mmmm dS, yyyy")}
                                  </p>
                                  <p className="form-check-inline form-control-sm mark-Medium p-0">
                                    {truncateByWords(obj.BlogDescription, 30)}
                                  </p>
                                </div>
                                <div className="bg-transparent border-0 pb-3 pt-0 px-4">
                                  <Link
                                    to={`/${obj.BlogPermalink}/`}
                                    className="poppins-Bold text-decoration-none common_blue"
                                    tabIndex="-1"
                                  >
                                    READ MORE
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}

                  <div class="col-12 mt-4 ">
                    <div class="navigation">
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel={<Link>Next »</Link>}
                        className="text-white"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel={<Link>« Previous</Link>}
                        renderOnZeroPageCount={null}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
