
import Trust from "./Slider/Trust";
import SmartSellPlan from "./Slider/SmartSellPlan";

import SmartSellProduct from "./AddComponenet/SmartSellProduct";
import FAQSection from "./FAQ/FAQSection";
import Token from "../WebService/Server/Token";


export default function SmartSell() {
 


  return (
    <div>
      <title>
        Smart Sell - Sell Your Old Appliances At The Best Price | Digi2L
      </title>
      <div>
        <section
          id="smartSellHero"
          className="hero_section  d-flex justify-content-center align-items-xl-center pt-5"
        >
          <div className="smartSellHero pt-lg-5 heroform pt-5">
            <div className="text-md-center text-white py-4 px-lg-1 px-4">
              <h1
                className="poppins-SemiBold lh-base font_family"
                id="smartsell101"
              >
                Sell Your Old Appliances <br />
                At The Best Price.
              </h1>
              <label className="mark-Medium">
                <p className="text-capitalize h4" id="smartsell102">
                  Digi2L: India's 1st Digital Platform To Sell Used Appliances.
                </p>
              </label>
            </div>
            <div className="d-flex justify-content-center align-items-xl-center">
              <div
                className="text-center"
                style={{
                  padding: "15px",
                  backgroundColor: "white",
                  borderRadius: "99px",
                }}
              >
                <img
                  src="/Digi2limage/uploads/2023/04/Smart-Sell-new.gif"
                  alt="Image"
                />
                <span style={{ fontWeight: "bold" }}>In 5 Minutes.</span>
              </div>
            </div>
            <div className="container">
          
              <SmartSellProduct />
            </div>
            <div className="text-white smart_sell_feature py-lg-5 d-none d-lg-block">
              <p
                className="poppins-SemiBold lh-base font_family text-center mt-3 mb-4 h4"
                id="smartsell104"
              >
                Why Choose Smart Sell by Digi2L?
              </p>
              <ul className="d-flex justify-content-lg-center ps-4 my-0 flex-wrap">
                <li className="mx-lg-4 mx-1 mark-Medium" id="smartsell105">
                  Instant Quote
                </li>
                <li className="mx-lg-4 mx-1 mark-Medium" id="smartsell106">
                  Transparent Quality Check
                </li>
                <li className="mx-lg-4 mx-1 mark-Medium" id="smartsell107">
                  Free Doorstep Pickup
                </li>
              </ul>
              <ul className="d-flex justify-content-lg-center ps-4 flex-wrap">
                <li className="mx-lg-4 mx-1 mark-Medium" id="smartsell108">
                  Instant Payment
                </li>
                <li className="mx-lg-4 mx-1 mark-Medium" id="smartsell109">
                  Zero Hassles
                </li>
              </ul>
            </div>
            <div className="text-white smart_sell_feature py-lg-5 d-block d-lg-none mb-4">
              <p
                className="poppins-SemiBold lh-base font_family text-center mt-3 mb-4 h4"
                id="smartsell104"
              >
                Why Choose Smart Sell by Digi2L?
              </p>
              <ul className="d-flex justify-content-center ps-2 my-2 flex-wrap">
                <li className="mx-lg-4 mx-1 mark-Medium">Instant Quote </li>
                <li className="mx-lg-4 mx-1 mark-Medium">
                  Transparent Quality Check
                </li>
                <li className="mx-lg-4 mx-1 mark-Medium">
                  Free Doorstep Pickup
                </li>
                <li className="mx-lg-4 mx-1 mark-Medium">Instant Payment </li>
                <li className="mx-lg-4 mx-1 mark-Medium">Zero Hassles </li>
              </ul>
            </div>
          </div>
        </section>

        <section
          id="smart_sell"
          className="smart_sell_section container pt-5 my-3 pb-5"
        >
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 px-xl-5 pt-3">
              <h1
                className="poppins-SemiBold main_heading py-lg-1 py-2"
                id="smartsell8"
              >
                Smart Sell
              </h1>
              <p
                className="lh-base mark-Bold para_first democenter"
                id="smartsell9"
              >
                Buying new home appliances is exciting, but selling used
                appliances is a nightmare. The hassles of going through
                negotiations, finding the right customers, shipping the
                appliance, and getting the right price makes it a daunting task.
              </p>
            </div>
            <div
              className="col-lg-5 text-center order-first order-lg-last"
              id="smartsell10"
            >
              <img
                className="img-fluid"
                src="/Digi2limage/uploads/2022/12/smartSell-1.png"
                alt=""
              />
            </div>
          </div>
        </section>

        <section className=" py-5  section_bg">
          <div className="container">
            <div className="text-center">
              <h1
                className="poppins-SemiBold main_heading lh-base"
                id="smartsell11"
              >
                Why Selling Old <br />
                Appliances Is Difficult ?
              </h1>
            </div>
            <div className="row justify-content-center align-items-center pt-lg-3  pb-lg-4">
              <div className="col-lg-3">
                <div
                  className="card bg-transparent border-0 text-center"
                  style={{ minHeight: "275px" }}
                >
                  <div
                    className="card-header border-0 bg-transparent"
                    id="smartsell12"
                  >
                    <img
                      className="img-fluid"
                      src="/Digi2limage/uploads/2022/12/img1-1.png"
                      alt=""
                    />
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center p-0 pt-3">
                    <h6
                      className="main_heading poppins-SemiBold text-capitalize text-center"
                      id="smartsell13"
                    >
                      Few Or Zero Avenues To Resell Old Appliances.
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="card bg-transparent border-0 text-center"
                  style={{ minHeight: "275px" }}
                >
                  <div
                    className="card-header border-0 bg-transparent"
                    id="smartsell14"
                  >
                    <img
                      className="img-fluid"
                      src="/Digi2limage/uploads/2022/12/img2-6.png"
                      alt=""
                    />
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center p-0 pt-3">
                    <h6
                      className="main_heading poppins-SemiBold text-capitalize text-center"
                      id="smartsell15"
                    >
                      The Resale Value Is Dependent On Your Negotiation Skills
                      Rather Than The Condition Of The Appliance.
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="card bg-transparent border-0 text-center"
                  style={{ minHeight: "275px" }}
                >
                  <div
                    className="card-header border-0 bg-transparent"
                    id="smartsell16"
                  >
                    <img
                      className="img-fluid"
                      src="/Digi2limage/uploads/2022/12/img3-1.png"
                      alt=""
                    />
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center p-0 pt-3">
                    <h6
                      className="main_heading poppins-SemiBold text-capitalize text-center"
                      id="smartsell17"
                    >
                      Finding A Suitable Buyer Near Your Location.
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="card bg-transparent border-0 text-center"
                  style={{ minHeight: "275px" }}
                >
                  <div
                    className="card-header border-0 bg-transparent"
                    id="smartsell18"
                  >
                    <img
                      className="img-fluid"
                      src="/Digi2limage/uploads/2022/12/img4-1.png"
                      alt=""
                    />
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center p-0 pt-3">
                    <h6
                      className="main_heading poppins-SemiBold text-capitalize text-center"
                      id="smartsell19"
                    >
                      The Hassles Of Transporting The Appliance To The Buyer.
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-top py-4 d-block d-lg-none"></div>
            <div className="text-center mx-lg-5 px-lg-5 pt-lg-4">
              <h5
                className="main_heading poppins-SemiBold text-capitalize text-center"
                id="smartsell20"
              >
                But No Need To Worry! The Smart Sell Plan From Digi2L, India’s
                1st Digital Platform Helps You Sell Your Used Appliances In Just
                A Few Clicks With Zero Hassles.
              </h5>
            </div>
          </div>
        </section>

        <section className="d-none d-lg-block">
          <div
            className="text-center py-5"
            style={{ backgroundColor: "#3C23B6", height: "300px" }}
          >
            <h1
              className="main_heading poppins-SemiBold text-capitalize text-center lh-base text-white px-3 d-lg-block d-none"
              id="smartsell21"
            >
              Smart Sell Plan Makes Selling Your <br /> Old Appliances As
              Seamless As Buying A New One.
            </h1>

            <h1 className="poppins-SemiBold  text-capitalize lh-base text-white px-3 d-block d-lg-none mb-5">
              Smart Sell Plan Makes Selling Your Old Appliances As Seamless As
              Buying A New One.
            </h1>
          </div>
          <section className="demo3333">
            <div
              className="container-xxl pe-0"
              style={{ transform: "translateY(-120px)" }}
            >
              <div className="row justify-content-center ">
                <div className="">
                  <div className="col-lg-12  pe-0">
                    <div className="owl-slider1">
                      <SmartSellPlan />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section className="d-lg-none d-md-none ">
          <div
            className="text-center py-5"
            style={{ backgroundColor: "#3C23B6", height: "300px" }}
          >
            <h1
              className="main_heading poppins-SemiBold text-capitalize text-center lh-base text-white px-3 d-lg-block d-none"
              id="smartsell21"
            >
              Smart Sell Plan Makes Selling Your <br /> Old Appliances As
              Seamless As Buying A New One.
            </h1>

            <h1 className="poppins-SemiBold  text-capitalize lh-base text-white px-3 d-block d-lg-none mb-5">
              Smart Sell Plan Makes Selling Your Old Appliances As Seamless As
              Buying A New One.
            </h1>
          </div>
          <section className="demo3333dsd">
            <div
              className="container-fluid"
              style={{ transform: "translateY(-80px)" }}
            >
              <div className="row justify-content-center ">
                <div className="">
                  <div className="col-lg-12  pe-0 pb-5">
                    <div className="owl-slider1">
                      <SmartSellPlan />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section
          id="howItWorks"
          className="how_it_work_section section_bg pb-5"
        >
          <div className="container">
            <div className="text-center pt-5 pb-4 ">
              <h1
                className="poppins-SemiBold main_heading lh-base text-capitalize"
                id="smartsell32"
              >
                How Does It Work?
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
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    <span className="scrollspy_nav" id="smartsell33"></span>
                    &nbsp; <small>List Your Appliance </small>
                  </button>
                  <button
                    className="nav-link d-inline-block text-start nav_tabs_button poppins-Bold"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    <span className="scrollspy_nav" id="smartsell34"></span>
                    &nbsp; <small>Self-Quality Check </small>
                  </button>
                  <button
                    className="nav-link d-inline-block text-start nav_tabs_button poppins-Bold"
                    id="v-pills-messages-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-messages"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-messages"
                    aria-selected="false"
                  >
                    <span className="scrollspy_nav" id="smartsell35"></span>
                    &nbsp; <small>Sit Back And Relax </small>
                  </button>
                  <button
                    className="nav-link d-inline-block text-start nav_tabs_button poppins-Bold"
                    id="v-pills-settings-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false"
                  >
                    <span className="scrollspy_nav" id="smartsell35"></span>
                    &nbsp; <small>Get The Best Price </small>
                  </button>
                </div>
              </div>
              <div className="col-lg-8 col-11">
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div className="row align-items-center mt-4">
                      <div className="col-md-6 order-lg-first order-last py-lg-0 py-3">
                        <h2
                          className="mark-Medium text-black text-capitalize"
                          id="smartsell37"
                        >
                          List Your Appliance On The Website
                        </h2>
                        <p
                          className="poppins-Medium para_first"
                          id="smartsell38"
                        >
                          <medium>
                            Register your appliance for selling on the Digi2L
                            website to get a price estimate.
                          </medium>
                        </p>
                      </div>
                      <div className="col-md-6" id="smartsell45">
                        <img
                          className="img-fluid w-100"
                          src="/Digi2limage/uploads/2022/12/scroll1-1.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <div className="row align-items-center mt-4">
                      <div className="col-md-6  order-lg-first order-last py-lg-0 py-3">
                        <h2
                          className="mark-Medium text-black text-capitalize"
                          id="smartsell39"
                        >
                          Self-Quality Check
                        </h2>
                        <p
                          className="poppins-Medium para_first"
                          id="smartsell40"
                        >
                          <medium>
                            Now you can do it yourself. Get your quality check
                            done in the comfort of your home. No unwanted calls.
                            Get the best price quote within 6 hours of Self-QC.
                          </medium>
                        </p>
                      </div>
                      <div className="col-md-6" id="smartsell46">
                        <img
                          className="img-fluid w-100"
                          src="/Digi2limage/uploads/2022/12/scroll2-1.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-messages"
                    role="tabpanel"
                    aria-labelledby="v-pills-messages-tab"
                  >
                    <div className="row align-items-center mt-4">
                      <div className="col-md-6  order-lg-first order-last py-lg-0 py-3">
                        <h2
                          className="mark-Medium text-black text-capitalize"
                          id="smartsell41"
                        >
                          Sit Back And Relax
                        </h2>
                        <p
                          className="poppins-Medium para_first"
                          id="smartsell42"
                        >
                          <medium>
                            Get free doorstep pickup at your convenient date and
                            time.
                          </medium>
                        </p>
                      </div>
                      <div className="col-md-6" id="smartsell47">
                        <img
                          className="img-fluid w-100"
                          src="/Digi2limage/uploads/2022/12/scroll3-1.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-settings"
                    role="tabpanel"
                    aria-labelledby="v-pills-settings-tab"
                  >
                    <div className="row align-items-center mt-4">
                      <div className="col-md-6  order-lg-first order-last py-lg-0 py-3">
                        <h2
                          className="mark-Medium text-black text-capitalize"
                          id="smartsell43"
                        >
                          Get The Best Price
                        </h2>
                        <p
                          className="poppins-Medium para_first"
                          id="smartsell44"
                        >
                          <medium>
                            The appliance amount is instantly transferred to
                            your UPI ID at the time of pickup.
                          </medium>
                        </p>
                      </div>
                      <div className="col-md-6" id="smartsell48">
                        <img
                          className="img-fluid w-100"
                          src="/Digi2limage/uploads/2022/12/scroll4-1.png"
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

        <section
          id="classNameification_section23232"
          className="classNameification_section pt-5 pb-5"
        >
          <div className="text-center">
            <h1
              className="poppins-SemiBold main_heading lh-base"
              id="smartsell49"
            >
              Product Condition <br /> Classification Guide
            </h1>
            <p
              className="poppins-Medium para_first text-capitalize px-4"
              id="smartsell50"
            >
              Worried About The Condition Of Your Appliance? Our Product
              Condition <br />
              classNameification Guide Provides A Rough Estimate Of The
              Condition Of Your Appliance.
            </p>
          </div>
          <div className="container">
            <div class="table-responsive-sm">
              <table class="table">
                <thead>
                  <tr class="poppins-SemiBold">
                    <th
                      class="border-end border-top px-xl-4 smartsell57"
                      rowspan="2"
                    >
                      PRODUCT
                    </th>
                    <th
                      class="border-end border-top px-xl-4 smartsell57 text-center"
                      colspan="3"
                    >
                      WORKING
                    </th>
                    <th class="border-end border-top px-xl-4 smartsell57 text-center">
                      Non-Working
                    </th>
                  </tr>
                  <tr>
                    <th class="border-end border-top px-xl-4 smartsell57 text-center">
                      Excellent
                    </th>
                    <th class="border-end border-top px-xl-4 smartsell57 text-center">
                      Good
                    </th>
                    <th class="border-end border-top px-xl-4 smartsell57 text-center">
                      Average
                    </th>
                    <th class="border-end border-top px-xl-4 smartsell57 text-center">
                      End-Of-Life(EOL)
                    </th>
                  </tr>
                </thead>
                <tr>
                  <td class="border-end poppins-SemiBold  px-xl-4 smartsell55">
                    <p>Air Conditioner</p>
                    <br />
                    <p>Sell your old AC, before it turns in to a heater</p>
                  </td>
                  <td class="border-end px-xl-4  smartsell57">
                    <ul>
                      <li>Perfect Working Condition</li>
                      <li>All accessories available and fully functional</li>
                      <li>All functions working without any blemish</li>
                    </ul>
                  </td>
                  <td class="border-end px-xl-4  smartsell58">
                    <ul>
                      <li>Perfect Working Condition</li>
                      <li>All accessories available</li>
                      <li>Some remote functions not working</li>
                      <li>Minor dent or scratch</li>
                    </ul>
                  </td>
                  <td class="border-end px-xl-4  smartsell58">
                    <ul>
                      <li>Powering ON-Working</li>
                      <li>Minor rust or dent</li>
                      <li>Low cooling</li>
                    </ul>
                  </td>
                  <td class="border-end px-xl-4 smartsell58">
                    <ul>
                      <li>Doesn't Power ON</li>
                      <li>No cooling </li>
                      <li>Broken But with compressor</li>
                      <li>Machine is uninstalled</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td class="border-end poppins-SemiBold border-top px-xl-4 smartsell55">
                    <p>REFRIGERATOR</p>
                    <br />
                    <p>
                      Sell your old refrigerator, before it gives you a tuff
                      time!
                    </p>
                  </td>
                  <td class="border-end px-xl-4 border-top smartsell57">
                    <ul>
                      <li>Perfect Working Condition</li>
                      <li>All accessories available and fully functional</li>
                      <li>All functions working without any blemish</li>
                    </ul>
                  </td>
                  <td class="border-end px-xl-4 border-top smartsell58">
                    <ul>
                      <li>Perfect Working Condition</li>
                      <li>All accessories available</li>
                      <li>Minor dent or scratch</li>
                    </ul>
                  </td>
                  <td class="border-end px-xl-4  border-top smartsell58">
                    <ul>
                      <li>Powering ON-Working</li>
                      <li>Minor rust or dent</li>
                      <li>Low cooling</li>
                      <li>
                        One or two shelves or bottle rack are missing or broken.
                      </li>
                      <li>
                        Vegetable box and freezer door avialable but broken
                      </li>
                    </ul>
                  </td>
                  <td class="border-end border-top px-xl-4  smartsell58">
                    <ul>
                      <li>Doesn't Power ON</li>
                      <li>No cooling </li>
                      <li>Broken But With Compressor</li>
                      <li>Machine is uninstalled</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td class="border-end border-top poppins-SemiBold px-xl-4 smartsell55">
                    <p>WASHING MACHINE </p>
                    <br />
                    <p>
                      Why spin your head, when you can sell your old washing
                      machine for a good price.
                    </p>
                  </td>
                  <td class="border-end border-top  px-xl-4 smartsell57">
                    <ul>
                      <li>Perfect Working Condition</li>
                      <li>All accessories available and fully functional</li>
                      <li>All functions working without any blemish</li>
                    </ul>
                  </td>
                  <td class="border-end border-top  px-xl-4 smartsell58">
                    <ul>
                      <li>Perfect Working Condition</li>
                      <li>All accessories available</li>
                      <li>Minor dent or scratch</li>
                    </ul>
                  </td>
                  <td class="border-end  border-top px-xl-4 smartsell58">
                    <ul>
                      <li>Power ON-Working</li>
                      <li>Minor rust or dent</li>
                      <li>Noise in the drum</li>
                      <li>Fault In Drain Motor</li>
                    </ul>
                  </td>
                  <td class="border-end  border-top px-xl-4 smartsell58">
                    <ul>
                      <li>Doesn't power ON</li>
                      <li>Base completely rusted</li>
                      <li>Broken</li>
                      <li>Machine is uninstalled</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td class="border-end border-top poppins-SemiBold px-xl-4 smartsell55">
                    <p>TELEVISION (LCD/LED)</p>
                    <br />
                    <p>
                      Why miss out on the exciting news, Sell your old TV now.
                    </p>
                  </td>
                  <td class="border-end border-top px-xl-4 smartsell57">
                    <ul>
                      <li>Perfect Working Condition</li>
                      <li>All accessories available and fully functional</li>
                      <li>All functions working without any blemish</li>
                    </ul>
                  </td>
                  <td class="border-end border-top px-xl-4 smartsell58">
                    <ul>
                      <li>Power ON-Working</li>
                      <li>All accessories available</li>
                      <li>All ports working</li>
                      <li>Minor dent or scratch on cabinet</li>
                    </ul>
                  </td>
                  <td class="border-end border-top px-xl-4 smartsell58">
                    <ul>
                      <li>Power ON-Working</li>
                      <li>Minor rust or dent on cabinet</li>
                      <li>Some ports not working</li>
                    </ul>
                  </td>
                  <td class="border-end border-top px-xl-4 smartsell58">
                    <ul>
                      <li>Doesn't power ON - Flickering</li>
                      <li>Power ON but line or dot on screen</li>
                      <li>No physical damage</li>
                      <li>TV is uninstalled</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </section>

        <section className="frequentlyAsk_question pb-5">
          <FAQSection value="SmartSell" />
        </section>

        <section className="testimonial_section py-5 bg-light">
          <div className="home_testimonial">
            <div className="text-center px-5">
              <h1
                className="text-capitalize poppins-SemiBold main_heading lh-base"
                id="TestimonialHeading"
              >
                Over 50 Thousand Customers Trust Digi2L
              </h1>
            </div>

            <div className="testimonial">
              <div className="container">
                <Trust />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Token />
    </div>
  );
}
