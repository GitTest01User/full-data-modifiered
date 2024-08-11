var BaseURl = "https://techutcdigital.com/ERP_API_DEV/";

var ERP = "api/diagnostic/Questioners/";

var Base = `${BaseURl}${ERP}`;

var BaseURlTOKENERP = `${BaseURl}api/auth/`;

var OptNumber = `${BaseURl}api/Common/Notifications/`;

export default {
  TokenApi: `${BaseURlTOKENERP}token`,

  GetProductCategory: `${Base}GetProductCategory`,
  GetProductType: `${Base}GetProductType`,
  GetProductBrand: `${Base}GetProductBrands`,
  GetProductTechnology: `${Base}GetProductTechnology`,
  GetProductNonWorkingPrice: `${Base}GetProductNonWorkingPrice`,
  GetQuatedPrice: `${Base}GetQuatedPrice`,
  GetProductASP: `${Base}GetProductASP`,
  GetNumberOtp: `${OptNumber}SendOtp`,
  GetVerifyOtp: `${OptNumber}VerifyOtp`,
  GetListofQuestions: `${Base}GetListofQuestions`,
  GetNewQuatedPricev2: `${Base}GetNewQuatedPricev2`,
  AddProducts: `${Base}AddProducts`,
};
