import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import $ from 'jquery';

import { useRef } from 'react';

import Api from 'Service/Api';

import { useAuthContext } from 'Context/AuthContext';

import React from 'react';

import GoBack from '../../Button/GoBack';
import PostProcess from '../../Function/Post';
import Get from '../../Function/Get';
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';
import { useNavigate } from 'react-router-dom';
import ImagePopup from '../Dialog/ImagePopup';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const HeaderManage = () => {
  const [HeaderImageMv, setHeaderImageMv] = useState();

  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [imagePreviewUrlMv, setImagePreviewUrlMv] = useState('');
  var { user } = useAuthContext();
  var navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const [HeaderImage, setHeaderImage] = useState();

  var TitleBox = useRef();
  var PermaLinkBox = useRef();
  var serialBox = useRef();
  var UserDetail = user.user;
  var selectHeaders = useRef();
  useEffect(() => {
    document.querySelector('#HeaderNameText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    document.querySelector('#HeaderLastText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

  function nameHandler(e) {
    setOpen(false);
  }
  function nameLastHandler(e) {
    setOpen(false);
  }

  const UserCreateSubmit = async (event) => {
    event.preventDefault();

    var FirstAuthor = UserDetail.first_name;
    var TitleHeader = TitleBox.current.value;
    var Pramalinks = PermaLinkBox.current.value;
    var PrantIdSub = selectHeaders.current.value;
    const PrantIdSB = JSON.parse(PrantIdSub);
    var PermalinkLink = Pramalinks.replace(/\s/g, '-');
    var image = HeaderImage;
    var HeaderMoblie = HeaderImageMv;
    const serialNo = serialBox.current.value;
    const serialNumber = JSON.parse(serialNo);
    const raw = JSON.stringify({
      HeaderPerantId: PrantIdSB,
      HeaderTitle: TitleHeader,
      HeaderPermaLink: PermalinkLink,
      isMenu: false,
      HeaderIcon: image,
      HeaderisActive: true,
      Author: FirstAuthor,
      serialNo: serialNumber,
      flagSubMenu: false,
      HeaderMoblieIcon: HeaderMoblie
    });

    PostProcess(Api.HeaderMenuPostApi, raw)
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
      setOpen(true);

      setClicked(false);
      event.target.reset();
      imageEmptyM();
      imageEmpty();
      EnquriySweetAlart('Create').then(() => {
        navigate('/backend/menu');
      });
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Create');
    }
  };

  var imageEmpty = () => {
    $('#imageBg').addClass('demo124');
  };
  var imageEmptyM = () => {
    $('#M').addClass('demo124');
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

  let $imagePreviews = null;
  var datanew = HeaderImage;
  if (imagePreviewUrl) {
    $imagePreviews = <div className="previewText">{ImagePopup(datanew)}</div>;
  } else {
    $imagePreviews = <div className="previewText">{ImagePopup(datanew)}</div>;
  }

  let $imagePreviewsed = null;
  var datanew = HeaderImageMv;
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
      $('#L').removeClass('demo124');

      setImagePreviewUrl(reader.result);
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

  const fetchMenuItems = async () => {
    Get(Api.HeaderMenuGetApi).then(handleResponse).then(processGet).catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      setCards(result.result.length + 1);
      setCard(result.result);
    } else {
      console.log('data.result', result.result);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Create menu </title>

        <Stack className="m-3">
          <div class="card-headers ">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Create menu</h2>
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
                        id="HeaderNameText"
                        ref={TitleBox}
                        onChange={nameHandler}
                        placeholder="Enter Title"
                        required
                        maxLength={20}
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="validationCustom04" class="form-label">
                        Headers <span style={{ color: 'red' }}>*</span>
                      </label>
                      <select
                        class="form-select"
                        ref={selectHeaders}
                        id="validationCustom04"
                        required
                      >
                        <option selected disabled hidden value="">
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
                      <div class="invalid-feedback">Please select menu headers.</div>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label>
                        PermaLink <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        id="HeaderLastText"
                        class="form-control"
                        type="text"
                        ref={PermaLinkBox}
                        onChange={nameLastHandler}
                        placeholder="Enter PermaLink "
                        required
                        maxLength={100}
                        autoComplete="off"
                      />
                      <div className="bg-opacity-50 font-small mt-2 p-2 text-bg-light text-sm-start">
                        Permalink-example:/example
                      </div>
                      <div class="invalid-feedback">Please fill out this field.</div>
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
                      <label className="mb-2">
                        {' '}
                        Image <span style={{ color: 'red' }}>*</span>
                      </label>
                      <div   id="L" class=" demo124 isEmpty">
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
                      <label className="mb-2">
                        M.v Image <span style={{ color: 'red' }}>*</span>
                      </label>
                      <div id="M" class=" demo124 isEmpty">
                        <div class=" isActiveErrorColorBorder p-4 pb-5  ">
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
                <input ref={serialBox} type="hidden" value={cards} />
              </div>
              <div className="col-lg-12 ">
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
          </SimpleCard>
        </Stack>
      </Stack>
    </Container>
  );
};

export default HeaderManage;
