import { Box, Button, Card, Grid, styled, TextField } from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import Api from 'Service/Api';
import PostProcess from '../material-kit/Component/Function/Post';
import EnquriySweetAlart from '../material-kit/Component/AddCompnent/Dialog/EnquriySweetAlart';
const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center'
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: 'center'
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: 32,

  background: 'rgba(0, 0, 0, 0.01)'
}));

const ForgotPasswordRoot = styled(JustifyBox)(() => ({
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    margin: '1rem',
    borderRadius: 0
  }
}));

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [resetTokenUser, setResetTokenUser] = useState('');
  const [InVaild, setInValid] = useState('');
  const [clicked, setClicked] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  var EmailBox = useRef();
  var PasswordBox = useRef();
  const handleFormSubmit = (event) => {
    event.preventDefault();
    var email = EmailBox.current.value;

    var raw = JSON.stringify({ user_email: email });

    PostProcess(Api.ResetLinkApi, raw)
      .then(handleResponse)
      .then((result) => processPost(result, event))
      .catch(handleError);
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

  const processPost = (result, event) => {
    if (result.status) {
      var resetToken = result.resetToken;
      setResetTokenUser(resetToken);
      setClicked(false);
      setIsAlertVisible(true);

      event.target.reset();
    } else {
      setClicked(false);
      setInValid('Invalid Email address.');

      EnquriySweetAlart('Fail-Create', result.message);
    }
  };

  const handleFormPasswordSubmit = (event) => {
    event.preventDefault();

    var password = PasswordBox.current.value;
    var myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      newPassword: password
    });

    PostProcess(Api.ForgotPassword, raw, resetTokenUser)
      .then(handleResponse)
      .then((result) => processPostPassword(result, event))
      .catch(handleError);
  };
  const processPostPassword = (result, event) => {
    if (result.status) {
      setClicked(false);

      EnquriySweetAlart('Update').then(() => {
        navigate('/session/signin');
      });
      event.target.reset();
    } else {
      setClicked(false);

      EnquriySweetAlart('Fail-Create', result.message);
    }
  };

  return (
    <ForgotPasswordRoot className="bg-white">
      <title>Admin panel - forgot Password</title>
      <Card className="card bg-white">
        <Grid container className=" bg-white">
          <Grid item xs={12}>
            <JustifyBox p={3}>
              <img width="200" src="/Digi2limage/logo12223231.svg" alt="" />
            </JustifyBox>
            {isAlertVisible ? (
              <ContentBox id="PasswordBox">
                <form
                  onSubmit={handleFormPasswordSubmit}
                  className={clicked ? 'was-validated' : ''}
                >
                  <div className="mb-2 form-group">
                    <h1 className="text-center">Change Your Password </h1>

                    <label>
                      New Password <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter password"
                      ref={PasswordBox}
                      required
                    />
                    <div class="invalid-feedback">Please fill out password field.</div>
                  </div>
                  <Paragraph className="p-1">
                    If you change or reset your password, you’ll be signed out everywhere .
                  </Paragraph>
                  <input
                    onClick={() => setClicked(true)}
                    value=" New Update"
                    fullWidth
                    type="submit"
                    className="btn btn-primary  mb-3 mt-2 w-100"
                  />

                  {isAlertVisible ? <label style={{ color: 'red' }}>{InVaild}</label> : ''}

                  <Button
                    fullWidth
                    className="btn btn-primary mb-3 mt-2 "
                    onClick={() => navigate(-1)}
                    sx={{ mt: 2 }}
                  >
                    Go Back
                  </Button>
                </form>
              </ContentBox>
            ) : (
              <ContentBox id="EmailBox">
                <form onSubmit={handleFormSubmit} className={clicked ? 'was-validated' : ''}>
                  <div className="mb-2 form-group">
                    <h1>Forgot Password?</h1>

                    <label>
                      Email <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter a Email"
                      ref={EmailBox}
                      required
                    />
                    <div class="invalid-feedback">Please fill out email field.</div>
                  </div>
                  <Paragraph className="p-1">
                    Enter your email address to reset your password
                  </Paragraph>

                  <input
                    onClick={() => setClicked(true)}
                    value=" forgot"
                    fullWidth
                    type="submit"
                    className="btn btn-primary  mb-3 mt-2 w-100"
                  />

                  {InVaild ? <label style={{ color: 'red' }}>{InVaild}</label> : ''}

                  <Button
                    type="submit"
                    fullWidth
                    className="btn btn-primary mb-3 mt-2 "
                    sx={{ mt: 2 }}
                  >
                    Go Back
                  </Button>
                </form>
              </ContentBox>
            )}
          </Grid>
        </Grid>
      </Card>
    </ForgotPasswordRoot>
  );
};

export default ForgotPassword;
