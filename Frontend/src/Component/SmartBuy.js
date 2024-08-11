import { Link } from "react-router-dom";
import SmartBuyPlan from "./Slider/SmartBuyPlan";

import PlanFormSmartBuy from "./PlanFormSmartBuy";

import FAQSection from "./FAQ/FAQSection";
import EligibleBuyback from "./AddComponenet/EligibleBuyback";

function SmartBuy() {
  return (
    <>
      <title>Assured-buyback - Resale Value Of Your Appliance | Digi2L</title>

      <section
        className="hero_section smart_buy_hero_section d-flex justify-content-center align-items-xl-center p-5"
        style={{
             backgroundImage: `url(/Digi2limage/smartBuy/new-smart-buy-bg.png)`,
          
          backgroundRepeat: `no-repeat`,
          backgroundSize: `cover`,
        }}
      >
        <div className="smartSellHero py-lg-5 w-100">
          <div className="text-center ps-lg-0 text-white p-4">
            <h1 className="poppins-SemiBold lh-base d-lg-block d-none">
              Buy Smart Buy: Assured Buyback Plan And Ensure <br />
              The Resale Value Of Your Appliance
            </h1>
            <h1 className="poppins-SemiBold lh-base d-block d-lg-none">
              Buy Smart Buy: Assured Buyback Plan And Ensure <br />
              The Resale Value Of Your Appliance
            </h1>
          </div>

          <PlanFormSmartBuy />
        </div>
      </section>

      <section>
        <div id="InvoiceResult"></div>
      </section>

      <section
        id="smart_buy"
        className="container my-3 my-lg-5 px-4 px-lg-0 py-3 py-lg-5 smart_sell_section"
      >
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 px-xl-5 pt-3">
            <h1 className="poppins-SemiBold main_heading  ">
              Smart Buy: Assured Buyback Plan
            </h1>
            <p
              className="lh-base poppins-Medium para_first"
              style={{ fontSize: `14px` }}
            >
              Today, technologies are getting obsolete quickly and product
              features are getting redundant so easily. Upgradation to new
              products has now become a necessity and not just an aspiration.
              The biggest stumbling block to upgrading is how and where to sell
              the fully functional not-so-old used appliances and gadgets. As
              the customer, you can often feel worried about getting the right
              customer, price, and more so trust.{" "}
            </p>
            <p
              className="lh-base poppins-Medium para_first"
              style={{ fontSize: `14px` }}
            >
              {" "}
              Digi2L’s Smart Buy Plan addresses this concern by keeping the
              resale price of the home appliance locked during its purchase.
              It’s a first-of-its kind plan in India that guarantees a fixed
              buyback price for your used home appliances, for up to 5 years
              from the date of purchase.
            </p>
          </div>
          <div className="col-lg-6 order-lg-last order-first pb-4 pb-lg-0 text-center">
            <img
              className="img-fluid"
               src="/Digi2limage/smartBuy/smartBuy.png"
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="d-none d-lg-block">
        <div
          className="text-center py-5 "
          style={{ backgroundColor: `#3C23B6`, height: `300px` }}
        >
          <h1 className="poppins-SemiBold main_heading lh-base text-white text-capitalize">
            Why getting a<br /> Smart Buy: Assured Buyback Plan is a smart
            decision!
          </h1>
        </div>
        <section className="demo3333 mb-5">
          <div
            className="container-xxl pe-0 "
            style={{ transform: `translateY(-120px)` }}
          >
            <div className="owl-slider11">
              <div
                id="SmartBuyPlan11"
                className="owl-carousel11 owl-loaded11 owl-drag11"
              >
                <SmartBuyPlan />
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="d-lg-none d-md-none  ">
        <div
          className="text-center py-5 "
          style={{ backgroundColor: `#3C23B6`, height: `300px` }}
        >
          <h1 className="poppins-SemiBold main_heading lh-base text-white text-capitalize">
            Why getting a<br /> Smart Buy: Assured Buyback Plan is a smart
            decision!
          </h1>
        </div>
        <section className="demo3333dsd mb-5">
          <div
            className="container-xxl pe-0 "
            style={{ transform: `translateY(-85px)` }}
          >
            <div className="owl-slider11">
              <div
                id="SmartBuyPlan11"
                className="owl-carousel11 owl-loaded11 owl-drag11"
              >
                <SmartBuyPlan />
              </div>
            </div>
          </div>
        </section>
      </section>

      <section
        id="how_it_work_section"
        className="how_it_work_section section_bg pb-3"
      >
        <div className="container">
          <div className="text-center pt-5 pb-3 mt-lg-5">
            <h1 className="poppins-SemiBold main_heading lh-base text-capitalize">
              How does it work?
            </h1>
          </div>

          <div className="row align-items-center justify-content-center">
            <div className="col-lg-3 col-11">
              <div
                className="nav flex-column nav-pills me-3 mobile-nav"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  className="nav-link d-inline-block text-start nav_tabs_button poppins-Bold active"
                  id="v-pills-buy-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-buy"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-buy"
                  aria-selected="true"
                >
                  <span className="scrollspy_nav"></span>&nbsp;{" "}
                  <small>Buy Smart Buy:Assured Buyback Plan</small>
                </button>
                <button
                  className="nav-link d-inline-block text-start nav_tabs_button poppins-Bold"
                  id="v-pills-enjoy-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-enjoy"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-enjoy"
                  aria-selected="false"
                >
                  <span className="scrollspy_nav"></span>&nbsp;{" "}
                  <small>Enjoy The Appliances</small>
                </button>
                <button
                  className="nav-link d-inline-block text-start nav_tabs_button poppins-Bold"
                  id="v-pills-quick-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-quick"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-quick"
                  aria-selected="false"
                >
                  <span className="scrollspy_nav"></span>&nbsp;{" "}
                  <small>Quick QC And Pickup</small>
                </button>
                <button
                  className="nav-link d-inline-block text-start nav_tabs_button poppins-Bold"
                  id="v-pills-sit-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-sit"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-sit"
                  aria-selected="false"
                >
                  <span className="scrollspy_nav"></span>&nbsp;{" "}
                  <small>Sit Back And Relax</small>
                </button>
                <button
                  className="nav-link d-inline-block text-start nav_tabs_button poppins-Bold"
                  id="v-pills-payment-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-payment"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-payment"
                  aria-selected="false"
                >
                  <span className="scrollspy_nav"></span>&nbsp;{" "}
                  <small>Payment Credit</small>
                </button>
              </div>
            </div>
            <div className="col-lg-8 col-11">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-buy"
                  role="tabpanel"
                  aria-labelledby="v-pills-buy-tab"
                >
                  <div className="row align-items-center mt-4">
                    <div className="col-md-6 order-lg-first order-last py-lg-0 py-3">
                      <h2 className="mark-Medium text-black text-capitalize">
                        Buy a Digi2L Smart Plan for your appliance
                      </h2>
                      <p className="poppins-Medium para_first">
                        From the same retailer along with the purchase of your
                        new appliance and get the resale amount fixed.
                      </p>
                    </div>
                    <div className="col-md-6">
                      <img
                        className="img-fluid w-100"
                        src="/Digi2limage/smartBuy/smartplan1.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-enjoy"
                  role="tabpanel"
                  aria-labelledby="v-pills-enjoy-tab"
                >
                  <div className="row align-items-center mt-4">
                    <div className="col-md-6  order-lg-first order-last py-lg-0 py-3">
                      <h2 className="mark-Medium text-black text-capitalize">
                        Enjoy the appliance for up to 5 years
                      </h2>
                      <p className="poppins-Medium para_first">
                        Ask for your buyback amount at any time during this
                        period and choose to avail the buyback.
                      </p>
                    </div>
                    <div className="col-md-6">
                      <img
                        className="img-fluid w-100"
                         src="/Digi2limage/smartBuy/smartplan2.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-quick"
                  role="tabpanel"
                  aria-labelledby="v-pills-quick-tab"
                >
                  <div className="row align-items-center mt-4">
                    <div className="col-md-6  order-lg-first order-last py-lg-0 py-3">
                      <h2 className="mark-Medium text-black text-capitalize">
                        Quick QC and Pickup
                      </h2>
                      <p className="poppins-Medium para_first">
                        Quick and fast inspection to check if your appliance is
                        fully functional.
                      </p>
                    </div>
                    <div className="col-md-6">
                      <img
                        className="img-fluid w-100"
                         src="/Digi2limage/smartBuy/smartplan3.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-sit"
                  role="tabpanel"
                  aria-labelledby="v-pills-sit-tab"
                >
                  <div className="row align-items-center mt-4">
                    <div className="col-md-6  order-lg-first order-last py-lg-0 py-3">
                      <h2 className="mark-Medium text-black text-capitalize">
                        Relax while we complete the buyback process
                      </h2>
                      <p className="poppins-Medium para_first">
                        The maximum time to pickup the appliance from your
                        doorstep will be 5 days from the day you register your
                        product for a resale.
                      </p>
                    </div>
                    <div className="col-md-6">
                      <img
                        className="img-fluid w-100"
                         src="/Digi2limage/smartBuy/smartplan4.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-payment"
                  role="tabpanel"
                  aria-labelledby="v-pills-payment-tab"
                >
                  <div className="row align-items-center mt-4">
                    <div className="col-md-6  order-lg-first order-last py-lg-0 py-3">
                      <h2 className="mark-Medium text-black text-capitalize">
                        Payment Credit
                      </h2>
                      <p className="poppins-Medium para_first">
                        The assured buyback amount is transferred to your
                        account within 7 days.
                      </p>
                    </div>
                    <div className="col-md-6">
                      <img
                        className="img-fluid w-100"
                         src="/Digi2limage/smartBuy/smartplan5.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" pb-3" id="classNameification_section11">
        <EligibleBuyback />
      </section>

      <section
        id="how_it_work_section"
        className="how_it_work_section section_bg"
      >
        <div className="container">
          <div className="row justify-content-center align-items-center pt-5 pb-5">
            <div className="col-lg-6 col-md-6" id="ExchangeHomeImg">
              <img
                className="img-fluid"
                src="/Digi2limage/uploads/2022/09/product_exchange.png"
                alt=""
              />
            </div>
            <div className="col-lg-6 col-md-6 py-4 d-none d-lg-block">
              <h1 className="poppins-SemiBold main_heading">
                Check if your appliance is eligible for Our Digi2L:Assured
                Buyback Plan Redemption
              </h1>
              <Link to="/how-to-redeem-guide/" className="main_heading mb-4">
                <button className="btn poppins-SemiBold w-auto  btn-gradient mt-3">
                  Know More
                </button>
              </Link>
            </div>
            <div className="col-lg-6 col-md-6 py-4 text-center  d-sm-block d-lg-none d-md-none">
              <h1 className="poppins-SemiBold main_heading">
                Check if your appliance is eligible for Our Smart Buy Redemption
              </h1>
              <Link to="/how-to-redeem-guide/" className="main_heading mb-4">
                <button className="btn poppins-SemiBold w-auto  btn-gradient mt-3">
                  Know More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="frequentlyAsk_question mt-5">
        <FAQSection value="SmartBuy" />
      </section>

      <section className="term_condition py-5">
        <div className="container">
          <div className="text-center ">
            <h1 className="poppins-SemiBold main_heading lh-base">
              Most Important Terms &amp; Conditions
            </h1>
          </div>
          <ul className="d-flex  justify-content-center">
            <div className="py-4 mark-Medium list_item">
              <li className="py-3">
                Old Appliance will be Quality checked at the doorstep and the
                condition shall be communicated via SMS.
              </li>
              <li className="py-3">
                If there is any difference between the condition declared and QC
                checks the difference in the eligible amount can be paid via
                card/UPI.
              </li>
              <li className="py-3">
                If the QC checks result in a better condition, then we shall pay
                you the difference instantly .
              </li>
              <li className="py-3">
                QC will be done on running products and uninstallation, if
                required, would be done by the product owner prior to pick up.
              </li>
              <li className="py-3">
                Broken, dead, non-working products would not qualify under any
                classNameified conditions.
              </li>
              <li className="py-3">
                Should you choose to refuse the exchange and the exchange value
                has been deducted by the retailer from the new product price.
              </li>
            </div>
          </ul>
        </div>
      </section>
    </>
  );
}

export default SmartBuy;
