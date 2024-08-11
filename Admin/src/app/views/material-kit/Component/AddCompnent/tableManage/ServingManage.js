import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import Api from 'Service/Api';

import { useRef } from 'react';

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

const ServingManage = () => {
  var { user } = useAuthContext();
  var navigate = useNavigate();
  var UserDetail = user.user;

  const [open, setOpen] = useState(false);

  const [clicked, setClicked] = useState(false);
  var titleServingBox = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    var first = UserDetail ? UserDetail.first_name : 'admin';

    var ServinginCity = titleServingBox.current.value;

    if (ServinginCity != '') {
      var raw = JSON.stringify({
        Author: first,
        ServinginCity: ServinginCity,
        ServinginAddress: ServinginCity
      });
      PostProcess(Api.ServingInPostAPi, raw)
        .then(handleResponse)
        .then((result) => processPost(result, event))
        .catch(handleError);
    } else {
      setOpen(false);
    }
  };

  const processPost = (result, event) => {
    if (result.Status) {
      event.target.reset();

      setOpen(true);
      setClicked(false);

      EnquriySweetAlart('Create').then(() => {
        navigate('/backend/serving');
      });
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Create');
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
  useEffect(() => {
    document.querySelector('#ServingTitleText').addEventListener('keydown', function (e) {
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
        <title>Digi2l - Create serving in </title>

        <Stack spacing={3} className="m-3">
          <div class="card-headers mt-3 ">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Create serving in</h2>
              </div>
            </div>
          </div>
          <SimpleCard>
            <form onSubmit={handleSubmit} className={clicked ? 'was-validated' : ''}>
              <div className="row">
                <div className="col-lg-12">
                  {' '}
                  <div className="mb-3">
                    <label className="mb-3">
                      City <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      className="form-control p-2"
                      type="text"
                      id="ServingTitleText"
                      placeholder="Enter city"
                      onChange={nameHandler}
                      ref={titleServingBox}
                      required
                      autoComplete="off"
                    />
                    <div class="invalid-feedback">Please fill out this field.</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-6">
                    <GoBack value="serving" />
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
            </form>
            <div></div>
          </SimpleCard>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ServingManage;
