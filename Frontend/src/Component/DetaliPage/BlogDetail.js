import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import APi from "../../WebService/APi";
import dateFormat from "dateformat";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import Get from "../../WebService/Fuction/Get";

let shareUrl = window.location.href;

export default function BlogDetail() {
  var navigator = useNavigate();
  var userId = useParams();
  var BlogPermalink = userId.id;

  const [copied, setCopied] = useState(false);

  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }

  var [blogDetail, setBlogDetail] = useState([]);

  var [blog, setBlog] = useState([[]]);
  var [blogTitle, setBlogTitle] = useState([[]]);
  useEffect(() => {
    BlogsDetail();
  }, [BlogPermalink]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log("Error fetching user role:", error);
  };

  var BlogsDetail = async () => {
    try {
      Get(`${APi.BlogsGetApi}?BlogISActive=${true} `)
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const processGetLink = (result) => {
    if (result.Status && result.result.length != 0) {
      setBlog(result.result);
      setBlogTitle(result.result[0].BlogTitle);
      BlogsDetailBlogPermalink();
    } else {
      navigator("*");
    }
  };

  var BlogsDetailBlogPermalink = async () => {
    try {
      Get(
        `${APi.BlogsGetApi}?BlogPermalink=${BlogPermalink}&BlogISActive=${true}`
      )
        .then(handleResponse)
        .then(processGetPramalink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const processGetPramalink = (result) => {
    if (result.Status && result.result.length != 0) {
      setBlogDetail(result.result);
    } else {
      navigator("*");
    }
  };

  return (
    <div>
      <title> {blogTitle} - Digi2L</title>
      <div>
        <section
          className="blog_detail_hero position-relative  rocket-lazyload"
          style={{
            backgroundImage: `url("/Digi2limage/Pathbg.svg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <img
            src="/Digi2limage/blog_detail1.svg"
            alt=""
            style={{ position: "absolute", right: "0px", bottom: "0px" }}
          />

          <img
            src="/Digi2limage/blog_detail2.svg"
            alt=""
            style={{ position: "absolute", left: "0px", top: "0px" }}
          />
          {blogDetail.map((obj) => {
            if (obj.BlogISActive == true || obj.BlogISActive != null) {
              return (
                <div className="text-center py-5">
                  <h4 className="poppins-SemiBold lh-base">{obj.BlogTitle}</h4>
                  <p className="mark-Medium common_lighGray mb-0 py-2">
                    By {obj.BlogAuthor}-
                    {dateFormat(obj.BlogDate, "mmmm dS, yyyy")}
                  </p>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link
                      target="_blank"
                      className="btn btn-gradient py-1 px-lg-3 mx-2 poppins-Regular share-btn"
                    >
                      <FacebookShareButton url={`${shareUrl}`}>
                        <div className="icon-socmed-white linkedin">
                          <i className="pe-1 pt-1 fs-4 fa-brands fa-square-facebook"></i>
                          <span>Share</span>
                        </div>
                      </FacebookShareButton>
                    </Link>
                    <Link
                      target="_blank"
                      className="btn btn-gradient py-1 px-lg-3 mx-2 poppins-Regular share-btn"
                    >
                      <TwitterShareButton url={`${shareUrl}`}>
                        <div className="icon-socmed-white linkedin">
                          <i className="pe-1 pt-1 fs-4 fa-brands fa-square-twitter"></i>
                          <span>Tweet</span>
                        </div>
                      </TwitterShareButton>
                    </Link>
                    <Link
                      target="_blank"
                      className="btn btn-gradient py-1 px-lg-3 mx-2 poppins-Regular share-btn"
                    >
                      <LinkedinShareButton url={`${shareUrl}`}>
                        <div className="icon-socmed-white linkedin">
                          <i className="pe-1 pt-1 fs-4 fa-brands fa-linkedin"></i>
                          <span>Share</span>
                        </div>
                      </LinkedinShareButton>
                    </Link>
                    <div className="btn btn-gradient py-1 px-lg-3 mx-2 poppins-Regular share-btn">
                      <CopyToClipboard text="Hello!">
                        <>
                          <i className="pe-1 pt-1 fs-4 fa-solid fa-link"></i>
                          <span onClick={copy}>
                            <span>{!copied ? "Copy" : "Copied!"}</span>
                          </span>
                        </>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </section>

        <section className="container">
          {blogDetail.map((obj) => {
            if (obj.BlogISActive == true || obj.BlogISActive != null) {
              return (
                <p className="mark-Medium common_blue mb-0 py-2">
                  <span style={{ color: "#622ed3", fontSize: "14px" }}>
                    Blogs -{obj.BlogTitle}{" "}
                  </span>
                </p>
              );
            }
          })}

          <div className="row">
            <div className="col-lg-8 pb-5">
              {blogDetail.map((obj) => {
                if (obj.BlogISActive == true) {
                  return (
                    <div>
                      <img
                        src={`${APi.BaseURL}/${obj.BlogImage}`}
                        alt={obj.BlogFeaturedImageAlt}
                        className="img-fluid mx-auto  img-fluid mb-3  postthumimg "
                      />

                      <h3 className="poppins-SemiBold py-4">{obj.BlogTitle}</h3>
                      <p className="mark-Medium common_lighGray mb-0 py-2">
                        By {obj.BlogAuthor}-
                        {dateFormat(obj.BlogDate, "mmmm dS, yyyy")}
                      </p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `${obj.BlogContents}`,
                        }}
                      />
                    </div>
                  );
                }
              })}
            </div>

            <div className="col-lg-4">
              <div className="mb-5 sticky-top">
                <h3 className="poppins-SemiBold">Recent Blogs</h3>
                <div className="section_bg rounded-20 p-3 mb-4">
                  {blog.slice(0, 6).map((obj, index) => {
                    if (
                      obj.BlogISActive === true &&
                      obj.BlogISActive != null &&
                      obj.BlogPermalink != BlogPermalink
                    ) {
                      return (
                        <div
                          className="d-flex justify-content-between py-3"
                          key={index}
                        >
                          <div className="mx-3">
                            <img
                              className="postsidebarthumb"
                              src={`${APi.BaseURL}/${obj.BlogImage}`}
                              alt={obj.BlogAuthor}
                            />
                          </div>
                          <div>
                            <h5 className="poppins-SemiBold postsideBlogTitle">
                              <Link
                                to={`/${obj.BlogPermalink}/`}
                                style={{ color: "black" }}
                              >
                                {obj.BlogTitle}
                              </Link>
                            </h5>
                            <p className="mark-Medium common_lighGrayBlog mb-0 py-2">
                              By {obj.BlogAuthor}-
                              {dateFormat(obj.BlogDate, "mmmm dS, yyyy")}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
