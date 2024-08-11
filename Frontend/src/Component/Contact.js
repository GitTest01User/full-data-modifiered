import React from "react";
import HaveAQuestion from "./AddComponenet/HaveAQuestion";

import PostApi from "../WebService/PostApi";

export default function Contact() {
  return (
    <div>
      <title>Contact Us - Digi2l</title>
      <div>
        <section className="Contact_us">
          <img
            className="img-fluid map_image"
            src="/Digi2limage/map-img.jpg"
            alt=""
            width="100%"
          />
          <div
            className="container"
            style={{ transform: "translateY(-154px)" }}
          >
            <h1 className="poppins-SemiBold text-center py-4 contact_head">
              We Love To Hear From You
            </h1>

            <HaveAQuestion id="ContectUs" Api={PostApi.ContectFormPostApi} />
          </div>
        </section>
      </div>
    </div>
  );
}
