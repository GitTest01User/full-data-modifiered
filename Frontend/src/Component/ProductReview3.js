import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useAuthContext } from "./LocalData/AuthToken";
import ServerApiSmartBuy from "../WebService/Server/ServerApiSmartBuy";

import CryptoJS from "crypto-js";

import { ProductReview4 } from "./ProductReview4";

import { PostData } from "../WebService/Fuction/Post";
export default function ProductReview3() {
  var { detailSb, tokenSb, customerSb, productSb } = useAuthContext();

  var [isAlertVisible, setIsAlertVisible] = useState(false);

  var [PaymentLink, SetPaymentLink] = useState("");

  var [PaymentLoading, SetPaymentLoading] = useState("d-none");
  useEffect(() => {}, [detailSb, tokenSb, customerSb, productSb]);
  var productCategoryDetails = detailSb.productCategoryDetails;
  var productSubCategoryDetails = detailSb.productSubCategoryDetails;
  var productProductCatId = detailSb.productCatId;
  var ProductTypeId = detailSb.productSubCatId;

  var productPrice = detailSb.productPrice;

  var FullName = customerSb.obj.firstName;
  var lastName = customerSb.obj.lastName;
  var MobileNumber = customerSb.obj.tel;
  var Email = customerSb.obj.email;
  var AddressLine1 = customerSb.obj.addressOne;
  var AddressLine2 = customerSb.obj.addressTwo;
  var City = customerSb.obj.city;
  var PinCode = customerSb.obj.PinCode;
  var State = customerSb.obj.state;

  var Brand = productSb.obj.Brand;
  var BrandIdDetail = productSb.obj.BrandId;
  var InvoiceNumber = productSb.obj.InvoiceNumber;
  var Serial = productSb.obj.Serial;
  var InvoiceImage = productSb.obj.InvoiceImage;
  var InvoiceDate = productSb.obj.InvoiceDate;
  var base64Images = productSb.obj.base64Image;

  const PostABBOrder = async () => {
    const raw = JSON.stringify({
      CustFirstName: FullName,
      CustLastName: lastName,
      CustMobile: MobileNumber,
      CustEmail: Email,
      CustAddress1: AddressLine1,
      CustAddress2: AddressLine2,
      Customer_Location: "test",
      CustPinCode: PinCode,
      CustCity: City,
      CustState: State,
      NewProductCategoryId: productProductCatId,
      NewProductCategoryTypeId: ProductTypeId,
      NewBrandId: BrandIdDetail,
      NewSize: "test",
      ProductSrNo: Serial,
      ModelNumberId: 2,
      ABBPlanName: "test",
      InvoiceDate: InvoiceDate,
      InvoiceNo: InvoiceNumber,
      InvoiceImage: InvoiceImage,
      ABBPlanPeriod: "test",
      NoOfClaimPeriod: "6",
      ProductNetPrice: productPrice,
      PlanPrice: 699,
      BrandName: Brand,
      ModelName: "test",
      Base64StringValue: base64Images,
      imageName: "INVOICE",
    });
    setIsAlertVisible(true);
    try {
      PostData(ServerApiSmartBuy.PostAbbOrderPlace, raw, tokenSb)
        .then(handleResponse)
        .then(processGetABBOrder)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const processGetABBOrder = (dataBase) => {
    console.log("dataBase", dataBase);
    setIsAlertVisible(false);
    if (dataBase.Status) {
      encryptValue(dataBase.Detail.orderRegdNo);
    } else {
      encryptValue(dataBase.Detail.orderRegdNo);
    }
  };

  const encryptValue = (orderRegdNo) => {
    const key = CryptoJS.enc.Utf8.parse("Z9GAU91GKU3DIWXR035K71IUDZ3BKHOU");
    const iv = CryptoJS.enc.Utf8.parse("TIRC0VMIDJ2NJ98D");

    const encrypt = (text, key, iv) => {
      const encrypted = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(text),
        key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
      return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    };

    const fullName = encrypt(`${FullName} ${lastName}`, key, iv);
    const custFirstName = encrypt(FullName, key, iv);
    const custLastName = encrypt(lastName, key, iv);
    const custEmail = encrypt(Email, key, iv);
    const custMobile = encrypt(MobileNumber, key, iv);
    const custAddress = encrypt(AddressLine1, key, iv);
    const custAddress2 = encrypt(AddressLine2, key, iv);
    const planPrice = encrypt("699", key, iv);
    const productCategoryId = encrypt(productProductCatId.toString(), key, iv);
    const productTypeId = encrypt(ProductTypeId.toString(), key, iv);
    const state = encrypt(State, key, iv);
    const city = encrypt(City, key, iv);
    const pincode = encrypt(PinCode.toString(), key, iv);
    const moduleName = encrypt("WEB", key, iv);
    const encryptedOrderRegdNo = encrypt(orderRegdNo, key, iv);

    const ivBase64 = CryptoJS.enc.Base64.stringify(iv);

    const plaintext = `name=${fullName}&Firstname=${custFirstName}&Lastname=${custLastName}&email=${custEmail}&contactNumber=${custMobile}&address=${custAddress}&address1=${custAddress}&address2=${custAddress2}&planPrice=${planPrice}&RegdNo=${encryptedOrderRegdNo}&productCategory=${productCategoryId}&ProductType=${productTypeId}&state=${state}&city=${city}&pincode=${pincode}&ModuleName=${moduleName}&iv=${ivBase64}`;
    setIsAlertVisible(false);
    SetPaymentLoading("d-block");
    const paymentURL = `https://utcbridge.com/UTCAPI/ABB/CreateOrder?${plaintext}`;
    SetPaymentLink(paymentURL);
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

  return (
    <div>
      <title>Product Review 3 &#8211; Digi2L</title>
      <div>
        <section>
          <div id="exciting-offers-page">
            <div
              id="smartSellHero"
              style={{
                backgroundImage: `url('/Digi2limage/payment_page1.png')`,
                backgroundRepeat: "round",
                backgroundSize: "cover",
              }}
              class="align-items-xl-center d-flex hero_section px-lg-5"
            >
              <div class="mx-4 pt-lg-4 pt-xl-5 px-xl-5">
                <div class="px-2 px-lg-1 pb-3 product-review-banner-text">
                  <h1 class="poppins-SemiBold lh-base">
                    Decide your appliance’s resale price
                    <br />
                    on the day of purchase.
                  </h1>
                  <label>
                    <small>
                      Get Assured Buyback Value only with a <br /> DIGI2L ABB
                      Plan.
                    </small>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="product-review-form">
          <div class="py-5">
            <div class="text-center">
              <h3 class="poppins-SemiBold main_heading lh-base">
                Review your product details
              </h3>
            </div>
            <div class="container">
              <ul class="navbar-nav flex-lg-row justify-content-between my-5 p-0 align-items-center container appliance_card_nav ">
                <li class="nav-item  text-start px-3 appliances_card w-100">
                  <label class="mark-Light">
                    <small>Product group</small>
                  </label>
                  <p class="poppins-Medium para_first m-0">
                    {productCategoryDetails}
                  </p>
                </li>
                <span class="border-start d-none d-md-block"></span>
                <span class="border-bottom d-block d-md-none"></span>
                <li class="nav-item  px-3 appliances_card w-100">
                  <label class="mark-Light">
                    <small>Product type</small>
                  </label>
                  <p class="poppins-Medium para_first m-0">
                    {productSubCategoryDetails}
                  </p>
                </li>
                <span class="border-start d-none d-md-block"></span>
                <span class="border-bottom d-block d-md-none"></span>
                <li class="nav-item  px-3 appliances_card w-100">
                  <p class="mark-Bold para_first m-0">
                    &#8377; <span class="poppins-Regular">{productPrice}</span>
                  </p>
                </li>
              </ul>
            </div>
            <div class="align-items-center container d-flex justify-content-center mb-lg-5 pb-lg-5 px-4 px-lg-0">
              <div class="progresses mobile-only" style={{ width: "90%" }}>
                <span class="d-none sdsdsdline active"></span>
                <div class="steps active">
                  <span>2</span>
                </div>
                <span class="step-label active">Product details</span>
                <div class="progress sdsdsdline">
                  <div
                    class="progress-bar w-15"
                    role="progressbar"
                    aria-valuenow="15%"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div class="desktop-only justify-content-center progresses">
                <span class="d-none sdsdsdline active"></span>
                <div class="steps active">
                  <span>1</span>
                  <span class="step-label active">Customer details</span>
                </div>
                <div class="progress sdsdsdline">
                  <div
                    class="progress-bar w-100"
                    role="progressbar"
                    aria-valuenow="15%"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>

                <div class="steps active">
                  <span>2</span>
                  <span class="step-label active">Product details</span>
                </div>
                <div class="progress sdsdsdline">
                  <div
                    class="progress-bar w-100"
                    role="progressbar"
                    aria-valuenow="15%"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div class="steps active">
                  <span>3</span>
                  <span class="step-label active">Order summary</span>
                </div>
                <span class="sdsdsdline"></span>
                <div class="steps">
                  <span>4</span>
                  <span class="step-label">Payment details</span>
                </div>
                <span class="d-none sdsdsdline"></span>
              </div>
            </div>

            <div class="container px-5 px-lg-0 review-container">
              <div class="row gx-5 gy-4 mt-4 review-form order-summary">
                <div class="col-12">
                  <h5 class="w-100 p-0 mb-2">Review your order</h5>
                </div>
                <div class="col-md-6">
                  <h6 class="mb-4">Customer details</h6>
                  <ul class="navbar-nav">
                    <li class="nav-item py-3 px-4 mb-3 appliance_card_nav w-100">
                      <label>
                        <small>Full name</small>
                      </label>
                      <p class="mark-Medium my-2 mt-3">
                        {FullName} {lastName}
                      </p>
                    </li>

                    <li class="nav-item py-3 px-4 mb-3 appliance_card_nav w-100">
                      <label>
                        <small>Mobile number</small>
                      </label>
                      <p class="mark-Medium my-2 mt-3">{MobileNumber}</p>
                    </li>

                    <li class="nav-item py-3 px-4 mb-3 appliance_card_nav w-100">
                      <label>
                        <small>Email</small>
                      </label>
                      <p class="mark-Medium my-2 mt-3">{Email}</p>
                    </li>

                    <li class="nav-item py-3 px-4 mb-3 appliance_card_nav w-100">
                      <label>
                        <small>Address line 1</small>
                      </label>
                      <p class="mark-Medium my-2 mt-3">{AddressLine1}</p>
                    </li>

                    <li class="nav-item py-3 px-4 mb-3 appliance_card_nav w-100">
                      <label>
                        <small>Address line 2</small>
                      </label>
                      <p class="mark-Medium my-2 mt-3">{AddressLine2}</p>
                    </li>

                    <li class="nav-item py-3 px-4 mb-3 appliance_card_nav w-100">
                      <label>
                        <small>City, Pincode and State</small>
                      </label>
                      <p class="mark-Medium my-2 mt-3">
                        {City}-{PinCode}, {State}
                      </p>
                    </li>
                  </ul>
                </div>
                <div class="col-md-6">
                  <h6 class="mb-4">Product details</h6>
                  <ul class="navbar-nav">
                    <li class="nav-item py-3 px-4 mb-3 appliance_card_nav w-100">
                      <label>
                        <small>Product details</small>
                      </label>

                      <p class="mark-Medium my-2 mt-3">
                        {Brand}
                        <span className="p-1">|</span>
                        {productCategoryDetails}
                        <span className="p-1">|</span>
                        {productSubCategoryDetails}
                      </p>
                    </li>

                    <li class="nav-item py-3 px-4 mb-3 appliance_card_nav w-100">
                      <label>
                        <small>Invoice number</small>
                      </label>
                      <p class="mark-Medium my-2 mt-3">{InvoiceNumber}</p>
                    </li>

                    <li class="nav-item py-3 px-4 mb-3 appliance_card_nav w-100">
                      <label>
                        <small>Product serial number</small>
                      </label>
                      <p class="mark-Medium my-2 mt-3">{Serial}</p>
                    </li>

                    <li class="nav-item py-3 px-4 mb-3 appliance_card_nav w-100">
                      <label>
                        <small>Invoice date</small>
                      </label>
                      <p class="mark-Medium my-2 mt-3">{InvoiceDate}</p>
                    </li>

                    <li class="nav-item py-3 px-4 mb-3 appliance_card_nav w-100">
                      <label>
                        <small>Invoice image</small>
                      </label>
                      <p class="mark-Medium my-2 mt-3"> {InvoiceImage}</p>
                    </li>
                  </ul>
                </div>

                <div class="col-12 d-flex btn-wrapper justify-content-end">
                  <div id="Processbtns">
                    <Link
                      to="/product-review2"
                      class="btn btn-purple-secondary poppins-Medium mx-lg-3 py-3 px-5 gobackbtn"
                      type="button"
                    >
                      PREVIOUS
                    </Link>
                    {isAlertVisible ? (
                      <img src="./loader-large.gif" style={{ width: "54px" }} />
                    ) : (
                      <Link
                        class="btn btn-gradient poppins-Medium py-3 px-5"
                        id="PostABBOrderbtn"
                        onClick={PostABBOrder}
                      >
                        NEXT STEP
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
        <ProductReview4 value={PaymentLink} valueClass={PaymentLoading} />
      </div>
    </div>
  );
}
