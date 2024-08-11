import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import { useRef } from 'react';

import Api from 'Service/Api';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthContext } from 'Context/AuthContext';
import Update from '../../Function/Update';
import Get from '../../Function/Get';
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

const CounterUpdate = () => {
  var navigate = useNavigate();
  var titleCounterBox = useRef();
  var titleBox = useRef();
  var titleBackendIconBox = useRef();

  var { user } = useAuthContext();

  var UserDetail = user.user;

  const [open, setOpen] = useState(false);
  const [openErr, setOpenErr] = useState(false);

  const [clicked, setClicked] = useState(false);

  const [Counter, setCounter] = useState([]);
  var location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  var CounterId = queryParams.get('Id');

  const handleSubmit = (event) => {
    event.preventDefault();

    var first = UserDetail ? UserDetail.first_name : 'admin';
    var CounterCount = titleCounterBox.current.value;
    var Counter = JSON.parse(CounterCount);
    var CounterTitle = titleBox.current.value;
    var backendIcon = titleBackendIconBox.current.value;
    if (CounterTitle != '') {
      var raw = JSON.stringify({
        Reseller_count: Counter,
        Title: CounterTitle,
        ImageCounter: 'overclass0',
        BackendIcon: backendIcon,
        CounterISActive: true,
        Author: first
      });

      Update(`${Api.CounterGetWebSite}?Id=${CounterId}`, raw)
        .then(handleResponse)
        .then(processUpdate)
        .catch(handleError);
    } else {
      setOpenErr(true);
    }
  };
  const processUpdate = (result) => {
    if (result.Status) {
      setOpen(true);
      EnquriySweetAlart('Update').then(() => {
        navigate('/backend/counter');
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

  const fetchCounterData = async () => {
    Get(`${Api.CounterGetWebSite}?Id=${CounterId}`)
      .then(handleResponse)
      .then(processGetBlogSelect)
      .catch(handleError);
  };

  const processGetBlogSelect = (result) => {
    if (result.Status) {
      setCounter(result.result[0]);
    } else {
      setCounter(result.result[0]);
    }
  };
  useEffect(() => {
    fetchCounterData();
    document.querySelector('#CounterTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - Update counter </title>
        <div className="m-3">
          <Stack spacing={3}>
            <div class="card-headers ">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Update counter </h2>
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
                        {' '}
                        Title <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        id="CounterTitleText"
                        defaultValue={Counter.Title}
                        ref={titleBox}
                        required
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className="mb-3">
                      <label className="mb-2">
                        {' '}
                        Count <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        id="CounterTitleText"
                        defaultValue={Counter.Reseller_count}
                        ref={titleCounterBox}
                        required
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className="mb-3">
                      <label className="mb-2">
                        {' '}
                        Backend Icon <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        id="CounterTitleIconText"
                        defaultValue={Counter.BackendIcon}
                        ref={titleBackendIconBox}
                        required
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>

                  <div className="col-lg-12  col-md-12">
                    <div className="row">
                      <div className="col-6">
                        <GoBack value="counter" />
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

export default CounterUpdate;
