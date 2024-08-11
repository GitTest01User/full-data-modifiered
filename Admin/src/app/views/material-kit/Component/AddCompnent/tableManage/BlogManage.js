import { useState } from 'react';
import { Container } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect } from 'react';
import Api from 'Service/Api';

import $ from 'jquery';

import { useRef } from 'react';

import React from 'react';
import { SimpleCard } from 'app/components';
import { Stack } from '@mui/material';

import { useAuthContext } from 'Context/AuthContext';
import GoBack from '../../Button/GoBack';
import Get from '../../Function/Get';
import PostProcess from '../../Function/Post';
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';
import { useNavigate } from 'react-router-dom';
import ImagePopup from '../Dialog/ImagePopup';

const BlogManage = () => {
  var { user } = useAuthContext();
  var navigate = useNavigate();
  const editorRef = useRef(null);

  var BlogEditorBox = useRef();
  var BlogPermalinkBox = useRef();
  var BlogCategoryBox = useRef();
  var BlogDescriptionBox = useRef();
  var BlogsAuthorBox = useRef();
  var BlogTitleBox = useRef();
  const [clicked, setClicked] = useState(false);

  const [values, setValues] = React.useState();

  const [BlogSelect, setBlogSelect] = useState([]);

  const [BlogImage, setBlogImage] = useState(undefined);
  const [AuthorSelect, setAuthorSelect] = useState([]);

  const [open, setOpen] = useState(false);

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
      setBlogImage(reader.result);
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

  let $imagePreviews = null;
  var datanew = BlogImage;
  if (imagePreviewUrl) {
    $imagePreviews = <div className="previewText">{ImagePopup(datanew)}</div>;
  } else {
    $imagePreviews = <div className="previewText">{ImagePopup(datanew)}</div>;
  }
  var imageEmpty = () => {
    $('#imageBg').addClass('demo124');
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    var UserDetail = user.user;
    var first = UserDetail ? UserDetail.first_name : 'admin';
    var BlogsAuthors = BlogsAuthorBox.current.value;
    var BlogTitle = BlogTitleBox.current.value;
    var BlogDescription = BlogDescriptionBox.current.value;
    var BlogCategory = BlogCategoryBox.current.value;
    var BlogCategoryNew = JSON.parse(BlogCategory);
    var BlogPermalink = BlogPermalinkBox.current.value;
    var BlogPermalinkLink = BlogPermalink.replace(/\s/g, '-');
    var BlogEditor = markdown;
    var BlogImages = BlogImage;

    if (BlogEditor !== '' && BlogImages !== undefined) {
      var obj = JSON.stringify({
        BlogTitle: BlogTitle,
        BlogContents: BlogEditor,
        BlogCategories: BlogCategoryNew,
        BlogAuthor: BlogsAuthors,
        BlogPermalink: BlogPermalinkLink,
        BlogDescription: BlogDescription,
        BlogImage: BlogImages,
        Author: first
      });

      PostProcess(Api.BlogsPostApi, obj)
        .then(handleResponse)
        .then((result) => processPost(result, event))
        .catch(handleError);
    } else {
      scrollToFirstUnansweredQuestion();
    }
  };
  const handleResponse = (response) => {
    if (!response.ok) {
      console.log('response', response)
      throw new Error('Network response was not ok'), EnquriySweetAlart('Fail-Create', 'Required Permalink information Record already exists!');;

    }
    return response.json();
  };
  const handleError = (error) => {

    console.log('Error fetching user role:', error);
  };
  const processPost = (result, event) => {
    console.log('result', result)
    if (result.Status) {
      setOpen(true);
      event.target.reset();
      EnquriySweetAlart('Create', 'You can display a blogs and message').then(() => {
        navigate('/backend/blog');
      });

      setClicked(false);
      imageEmpty();
    } else {
      setOpen(true);
      EnquriySweetAlart('Fail-Create', 'Required Blogs information is missing!');
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
    fetchBlogSelect();
  }, []);

  const fetchBlogSelect = async () => {
    Get(Api.BlogsCategoryGetApi).then(handleResponse).then(processGetBlogSelect).catch(handleError);
  };
  const processGetBlogSelect = (result) => {
    if (result.Status) {
      setBlogSelect(result.result);
    } else {
      setBlogSelect(result.result);
    }
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
    document.querySelector('#BlogTitleText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    document.querySelector('#BlogPermalink').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, []);
  function nameHandler(e) {
    setOpen(false);
  }
  var handleMarkdownChange = (newValue) => {
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
  function nameHandlerPermalink(e) {
    setOpen(false);
  }

  var handleDescriptionChange = (e) => {
    setOpen(false);
  };

  useEffect(() => {
    LayouttapBar();
  }, []);
  var LayouttapBar = () => {
    Get(Api.RegisterAPiGet).then(handleResponse).then(processRegister).catch(handleError);
  };
  const processRegister = (result) => {
    if (result.Status) {
      setAuthorSelect(result.result);
    } else {
      alert('user Not Found');
    }
  };

  return (
    <Container>
      <title>Digi2l - Create articles</title>
      <div className="mt-3">
        <Stack spacing={3}>
          <div class="card-headers ">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Create article blog</h2>
              </div>
            </div>
          </div>
          <SimpleCard>
            <div className="mt-3">
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
                        id="BlogTitleText"
                        size="40"
                        onInput={nameHandler}
                        className="form-control mb-2 p-2 w-100 "
                        placeholder=" Enter blog title"
                        required
                        ref={BlogTitleBox}
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out title field.</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-4">
                      <label className="mb-2">
                        {' '}
                        Permalink
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        className="form-control mb-2 p-2 w-100 "
                        type="text"
                        id="BlogPermalink"
                        ref={BlogPermalinkBox}
                        placeholder="Enter blog permalink"
                        onInput={nameHandlerPermalink}
                        required
                        autoComplete="off"
                      />
                      <div className="bg-opacity-50 font-small mt-2 p-2 text-bg-light text-sm-start">
                        Permalink-example:the-rise-of-refurbished-appliances
                      </div>
                      <div class="invalid-feedback">Please fill out link field.</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    {' '}
                    <div className="mb-3">
                      <label className="mb-2">
                        {' '}
                        Author
                        <span style={{ color: 'red' }}>*</span>
                      </label>

                      <select
                        id="BlogAuthorText"
                        placeholder=" Enter blog author"
                        required
                        ref={BlogsAuthorBox}
                        className="form-select p-2"
                      >
                        <option selected hidden value="">
                          ---Select author ---
                        </option>
                        {AuthorSelect.map((obj) => {
                          if (obj.first_name != null && obj.user_status==true) {
                            return (
                              <>
                                <option key={obj.Id} className="p-2" value={obj.first_name}>
                                  {obj.first_name}
                                </option>
                              </>
                            );
                          }
                        })}
                      </select>

                      <div class="invalid-feedback">Please fill out author field.</div>
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
                          id="validationCustom05"
                          ref={BlogCategoryBox}
                          className="form-select p-2 "
                          required
                        >
                          <option selected hidden value="">
                            ---Select category---
                          </option>

                          {BlogSelect.map((obj) => {
                            if (obj.BlogISActive == true)
                              return (
                                <option className="p-2" value={obj.BlogCateId}>
                                  {obj.BlogCategories}
                                </option>
                              );
                          })}
                        </select>

                        <div class="invalid-feedback">Please fill out category field.</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="mb-2">
                        {' '}
                        Description
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <textarea
                        className="form-control mb-2 p-2 w-100"
                        type="text"
                        id="BlogTitleDescription"
                        onChange={handleDescriptionChange}
                        ref={BlogDescriptionBox}
                        placeholder="Enter blog description"
                        required
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out description field.</div>
                    </div>
                  </div>
                  <div class="col-lg-12 my-4 ">
                    <h5 class="fs-5 fw-bold mb-0">Additional details </h5>
                    <hr />
                  </div>

                  <div className="col-lg-12">
                    <div id="editervalue" className="mb-3 isEmpty">
                      <label className="mb-2">
                        {' '}
                        Contents
                        <span style={{ color: 'red' }}>*</span>
                      </label>

                      <Editor
                        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                        value={markdown}
                        required
                        className="form-control "
                        ref={BlogEditorBox}
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        init={{
                          plugins: [
                            'advlist',
                            'autolink',
                            'lists',
                            'link',
                            'image',
                            'emoji',
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
                            'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoji',
                          images_upload_url: 'http://localhost:8000/Status/Digi2l/single',
                          automatic_uploads: true,
                          images_reuse_filename: true,
                          images_upload_handler: handleImageUpload
                        }}
                        id="EditTable"
                        onEditorChange={handleMarkdownChange}
                      />
                      <div class="valid-feedback">Please fill out content field.</div>
                    </div>
                  </div>
                  <div class="col-12 my-4">
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
                                    className="dropzone"
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
                        <div class="isActiveError">Please select image file.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 ">
                  <div class="row">
                    <div class="col-6">
                      <GoBack value="blog" />
                    </div>
                    <div class="col-6 text-end">
                      <div className=" w-100" style={{ textAlign: 'end' }}>
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
      </div>
    </Container>
  );
};

export default BlogManage;
