import { useState } from 'react';

import { useEffect } from 'react';
import Api from 'Service/Api';

import $ from 'jquery';

import { useRef } from 'react';

import React from 'react';

import { useAuthContext } from 'Context/AuthContext';

import PostProcess from '../../Function/Post';

import { Box, Icon, Stack } from '@mui/material';
import { SimpleCard } from 'app/components';
import GoBack from '../../Button/GoBack';
import UserIsLogin from '../../UserLogin/UserIsLogin';

import styled from '@emotion/styled';
import Get from '../../Function/Get';
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';
import { useNavigate } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const UserCreate = () => {
  var { user } = useAuthContext();
  var navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  var [ShowEdit, setShowEdit] = useState(false);

  const [suggestions, setSuggestions] = useState([]);

  const [showPassword, setShowPassword] = useState(false);

  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [ProfileImage, setProfileImage] = useState();

  var NameBox = useRef();
  var LastBox = useRef();
  var EmailBox = useRef();
  var PhoneBox = useRef();

  var PasswordBox = useRef();
  var SelectBox = useRef();
  var UserDetails = user.user;

  var RoleId = UserDetails.user_role_Id;

  var LayoutSelectBar = () => {
    Get(Api.RoleAPiGet).then(handleResponse).then(processGet).catch(handleError);
  };
  const processGet = (data) => {
    if (data.Status) {
      setSuggestions(data.result);
    } else {
      alert('User Not Found');
    }
  };
  const processData = (data) => {
    if (data.Status) {
      setShowEdit(data.permissions.canEdit === true);
    } else {
      alert('User Not Found');
    }
  };

  var UserRoleBar = () => {
    UserIsLogin(RoleId).then(handleResponse).then(processData).catch(handleError);
  };

  useEffect(() => {
    UserRoleBar();
    LayoutSelectBar();
  }, []);

  function nameHandler(e) {
    setOpen(false);
  }
  function nameLastHandler(e) {
    setOpen(false);
  }
  function nameRoleHandler(e) {
    setOpen(false);
  }

  const UserCreateSubmit = async (event) => {
    event.preventDefault();

    var name = NameBox.current.value;
    var last = LastBox.current.value;
    var email = EmailBox.current.value;
    var phone = PhoneBox.current.value;
    var Password = PasswordBox.current.value;
    var role = SelectBox.current.value;
    var role_Id = JSON.parse(role);
    var image = ProfileImage;

    const raw = JSON.stringify({
      first_name: name,
      last_name: last,
      user_email: email,
      user_phone: phone,
      user_pass: Password,
      user_gender: null,
      image_name: image,
      user_role_Id: role_Id
    });

    PostProcess(Api.RegisterAPi, raw)
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
      event.target.reset();

      setOpen(true);
      setClicked(false);

      EnquriySweetAlart('Create').then(() => {
        navigate('/backend/user');
      });
    } else {
      console.log('result',result.result)
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Create');
    }
  };
  const handleFileChange = (e) => {
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
      setImagePreviewUrl(reader.result);
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = (
      <img
        accept="image/*"
        style={{ width: '160px', height: '160px' }}
        class="rounded-circle"
        id="imgprev_3_3"
        src={imagePreviewUrl}
        alt="Preview"
      />
    );
  } else {
    $imagePreview = (
      <div className="previewText">
        <img
          id="imgprev_3_3"
          accept="image/*"
          style={{ width: '160px', height: '160px' }}
          class="rounded-circle"
          src="/default-user-image.png"
          alt="Preview"
        />
      </div>
    );
  }

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
    document.querySelector('#NameText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    document.querySelector('#LastText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Create user </title>

        <Box className="m-3">
          <Stack>
            <div class="card-headers  ">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Create user</h2>
                </div>
              </div>
            </div>
            <SimpleCard>
              <div class="form-group card-body ">
                <form onSubmit={UserCreateSubmit} className={clicked ? 'was-validated' : ''}>
                  <div class="row pt-2 pb-3">
                    <div class="col-12 mb-4  text-center">
                      <div class="editprofilepicbox mx-auto">{$imagePreview}</div>
                    </div>

                    <div class="col-md-4 mb-4">
                      <label>
                        First Name <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        class="form-control"
                        type="text"
                        data-val="true"
                        id="NameText"
                        ref={NameBox}
                        onChange={nameHandler}
                        placeholder="Enter name"
                        required
                        maxLength={20}
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out name field.</div>
                    </div>
                    <div class="col-md-4 mb-4">
                      <label>
                        Last Name <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        id="LastText"
                        class="form-control"
                        type="text"
                        ref={LastBox}
                        onChange={nameLastHandler}
                        placeholder="Enter last"
                        required
                        maxLength={20}
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out last name field.</div>
                    </div>

                    <div class="col-md-4 mb-4">
                      <label>
                        E-mail ID <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        class="form-control"
                        type="email"
                        ref={EmailBox}
                        placeholder="Enter email"
                        required
                        maxLength={50}
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out email id field.</div>
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
                          ref={PasswordBox}
                          className="form-control "
                          placeholder="Enter password"
                          type={showPassword ? 'text' : 'password'}
                          id="UserViewModel_Password"
                          name="UserViewModel.Password"
                          required
                          autoComplete="off"
                        />

                        <span
                          className="bg-white classBg-iconShow input-group-text"
                          style={{ cursor: 'pointer' }}
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <Icon className="text-gray-600">visibility</Icon>
                          ) : (
                            <Icon className="text-gray-600">visibility_off</Icon>
                          )}
                        </span>
                        <div class="invalid-feedback">Please fill out password field.</div>
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
                        placeholder="Enter phone"
                        required
                        className="form-control "
                        type="text"
                        id="PhoneHandlers"
                        ref={PhoneBox}
                        onInput={PhoneHandler}
                        maxLength={10}
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out phone field.</div>
                    </div>

                    <div class="col-md-4 mb-2">
                      <label>
                        Upload Profile Picture <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        name="UserProfile"
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                        required
                          accept="image/*"
                      />

                      <div class="invalid-feedback">Please fill out upload profile field.</div>
                    </div>
                    <div class="col-md-4 mb-2 ">
                      <div class="form-group mb-2">
                        <label class="" for="">
                          Role <span style={{ color: 'red' }}>*</span>
                        </label>

                        <select
                          class="form-select"
                          onChange={nameRoleHandler}
                          ref={SelectBox}
                          required
                        >
                          <option selected hidden value="">
                            ---Select role---
                          </option>
                          {suggestions.map((suggestion, index) => {
                            if (suggestion.IsActive == true) {
                              return (
                                <>
                                  {' '}
                                  <option value={suggestion.RoleId} key={index}>
                                    {suggestion.RoleName}
                                  </option>
                                </>
                              );
                            }
                          })}
                        </select>

                        <div class="invalid-feedback">Please fill out role field.</div>
                      </div>
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
                </form>
              </div>
            </SimpleCard>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default UserCreate;
