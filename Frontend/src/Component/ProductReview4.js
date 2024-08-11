import React from "react";

export const ProductReview4 = (props) => {
  var Link = props.value;
  var UserClass = props.valueClass;
  if (Link) {
    window.location.href = Link;
  }

  return (
    <div>
      {" "}
      <div id="Mainloader" className={`${UserClass} bg-white`}>
        <div class="loaderwrap">
          <img
            src="https://app.digi2l.co.in/wp-content/themes/digi2l/assets/images/icon/logo.svg"
            alt="" className="w-75"
          />
          <br></br>
          <h3>Redirecting to payment gateway...</h3>
          <img
            src="https://app.digi2l.co.in/wp-content/themes/digi2l/assets/images/loading.gif"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
