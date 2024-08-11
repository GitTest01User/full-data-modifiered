import React from "react";
import { Link, json, useNavigate } from "react-router-dom";
import Scrolling from "./AddComponenet/Scrolling";
import HowCanHelpYou from "./AddComponenet/HowCanHelpYou";
import { HashLink, NavHashLink } from "react-router-hash-link";

import APi from "../WebService/APi";
import { useState } from "react";
import { useEffect } from "react";
import Get from "../WebService/Fuction/Get";

export default function Footer() {
  var [Years, SetYears] = useState(new Date().getFullYear());
  var [Footer, SetFooter] = useState([]);
  var [FollowIcon, SetFollowIcon] = useState([]);
  var [QuickLink, SetQuickLink] = useState([]);
  var [Detail, SetDetail] = useState([]);
  var [FooterLogo, SetFooterLogo] = useState([]);
  var count = 0;
  var divCol = 2;
  useEffect(() => {
    footer();
    footerFollow();
    footerQuickLink();
    footerDetail();
    footerDetailLogo();
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

  var footer = async () => {
    try {
      Get(APi.FooterMenu)
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetLink = (result) => {
    if (result.Status && result.result.length != 0) {
      SetFooter(result.result);
    } else {
      navigator("*");
    }
  };

  var footerFollow = async () => {
    try {
      Get(APi.FollowGetIcon)
        .then(handleResponse)
        .then(processGetLinkFollow)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetLinkFollow = (result) => {
    if (result.Status && result.result.length != 0) {
      SetFollowIcon(result.result);
    } else {
      navigator("*");
    }
  };

  var footerQuickLink = async () => {
    try {
      Get(APi.GetQuickLinkAPi)
        .then(handleResponse)
        .then(processGetQuicklink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetQuicklink = (result) => {
    if (result.Status && result.result.length != 0) {
      SetQuickLink(result.result);
    } else {
      navigator("*");
    }
  };

  var footerDetail = async () => {
    try {
      Get(APi.GetDetailAPi)
        .then(handleResponse)
        .then(processfooterDetail)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processfooterDetail = (result) => {
    if (result.Status && result.result.length != 0) {
      SetDetail(result.result);
    } else {
      navigator("*");
    }
  };

  var footerDetailLogo = async () => {
    try {
      Get(APi.FooterLogoGetAPi)
        .then(handleResponse)
        .then(processfooterDetailLogo)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processfooterDetailLogo = (result) => {
    if (result.Status && result.result.length != 0) {
      SetFooterLogo(result.result);
    } else {
      navigator("*");
    }
  };

  return (
    <div>
      <div>
        <HowCanHelpYou />

        <section className="section_footer footer_bg">
          <footer className="w-100 py-3 flex-shrink-0 pt-3">
            <div className="container py-2">
              <div className="row gy-4 gx-5">
                {Footer.map((obj, index) => {
                  if (obj.isMenu == true && obj.FooterisActive == true) {
                    return (
                      <>
                        <div className="col-lg-2 col-md-3" key={index}>
                          <h5 className="text-white mb-3">{obj.FooterTitle}</h5>
                          <ul className="list-unstyled">
                            {Footer.map((obj1, index) => {
                              if (
                                obj1.FooterPerantId == obj.FooterId &&
                                obj1.isMenu != true &&
                                obj1.tblBrowserRouters != null &&
                                obj1.FooterisActive == true
                              ) {
                                let link =
                                  obj1.tblBrowserRouters.BrowserRouterPermaLink;
                                let target = "_self";

                                if (obj1 && obj1.tblBrowserRouters) {
                                  const BrowserRouterPermaLink =
                                    obj1.tblBrowserRouters
                                      .BrowserRouterPermaLink;

                                  if (
                                    BrowserRouterPermaLink &&
                                    BrowserRouterPermaLink.startsWith("https")
                                  ) {
                                    link = BrowserRouterPermaLink;
                                    target = "_blank";
                                  }
                                }
                                return (
                                  <>
                                    <li className="pt-2" key={index + 1}>
                                      {obj1.tblBrowserRouters ? (
                                        <>
                                          {" "}
                                          <HashLink
                                            target={target}
                                            to={link}
                                            scroll={(el) =>
                                              el.scrollIntoView({
                                                behavior: "auto",
                                                block: "end",
                                              })
                                            }
                                            className="text-white opacity-75"
                                          >
                                            {obj1.FooterTitle}
                                          </HashLink>
                                        </>
                                      ) : (
                                        <>
                                          {" "}
                                          <HashLink
                                            scroll={(el) =>
                                              el.scrollIntoView({
                                                behavior: "auto",
                                                block: "end",
                                              })
                                            }
                                            className="text-white opacity-75"
                                          >
                                            {obj1.FooterTitle}
                                          </HashLink>
                                        </>
                                      )}
                                    </li>
                                  </>
                                );
                              }
                            })}
                          </ul>
                        </div>
                      </>
                    );
                  }
                })}

                <div className="col-lg-2 col-md-3">
                  <h5 className="text-white mb-3">Follow Us</h5>
                  <div className="pt-1">
                    {FollowIcon.map((obj) => {
                      if (obj.FollowIsActive) {
                        return (
                          <>
                            <Link
                              to={obj.Link}
                              className="fburl opacity-75"
                              target="_blank"
                            >
                              <img
                                className="img-fluid px-2"
                                src={`${APi.BaseURL}/${
                                  obj.Image
                                    ? obj.Image
                                    : "placeholder-01-01 1.png"
                                }`}
                                alt={obj.Title}
                              />
                            </Link>
                          </>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ border: "1px solid #2f2465" }} />
            <div className="container py-2">
              <div className="row text-white">
                {FooterLogo.map((obj) => {
                  if (obj.LogoIsActive == true) {
                    return (
                      <>
                        <div className="col-lg-3">
                          <Link
                            className="navbar-brand"
                            to={obj.PermaLink}
                            id="footerlogo"
                          >
                            <img
                              className="img-fluid"
                              src={`${APi.BaseURL}/${
                                obj.Image
                                  ? obj.Image
                                  : "/Digi2limage/logo-Digi2L222.png"
                              }`}
                              alt="Digi2L"
                            />
                            <span className="footer-copyright">
                              {obj.Description}
                            </span>
                          </Link>
                        </div>
                      </>
                    );
                  }
                })}
                {Detail.map((obj, index) => {
                  if (obj.DetailsisActive === true) {
                    count++;
                    if (count == 4 || count == 4 + 1 || count == 3 * 3) {
                      divCol = 3;
                    } else {
                      divCol = 2;
                    }
                    return (
                      <div key={index} className={`col-lg-${divCol}`}>
                        <div className="py-2">
                          <label className="poppins-Medium">
                            <small>
                              <i className={`text-white ${obj.Icon}`}></i>{" "}
                              <span className="text-white">{obj.Title}</span>
                            </small>
                          </label>
                          <div key={index} className="mark-Bold pxl-2">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: obj.Description,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="container py-2">
              <div
                className="text-white py-5"
                style={{
                  borderBottom: "1px solid #2f2465",
                  borderTop: "1px solid #2f2465",
                }}
              >
                <div id="footerservingheading">
                  <label className="poppins-Medium opacity-75 lh-lg">
                    Quick Links
                  </label>
                </div>
                <div
                  className="d-flex flex-wrap poppins-Regular opacity-50 lh-lg"
                  id="footerservicingareas"
                >
                  {QuickLink.map((obj) => {
                    if (obj.QuickLinkIsActive == true) {
                      return (
                        <>
                          <Link
                            to={obj.tblBrowserRouters.BrowserRouterPermaLink}
                            className="text-white opacity-75"
                          >
                            {obj.Title}&#160;|&#160;
                          </Link>
                        </>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="container3232 py-2">
                <div className="d-flex flex-wrap justify-content-md-between justify-content-center text-white">
                  <div className="opacity-75 poppins-Medium pt-3">
                    <label>
                      Copyright &#169; &#160;{Years}&#160;Digi2L All Right
                      Reserved.
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          <Scrolling />
        </section>
      </div>
    </div>
  );
}
