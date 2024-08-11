import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import { useRef } from 'react';

import Api from 'Service/Api';
import { useLocation, useNavigate } from 'react-router-dom';

import Success from '../Dialog/Success';
import Error from '../Dialog/Error';
import { useAuthContext } from 'Context/AuthContext';
import Get from '../../Function/Get';
import Update from '../../Function/Update';
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

const QuickLinkUpdate = () => {
  const [pramaLinkRoute, SetPramaLinkRoute] = useState();
  var titleQuickLinkBox = useRef();

  var { user } = useAuthContext();
  var navigate = useNavigate();
  var PermaLinkQuickLinkBox = useRef();
  var UserDetail = user.user;

  const [open, setOpen] = useState(false);

  const [clicked, setClicked] = useState(false);

  const [QuickLink, setQuickLink] = useState([]);
  var location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  var QuickId = queryParams.get('Id');

  var RouterId = queryParams.get('routeId');

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  const processUpdate = (result) => {
    if (result.Status) {
      setOpen(true);

      EnquriySweetAlart('Update').then(() => {
        navigate('/backend/link');
      });

      setClicked(false);
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Update');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var first = UserDetail ? UserDetail.first_name : 'admin';
    var Title = titleQuickLinkBox.current.value;
    var PermaLinkQuick = PermaLinkQuickLinkBox.current.value;

    const headerPayload = JSON.stringify({
      Title: Title,
      PermaLink: PermaLinkQuick,
      QuickLinkIsActive: true,
      Author: first
    });
    Update(`${Api.QuickLinkGetSite}?Id=${QuickId}`, headerPayload)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  useEffect(() => {
    fetchQuickLinkData();
    fetchBrowserRoutersIdItems();
    document.querySelector('#QuickLinkTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

  const processGet = (result) => {
    if (result.Status) {
      setQuickLink(result.result[0]);
    } else {
      console.log(result.result[0]);
    }
  };
  const fetchQuickLinkData = async () => {
    Get(`${Api.QuickLinkGetSite}?Id=${QuickId}`)
      .then(handleResponse)
      .then(processGet)
      .catch(handleError);
  };

  const fetchBrowserRoutersIdItems = async () => {
    Get(`${Api.BrowserRouteGetApi}?BrowserRoutersId=${RouterId}`)
      .then(handleResponse)
      .then(processGetBrowserRouters)
      .catch(handleError);
  };
  const processGetBrowserRouters = (result) => {
    if (result.Status) {
      var PramalinksRoute = result.result[0].BrowserRouterPermaLink;

      SetPramaLinkRoute(PramalinksRoute);
    } else {
      console.log(result.result[0]);
    }
  };
  function nameHandler(e) {
    setOpen(false);
  }

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Update QuickLink in </title>
        <div className="m-3">
          <Stack spacing={3}>
            <div class="card-headers ">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Update QuickLink in </h2>
                </div>
              </div>
            </div>
            <SimpleCard>
              <form onSubmit={handleSubmit} className={clicked ? 'was-validated' : ''}>
                <div className="row">
                  <div className="col-lg-12">
                    {' '}
                    <div className="mb-3">
                      <label className="mb-2"> Title</label>
                      <input
                        className="form-control p-2"
                        type="text"
                        id="QuickLinkTitleText"
                        defaultValue={QuickLink.Title}
                        onChange={nameHandler}
                        ref={titleQuickLinkBox}
                        required
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    {' '}
                    <div className="mb-3">
                      <label className="mb-2"> PermaLink</label>
                      <input
                        className="form-control p-2"
                        type="text"
                        id="QuickLinkTitleText"
                        defaultValue={pramaLinkRoute}
                        onChange={nameHandler}
                        ref={PermaLinkQuickLinkBox}
                        required
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>

                  <div className="col-lg-12  col-md-12">
                    <div className="row">
                      <div className="col-6">
                        {' '}
                        <GoBack value="link" />
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

export default QuickLinkUpdate;
