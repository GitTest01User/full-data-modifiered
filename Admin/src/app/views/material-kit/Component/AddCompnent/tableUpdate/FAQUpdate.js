import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Stack } from '@mui/material';
import { styled } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import { useRef } from 'react';
import Api from 'Service/Api';
import { useLocation, useNavigate } from 'react-router-dom';

import Error from '../Dialog/Error';
import { SimpleCard } from 'app/components';
import { useAuthContext } from 'Context/AuthContext';
import Update from '../../Function/Update';
import Get from '../../Function/Get';
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

const FAQUpdate = () => {
  var navigate = useNavigate();
  var location = useLocation();
  var { user } = useAuthContext();
  var FAQSelectBox = useRef();
  var FAQTitleBox = useRef();
  const editorRef = useRef(null);
  const queryParams = new URLSearchParams(location.search);

  var FaqId = queryParams.get('faqId');
  const [FAQ, setFAQ] = useState([]);

  const [value, setValue] = React.useState();
  const [FAQSelect, setFAQSelect] = useState([]);
  const [FAQTitle, setFAQTitle] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const [markdown, setMarkdown] = useState('');

  const processUpdate = (result) => {
    if (result.Status) {
      setOpen(true);
      EnquriySweetAlart('Update').then(() => {
        navigate('/backend/faq');
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
    setMarkdown(value);
    fetchFAQData();
    fetchFAQSelect();
    $('#editervalue').addClass('demo123');
  }, []);

  const fetchFAQData = async () => {
    Get(`${Api.FAQGetAPi}?FAQId=${FaqId}`).then(handleResponse).then(processGet).catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      var ParentId = result.result[0].ParentId;
      fetchCategoryGetApi(ParentId);
      setFAQ(result.result[0]);

      setMarkdown(result.result[0].FAQContents);
    } else {
      console.log(result);
    }
  };
  const fetchCategoryGetApi = async (ParentId) => {
    Get(`${Api.FAQGetAPi}?ParentId=${ParentId}`)
      .then(handleResponse)
      .then(processGetCategoryGetApi)
      .catch(handleError);
  };
  const processGetCategoryGetApi = (result) => {
    if (result.Status) {
      setFAQTitle(result.result);
    } else {
      setFAQTitle(result.result);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var UserDetail = user.user;
    var first = UserDetail ? UserDetail.first_name : 'admin';

    var FAQTitle = FAQTitleBox.current.value;
    var EditTable = markdown;
    var FAQSelect = FAQSelectBox.current.value;
    var FAQSelectParentId = JSON.parse(FAQSelect);

    if (EditTable != '') {
      var raw = JSON.stringify({
        FAQTitle: FAQTitle,
        FAQContents: EditTable,
        ParentId: FAQSelectParentId,
        Author: first
      });

      Update(`${Api.FAQGetAPi}?FAQId=${FaqId}`, raw)
        .then(handleResponse)
        .then(processUpdate)
        .catch(handleError);
    } else {
      scrollToFirstUnansweredQuestion();
      $('#editervalue').removeClass('demo123');
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

  const fetchFAQSelect = async () => {
    Get(Api.FAQGetAPi).then(handleResponse).then(processGetBlogSelect).catch(handleError);
  };
  const processGetBlogSelect = (result) => {
    if (result.Status) {
      setFAQSelect(result.result);
    } else {
      setFAQSelect(result.result);
    }
  };

  useEffect(() => {
    document.querySelector('#FAQTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);

  function nameHandler(e) {
    setOpen(false);
  }

  function SelectionBox() {
    setOpen(false);
  }

  const handleMarkdownChange = (newValue) => {
    setOpen(false);
    $('#editervalue').addClass('demo123');
    if (newValue === '' && newValue.length < 10) {
      $('#editervalue').removeClass('demo123');
    } else {
    }
    setMarkdown(newValue);
  };

  const handleImageUpload = (blobInfo, progress, failure) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:8000/Status/Digi2l/single', true);

      const formData = new FormData();
      formData.append('image', blobInfo.blob(), blobInfo.filename());
      console.log();

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
      <Stack spacing={3} className="container mt-0">
        <title>Admin - Faq update</title>
        <div className="mt-3">
          <Stack spacing={3}>
            <div class="card-headers ">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Faq update</h2>
                </div>
              </div>
            </div>
            <SimpleCard>
              <div className="mt-2">
                <div className="row">
                  <form
                    onSubmit={handleSubmit}
                    className={clicked ? 'was-validated' : 'needs-validation'}
                  >
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className=" mb-3">
                            <label className="mb-2">
                              Title <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                              id="FAQTitleText"
                              size="40"
                              defaultValue={FAQ.FAQTitle}
                              onInput={nameHandler}
                              className="form-control p-2 "
                              placeholder="Enter title"
                              ref={FAQTitleBox}
                              required
                            />
                            <div class="invalid-feedback">Please fill out this field.</div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className=" ">
                            <div className="row">
                              <div className="col-lg-12 mb-3 col-md-12">
                                <label className="mb-2">
                                  Categories <span style={{ color: 'red' }}>*</span>
                                </label>
                                <select
                                  id="validationCustom05"
                                  ref={FAQSelectBox}
                                  className="form-select p-2"
                                  required
                                  onChange={SelectionBox}
                                >
                                  {FAQTitle.map((obj1) => {
                                    if (
                                      obj1.FAQId == obj1.ParentId &&
                                      obj1.FAQISActive == true &&
                                      obj1.IsHeading != null
                                    ) {
                                      return (
                                        <option selected hidden value={obj1.ParentId}>
                                          {obj1.FAQTitle}
                                        </option>
                                      );
                                    }
                                  })}

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
                        </div>
                      </div>
                    </div>

                    <div class="col-12 my-4">
                      <h5 class="fs-5 fw-bold mb-2">Additional details </h5>
                      <hr />
                    </div>

                    <div className="col-lg-12">
                      <div id="editervalue" className="mb-3 isEmpty">
                        <label className="mb-2">
                          Description <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Editor
                          value={markdown}
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
                  </form>
                </div>
              </div>
            </SimpleCard>
          </Stack>
        </div>
      </Stack>
    </Container>
  );
};

export default FAQUpdate;
