import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

import ServerApiSmartBuy from "../WebService/Server/ServerApiSmartBuy";
import { Link } from "react-router-dom";
import { useAuthContext } from "./LocalData/AuthToken";
import { useDispatch } from "react-redux";
import { ChangeSbDetails } from "../Redux/DetailSb";
import { SmartBuySbDetails } from "../Redux/SmartBuyPriceSlice";
import Get from "../WebService/Fuction/Get";
export default function PlanFormSmartBuy() {
  const myRef = useRef(null);
  const myRefShown = useRef(null);
  var dispatch = useDispatch();

  var countryBox = useRef();
  var ProductTypeBox = useRef();
  var { tokenSb, smartBuySb } = useAuthContext();
  const [smart, SetSmartBuy] = useState([]);
  const [smartData, SetsmartBuyData] = useState([]);
  const [smartDetail, SetsmartDetail] = useState([]);
  const [smartDetailPlan, setSmartDetailPlan] = useState([]);
  const [isShown, setIsShown] = useState(false);

  var numberBox = useRef();
  var navigation = useNavigate();
  useEffect(() => {
    SmartBuy();
    $(".floating-control")
      .on("focus", function (e) {
        $(this).parents(".floating-group").addClass("focused ");

        $(this).addClass(
          "select2-results__options select2-results__option select2-results__option--selectable select2-results__option--highlighted"
        );
      })
      .on("blur ", function () {
        if ($(this).val()) {
          $(this).parents(".floating-group").addClass("focused ");
        } else {
          $(this).parents(".floating-group").removeClass("focused");
        }
      });
    $(".floating-control").on("change", function (e) {
      if ($(this).is("select")) {
        if ($(this).val() === $("option:first", $(this)).val()) {
          $(this).parents(".floating-group").removeClass("focused");
          $("select2-results__options option").css("padding", "40px");
        } else {
          $(this).parents(".floating-group").addClass("focused ");
        }
      }
    });
    $("#country").on("click", function () {
      $(
        "#selectcustomSelect"
      ).append(`"<option className='select2-results__options'  disabled selected hidden>
      Product type
    </option>" `);

     
      $("#productPrice").attr("disabled", "disabled");
      $("#productPrice").val("");
    });
    $("#selectcustomSelect").on("click", function () {
      if ($("#GetProductTypeAPI option:first").val() != null) {
        $("#productPrice").attr("disabled", "disabled");
      } else {
        $("#productPrice").removeAttr("disabled", "disabled");
      }
    });

    $("#selectcustomSelect").attr("disabled", "disabled");
    $("#productPrice").attr("disabled", "disabled");
    $("#nxt-step").attr("disabled", "disabled");
  }, [tokenSb]);

  var SmartBuy = async () => {
    try {
      Get(ServerApiSmartBuy.GetProductCategory, tokenSb)
        .then(handleResponse)
        .then(processGetSmartBuy)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetSmartBuy = (result) => {
    if (result.Status) {
      SetSmartBuy(result.Detail.ProductsCategory);
    } else {
      SetSmartBuy(result.Detail.ProductsCategory);
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

  var GetProdType = async (event) => {
    if (countryBox) {
      var country = countryBox.current.value;
      $("#selectcustomSelect").attr("disabled");
    }
    try {
      Get(`${ServerApiSmartBuy.GetProductType}?catId=${country}`, tokenSb)
        .then(handleResponse)
        .then(processGetSmartBuyProdType)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetSmartBuyProdType = (result) => {
    if (result.Status) {
      $("#selectcustomSelect").removeAttr("disabled");
      SetsmartBuyData(result.Detail.ProductsType);
    } else {
      SetsmartBuyData(result.Detail.ProductsType);
    }
  };
  var AcceptPlanBtns = async () => {
    if (!countryBox || !numberBox || !ProductTypeBox) {
      alert("Please select all fields!");
    }
    var productCatId = countryBox.current.value;
    const productPrice = numberBox.current.value;
    const productSubCatId = ProductTypeBox.current.value;
    const productCategoryDetails = $("#country option:selected").text();

    const productSubCategoryDetails = $(
      "#selectcustomSelect option:selected"
    ).text();

    const obj = {
      productCategoryDetails,
      productSubCategoryDetails,
      productPrice,
      productCatId,
      productSubCatId,
    };
    dispatch(ChangeSbDetails(obj));
    console.log("productPrice", productPrice);
    if (!productCatId || !productSubCatId || !productPrice) {
      alert("Please select all fields!");
    } else {
      try {
        Get(
          `${ServerApiSmartBuy.GetPlanPriceDetails}?productCatId=${productCatId}&productSubCatId=${productSubCatId}&productPrice=${productPrice}`,
          tokenSb
        )
          .then(handleResponse)
          .then(processGetSmartBuyPlanBtns)
          .catch(handleErrorBody);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const processGetSmartBuyPlanBtns = (result) => {
    if (result.Status) {
      $("#plan").show();
      $("#NoPlanPriceFound").addClass("d-none");
      $("#PlanPriceFound").removeClass("d-none");

      setIsShown((current) => !current);
      SetsmartDetail(result.Detail);

      var FromResult = { isActive: true, result: result.Detail };
      dispatch(SmartBuySbDetails(FromResult));
      myRef.current.scrollIntoView();
      GetPlanDetailsGets();
    } else {
      console.log("result result", result);
    }
  };
  const handleErrorBody = (error) => {
    $("#plan").show();
    $("#PlanPriceFound").addClass("d-none");
    $("#NoPlanPriceFound").removeClass("d-none");
    setIsShown((current) => !current);
    myRefShown.current.scrollIntoView();
  };


  const GetPlanDetailsGets = async () => {
    const CatBoxId = countryBox.current.value;
    const PriceId = numberBox.current.value;
    const SubCatId = ProductTypeBox.current.value;
    try {
      Get(
        `${ServerApiSmartBuy.GetPlanDetailsGet}?productCatId=${CatBoxId}&productSubCatId=${SubCatId}&productPrice=${PriceId}`,
        tokenSb
      )
        .then(handleResponse)
        .then(processGetSmartBuyDetailsGets)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };
  const processGetSmartBuyDetailsGets = (result) => {
    if (result.Status) {
      setSmartDetailPlan(result.Detail);
    } else {
      setSmartDetailPlan(result.Detail);
    }
  };
  const handleCategoryChange = async (selectedCategoryId) => {
    if (selectedCategoryId != 0) {
      $("#selectcustomSelect").removeAttr("disabled");
      GetProdType(selectedCategoryId);
      $("label#select_error").hide();
    } else {
      $("#selectcustomSelect").attr("disabled");
      
      $("label#select_error").show();
    }
  };

  $("#productPrice").on("input", function (e) {
    var inputValue = $(this)
      .val()
      .replace(/[^0-9 \-]/g, "");
    $(this).val(inputValue);
    inputValue = e.target.value;
  });

  var AcceptPlanBtnStep = () => {
    navigation("/product-review");
  };
  return (
    <div>
      <form id="smartSellPlanFormdfgdfg">
        <ul class="navbar-nav aw-overflow-hidden flex-lg-row justify-content-between align-items-center container p-0 appliance_card_nav2">
          <li class="nav-item appliances_card w-100 position-relative">
            <div class="form-group floating-group floating-diff button dropdowns">
              <label class="floating-label">Product Group</label>
              <select
                ref={countryBox}
                onChange={(e) => handleCategoryChange(e.target.value)}
                id="country"
                class="form-control1 floating-control select2-results__options bg-white"
              >
                <option
                  className="select2-selection select2-selection--single"
                  disabled
                  selected
                  hidden
                >
                  Product group
                </option>
                {smart.map((obj) => {
                  return (
                    <option
                      className="select2-results__option select2-results__option--selectable"
                      value={obj.Id}
                    >
                      {obj.Description}
                    </option>
                  );
                })}
                <label
                  for="id_url"
                  class="error"
                  id="select_error"
                  style={{ color: "red" }}
                ></label>
              </select>
            </div>
          </li>
          <span class="border-start"></span>
          <li class="nav-item appliances_card w-100 position-relative">
            <div class="form-group select2Part w-100 floating-group  button dropdowns">
              <label class="floating-label">Product Type</label>
              <select
                class=" form-control1 customSelect floating-control custom-select bg-white"
                id="selectcustomSelect"
                ref={ProductTypeBox}
                name="GetProductTypeAPI"
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option
                  className="select2-results__options"
                  disabled
                  selected
                  hidden
                  value="0"
                >
                  Product type
                </option>

                {smartData.map((obj) => {
                  return (
                    <option className="select2-results__options" value={obj.Id}>
                      {obj.Description}
                    </option>
                  );
                })}
                <label
                  for="id_url"
                  class="error"
                  id="select_error1"
                  style={{ color: "red" }}
                ></label>
              </select>
            </div>
          </li>

          <span class="border-start"></span>
          <li class="nav-item appliances_card w-100 position-relative form-floating">
            <span class="floating-label">&#8377;</span>
            <input
              ref={numberBox}
              type="text"
              class="aw-shadow-none w-100 aw-h-70 border-0 bg-white"
              maxlength="8"
              size="10"
              name="productPrice"
              id="productPrice"
              autoComplete="off"
              autoCorrect="off"
              autoFocus='off'
              autoSave="off"
              autoCapitalize='off'
            />
          </li>

          <li class="nav-item nxt-btn">
            <Link
              to=""
              class="btn poppins-SemiBold btn-gradient aw-h-70 aw-shadow-none m-0 border-0"
              id="nxt-step"
              onClick={AcceptPlanBtns}
            >
              Next Step
            </Link>
          </li>
        </ul>

        <div
          id="plan"
          style={{ display: "none" }}
          class=" navbar-nav mt-4 flex-lg-col container appliance_card_nav2 p-0 white-bg"
        >
          <h5 class="p-4 blue-color">Plan price</h5>
          <div id="exciting-offers-page">
            <div
              id="smartSellHero"
              style={{
                backgroundImage: `url('/Digi2limage/payment_page2.png')`,
                backgroundRepeat: "round",
                backgroundSize: "cover",
              }}
              class="align-items-xl-center d-flex hero_section px-lg-5"
            >
              <div class="mx-4 pt-lg-4 pt-xl-5 px-xl-5">
                <div class="px-2 px-lg-1 pb-3 product-review-banner-text">
                  <h1 class="poppins-SemiBold lh-base" ref={myRefShown}>
                    Worried about shipping your
                    <br />
                    used appliance to a buyer?
                  </h1>
                  <label>
                    <small>
                      Get FREE doorstep pick up only with a<br />
                      DIGI2L ABB Plan.
                    </small>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="container">
              <div className="row m-1 " id="NoPlanPriceFound">
                <div class="col-md-12 text-center my-3">
                  <h4 class="border rounded p-3">
                    {" "}
                    Price information for your product is currently unavailable.
                  </h4>
                </div>
              </div>

              <div
                className="row mt-3 mb-3 m-1"
                id="PlanPriceFound"
                ref={myRef}
              >
                <div class="col-lg-4 ">
                  <div class="card card p-3 my-2 " style={{ height: "88px" }}>
                    <h6 class="card__name">Plan price</h6>
                    <p>
                      <span class="card__priceSpan">
                        ₹ {smartDetail.planprice}
                      </span>
                    </p>
                  </div>
                </div>

                <div class=" col-lg-4 ">
                  <div class="card card p-3 my-2" style={{ height: "88px" }}>
                    <h6 class="card__name">Plan period</h6>
                    <p>
                      <span class="card__priceSpan">
                        {smartDetail.planduration}
                      </span>
                    </p>
                  </div>
                </div>

                <div class=" col-lg-4 ">
                  <div class="card card p-3 my-2" style={{ height: "88px" }}>
                    <h6 class="card__name">No claim period</h6>
                    <p>
                      <span class="card__priceSpan">
                        {smartDetail.NoClaimPeriod}
                      </span>
                    </p>
                  </div>
                </div>

                <div class="m-0 mt-0 mt-3 plan-price-tbl row">
                  <div>
                    <table
                      class="table table-bordereddsdsd m-0"
                      id="planPriceDetailList"
                    >
                      <thead className="thead22">
                        <tr className="text-center">
                          <th className="text-center">Duration in months</th>
                          <th className="text-center">Return percentage</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {smartDetailPlan.map((obj) => {
                          return (
                            <>
                              <tr>
                                <td className="text-center">
                                  {obj.From_month}-{obj.To_month}
                                </td>
                                <td className="text-center">
                                  {obj.Assured_BuyBack_Percentage}%
                                </td>
                              </tr>
                            </>
                          );
                        })}
                        {/* 
                        <tr>
                          <td className="text-center">13-24</td>
                          <td className="text-center">50%</td>
                        </tr>
                        <tr>
                          <td className="text-center">25-36</td>
                          <td className="text-center">40%</td>
                        </tr>
                        <tr>
                          <td className="text-center">37-48</td>
                          <td className="text-center">30%</td>
                        </tr>
                        <tr>
                          <td className="text-center">49-60</td>
                          <td className="text-center">20%</td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="row m-0 px-4">
                  <button
                    class="btn poppins-SemiBold btn-gradient w-100 aw-shadow-none my-4 border-0"
                    id="AcceptPlanBtn"
                    onClick={AcceptPlanBtnStep}
                  >
                    ACCEPT PLAN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
