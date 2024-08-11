import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hidden, IconButton, useMediaQuery, Box, styled, useTheme, Button } from '@mui/material';

import { themeShadows } from 'app/components/MatxTheme/themeColors';

import useSettings from 'app/hooks/useSettings';
import { topBarHeight } from 'app/utils/constant';

import { useState } from 'react';
import Api from 'Service/Api';
import { useEffect } from 'react';

import { useAuthContext } from 'Context/AuthContext';
import UserIsLogin from 'app/views/material-kit/Component/UserLogin/UserIsLogin';
import UserDetail from 'app/views/material-kit/Component/UserLogin/UserDetail';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const TopbarRoot = styled('div')({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: 'all 0.3s ease'
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16
  }
}));

const Layout1Topbar = () => {
  var [userDetailData, setuserDetailData] = useState([]);
  var [userDetailDataRole, setuserDetailDataRole] = useState([]);
  const theme = useTheme();
  var navigates = useNavigate();
  var { user } = useAuthContext();
  const { settings, updateSettings } = useSettings();

  var UserDetails = user.user;

  var UserId = UserDetails.Id ? UserDetails.Id : 1;
  var user_role = UserDetails.user_role_Id ? UserDetails.user_role_Id : 3;

  useEffect(() => {
    LayouttapBar();
    UserRoleBar();
  }, [user]);

  var LayouttapBar = () => {
    UserDetail(UserId).then(handleResponse).then(processDetailData).catch(handleError);
  };
  var processDetailData = (data) => {
    if (data.Status) {
      setuserDetailData(data.result[0]);
    } else {
      alert('User Not Found');
    }
  };

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  var UserRoleBar = () => {
    UserIsLogin(user_role).then(handleResponse).then(processData).catch(handleError);
  };

  const processData = (data) => {
    if (data.Status) {
      setuserDetailDataRole(data.result[0].tblRole);
    } else {
      alert('User Not Found');
    }
  };

  // // var LayouttapBar = () => {
  // //   const myHeaders = new Headers();
  // //   myHeaders.append('Content-Type', 'application/json');
  // //   const requestOptions = {
  // //     method: 'GET',
  // //     redirect: 'follow',
  // //     headers: myHeaders
  // //   };

  // //   fetch(`${Api.RegisterAPiGet}?Id=${UserId}`, requestOptions)
  // //     .then((response) => response.json())
  // //     .then((result) => {
  // //       if (result.Status) {
  // //         console.log('result', result.result[0].first_name);

  // //         console.log('result New', result.result);
  // //       } else {
  // //         alert('user Not Found');
  // //       }
  // //     })
  // //     .catch((error) => console.error(error));
  // // };

  // const Role = () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append('Content-Type', 'application/json');
  //   const requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow',
  //     headers: myHeaders
  //   };

  //   fetch(`${Api.RegisterAPiGet}?user_role_Id=${user_role}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result.Status) {
  //         console.log(result.result[0].tblRole);
  //       } else {
  //         alert('user Not Found');
  //       }
  //     })
  //     .catch((error) => console.error(error));
  // };

  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: { leftSidebar: { ...sidebarSettings } }
    });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };
  var LogoutPage = () => {
    sessionStorage.removeItem('LoginUser');
    sessionStorage.removeItem('RegisterUser');
    navigates('/session/signin');
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <div display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <button type="button" id="collapsebtn">
              <span class="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </StyledIconButton>
        </div>

        <Box display="flex" alignItems="center">
          <div className="bg-opacity-10 border-end-0 d-flex">
            <img
              className="avatar m-1"
              src={`${Api.BaseURL}/${
                userDetailData.image_name ? userDetailData.image_name : 'placeholder-01-01 1.png'
              }`}
            />
            <Hidden xsDown>
              <span class="">
                <h6 className=" " style={{ margin: '10px 10px 10px 10px' }}>
                  {' '}
                  {userDetailDataRole.RoleName}
                  {'  '}
                  {userDetailData.first_name} {userDetailData.last_name}
                </h6>
              </span>
            </Hidden>
            <span className="py-xl-2 text-bg-light">|</span>
            <Button className="logoutwrapper py-xl-2 ">
              <img
                onClick={LogoutPage}
                style={{ color: 'blue' }}
                className="element_image"
                width="21px"
                src="/solid.png"
              />{' '}
            </Button>
          </div>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
