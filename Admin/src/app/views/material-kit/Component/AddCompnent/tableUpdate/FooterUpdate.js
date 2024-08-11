import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import { useRef } from 'react';

import Api from 'Service/Api';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthContext } from 'Context/AuthContext';

import React from 'react';
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

const FooterUpdate = () => {
  var navigate = useNavigate();

  var location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  var Id = queryParams.get('footerId');

  var routesId = queryParams.get('routeId');

  var { user } = useAuthContext();

  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const [pramaLinkRoute, SetPramaLinkRoute] = useState();
  const [Menu, SetMenu] = useState();

  const [cards, setCards] = useState([]);
  const [card, setCard] = useState([]);
  var TitleBox = useRef();
  var PermaLinkBox = useRef();
  var selectHeaders = useRef();
  useEffect(() => {
    fetchSubMenuItems(Id);
    fetchBrowserRoutersIdItems();
    document.querySelector('#HeaderTitleNameText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    document.querySelector('#HeaderTitleParmalinkText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, [Id, user]);

  function nameHandler(e) {
    setOpen(false);
  }
  function nameLastHandler(e) {
    setOpen(false);
  }

  const UserCreateSubmit = async (event) => {
    event.preventDefault();

    const FirstAuthor = user.user.first_name;
    const TitleFooter = TitleBox.current.value;

    var raw = JSON.stringify({
      FooterTitle: TitleFooter,
      FooterPerantId: null,
      FooterisActive: true,
      isMenu: true,
      Author: FirstAuthor
    });
    console.log('raw', raw);

    Update(`${Api.FooterMenuGetApi}?FooterId=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };
  var UserCreateSubmitLink = (event) => {
    event.preventDefault();
    var SubHeaders = selectHeaders.current.value;
    var SubPerantId = JSON.parse(SubHeaders);
    var FirstAuthor = user.first_name;
    var TitleFooter = TitleBox.current.value;

    var PermaLinks = PermaLinkBox.current.value;

    var raw1 = JSON.stringify({
      FooterPerantId: SubPerantId,
      FooterTitle: TitleFooter,
      FooterPermaLinks: PermaLinks,
      FooterisActive: true,

      Author: FirstAuthor
    });

    Update(`${Api.FooterMenuGetApi}?FooterId=${Id}`, raw1)
      .then(handleResponse)
      .then(processUpdated)
      .catch(handleError);
  };
  const processUpdate = (result) => {
    if (result.Status) {
      setOpen(true);
      EnquriySweetAlart('Update').then(() => {
        navigate('/backend/footer');
      });

      setClicked(false);
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Update');
    }
  };
  const processUpdated = (result) => {
    if (result.Status) {
      setOpen(true);
      EnquriySweetAlart('Update').then(() => {
        navigate('/backend/footer');
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
  const fetchSubMenuItems = async (Id) => {
    Get(`${Api.FooterMenuGetApi}?FooterId=${Id}`)
      .then(handleResponse)
      .then(processGet)
      .catch(handleError);
  };

  const fetchSubMenuItemsAll = async () => {
    Get(Api.FooterMenuGetApi).then(handleResponse).then(processGetAll).catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      console.log(result.result[0]);

      const isMenu = result.result.length > 0 ? result.result[0].isMenu : false;

      SetMenu(isMenu);
      setCards(result.result[0]);

      fetchSubMenuItemsAll();
    } else {
      console.log(result.result[0]);
    }
  };
  const processGetAll = (result) => {
    if (result.Status) {
      setCard(result.result);
    } else {
      console.log(result.result[0]);
    }
  };

  const fetchBrowserRoutersIdItems = async () => {
    Get(`${Api.BrowserRouteGetApi}?BrowserRoutersId=${routesId}`)
      .then(handleResponse)
      .then(processGetBrowsers)
      .catch(handleError);
  };

  const processGetBrowsers = (result) => {
    if (result.Status) {
      var PramalinksRoute = result.result[0].BrowserRouterPermaLink;

      SetPramaLinkRoute(PramalinksRoute);
    } else {
      console.log(result.result);
    }
  };
  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - Update Navigators </title>

        <Stack className="m-3">
          <div class="card-headers ">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Update Navigators</h2>
              </div>
            </div>
          </div>
          <SimpleCard>
            {Menu ? (
              <form onSubmit={UserCreateSubmit} className={clicked ? 'was-validated' : ''}>
                <div className="row mb-3 mt-3 ">
                  <div className="col-lg-12">
                    <div className="row">
                      {' '}
                      <div class="col-md-12 mb-3">
                        <label>
                          Title <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          class="form-control"
                          type="text"
                          id="HeaderTitleNameText"
                          ref={TitleBox}
                          onChange={nameHandler}
                          placeholder="Enter Title"
                          required
                          maxLength={20}
                          defaultValue={cards.FooterTitle}
                          autoComplete="off"
                        />

                        <div class="invalid-feedback">Please fill out this field.</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 ">
                    <div className="row">
                      <div className="col-lg-6">
                        <GoBack value="footer" />
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
                </div>
              </form>
            ) : (
              <form onSubmit={UserCreateSubmitLink} className={clicked ? 'was-validated' : ''}>
                <div className="row mb-3 mt-3 ">
                  <div className="col-lg-12">
                    <div className="row">
                      {' '}
                      <div class="col-md-12 mb-3">
                        <label>
                          Title <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          class="form-control"
                          type="text"
                          id="HeaderTitleNameText"
                          ref={TitleBox}
                          onChange={nameHandler}
                          placeholder="Enter Title"
                          required
                          maxLength={20}
                          defaultValue={cards.FooterTitle}
                          autoComplete="off"
                        />

                        <div class="invalid-feedback">Please fill out this field.</div>
                      </div>
                      <div class="col-md-12 mb-3">
                        <label for="validationCustom04" class="form-label">
                          Headers {cards.FooterParentId}
                        </label>
                        <select
                          class="form-select"
                          ref={selectHeaders}
                          id="validationCustom04"
                          required
                        >
                          {card.map((obj) => {
                            if (
                              obj.FooterId == cards.FooterPerantId &&
                              obj.FooterisActive == true
                            ) {
                              return (
                                <>
                                  <option selected disabled hidden value={obj.FooterId}>
                                    {obj.FooterTitle}
                                  </option>
                                </>
                              );
                            }
                          })}

                          {card.map((obj1) => {
                            if (
                              obj1.FooterId != cards.FooterPerantId &&
                              obj1.FooterPerantId == null &&
                              obj1.FooterisActive == true
                            ) {
                              return (
                                <>
                                  <option value={obj1.FooterId}>{obj1.FooterTitle}</option>
                                </>
                              );
                            }
                          })}
                        </select>
                        <div className="bg-opacity-50 font-small mt-2 p-2 text-bg-light text-sm-start">
                          With this modification, if a category is already selected , the form will
                          submit without checking for the category's presence. Otherwise, it will
                          perform the usual validation.
                        </div>
                        <div class="invalid-feedback">Please select menu headers.</div>
                      </div>
                      <div class="col-md-12 mb-3">
                        <label>
                          PermaLink <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          id="HeaderTitleParmalinkText"
                          class="form-control"
                          type="text"
                          ref={PermaLinkBox}
                          onChange={nameLastHandler}
                          placeholder="Enter PermaLink "
                          required
                          maxLength={100}
                          defaultValue={pramaLinkRoute}
                          autoComplete="off"
                        />
                        <div className="bg-opacity-50 font-small mt-2 p-2 text-bg-light text-sm-start">
                          Permalink-example:/example
                        </div>
                        <div class="invalid-feedback">Please fill out this field.</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 ">
                    <div className="row">
                      <div className="col-lg-6">
                        <GoBack value="footer" />
                      </div>
                      <div className="col-lg-6">
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
                </div>
              </form>
            )}
          </SimpleCard>
        </Stack>
      </Stack>
    </Container>
  );
};

export default FooterUpdate;
