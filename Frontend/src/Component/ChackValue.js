import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ServerAPI from "../WebService/Server/ServerAPI";
import NumberModal from "./AddComponenet/NumberModal";
import ProgressSmatSell from "./AddComponenet/ProgressSmatSell";
import $ from "jquery";
import { useAuthContext } from "./LocalData/AuthToken";
import { useDispatch } from "react-redux";
import { ASPPriceDetails } from "../Redux/ASPSclice";
import Get from "../WebService/Fuction/Get";

export default function ChackValue() {
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { token, detail } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [checkPrice, setCheckPrice] = useState([]);
  const [checkPriceImage, setCheckPriceImage] = useState([]);

  const {
    ProductCategory,
    ProductCatId,
    ProductType,
    ProductTypeId,
    ProductBrand,
    ProductBrandId,
    productTechnology,
    productTechnologyId,
  } = detail;
  useEffect(() => {
    $(".progress-bar").css("width", "10%");

    fetchPriceData();
    fetchImageData();
  }, [detail, token]);

  const fetchPriceData = async () => {
    try {
      Get(
        `${ServerAPI.GetProductASP}?producttypeid=${ProductTypeId}&techid=${productTechnologyId}&brandid=${ProductBrandId}`,
        token
      )
        .then(handleResponse)
        .then(processGetPriceData)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const processGetPriceData = (result) => {
    if (result.status) {
      setCheckPrice(result.data);
      dispatch(ASPPriceDetails(result.data));
      $("#AverageSellingPrice").val(result.data.averageSellingPrice);
      $("#ExcellentPrice").val(result.data.excellentPrice);
      $("#GetPriceBtn").prop("disabled", false);
      $("#GetPriceBtnDirect").prop("disabled", false);
    } else {
      navigation("/smart-sell");
      $("#GetPriceBtn").prop("disabled", true);
      $("#GetPriceBtnDirect").prop("disabled", true);
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

  const fetchImageData = async () => {
    setLoading(true);
    setIsAlertVisible(true);

    try {
      Get(`${ServerAPI.GetProductType}?catId=${ProductCatId}`, token)
        .then(handleResponse)
        .then(processGetPriceImage)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const processGetPriceImage = (result) => {
    if (result.status) {
      setLoading(false);
      setIsAlertVisible(false);
      setCheckPriceImage(result.data);
    } else {
      navigation(-1);
    }
  };

  return (
    <div>
      <title>Value Check &#8211; Digi2L</title>
      <div className="mt-3 bg-white d-none d-lg-block">
        <div className=" container pt-lg-3 py-3">
          <h1 className="poppins-SemiBold  text-center">
            Get Smart Sell Value
          </h1>
        </div>
      </div>
      <div className="mt-3  bg-light d-lg-none d-sm-block">
        <div className=" container pt-lg-3 py-3">
          <h1 className="poppins-SemiBold  text-center">
            Get Smart Sell Value
          </h1>
        </div>
      </div>
      <div></div>
      <div>
        <div className=" container pt-lg-3 py-3">
          <nav className="demo2" aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">Smart Sell </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to="#">{ProductCategory} </Link>
              </li>
            </ol>
          </nav>

          <ProgressSmatSell />
        </div>
        <div className="container mb-5 p-4">
          <div className="row d-flex justify-content-center valuecheckwrap">
            <h2 className="ps-2 text-center mb-4" id="ssm">
              Smart Sell <img id="tick" src="/Digi2limage/check-1.svg" />
              Guarantees the Best Price of your Appliance
            </h2>
            <div className="col-md-12" id="pd">
              <div className="row">
                <div className="col-md-4" id="ap">
                  <div className="mt-4 mb-3">
                    <span id="aps" className="text-uppercase text-muted brand">
                      APPLIANCE CATEGORY
                    </span>
                    <p id="pdp">{ProductCategory} </p>
                  </div>
                </div>

                <div className="col-md-4" id="ct">
                  <div className="mt-4 mb-3">
                    <span id="cts" className="text-uppercase text-muted brand">
                      Product Type
                    </span>
                    <p id="ctp">{ProductType}</p>
                  </div>
                </div>
                <div className="col-md-4" id="bd">
                  <div className="mt-4 mb-3">
                    <span id="bds" className="text-uppercase text-muted brand">
                      Product Brand
                    </span>
                    <p id="bdp">{ProductBrand}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="images m-auto mh-100 mt-5 p-3">
                    <div className="text-center p-4">
                      {checkPriceImage.map((obj) => {
                        if (obj.id == ProductTypeId) {
                          return (
                            <div key={obj.id}>
                              <img
                                id="main-image"
                                src={obj.productTypeImage}
                                alt={obj.productTypeName}
                              />
                            </div>
                          );
                        }
                        return null;
                      })}

                      {isAlertVisible ? (
                        <>
                          <div className="loader">
                            <div class="loaderwrap">
                              <img src="/Digi2limage/digi2l-gif.gif" />
                              <p>Please Wait ...</p>
                            </div>
                          </div>
                        </>
                      ) : null}
                      {loading ? (
                        <>
                          <div className="m-auto main-image spinner"></div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="product productPricebox p-4">
                    <div className="mt-4 mb-3">
                      <span
                        className="text-uppercase text-muted brand fw-semibold"
                        style={{ fontWeight: "500" }}
                      >
                        GET UPTO
                      </span>

                      <h2 id="prex" className="text-uppercase">
                        ₹ {checkPrice.averageSellingPrice}
                      </h2>
                    </div>
                    <div className="cart mt-2 align-items-center justify-content-sm-center">
                      <NumberModal />
                    </div>
                    <span className="disclaimertxt">
                      <span style={{ color: "#CF332F" }}>*</span> T&amp;C apply.
                      Product Must Be Ready and uninstalled for pickup.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container ps-sm-5">
          <div className="row">
            <div className="col-lg-12 col-12">
              <h2 className="mb-5 poppins-SemiBold text-center">
                Know how it works?
              </h2>
            </div>
          </div>
          <div className="row ps-5 p-sm-5  knowhowitworks">
            <div className="col-lg-4 col-md-4 col-12 mb-3">
              <div className="card" style={{ borderRadius: "35px" }}>
                <img src="/Digi2limage/self-qc.png" />
                <div
                  className="card-body"
                  style={{
                    height: "100px",
                    marginTop: "-50px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #B4A8A8",
                    borderRadius: "15px",
                  }}
                >
                  <p
                    className="card-text text-center pt-3"
                    style={{
                      fontSize: "normal",
                      fontWeight: "500",
                      textAlign: "center",
                      color: "#170F49",
                    }}
                  >
                    Get self quality check done at your comfort.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-12 mb-3">
              <div className="card" style={{ borderRadius: "35px" }}>
                <img src="/Digi2limage/doorstep-pickup.png" />
                <div
                  className="card-body"
                  style={{
                    height: "100px",
                    marginTop: "-50px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #B4A8A8",
                    borderRadius: "15px",
                  }}
                >
                  <p
                    className="card-text text-center pt-3"
                    style={{
                      fontSize: "normal",
                      fontWeight: "500",
                      textAlign: "center",
                      color: "#170F49",
                    }}
                  >
                    Get free doorstep pickup of your appliances.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-12 mb-3">
              <div className="card" style={{ borderRadius: "35px" }}>
                <img src="/Digi2limage/instant-payment.png" />
                <div
                  className="card-body"
                  style={{
                    height: "100px",
                    marginTop: "-50px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #B4A8A8",
                    borderRadius: "15px",
                  }}
                >
                  <p
                    className="card-text text-center pt-3"
                    style={{
                      fontSize: "normal",
                      fontWeight: "500",
                      textAlign: "center",
                      color: "#170F49",
                    }}
                  >
                    Instant payment at pickup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section_bg py-5">
        <div className="container">
          <div className="row mb-3">
            <div className="col-lg-12 col-12">
              <h2
                className="text-center poppins-SemiBold"
                style={{ color: "#170F49" }}
              >
                Recommended by 50 thousand customers
              </h2>
            </div>
          </div>
          <div className="row  pb-3">
            <div className="col-lg-4 col-md-4 col-12 mb-3">
              <img src="/Digi2limage/Frame1.png" className="card-img-top" />
            </div>
            <div className="col-lg-4 col-md-4 col-12 mb-3">
              <img src="/Digi2limage/Frame2.png" className="card-img-top" />
            </div>
            <div className="col-lg-4 col-md-4 col-12 mb-3">
              <img src="/Digi2limage/Frame3.png" className="card-img-top" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
