import React, { useEffect, useState } from "react";

import APi from "../WebService/APi";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import $ from "jquery";
import DataNotFound from "../js/DataNotFound";
import Get from "../WebService/Fuction/Get";
export default function Press() {
  var [Press, SetPress] = useState([]);

  const [itemOffset, setItemOffset] = useState(0);

  const processGetLink = (result) => {
    if (result.Status && result.result.length != 0) {
      SetPress(result.result);
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

  var press = async () => {
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
    press();
  }, []);

  var itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = Press.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(Press.length / itemsPerPage);

  const handlePageClick = (event) => {
    $("html, body").animate(
      {
        scrollTop: $(".itemPress").offset().top - $(window).height() / 2,
      },
      300
    );
    const newOffset = (event.selected * itemsPerPage) % Press.length;

    setItemOffset(newOffset);
  };
  return (
    <div>
      <div>
        <title>Press - Digi2L</title>

        <section className="latest_blog_section ">
          <div className="d-flex align-items-center justify-content-center section_bg mb-3 py-5">
            <h1 className="poppins-SemiBold  lh-base">Press Release</h1>
          </div>

          <div
            className="container mt-5"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {currentItems.length === 0 ? (
              <DataNotFound />
            ) : (
              <>
                <div className="row  mb-5 itemPress" id="press">
                  {currentItems &&
                    currentItems.map((obj) => {
                      if (obj.PressISActive == true) {
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
                                className="card rounded-20 border-0 common-shadow blog_card_path FeaturedBlogsCard2 rocket-lazyload demo32223333"
                                style={{
                                  backgroundImage: `url("/Digi2limage/card1.png")`,
                                  backgroundRepeat: "no-repeat",
                                  backgroundPositionX: "right",
                                  backgroundPositionY: "botton",
                                }}
                              >
                                <div className="card-header m-3 bg-transparent border-0 d-flex align-items-center">
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
                                </div>
                                <div className="card-body px-4 py-0">
                                  <h6 className="poppins-SemiBold">
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
                          </div>
                        );
                      }
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
