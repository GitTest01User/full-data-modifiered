// // import { lazy } from 'react';
// // import { Navigate } from 'react-router-dom';
// // import AuthGuard from './auth/AuthGuard';
// // import { authRoles } from './auth/authRoles';
// // import Loadable from './components/Loadable';
// // import MatxLayout from './components/MatxLayout/MatxLayout';
// // import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// // // session pages
// // const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
// // const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
// // const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
// // const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// // // echart page
// // const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// // // dashboard page
// // const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));
// // var loginsessionUser = sessionStorage.getItem('LoginUser');
// // var UserDetails = JSON.parse(loginsessionUser);
// // var status = UserDetails.status;
// // console.log('status', status);
// // if (status == null) {
// //   var routes = [
// //     { path: '/session/404', element: <NotFound /> },
// //     { path: '/session/signin', element: <JwtLogin /> },
// //     { path: '/session/signup', element: <JwtRegister /> },
// //     { path: '/session/forgot-password', element: <ForgotPassword /> },

// //     { path: '/', element: <Navigate to="/session/signin" /> },
// //     { path: '*', element: <NotFound /> }
// //   ];
// // } else {
// //   var routes = [
// //     {
// //       element: (
// //         <AuthGuard>
// //           <MatxLayout />
// //         </AuthGuard>
// //       ),
// //       children: [
// //         ...materialRoutes,

// //         {
// //           path: '/dashboard/default',
// //           element: <Analytics />,
// //           auth: authRoles.admin
// //         },

// //         // e-chart rooute
// //         {
// //           path: '/charts/echarts',
// //           element: <AppEchart />,
// //           auth: authRoles.editor
// //         }
// //       ]
// //     },

// //     { path: '/session/404', element: <NotFound /> },
// //     { path: '/session/signin', element: <JwtLogin /> },
// //     { path: '/session/signup', element: <JwtRegister /> },
// //     { path: '/session/forgot-password', element: <ForgotPassword /> },

// //     { path: '/', element: <Navigate to="/session/signin" /> },
// //     { path: '*', element: <NotFound /> }
// //   ];
// // }

// // export default routes;

// // import { lazy } from 'react';
// // import { Navigate } from 'react-router-dom';
// // import AuthGuard from './auth/AuthGuard';
// // import { authRoles } from './auth/authRoles';
// // import Loadable from './components/Loadable';
// // import MatxLayout from './components/MatxLayout/MatxLayout';
// // import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// // // session pages
// // const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
// // const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
// // const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));
// // const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
// // const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// // // echart page
// // const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// // // let routes;

// // // // Retrieve user details from session storage
// // // const loginsessionUser = sessionStorage.getItem('LoginUser');
// // // const UserDetails = loginsessionUser ? JSON.parse(loginsessionUser) : null;
// // // const status = UserDetails?.status;

// // // if (status == true) {
// // //   // Unauthenticated routes
// // //   routes = [
// // //     {
// // //       element: (
// // //         <AuthGuard>
// // //           <MatxLayout />
// // //         </AuthGuard>
// // //       ),
// // //       children: [
// // //         ...materialRoutes,
// // //         {
// // //           path: '/dashboard/default',
// // //           element: <Analytics />
// // //         },
// // //         {
// // //           path: '/charts/echarts',
// // //           element: <AppEchart />
// // //         }
// // //       ]
// // //     },
// // //     // { path: '/session/404', element: <NotFound /> },
// // //     { path: '/session/signin', element: <JwtLogin /> },
// // //     { path: '/session/signup', element: <JwtRegister /> },
// // //     { path: '/session/forgot-password', element: <ForgotPassword /> },
// // //     { path: '/', element: <Navigate to="/dashboard/default" /> }
// // //     // { path: '*', element: <NotFound /> }
// // //   ];
// // // } else {
// // //   routes = [
// // //     { path: '/session/404', element: <NotFound /> },
// // //     { path: '/session/signin', element: <JwtLogin /> },
// // //     { path: '/session/signup', element: <JwtRegister /> },
// // //     { path: '/session/forgot-password', element: <ForgotPassword /> },
// // //     { path: '/', element: <Navigate to="/session/signin" /> },
// // //     { path: '*', element: <NotFound /> }
// // //   ];
// // // }

// // // let routes;

// // // const loginsessionUser = sessionStorage.getItem('LoginUser');
// // // var UserStatus = JSON.parse(loginsessionUser);
// // // if (UserStatus.status == true) {

// // //   routes = [
// // //     {
// // //       element: (
// // //         <AuthGuard>
// // //           <MatxLayout />
// // //         </AuthGuard>
// // //       ),
// // //       children: [
// // //         ...materialRoutes,
// // //         {
// // //           path: '/dashboard/default',
// // //           element: <Analytics />
// // //         },
// // //         {
// // //           path: '/charts/echarts',
// // //           element: <AppEchart />
// // //         }
// // //       ]
// // //     },
// // //     { path: '/session/signin', element: <JwtLogin /> },
// // //     { path: '/session/signup', element: <JwtRegister /> },
// // //     { path: '/session/forgot-password', element: <ForgotPassword /> },
// // //     { path: '/', element: <Navigate to="/dashboard/default" /> },
// // //     { path: '/session/404', element: <NotFound /> }
// // //   ];
// // // } else {
// // //   routes = [
// // //     { path: '/session/signin', element: <JwtLogin /> },
// // //     { path: '/session/signup', element: <JwtRegister /> },
// // //     { path: '/session/forgot-password', element: <ForgotPassword /> },
// // //     { path: '/', element: <Navigate to="/session/signin" /> },
// // //     { path: '*', element: <NotFound /> }
// // //   ];
// // // }

// // const loginsessionUser = sessionStorage.getItem('LoginUser');
// // // var UserStatus = JSON.parse(loginsessionUser);

// // // const isAuthenticated = UserStatus.status === true;

// // // const routes = isAuthenticated
// // //   ? isAuthenticated
// // //   : false
// // //   ? [
// // //       {
// // //         element: (
// // //           <AuthGuard>
// // //             <MatxLayout />
// // //           </AuthGuard>
// // //         ),
// // //         children: [
// // //           ...materialRoutes,
// // //           { path: '/dashboard/default', element: <Analytics /> },
// // //           { path: '/charts/echarts', element: <AppEchart /> }
// // //         ]
// // //       },
// // //       { path: '/session/signin', element: <JwtLogin /> },
// // //       { path: '/session/signup', element: <JwtRegister /> },
// // //       { path: '/session/forgot-password', element: <ForgotPassword /> },
// // //       { path: '/', element: <Navigate to="/dashboard/default" /> },
// // //       { path: '/session/404', element: <NotFound /> }
// // //     ]
// // //   : null[
// // //       ({ path: '/session/signin', element: <JwtLogin /> },
// // //       { path: '/dashboard/default', element: <JwtLogin /> },
// // //       { path: '/session/signup', element: <JwtRegister /> },
// // //       { path: '/session/forgot-password', element: <ForgotPassword /> },
// // //       { path: '/', element: <Navigate to="/session/signin" /> },
// // //       { path: '*', element: <NotFound /> })
// // //     ];

// // var UserStatus = JSON.parse(loginsessionUser);

// // const isAuthenticated = UserStatus && UserStatus.status === true;

// // const routes = isAuthenticated
// //   ? [
// //       {
// //         element: (
// //           <AuthGuard>
// //             <MatxLayout />
// //           </AuthGuard>
// //         ),
// //         children: [
// //           ...materialRoutes,
// //           { path: '/dashboard/default', element: <Analytics /> },
// //           { path: '/charts/echarts', element: <AppEchart /> }
// //         ]
// //       },
// //       { path: '/dashboard/default', element: <Analytics /> },
// //       { path: '/session/signup', element: <JwtRegister /> },
// //       { path: '/session/forgot-password', element: <ForgotPassword /> },
// //       { path: '/dashboard/default', element: <Navigate to="/dashboard/default" /> },
// //       { path: '/session/404', element: <NotFound /> }
// //     ]
// //   : [
// //       { path: '/session/signin', element: <JwtLogin /> },
// //       { path: '/session/signup', element: <JwtRegister /> },
// //       { path: '/session/forgot-password', element: <ForgotPassword /> },
// //       { path: '/', element: <Navigate to="/session/signin" /> },
// //       { path: '*', element: <NotFound /> }
// //     ];

// // export default routes;

// import React from 'react';
// import { lazy } from 'react';
// import { Navigate } from 'react-router-dom';
// import AuthGuard from './auth/AuthGuard';
// import { authRoles } from './auth/authRoles';
// import Loadable from './components/Loadable';
// import MatxLayout from './components/MatxLayout/MatxLayout';
// import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// const Routes = () => {
//   // session pages
//   const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
//   const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
//   const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
//   const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

//   // echart page
//   const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

//   // dashboard page
//   var loginsessionUser = sessionStorage.getItem('LoginUser');
//   var UserDetails = JSON.parse(loginsessionUser);
//   var status = UserDetails?.status;
//   console.log('status', status);

//   var routes = [
//     {
//       element: (
//         <AuthGuard>
//           <MatxLayout />
//         </AuthGuard>
//       ),
//       children: [
//         ...materialRoutes,

//         {
//           path: '/dashboard/default',
//           element: <Analytics />,
//           auth: authRoles.admin
//         },

//         // e-chart route
//         {
//           path: '/charts/echarts',
//           element: <AppEchart />,
//           auth: authRoles.editor
//         }
//       ]
//     },

//     { path: '/session/404', element: <NotFound /> },
//     { path: '/session/signin', element: <JwtLogin /> },
//     { path: '/session/signup', element: <JwtRegister /> },
//     { path: '/session/forgot-password', element: <ForgotPassword /> },

//     { path: '/', element: <Navigate to="/session/signin" /> },
//     { path: '*', element: <NotFound /> }
//   ];
// };

// export default Routes;

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.admin
      },

      // e-chart rooute
      {
        path: '/charts/echarts',
        element: <AppEchart />,
        auth: authRoles.editor
      }
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },

  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> },
  { path: '/backend', element: <JwtLogin /> },
];

export default routes;
