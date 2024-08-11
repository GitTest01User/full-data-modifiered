import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Token from "../../WebService/Server/Token";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  var token = useSelector((state) => state.User.value);
  var detail = useSelector((state) => state.Detail.value);

  var tokenSb = useSelector((state) => state.UserBuy.value);
  var detailSb = useSelector((state) => state.DetailSb.value);
  var customerSb = useSelector((state) => state.CustomerSb.value);

  var productSb = useSelector((state) => state.ProductSb.value);

  var smartBuySb = useSelector((state) => state.SmartBuySb.value);
  var smartSellASPSb = useSelector((state) => state.DetailASP.value);
  var smartSellQuetion = useSelector((state) => state.Quetion.value);
  var smartSellDataPrice = useSelector((state) => state.PriceData.value);
  var smartSellASPrice = useSelector((state) => state.ASPPrice.value);

  const isLoginInTC = () => {
    if (token === null) {
      return false;
    } else {
      return true;
    }
  };
  const isLoginInGetPriceTC = () => {
    if (smartSellASPSb === null) {
      return false;
    } else {
      return true;
    }
  };

  const getIsLoginInTC = () => token;
  const getIsDetailInTC = () => detail;
  useEffect(() => {}, [getIsLoginInTC, getIsDetailInTC]);
  return (
    <AuthContext.Provider
      value={{
        isLoginInGetPriceTC,
        isLoginInTC,
        smartSellASPSb,
        getIsLoginInTC,
        getIsDetailInTC,
        smartBuySb,
        customerSb,
        tokenSb,
        productSb,
        detailSb,
        token,
        detail,
        smartSellQuetion,
        smartSellDataPrice,
        smartSellASPrice,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authContextValue = useContext(AuthContext);
  <Token />;
  if (!authContextValue) {
    throw new Error("Token Is Not Fonud");
  }
  return authContextValue;
};
