import React from "react";

export default function ReviewsProgress() {
  return (
    <div>

      <div>
        <div class="align-items-center container d-flex justify-content-center mb-lg-5 pb-lg-5 px-4 px-lg-0">
          <div class="progresses mobile-only " style={{ width: "90%" }}>
            <span class="d-none sdsdsdline active"></span>
            <div class="steps active">
              <span>1</span>
            </div>
            <span class="step-label active">Customer details</span>
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
          <div class="desktop-only justify-content-center ">
            <span class="d-none sdsdsdline active"></span>
            <div class="steps active">
              <span>1</span>
              <span class="step-label active">Customer details</span>
            </div>
            <div class="progress sdsdsdline">
              <div
                class="progress-bar w-15"
                role="progressbar"
                aria-valuenow="15%"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div class="steps">
              <span>2</span>
              <span class="step-label">Product details</span>
            </div>
            <span class="sdsdsdline"></span>
            <div class="steps">
              <span>3</span>
              <span class="step-label">Order summary</span>
            </div>
            <span class="sdsdsdline"></span>
            <div class="steps">
              <span>4</span>
              <span class="step-label">Payment details</span>
            </div>
            <span class="d-none sdsdsdline"></span>
          </div>
        </div>
      </div>
      
    </div>
  );
}
