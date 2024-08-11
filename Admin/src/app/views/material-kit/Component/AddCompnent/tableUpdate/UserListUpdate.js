import { Icon, Stack } from '@mui/material';

import { Box, styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import $ from 'jquery';

import { useRef } from 'react';

import Api from 'Service/Api';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthContext } from 'Context/AuthContext';

import Error from '../Dialog/Error';
import GoBack from '../../Button/GoBack';
import Update from '../../Function/Update';
import UserIsLogin from '../../UserLogin/UserIsLogin';
import UserDetail from '../../UserLogin/UserDetail';
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const UserListUpdate = () => {
  var { user } = useAuthContext();
  var UserDetails = user.user;
  var RoleId = UserDetails.Id;
  var location = useLocation();
  var navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  var idNew = queryParams.get('Id');

  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  var [userDetailData, setuserDetailData] = useState([]);
  var [ShowEdit, setShowEdit] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [ProfileImage, setProfileImage] = useState(undefined);

  var NameBox = useRef();
  var LastBox = useRef();
  var EmailBox = useRef();
  var PhoneBox = useRef();
  var ruleBox = useRef();
  var PasswordBox = useRef();

  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

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

  var UserListId = () => {
    UserDetail(idNew).then(handleResponse).then(processDetailData).catch(handleError);
  };
  var processDetailData = (data) => {
    if (data.Status) {
      setuserDetailData(data.result[0]);
    } else {
      alert('User Not Found');
    }
  };

  var UserId = () => {
    UserDetail(RoleId).then(handleResponse).then(processData).catch(handleError);
  };

  const processData = (data) => {
    if (data.Status) {
      setShowEdit(data.permissions.canEdit === true);
    } else {
      alert('User Not Found');
    }
  };
  useEffect(() => {
    UserListId();
    UserId();
  }, []);

  function nameHandler(e) {
    setOpen(false);
  }

  function nameLastHandler(e) {
    setOpen(false);
  }

  var UserListUpdateSubmit = (event) => {
    event.preventDefault();
    var name = NameBox.current.value;
    var last = LastBox.current.value;
    var email = EmailBox.current.value;
    var phone = PhoneBox.current.value;
    var passwordBox = PasswordBox.current.value;

    var image = ProfileImage;

    var raw = JSON.stringify({
      first_name: name,
      last_name: last,
      user_email: email,
      user_phone: phone,
      user_login: name,
      user_status: true,
      image_name: image,
      user_pass: passwordBox
    });

    Update(`${Api.RegisterAPiGet}?Id=${idNew}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (result) => {
    if (result.Status) {
      setOpen(true);

      UserListId();
      EnquriySweetAlart('Update').then(() => {
        navigate('/backend/user');
      });

      setClicked(false);
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Update');
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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function PhoneHandler(e) {
    setOpen(false);
  }

  $(document).ready(function () {
    $('#PhoneHandlers').on('input', function () {
      var phoneNumber = $(this)
        .val()
        .replace(/[^0-9\-]/g, '');
      var formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      $(this).val(formattedPhoneNumber);

      if (isValidPhoneNumber(phoneNumber)) {
        $(this).removeClass('invalid');
      } else {
        $(this).addClass('invalid');
      }
    });
  });
  function formatPhoneNumber(phoneNumber) {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }

  function isValidPhoneNumber(phoneNumber) {
    var digitCount = phoneNumber.replace(/\D/g, '').length;
    return digitCount === 10;
  }

  useEffect(() => {
    document.querySelector('#UserNameText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    document.querySelector('#UserLastText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);
  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l -Update user update </title>

        <Box className="m-3">
          <Stack>
            <div class="card-headers ">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title"> Update user update</h2>
                </div>
              </div>
            </div>
            <SimpleCard>
              <div class="row ">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-12 ">
                      <div class="border-0">
                        <div class="card-body">
                          <div class="row detailbox">
                            <div class="col-12">
                              <div class="mainshadow setting-right pt-3 pb-1">
                                <form
                                  onSubmit={UserListUpdateSubmit}
                                  className={clicked ? 'was-validated' : ''}
                                >
                                  <div class="row pt-2 pb-3">
                                    <div class="col-12 mb-4  text-center">
                                      <div class="editprofilepicbox mx-auto">{$imagePreview}</div>
                                    </div>

                                    <div class="col-md-4 mb-4">
                                      <label>
                                        First Name <span style={{ color: 'red' }}>*</span>
                                      </label>
                                      <input
                                        class="form-control isEmpty"
                                        type="text"
                                        data-val="true"
                                        id="UserNameText"
                                        ref={NameBox}
                                        onInput={nameHandler}
                                        defaultValue={userDetailData.first_name}
                                        required
                                        maxLength={20}
                                        autoComplete="off"
                                      />

                                      <div class="invalid-feedback">
                                        Please fill out name field.
                                      </div>
                                    </div>
                                    <div class="col-md-4 mb-4">
                                      <label>
                                        Last Name <span style={{ color: 'red' }}>*</span>
                                      </label>
                                      <input
                                        id="UserLastText"
                                        class="form-control isEmpty"
                                        type="text"
                                        ref={LastBox}
                                        onInput={nameLastHandler}
                                        defaultValue={userDetailData.last_name}
                                        required
                                        maxLength={20}
                                        autoComplete="off"
                                      />

                                      <div class="invalid-feedback">
                                        Please fill out last name field.
                                      </div>
                                    </div>
                                    {ShowEdit && (
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
                                            maxLength={50}
                                            autoComplete="off"
                                          />
                                          <div class="invalid-feedback">
                                            Please fill out email field.
                                          </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                          <label>
                                            Password <span style={{ color: 'red' }}>*</span>
                                          </label>
                                          <div className="input-group" id="PasswordInput">
                                            <span className="input-group-text" id="basic-addon2">
                                              <img
                                                src="/padlock.png"
                                                className="m-1 icon icon-xs"
                                                alt="padlock"
                                              />
                                            </span>
                                            <input
                                              maxLength={50}
                                              className="form-control valid isEmpty"
                                              defaultValue={userDetailData.user_pass}
                                              type={showPassword ? 'text' : 'password'}
                                              id="UserViewModel_Password"
                                              name="UserViewModel.Password"
                                              ref={PasswordBox}
                                              autoComplete="off"
                                            />
                                            <div class="invalid-feedback">
                                              Please fill out password field.
                                            </div>
                                            <span
                                              className="bg-white classBg-iconShow input-group-text"
                                              style={{ cursor: 'pointer' }}
                                              onClick={togglePasswordVisibility}
                                            >
                                              {showPassword ? (
                                                <Icon className="text-gray-600">visibility</Icon>
                                              ) : (
                                                <Icon className="text-gray-600">
                                                  visibility_off
                                                </Icon>
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
                                          <div class="invalid-feedback">
                                            Please fill out phone number field.
                                          </div>
                                        </div>
                                      </>
                                    )}

                                    {!ShowEdit && (
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
                                            autoComplete="off"
                                          />
                                          <div class="invalid-feedback">
                                            Please fill out email field.
                                          </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                          <label>
                                            Password <span style={{ color: 'red' }}>*</span>
                                          </label>
                                          <div className="input-group" id="PasswordInput">
                                            <span className="input-group-text" id="basic-addon2">
                                              <img
                                                src="/padlock.png"
                                                className="m-1 icon icon-xs"
                                                alt="padlock"
                                              />
                                            </span>
                                            <input
                                              className="form-control valid isEmpty"
                                              defaultValue={userDetailData.user_pass}
                                              type={showPassword ? 'text' : 'password'}
                                              disabled
                                              id="UserViewModel_Password"
                                              name="UserViewModel.Password"
                                              autoComplete="off"
                                            />
                                            <div class="invalid-feedback">
                                              Please fill out password field.
                                            </div>
                                            <span
                                              className="bg-white classBg-iconShow input-group-text"
                                              style={{ cursor: 'pointer' }}
                                              onClick={togglePasswordVisibility}
                                            >
                                              {showPassword ? (
                                                <Icon className="text-gray-600">visibility</Icon>
                                              ) : (
                                                <Icon className="text-gray-600">
                                                  visibility_off
                                                </Icon>
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
                                          <div class="invalid-feedback">
                                            Please fill out phone number field.
                                          </div>
                                        </div>
                                      </>
                                    )}

                                    <div class="col-md-4 mb-2">
                                      <label>
                                        Upload Profile Picture{' '}
                                        <span style={{ color: 'red' }}>*</span>
                                      </label>

                                      <div class="text-center">
                                        <div>
                                          <input
                                            className=" form-control w-100"
                                            type="file"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                          />
                                        </div>
                                      </div>

                                      <div class="invalid-feedback">
                                        Please fill out this field.
                                      </div>
                                    </div>
                                    <div>
                                      <input
                                        type="hidden"
                                        ref={ruleBox}
                                        defaultValue={userDetailData.rule_user}
                                      />
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-6">
                                      <div class=" w-100">
                                        <GoBack value="user" />
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
                                              value="Updated"
                                              disabled
                                            />
                                          ) : (
                                            <input
                                              type="submit"
                                              onClick={() => setClicked(true)}
                                              class="btn btn-gradient "
                                              value="Update"
                                            />
                                          ))}
                                      </div>
                                    </div>
                                  </div>
                                </form>
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
        </Box>
      </Stack>
    </Container>
  );
};

export default UserListUpdate;
