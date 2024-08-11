import React, { useEffect } from "react";

import WebService from "../WebService";
import ServerAPI from "./ServerAPI";
import { useDispatch } from "react-redux";
import { ChangeUserInfo } from "../../Redux/TokenSlice";
import { ChangeUserBInfo } from "../../Redux/TokenSmartBuySlice";
import ServerApiSmartBuy from "./ServerApiSmartBuy";

export default function Token() {
  var dispatch = useDispatch();

  const fetchDataSmartSell = async () => {
    try {
      const details = {
        grant_type: "password",
        username: "DtoC@digimart.co.in",
        password: "DtoC!2345",
      };

      const FormData = new URLSearchParams(details).toString();

      var responseSmartBuy = await WebService.postApiCall(
        ServerAPI.TokenApi,

        FormData
      );

      if (responseSmartBuy.status === 200) {
        var Token = responseSmartBuy.data.token;
        dispatch(ChangeUserInfo(Token));
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const fetchDataSmartBuy = async () => {
    try {
      const details = {
        grant_type: "password",
        username: "DtoC@digimart.co.in",
        password: "DtoC!2345",
      };

      const FormData = new URLSearchParams(details).toString();

      var response = await WebService.postApiCall(
        ServerApiSmartBuy.TokenApi,

        FormData
      );

      if (response.status === 200) {
        dispatch(ChangeUserBInfo(response.data.access_token));
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  // var fetchDataPro = async () => {
  //   try {
  //     const details = {
  //       grant_type: "password",
  //       username: "DtoC@digimart.co.in",
  //       password: "DtoC!2345",
  //     };

  //     const FormData = new URLSearchParams(details).toString();

  //     var Responce = await WebService.postApiCall(
  //       ProductTionServerApi.TokenApiProductTion,
  //       FormData
  //     );

  //     if (Responce.status === 200) {
  //       StoreTokenInPdTC(Responce.data.access_token);
  //       doLogin(Responce.data);
  //     }
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // };
  useEffect(() => {
    fetchDataSmartSell();
    fetchDataSmartBuy();
    // fetchDataSmartBuy();

    // fetchDataPro();
  }, []);
  return <div></div>;
}
