import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import $ from 'jquery';

import Api from 'Service/Api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';
import Get from '../../Function/Get';
import GoBack from '../../Button/GoBack';
import Updates from '../../Function/Update';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const CategoryUpdateBlogs = () => {
  var navigate = useNavigate();
  const [Blog, setBlog] = useState([]);

  const [BlogTitle, setBlogTitle] = useState([]);
  const [open, setOpen] = useState(false);

  const [clicked, setClicked] = useState(false);
  var location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams.get('categoryId'));
  var CategoryId = queryParams.get('categoryId');

  var BlogTitleBox = useRef();

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    var BlogTitles = BlogTitleBox.current.value;

    var raw = JSON.stringify({
      BlogCategories: BlogTitles
    });
    Updates(`${Api.BlogsCategoryGetApi}?BlogCateId=${CategoryId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };
  const processUpdate = (result) => {
    if (result.Status) {
      setOpen(true);
      EnquriySweetAlart('Update').then(() => {
        navigate('/backend/category-blog');
      });

      setClicked(false);
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Update');
    }
  };

  useEffect(() => {
    fetchBlogData();
    $('#BlogTitleText').keydown((e) => !String.fromCharCode(e.which).match(/\d/g));
  }, []);

  const processGet = (result) => {
    if (result.Status) {
      var ParentId = result.result[0].ParentId;
      fetchCategoryGetApi(ParentId);
      setBlog(result.result[0]);
    } else {
      console.log(result);
    }
  };
  const fetchCategoryGetApi = async (ParentId) => {
    Get(`${Api.BlogsCategoryGetApi}?ParentId=${ParentId}`)
      .then(handleResponse)
      .then(processGetCategoryGetApi)
      .catch(handleError);
  };
  const processGetCategoryGetApi = (result) => {
    if (result.Status) {
      setBlogTitle(result.result);
    } else {
      console.log(result);
    }
  };

  const fetchBlogData = async () => {
    Get(`${Api.BlogsCategoryGetApi}?BlogCateId=${CategoryId}`)
      .then(handleResponse)
      .then(processGet)
      .catch(handleError);
  };

  function nameHandler(e) {
    setOpen(false);
  }

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Blog categories</title>
        <div>
          <Stack spacing={3} className="m-3">
            <div class="card-headers  mt-2">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title"> Categories</h2>
                </div>
              </div>
            </div>
            <SimpleCard title="">
              <div className="mt-3">
                <form
                  onSubmit={handleSubmit}
                  className={clicked ? 'was-validated' : 'needs-validation'}
                >
                  <div className="row">
                    <div className="col-lg-12 mb-3">
                      <label className="mb-2"> Title</label>
                      <input
                        className=" form-control "
                        type="text"
                        id="BlogTitleText"
                        ref={BlogTitleBox}
                        defaultValue={Blog.BlogCategories}
                        onInput={nameHandler}
                        aria-required="true"
                        aria-invalid="false"
                        size="40"
                        placeholder="Enter Your Title"
                        required
                        autoComplete="one-time-code"
                      />
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div className="col-lg-12  col-md-12">
                      <div className="row">
                        <div className="col-lg-6">
                          <GoBack value="category-blog" />
                        </div>
                        <div className="col-lg-6 text-end">
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
        </div>
      </Stack>
    </Container>
  );
};

export default CategoryUpdateBlogs;
