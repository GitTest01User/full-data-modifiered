import React, { useState } from "react";

import EnquiryForm from "./AddComponenet/EnquiryForm";
import { NavLink, useNavigate } from "react-router-dom";
import $ from "jquery";
import { useEffect } from "react";

import APi from "../WebService/APi";
import { Link } from "react-router-dom";
import Get from "../WebService/Fuction/Get";
var count = 1;
export default function Menu() {
  var navigate = useNavigate();
  useEffect(() => {
    $(".dropdown-item").on("click", function () {
      $("ul ").removeClass("show");
    });

    $(".dropdown-item").on("click", function () {
      $(this, "#dropdown7 a").addClass("active");
    });
  });
  var [Detail, SetDetail] = useState([]);
  const [isActivenew, setIsActivenew] = useState(false);
  const [isActiveMobile, setIsActiveMobile] = useState(false);
  var [cards, SetCards] = useState([]);
  var [Logo, setLogo] = useState([]);
  var [FollowIcon, SetFollowIcon] = useState([]);
  useEffect(() => {
    menu();
    footerFollow();
    logo();
    footerDetail();
  }, []);

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
  const processGetLink = (dataBase) => {
    if (dataBase.Status) {
      SetCards(dataBase.result);
    } else {
      SetCards(dataBase.result);
    }
  };

  var footerDetail = async () => {
    try {
      Get(APi.GetDetailAPi)
        .then(handleResponse)
        .then(processGetDetailFooter)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetDetailFooter = (dataBase) => {
    
    if (dataBase.Status) {
      SetDetail(dataBase.result);
    } else {
      SetDetail(dataBase.result);
    }
  };

  var logo = async () => {
    try {
      Get(APi.FollowGetLogoIcon)
        .then(handleResponse)
        .then(processGetFollowGetLogo)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const processGetFollowGetLogo = (dataBase) => {
  
    if (dataBase.Status) {
      setLogo(dataBase.result);
    } else {
      setLogo(dataBase.result);
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

  var footerFollow = async () => {
    try {
      Get(APi.FollowGetHeaderIcon)
        .then(handleResponse)
        .then(processGetFollow)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const processGetFollow = (dataBase) => {
  
    if (dataBase.Status) {
      SetFollowIcon(dataBase.result);
    } else {
      SetFollowIcon(dataBase.result);
    }
  };

  const handleClicks2 = (event) => {
    setIsActivenew((current) => !current);
    const target = $(event.target);
    const navItem = target.closest(".nav-item");
    $(".nav-item .nav-link.active").removeClass("active");
    const subNavParentId = navItem.find(".nav-link").parent().attr("id");
    if (subNavParentId) {
      $(`#${subNavParentId} a:first`).addClass("active");
    } else {
      $(`#${subNavParentId} a:first`).addClass("active");
    }
  };

  var handleClicks = (event) => {
    setIsActiveMobile((current) => !current);

    const target = $(event.target);
    const navItem = target.closest(".border-bottom");
    $(".border-bottom .nav-link.active").removeClass("active");
    const subNavParentId = navItem.find(".nav-link").parent().attr("id");
    if (subNavParentId) {
      $(`#${subNavParentId} a:first`).addClass("active");
    } else {
      $(`#${subNavParentId} a:first`).addClass("active");
    }
  };

  return (
    <div>
      <EnquiryForm />
      <div className="mainNav d-none d-lg-block">
        <nav
          className="navbar navbar-expand-lg navbar-light fixed-top"
          style={{ backgroundColor: " #ffffff" }}
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse collapse justify-content-between navbar-collapse"
              id="navbarTogglerDemo01"
            >
              {Logo.map((obj) => {
                return (
                  <>
                    <NavLink
                      id="nav-brand"
                      className="navbar-brand nav-link"
                      to={obj.PermaLink}
                    >
                      <img
                        id="nav-logo"
                        src={`${APi.BaseURL}/${
                          obj.Image ? obj.Image : "logo.svg"
                        }`}
                        width="100%"
                        height="100%"
                        alt="Digi2L"
                      />
                    </NavLink>
                  </>
                );
              })}
              <div className="row">
                <div className="col-12 justify-content-between">
                  <ul
                    id="navItemUl"
                    className="justify-content-between m-auto me-auto navbar-nav poppins-Medium"
                  >
                    {cards.map((obj, index) => {
                      if (
                        obj.HeaderPerantId == null &&
                        obj.HeaderisActive == true
                      ) {
                        return (
                          <>
                            {cards.map((obj1, index) => {
                              if (
                                obj1.flagSubMenu === true &&
                                obj.HeaderPerantId == null &&
                                obj.HeaderisActive == true &&
                                obj1.HeaderTitle == obj.HeaderTitle &&
                                obj1.tblBrowserRouters != null
                              ) {
                                count++;

                                return (
                                  <li
                                    id={`nav-item-${obj1.id}`}
                                    className="nav-item  text-center dropdown "
                                  >
                                    <img
                                      src={`${APi.BaseURL}/${
                                        obj1.HeaderIcon
                                          ? obj1.HeaderIcon
                                          : "placeholder-01-01 1.png"
                                      }`}
                                      width="100%"
                                      height="100%"
                                      style={{ width: "30px" }}
                                    />

                                    <NavLink
                                      to={
                                        obj1.tblBrowserRouters
                                          .BrowserRouterPermaLink
                                      }
                                      className="nav-link link-bg py-0 dropdown-toggle  toggle-change navbarDropdown"
                                      role="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                      id={`dropdown_${obj1.id}`}
                                    >
                                      {obj1.HeaderTitle}
                                      <i className="fa-solid fa-angle-down"></i>
                                    </NavLink>

                                    <ul
                                      id="dropdown-menu"
                                      className="dropdown-menu"
                                      aria-labelledby="navbarDropdown"
                                    >
                                      {cards.map((obj2, index) => {
                                        if (
                                          obj2.HeaderPerantId == obj1.id &&
                                          obj2.tblBrowserRouters != null &&
                                          obj2.HeaderisActive == true
                                        ) {
                                          return (
                                            <>
                                              <li>
                                                <NavLink
                                                  className="dropdown-item"
                                                  to={
                                                    obj2.tblBrowserRouters
                                                      .BrowserRouterPermaLink
                                                  }
                                                  id="nav-logo1"
                                                  onClick={handleClicks2}
                                                >
                                                  {obj2.HeaderTitle}{" "}
                                                </NavLink>
                                              </li>
                                              <li>
                                                <hr className="dropdown-divider" />
                                              </li>
                                            </>
                                          );
                                        }
                                      })}
                                    </ul>
                                  </li>
                                );
                              } else {
                                const link =
                                  obj.tblBrowserRouters.BrowserRouterPermaLink;
                                const target = link.startsWith("https://")
                                  ? "_blank"
                                  : "_self";
                                if (
                                  obj1.flagSubMenu == false &&
                                  obj.HeaderPerantId == null &&
                                  obj.HeaderisActive == true &&
                                  obj1.HeaderTitle == obj.HeaderTitle &&
                                  obj.tblBrowserRouters != null
                                ) {
                                  return (
                                    <>
                                      <li
                                        id={`nav-item-${obj1.id}`}
                                        className="nav-item text-center"
                                      >
                                        <img
                                          src={`${APi.BaseURL}/${
                                            obj.HeaderIcon
                                              ? obj.HeaderIcon
                                              : "placeholder-01-01 1.png"
                                          }`}
                                          alt="smart-sell"
                                          width="100%"
                                          height="100%"
                                          style={{ width: "30px" }}
                                        />
                                        <NavLink
                                          className="nav-link py-0 "
                                          aria-current="page"
                                          to={link}
                                          target={target}
                                          onClick={handleClicks2}
                                        >
                                          {obj.HeaderTitle}
                                        </NavLink>
                                      </li>
                                    </>
                                  );
                                }
                              }
                            })}
                          </>
                        );
                      }
                    })}
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-12 justify-content-between">
                  <form className="d-flex">
                    <ul className="navbar-nav cstm_toggle me-auto mb-2 mb-lg-0">
                      <div className="my-2 px-1 px-xl-3">
                        <label className="poppins-Regular">
                          <small>Follow Us</small>
                        </label>
                        <h6
                          id="socialmediatop"
                          className="poppins-Bold text-dark"
                        >
                          {FollowIcon.map((obj) => {
                            if (obj.FollowIsActive) {
                              return (
                                <>
                                  <NavLink
                                    to={obj.Link}
                                    className="yturl"
                                    target="_blank"
                                  >
                                    <i className={obj.Icon}></i>
                                  </NavLink>
                                </>
                              );
                            }
                          })}
                        </h6>
                      </div>
                      <span className="border-start"></span>
                      <div className="px-xl-3 px-1">
                        {Detail.map((obj, index) => {
                          if (
                            obj.DetailsisActive === true &&
                            obj.Title == "Contact Number"
                          ) {
                            return (
                              <div key={index}>
                                <div className="py-2">
                                  <label className="poppins-Medium">
                                    <small className="poppins-Regular">
                                      Call us at
                                    </small>
                                  </label>
                                  <div key={index} className="mark-Bold ">
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
                    </ul>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="customNav d-block d-lg-none">
        <div className="top-nav">
          <div className="pt-3 ps-4">
            <NavLink to="/">
              <img
                width="120"
                height="100%"
                src="/Digi2limage/logo.svg"
                alt="Digi2L"
                style={{ display: "block" }}
              />{" "}
            </NavLink>
          </div>
          <div className="menu" onClick={handleClicks}>
            <div className="menu-line"></div>
            <div className="menu-line w-75"></div>
            <div className="menu-line"></div>
          </div>
          <div className="menu-close d-none">
            <img
              src="/Digi2limage/themes/digi2l/assets/images/close.svg"
              alt="close"
              width="20"
              height="auto"
            />
          </div>
        </div>

        <div
          className={
            isActiveMobile
              ? "card menu-panel text-center p-0 show"
              : "card menu-panel text-center p-0 "
          }
        >
          <div>
            <div className="menu-close">
              <img
                src="/Digi2limage/themes/digi2l/assets/images/close.svg"
                alt="close"
                width="20"
                height="auto"
                onClick={handleClicks}
              />
            </div>

            <div className=" card-body menu-links pt-5">
              <ul
                className="navbar-nav poppins-SemiBold"
                style={{ marginTop: "80px", marginBottom: "30px" }}
              >
                {cards.map((obj, index) => {
                  if (
                    obj.HeaderPerantId == null &&
                    obj.HeaderisActive == true
                  ) {
                    return (
                      <li
                        id={`border-bottom-${obj.id}`}
                        key={index}
                        className="d-flex py-2 border-bottom"
                      >
                        {cards.map((obj1, index1) => {
                          if (
                            obj1.flagSubMenu === true &&
                            obj1.HeaderPerantId == null &&
                            obj1.HeaderisActive == true &&
                            obj1.HeaderTitle === obj.HeaderTitle
                          ) {
                            return (
                              <React.Fragment key={index1}>
                                <img
                                  className="mx-4"
                                  src={`${APi.BaseURL}/${
                                    obj1.HeaderMoblieIcon
                                      ? obj1.HeaderMoblieIcon
                                      : "placeholder-01-01 1.png"
                                  }`}
                                  alt="corporate-enquiry"
                                  width="30"
                                  style={{ width: "30px" }}
                                />
                                <Link
                                  className="nav-link mx-2 text-dark fs-6 dropdown-toggle"
                                  id={`dropdown_${obj1.id}`}
                                  to={obj1.HeaderPermaLink}
                                  role="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  {obj.HeaderTitle}
                                  <i className="fa-solid fa-angle-down"></i>
                                </Link>
                                <ul
                                  className="dropdown-menu"
                                  aria-labelledby={`dropdown_${obj1.id}`}
                                >
                                  {cards.map((obj2, index2) => {
                                    if (
                                      obj2.HeaderPerantId === obj1.id &&
                                      obj2.HeaderisActive == true
                                    ) {
                                      return (
                                        <React.Fragment key={index2}>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              to={
                                                obj2.tblBrowserRouters
                                                  .BrowserRouterPermaLink
                                              }
                                              onClick={handleClicks}
                                            >
                                              {obj2.HeaderTitle}
                                            </Link>
                                          </li>
                                          <li>
                                            <hr className="dropdown-divider" />
                                          </li>
                                        </React.Fragment>
                                      );
                                    }
                                    return null;
                                  })}
                                </ul>
                              </React.Fragment>
                            );
                          } else {
                            if (
                              obj1.flagSubMenu === false &&
                              obj1.HeaderPerantId == null &&
                              obj1.HeaderisActive == true &&
                              obj1.HeaderTitle === obj.HeaderTitle
                            ) {
                              return (
                                <React.Fragment key={index1}>
                                  <img
                                    className="mx-4"
                                    src={`${APi.BaseURL}/${
                                      obj.HeaderMoblieIcon
                                        ? obj.HeaderMoblieIcon
                                        : "placeholder-01-01 1.png"
                                    }`}
                                    alt="smart-sell"
                                    width="30"
                                    style={{ width: "30px" }}
                                  />
                                  <Link
                                    className="nav-link mx-2 text-dark fs-6"
                                    onClick={handleClicks}
                                    to={
                                      obj.tblBrowserRouters
                                        .BrowserRouterPermaLink
                                    }
                                  >
                                    {obj.HeaderTitle}
                                  </Link>
                                </React.Fragment>
                              );
                            }
                          }
                          return null;
                        })}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
            <div className="border-0 card-footer p-3 section_bg text-start">
              {Detail.map((obj, index) => {
                if (obj.DetailsisActive === true && obj.Id == 1) {
                  return (
                    <div key={index} className={`col-lg-2`}>
                      <div className="py-2">
                        <label className="poppins-Medium">
                          <small className="poppins-Regular">Call us at</small>
                        </label>
                        <div key={index} className="mark-Bold ">
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
              <div>
                <div>
                  <label className="poppins-Regular">
                    <small>Follow Us</small>
                  </label>
                  <h6 id="socialmediatop" className="poppins-Bold text-dark">
                    {FollowIcon.map((obj) => {
                      if (obj.FollowIsActive) {
                        return (
                          <>
                            <NavLink
                              to={obj.Link}
                              className="yturl"
                              target="_blank"
                            >
                              <i className={obj.Icon}></i>
                            </NavLink>
                          </>
                        );
                      }
                    })}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
