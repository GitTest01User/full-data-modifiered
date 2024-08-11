import { Container, Stack } from '@mui/material';

import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import $ from 'jquery';
import Api from 'Service/Api';

import { useRef } from 'react';

import { useAuthContext } from 'Context/AuthContext';

import GoBack from '../../Button/GoBack';
import { Editor } from '@tinymce/tinymce-react';
import React from 'react';
import PostProcess from '../../Function/Post';

import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';
import { useNavigate } from 'react-router-dom';

const StoriesManage = () => {
  var { user } = useAuthContext();
  var navigate = useNavigate();
  var StoriesTitleBox = useRef();
  var StoriesProgramBox = useRef();
  var StoriesPermalinkBox = useRef();
  var StoriesSponsorNameBox = useRef();
  var StoriesProgramNameBox = useRef();
  var StoriesPinCodesBox = useRef();

  var StoriesCityCoverageBox = useRef();
  const [values, setValues] = React.useState();
  const [open, setOpen] = useState(false);

  const editorRef = useRef(null);

  const [startDate, setStartDate] = useState(new Date());
  const [startDateAgreement, setStartDateAgreement] = useState(new Date());
  const [StoriesImage, setStoriesImage] = useState(undefined);

  const [clicked, setClicked] = useState(false);
  const [markdown, setMarkdown] = useState('');

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
      setStoriesImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = <img class="w-100" id="imgprev_3_3" src={imagePreviewUrl} alt="Preview" />;
  } else {
    $imagePreview = (
      <div className="previewText">
        <img class="w-100" id="imgprev_3_3" src="/demo.png" alt="Preview" />
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    var UserDetail = user.user;
    var first = UserDetail ? UserDetail.first_name : 'admin';
    const StoriesTitle = StoriesTitleBox.current.value;
    const StoriesProgram = StoriesProgramBox.current.value;
    const StoriesPermalink = StoriesPermalinkBox.current.value;
    const StoriesSponsorName = StoriesSponsorNameBox.current.value;
    const StoriesProgramName = StoriesProgramNameBox.current.value;

    const StoriesImageFile = StoriesImage;
    const StoriesSuccessFile = 'Success.png';
    const EditTable = markdown;

    const StoriesPinCodes = StoriesPinCodesBox.current.value;
    const StoriesCityCoverage = StoriesCityCoverageBox.current.value;
    const PinCodes = JSON.parse(StoriesPinCodes ? StoriesPinCodes : null);
    const CityCoverage = JSON.parse(StoriesCityCoverage ? StoriesCityCoverage : null);

    const TitleProgramAgreement = $('#StoriesTitleProgramAgreement').val();
    const TitleProgramLaunch = $('#StoriesTitleProgramLaunch').val();
    var date1 = new Date(TitleProgramAgreement);
    var date2 = new Date(TitleProgramLaunch);

    date1.setTime(date1.getTime() + 330 * 60 * 1000);
    var NewDateAgreement = date1.toISOString();
    date2.setTime(date2.getTime() + 330 * 60 * 1000);
    var NewDateLaunch = date2.toISOString();


    if (EditTable != '' && StoriesImageFile != undefined) {
      var raw = JSON.stringify({
        StoriesTitle: StoriesTitle,
        StoriesImage: StoriesImageFile,
        StoriesFeaturedImageAlt: 'Digi2l-Alt',
        StoriesLogo: StoriesImageFile,
        StoriesProgram: StoriesProgram,
        // StoriesSuccessImage: StoriesSuccessFile,
        StoriesContent: EditTable,
        StoriesSponsorName: StoriesSponsorName,
        StoriesProgramName: StoriesProgramName,
        StoriesAgreementDate: NewDateAgreement,
        StoriesLaunchDate: NewDateLaunch,
        StoriesPinCodes: PinCodes,
        StoriesCityCoverage: CityCoverage,
        StoriesPermalink: StoriesPermalink,
        StoriesisActive: true,
        Author: first,
        BrowserRoutersId:23
      });
      PostProcess(Api.StoriesPostApi, raw)
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
      event.target.reset();
      imageEmpty();
      setOpen(true);
      setClicked(false);

      EnquriySweetAlart('Create').then(() => {
        navigate('/backend/stories');
      });
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Create');
    }
  };

  var imageEmpty = () => {
    $('.preview-zone .box-body').html(`<img class="ct-square" id="imgprev_3_3" src="/demo.png" />`);

    $('#imageBg').addClass('demo124');
  };
  const scrollToFirstUnansweredQuestion = () => {
    $('html, body').animate(
      {
        scrollTop: $('.isEmpty:first').offset().top - $(window).height() / 2
      },
      300
    );
  };

  const handleMarkdownChange = (newValue) => {
    setOpen(false);
    $('#editervalue').addClass('demo123');
    $('#editervalue').removeClass('isEmpty');
    if (newValue === '') {
      $('#editervalue').removeClass('demo123');
      $('#editervalue').addClass('isEmpty');
    } else {
      setOpen(false);
    }
    setMarkdown(newValue);
  };

  const handleImageUpload = (blobInfo, progress, failure) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:8000/Status/Digi2l/single', true);

      const formData = new FormData();
      formData.append('image', blobInfo.blob(), blobInfo.filename());

      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
        if (progress && typeof progress === 'function') {
          const percent = 0;
          progress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject('HTTP Error: ' + xhr.status);
          return;
        }

        const json = JSON.parse(xhr.responseText);
        console.log('json', json);
        const imagePath = `${Api.BaseURL}/${json.file}`;
        const htmlString = `<img width="200" src='${imagePath}' />`;
        setValues(editorRef.current.insertContent(htmlString));
        if (!json || typeof json.location != 'string') {
          reject('Invalid JSON: ' + xhr.responseText);

          return;
        }

        resolve(json.location);
        console.log('json', json.location);
      };

      xhr.onerror = () => {
        reject({ message: 'Image upload failed', remove: true });
        if (failure && typeof failure === 'function') {
          failure('Image upload failed');
        }
      };

      xhr.send(formData);
    });
  };

  function TitleHandler(e) {
    setOpen(false);
  }

  function ProgramHandler(e) {
    setOpen(false);
  }

  function PermalinkHandler(e) {
    setOpen(false);
  }

  function SponsorHandler(e) {
    setOpen(false);
  }

  function ProgramNameHandler(e) {
    setOpen(false);
  }

  function PinCodesHandler(e) {
    setOpen(false);
  }

  function CityCoverageHandler(e) {
    setOpen(false);
  }
  useEffect(() => {
    setMarkdown(values);

    $('#StoriesPinCodes').keydown((e) => {
      if (e.which === 8) {
        return true;
      }
      return !String.fromCharCode(e.which).match(/[^0-9 \-]/);
    });
    $('#StoriesCityCoverage').keydown((e) => {
      if (e.which === 8) {
        return true;
      }
      return !String.fromCharCode(e.which).match(/[^0-9 \-]/);
    });
    document.querySelector('#StoriesTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    document.querySelector('#StoriesProgramText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    document.querySelector('#StoriesStoriesPermalink').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    document.querySelector('#StoriesSponsor').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    document.querySelector('#StoriesTitleProgramName').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

  function DateAgreements(date) {
    setOpen(false);
    setStartDateAgreement(date);
  }

  function setStartDates(date) {
    setOpen(false);
    setStartDate(date);
  }
  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Success Stories </title>

        <Stack spacing={3} className="mt-3 mb-3">
          <div class="card-headers ">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Create success stories </h2>
              </div>
            </div>
          </div>
          <SimpleCard>
            <div className="">
              <form
                onSubmit={handleSubmit}
                className={clicked ? 'was-validated' : 'needs-validation'}
              >
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="mb-2">
                        {' '}
                        Title <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control mb-2 p-2 w-100"
                        type="text"
                        id="StoriesTitleText"
                        ref={StoriesTitleBox}
                        placeholder="Enter title"
                        onInput={TitleHandler}
                        required
                        maxLength={20}
                        autoComplete="off"
                      />
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    {' '}
                    <div className="mb-3">
                      <label className="mb-2">
                        {' '}
                        Program <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control mb-2 p-2 w-100"
                        type="text"
                        id="StoriesProgramText"
                        ref={StoriesProgramBox}
                        placeholder="Enter program"
                        onInput={ProgramHandler}
                        required
                        maxLength={50}
                        autoComplete="off"
                      />
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>
                  <div className="col-lg-6  col-md-12">
                    <div class="form-group">
                      <label className="mb-2">
                        Agreement Date<sup class="text-danger">*</sup>
                      </label>

                      <input
                        type="date"
                        className="form-control mb-2 p-2 w-100"
                        defaultValue={startDateAgreement}
                        onChange={(date) => DateAgreements(date)}
                        id="StoriesTitleProgramAgreement"
                        required
                      />

                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>
                  <div className="col-lg-6  col-md-12">
                    <div class="form-group">
                      <label className="mb-2">
                        Launch Date<sup class="text-danger">*</sup>
                      </label>

                      <input
                        type="date"
                        className="form-control mb-2 p-2 w-100"
                        defaultValue={startDate}
                        onChange={(date) => setStartDates(date)}
                        id="StoriesTitleProgramLaunch"
                        required
                      />

                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>
                  <div class="col-12 my-4">
                    <h5 class="fs-5 fw-bold mb-0">Additional details </h5>
                    <hr />
                  </div>

                  <div className="col-lg-12">
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-lg-3  col-md-12">
                          <div class="form-group">
                            <label className="mb-2">
                              {' '}
                              Sponsor Name <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                              className="form-control mb-2 p-2 w-100"
                              type="text"
                              id="StoriesSponsor"
                              ref={StoriesSponsorNameBox}
                              placeholder="Enter sponsor name"
                              onInput={SponsorHandler}
                              required
                              maxLength={20}
                              autoComplete="off"
                            />
                            <div class="invalid-feedback">Please fill out this field.</div>
                          </div>
                        </div>
                        <div className="col-lg-3  col-md-12">
                          <div class="form-group">
                            <label className="mb-2">
                              {' '}
                              Program Name <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                              className="form-control mb-2 p-2 w-100"
                              type="text"
                              id="StoriesTitleProgramName"
                              ref={StoriesProgramNameBox}
                              placeholder="Enter program name"
                              onInput={ProgramNameHandler}
                              required
                              maxLength={20}
                              autoComplete="off"
                            />
                            <div class="invalid-feedback">Please fill out this field.</div>
                          </div>
                        </div>

                        <div className="col-lg-3  col-md-12">
                          <div class="form-group">
                            <label className="mb-2">
                              {' '}
                              Pin Codes <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                              className="form-control mb-2 p-2 w-100"
                              type="text"
                              id="StoriesPinCodes"
                              ref={StoriesPinCodesBox}
                              placeholder="Enter pin codes"
                              onInput={PinCodesHandler}
                              required
                              maxLength={7}
                              autoComplete="off"
                            />
                            <div class="invalid-feedback">Please fill out this field.</div>
                          </div>
                        </div>
                        <div className="col-lg-3  col-md-12">
                          <div class="form-group">
                            <label className="mb-2">
                              {' '}
                              City Coverage <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                              className="form-control mb-2 p-2 w-100"
                              type="text"
                              id="StoriesCityCoverage"
                              ref={StoriesCityCoverageBox}
                              placeholder="Enter city coverage"
                              onInput={CityCoverageHandler}
                              required
                              maxLength={7}
                              autoComplete="off"
                            />
                            <div class="invalid-feedback">Please fill out this field.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3 ">
                      <label className="mb-2">
                        {' '}
                        Permalink <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        style={{ borderStyle: 'dotted' }}
                        className="form-control mb-2 p-2 w-100"
                        type="text"
                        id="StoriesStoriesPermalink"
                        ref={StoriesPermalinkBox}
                        placeholder="Enter permalink"
                        onInput={PermalinkHandler}
                        required
                        autoComplete="off"
                      />
                      <div className="bg-opacity-50 font-small mt-2 p-2 text-bg-light text-sm-start">
                        Permalink example -- /BrandName
                      </div>
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div id="editervalue" className="mb-3 isEmpty">
                      <label className="mb-2">
                        {' '}
                        Description <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Editor
                        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                        value={markdown}
                        className="form-control p-2"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        init={{
                          plugins: [
                            'advlist',
                            'autolink',
                            'lists',
                            'link',
                            'image',
                            'charmap',
                            'preview',
                            'anchor',
                            'searchreplace',
                            'visualblocks',
                            'code',
                            'fullscreen',
                            'insertdatetime',
                            'media',
                            'table',
                            'code',
                            'help',
                            'wordcount'
                          ],
                          toolbar:
                            'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                          images_upload_url: 'http://localhost:8000/Status/Digi2l/single',
                          automatic_uploads: true,
                          images_reuse_filename: true,
                          images_upload_handler: handleImageUpload
                        }}
                        id="EditTable"
                        onEditorChange={handleMarkdownChange}
                        required
                      />
                      <div class="valid-feedback">Please fill out this field.</div>
                    </div>
                  </div>
                  <div class="col-12 my-3">
                    <h5 class="fs-5 fw-bold mb-0">Upload image update</h5>
                    <hr />
                  </div>

                  <div className="col-md-12 mb-3">
                    <div className="col-md-12 mb-3">
                      <label className="mb-2">
                        {' '}
                        Image <span style={{ color: 'red' }}>*</span>
                      </label>

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
                        </div>
                        <div class="isActiveError">Please select a file.</div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12  col-md-12">
                  <div className="row">
                    <div className="col-6">
                      <GoBack value="stories" />
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
              </form>
            </div>
          </SimpleCard>
        </Stack>
      </Stack>
    </Container>
  );
};

export default StoriesManage;
