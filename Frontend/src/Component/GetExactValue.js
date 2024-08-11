import React, { useState } from "react";
import QuestionsBox from "./AddComponenet/QuestionsBox";
import ProgressSmatSell from "./AddComponenet/ProgressSmatSell";

import { useAuthContext } from "./LocalData/AuthToken";

export default function GetExactValue() {
  var { getIsDetailInTC } = useAuthContext();
  var [Detail, setDetail] = useState(getIsDetailInTC);
  const userInfoString = Detail;
   const userInfoCateId = Detail.ProductCatId;
  var AirConditioner = AirConditioner;
  var Category = userInfoString
    ? userInfoString.ProductCategory
    : AirConditioner;
  return (
    <div>
      <title>Get Exact Value &#8211; Digi2L</title>
      <div>
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
        <section>
          <div className="container pt-lg-3 py-3">
          
            <nav className="demo2" aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item">Smart Sell </li>
                <li className="breadcrumb-item">{Category}</li>
                <li className="breadcrumb-item active" aria-current="page">
                  <a href="#">Questionnaire</a>
                </li>
              </ol>
            </nav>
          </div>
          <ProgressSmatSell />
          <QuestionsBox value={userInfoCateId} />
        </section>
      </div>
    </div>
  );
}
