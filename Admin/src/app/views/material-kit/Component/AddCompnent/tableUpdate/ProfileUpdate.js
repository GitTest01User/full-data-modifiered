import { Icon, Stack } from '@mui/material';

import { Box, styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import $ from 'jquery';

import { useRef } from 'react';

import Api from 'Service/Api';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from 'Context/AuthContext';

import Error from '../Dialog/Error';
import UserIsLogin from '../../UserLogin/UserIsLogin';
import UserDetail from '../../UserLogin/UserDetail';
import Update from '../../Function/Update';
import GoBack from '../../Button/GoBack';
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const ProfileUpdate = () => {
  const [showPassword, setShowPassword] = useState(false);

  var [userDetailData, setuserDetailData] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [ProfileImage, setProfileImage] = useState();
  var navigate = useNavigate();
  var NameBox = useRef();
  var LastBox = useRef();
  var EmailBox = useRef();
  var PhoneBox = useRef();
  var PasswordBox = useRef();
  var { user } = useAuthContext();
  var [ShowEdit, setShowEdit] = useState(false);

  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  var UserDetails = user.user;
  var UserData = UserDetails;
  var UserId = UserData.Id;

  var RoleId = UserDetails.user_role_Id;

  useEffect(() => {
    LayouttapBar();
    UserRoleBar();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function PhoneHandler(e) {
    setOpen(false);
  }

  function nameLastHandler(e) {
    setOpen(false);
  }

  useEffect(() => {
    document.querySelector('#ProfileNameText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    $('#ProfileNameText').keydown((e) => {
      return !String.fromCharCode(e.which).match(/[0-9\s\u0900-\u097F]/);
    });
    document.querySelector('#ProfileLastText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);
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
    UserIsLogin(RoleId).then(handleResponse).then(processData).catch(handleError);
  };

  const processData = (data) => {
    if (data.Status) {
      setShowEdit(data.permissions.canEdit === true);
    } else {
      alert('User Not Found');
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    if (!e.target.files || e.target.files.length === 0) {
      alert('No file selected. Please select an image file.');
      return;
    }

    let reader = new FileReader();
    var file = e.target.files[0];

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    reader.onloadend = () => {
      $('#imageBg').removeClass('demo124');
      setImagePreviewUrl(reader.result);
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = (
      <img
        id="imgprev_3_3"
        accept="image/*"
        style={{ width: '160px', height: '160px' }}
        class="rounded-circle"
        src={imagePreviewUrl}
        alt="Preview"
      />
    );
  } else {
    $imagePreview = (
      <div className="previewText">
        <img
          id="imgprev_3_3"
          src={
            userDetailData.image_name
              ? `${Api.BaseURL}/${userDetailData.image_name}`
              : '/default-user-image.png'
          }
          accept="image/*"
          style={{ width: '160px', height: '160px' }}
          class="rounded-circle "
          alt="Preview"
        />
      </div>
    );
  }

  var ProfileUpdateSubmit = (event) => {
    event.preventDefault();
    var name = NameBox.current.value;
    var last = LastBox.current.value;
    var email = EmailBox.current.value;
    var phone = PhoneBox.current.value;
    var Password = PasswordBox.current.value;
    var image = ProfileImage;

    var raw = JSON.stringify({
      first_name: name,
      last_name: last,
      user_email: email,
      user_phone: phone,
      user_login: name,
      user_status: true,
      image_name: image,
      user_pass: Password
    });

    Update(`${Api.RegisterAPiGet}?Id=${UserId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  var ProfileUpdateSubmitEditer = (event) => {
    event.preventDefault();
    var name = NameBox.current.value;
    var last = LastBox.current.value;

    var image = ProfileImage;

    var raw = JSON.stringify({
      first_name: name,
      last_name: last,

      user_login: name,
      user_status: true,
      image_name: image
    });

    Update(`${Api.RegisterAPiGet}?Id=${UserId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (result) => {
    if (result.Status) {
      setOpen(true);

      EnquriySweetAlart('Update').then(() => {
        navigate('/backend/profile');
      });

      setClicked(false);
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Update');
    }
  };

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Backend - Profile Change </title>

        <Box className="m-3">
          <Stack>
            <div class="card-headers  ">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Change Profile</h2>
                </div>
              </div>
            </div>
            <SimpleCard>
              <div class=" p-1">
                {ShowEdit && (
                  <form onSubmit={ProfileUpdateSubmit} className={clicked ? 'was-validated' : ''}>
                    <div class="row pt-3 pb-3">
                      <div class="col-12 mb-4  text-center">
                        <div class="editprofilepicbox mx-auto">
                          <div class="col-12 mb-4  text-center">
                            <div class="editprofilepicbox mx-auto">{$imagePreview}</div>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-4 mb-4">
                        <label for="">
                          First Name
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          class="form-control"
                          type="text"
                          data-val="true"
                          id="ProfileNameText"
                          ref={NameBox}
                          defaultValue={userDetailData.first_name}
                          required
                          maxLength={20}
                          autoComplete="off"
                        />

                        <div class="invalid-feedback">Please fill out name field.</div>
                      </div>
                      <div class="col-md-4 mb-4">
                        <label for="">
                          Last Name
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          id="ProfileLastText"
                          class="form-control"
                          type="text"
                          ref={LastBox}
                          onChange={nameLastHandler}
                          defaultValue={userDetailData.last_name}
                          required
                          maxLength={20}
                          autoComplete="off"
                        />

                        <div class="invalid-feedback">Please fill out last name field.</div>
                      </div>
                      <>
                        <div class="col-md-4 mb-4">
                          <label>
                            E-mail ID <span style={{ color: 'red' }}>*</span>
                          </label>
                          <input
                            class="form-control isEmpty"
                            type="email"
                            ref={EmailBox}
                            autoComplete="off"
                            defaultValue={userDetailData.user_email}
                          />
                          <div class="invalid-feedback">Please fill out email field.</div>
                        </div>
                        <div className="col-md-4 mb-3">
                          <label>
                            Password <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="input-group" id="PasswordInput">
                            <span className="input-group-text" id="basic-addon2">
                              <img src="/padlock.png" className="m-1 icon icon-xs" alt="padlock" />
                            </span>
                            <input
                              className="form-control valid isEmpty"
                              defaultValue={userDetailData.user_pass}
                              type={showPassword ? 'text' : 'password'}
                              id="UserViewModel_Password"
                              name="UserViewModel.Password"
                              ref={PasswordBox}
                              autoComplete="off"
                            />
                            <div class="invalid-feedback">Please fill out password field.</div>
                            <span
                              className="bg-white border-opacity-25 classBg-iconShow input-group-text"
                              style={{ cursor: 'pointer' }}
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <Icon className="text-gray-600">visibility</Icon>
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
                        <div class="col-md-4 mb-2">
                          <label>
                            Phone <span style={{ color: 'red' }}>*</span>
                          </label>
                          <input
                            readonly
                            ref={PhoneBox}
                            defaultValue={userDetailData.user_phone}
                            placeholder="Enter phone"
                            required
                            className="form-control "
                            type="text"
                            id="PhoneHandlers"
                            onInput={PhoneHandler}
                            maxLength={10}
                            autoComplete="off"
                          />
                          <div class="invalid-feedback">Please fill out phone field.</div>
                        </div>
                      </>

                      <div class="col-md-4 mb-4">
                        <label for="">
                          Upload profile picture
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          className=" form-control w-100"
                          type="file"
                          onChange={handleImageChange}
                            accept="image/*"
                        />

                        <div class="invalid-feedback">Please fill out profile picture field.</div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      {' '}
                      <div className="col-lg-12   col-md-12">
                        <div className="row">
                          <div className="col-lg-6">
                            {' '}
                            <GoBack value="profile" />
                          </div>
                          <div className="col-lg-6">
                            {' '}
                            <div className=" w-100" style={{ textAlign: 'end' }}>
                              {open ? (
                                <div class="form-group">
                                  <input
                                    type="submit"
                                    value="Saved"
                                    onClick={() => setClicked(true)}
                                    class="btn btn-primary"
                                    id="submitButton"
                                    disabled
                                  />
                                </div>
                              ) : (
                                <div class="form-group">
                                  <input
                                    type="submit"
                                    value="Save"
                                    onClick={() => setClicked(true)}
                                    class="btn btn-primary"
                                    id="submitButton"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
                {!ShowEdit && (
                  <form
                    onSubmit={ProfileUpdateSubmitEditer}
                    className={clicked ? 'was-validated' : ''}
                  >
                    <div class="row pt-3 pb-3">
                      <div class="col-12 mb-4  text-center">
                        <div class="editprofilepicbox mx-auto">
                          <div class="col-12 mb-4  text-center">
                            <div class="editprofilepicbox mx-auto">{$imagePreview}</div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 mb-4">
                        <label for="">
                          First Name
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          class="form-control"
                          type="text"
                          data-val="true"
                          id="ProfileNameText"
                          ref={NameBox}
                          defaultValue={userDetailData.first_name}
                          required
                          maxLength={20}
                          autoComplete="off"
                        />

                        <div class="invalid-feedback">Please fill out name field.</div>
                      </div>
                      <div class="col-md-4 mb-4">
                        <label for="">
                          Last Name
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          id="ProfileLastText"
                          class="form-control"
                          type="text"
                          ref={LastBox}
                          onChange={nameLastHandler}
                          defaultValue={userDetailData.last_name}
                          required
                          maxLength={20}
                          autoComplete="off"
                        />

                        <div class="invalid-feedback">Please fill out last name field.</div>
                      </div>
                      <>
                        <div class="col-md-4 mb-4">
                          <label>
                            E-mail ID <span style={{ color: 'red' }}>*</span>
                          </label>
                          <input
                            class="form-control isEmpty"
                            type="email"
                            ref={EmailBox}
                            defaultValue={userDetailData.user_email}
                            disabled
                            value={userDetailData.user_email}
                            autoComplete="off"
                          />
                          <div class="invalid-feedback">Please fill out email field.</div>
                        </div>
                        <div className="col-md-4 mb-3">
                          <label>
                            Password <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="input-group" id="PasswordInput">
                            <span className="input-group-text" id="basic-addon2">
                              <img src="/padlock.png" className="m-1 icon icon-xs" alt="padlock" />
                            </span>
                            <input
                              autoComplete="off"
                              className="form-control valid isEmpty"
                              type={showPassword ? 'text' : 'password'}
                              disabled
                              value={userDetailData.user_pass}
                              id="UserViewModel_Password"
                              name="UserViewModel.Password"
                            />
                            <div class="invalid-feedback">Please fill out password field.</div>
                            <span
                              className="input-group-text classBg-iconShow"
                              style={{ cursor: 'pointer' }}
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <Icon className="text-gray-600">visibility</Icon>
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
                        <div class="col-md-4 mb-2">
                          <label>
                            Phone <span style={{ color: 'red' }}>*</span>
                          </label>
                          <input
                            readonly
                            ref={PhoneBox}
                            defaultValue={userDetailData.user_phone}
                            disabled
                            placeholder="Enter phone"
                            required
                            className="form-control "
                            type="text"
                            id="PhoneHandlers"
                            onInput={PhoneHandler}
                            maxLength={10}
                            autoComplete="off"
                          />
                          <div class="invalid-feedback">Please fill out phone field.</div>
                        </div>
                      </>

                      <div class="col-md-4 mb-4">
                        <label for="">
                          Upload profile picture
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          className=" form-control w-100"
                          type="file"
                          onChange={handleImageChange}
                            accept="image/*"
                        />

                        <div class="invalid-feedback">Please fill out profile picture field.</div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      {' '}
                      <div className="col-lg-12   col-md-12">
                        <div className="row">
                          <div className="col-lg-6">
                            {' '}
                            <GoBack value="profile" />
                          </div>
                          <div className="col-lg-6">
                            {' '}
                            <div className=" w-100" style={{ textAlign: 'end' }}>
                              {open ? (
                                <div class="form-group">
                                  <input
                                    type="submit"
                                    value="Saved"
                                    onClick={() => setClicked(true)}
                                    class="btn btn-primary"
                                    id="submitButton"
                                    disabled
                                  />
                                </div>
                              ) : (
                                <div class="form-group">
                                  <input
                                    type="submit"
                                    value="Save"
                                    onClick={() => setClicked(true)}
                                    class="btn btn-primary"
                                    id="submitButton"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </SimpleCard>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ProfileUpdate;
