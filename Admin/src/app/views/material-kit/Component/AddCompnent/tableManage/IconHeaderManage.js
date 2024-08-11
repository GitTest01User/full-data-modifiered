import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';
import { useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import { useRef } from 'react';
import Api from 'Service/Api';

import { useAuthContext } from 'Context/AuthContext';
import PostProcess from '../../Function/Post';
import GoBack from '../../Button/GoBack';
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

const IconHeaderManage = () => {
  var navigate = useNavigate();
  var titleFollowBox = useRef();
  var IconFollowBox = useRef();
  var LinkFollowBox = useRef();
  var { user } = useAuthContext();
  const [open, setOpen] = useState(false);

  const [clicked, setClicked] = useState(false);

  var titleFollowBox = useRef();

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

      PostProcess(Api.FollowPostHeaderIcon, raw)
        .then(handleResponse)
        .then((result) => processPost(result, event))
        .catch(handleError);
    } else {
      scrollToFirstUnansweredQuestion();
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

  const processPost = (result, event) => {
    if (result.Status) {
      setOpen(true);

      setClicked(false);
      event.target.reset();

      setOpen(true);
      setClicked(false);
      EnquriySweetAlart('Create').then(() => {
        navigate('/backend/icon');
      });
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Create');
    }
  };

  const scrollToFirstUnansweredQuestion = () => {
    $('html, body').animate(
      {
        scrollTop: $('.isEmpty:first').offset().top - $(window).height() / 2
      },
      300
    );
  };

  useEffect(() => {
    document.querySelector('#FollowTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    document.querySelector('#FollowTitleTextIcon').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    document.querySelector('#FollowTitleTextLink').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

  function nameHandler(e) {
    setOpen(false);
  }

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Create Follow Icon</title>
        <div className="m-3">
          <Stack spacing={3}>
            <div class="card-headers ">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Create follow icon</h2>
                </div>
              </div>
            </div>
            <SimpleCard>
              <form onSubmit={handleSubmit} className={clicked ? 'was-validated' : ''}>
                <div className="row">
                  <div className="col-lg-12">
                    {' '}
                    <div className="mb-4">
                      <label className="mb-2">
                        Title <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        id="FollowTitleText"
                        placeholder="Enter title"
                        onChange={nameHandler}
                        ref={titleFollowBox}
                        required
                        autoComplete="off"
                      />
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>
                  <div class="col-12 my-3">
                    <h5 class="fs-5 fw-bold mb-0">Upload icon create</h5>
                    <hr />
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="mb-2">
                        Icon class name <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        id="FollowTitleTextIcon"
                        placeholder="Enter icon"
                        ref={IconFollowBox}
                        required
                        autoComplete="off"
                      />
                      <div class="invalid-feedback">Please fill out this field.</div>
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
                        id="FollowTitleTextLink"
                        placeholder="Enter link"
                        ref={LinkFollowBox}
                        required
                        autoComplete="off"
                      />
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="row">
                      <div className="col-6">
                        {' '}
                        <GoBack value="icon" />
                      </div>
                      <div className="col-6">
                        {' '}
                        <div className="w-100" style={{ textAlign: 'end' }}>
                          {open ? (
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
                          )}
                        </div>
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

export default IconHeaderManage;
