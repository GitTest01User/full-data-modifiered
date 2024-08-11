import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';

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

const CounterManage = () => {
  var { user } = useAuthContext();
  var navigate = useNavigate();
  var titleCounterBox = useRef();
  var titleBox = useRef();
  var titleBackendIconBox = useRef();
  var UserDetail = user.user;

  const [open, setOpen] = useState(false);

  const [clicked, setClicked] = useState(false);

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
        BackendIcon: backendIcon,
        ImageCounter: 'overclass0',
        Author: first
      });
      PostProcess(Api.CounterPostSite, raw)
        .then(handleResponse)
        .then((result) => processPost(result, event))
        .catch(handleError);
    } else {
      setOpen(false);
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
      event.target.reset();
      EnquriySweetAlart('Create').then(() => {
        navigate('/backend/counter');
      });

      setClicked(false);
    } else {
      setOpen(true);
      EnquriySweetAlart('Fail-Create');
    }
  };

  function nameHandler(e) {
    setOpen(false);
    document.querySelector('#counterTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Create Counter </title>

        <Stack spacing={3} className="m-3">
          <div class="card-headers mt-3 ">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Create Counter </h2>
              </div>
            </div>
          </div>
          <SimpleCard>
            <form onSubmit={handleSubmit} className={clicked ? 'was-validated' : ''}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label className="mb-2">
                      {' '}
                      Title <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      className="form-control p-2"
                      type="text"
                      id="CounterTitleText"
                      placeholder="Enter a title"
                      onChange={nameHandler}
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
                      placeholder="Enter a count"
                      onChange={nameHandler}
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
                      placeholder="Enter a flatIcon"
                      id="CounterTitleIconText"
                      onChange={nameHandler}
                      ref={titleBackendIconBox}
                      required
                      autoComplete="off"
                    />

                    <div class="invalid-feedback">Please fill out this field.</div>
                  </div>
                </div>

                <div className="col-lg-12 mb-3">
                  <div className="row">
                    <div className="col-lg-6">
                      <GoBack value="counter" />
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

export default CounterManage;
