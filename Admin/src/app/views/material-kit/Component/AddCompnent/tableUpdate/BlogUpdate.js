import { useState } from "react";
import { Container } from "@mui/material";

import { useEffect } from "react";
import Api from "Service/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

import { Stack } from "@mui/material";

import $ from "jquery";

import { useRef } from "react";

import React from "react";
import { SimpleCard } from "app/components";

import { useAuthContext } from "Context/AuthContext";
import Get from "../../Function/Get";
import UserDetail from "../../UserLogin/UserDetail";

import Update from "../../Function/Update";
import GoBack from "../../Button/GoBack";
import EnquriySweetAlart from "../Dialog/EnquriySweetAlart";
import ImagePopup from "../Dialog/ImagePopup";

const BlogUpdate = () => {
  var { user } = useAuthContext();
  const editorRef = useRef(null);
  var navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  var BlogsAuthorBox = useRef();
  var BlogEditorBox = useRef();
  var BlogPermalinkBox = useRef();
  var BlogCategoryBox = useRef();
  var BlogDescriptionBox = useRef();
  var BlogTitleBox = useRef();

  const [value, setValue] = React.useState();

  const [resultLink, setResultLink] = useState("");
  const [Blog, setBlog] = useState([]);
  const [BlogAuthorData, setBlogAuthorData] = useState();

  const [AuthorSelect, setAuthorSelect] = useState([]);
  const [AuthorSelected, setAuthorSelected] = useState([]);
  const [BlogSelect, setBlogSelect] = useState([]);
  const [BlogTitle, setBlogTitle] = useState([]);
  const [BlogImage, setBlogImage] = useState();

  const [markdown, setMarkdown] = useState("");
  var location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  var BlogId = queryParams.get("blogId");

  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleImageChange = (e) => {
    e.preventDefault();

    if (!e.target.files || e.target.files.length === 0) {
      alert("No file selected. Please select an image file.");
      return;
    }

    let reader = new FileReader();
    var file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    reader.onloadend = () => {
      $("#imageBg").removeClass("demo124");
      setImagePreviewUrl(reader.result);
      setBlogImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  let $imagePreview = null;

  if (imagePreviewUrl) {
    $imagePreview = (
      <img class="w-100" id="imgprev_3_3" src={imagePreviewUrl} alt="Preview" />
    );
  } else {
    $imagePreview = (
      <div className="previewText">
        <img
          class="w-100"
          id="imgprev_3_3"
          src={
            Blog.BlogImage ? `${Api.BaseURL}/${Blog.BlogImage}` : "/demo.png"
          }
          alt="Preview"
        />
      </div>
    );
  }
  let $imagePreviews = null;
  var datanew = Blog.BlogImage;
  if (imagePreviewUrl) {
    $imagePreviews = <div className="previewText">{ImagePopup(datanew)}</div>;
  } else {
    $imagePreviews = <div className="previewText">{ImagePopup(datanew)}</div>;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    var UserDetail = user.user;
    var first = UserDetail ? UserDetail.first_name : "admin";

    var BlogsAuthors = BlogsAuthorBox.current.value;

    var BlogTitle = BlogTitleBox.current.value;
    var BlogDescription = BlogDescriptionBox.current.value;
    var BlogCategory = BlogCategoryBox.current.value;
    var BlogCategoryNew = JSON.parse(BlogCategory);
    var BlogPermalink = BlogPermalinkBox.current.value;

    var BlogPermalinkLink = BlogPermalink.replace(/\s/g, "-");

    var BlogEditor = markdown;

    var BlogImages = BlogImage;
    if (BlogEditor != "") {
      var obj = JSON.stringify({
        BlogTitle: BlogTitle,
        BlogContents: BlogEditor,
        BlogCategories: BlogCategoryNew,
        BlogAuthor: BlogsAuthors,
        BlogPermalink: BlogPermalinkLink,
        BlogDescription: BlogDescription,
        BlogImage: BlogImages,
        Author: first,
      });

      Update(`${Api.BlogsGetApi}?BlogId=${BlogId}`, obj)
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
      EnquriySweetAlart("Update").then(() => {
        navigate("/backend/blog");
      });

      setClicked(false);
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart("Fail-Update");
    }
  };

  const scrollToFirstUnansweredQuestion = () => {
    $("html, body").animate(
      {
        scrollTop: $(".isEmpty:first").offset().top - $(window).height() / 2,
      },
      300
    );
  };

  useEffect(() => {
    fetchBlogData();
    fetchBlogSelect();
    $("#editervalue").addClass("demo123");
  }, []);

  const fetchBlogData = async () => {
    Get(`${Api.BlogsGetApi}?BlogId=${BlogId}`)
      .then(handleResponse)
      .then(processGet)
      .catch(handleError);
  };
  const fetchCategoryGetApi = async (BlogCategories) => {
    Get(`${Api.BlogsCategoryGetApi}?BlogCateId=${BlogCategories}`)
      .then(handleResponse)
      .then(processGetCategoryGetApi)
      .catch(handleError);
  };
  const processGetCategoryGetApi = (result) => {
    if (result.Status) {
      setBlogTitle(result.result);
    } else {
      setBlogTitle(result.result);
    }
  };
  const processGet = (result) => {
    if (result.Status) {
      var BlogCategories = result.result[0].BlogCategories;

      setBlog(result.result[0]);

      var BlogAuthorNew = result.result[0].BlogAuthor;
      setBlogAuthorData(BlogAuthorNew);
      var LinksParmaLink = result.result[0].BlogPermalink;
      var LInks = LinksParmaLink.replaceAll("-", " ");
      setResultLink(LInks);
      var tenyMca = result.result[0].BlogContents;

      setMarkdown(tenyMca);
      fetchCategoryGetApi(BlogCategories);
    } else {
      console.log(result);
    }
  };

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log("Error fetching user role:", error);
  };

  const fetchBlogSelect = async () => {
    Get(Api.BlogsCategoryGetApi)
      .then(handleResponse)
      .then(processGetBlogSelect)
      .catch(handleError);
  };
  const processGetBlogSelect = (result) => {
    if (result.Status) {
      setBlogSelect(result.result);
    } else {
      setBlogSelect(result.result);
    }
  };

  var handleMarkdownChange = (newValue) => {
    setOpen(false);
    $("#editervalue").addClass("demo123");
    $("#editervalue").removeClass("isEmpty");
    if (newValue === "") {
      $("#editervalue").removeClass("demo123");
      $("#editervalue").addClass("isEmpty");
    } else {
      setOpen(false);
    }
    setMarkdown(newValue);
  };
  var handleDescriptionChange = (e) => {
    setOpen(false);
  };

  useEffect(() => {
    setMarkdown(value);
    LayouttapBar();
    LayouttapBarID();
    document
      .querySelector("#BlogTitleText")
      .addEventListener("keydown", function (e) {
        if (String.fromCharCode(e.which).match(/\d/)) {
          e.preventDefault();
        }
      });
    document
      .querySelector("#BlogPermalink")
      .addEventListener("keydown", function (e) {
        if (String.fromCharCode(e.which).match(/\d/)) {
          e.preventDefault();
        }
      });
  }, [user]);

  var LayouttapBarID = () => {
    var UserDetails = user.user;
    var first = UserDetails.Id;
    UserDetail(first)
      .then(handleResponse)
      .then(processRegisterId)
      .catch(handleError);
  };

  const processRegisterId = (result) => {
    if (result.Status) {
      setAuthorSelected(result.result);
    } else {
      alert("user Not Found");
    }
  };

  var LayouttapBar = () => {
    Get(Api.RegisterAPiGet)
      .then(handleResponse)
      .then(processRegister)
      .catch(handleError);
  };
  const processRegister = (result) => {
    if (result.Status) {
      setAuthorSelect(result.result);
    } else {
      alert("user Not Found");
    }
  };

  const handleImageUpload = (blobInfo, progress, failure) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:8000/Status/Digi2l/single", true);

      const formData = new FormData();
      formData.append("image", blobInfo.blob(), blobInfo.filename());

      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
        if (progress && typeof progress === "function") {
          const percent = 0;
          progress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({ message: "HTTP Error: " + xhr.status, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject("HTTP Error: " + xhr.status);
          return;
        }

        const json = JSON.parse(xhr.responseText);
        console.log("json", json);
        const imagePath = `${Api.BaseURL}/${json.file}`;
        const htmlString = `<img width="200" src='${imagePath}' />`;
        setValue(editorRef.current.insertContent(htmlString));
        if (!json || typeof json.location != "string") {
          reject("Invalid JSON: " + xhr.responseText);

          return;
        }

        resolve(json.location);
        console.log("json", json.location);
      };

      xhr.onerror = () => {
        reject({ message: "Image upload failed", remove: true });
        if (failure && typeof failure === "function") {
          failure("Image upload failed");
        }
      };

      xhr.send(formData);
    });
  };

  return (
    <Container className="mt-3">
      <Stack spacing={3}>
        <title>Admin - Update article blog </title>
        <div class="card-headers ">
          <div class="row align-items-center">
            <div class="col">
              <h2 class="fs-5 mb-0 card-title">Update article blog </h2>
            </div>
          </div>
        </div>
        <SimpleCard>
          <div className="mt-3">
            <form
              onSubmit={handleSubmit}
              className={clicked ? "was-validated" : ""}
            >
              <div className="row">
                <div className="col-lg-12">
                  {" "}
                  <div className="mb-4">
                    <label className="mb-2">
                      {" "}
                      Title
                      <span style={{ color: "red" }}>*</span>
                    </label>

                    <input
                      id="BlogTitleText"
                      size="40"
                      defaultValue={Blog.BlogTitle}
                      className="form-control mb-2 p-2 w-100"
                      required
                      ref={BlogTitleBox}
                      placeholder="Enter title"
                      autoComplete="off"
                    />
                    <div class="invalid-feedback">
                      Please fill out this field.
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  {" "}
                  <div className="mb-4">
                    <label className="mb-2">
                      Permalink
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className="form-control mb-2 p-2 w-100"
                      type="text"
                      id="BlogPermalink"
                      defaultValue={resultLink}
                      ref={BlogPermalinkBox}
                      required
                      placeholder="Enter permalink"
                      autoComplete="off"
                    />
                    <div className="bg-opacity-50 font-small mt-2 p-2 text-bg-light text-sm-start">
                      Permalink example -- the rise of refurbished appliances
                    </div>
                    <div class="invalid-feedback">
                      Please fill out this field.
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  {" "}
                  <div className="mb-4">
                    <label className="mb-2"> Author</label>

                    <select
                      id="validationCustom05"
                      required
                      ref={BlogsAuthorBox}
                      className="form-select p-2"
                      autoComplete="off"
                    >
                      <option
                        className="p-2"
                        selected
                        hidden
                        value={BlogAuthorData}
                      >
                        {BlogAuthorData}
                      </option>

                      {AuthorSelect.map((obj) => {
                        if (obj.first_name != null && obj.user_status == true) {
                          return (
                            <>
                              <option
                                key={obj.Id}
                                className="p-2"
                                value={obj.first_name}
                              >
                                {obj.first_name}
                              </option>
                            </>
                          );
                        }
                      })}
                    </select>

                    <div className="bg-opacity-50 font-small mt-2 p-2 text-bg-light text-sm-start">
                      With this modification, if a Author is already selected ,
                      the form will submit without checking for the Author's
                      presence. Otherwise, it will perform the usual validation.
                    </div>

                    <div class="invalid-feedback">
                      Please fill out this field.
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 mb-4 col-md-12">
                      <label className="mb-2">Categories</label>

                      <select
                        id="validationCustom05"
                        required
                        ref={BlogCategoryBox}
                        className="form-select p-2"
                        autoComplete="off"
                      >
                        {BlogTitle.map((obj1) => (

                          <option
                            key={obj1.BlogCateId}
                            selected
                            hidden
                            value={obj1.BlogCateId}
                          >
                            {obj1.BlogCategories}
                          </option>
                        ))}

                        {BlogSelect.map((obj) => {
                          if (obj.BlogISActive == true)
                            return (
                              <option className="p-2" value={obj.BlogCateId}>
                                {obj.BlogCategories}
                              </option>
                            );
                        })}
                      </select>

                      <div className="bg-opacity-50 font-small mt-2 p-2 text-bg-light text-sm-start">
                        With this modification, if a category is already
                        selected , the form will submit without checking for the
                        category's presence. Otherwise, it will perform the
                        usual validation.
                      </div>
                      <div class="invalid-feedback">
                        Please fill out this field.
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 my-4">
                  <h5 class="fs-5 fw-bold mb-0">Additional details </h5>
                  <hr />
                </div>
                <div className="col-lg-12">
                  <div className="mb-4">
                    <label className="mb-2">
                      {" "}
                      Description
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      className="form-control mb-2 p-2 w-100"
                      type="text"
                      id="BlogTitleDescription"
                      defaultValue={Blog.BlogDescription}
                      onInput={handleDescriptionChange}
                      ref={BlogDescriptionBox}
                      required
                      placeholder="Enter Description"
                      autoComplete="off"
                    />
                    <div class="invalid-feedback">
                      Please fill out this field.
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div id="editervalue" className="mb-3 isEmpty">
                    <label className="mb-2">
                      {" "}
                      Contents
                      <span style={{ color: "red" }}>*</span>
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
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "emoji",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoji",
                        images_upload_url:
                          "http://localhost:8000/Status/Digi2l/single",
                        automatic_uploads: true,
                        images_reuse_filename: true,
                        images_upload_handler: handleImageUpload,
                      }}
                      id="EditTable"
                      onEditorChange={handleMarkdownChange}
                    />
                    <div class="valid-feedback">
                      Please fill out this field.
                    </div>
                  </div>
                </div>

                <div class="col-12 my-4">
                  <h5 class="fs-5 fw-bold mb-0">Upload image update</h5>
                  <hr />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-2"> Image</label>

                  <div class="col-md-12  ">
                    <div id="imageBg" class="">
                      <div class=" isActiveErrorColorBorder p-4  pb-5  ">
                        <label for="formFile" class="form-label">
                          Choose image upload
                        </label>
                        <div class="justify-content-center row">
                          <div className="col-lg-4">
                            <div
                              class="text-center"
                              style={{ height: "150px" }}
                            >
                              <div style={{ height: "150px" }}>
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
                        <div className="pb-0 ">{$imagePreviews}</div>
                      </div>

                      <div class="isActiveError">Please select a file.</div>
                    </div>
                    <div className="bg-opacity-50 font-small mt-2 p-2 text-bg-light text-sm-start">
                      With this modification, if a image is already used , the
                      form will submit without checking for the image presence.
                      Otherwise, it will perform the usual validation.
                    </div>
                  </div>
                </div>

                <div className="col-lg-12  col-md-12">
                  <div className="row ">
                    <div className="col-6">
                      <GoBack value="blog" />
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
    </Container>
  );
};

export default BlogUpdate;
