import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';
import { useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import { useRef } from 'react';
import Api from 'Service/Api';

import { useAuthContext } from 'Context/AuthContext';
import GoBack from '../../Button/GoBack';
import PostProcess from '../../Function/Post';
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

const FollowManage = () => {
  var { user } = useAuthContext();
  var navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [clicked, setClicked] = useState(false);

  var titleFollowBox = useRef();

  const [FollowImage, setFollowImage] = useState('');

  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const handleImageChange = (e) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      alert('No file selected. Please select an image file.');
      return;
    }
    let reader = new FileReader();
    let file = e.target.files[0];

    // Check if the file type is an image
    if (!file.type.startsWith('image/')) {
      // Alert the user that only image files are allowed
      alert('Please select an image file.');
      return;
    }

    reader.onloadend = () => {
      $('#imageBg').removeClass('demo124');
      setImagePreviewUrl(reader.result);
      setFollowImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = (
      <img class="filter-bg w-100" id="imgprev_3_3" src={imagePreviewUrl} alt="Preview" />
    );
  } else {
    $imagePreview = (
      <div className="previewText">
        <img class=" w-100" id="imgprev_3_3" src="/demo.png" alt="Preview" />
      </div>
    );
  }
  var imageEmpty = () => {
    $('#imageBg').addClass('demo124');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var UserDetail = user.user;
    var first = UserDetail ? UserDetail.first_name : 'admin';
    var FollowTitles = titleFollowBox.current.value;
    var Follows = FollowImage;

    if (Follows != '') {
      var raw = JSON.stringify({
        Author: first,
        Image: Follows,
        Title: FollowTitles,
        FollowIsActive: true
      });
      PostProcess(Api.FollowPostIcon, raw)
        .then(handleResponse)
        .then((result) => processPost(result, event))
        .catch(handleError);
    } else {
      scrollToFirstUnansweredQuestion();
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

      setClicked(false);
      EnquriySweetAlart('Create').then(() => {
        navigate('/backend/follow');
      });
    } else {
      imageEmpty();
      EnquriySweetAlart('Fail-Create');
    }
  };
  let $imagePreviews = null;
  var datanew = FollowImage;
  if (imagePreviewUrl) {
    $imagePreviews = <div className="previewText">{ImagePopup(datanew)}</div>;
  } else {
    $imagePreviews = <div className="previewText">{ImagePopup(datanew)}</div>;
  }

  const scrollToFirstUnansweredQuestion = () => {
    $('html, body').animate(
      {
        scrollTop: $('.isEmpty:first').offset().top - $(window).height() / 2
      },
      300
    );
  };
  useEffect(() => {
    document.querySelector('#FollowTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

  function nameHandler(e) {
    setOpen(false);
  }

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Create Follow Icon</title>
        <div className="m-3">
          <Stack spacing={3}>
            <div class="card-headers ">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Create follow icon</h2>
                </div>
              </div>
            </div>
            <SimpleCard>
              <form onSubmit={handleSubmit} className={clicked ? 'was-validated' : ''}>
                <div className="row">
                  <div className="col-lg-12">
                    {' '}
                    <div className="mb-4">
                      <label className="mb-2">
                        Title <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        id="FollowTitleText"
                        placeholder="Enter title"
                        onChange={nameHandler}
                        ref={titleFollowBox}
                        required
                        autoComplete="off"
                      />
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>
                  <div class="col-12 my-3">
                    <h5 class="fs-5 fw-bold mb-0">Upload image create</h5>
                    <hr />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="mb-2"> Image</label>

                    <div class="col-md-12  ">
                      <div id="imageBg" class=" demo124 isEmpty">
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
                          {$imagePreviews}
                        </div>
                        <div class="isActiveError">Please select a file.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 col-md-12">
                  <div className="row">
                    <div className="col-6">
                      {' '}
                      <GoBack value="follow" />
                    </div>
                    <div className="col-6">
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
        </div>
      </Stack>
    </Container>
  );
};

export default FollowManage;
