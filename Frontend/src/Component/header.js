import React, { useEffect } from "react";
import WithDigi2lVideo from "./AddComponenet/WithDigi2LVideo";

const Header = () => {
  useEffect(() => {
    const handleScroll = () => {
      let offset = window.pageYOffset;
      const heroImage = document.querySelector(".hero-image");
      if (heroImage) {
        heroImage.style.backgroundPositionY = offset * 0.7 + "px";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      <div className="align-items-center d-flex hero-treatment text-center">
        <div className="parallax w-100 text-white">
          <h1 className="poppins-bold">
            With Digi2L's Self QC <br /> Selling Old Appliances Is Easy Breezy
          </h1>

          <WithDigi2lVideo />
        </div>
        <div className="hero-image">
          <video
           className="w-100"
            playsinline="playsinline"
            autoplay="autoplay"
            muted="muted"
            loop="loop"
            height='100%'
            style={{objectFit: "cover"}}
          >
            <source
              src="/Digi2limage/selfqc.mp4"
              type="video/mp4"
            />
          </video>
          <div className="overlay"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
