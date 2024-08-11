import React, { useEffect, useState } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Menu from "../../Component/Menu";
import Footer from "../../Component/Footer";
import Home from "../../Component/Home";
import SmartSell from "../../Component/SmartSell";
import SmartBuy from "../../Component/SmartBuy";
import About from "../../Component/About";
import Excitingoffers from "../../Component/Excitingoffers";
import ResellerEnquiry from "../../Component/ResellerEnquiry";
import CircularEconomy from "../../Component/CircularEconomy";
import Blogs from "../../Component/Blogs";
import Press from "../../Component/Press";
import FAQ from "../../Component/FAQ";
import SuccessStories from "../../Component/SuccessStories";
import SuccessStoriesbosch from "../../Component/DetaliPage/SuccessStoriesDetail";
import BlogDetail from "../../Component/DetaliPage/BlogDetail";
import Exchange from "../../Component/Exchange";
import BuybackPlan from "../../Component/BuybackPlan";
import EnterpriseSales from "../../Component/EnterpriseSales";
import ProgramPartnership from "../../Component/ProgramPartnership";
import LogisticsPartnership from "../../Component/LogisticsPartnership";
import Contact from "../../Component/Contact";

import SmartSellAirConditioner from "../../Component/SmartSellAirConditioner";
import SmartSellRefrigerator from "../../Component/SmartSellRefrigerator";
import SmartSellTv from "../../Component/SmartSellTv";
import SmartSellWashingMachine from "../../Component/SmartSellWashingMachine";
import CustomerReviews from "../../Component/CustomerReviews";
import ChackValue from "../../Component/ChackValue";
import GetExactValue from "../../Component/GetExactValue";
import Thankyou from "../../Component/Thankyou";
import CorporateEnquiry from "../../Component/CorporateEnquiry";
import Redeem from "../../Component/Redeem";
import SmartDetailSell from "../../Component/DetaliPage/SmartDetailSell";
import SmartSellKnowMore from "../../Component/DetaliPage/SmartSellKnowMore";
import SmartSellKnowMore2 from "../../Component/DetaliPage/SmartSellKnowMore2";
import Sitemap from "../../Component/Sitemap";
import ExchangeVideoQR from "../../Component/AddComponenet/ExchangeVideoQR";
import OfferDigi2l from "../../Component/AddComponenet/OffierDigi2l";
import PageNotFound from "../../Component/PageNotFound";

import PolicyDetail from "../../Component/PolicyDetail";

import ProductReviews from "../../Component/ProductReviews";
import ProductReviews2 from "../../Component/ProductReviews2";
import ProductReview3 from "../../Component/ProductReview3";
import PrivateRoute, {
  PrivateRouteSmartBuyOneValue,
  PrivateRouteSmartBuyTwoValue,
  PrivateRouteSmartBuyValue,
  PrivateRouteValue,
} from "./PrivateRoute";
import Token from "../Server/Token";
import WebService from "../WebService";
import APi from "../APi";
import { ProductReview4 } from "../../Component/ProductReview4";

export default function UseRoutes() {
  var [routers, setRouters] = useState([]);
  var location = useLocation();
  var data = async () => {
    // const response = await WebService.GetApiCall(`${APi.BrowserRouteGetApi}`);
    // if (response.data.result.length == 0) {
    //   console.log("Routes Data : ", response.data.result);
    //   // Navigate to "*" route if condition is met

    // } else {
    //   setRouters(response.data.result);
    //   console.log("Routes Data else: ", response.data.result);
    // }

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:8000/Status/Digi2l/BrowserRouter", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setRouters(result.result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    data();
  }, []);
  var dynamicPath = "";
  var dynamicElement = "";

  return (
    <div>
      <Menu />
      <Routes>
        {routers.map((obj) => {
          if (obj != null) {
            dynamicPath = obj.BrowserRouterPermaLink;
            if (obj.BrowserRoutersId == 2) {
              dynamicElement = <About />;
            } else if (obj.BrowserRoutersId == 3) {
              dynamicElement = <SmartSell />;
            } else if (obj.BrowserRoutersId == 4) {
              dynamicElement = <SmartBuy />;
            } else if (obj.BrowserRoutersId == 5) {
              dynamicElement = <Excitingoffers />;
            } else if (obj.BrowserRoutersId == 6) {
              dynamicElement = <ResellerEnquiry />;
            } else if (obj.BrowserRoutersId == 7) {
              dynamicElement = <Blogs />;
            } else if (obj.BrowserRoutersId == 8) {
              dynamicElement = <Press />;
            } else if (obj.BrowserRoutersId == 9) {
              dynamicElement = <FAQ />;
            } else if (obj.BrowserRoutersId == 10) {
              dynamicElement = <SuccessStories />;
            } else if (obj.BrowserRoutersId == 11) {
              dynamicElement = <CustomerReviews />;
            } else if (obj.BrowserRoutersId == 12) {
              dynamicElement = <LogisticsPartnership />;
            } else if (obj.BrowserRoutersId == 13) {
              dynamicElement = <Contact />;
            } else if (obj.BrowserRoutersId == 20) {
              dynamicElement = <SmartSellAirConditioner />;
            } else if (obj.BrowserRoutersId == 21) {
              dynamicElement = <SmartSellRefrigerator />;
            } else if (obj.BrowserRoutersId == 22) {
              dynamicElement = <BlogDetail />;
            } else if (obj.BrowserRoutersId == 23) {
              dynamicElement = <SuccessStoriesbosch />;
            } else if (obj.BrowserRoutersId == 24) {
              dynamicElement = <Exchange />;
            } else if (obj.BrowserRoutersId == 25) {
              dynamicElement = <BuybackPlan />;
            } else if (obj.BrowserRoutersId == 26) {
              dynamicElement = <CircularEconomy />;
            } else if (obj.BrowserRoutersId == 27) {
              dynamicElement = <EnterpriseSales />;
            } else if (obj.BrowserRoutersId == 28) {
              dynamicElement = <ProgramPartnership />;
            } else if (obj.BrowserRoutersId == 29) {
              dynamicElement = <SmartSellTv />;
            } else if (obj.BrowserRoutersId == 30) {
              dynamicElement = <SmartSellWashingMachine />;
            } else if (obj.BrowserRoutersId == 31) {
              dynamicElement = <Redeem />;
            } else if (obj.BrowserRoutersId == 32) {
              dynamicElement = <SmartDetailSell />;
            } else if (obj.BrowserRoutersId == 33) {
              dynamicElement = <ChackValue />;
            } else if (obj.BrowserRoutersId == 34) {
              dynamicElement = <GetExactValue />;
            } else if (obj.BrowserRoutersId == 35) {
              dynamicElement = <Thankyou />;
            } else if (obj.BrowserRoutersId == 36) {
              dynamicElement = <CorporateEnquiry />;
            } else if (obj.BrowserRoutersId == 37) {
              dynamicElement = <SmartSellKnowMore />;
            } else if (obj.BrowserRoutersId == 38) {
              dynamicElement = <SmartSellKnowMore2 />;
            } else if (obj.BrowserRoutersId == 39) {
              dynamicElement = <Sitemap />;
            } else if (obj.BrowserRoutersId == 40) {
              dynamicElement = <ExchangeVideoQR />;
            } else if (obj.BrowserRoutersId == 42) {
              dynamicElement = <PageNotFound />;
            } else if (obj.BrowserRoutersId == 1043) {
              dynamicElement = <PolicyDetail />;
            } else if (obj.BrowserRoutersId == 1044) {
              dynamicElement = <About />;
            } else if (obj.BrowserRoutersId == 1045) {
              dynamicElement = <Sitemap />;
            } else {
              dynamicPath = "/";
              dynamicElement = <Home />;
            }

            if (dynamicElement) {
              return (
                <>
                  <Route path={dynamicPath} element={dynamicElement}>
                    {obj.BrowserRouterTitle}
                  </Route>
                </>
              );
            } else {
              <Route path="*" element={<PageNotFound />}></Route>;
            }
          }
        })}

        <Route path="/corporate-enquiry" element={<CorporateEnquiry />}>
          <Route path="exchange" element={<Exchange />}></Route>
        </Route>

        {/* <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}>
          About
        </Route>
        <Route path="/smart-sell/" element={<SmartSell />}>
          SmartSell
        </Route>
        <Route path="/assured-buyback/" element={<SmartBuy />}>
          SmartBuy
        </Route>
        <Route path="/exciting-offers/" element={<Excitingoffers />}>
          ExcitingOffers
        </Route>
        <Route path="/reseller-enquiry/" element={<ResellerEnquiry />}>
          ResellerEnquire
        </Route>
      
        <Route path="/press/" element={<Press />}>
          Press
        </Route>
        <Route path="/faq/" element={<FAQ />}>
          FAQ
        </Route>
        <Route path="/success-stories/" element={<SuccessStories />}>
          SuccessStories
        </Route>
        <Route path="/customer-reviews/" element={<CustomerReviews />}></Route>
        <Route
          path="/corporate-enquiry/logistics-partnership/"
          element={<LogisticsPartnership />}
        ></Route>
        <Route path="/contactUs/" element={<Contact />}></Route>
        <Route
          path="/smart-sell-air-conditioner/"
          element={<SmartSellAirConditioner />}
        ></Route>
        <Route
          path="/smart-sell-refrigerator/"
          element={<SmartSellRefrigerator />}
        ></Route>
        <Route path="/blogs/:id" element={<BlogDetail />}></Route>
        <Route
          path="/success-stories/:id"
          element={<SuccessStoriesbosch />}
        ></Route>
        <Route path="/corporate-enquiry/exchange/" element={<Exchange />}>
          Exchange
        </Route>
        <Route path="/corporate-enquiry/abb/" element={<BuybackPlan />}>
          BuybackPlan
        </Route>
        <Route
          path="/corporate-enquiry/circular-economy/"
          element={<CircularEconomy />}
        >
          CircularEconomy
        </Route>
        <Route
          path="/corporate-enquiry/enterprise-sales/"
          element={<EnterpriseSales />}
        ></Route>
        <Route
          path="/corporate-enquiry/program-partnership/"
          element={<ProgramPartnership />}
        ></Route>
        <Route path="/smart-sell-tv/" element={<SmartSellTv />}></Route>
        <Route
          path="/smart-sell-washing-machine/"
          element={<SmartSellWashingMachine />}
        ></Route>
        <Route path="/how-to-redeem-guide/" element={<Redeem />}></Route>
        <Route
          path="/smart-sell-tv/know-more-tv/"
          element={<SmartDetailSell />}
        ></Route>
       
        <Route
          path="/corporate-enquiry/"
          element={<CorporateEnquiry />}
        ></Route>
        <Route
          path="/smart-sell-refrigerator/knowmore/"
          element={<SmartSellKnowMore />}
        ></Route>
        <Route
          path="/smart-sell-refrigerator/knowmore-2/"
          element={<SmartSellKnowMore2 />}
        ></Route>
        <Route path="/sitemap" element={<Sitemap />}></Route>
      
        <Route path="/exciting-offers/1" element={<OfferDigi2l />}></Route> */}
        <Route
          path="/corporate-enquiry/exchange/video"
          element={<ExchangeVideoQR />}
        ></Route>
        <Route
          path="/value-check/"
          element={<PrivateRoute Component={<ChackValue />} />}
        />

        <Route
          path="/get-exact-value"
          element={<PrivateRouteValue Component={<GetExactValue />} />}
        ></Route>

        <Route path="/thank-you" element={<Thankyou />}></Route>

        <Route
          path="/product-review"
          element={<PrivateRouteSmartBuyValue Component={<ProductReviews />} />}
        ></Route>
        <Route
          path="/product-review2"
          element={
            <PrivateRouteSmartBuyOneValue Component={<ProductReviews2 />} />
          }
        ></Route>
        <Route
          path="/product-review3"
          element={
            <PrivateRouteSmartBuyTwoValue Component={<ProductReview3 />} />
          }
        ></Route>
        <Route
          path="/product-review4"
          element={
            <PrivateRouteSmartBuyTwoValue Component={<ProductReview4 />} />
          }
        ></Route>
      </Routes>

      <Token />
      <Footer />
    </div>
  );
}
