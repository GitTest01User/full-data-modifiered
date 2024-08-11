import { Stack } from '@mui/material';

import { Box, styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import $ from 'jquery';

import Api from 'Service/Api';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useAuthContext } from 'Context/AuthContext';
import GoBack from '../../Button/GoBack';
import PostProcess from '../../Function/Post';
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AddBlogCategory = () => {
  var { user } = useAuthContext();
  const [open, setOpen] = useState(false);

  const [clicked, setClicked] = useState(false);
  var navigate = useNavigate();

  var BlogTitleBox = useRef();

  const handleSubmit = (event) => {
    var UserDetail = user.user;
    var first = UserDetail ? UserDetail.first_name : 'admin';
    event.preventDefault();
    var BlogTitles = BlogTitleBox.current.value;

    var raw = JSON.stringify({
      BlogCategories: BlogTitles,
      Author: first,
      CreatedDate: new Date()
    });

    PostProcess(Api.BlogsCategoryPostApi, raw)
      .then(handleResponse)
      .then((result) => processPost(result, event))
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
  const processPost = (result, event) => {
    if (result.Status) {
      setOpen(true);
      event.target.reset();
      EnquriySweetAlart('Create').then(() => {
        navigate('/backend/category-blog');
      });

      setClicked(false);
    } else {
      setOpen(true);
      EnquriySweetAlart('Fail-Create');
    }
  };
  function nameHandler(e) {
    setOpen(false);
  }

  useEffect(() => {
    $('#BlogTitleText').keydown((e) => !String.fromCharCode(e.which).match(/\d/g));
  }, []);
  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Blog categories </title>

        <Stack spacing={3} className="m-3">
          <div class="card-headers mt-2">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Create blog categories </h2>
              </div>
            </div>
          </div>
          <SimpleCard>
            <div className="mt-2">
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
                      onInput={nameHandler}
                      aria-required="true"
                      aria-invalid="false"
                      size="40"
                      placeholder="Enter title"
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
                          <>
                            {' '}
                            <input
                              type="submit"
                              onClick={() => setClicked(true)}
                              class="btn btn-gradient "
                              value="Published"
                            />
                          </>
                        ) : (
                          <>
                            {' '}
                            <input
                              type="submit"
                              onClick={() => setClicked(true)}
                              class="btn btn-gradient "
                              value="Publish"
                            />
                          </>
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

export default AddBlogCategory;
