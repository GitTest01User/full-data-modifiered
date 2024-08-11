import { Stack } from "@mui/material";

import { styled } from "@mui/material";
import { SimpleCard } from "app/components";

import { useState } from "react";
import { useEffect } from "react";

import Api from "Service/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

import { useAuthContext } from "Context/AuthContext";

import Error from "../Dialog/Error";
import UserIsLogin from "../../UserLogin/UserIsLogin";
import Get from "../../Function/Get";
import Update from "../../Function/Update";
import GoBack from "../../Button/GoBack";
import EnquriySweetAlart from "../Dialog/EnquriySweetAlart";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const RoleUpdate = () => {
  var { user } = useAuthContext();
  var navigate = useNavigate();
  var location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [suggestions, setSuggestions] = useState([]);
  var roleUpdateId = queryParams.get("roleId");

  const [Role, setRole] = useState([]);

  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  var [ShowEdit, setShowEdit] = useState(false);

  var RoleTitleBox = useRef();
  var SelectBox = useRef();
  var UserDetail = user.user;
  var RoleId = UserDetail.user_role_Id;

  const handleSubmit = (event) => {
    event.preventDefault();
    var RoleTitles = RoleTitleBox.current.value;
    var rolekey = SelectBox.current.value;
    console.log("rolekey", rolekey);
    if (RoleTitles !== "") {
      var raw = JSON.stringify({
        RoleKey: rolekey,
        RoleName: RoleTitles,
      });
     
      Update(`${Api.RoleAPiGet}?RoleId=${roleUpdateId}`, raw)
        .then(handleResponse)
        .then(processUpdate)
        .catch(handleError);
    }
  };

  const processUpdate = (result) => {
    if (result.Status) {
      setOpen(true);

      EnquriySweetAlart("Update").then(() => {
        navigate("/backend/role");
      });

      setClicked(false);
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart("Fail-Update");
    }
  };

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

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const processData = (data) => {
    if (data.Status) {
      setShowEdit(data.permissions.canEdit === true);
    } else {
      alert("User Not Found");
    }
  };

  const handleError = (error) => {
    console.log("Error fetching user role:", error);
  };

  var UserRoleBar = () => {
    UserIsLogin(RoleId)
      .then(handleResponse)
      .then(processData)
      .catch(handleError);
  };

  var UserRoleData = () => {
    Get(`${Api.RoleAPiGet}?RoleId=${roleUpdateId}`)
      .then(handleResponse)
      .then(processDataDetails)
      .catch(handleError);
  };

  const processDataDetails = (data) => {
    if (data.Status) {
      setRole(data.result[0]);
    } else {
      alert("User Not Found");
    }
  };
  useEffect(() => {
    UserRoleBar();
    UserRoleData();
    LayoutSelectBar();
  }, []);

  function nameHandler(e) {
    setOpen(false);
  }

  useEffect(() => {
    document
      .querySelector("#RoleTitleText")
      .addEventListener("keydown", function (e) {
        if (String.fromCharCode(e.which).match(/\d/)) {
          e.preventDefault();
        }
      });
  }, []);
  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Role </title>
        <div className="m-3">
          <Stack spacing={3}>
            <div class="card-headers  mt-3">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Update Role </h2>
                </div>
              </div>
            </div>

            <SimpleCard title="">
              <form
                onSubmit={handleSubmit}
                className={clicked ? "was-validated" : ""}
              >
                <div className="mt-3  mb-3">
                  <div className="row">
                    <div className="col-lg-12 mb-3">
                      <label className="mb-2">
                        Role
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        className=" form-control "
                        type="text"
                        id="RoleTitleText"
                        ref={RoleTitleBox}
                        placeholder="Enter role"
                        onChange={nameHandler}
                        required
                        defaultValue={Role.RoleName}
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">
                        Please fill out this field.
                      </div>
                    </div>
                    <div class="col-md-12 mb-2 ">
                      <div class="form-group mb-2">
                        <label class="" for="">
                          Key<span style={{ color: "red" }}>*</span>
                        </label>

                        <select class="form-select" ref={SelectBox} required>
                          <option selected hidden value={Role.RoleKey}>
                            {Role.RoleKey}
                          </option>
                          {suggestions.map((suggestion, index) => {
                            if (suggestion.IsActive == true) {
                              return (
                                <>
                                  {" "}
                                  <option
                                    value={suggestion.RoleKey}
                                    key={index}
                                  >
                                    {suggestion.RoleKey}
                                  </option>
                                </>
                              );
                            }
                          })}
                        </select>

                        <div class="invalid-feedback">
                          Please fill out role field.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-6">
                      <div class=" w-100">
                        <GoBack value="role" />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="text-end w-100">
                        {ShowEdit &&
                          (open ? (
                            <input
                              type="submit"
                              onClick={() => setClicked(true)}
                              class="btn btn-gradient "
                              value="Saved"
                              disabled
                            />
                          ) : (
                            <input
                              type="submit"
                              onClick={() => setClicked(true)}
                              class="btn btn-gradient "
                              value="Save"
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </SimpleCard>
          </Stack>
        </div>
      </Stack>
    </Container>
  );
};

export default RoleUpdate;
