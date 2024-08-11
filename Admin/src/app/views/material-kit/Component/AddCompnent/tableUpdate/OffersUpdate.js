import { useState } from 'react';
import { Container } from '@mui/material';

import { useEffect } from 'react';
import Api from 'Service/Api';
import { useLocation, useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';

import $ from 'jquery';

import { useRef } from 'react';

import React from 'react';
import { SimpleCard } from 'app/components';

import Error from '../Dialog/Error';
import { useAuthContext } from 'Context/AuthContext';
import GoBack from '../../Button/GoBack';
import Get from '../../Function/Get';
import Update from '../../Function/Update';
import ImagePopup from '../Dialog/ImagePopup';
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';

const OffersUpdate = () => {
  var { user } = useAuthContext();
  var navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const [Offers, setOffers] = useState([]);
  const [OffersSelect, setOffersSelect] = useState();

  var location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  var OffersId = queryParams.get('offersId');
  var textTitleBox = useRef();
  var OffersLinksBox = useRef();

  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const handleImageChange = (e) => {
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
      $('#imageBg').removeClass('demo124');
      setImagePreviewUrl(reader.result);
      setOffersSelect(reader.result);
    };

    reader.readAsDataURL(file);
  };

  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = <img class="w-100" id="imgprev_3_3" src={imagePreviewUrl} alt="Preview" />;
  } else {
    $imagePreview = (
      <div className="previewText">
        <img
          class="w-100"
          id="imgprev_3_3"
          src={
            Offers.OngoingOffersImage ? `${Api.BaseURL}/${Offers.OngoingOffersImage}` : '/demo.png'
          }
          alt="Preview"
        />
      </div>
    );
  }

  let $imagePreviews = null;
  var datanew = Offers.OngoingOffersImage;
  if (imagePreviewUrl) {
    $imagePreviews = <div className="previewText">{ImagePopup(datanew)}</div>;
  } else {
    $imagePreviews = <div className="previewText">{ImagePopup(datanew)}</div>;
  }
  const handleSubmit = (event) => {
    var UserDetail = user.user;
    var first = UserDetail ? UserDetail.first_name : 'admin';
    event.preventDefault();
    var OffersLink = OffersLinksBox.current.value;

    var OffersTitle = textTitleBox.current.value;

    var Offersimage = OffersSelect;

    if (OffersTitle != '' && OffersLink != '') {
      var raw = JSON.stringify({
        OngoingOffersTitle: OffersTitle,
        Author: first,
        OngoingOffersLink: OffersLink,

        OngoingOffersImage: Offersimage,
        OngoingOffersisActive: true
      });
      Update(`${Api.OngoingOffersGetAPi}?OngoingOffersId=${OffersId}`, raw)
        .then(handleResponse)
        .then(processUpdate)
        .catch(handleError);
    } else {
      scrollToFirstUnansweredQuestion();
    }
  };

  const processUpdate = (result) => {
    if (result.Status) {
      setOpen(true);
      EnquriySweetAlart('Update').then(() => {
        navigate('/backend/offers');
      });

      setClicked(false);
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Update');
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
    fetchOffersData();
    $('#editervalue').addClass('demo123');

    document.querySelector('#OffersTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  const fetchOffersData = async () => {
    Get(`${Api.OngoingOffersGetAPi}?OngoingOffersId=${OffersId}`)
      .then(handleResponse)
      .then(processGet)
      .catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      setOffers(result.result[0]);
    } else {
      alert('user Not Found');
    }
  };

  function nameHandler(e) {
    setOpen(false);
  }

  function nameHandlerAddress(e) {
    setOpen(false);
  }

  return (
    <Container>
      <Stack spacing={3} className="container">
        <title>Digi2l - Update Exciting offers </title>

        <div class="card-headers ">
          <div class="row align-items-center">
            <div class="col">
              <h2 class="fs-5 mb-0 card-title">Update Exciting offers</h2>
            </div>
          </div>
        </div>
        <SimpleCard>
          <div>
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
                      ref={textTitleBox}
                      id="OffersTitleText"
                      onChange={nameHandler}
                      defaultValue={Offers.OngoingOffersTitle}
                      required
                      autoComplete="off"
                    />
                    <div class="invalid-feedback">Please fill out this field.</div>
                  </div>
                </div>

                <div className="col-lg-12">
                  {' '}
                  <div className="mb-4">
                    <label className="mb-2">
                      {' '}
                      Link <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      className="form-control p-2"
                      type="text"
                      ref={OffersLinksBox}
                      id="OffersTitleLinks"
                      onChange={nameHandlerAddress}
                      defaultValue={Offers.OngoingOffersLink}
                      required
                      autoComplete="off"
                    />
                    <div className="bg-opacity-50 font-small mt-2 p-2 text-bg-light text-sm-start">
                      Links -- https://example.com/
                    </div>
                    <div class="invalid-feedback">Please fill out this field.</div>
                  </div>
                </div>
                <div class="col-12 my-4">
                  <h5 class="fs-5 fw-bold mb-0">Upload image update</h5>
                  <hr />
                </div>

                <div className="col-md-12 mb-3">
                  <label className="mb-2"> Image</label>

                  <div class="col-md-12  ">
                    <div id="imageBg" class="">
                      <div class=" isActiveErrorColorBorder p-4 pb-5  ">
                        <label for="formFile" class="form-label">
                          Choose image upload
                        </label>
                        <div class="justify-content-center row">
                          <div className="col-lg-4">
                            <div class="text-center" style={{ height: '150px' }}>
                              <div style={{ height: '150px' }}>
                                {$imagePreview}
                                <input
                                  className=" dropzone"
                                  type="file"
                                  onChange={handleImageChange}
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
                    <div className="bg-opacity-50 font-small mt-2 p-2 text-bg-light text-sm-start">
                      With this modification, if a image is already used , the form will submit
                      without checking for the image presence. Otherwise, it will perform the usual
                      validation.
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  {' '}
                  <div className="col-lg-12   col-md-12">
                    <div className="row">
                      <div className="col-lg-6">
                        <GoBack value="offers" />
                      </div>
                      <div className="col-lg-6">
                        {' '}
                        <div className=" w-100" style={{ textAlign: 'end' }}>
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
              </div>
            </form>
          </div>
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default OffersUpdate;
