import React from "react";
import { Link } from "react-router-dom";

export default function HowCanHelpYou() {
  return (
    <div>
      <div
        id="qlwapp"
        style={{ display: "block" }}
        className="float-widget qlwapp qlwapp-free qlwapp-button qlwapp-bottom-right qlwapp-all qlwapp-rounded"
      >
        <div className="qlwapp-container">
          <Link
            className="qlwapp-toggle"
            data-action="open"
            data-phone="919321276351"
            data-message="Hello! Please address my query."
            role="button"
            tabindex="0"
            target="_blank"
          >
            <i className="qlwapp-icon qlwapp-whatsapp-icon"></i>
            <i className="qlwapp-close" data-action="close">
              &times;
            </i>
            <span className="qlwapp-text">How can I help you?</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
