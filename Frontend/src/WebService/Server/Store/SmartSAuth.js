import secureLocalStorage from "react-secure-storage";

export const doLoginSmartSell = (LoginUser) => {
   secureLocalStorage.setItem("userInfo-value-check", JSON.stringify(LoginUser));
};

export const isLoginInSmartSell = () => {
  let data =  secureLocalStorage.getItem("userInfo-value-check");

  if (data == null) {
    return false;
  } else {
    return true;
  }
};

export const doLogoutSmartSell = () => {
   secureLocalStorage.removeItem("userInfo-value-check");
};

export const getCurrentSmartSellDetails = () => {
  if (isLoginInSmartSell) {
    return JSON.parse( secureLocalStorage.getItem("userInfo-value-check"));
  } else {
    return false;
  }
};

export const doSelectedCategoryLogin = (LoginUser) => {
   secureLocalStorage.setItem("SelectedCategory", JSON.stringify(LoginUser));
};

export const isSelectedCategoryLoginIn = () => {
  let data =  secureLocalStorage.getItem("SelectedCategory");

  if (data == null) {
    return false;
  } else {
    return true;
  }
};

export const doSelectedCategoryLogout = (next) => {
   secureLocalStorage.removeItem("SelectedCategory");
};

export const getSelectedCategoryCurrentUserDetail = () => {
  if (isSelectedCategoryLoginIn) {
    return JSON.parse( secureLocalStorage.getItem("SelectedCategory")).user;
  } else {
    return false;
  }
};

export const doSelectedTypeLogin = (LoginUser) => {
   secureLocalStorage.setItem("SelectedType", JSON.stringify(LoginUser));
};

export const isSelectedTypeLoginIn = () => {
  let data =  secureLocalStorage.getItem("SelectedType");

  if (data == null) {
    return false;
  } else {
    return true;
  }
};

export const doSelectedTypeLogout = (next) => {
   secureLocalStorage.removeItem("SelectedType");
};

export const getSelectedTypeCurrentUserDetail = () => {
  if (isSelectedTypeLoginIn) {
    return JSON.parse( secureLocalStorage.getItem("SelectedType")).user;
  } else {
    return false;
  }
};

export const doSelectedBrandLogin = (LoginUser) => {
   secureLocalStorage.setItem("SelectedBrand", JSON.stringify(LoginUser));
};

export const isSelectedBrandLoginIn = () => {
  let data =  secureLocalStorage.getItem("SelectedBrand");

  if (data == null) {
    return false;
  } else {
    return true;
  }
};

export const doSelectedBrandLogout = (next) => {
   secureLocalStorage.removeItem("SelectedBrand");
};

export const getSelectedBrandCurrentUserDetail = () => {
  if (isSelectedBrandLoginIn) {
    return JSON.parse( secureLocalStorage.getItem("SelectedBrand")).user;
  } else {
    return false;
  }
};

export const doSelectedTechnologyLogin = (LoginUser) => {
   secureLocalStorage.setItem("SelectedTechnology", JSON.stringify(LoginUser));
};

export const isSelectedTechnologyLoginIn = () => {
  let data =  secureLocalStorage.getItem("SelectedTechnology");

  if (data == null) {
    return false;
  } else {
    return true;
  }
};

export const doSelectedTechnologyLogout = (next) => {
   secureLocalStorage.removeItem("SelectedTechnology");
};

export const getSelectedTechnologyCurrentUserDetail = () => {
  if (isSelectedTechnologyLoginIn) {
    return JSON.parse( secureLocalStorage.getItem("SelectedTechnology"));
  } else {
    return false;
  }
};

export const AllSelectedData = () => {
  if (
    getSelectedCategoryCurrentUserDetail() != null &&
    getSelectedTechnologyCurrentUserDetail() != null &&
    getSelectedBrandCurrentUserDetail() != null &&
    getSelectedTypeCurrentUserDetail() != null
  ) {
    return true;
  } else {
    return false;
  }
};

