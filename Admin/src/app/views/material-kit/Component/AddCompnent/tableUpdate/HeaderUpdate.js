import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import $ from 'jquery';

import { useRef } from 'react';

import Api from 'Service/Api';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthContext } from 'Context/AuthContext';
import Error from '../Dialog/Error';

import React from 'react';
import GoBack from '../../Button/GoBack';
import Get from '../../Function/Get';
import Update from '../../Function/Update';
import ImagePopup from '../Dialog/ImagePopup';
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const HeaderUpdate = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [imagePreviewUrlMv, setImagePreviewUrlMv] = useState('');
  const [card, setCard] = useState([]);

  var location = useLocation();
  var navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  var ParamsId = queryParams.get('id');
  var RouterId = queryParams.get('routeId');

  var { user } = useAuthContext();

  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const [pramaLinkRoute, SetPramaLinkRoute] = useState();

  const [HeaderImage, setHeaderImage] = useState();
  const [HeaderImageMv, setHeaderImageMv] = useState();
  const [cards, setCards] = useState('');
  var selectHeaders = useRef();
  var TitleBox = useRef();
  var PermaLinkBox = useRef();

  var UserDetail = user.user;
  function nameHandler(e) {
    setOpen(false);
  }
  function nameLastHandler(e) {
    setOpen(false);
  }

  useEffect(() => {
    fetchMenuItems();

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
    fetchMenuItemss()
  }, [ParamsId]);
  const fetchMenuItems = async () => {
    Get(`${Api.HeaderMenuGetApi}?id=${ParamsId}`)
      .then(handleResponse)
      .then(processGet)
      .catch(handleError);
  };

  const processGet = (result) => {
    if (result.Status) {
      setCards(result.result[0]);
      setCard(result.result);
    } else {
      setCards(result.result[0]);
    }
  };

  const fetchMenuItemss = async () => {
    Get(Api.HeaderMenuGetApi)
      .then(handleResponse)
      .then(processGets)
      .catch(handleError);
  };

  const processGets = (result) => {
    if (result.Status) {

      setCard(result.result);
    } else {

      setCard(result.result);
    }
  };

  const UserCreateSubmit = async (event) => {
    event.preventDefault();

    const FirstAuthor = UserDetail.first_name;
    const TitleHeader = TitleBox.current.value;
    const PramalinksBox = PermaLinkBox.current.value;
    const image = HeaderImage;
    const imageMv = HeaderImageMv;
    var selectPrantId = selectHeaders.current.value;
    var PrantIdSB = JSON.parse(selectPrantId);
  
    var headerPayload = JSON.stringify({
      HeaderTitle: TitleHeader,
      HeaderPerantId: PrantIdSB === 0 ? null : PrantIdSB,
      Author: FirstAuthor,
      HeaderIcon: image,
      HeaderPermaLink: PramalinksBox,
      HeaderisActive: true,
      HeaderMoblieIcon: imageMv
    });
    
    Update(`${Api.HeaderMenuGetApi}?id=${ParamsId}`, headerPayload)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);




  };
  const processUpdate = (result) => {
    if (result.Status) {
      setOpen(true);
      EnquriySweetAlart('Update', result.Message).then(() => {
        navigate('/backend/menu');
      });

      setClicked(false);
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Update', result.Message);
    }
  };

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    EnquriySweetAlart('Fail-Update');
  };

  const processGetBrowsers = (result) => {
    if (result.Status) {
      var PramalinksRoute = result.result[0].BrowserRouterPermaLink;

      SetPramaLinkRoute(PramalinksRoute);
    } else {
      console.log(result.result);
    }
  };

  const fetchBrowserRoutersIdItems = async () => {
    Get(`${Api.BrowserRouteGetApi}?BrowserRoutersId=${RouterId}`)
      .then(handleResponse)
      .then(processGetBrowsers)
      .catch(handleError);
  };

  let $imagePreview = null;
  let $imagePreviewMv = null;
  if (imagePreviewUrl) {
    $imagePreview = <img class="w-100 " id="imgprev_3_3" src={imagePreviewUrl} alt="Preview" />;
  } else {
    $imagePreview = (
      <div className="previewText">
        <img
          class="w-100 "
          id="imgprev_3_3"
          src={cards.HeaderIcon ? `${Api.BaseURL}/${cards.HeaderIcon}` : '/demo.png'}
          alt="Preview"
        />
      </div>
    );
  }

  let $imagePreviews = null;
  var datanew = cards.HeaderIcon;
  if (imagePreviewUrl) {
    $imagePreviews = <div className="previewText">{ImagePopup(datanew)}</div>;
  } else {
    $imagePreviews = <div className="previewText">{ImagePopup(datanew)}</div>;
  }
  if (imagePreviewUrlMv) {
    $imagePreviewMv = <img class="w-100 " id="imgprev_3_3" src={imagePreviewUrlMv} alt="Preview" />;
  } else {
    $imagePreviewMv = (
      <div className="previewText">
        <img
          class="w-100 "
          id="imgprev_3_3"
          src={cards.HeaderMoblieIcon ? `${Api.BaseURL}/${cards.HeaderMoblieIcon}` : '/demo.png'}
          alt="Preview"
        />
      </div>
    );
  }
  let $imagePreviewsed = null;
  var datanew = cards.HeaderMoblieIcon;
  if (imagePreviewUrl) {
    $imagePreviewsed = <div className="previewText">{ImagePopup(datanew)}</div>;
  } else {
    $imagePreviewsed = <div className="previewText">{ImagePopup(datanew)}</div>;
  }
  const handleFileChange = (e) => {
    e.preventDefault();

    if (!e.target.files || e.target.files.length === 0) {
      alert('No file selected. Please select an image file.');
      return;
    }

    let reader = new FileReader();
    var file = e.target.files[0];

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    reader.onloadend = () => {
      console.log('file', file);
      $('#L').removeClass('demo124');

      setImagePreviewUrl(reader.result);
      setHeaderImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChangeMv = (event) => {
    setOpen(false);

    let reader = new FileReader();

    let file = event.target.files[0];

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    reader.onloadend = () => {
      $('#M').removeClass('demo124');

      setImagePreviewUrlMv(reader.result);

      setHeaderImageMv(reader.result);
    };

    reader.readAsDataURL(file);
  };
  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - Update menu </title>

        <Stack className="m-3">
          <div class="card-headers ">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Update build menu</h2>
              </div>
            </div>
          </div>
          <SimpleCard>
            <form onSubmit={UserCreateSubmit} className={clicked ? 'was-validated' : ''}>
              <div className="row mt-3">
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
                        data-val="true"
                        id="HeaderTitleNameText"
                        ref={TitleBox}
                        onChange={nameHandler}
                        placeholder="Enter Title"
                        required
                        maxLength={20}
                        defaultValue={cards.HeaderTitle}
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out name field.</div>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="validationCustom04" class="form-label">
                        Headers
                      </label>
                      <select
                        class="form-select"
                        ref={selectHeaders}
                        id="validationCustom04"
                        required
                      >
                        <option selected disabled hidden value='0'>
                          ---Select Headers---
                        </option>

                        {card.map((obj) => {
                          if (obj.isMenu == true && obj.HeaderisActive == true) {
                            return (
                              <>
                                <option value={obj.id}>{obj.HeaderTitle}</option>
                              </>
                            );
                          }
                        })}
                      </select>
                      <div className="bg-opacity-50 font-small mt-2 p-2 text-bg-light text-sm-start">
                        Select already in menu header but user can change modified to dropdown.
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
                        maxLength={50}
                        defaultValue={pramaLinkRoute}
                        autoComplete="off"
                      />
                      <div className="bg-opacity-50 font-small mt-2 p-2 text-bg-light text-sm-start">
                        Permalink-example:/example
                      </div>
                      <div class="invalid-feedback">Please fill out link field.</div>
                    </div>
                  </div>
                </div>

                <div class="col-12 my-4">
                  <h5 class="fs-5 fw-bold mb-0">Upload image update</h5>
                  <hr />
                </div>
                <div className="col-md-12 mb-3">
                  <div className="row">
                    <div class="col-md-6  " id="imageBg">
                      <label className="mb-2"> Image</label>
                      <div id="L" class="  isEmpty">
                        <div class=" isActiveErrorColorBorder p-4 pb-5  ">
                          <label for="formFile" class="form-label">
                            Choose image upload
                          </label>
                          <div class="justify-content-center row">
                            <div className="col-lg-8">
                              <div class="text-center" style={{ height: '100px' }}>
                                <div style={{ height: '100px' }}>
                                  {$imagePreview}
                                  <input
                                    className="dropzone"
                                    type="file"
                                    onChange={handleFileChange}
                                     accept="image/*"
                                  />
                                </div>
                                <small class="mb-3 mt-2  text-center d-block form-label">
                                  Click here to replace image
                                </small>
                              </div>
                            </div>
                          </div>
                          <div className="pb-0 ">{$imagePreviews}</div>
                        </div>
                        <div class="isActiveError">Please select a file.</div>
                      </div>
                    </div>
                    <div class="col-md-6" id="imageBg">
                      <label className="mb-2">M.v Image</label>
                      <div id="M" class=" isEmpty">
                        <div class="isActiveErrorColorBorder p-4 pb-5  ">
                          <label for="formFile" class="form-label">
                            Choose image upload
                          </label>
                          <div class="justify-content-center row">
                            <div className="col-lg-8">
                              <div class="text-center" style={{ height: '100px' }}>
                                <div style={{ height: '100px' }}>
                                  {$imagePreviewMv}
                                  <input
                                    className="dropzone"
                                    type="file"
                                    onChange={handleFileChangeMv}
                                     accept="image/*"
                                  />
                                </div>
                                <small class="mb-3 mt-2  text-center d-block form-label">
                                  Click here to replace image
                                </small>
                              </div>
                            </div>
                          </div>

                          <div className="pb-0 ">{$imagePreviewsed}</div>
                        </div>
                        <div class="isActiveError">Please select a file.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-opacity-50 font-small mt-2 p-2 text-bg-light text-sm-start">
                  With this modification, if a image is already used , the form will submit without
                  checking for the image presence. Otherwise, it will perform the usual validation.
                </div>
                <div className="col-lg-12 my-2">
                  <div className="row">
                    <div className="col-lg-6">
                      <GoBack value="menu" />
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
          </SimpleCard>
        </Stack>
      </Stack>
    </Container>
  );
};

export default HeaderUpdate;
