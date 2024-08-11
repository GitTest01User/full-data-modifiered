import React, { useEffect, useState } from "react";

import APi from "../../WebService/APi";
import $ from "jquery";
import Get from "../../WebService/Fuction/Get";
export default function FAQSection(props) {
  var [FAQ, SetFAQ] = useState([]);

  var faq = async () => {
    if (props.value) {
      var ModalName = props.value;
    }

    try {
      Get(`${APi.FAQGetAPi}?FAQISActive=${true}&FAQModel=${ModalName}`)
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const handleError = (error) => {
    console.log("Error fetching user role:", error);
  };

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
  useEffect(() => {
    faq();
  }, []);
  $(document).ready(function () {
    $(
      ".accordion:first .accordion-button.bg-transparent.poppins-Medium.collapsed:first"
    ).removeClass("collapsed");
    $(".accordion-collapse.collapse:first").addClass("show");
  });
  return (
    <div>
      {" "}
      <div>
        {" "}
        <div className="container pb-5">
          <div className="row ">
            <div className="col-md-12 ">
              {FAQ.map((obj, index) => {
                if (obj.FAQISActive == true) {
                  if (obj.FAQId == obj.ParentId) {
                    return (
                      <>
                        <div class="d-flex align-items-center justify-content-center  py-5">
                          <h1 class="poppins-SemiBold  lh-base">
                            {obj.FAQTitle}
                          </h1>
                        </div>

                        {FAQ.map((obj1, index) => {
                          if (
                            (obj1.ParentId == obj.FAQId &&
                              obj1.ParentId != obj1.FAQId) ||
                            obj.ParentId == obj.PageUrl
                          ) {
                            return (
                              <>
                                <div
                                  className="accordion accordion-flush"
                                  id="faqlist"
                                  key={index}
                                >
                                  <div className="accordion-item bg-transparent">
                                    <h2 className="accordion-header">
                                      <button
                                        className="accordion-button bg-transparent poppins-Medium collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        aria-expanded="falue"
                                        data-bs-target={`#faq-content-${
                                          index + 1
                                        }`}
                                      >
                                        {index}. {obj1.FAQTitle}
                                      </button>
                                    </h2>
                                    <div
                                      id={`faq-content-${index + 1}`}
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
                              </>
                            );
                          }
                        })}
                        <div></div>
                      </>
                    );
                  }
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
