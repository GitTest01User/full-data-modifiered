import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import { useRef } from 'react';

import Api from 'Service/Api';
import { useAuthContext } from 'Context/AuthContext';
import GoBack from '../../Button/GoBack';
import PostProcess from '../../Function/Post';
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

const QuickLinkManage = () => {
  var { user } = useAuthContext();
  var navigate = useNavigate();
  var UserDetail = user.user;

  const [open, setOpen] = useState(false);

  const [clicked, setClicked] = useState(false);
  var titlelinkBox = useRef();
  var PermaLinklinkBox = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    var first = UserDetail ? UserDetail.first_name : 'admin';

    var Title = titlelinkBox.current.value;
    var PermaLinkQuick = PermaLinklinkBox.current.value;

    var raw = JSON.stringify({
      Author: first,
      Title: Title,
      PermaLink: PermaLinkQuick
    });

    PostProcess(Api.QuickLinkPostSite, raw)
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
    if (result.Status) {
      event.target.reset();

      setOpen(true);
      setClicked(false);

      EnquriySweetAlart('Create').then(() => {
        navigate('/backend/link');
      });
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Create');
    }
  };

  function titleHandler(e) {
    setOpen(false);
  }
  function PramalinkHandler(e) {
    setOpen(false);
  }

  useEffect(() => {
    document.querySelector('#linkTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    document.querySelector('#linkPramailnkText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Create quick links </title>

        <Stack spacing={3} className="m-3">
          <div class="card-headers mt-3 mb-3 ">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Create quick links</h2>
              </div>
            </div>
          </div>
          <SimpleCard>
            <form onSubmit={handleSubmit} className={clicked ? 'was-validated' : ''}>
              <div className="row">
                <div className="col-lg-12">
                  {' '}
                  <div className="mb-3">
                    <label className="mb-2">
                      Title <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      className="form-control p-2"
                      type="text"
                      id="linkTitleText"
                      placeholder="Enter title"
                      onChange={titleHandler}
                      ref={titlelinkBox}
                      required
                      autoComplete="off"
                    />
                    <div class="invalid-feedback">Please fill out this field.</div>
                  </div>
                </div>

                <div className="col-lg-12">
                  {' '}
                  <div className="mb-3">
                    <label className="mb-2">
                      PermaLink <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      className="form-control p-2"
                      type="text"
                      id="linkPramailnkText"
                      placeholder="Enter permaLink"
                      onChange={PramalinkHandler}
                      ref={PermaLinklinkBox}
                      required
                      autoComplete="off"
                    />
                    <div class="invalid-feedback">Please fill out this field.</div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-6">
                      <GoBack value="link" />
                    </div>
                    <div className="col-6 text-end">
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
            </form>
            <div></div>
          </SimpleCard>
        </Stack>
      </Stack>
    </Container>
  );
};

export default QuickLinkManage;
