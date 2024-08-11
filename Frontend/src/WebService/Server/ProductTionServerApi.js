var BaseURl = "http://utcbridge.com";

var BaseURlTOKENERP = `${BaseURl}/UTCAPI/`;

var ProductTion = "/api/Master/";

var Base = `${BaseURl}${ProductTion}`;

export default {
  TokenApiProductTion: `${BaseURlTOKENERP}token`,
  PinCodeApi: `${Base}GetPincodeForMyGate`,
};
