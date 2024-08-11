import { Editor } from '@tinymce/tinymce-react';

import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import $ from 'jquery';

import { useRef } from 'react';

import Api from 'Service/Api';

import React from 'react';

import { useAuthContext } from 'Context/AuthContext';
import GoBack from '../../Button/GoBack';
import PostProcess from '../../Function/Post';
import Get from '../../Function/Get';
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';
import { useNavigate } from 'react-router-dom';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const FAQManage = () => {
  var FAQTitleBox = useRef();
  var HeadingsBox = useRef();
  const AboutUs = useRef();
  const editorRef = useRef();
  var { user } = useAuthContext();
  var navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const [open, setOpen] = useState(false);

  const [value, setValue] = React.useState();

  const [FAQSelect, setFAQSelect] = useState([]);

  const [markdown, setMarkdown] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    var UserDetail = user.user;
    var first = UserDetail ? UserDetail.first_name : 'admin';
    var FAQTitles = FAQTitleBox.current.value;
    var Headings = HeadingsBox.current.value;
    var Headingsnew = JSON.parse(Headings);
    var EditTable = markdown;

    if (EditTable != null) {
      var raw = JSON.stringify({
        FAQTitle: FAQTitles,
        FAQContents: EditTable,
        ParentId: Headingsnew,
        Author: first
      });

      PostProcess(Api.FAQPostAPi, raw)
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
        navigate('/backend/faq');
      });
    } else {
      setOpen(true);
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

  useEffect(() => {
    fetchFAQSelect();
    document.querySelector('#FAQTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

  const fetchFAQSelect = async () => {
    Get(Api.FAQGetAPi).then(handleResponse).then(processGetBlogSelect).catch(handleError);
  };

  const processGetBlogSelect = (result) => {
    if (result.Status) {
      setFAQSelect(result.result);
    } else {
      console.log(result);
    }
  };

  function nameHandler(e) {
    setOpen(false);
  }

  function SelectionBox() {
    setOpen(false);
  }
  const handleMarkdownChange = (newValue) => {
    $('#editervalue').addClass('demo123');
    if (newValue === '' && newValue.length < 10) {
      $('#editervalue').removeClass('demo123');
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
        setValue(editorRef.current.insertContent(htmlString));
        setMarkdown(value);
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

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2L - Create faq</title>
        <div className="m-3">
          <Stack spacing={3}>
            <div class="card-headers ">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Create faq </h2>
                </div>
              </div>
            </div>
            <SimpleCard title="">
              <div className="mt-2">
                <form
                  onSubmit={handleSubmit}
                  className={clicked ? 'was-validated' : 'needs-validation'}
                >
                  <div className="row">
                    <div className="col-lg-12">
                      {' '}
                      <div className="mb-3 ">
                        <label className="mb-2">
                          Title <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                          id="FAQTitleText"
                          size="40"
                          onInput={nameHandler}
                          className="form-control p-2"
                          placeholder="Enter title"
                          required
                          ref={FAQTitleBox}
                          autoComplete="off"
                        />

                        <div class="invalid-feedback">Please fill out this field.</div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      {' '}
                      <div className="row">
                        <div className="col-lg-12 mb-3 col-md-12">
                          <label className="mb-2">
                            Categories <span style={{ color: 'red' }}>*</span>
                          </label>
                          <select
                            ref={HeadingsBox}
                            id="validationCustom05"
                            required
                            className="form-select p-2"
                            onChange={SelectionBox}
                          >
                            <option selected hidden value="">
                              ---Select category---
                            </option>

                            {FAQSelect.map((obj) => {
                              if (
                                obj.FAQId == obj.ParentId &&
                                obj.FAQISActive == true &&
                                obj.IsHeading != null
                              ) {
                                return (
                                  <option className="p-2" value={obj.ParentId}>
                                    {obj.FAQTitle}
                                  </option>
                                );
                              }
                            })}
                          </select>

                          <div class="invalid-feedback">Please fill out this field.</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 my-4" ref={AboutUs}>
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
                  </div>
                  <div className="col-lg-12  col-md-12">
                    <div className="row">
                      <div className="col-6">
                        {' '}
                        <GoBack value="faq" />
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
        </div>
      </Stack>
    </Container>
  );
};

export default FAQManage;
