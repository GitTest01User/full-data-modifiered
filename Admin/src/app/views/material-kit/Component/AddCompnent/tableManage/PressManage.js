import { useState } from 'react';
import { Container } from '@mui/material';

import { useEffect } from 'react';
import Api from 'Service/Api';

import { Stack } from '@mui/material';

import $ from 'jquery';

import { useRef } from 'react';

import React from 'react';
import { SimpleCard } from 'app/components';
import { Editor } from '@tinymce/tinymce-react';

import GoBack from '../../Button/GoBack';
import PostProcess from '../../Function/Post';
import { useAuthContext } from 'Context/AuthContext';
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';
import { useNavigate } from 'react-router-dom';

const PressManage = () => {
  var { user } = useAuthContext();
  var navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const editorRef = useRef(null);

  const [values, setValues] = React.useState();

  const [PressSelect, setPressSelect] = useState(undefined);

  const [markdown, setMarkdown] = useState('');

  var PressAuthorBox = useRef();
  var textTitleBox = useRef();
  var PressLinksBox = useRef();

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
      setPressSelect(reader.result);
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
  var imageEmpty = () => {
    $('#imageBg').addClass('demo124');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var UserDetail = user.user;
    var first = UserDetail ? UserDetail.first_name : 'admin';
    var pressLink = PressLinksBox.current.value;

    var PressAuthor = PressAuthorBox.current.value;
    var PressTitle = textTitleBox.current.value;
    var DescriptionTable = markdown;
    var Pressimage = PressSelect;

    if (DescriptionTable != '' && Pressimage != undefined) {
      var raw = JSON.stringify({
        PressTitle: PressTitle,
        PressAuthor: PressAuthor,
        Author: first,
        PressLink: pressLink,
        PressDescription: DescriptionTable,
        PressImage: Pressimage
      });
      PostProcess(Api.PressPostAPi, raw)
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
        navigate('/backend/press');
      });
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Create');
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

  function nameHandler(e) {
    setOpen(false);
  }
  function nameHandlerAuthor(e) {
    setOpen(false);
  }

  function nameHandlerAddress(e) {
    setOpen(false);
  }

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

  useEffect(() => {
    setMarkdown(values);
    document.querySelector('#PressTitleAuthor').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    document.querySelector('#PressTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    document.querySelector('#PressTitleLinks').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Create press release</title>

        <Stack className="mt-3" spacing={3}>
          <div class="card-headers ">
            <div class="row align-items-cEnter">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Create press release</h2>
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
                        Title <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        ref={textTitleBox}
                        id="PressTitleText"
                        placeholder="Enter title"
                        onChange={nameHandler}
                        required
                        autoComplete="off"
                      />
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    {' '}
                    <div className="mb-3">
                      <label className="mb-2">
                        {' '}
                        Author <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        ref={PressAuthorBox}
                        id="PressTitleAuthor"
                        placeholder="Enter author"
                        onChange={nameHandlerAuthor}
                        required
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    {' '}
                    <div className="mb-3">
                      <label className="mb-2">
                        {' '}
                        Link <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        ref={PressLinksBox}
                        placeholder="Enter link"
                        id="PressTitleLinks"
                        onChange={nameHandlerAddress}
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
                    <h5 class="fs-5 fw-bold mb-0">Additional details </h5>
                    <hr />
                  </div>
                  <div className="col-lg-12">
                    <div id="editervalue" className="mb-3 isEmpty">
                      <label className="mb-2">
                        {' '}
                        Description <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Editor
                        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
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
                            'undo redo | styles | bold italic underline strikethrough | alignleft aligncEnter alignright alignjustify | bullist numlist outdent indent | link image',
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
                  <div class="col-12 my-4">
                    <h5 class="fs-5 fw-bold mb-0">Upload image create</h5>
                    <hr />
                  </div>
                  <div className="col-lg-12  ">
                    <div className="">
                      <label className="mb-2">
                        {' '}
                        Image <span style={{ color: 'red' }}>*</span>
                      </label>
                      <div className="col-md-12 mb-3">
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
                </div>
                <div className="col-lg-12 ">
                  <div className="col-lg-12  col-md-12">
                    <div className="row">
                      <div className="col-lg-6">
                        {' '}
                        <GoBack value="press" />
                      </div>
                      <div className="col-lg-6 text-end">
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
            </div>
          </SimpleCard>
        </Stack>
      </Stack>
    </Container>
  );
};

export default PressManage;
