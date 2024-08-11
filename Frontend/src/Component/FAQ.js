import React, { useEffect, useState } from "react";

import APi from "../WebService/APi";
import $ from "jquery";
import DataNotFound from "../js/DataNotFound";
import Get from "../WebService/Fuction/Get";

export default function FAQ() {
  var [FAQ, SetFAQ] = useState([]);
  var count = 1;
  useEffect(() => {
    faq();
  }, []);
  const processGetLink = (result) => {
    if (result.Status && result.result.length != 0) {
      SetFAQ(result.result);
    } else {
      navigator("*");
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

  var faq = async () => {
    try {
      Get(`${APi.FAQGetAPi}?FAQISActive=${true}`)
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  $(document).ready(function () {
    $(
      ".accordion:first .accordion-button.bg-transparent.poppins-Medium.collapsed:first"
    ).removeClass("collapsed");
    $(".accordion-collapse.collapse:first").addClass("show");
  });
  return (
    <div>
      <div>
        <title>FAQ - Digi2L</title>
        <section className="latest_blog_section  ">
          <div className="d-flex align-items-center justify-content-center section_bg mb-3 py-5">
            <h1 className="poppins-SemiBold  lh-base">
              Frequently Asked Questions
            </h1>
          </div>
        </section>

        <section className="frequentlyAsk_question mb-4 mt-4">
          <div className="container">
            <div className="row ">
              <div className="col-md-12 mb-4">
                {FAQ.length > 0 ? (
                  FAQ.map((obj, index) => {
                    if (obj.FAQId === obj.ParentId && obj.FaqFlag === true) {
                      count = 0;
                      return (
                        <div key={index}>
                          <div className="d-flex align-items-center justify-content-center py-5">
                            <h1 className="poppins-SemiBold  lh-base">
                              {obj.FAQTitle}
                            </h1>
                          </div>
                          {FAQ.map((obj1, innerIndex) => {
                            if (
                              obj1.ParentId === obj.FAQId &&
                              obj1.ParentId !== obj1.FAQId
                            ) {
                              count++;
                              return (
                                <div
                                  className="accordion accordion-flush"
                                  id="faqlist"
                                  key={innerIndex}
                                >
                                  <div className="accordion-item bg-transparent">
                                    <h2 className="accordion-header">
                                      <button
                                        className="accordion-button bg-transparent poppins-Medium collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        aria-expanded="false"
                                        data-bs-target={`#faq-content-${innerIndex}`}
                                      >
                                        {count}. {obj1.FAQTitle}
                                      </button>
                                    </h2>
                                    <div
                                      id={`faq-content-${innerIndex}`}
                                      className="accordion-collapse collapse "
                                      data-bs-parent="#faqlist"
                                    >
                                      <div className="accordion-body px-0 bg-transparent mark-Bold para_first">
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: `${obj1.FAQContents}`,
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      );
                    }
                    return null;
                  })
                ) : (
                  <DataNotFound />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
