import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ChackValue from "../../Component/ChackValue";
import GetExactValue from "../../Component/GetExactValue";
import ProductReviews from "../../Component/ProductReviews";
import ProductReviews2 from "../../Component/ProductReviews2";
import ProductReviews3 from "../../Component/ProductReview3";
const PrivateRoute = () => {
  var detailIsActive = useSelector((state) => state.Detail.value);
  const isAuthenticated = detailIsActive.isActive;

  return isAuthenticated ? <ChackValue /> : <Navigate to="/smart-sell/" />;
};

export const PrivateRouteValue = () => {
  var ASPActive = useSelector((state) => state.DetailASP.value);
  const isAuthenticatedASP = ASPActive.isActive;
  
  return isAuthenticatedASP ? (
    <GetExactValue />
  ) : (
    <Navigate to="/value-check/" />
  );
};

export const PrivateRouteSmartBuyValue = () => {
  var SmartBuySbs = useSelector((state) => state.SmartBuySb.value);
  const isAuthenticatedSB = SmartBuySbs.isActive;
  
  return isAuthenticatedSB ? (
    <ProductReviews />
  ) : (
    <Navigate to="/assured-buyback/" />
  );
};

export const PrivateRouteSmartBuyOneValue = () => {
  var CustomerSbSbs = useSelector((state) => state.CustomerSb.value);
  const isAuthenticatedCustomerSbSbs = CustomerSbSbs.isActive;

  return isAuthenticatedCustomerSbSbs ? (
    <ProductReviews2 />
  ) : (
    <Navigate to="/product-review" />
  );
};
export const PrivateRouteSmartBuyTwoValue = () => {
  var ProductSbSbs = useSelector((state) => state.ProductSb.value);
  const isAuthenticatedProductSb = ProductSbSbs.isActive;

  return isAuthenticatedProductSb ? (
    <ProductReviews3 />
  ) : (
    <Navigate to="/product-review2" />
  );
};
export default PrivateRoute;
