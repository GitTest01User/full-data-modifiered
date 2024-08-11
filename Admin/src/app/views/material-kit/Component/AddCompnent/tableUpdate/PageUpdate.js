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
import { Editor } from '@tinymce/tinymce-react';

import Error from '../Dialog/Error';
import { useAuthContext } from 'Context/AuthContext';
import GoBack from '../../Button/GoBack';
import Get from '../../Function/Get';
import Update from '../../Function/Update';
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';

const PageUpdate = () => {
  var { user } = useAuthContext();
  var navigate = useNavigate();
  var UserDetail = user.user;

  const [open, setOpen] = useState(false);

  const [clicked, setClicked] = useState(false);

  const editorRef = useRef(null);

  const [resultLink, setResultLink] = useState('');
  const [values, setValues] = React.useState();

  const [Page, setPage] = useState('');

  const [markdown, setMarkdown] = useState(null);
  var location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  var RoutesId = queryParams.get('routesId');
  var Id = queryParams.get('Id');

  var textTitleBox = useRef();
  var PageLinksBox = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var first = UserDetail ? UserDetail.first_name : 'admin';

    var PageLink = PageLinksBox.current.value;
    var LInks = PageLink.replace(/\s/g, '-');
    var result;
    if (Page.Route != LInks) {
      result = '/pages' + LInks;
    } else {
      result = Page.Route;
    }

    var PageTitle = textTitleBox.current.value;
    var DescriptionTable = markdown;
    if (DescriptionTable != null) {
      const headerPayload = JSON.stringify({
        Title: PageTitle,
        Route: result,
        ContentData: DescriptionTable,

        PolicyConditionisActive: true,
        Author: first
      });
      Update(`${Api.PolicyDetailGetAPi}?Id=${Id}`, headerPayload)
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
        navigate('/backend/routes-page');
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

  const fetchPageData = async () => {
    Get(`${Api.PolicyDetailGetAPi}?Id=${Id}`)
      .then(handleResponse)
      .then(processGet)
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

  const processGet = (result) => {
    if (result.Status) {
      setPage(result.result[0]);

      var tenyMca = result.result[0].ContentData;

      setMarkdown(tenyMca);
    } else {
      alert('user Not Found');
    }
  };
  const fetchBrowserRoutersIdItems = async () => {
    Get(`${Api.BrowserRouteGetApi}?BrowserRoutersId=${RoutesId}`)
      .then(handleResponse)
      .then(processGetBrowserRouters)
      .catch(handleError);
  };

  const processGetBrowserRouters = (result) => {
    if (result.Status) {
      var PramalinksRoute = result.result[0].BrowserRouterPermaLink;

      var NewRoutes = PramalinksRoute.replace('/pages/', '/');
      setResultLink(NewRoutes);
    } else {
      alert('user Not Found');
    }
  };
  useEffect(() => {
    fetchPageData();
    fetchBrowserRoutersIdItems();
    $('#editervalue').addClass('demo123');
  }, []);
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
    document.querySelector('#PageTitleLinks').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    document.querySelector('#PageTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Update page </title>

        <Stack spacing={3}>
          <div class="card-headers mt-3">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Update page </h2>
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
                        defaultValue={Page.Title}
                        required
                        autoComplete="off"
                        maxLength={50}
                      />
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    {' '}
                    <div className="mb-3">
                      <label className="mb-2">
                        {' '}
                        Route <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        ref={PageLinksBox}
                        id="PageTitleLinks"
                        placeholder="Enter route"
                        onChange={nameHandlerAddress}
                        defaultValue={resultLink}
                        required
                        maxLength={100}
                        autoComplete="off"
                      />
                      <div className="bg-opacity-50 font-small mt-2 p-2 text-bg-light text-sm-start">
                        Route --/example
                      </div>
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>
                  <div class="col-12 my-4">
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
                          images_upload_url: `${Api.BaseURL}/Status/Digi2l/single`,
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

                  <div className="col-lg-12  col-md-12">
                    <div className="row">
                      <div className="col-6">
                        {' '}
                        <GoBack value="routes-page" />
                      </div>
                      <div className="col-6 text-end">
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
      </Stack>
    </Container>
  );
};

export default PageUpdate;
