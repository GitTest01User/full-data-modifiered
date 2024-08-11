import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useRef } from 'react';

import Api from 'Service/Api';
import { useLocation, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { useEffect } from 'react';

import { useAuthContext } from 'Context/AuthContext';
import Error from '../Dialog/Error';
import Get from '../../Function/Get';
import GoBack from '../../Button/GoBack';
import Update from '../../Function/Update';
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const IconHeaderUpdate = () => {
  var { user } = useAuthContext();
  const [clicked, setClicked] = useState(false);
  var titleFollowBox = useRef();
  var IconFollowBox = useRef();
  var LinkFollowBox = useRef();

  const [open, setOpen] = useState(false);

  const [Follow, setFollow] = useState([]);

  var location = useLocation();
  var navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  var Id = queryParams.get('followId');

  useEffect(() => {
    fetchFollowData();
  }, []);

  const fetchFollowData = async () => {
    Get(`${Api.FollowGetHeaderIcon}?Id=${Id}`)
      .then(handleResponse)
      .then(processGet)
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

  const processGet = (result) => {
    if (result.Status) {
      setFollow(result.result[0]);
    } else {
      alert('user Not Found');
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    var UserDetail = user.user;
    var first = UserDetail ? UserDetail.first_name : 'admin';
    var FollowTitles = titleFollowBox.current.value;
    var FollowIcon = IconFollowBox.current.value;
    var FollowLink = LinkFollowBox.current.value;
    if (FollowTitles != '') {
      var raw = JSON.stringify({
        Icon: FollowIcon,
        Title: FollowTitles,
        Link: FollowLink,
        FollowIsActive: true,
        Author: first
      });
      Update(`${Api.FollowGetHeaderIcon}?Id=${Id}`, raw)
        .then(handleResponse)
        .then(processUpdate)
        .catch(handleError);
    } else {
      setOpen(false);
    }
  };

  const processUpdate = (result) => {
    if (result.Status) {
      setOpen(true);
      EnquriySweetAlart('Update').then(() => {
        navigate('/backend/icon');
      });

      setClicked(false);
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Update');
    }
  };

  function nameHandler(e) {
    setOpen(false);
  }
  useEffect(() => {
    document.querySelector('#FollowTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - follow icon </title>
        <div className="m-3">
          <Stack spacing={3}>
            <div class="card-headers ">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Update follow icon</h2>
                </div>
              </div>
            </div>
            <SimpleCard>
              <div className="row">
                <form onSubmit={handleSubmit} className={clicked ? 'was-validated' : ''}>
                  <div className="col-lg-12">
                    {' '}
                    <div className="mb-4">
                      <label className="mb-2">
                        {' '}
                        Title <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        id="FollowTitleText"
                        defaultValue={Follow.Title}
                        onChange={nameHandler}
                        ref={titleFollowBox}
                        required
                        autoComplete="off"
                      />
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>
                  <div class="col-12 my-4">
                    <h5 class="fs-5 fw-bold mb-0">Upload icon </h5>
                    <hr />
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-4">
                      <span>
                        <i className={Follow.Icon}></i>
                      </span>
                      <label className="mb-2">
                        Icon class name <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        id="FollowTitleText"
                        defaultValue={Follow.Icon}
                        ref={IconFollowBox}
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-4">
                      <label className="mb-2">
                        Link<span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        id="FollowTitleText"
                        defaultValue={Follow.Link}
                        ref={LinkFollowBox}
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12  col-md-12">
                    <div className="row">
                      <div className="col-lg-6">
                        <GoBack value="icon" />
                      </div>
                      <div className="col-lg-6">
                        {' '}
                        <div className="w-100" style={{ textAlign: 'end' }}>
                          {open ? (
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
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </SimpleCard>
          </Stack>
        </div>
      </Stack>
    </Container>
  );
};

export default IconHeaderUpdate;
