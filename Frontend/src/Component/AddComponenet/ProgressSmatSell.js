import React from "react";

export default function ProgressSmatSell() {
 

  return (
    <div>
      <div>
        <div className="container justify-content-md-center">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              <div className="alert alert-danger d-none"></div>
            </div>
          </div>
          <div className="row">
            <div className="align-items-center container d-flex justify-content-center mb-lg-5 pb-lg-3 px-4 px-lg-0">
              <div className="progresses mobile-only mb-2">
                <span className="d-none sdsdsdlineBox active"></span>
                <div className="steps active">
                  <span>1</span>
                </div>
                <span className="step-label active ">Get Smart Sell Value</span>
                <div className="progress sdsdsdlineBox " style={{ height: "8px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    // style={{ width: "15%" }}
                    aria-valuenow="0%"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>

              <div 
                className="progresses justify-content-center desktop-only"
                style={{ display: "flex !important",width:'100%' }}
              >
                <span className="d-none sdsdsdlineBox active"></span>
                <div className="steps active">
                  <span>1</span>
                  <span className="step-label active">
                    Get Smart Sell Value
                  </span>
                </div>
                <div className="progress sdsdsdlineBox " style={{ height: "8px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "15%" }}
                    aria-valuenow="0%"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div className="steps">
                  <span>2</span>
                  <span className="step-label">Self QC</span>
                </div>
                <span className="sdsdsdlineBox" style={{ height: "8px" }}></span>
                <div className="steps">
                  <span>3</span>
                  <span className="step-label">Door step pickup</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
