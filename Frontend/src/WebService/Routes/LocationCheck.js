// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import WebService from "../WebService";
// import APi from "../APi";

// const LocationCheck = async (apiEndpoint) => {
//   const navigate = useNavigate();

//   try {
//     const response = await WebService.GetApiCall(
//       `${APi.HeaderMenuGetApi}?HeaderPermaLink=${apiEndpoint}`
//     );
//     if (response.data.result.length === 0) {
//       console.log(response.data.result);
//       navigate("*");
//     } else {
//       console.log(response.data.result);
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// export default LocationCheck;
