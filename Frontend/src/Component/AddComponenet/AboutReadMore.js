import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import $ from "jquery";
function AboutReadMore() {
  const [isShowMore, setIsShowMore] = useState(false);
  var AboutUs = useRef();
  const [isActive, setIsActive] = useState(false);
  const toggleReadMoreLess = () => {
    setIsShowMore(!isShowMore);
    if (!isShowMore) {
      AboutUs.current.scrollIntoView();
    }
  };
  useEffect(() => {
    $(".jshover").hover(
      function () {
        $(".jshoverdefault p").addClass("text-black");
        $(".jshoverdefault .overclass0").css({
          background:
            "url(/Digi2limage/Location-1.svg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
        });
        $(".jshoverdefault .hover_effect2").css({ background: "url(/Digi2limage/themes/digi2l/assets/images/hover.svg)" });
      },
      function () {
        $(".jshoverdefault p").removeClass("text-black");
        $(".jshoverdefault .overclass0").css({
          background:
            "url(/Digi2limage/themes/digi2l/assets/images/Locationwhite.svg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
          color:'white'
        });
        $(".jshoverdefault .hover_effect2").css({
          background: "url(/Digi2limage/themes/digi2l/assets/images/hover.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        });
      }
    );
  }, []);

  const handleMouseOver = () => {
    setIsActive(true);
  };

  const handleMouseOut = () => {
    setIsActive(false);
  };
  return (
    <section>
      <section ref={AboutUs}>
        <div></div>

        <section>
          <div className="about-info container my-5 py-0 py-lg-5 ">
            <div>
              <div className="flex-md-row justify-content-center row">
                <div className="col-lg-6 px-xl-5 col-md-6 ">
                  <h1
                    className="poppins-SemiBold main_heading"
                    id="AboutMainHeading"
                  >
                    Digi2L is India’s first platform that helps{" "}
                  </h1>

                  <div className="cardddd">
                    <p className="lh-base mark-Bold para_first">
                      {" "}
                      Digi2L is India’s first platform that helps you in the
                      disposal of your used appliances and gadgets without
                      having to face the hassles of looking for customers and
                      the best price while ensuring spot payment and free home
                      pick up of the used product. Exchange and sale of old
                      appliances have always been a “need” and with frequent
                      changes in styling and technology, the product life cycles
                      are shortening with each passing year. Emphasis on quality
                      by manufacturers forces consumers to retain their
                      electronics and appliances longer than they would like to
                      due to the highly unorganized used appliances market.
                      Selling used appliances is a tough task and exchanging
                      them at the time of a new purchase does not offer a
                    </p>
                    {isShowMore && (
                      <p className="lh-base mark-Bold para_first">
                        fair price. Digi2L started with the objective of
                        bringing value to the consumers by managing the
                        end-to-end cycle of exchanging used electronics and
                        appliances. We offer doorstep pickup of your old
                        appliances across all major cities of India. Your
                        appliance is quality checked by our trained service
                        experts who follow a step-by-step process to evaluate
                        your appliance and do proper classNameification so that
                        you get the best value for it. The entire process is
                        managed using our robust tech platform and is
                        transparent for all stakeholders. The payment is
                        instantly made through digital modes and the product is
                        packed and shipped directly to our authorized vendors in
                        your city. These can then be sold to a new set of
                        customers who may not have been able to afford them the
                        first time around, thereby helping you stay in tune with
                        the fast-changing trends. This is what defines our motto
                        of - Customer Ready, Price Ready, and Payment Ready. We
                        stand committed to the e-waste rules of India. For
                        end-of-life products, we dispose of them to our
                        authorized recyclers who assist us with their expertise
                        in fulfilling the compliance requirements related to
                        e-waste management. Now for the first time in India, we
                        have launched our Smart Buy Plan for select home
                        appliances, which would let you decide your appliance's
                        resale price on the day of purchase itself. This helps
                        you avoid the hassles of bargaining when you sell your
                        appliance and gives you great savings to upgrade to a
                        new model. You can enjoy this within the comfort of your
                        home, thanks to our free doorstep pickup facility, which
                        is available across the major cities in our country.
                      </p>
                    )}

                    <button
                      onClick={toggleReadMoreLess}
                      className=" moreellipses text-white btn poppins-SemiBold btn-gradient"
                    >
                      <span className="morelink343434">
                        {isShowMore ? "Read Less" : "Read More"}
                      </span>
                    </button>
                  </div>
                </div>

                <div
                  class="  col-lg-6 col-md-6 order-lg-last order-xl-last order-md-last order-first ps-5 counter_section"
                  style={{ borderLeft: "1px solid #CEC8CC" }}
                  id="btnremove"
                >
                  <div class="row sticky-top" id="projectFacts">
                    <div
                      class="about-counter jshoverdefault col-lg-6 col-md-6 col-6 col-sm-6 textHover text-center"
                      data-number="30"
                      style={{ visibility: "visible" }}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <div
                        class={
                          isActive
                            ? "border p-3 m-lg-4 m-md-2 ms-3 rounded-20 hover_effect233 "
                            : "border p-3 m-lg-4 m-md-2 ms-3 rounded-20   hover_effect2 "
                        }
                        
                      >
                        <div
                          class={
                            isActive ? "text-end " : "text-end   overclass0 "
                          }
                          style={
                            isActive
                              ? {
                                background: `url("/Digi2limage/Location-1.svg") right center no-repeat`
                                }
                              : null
                          }
                        >
                          <div className="overclass0"></div>
                        </div>
                        <div
                          class="d-flex justify-content-center align-items-center poppins-SemiBold"
                          id="CitiesInIndia" 
                        >
                          <p id="number1" class="fs-1 counter_num">
                            <CountUp
                              duration={2.75}
                              separator=" "
                              decimal=","
                              end={100}
                            />
                          </p>
                          <p class="fs-2">+</p>
                        </div>

                        <p class="poppins-Regular" id="CitiesInIndiaLabel">
                          Cities in India
                        </p>
                      </div>
                    </div>

                    <div
                      class="about-counter jshover col-lg-6 col-md-6 text-center col-6 col-sm-6 textHover"
                      data-number="20000"
                      style={{ visibility: "visible" }}
                    >
                      <div
                        class="p-3 m-lg-4 m-md-2 rounded-20 hover_effect"
                        style={{ border: " 1px solid #CEC8CC" }}
                      >
                        <div class="text-end overclass"></div>

                        <div
                          class="d-flex justify-content-center align-items-center poppins-SemiBold"
                          id="HappyUsers"
                        >
                          <p
                            id="number2"
                            class="fs-1 counter-number counter_num"
                          >
                            <CountUp
                              duration={2.75}
                              separator=""
                              decimal=","
                              end={50000}
                            />
                          </p>
                          <p class="fs-2 counter-number">+</p>
                        </div>

                        <p
                          class="poppins-Regular counter-subhead"
                          id="HappyUsersLabel"
                        >
                          Happy Users
                        </p>
                      </div>
                    </div>

                    <div
                      class="about-counter jshover col-lg-6 col-md-6 col-6 col-sm-6 textHover text-center"
                      data-number="12000"
                      style={{ visibility: "visible" }}
                    >
                      <div
                        class="p-3 m-lg-4 m-md-2 ms-3 rounded-20 hover_effect"
                        style={{ border: " 1px solid #CEC8CC" }}
                      >
                        <div class="text-end overclass2"></div>

                        <div
                          class="d-flex justify-content-center align-items-center poppins-SemiBold"
                          id="AbbPlanSold"
                        >
                          <p
                            id="number3"
                            class="fs-1 counter-number counter_num"
                          >
                            <CountUp
                              duration={2.75}
                              separator=""
                              decimal=","
                              end={26000}
                            />
                          </p>
                          <p class="fs-2 counter-number">+</p>
                        </div>
                        <p
                          class="poppins-Regular counter-subhead"
                          id="AbbPlanSoldLabel"
                        >
                          ABB Plan Sold
                        </p>
                      </div>
                    </div>

                    <div
                      class="about-counter jshover col-lg-6 col-md-6 col-6 col-sm-6 textHover text-center"
                      data-number="246"
                      style={{ visibility: "visible" }}
                    >
                      <div
                        class="p-3 m-lg-4 m-md-2  rounded-20 hover_effect"
                        style={{ border: " 1px solid #CEC8CC" }}
                      >
                        <div class="text-end overclass3"></div>

                        <div
                          class="d-flex justify-content-center align-items-center poppins-SemiBold"
                          id="TotalBrands"
                        >
                          <p
                            id="number4"
                            class="fs-1 counter-number counter_num"
                          >
                            <CountUp
                              duration={2.75}
                              separator=""
                              decimal=","
                              end={246}
                            />
                          </p>
                          <p class="fs-2 counter-number">+</p>
                        </div>

                        <p
                          class="poppins-Regular counter-subhead"
                          id="TotalBrandsLabel"
                        >
                          Brands
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}

export default AboutReadMore;
