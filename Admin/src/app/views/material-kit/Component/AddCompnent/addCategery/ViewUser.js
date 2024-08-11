import { Button, Container, Stack } from '@mui/material';
import Api from 'Service/Api';

import { SimpleCard } from 'app/components';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dateFormat from 'dateformat';

import { useAuthContext } from 'Context/AuthContext';
import UserIsLogin from '../../UserLogin/UserIsLogin';
import GoBack from '../../Button/GoBack';
import UserDetail from '../../UserLogin/UserDetail';
export default function ViewUser() {
  var { user } = useAuthContext();
  var [useRole, SetUseRole] = useState([]);
  var [ShowEdit, setShowEdit] = useState(false);

  var navigator = useNavigate();
  var location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  var id = queryParams.get('Id');
  var UserDetails = user.user;
  var UserId = id;
  var RoleId = UserDetails.user_role_Id;

  var [userDetailData, setuserDetailData] = useState([]);
  var LayouttapBar = () => {
    UserDetail(UserId).then(handleResponse).then(processDetailData).catch(handleError);
  };
  var processDetailData = (data) => {
    if (data.Status) {
      setuserDetailData(data.result[0]);
      SetUseRole(data.result[0].tblRole);
    } else {
      alert('User Not Found');
    }
  };



  var UserRoleBar = () => {
    UserIsLogin(RoleId).then(handleResponse).then(processData).catch(handleError);
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

  const processData = (data) => {
    if (data.Status) {
      setShowEdit(data.permissions.canEdit === true);
    } else {
      alert('User Not Found');
    }
  };
  var RoleIdUpdate = (Id) => {
    navigator(`/backend/role-update?Id=${Id}`);
  };
  useEffect(() => {
    LayouttapBar();
    UserRoleBar();
  }, []);

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - View User info</title>
        <div className="mt-3">
          <Stack spacing={3}>
            <div class="card-headers ">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">View user info</h2>
                </div>
              </div>
            </div>
            <SimpleCard>
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-12 mb-4">
                      <div class="card-body">
                        <div class="row detailed-reporting">
                          <div class="col-md-12 text-center">
                            <img
                              src={`${Api.BaseURL}/${
                                userDetailData.image_name
                                  ? userDetailData.image_name
                                  : 'default-user-icon-13.png'
                              }`}
                              class="rounded-circle"
                              id="imgprev"
                              style={{ width: '160px', height: '150px' }}
                              alt="User Image"
                            />
                          </div>
                          <div class="pt-4"></div>
                          <div class="col-md-4 mb-3">
                            <p>
                              First Name : <span>{userDetailData.first_name}</span>
                            </p>
                          </div>
                          <div class="col-md-4 mb-3">
                            <p>
                              Last Name : <span>{userDetailData.last_name}</span>
                            </p>
                          </div>
                          <div class="col-md-4 mb-3">
                            <p>
                              Email : <span>{userDetailData.user_email}</span>
                            </p>
                          </div>

                          <div class="col-md-4 mb-3">
                            <p>
                              Phone Number : <span>{userDetailData.user_phone}</span>
                            </p>
                          </div>

                          <div class="col-md-4 mb-3">
                            <p>
                              Last Login :
                              <span>
                                {dateFormat(userDetailData.user_last_login, 'mmmm dS, yyyy')}
                              </span>
                            </p>
                          </div>
                          <div class="col-md-4 mb-3">
                            <p>
                              Modified Date :
                              <span> {dateFormat(useRole.ModifiedDate, 'mmmm dS, yyyy')}</span>
                            </p>
                          </div>

                          <div class="row">
                            <div class="col-12">
                              <p class="sectitle"> Role</p>
                            </div>
                            <div class="col-12">
                              <div class="datatablebox table-responsive">
                                <table
                                  id="leadtbl"
                                  class="table align-items-center table-flush"
                                  style={{ width: '100%' }}
                                  border="0"
                                >
                                  <thead class="thead-light  text-center">
                                    <tr>
                                      <th class="border-bottom" scope="col">
                                        Role
                                      </th>
                                      <th class="border-bottom" scope="col">
                                        {' '}
                                        Date
                                      </th>
                                      <th class="border-bottom" scope="col">
                                        Action
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="bg-light text-center">
                                      <td class="fw-bolder text-gray-500 w-25">
                                        {useRole.RoleName}
                                      </td>
                                      <td class="fw-bolder text-gray-500">
                                        {dateFormat(useRole.ModifiedDate, 'mmmm dS, yyyy')}
                                      </td>
                                      <td class="fw-bolder text-gray-500 w-25">
                                        <Button
                                          className="btn  btn-secondary"
                                          onClick={() => RoleIdUpdate(userDetailData.Id)}
                                        >
                                          Edit
                                        </Button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-12">
                              <div class="row">
                                <div class="col-6">
                                  <div class=" w-100">
                                    <GoBack value="user" />
                                  </div>
                                </div>
                                <div class="col-6">
                                  <div class="text-end w-100">
                                    {ShowEdit && ShowEdit && (
                                      <button
                                        onClick={() => RoleIdUpdate(userDetailData.Id)}
                                        class="btn mainshadow"
                                        style={{ background: '#3d3d6e', color: '#fff' }}
                                      >
                                        Assign Role
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
}
