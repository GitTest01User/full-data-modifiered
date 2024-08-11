// var BaseURl = "https://techutcdigital.com";

// var QA = "/QA/api/ABB/";
// var QAAPi = "/QA/api/Master/";
// var Base = `${BaseURl}${QA}`;
// var BaseAPi = `${BaseURl}${QAAPi}`;
// var BaseURlTOKENQA = `${BaseURl}/QA/`;

// export default {
//   TokenApi: `${BaseURlTOKENQA}token`,

//   GetProductCategory: `${Base}GetProductCategory`,
//   GetProductType: `${Base}GetProductType`,
//   GetPlanPriceDetails: `${Base}GetPlanPriceDetails`,
//   GetAllBrandDetails: `${Base}GetAllBrandDetails`,
//   GetStateAndCityByPincode: `${BaseAPi}GetStateAndCityByPincode`,
//   PostAbbOrderPlace: `${Base}AbbOrderPlace`,
// };
var BaseURl = "https://techutcdigital.com";

var QA = "/QA/api/ABB/";
var QAAPi = "/QA/api/Master/";
var Base = `${BaseURl}${QA}`;
var BaseAPi = `${BaseURl}${QAAPi}`;
var BaseURlTOKENQA = `${BaseURl}/QA/`;

export default {
  TokenApi: `${BaseURlTOKENQA}token`,

  GetProductCategory: `${Base}GetProductCategory`,
  GetProductType: `${Base}GetProductType`,
  GetPlanPriceDetails: `${Base}GetPlanPriceDetails`,
  GetAllBrandDetails: `${Base}GetAllBrandDetails`,
  GetStateAndCityByPincode: `${BaseAPi}GetStateAndCityByPincode`,
  PostAbbOrderPlace: `${Base}AbbOrderPlace`,
  CreateOrder: `${Base}CreateOrder`,
  GetPlanDetailsGet: `${Base}GetPlanDetails`,
};
