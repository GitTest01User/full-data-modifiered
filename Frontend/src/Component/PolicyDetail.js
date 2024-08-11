import React from "react";
import { useState } from "react";

import APi from "../WebService/APi";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Get from "../WebService/Fuction/Get";

export default function PolicyDetail() {
  var Location = useLocation();

  var [PolicyDetail, SetPolicyDetail] = useState([]);

  useEffect(() => {
    policydetail();
  }, [Location]);

  var route = Location.pathname;

  var policydetail = async () => {
    try {
      Get(
        `${
          APi.PolicyDetailGetAPi
        }?Route=${route}&PolicyConditionisActive=${true}`
      )
        .then(handleResponse)
        .then(processGetPolicyDetail)
        .catch(handleError);
    } catch (error) {
      console.log(error);
    }
  };

  const processGetPolicyDetail = (dataBase) => {
    console.log("result", dataBase);
    if (dataBase.Status) {
      SetPolicyDetail(dataBase.result);
    } else {
      SetPolicyDetail(dataBase.result);
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

  return (
    <div>
      {PolicyDetail.map((obj) => {
        return <title>{obj.Title}- Digi2L</title>;
      })}

      <div>
        <section
          className="blog_detail_hero position-relative py-2 mb-5 rocket-lazyload"
          style={{
            backgroundImage: `url("/Digi2limage/Pathbg.svg")`,
            backgroundRepeat: "no-repeat",
            marginTop: "0px",
            backgroundSize: "cover",
            height: "202px",
          }}
        >
          <img
            src="/Digi2limage/blog_detail1.svg"
            alt=""
            style={{ position: "absolute", right: "0px", bottom: "0px" }}
          />

          <img
            src="/Digi2limage/blog_detail2.svg"
            alt=""
            style={{ position: "absolute", left: "0px", top: "0px" }}
          />
          <div className="text-center py-5">
            {PolicyDetail.map((obj) => {
              return (
                <h4 className="poppins-SemiBold lh-base py-4">{obj.Title}</h4>
              );
            })}
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-10 mx-auto mb-4">
                {PolicyDetail.map((obj) => {
                  return (
                    <>
                      <div>
                        <p
                          dangerouslySetInnerHTML={{ __html: obj.ContentData }}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
