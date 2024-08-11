import React, { useState } from "react";

import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";

import $ from "jquery";

export default function WithDigi2lVideo() {
  const [modal, setModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const openModal2 = () => {
    setModal(true);
    $(".fixed-top").addClass("d-none");
    $(".slideOutTab").removeClass("d-sm-block");
    $("#qlwapp").addClass("d-none");
  };
  const openModal = () => {
    setModal(false);
    $(".fixed-top").removeClass("d-none");
    $(".slideOutTab").addClass("d-sm-block");
    $("#qlwapp").removeClass("d-none");
  };

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  return (
    <div className="App1">
      <button
        onClick={openModal2}
        className="btn btn-simple_1 mt-3 poppins-Bold fw-bold btn btn-light pum-trigger"
        id="selfqc"
        style={{ cursor: "pointer" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          className="bi bi-play"
          viewBox="0 0 16 16"
        >
          <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"></path>
        </svg>
        Play Video
      </button>
      <div>
        {modal ? (
          <section className="modal__bg333">
            <div className="modal__align">
              <div className="modal__content" modal={modal}>
                <IoCloseOutline
                  id="demosss"
                  className="modal__close"
                  arial-label="Close modal"
                  onClick={openModal}
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

                  <iframe
                    className="modal__video-style"
                    onLoad={spinner}
                    loading="lazy"
                    width="800"
                    height="500"
                    src="https://www.youtube.com/embed/_TGP8zFVNl4?autoplay=1&mute=0"
                    title="Digi2l"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
