import { Card, Grid } from "@mui/material";
import { Box, styled, useTheme } from "@mui/material";

import { Paragraph } from "app/components/Typography";
import * as Yup from "yup";
import $ from "jquery";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Api from "Service/Api";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useRef } from "react";
import EnquriySweetAlart from "../material-kit/Component/AddCompnent/Dialog/EnquriySweetAlart";
import PostProcess from "../material-kit/Component/Function/Post";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: "white",
  minHeight: "100% !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 0,
    alignItems: "center",
  },
}));

const JwtRegister = () => {
  var navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const theme = useTheme();
  var PasswordBox = useRef();
  var PhoneBox = useRef();
  var EmailBox = useRef();
  var NameBox = useRef();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    var uname = NameBox.current.value;
    var email = EmailBox.current.value;
    var password = PasswordBox.current.value;
    var phone = PhoneBox.current.value;

    var obj = JSON.stringify({
      first_name: uname,
      last_name: null,
      user_email: email,
      user_phone: phone,
      user_pass: password,
      Gender: null,

      user_role_Id: 3,
    });

    PostProcess(Api.RegisterAPi, obj)
      .then(handleResponse)
      .then((result) => processPost(result, event))
      .catch(handleError);
  };

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log("Error fetching user role:", error);
  };

  const processPost = (result, event) => {
    if (result.status) {
      event.target.reset();

      setClicked(false);

      EnquriySweetAlart("Create").then(() => {
        navigate("/session/signin");
      });
    } else {
      setClicked(false);
      EnquriySweetAlart("Fail-Create", result.message);
    }
  };

  useEffect(() => {
  
    $("#PhoneCodes").keydown((e) => {
      if (e.which === 8) {
        return true;
      }
      return !String.fromCharCode(e.which).match(/[^0-9 \-]/);
    });
  }, []);

  return (
    <JWTRoot>
      <title>Digi2l - Sign Up</title>
      <Card className="card ">
        {}
        <Grid container>
          <Grid item sm={6} xs={12} className="bg-body">
            <JustifyBox p={4} height="100%" sx={{ minWidth: 256 }}>
              <img src="/Digi2limage/works_3-1.png.webp" width="100%" alt="body" />
            </JustifyBox>
          </Grid>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <div>
                <JustifyBox p={4} sx={{ minWidth: 320 }}>
                  <img
                    className="loginlogowrap"
                    src="/Digi2limage/logo12223231.svg"
                    alt=""
                  />
                </JustifyBox>
                <form
                  onSubmit={handleFormSubmit}
                  className={clicked ? "was-validated" : ""}
                >
                  <h1 className="mb-3 text-center">Register</h1>
                  <div className="row">
                    <div className="mb-3 col-md-12">
                      <label>Your Name </label>
                      <input
                        id="UserNameText"
                        placeholder="Enter name"
                        ref={NameBox}
                        className="form-control"
                        required
                        autoComplete="off"
                        maxLength={20}
                      />
                      <div class="invalid-feedback">
                        Please fill out name field.
                      </div>
                    </div>
                    <div className="mb-3 col-md-12">
                      <label>Your Email</label>
                      <input
                        placeholder="Enter email"
                        className="form-control"
                        required
                        ref={EmailBox}
                        autoComplete="off"
                        maxLength={50}
                      />
                      <div class="invalid-feedback">
                        Please fill out email field.
                      </div>
                    </div>
                    <div className="mb-3 col-md-12">
                      <label>Your Phone</label>
                      <input
                        id="PhoneCodes"
                        placeholder="Enter phone"
                        ref={PhoneBox}
                        className="form-control"
                        required
                        autoComplete="off"
                        maxLength={10}
                        minLength={10}
                      />
                      <div class="invalid-feedback">
                        Please fill out phone field.
                      </div>
                    </div>
                    <div className="mb-3 col-md-12">
                      <label>Your Password</label>
                      <input
                        ref={PasswordBox}
                        placeholder="Enter password"
                        className="form-control"
                        required
                        autoComplete="off"
                        maxLength={50}
                      />
                      <div class="invalid-feedback">
                        Please fill out password field.
                      </div>
                    </div>

                    <input
                      onClick={() => setClicked(true)}
                      type="submit"
                      value="Sign Up"
                      className="btn btn-primary w-100 mb-3 mt-2 "
                    />
                  </div>
                  <Paragraph>
                    {" "}
                    <label> Don't have an account? </label>
                    <NavLink
                      to="/session/signin"
                      style={{
                        color: theme.palette.primary.main,
                        marginLeft: 5,
                      }}
                    >
                      <label>Login</label>
                    </NavLink>
                  </Paragraph>
                </form>
              </div>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtRegister;
