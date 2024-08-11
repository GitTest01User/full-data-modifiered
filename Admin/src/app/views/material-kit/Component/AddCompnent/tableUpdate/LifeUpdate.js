import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useRef } from 'react';
import $ from 'jquery';
import Api from 'Service/Api';
import { useLocation, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { useEffect } from 'react';

import { useAuthContext } from 'Context/AuthContext';
import Error from '../Dialog/Error';
import Get from '../../Function/Get';
import Update from '../../Function/Update';
import GoBack from '../../Button/GoBack';
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

const LifeUpdate = () => {
  var { user } = useAuthContext();
  var navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  var titleLifeBox = useRef();

  const [open, setOpen] = useState(false);

  const [Life, setLife] = useState([]);
  const [LifeImage, setLifeImage] = useState();

  var location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  var lifeId = queryParams.get('lifeId');

  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  useEffect(() => {
    fetchLifeData();
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

  const processGet = (result) => {
    if (result.Status) {
      setLife(result.result[0]);
    } else {
      alert('user Not Found');
    }
  };

  const fetchLifeData = async () => {
    Get(`${Api.LifeSliderGetAPi}?LifeSilderId=${lifeId}`)
      .then(handleResponse)
      .then(processGet)
      .catch(handleError);
  };

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
      setLifeImage(reader.result);
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
          src={Life.LifeSilderimage ? `${Api.BaseURL}/${Life.LifeSilderimage}` : '/demo.png'}
          alt="Preview"
        />
      </div>
    );
  }
  let $imagePreviews = null;
  var datanew = Life.LifeSilderimage;
  if (imagePreviewUrl) {
    $imagePreviews = <div className="previewText">{ImagePopup(datanew)}</div>;
  } else {
    $imagePreviews = <div className="previewText">{ImagePopup(datanew)}</div>;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    var UserDetail = user.user;
    var first = UserDetail ? UserDetail.first_name : 'admin';
    var LifeTitles = titleLifeBox.current.value;
    var Life = LifeImage;

    if (LifeTitles != '') {
      var raw = JSON.stringify({
        LifeSilderimage: Life,
        LifeSilderTitle: LifeTitles,
        LifeSilderisActive: true,
        Author: first
      });
      Update(`${Api.LifeSliderGetAPi}?LifeSilderId=${lifeId}`, raw)
        .then(handleResponse)
        .then(processUpdate)
        .catch(handleError);
    } else {
      setOpen(true);
    }
  };

  const processUpdate = (result) => {
    if (result.Status) {
      setOpen(true);
      EnquriySweetAlart('Update').then(() => {
        navigate('/backend/life');
      });

      setClicked(false);
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Update');
    }
  };

  function nameHandler(e) {
    setOpen(false);
  }
  useEffect(() => {
    document.querySelector('#LifeTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - life digi2l </title>
        <div className="m-3">
          <Stack spacing={3}>
            <div class="card-headers ">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Update life digi2l</h2>
                </div>
              </div>
            </div>
            <SimpleCard>
              <div className="row">
                <form onSubmit={handleSubmit} className={clicked ? 'was-validated' : ''}>
                  <div className="col-lg-12">
                    {' '}
                    <div className="mb-4">
                      <label className="mb-2">
                        {' '}
                        Title <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        id="LifeTitleText"
                        defaultValue={Life.LifeSilderTitle}
                        onChange={nameHandler}
                        ref={titleLifeBox}
                        required
                      />
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
                      <div id="imageBg" class=" ">
                        <div class=" isActiveErrorColorBorder p-4 pb-2  ">
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
                        without checking for the image presence. Otherwise, it will perform the
                        usual validation.
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12  col-md-12">
                    <div className="row">
                      <div className="col-lg-6">
                        <GoBack value="life" />
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
                </form>
              </div>
            </SimpleCard>
          </Stack>
        </div>
      </Stack>
    </Container>
  );
};

export default LifeUpdate;
