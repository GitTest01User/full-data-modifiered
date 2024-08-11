import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import APi from "../WebService/APi";

import $ from "jquery";
import ReactPaginate from "react-paginate";
import DataNotFound from "../js/DataNotFound";
import Get from "../WebService/Fuction/Get";
export default function CustomerReviews() {
  var [CustomerReviews, SetCustomerReviews] = useState([[]]);

  const [itemOffset, setItemOffset] = useState(0);

  var Reviews = async () => {
    try {
      Get(
        `${
          APi.CustomerReviewsGetApi
        }?TestimanialisActive=${true}&RoleTestimanial=${"Customer"}`
      )
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const processGetLink = (result) => {
    if (result.Status && result.result.length != 0) {
      SetCustomerReviews(result.result);
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

  useEffect(() => {
    Reviews();
  }, []);

  var itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = CustomerReviews.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(CustomerReviews.length / itemsPerPage);

  const handlePageClick = (event) => {
    $("html, body").animate(
      {
        scrollTop: $(".itemTestimonial").offset().top - $(window).height() / 2,
      },
      300
    );
    const newOffset = (event.selected * itemsPerPage) % CustomerReviews.length;

    setItemOffset(newOffset);
  };

  return (
    <div>
      <title>Customer Reviews - Digi2L</title>
      <div>
        <section className="latest_blog_section  ">
          <div className="d-flex align-items-center justify-content-center section_bg mb-3 py-5">
            <h1 className="poppins-SemiBold  lh-base">Customer Reviews</h1>
          </div>
        </section>
        {currentItems.length === 0 ? (
          <DataNotFound />
        ) : (
          <>
            {" "}
            <div className="container pt-5 pb-3 ">
              <div className="row itemTestimonial">
                {currentItems &&
                  currentItems.map((obj) => {
                    if (
                      obj.TestimanialisActive == true ||
                      obj.TestimanialisActive != null
                    ) {
                      return (
                        <div className="col-md-6 col-sm-12 d-flex align-items-stretch p-2 ">
                          <div
                            id="Success"
                            className="card"
                            style={{ borderRadius: "20px", background: "#FFF" }}
                          >
                            <div
                              data-bg="/Digi2limage/Ellipse1.png"
                              className="card-body p-4 rocket-lazyload"
                              id="item"
                              style={{
                                backgroundImage: `url('/Digi2limage/Ellipse1.png')`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right top,left ,bottom",
                                borderRadius: "20px",
                              }}
                            >
                              <div className="d-flex text-black">
                                <div className="flex-shrink-0">
                                  <img
                                    src={`${APi.BaseURL}/${
                                      obj.TestimonialImage
                                        ? obj.TestimonialImage
                                        : "placeholder-01-01 1.png"
                                    }`}
                                    alt={obj.TestimonialFeaturedImageAlt}
                                    className="img-fluid rounded-circle"
                                    style={{ width: "100px", height: "100px" }}
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3 p-3 ">
                                  <h4
                                    className="mb-1 poppins-Regular text-lg-start"
                                    style={{ color: "#430560" }}
                                  >
                                    {obj.TestimonialName}
                                  </h4>
                                  <p
                                    className="mb-2 pb-1 poppins-Regular text-lg-start"
                                    style={{ color: "#430560" }}
                                  >
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: obj.TestimonialAddress,
                                      }}
                                    />
                                  </p>
                                </div>
                              </div>
                              <p
                                className="p-2 poppins-Regular "
                                style={{ color: "#430560" }}
                              >
                                <p
                                  className="text-lg-start pt-4 pb-3"
                                  dangerouslySetInnerHTML={{
                                    __html: obj.TestimonialDescription,
                                  }}
                                />
                              </p>
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}
