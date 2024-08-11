import React, { useEffect, useState } from "react";

import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function OfferDigi2l() {
  var navigator = useNavigate();
  const [modal, setModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    setModal(!modal);
    spinner();
  }, []);
  var setModals = () => {
    navigator(-1);
  };

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  return (
    <div className="App">
      <div className="lightboxContainer0905 "></div>

      {modal ? (
        <section className="modal__bg333 ">
          <div className="modal__align">
            <div
              className="modal__content"
              style={{ width: "700px" }}
              modal={modal}
            >
              <IoCloseOutline
                className="modal__close"
                arial-label="Close modal"
                onClick={setModals}
              />
              <div className="modal__video-align">
                {videoLoading ? (
                  <div className="modal__spinner">
                    <BiLoaderAlt
                      className="modal__spinner-style"
                      fadeIn="none"
                    />
                  </div>
                ) : null}
                <div className="row  justify-content-center ">
                  <div className="col-lg-12 ">
                    <p>
                      <img
                        decoding="async"
                        className="alignnone size-full wp-image-528"
                        src="/Digi2limage/hord-01-scaled.webp"
                        alt=""
                      />
                    </p>
                  </div>
                  <div className="col-lg-12">
                    <form
                      method="post"
                      className="wpcf7-form init pb-5 pl-5 pr-5"
                      aria-label="Contact form"
                      novalidate="novalidate"
                      data-status="init"
                    >
                      <div style={{ display: "none" }}>
                        <input type="hidden" name="_wpcf7" value="8796" />
                        <input
                          type="hidden"
                          name="_wpcf7_version"
                          value="5.8"
                        />
                        <input
                          type="hidden"
                          name="_wpcf7_locale"
                          value="en_US"
                        />
                        <input
                          type="hidden"
                          name="_wpcf7_unit_tag"
                          value="wpcf7-f8796-o2"
                        />
                        <input
                          type="hidden"
                          name="_wpcf7_container_post"
                          value="0"
                        />
                        <input
                          type="hidden"
                          name="_wpcf7_posted_data_hash"
                          value=""
                        />
                      </div>
                      <div className="row justify-content-center ">
                        <div className="col-md-5 mb-2">
                          <input
                            size="40"
                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control"
                            aria-required="true"
                            aria-invalid="false"
                            placeholder="Your Name"
                            value=""
                            type="text"
                            name="your-name"
                          />
                        </div>
                        <div className="col-md-5 mb-3">
                          <input
                            size="40"
                            className="wpcf7-form-control wpcf7-tel wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-tel form-control"
                            aria-required="true"
                            aria-invalid="false"
                            placeholder="Phone Number"
                            value=""
                            type="tel"
                            name="your-number"
                          />
                        </div>
                        <div className="col-md-5 mb-2">
                          <input
                            size="40"
                            className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email form-control"
                            aria-required="true"
                            aria-invalid="false"
                            placeholder="Email"
                            value=""
                            type="email"
                            name="your-email"
                          />
                        </div>
                        <div className="col-md-5 mb-2">
                          <input
                            size="40"
                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control"
                            aria-required="true"
                            aria-invalid="false"
                            placeholder="City"
                            value=""
                            type="text"
                            name="your-city"
                          />
                        </div>
                        <div className="col-md-10 mb-2">
                          <input
                            className="wpcf7-form-control wpcf7-submit has-spinner btn btn-gradient w-100"
                            type="submit"
                            value="Send"
                          />
                        </div>
                      </div>
                      <input
                        type="hidden"
                        className="wpcf7-pum"
                        value='{"closepopup":false,"closedelay":0,"openpopup":false,"openpopup_id":0}'
                      />
                      <div
                        className="wpcf7-response-output"
                        aria-hidden="true"
                      ></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      {/* </a> */}
    </div>
  );
}
