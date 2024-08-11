import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import { useRef } from 'react';

import Api from 'Service/Api';
import { useLocation, useNavigate } from 'react-router-dom';

import Error from '../Dialog/Error';
import { useAuthContext } from 'Context/AuthContext';
import GoBack from '../../Button/GoBack';
import Get from '../../Function/Get';
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

const ServingUpdate = () => {
  var titleServingBox = useRef();

  var { user } = useAuthContext();

  var UserDetail = user.user;

  const [open, setOpen] = useState(false);

  const [clicked, setClicked] = useState(false);

  const [Serving, setServing] = useState([]);
  var location = useLocation();
  var navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams.get('servingId'));
  var ServingId = queryParams.get('servingId');
  const handleSubmit = (event) => {
    event.preventDefault();

    var first = UserDetail ? UserDetail.first_name : 'admin';
    var ServinginCity = titleServingBox.current.value;

    if (ServinginCity != '') {
      var raw = JSON.stringify({
        ServinginCity: ServinginCity,
        ServinginAddress: ServinginCity,
        ServinginisActive: true,
        Author: first
      });
      Update(`${Api.ServingInGetAPi}?ServingId=${ServingId}`, raw)
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
        navigate('/backend/serving');
      });

      setClicked(false);
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Update');
    }
  };

  useEffect(() => {
    fetchServingData();
  });

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
      setServing(result.result[0]);
    } else {
      console.log(result.result[0]);
    }
  };

  const fetchServingData = async () => {
    Get(`${Api.ServingInGetAPi}?ServingId=${ServingId}`)
      .then(handleResponse)
      .then(processGet)
      .catch(handleError);
  };

  function nameHandler(e) {
    setOpen(false);
  }

  useEffect(() => {
    document.querySelector('#ServingTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);
  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Update serving in </title>
        <div className="m-3">
          <Stack spacing={3}>
            <div class="card-headers ">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Update serving in </h2>
                </div>
              </div>
            </div>
            <SimpleCard>
              <form onSubmit={handleSubmit} className={clicked ? 'was-validated' : ''}>
                <div className="row">
                  <div className="col-lg-12">
                    {' '}
                    <div className="mb-4">
                      <label className="mb-3">
                        {' '}
                        City <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        id="ServingTitleText"
                        defaultValue={Serving.ServinginCity}
                        onChange={nameHandler}
                        ref={titleServingBox}
                        required
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>

                  <div className="col-lg-12  col-md-12">
                    <div className="row">
                      <div className="col-6">
                        <GoBack value="serving" />
                      </div>
                      <div className="col-6 text-end">
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
            </SimpleCard>
          </Stack>
        </div>
      </Stack>
    </Container>
  );
};

export default ServingUpdate;
