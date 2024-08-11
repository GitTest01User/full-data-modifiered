import { Card, Checkbox, Grid, Icon } from '@mui/material';
import { Box, styled, useTheme } from '@mui/material';
import { doLogin } from 'Service/auth/auth';
import { Paragraph } from 'app/components/Typography';

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Api from 'Service/Api';

import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ChangeUserInfo } from 'Redux/UserLoginSlice';
import EnquriySweetAlart from '../material-kit/Component/AddCompnent/Dialog/EnquriySweetAlart';
import PostProcess from '../material-kit/Component/Function/Post';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: 'white',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 0,
    alignItems: 'center'
  }
}));

const JwtLogin = () => {
  const [clicked, setClicked] = useState(false);
  const [clickedDb, setClickedDb] = useState(false);
  var dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  var RememberBox = useRef();
  var PasswordBox = useRef();
  var EmailBox = useRef();
  const handleFormSubmit = async (event) => {
    setClickedDb(true)
    event.preventDefault();
    var email = EmailBox.current.value;
    var password = PasswordBox.current.value;
    var raw = JSON.stringify({
      user_email: email,
      user_pass: password
    });
    PostProcess(Api.LoginAPi, raw)
      .then(handleResponse)
      .then((result) => processPost(result))
      .catch(handleError);
  };
  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    setClicked(false);
    setClickedDb(true)
    EnquriySweetAlart('Fail-Create', error);
  };

  const processPost = (result) => {

    if (result.status) {
      if (RememberBox != null) {
        var detail = { IsActive: true, result };
        dispatch(ChangeUserInfo(detail));
      }
      setClicked(false);
      setClickedDb(true)
      doLogin(result, () => {
        EnquriySweetAlart('Update').then(() => {
          navigate('/');
        });
      });

    } else {
      setClickedDb(true)
      EnquriySweetAlart('Fail-Create', result.message);
      setClickedDb(false)
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <JWTRoot>
      <title>Backend - SignIn</title>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12} className="bg-body">
            <JustifyBox p={4} height="100%" sx={{ minWidth: 256 }}>
              <img src="/Digi2limage/works_1-2.png.webp" width="100%" alt="" />
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <JustifyBox p={4} sx={{ minWidth: 320 }}>
                <img
                  className="loginlogowrap MuiBox-root bg-body bo css-5y1pb0"
                  src="/Digi2limage/logo12223231.svg"
                  alt=""
                />
              </JustifyBox>
              <form onSubmit={handleFormSubmit} className={clicked ? 'was-validated' : ''}>
                <h1 className="mb-3 text-center">Login</h1>
                <div className="mb-4 form-group mb-3">
                  <label>
                    Email <span style={{ color: 'red' }}>*</span>
                  </label>
                  <div className="input-group" id="PasswordInput">
                    <span className="input-group-text" id="basic-addon2">
                      <Icon className="text-gray-600">mail_outline</Icon>
                    </span>
                    <input
                      placeholder="Email"
                      className="form-control"
                      ref={EmailBox}
                      required
                      id="UserViewModel_Password"
                      name="UserViewModel.Password"
                      autoComplete="off"
                    />
                    <div class="invalid-feedback">Please fill out email field.</div>
                    <span
                      className="position-absolute right-0"
                      style={{
                        cursor: 'pointer',
                        borderLeft: 'none',
                        right: '0px',
                        margin: '8px',
                        padding: '2px'
                      }}
                    ></span>
                  </div>
                  <span className="position-absolute right-0"></span>
                </div>

                <div className="mb-4 form-group mb-3">
                  <label>
                    Password <span style={{ color: 'red' }}>*</span>
                  </label>
                  <div className="input-group" id="PasswordInput">
                    <span className="input-group-text" id="basic-addon2">
                      <Icon className="text-gray-600">lock_outline</Icon>
                    </span>
                    <input
                      ref={PasswordBox}
                      placeholder="Password"
                      required
                      className="form-control valid"
                      type={showPassword ? 'text' : 'password'}
                      id="UserViewModel_Password"
                      name="UserViewModel.Password"
                      autoComplete="off"
                    />
                    <div class="invalid-feedback">Please fill out password field.</div>
                    <span
                      className="position-absolute right-0"
                      style={{
                        cursor: 'pointer',
                        borderLeft: 'none',
                        right: '0px',
                        margin: '8px',
                        padding: '2px',
                        zIndex: '999999'
                      }}
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <Icon className="text-gray-600 ">visibility</Icon>
                      ) : (
                        <Icon className="text-gray-600">visibility_off</Icon>
                      )}
                    </span>
                  </div>
                  <span
                    className="text-danger field-validation-valid"
                    data-valmsg-for="UserViewModel.Password"
                    data-valmsg-replace="true"
                  ></span>
                </div>

                <FlexBox justifyContent="space-between">
                  <FlexBox gap={1}>
                    <label>
                      {' '}
                      <Checkbox size="small" ref={RememberBox} sx={{ padding: 0 }} />
                      Remember Me
                    </label>
                  </FlexBox>

                  <NavLink
                    to="/session/forgot-password"
                    style={{ color: theme.palette.primary.main }}
                  >
                    <label>Forgot password?</label>
                  </NavLink>
                </FlexBox>

                {clickedDb ? <>  <input
                  onClick={() => setClicked(true)}
                  value="Sign In"
                  type="submit"
                  disabled
                  className="btn btn-primary w-100 mb-3 mt-2 "
                />
                  <p>Pleace wait login user?</p>
                </> : <>   <input
                  onClick={() => setClicked(true)}
                  value="Sign In"
                  type="submit"
                  className="btn btn-primary w-100 mb-3 mt-2 "

                /></>}

                <Paragraph>
                  {' '}
                  <label> Don't have an account? </label>
                  <NavLink
                    to="/session/signup"
                    style={{
                      color: theme.palette.primary.main,
                      marginLeft: 5
                    }}
                  >
                    <label> Register</label>
                  </NavLink>
                </Paragraph>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtLogin;
