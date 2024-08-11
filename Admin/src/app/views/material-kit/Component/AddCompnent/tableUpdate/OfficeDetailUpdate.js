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

import { useAuthContext } from 'Context/AuthContext';

import Error from '../Dialog/Error';
import Get from '../../Function/Get';
import Update from '../../Function/Update';
import GoBack from '../../Button/GoBack';
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';

const OfficeDetailUpdate = () => {
  var { user } = useAuthContext();
  var navigate = useNavigate();
  var IconDetailsBox = useRef();
  var UserDetail = user.user;

  const [open, setOpen] = useState(false);

  const [clicked, setClicked] = useState(false);

  var location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  var Id = queryParams.get('Id');
  const editorRef = useRef(null);

  const [values, setValues] = React.useState();

  const [Details, setDetails] = useState([]);

  const [markdown, setMarkdown] = useState();

  var textTitleBox = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    var first = UserDetail ? UserDetail.first_name : 'admin';

    var DetailsBox = IconDetailsBox.current.value;
    var DetailsTitle = textTitleBox.current.value;
    var DescriptionTable = markdown;

    if (
      DetailsTitle != '' &&
      DescriptionTable != '' &&
      DescriptionTable != null &&
      DetailsBox != ''
    ) {
      var raw = JSON.stringify({
        Title: DetailsTitle,
        Icon: DetailsBox,
        Description: DescriptionTable,
        DetailsISActive: true,
        Author: first
      });
      Update(`${Api.FooterDetailSite}?Id=${Id}`, raw)
        .then(handleResponse)
        .then(processUpdate)
        .catch(handleError);
    } else {
      scrollToFirstUnansweredQuestion();
      $('#editervalue').removeClass('demo123');
    }
  };

  const processUpdate = (result) => {
    if (result.Status) {
      setOpen(true);
      EnquriySweetAlart('Update').then(() => {
        navigate('/backend/footer-detail');
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
    fetchDetailsData();
    $('#editervalue').addClass('demo123');
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

  const fetchDetailsData = async () => {
    Get(`${Api.FooterDetailSite}?Id=${Id}`)
      .then(handleResponse)
      .then(processGet)
      .catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      setDetails(result.result[0]);

      setMarkdown(result.result[0].Description);
    } else {
      alert('user Not Found');
    }
  };

  useEffect(() => {
    document.querySelector('#DetailsTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

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
  }, []);

  return (
    <Container className="mt-4">
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - Update footer details </title>

        <Stack className="mt-3 mb-3" spacing={3}>
          <div class="card-headers ">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Update footer details</h2>
              </div>
            </div>
          </div>
          <SimpleCard title="">
            <div className="mt-2">
              <form onSubmit={handleSubmit} className={clicked ? 'was-validated' : ''}>
                <div className="row">
                  <div className="col-lg-12">
                    {' '}
                    <div className="mb-3">
                      <label className="mb-2">
                        {' '}
                        Title
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        ref={textTitleBox}
                        id="DetailsTitleText"
                        defaultValue={Details.Title}
                        required
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="mb-4">
                      <span>
                        <i className={Details.Icon}></i> {'  '}
                      </span>
                      <label className="mb-2">
                        Icon <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control p-2"
                        type="text"
                        id="DetailsTitleText"
                        defaultValue={Details.Icon}
                        ref={IconDetailsBox}
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div class="col-12 my-4">
                    <h5 class="fs-5 fw-bold mb-0">Additional details</h5>
                    <hr />
                  </div>

                  <div className="col-lg-12">
                    <div id="editervalue" className="mb-3 isEmpty">
                      <label className="mb-2">
                        Description <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Editor
                        className=" p-2"
                        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        id="FAQContentText"
                        value={markdown}
                        height={100}
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
                        onEditorChange={handleMarkdownChange}
                        required
                      />

                      <div class="valid-feedback">Please fill out this field.</div>
                    </div>
                  </div>

                  <div className="col-lg-12  col-md-12">
                    <div className="row">
                      <div className="col-6">
                        <GoBack value="footer-detail" />
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

export default OfficeDetailUpdate;
