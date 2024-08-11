import React from "react";

import APi from "../../WebService/APi";
import { useEffect } from "react";
import { useState } from "react";
import Get from "../../WebService/Fuction/Get";
import { useNavigate } from "react-router-dom";

export default function Serving() {
  var navigator=useNavigate()
  var [Serving, SetServing] = useState([]);

  var serving = async () => {
    try {
      Get(`${APi.ServingInGetAPi}?ServinginisActive=${true}`)
        .then(handleResponse)
        .then(processGetLink)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const processGetLink = (result) => {
    if (result.Status && result.result.length != 0) {
      SetServing(result.result);
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
  useEffect(() => {
    serving();
  });
  return (
    <div>
      <div className="col-md-8 wrapper_serving  mt-3 mb-3">
        <div className="card border-0 position-relative p-3 map_card">
          <div id="mapcard" className="text-center text-white map_serving_card">
            <label id="mapcardlabel" className="py-2 poppins-Medium">
              Serving In
            </label>
          </div>

          <div id="city" style={{ display: `block`, padding: "20px" }}>
            <div className="row">
              {Serving.map((obj) => {
                return (
                  <>
                    <div className="col-4 mark-Bold common_gray ps-4">
                      <label>{obj.ServinginCity}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
}
