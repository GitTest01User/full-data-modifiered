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
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const FooterLogoUpdate = () => {
  var navigate = useNavigate();
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  var { user } = useAuthContext();
  const [clicked, setClicked] = useState(false);
  var titleLogoBox = useRef();
  var DescriptionLogoBox = useRef();
  var PermaLinkLogoBox = useRef();

  const [open, setOpen] = useState(false);

  const [Logo, setLogo] = useState([]);
  const [LogoImage, setLogoImage] = useState();

  var location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  var Id = queryParams.get('Id');

  useEffect(() => {
    fetchLogoData();
    document.querySelector('#LogoTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

  const fetchLogoData = async () => {
    Get(`${Api.FooterLogoGetSite}?Id=${Id}`)
      .then(handleResponse)
      .then(processGetCategoryGetApi)
      .catch(handleError);
  };

  const processGetCategoryGetApi = (result) => {
    if (result.Status) {
      setLogo(result.result[0]);
    } else {
      setLogo(result.result[0]);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    var UserDetail = user.user;
    var first = UserDetail ? UserDetail.first_name : 'admin';
    var LogoTitles = titleLogoBox.current.value;
    var LogoIcon = LogoImage;
    var Description = DescriptionLogoBox.current.value;
    var LogoLink = PermaLinkLogoBox.current.value;
    if (LogoTitles != '') {
      var raw = JSON.stringify({
        Image: LogoIcon,
        Title: LogoTitles,
        PermaLink: LogoLink,
        LogoIsActive: true,
        Author: first,
        Description: Description
      });

      Update(`${Api.FooterLogoGetSite}?Id=${Id}`, raw)
        .then(handleResponse)
        .then(processUpdate)
        .catch(handleError);
    } else {
      setClicked(false);
    }
  };
  const processUpdate = (result) => {
    if (result.Status) {
      setOpen(true);
      EnquriySweetAlart('Update').then(() => {
        navigate('/backend/footer-logo');
      });

      setClicked(false);
    } else {
      setOpen(false);
      EnquriySweetAlart('Fail-Update');
    }
  };

  function nameHandler(e) {
    setOpen(false);
  }

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
      setLogoImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = (
      <img
        class="mb-3 w-25 bg-light editprofilepicbox form-control-lg mx-auto"
        id="imgprev_3_3"
        src={imagePreviewUrl}
        alt="Preview"
      />
    );
  } else {
    $imagePreview = (
      <div className="previewText">
        <img
          class="mb-3  bg-light editprofilepicbox form-control-lg mx-auto"
          id="imgprev_3_3 "
          src={Logo.Image ? `${Api.BaseURL}/${Logo.Image}` : '/demo.png'}
          alt="Preview"
        />
      </div>
    );
  }
  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - Logo icon </title>
        <div className="m-3">
          <Stack spacing={3}>
            <div class="card-headers ">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Update logo icon</h2>
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
                        id="LogoTitleText"
                        defaultValue={Logo.Title}
                        onChange={nameHandler}
                        ref={titleLogoBox}
                        required
                      />
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    {' '}
                    <div className="mb-4">
                      <label className="mb-2">
                        Description <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        id="LogoTitleText"
                        defaultValue={Logo.Description}
                        onChange={nameHandler}
                        ref={DescriptionLogoBox}
                        required
                      />
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>
                  <div class="col-12 my-4">
                    <h5 class="fs-5 fw-bold mb-0">Upload image icon </h5>
                    <hr />
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-4">
                      <span>{$imagePreview}</span>
                      <div class="col-md-12 mb-4">
                        <label for="">
                          Upload profile picture
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          type="file"
                          className="form-control w-100"
                          onChange={handleImageChange}
                          defaultValue={Logo.image}
                          accept="image/*"
                        />

                        <div class="invalid-feedback">Please fill out this field.</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-4">
                      <label className="mb-2">
                        PermaLink<span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        id="LogoTitleText"
                        defaultValue={Logo.PermaLink}
                        ref={PermaLinkLogoBox}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-12  col-md-12">
                    <div className="row">
                      <div className="col-lg-6">
                        <GoBack value="footer-logo" />
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

export default FooterLogoUpdate;
