import React from "react";

import ProductTabForm from "./ProductTabForm";
import { useAuthContext } from "./LocalData/AuthToken";

export default function ProductReviews() {
  var { detailSb } = useAuthContext();

  var productCategoryDetails = detailSb.productCategoryDetails;
  var productSubCategoryDetails = detailSb.productSubCategoryDetails;
  var productPrice = detailSb.productPrice;

  return (
    <div>
      <title>Product Review &#8211; Digi2L</title>
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

          <ProductTabForm />
        </div>
      </section>
    </div>
  );
}
