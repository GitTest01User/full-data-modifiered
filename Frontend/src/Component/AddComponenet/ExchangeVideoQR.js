import React, { useEffect, useState } from "react";

import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

export default function ExchangeVideoQR() {
  var location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  var IdParams = queryParams.get("Id");
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
  var paramValue = IdParams;
  var videoPath = "";

  if (paramValue == 1) {
    videoPath = " https://www.youtube.com/embed/9Wybl-VJDe8?autoplay=1&mute=1";
  } else if (paramValue == 2) {
    videoPath = "https://www.youtube.com/embed/t1A90_Ind84?autoplay=1&mute=1";
  } else if (paramValue == 3) {
    videoPath = "https://www.youtube.com/embed/9Wybl-VJDe8?autoplay=1&mute=1";
  }

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  return (
    <div className="App">
      <div className="lightboxContainer0905 w-100"></div>

      {modal ? (
        <section className="modal__bg333">
          <div className="modal__align">
            <div className="modal__content" modal={modal}>
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
                <iframe
                  class="modal__video-style"
                  onload="spinner()"
                  loading="lazy"
                  allow="autoplay; encrypted-media"
                  width="800"
                  height="500"
                  src={videoPath}
                  title="Digi2l"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      {/* </a> */}
    </div>
  );
}
