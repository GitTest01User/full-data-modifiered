import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import Api from 'Service/Api';

import { useRef } from 'react';

import { useAuthContext } from 'Context/AuthContext';

import UserIsLogin from '../../UserLogin/UserIsLogin';
import PostProcess from '../../Function/Post';
import GoBack from '../../Button/GoBack';
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';
import { useNavigate } from 'react-router-dom';
import Get from '../../Function/Get';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const RoleManage = () => {
  const [suggestions, setSuggestions] = useState([]);
  var navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  var { user } = useAuthContext();

  const [open, setOpen] = useState(false);

  var [ShowEdit, setShowEdit] = useState(false);

  var RoleTitleBox = useRef();
  var SelectBox = useRef();
  var UserDetail = user.user;
  var RoleId = UserDetail.user_role_Id;

  const handleSubmit = (event) => {
    event.preventDefault();
    var RoleTitles = RoleTitleBox.current.value;
    var roleKey = SelectBox.current.value;
    if (RoleTitles != '') {
      var raw = JSON.stringify({
        RoleName: RoleTitles,
        RoleKey: roleKey
      });
      PostProcess(Api.RoleAPiPost, raw)
        .then(handleResponse)
        .then((result) => processPost(result, event))
        .catch(handleError);
    } else {
      setOpen(false);
    }
  };
  const processPost = (result, event) => {
    if (result.status) {
      event.target.reset();

      setOpen(true);
      setClicked(false);

      EnquriySweetAlart('Create').then(() => {
        navigate('/backend/role');
      });
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Create');
    }
  };

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

  var UserRoleBar = () => {
    UserIsLogin(RoleId).then(handleResponse).then(processData).catch(handleError);
  };

  useEffect(() => {
    UserRoleBar();
    document.querySelector('#RoleTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    LayoutSelectBar();
  }, []);

  function nameHandler(e) {
    setOpen(false);
  }

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Create Role</title>
        <div className="m-3">
          <Stack spacing={3}>
            <div class="card-headers  mt-3">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Create Role </h2>
                </div>
              </div>
            </div>
            <SimpleCard title="">
              <form onSubmit={handleSubmit} className={clicked ? 'was-validated' : ''}>
                <div className="mt-3 mb-3">
                  <div className="row">
                    <div className="col-lg-12 mb-3">
                      <label className="mb-2">
                        Role
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className=" form-control "
                        type="text"
                        id="RoleTitleText"
                        ref={RoleTitleBox}
                        placeholder="Enter Role"
                        onChange={nameHandler}
                        required
                        maxLength={20}
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out role field.</div>
                    </div>
                    <div class="col-md-12 mb-2 ">
                      <div class="form-group mb-2">
                        <label class="" for="">
                          Key<span style={{ color: 'red' }}>*</span>
                        </label>

                        <select class="form-select" ref={SelectBox} required>
                          <option selected hidden value="">
                            ---Select key---
                          </option>
                          <option value="Super_Admin">Super_Admin</option>

                          <option value="Admin">Admin</option>
                          <option value="Editer">Editer</option>
                        </select>

                        <div class="invalid-feedback">Please fill out role field.</div>
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
                            value="Published"
                            disabled
                          />
                        ) : (
                          <input
                            type="submit"
                            onClick={() => setClicked(true)}
                            class="btn btn-gradient "
                            value="Publish"
                          />
                        ))}
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

export default RoleManage;
