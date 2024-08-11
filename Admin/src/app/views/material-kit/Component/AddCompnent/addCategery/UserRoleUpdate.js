


import Api from "Service/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "Context/AuthContext";
import Error from "../Dialog/Error";
import Success from "../Dialog/Success";
import { Stack } from "@mui/material";

import { styled } from "@mui/material";
import { SimpleCard } from "app/components";
import UserIsLogin from "../../UserLogin/UserIsLogin";
import UserDetail from "../../UserLogin/UserDetail";
import GoBack from "../../Button/GoBack";
import Get from "../../Function/Get";
import EnquriySweetAlart from "../Dialog/EnquriySweetAlart";
import Update from "../../Function/Update";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const UserRoleUpdate = () => {
  var { user } = useAuthContext();
  var location = useLocation();
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);
  
  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams.get("Id"));
  var idNew = queryParams.get("Id");

  var navigate = useNavigate();
  var SelectBox = useRef();
  var [ShowEdit, setShowEdit] = useState(false);

  const [suggestions, setSuggestions] = useState([]);

  var UserId = idNew;

  var UserDetails = user.user;

  var RoleId = UserDetails.user_role_Id;

  var [userDetailData, setuserDetailData] = useState([]);

  const SelectedRole = (event) => {
    event.preventDefault();
    var SelectRole = SelectBox.current.value;
    var role_Id = JSON.parse(SelectRole);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user_role_Id: role_Id,
    });
    Update(`${Api.RegisterAPiGet}?Id=${UserId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (result) => {
    if (result.Status) {
      setOpen(true);

      EnquriySweetAlart("Update").then(() => {
        navigate("/backend/user");
      });

      setClicked(false);
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart("Fail-Update");
    }
  };

  useEffect(() => {
    LayouttapBar();
    LayoutSelectBar();
  }, []);

  var LayoutSelectBar = () => {
    Get(Api.RoleAPiGet)
      .then(handleResponse)
      .then(processGet)
      .catch(handleError);
  };
  const processGet = (data) => {
    if (data.Status) {
      setSuggestions(data.result);
    } else {
      alert("User Not Found");
    }
  };

  var SelectBoxChange = () => {
    setOpen(false);
  };

  var LayouttapBar = () => {
    UserDetail(UserId)
      .then(handleResponse)
      .then(processDetailData)
      .catch(handleError);
  };
  var processDetailData = (data) => {
    if (data.Status) {
      setuserDetailData(data.result[0].tblRole);
      console.log('data.result[0]',data.result[0].tblRole)
    } else {
      alert("User Not Found");
    }
  };

  var UserRoleBar = () => {
    UserIsLogin(RoleId)
      .then(handleResponse)
      .then(processData)
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

  const processData = (data) => {
    if (data.Status) {
      setShowEdit(data.permissions.canEdit === true);
    } else {
      alert("User Not Found");
    }
  };
  useEffect(() => {
    UserRoleBar();
  }, []);
  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Role Update</title>
        <div className="m-3">
          {" "}
          <Stack spacing={3}>
            <div class="card-headers mt-4">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Update Role</h2>
                </div>
              </div>
            </div>
            <SimpleCard title="">
              <div class="row">
                <div class="col-12 ">
                  <div class="">
                    <div class="card-bodyfffff">
                      <form
                        onSubmit={SelectedRole}
                        className={clicked ? "was-validated" : ""}
                      >
                        <div class="row">
                          <div class="col-md-12 mb-4  ">
                            <div class="table-responsive">
                              <table
                                class="table border bg-gradient table-striped"
                                border="1"
                              >
                                <thead class="bg-dark text-white bg-dark border-0 text-white card-titles">
                                  <tr>
                                    <th>Current Role :</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{userDetailData.RoleName}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div class="col-md-12 mb-4 ">
                            <div class="form-group mb-4">
                              <label class="" for="">
                                Assign <span style={{ color: "red" }}>*</span>
                              </label>

                              <div>
                                <select
                                  class="form-select"
                                  ref={SelectBox}
                                  required
                                  onChange={SelectBoxChange}
                                >
                                  <option selected hidden value="">
                                    ---Select {userDetailData.RoleName}----
                                    
                                  </option>
                                  {suggestions.map((suggestion, index) => {
                                    if (suggestion.IsActive == true) {
                                      return (
                                        <>
                                          {" "}
                                          <option
                                            value={suggestion.RoleId}
                                            key={index}
                                          >
                                            {suggestion.RoleName}
                                          </option>
                                        </>
                                      );
                                    }
                                  })}
                                </select>
                                <div class="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-12">
                              {" "}
                              <div className="col-lg-12   col-md-12">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <GoBack value="user" />
                                  </div>
                                  <div className="col-lg-6">
                                    {" "}
                                    <div
                                      className=" w-100"
                                      style={{ textAlign: "end" }}
                                    >
                                      {open ? (
                                        <div class="form-group">
                                          {ShowEdit && ShowEdit && (
                                            <div class="form-group">
                                              {ShowEdit && ShowEdit && (
                                                <input
                                                  type="submit"
                                                  value="save"
                                                  onClick={() =>
                                                    setClicked(true)
                                                  }
                                                  class="btn btn-primary"
                                                  id="submitButton"
                                                  disabled
                                                />
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <div class="form-group">
                                          {ShowEdit && ShowEdit && (
                                            <input
                                              type="submit"
                                              value="save"
                                              onClick={() => setClicked(true)}
                                              class="btn btn-primary"
                                              id="submitButton"
                                            />
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </SimpleCard>
          </Stack>
        </div>
      </Stack>
    </Container>
  );
};

export default UserRoleUpdate;

