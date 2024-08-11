import { configureStore } from "@reduxjs/toolkit";

import DataReducer from "./Dataslice";
import DataReducers from "./TokenSlice";
import DataReducerBuy from "./TokenSmartBuySlice";
import DataReducerSBDetailBuy from "./DetailSb";
import DataReducerSBDetailCustomerBuy from "./CustomerSbSlice";
import DataReducerSBDetailProductBuy from "./ProductSbSlice";
import DataReducerSmartBuyBuy from "./SmartBuyPriceSlice";
import DataReducerASPBuy from "./GetProductASPSSell";
import DataReducerQuetion from "./QuetionSlice";
import DataReducerDataPrice from "./DataPriceSlice";
import DataReducerASPPrice from "./ASPSclice";
var store = configureStore({
  reducer: {
    User: DataReducers,
    Detail: DataReducer,
    UserBuy: DataReducerBuy,
    DetailSb: DataReducerSBDetailBuy,
    CustomerSb: DataReducerSBDetailCustomerBuy,
    ProductSb: DataReducerSBDetailProductBuy,
    SmartBuySb: DataReducerSmartBuyBuy,
    DetailASP: DataReducerASPBuy,
    Quetion: DataReducerQuetion,
    PriceData: DataReducerDataPrice,
    ASPPrice: DataReducerASPPrice,
  },
});
export default store;
