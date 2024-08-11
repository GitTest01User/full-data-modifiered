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

import { useAuthContext } from 'Context/AuthContext';
import PostProcess from '../../Function/Post';
import GoBack from '../../Button/GoBack';
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';
import { useNavigate } from 'react-router-dom';

const PageManage = () => {
  var { user } = useAuthContext();

  var UserDetail = user.user;
  var navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [clicked, setClicked] = useState(false);

  const editorRef = useRef(null);

  const [values, setValues] = React.useState();
  const [markdown, setMarkdown] = useState(null);

  var textTitleBox = useRef();
  var PageLinksBox = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    var first = UserDetail ? UserDetail.first_name : 'admin';
    var PageLink = PageLinksBox.current.value;
    var LInks = PageLink.replace(/\s/g, '-');
    let result = '/pages/' + LInks;

    var PageTitle = textTitleBox.current.value;
    var DescriptionTable = markdown;

    if (DescriptionTable != null) {
      var raw = JSON.stringify({
        Title: PageTitle,
        Author: first,
        Route: result,
        ContentData: DescriptionTable,

        PolicyConditionisActive: true
      });
      PostProcess(Api.PolicyDetailPostAPi, raw)
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

      setOpen(true);
      setClicked(false);

      EnquriySweetAlart('Create').then(() => {
        navigate('/backend/routes-page');
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
    document.querySelector('#PageTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    document.querySelector('#PageTitleLinks').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Create page</title>
        <Stack spacing={3}>
          <div class="card-headers mt-3">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Create page </h2>
              </div>
            </div>
          </div>
          <SimpleCard>
            <div className="mt-2">
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
                        id="PageTitleText"
                        onChange={nameHandler}
                        placeholder="Enter title"
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
                        Route<span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        ref={PageLinksBox}
                        id="PageTitleLinks"
                        onChange={nameHandlerAddress}
                        placeholder="Enter route"
                        required
                        autoComplete="off"
                      />
                      <div className="bg-opacity-50 font-small mt-2 p-2 text-bg-light text-sm-start">
                        Route -- /example
                      </div>
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>
                  <div class="col-12 my-3">
                    <h5 class="fs-5 fw-bold mb-0">Additional details</h5>
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
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-6">
                      <GoBack value="routes-page" />
                    </div>
                    <div className="col-6 text-end">
                      {open ? (
                        <input
                          type="submit"
                          onClick={() => setClicked(true)}
                          class="btn btn-gradient "
                          value="published"
                          disabled
                        />
                      ) : (
                        <input
                          type="submit"
                          onClick={() => setClicked(true)}
                          class="btn btn-gradient "
                          value="publish"
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

export default PageManage;
