import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  var LoginActive = useSelector((state) => state.Login.value);
  const isAuthenticatedASP = LoginActive.IsActive;
  const { pathname } = useLocation();

  if (isAuthenticatedASP) return <>{children}</>;

  return <Navigate replace to="/session/signin" state={{ from: pathname }} />;
};

export default AuthGuard;

// import { isLoginIn } from 'Service/auth/auth';
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const AuthGuard = ({ children }) => {
//   const isAuthenticated = isLoginIn();
//   console.log('isAuthenticated', isAuthenticated);
//   if (!isAuthenticated && isAuthenticated == null) {
//     return <Navigate to="/session/signin" />;
//   }

//   return children;
// };

// export default AuthGuard;
