import React, { useEffect } from "react";

import { BrowserRouter, useLocation } from "react-router-dom";
import UseRoutes from "./WebService/Routes/UseRoutes";

import Token from "./WebService/Server/Token";

export default function App() {
  return (
    <div>
      <div>
        <BrowserRouter>
          <GoToTop />

          <UseRoutes>
            <Token />
          </UseRoutes>
        </BrowserRouter>
      </div>
    </div>
  );
}

function GoToTop() {
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  const routePath = useLocation();
  const onTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  useEffect(() => {
    setIsAlertVisible(true);
    onTop();

    setTimeout(() => {
      setIsAlertVisible(false);
    }, 800);
  }, [routePath]);

  if (isAlertVisible) {
    return (
      <div className="loader">
        <div class="loaderwrap">
          <img src="/Digi2limage/digi2l-gif.gif" />
          <p>Please Wait ...</p>
        </div>
      </div>
    );
  }
}

// // Create a context object
// export const MyContext = createContext();

// // Create a provider component
// const MyProvider = ({ children }) => {
//   const [value, setValue] = useState([]);
//   var User = getCurrentUserDetail();
//   var userToken = () => {
//     setValue(User);
//   };
//   useEffect(() => {
//     userToken();
//   },[]);
//   return (
//     <MyContext.Provider value={{ value, setValue }}>
//       {children}
//     </MyContext.Provider>
//   );
// };

// // const useMyContext = () => useContext(MyContext);

// // const MyComponent = () => {
// //   const { value, setValue } = useMyContext();
// //   console.log("value", value);
// //   return (
// //     <div>
// //       <p>Current Value: {value} </p>
// //     </div>
// //   );
// // };
