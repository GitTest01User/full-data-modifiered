import secureLocalStorage from "react-secure-storage";

export const doLogin = (LoginUser) => {
   secureLocalStorage.setItem("userInfo", JSON.stringify(LoginUser));
};

export const isLoginIn = () => {
  let data =  secureLocalStorage.getItem("userInfo");

  if (data == null) {
    return false;
  } else {
    return true;
  }
};

export const doLogout = () => {
   secureLocalStorage.removeItem("userInfo");
};

export const getCurrentUserDetail = () => {
  if (isLoginIn) {
    return JSON.parse( secureLocalStorage.getItem("userInfo"));
  } else {
    return false;
  }
};

export const doSmartBuyLogin = (LoginUser) => {
   secureLocalStorage.setItem("userInfoSmartBuy", JSON.stringify(LoginUser));
};

export const isSmartBuyLoginIn = () => {
  let data =  secureLocalStorage.getItem("userInfoSmartBuy");

  if (data == null) {
    return false;
  } else {
    return true;
  }
};

export const doSmartBuyLogout = () => {
   secureLocalStorage.removeItem("userInfoSmartBuy");
};

export const getSmartBuyCurrentUserDetail = () => {
  if (isLoginIn) {
    return JSON.parse( secureLocalStorage.getItem("userInfoSmartBuy"));
  } else {
    return false;
  }
};

export const doServerApiLogin = (LoginUser) => {
   secureLocalStorage.setItem("ProductTionServerApi", JSON.stringify(LoginUser));
};

export const isServerApiLoginIn = () => {
  let data =  secureLocalStorage.getItem("ProductTionServerApi");

  if (data == null) {
    return false;
  } else {
    return true;
  }
};

export const doServerApiLogout = () => {
   secureLocalStorage.removeItem("ProductTionServerApi");
};

export const getServerApiCurrentUserDetail = () => {
  if (isLoginIn) {
    return JSON.parse( secureLocalStorage.getItem("ProductTionServerApi"));
  } else {
    return false;
  }
};
