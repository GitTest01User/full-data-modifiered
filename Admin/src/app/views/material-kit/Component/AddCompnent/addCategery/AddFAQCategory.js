import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';


import Api from 'Service/Api';
import {  useNavigate } from 'react-router-dom';
import { useRef } from 'react';

import React from 'react';

import { useAuthContext } from 'Context/AuthContext';
import GoBack from '../../Button/GoBack';
import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';
import PostProcess from '../../Function/Post';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AddFAQCategory = () => {
  var { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const [clicked, setClicked] = useState(false);
  var navigator = useNavigate();

  var FAQTitleBox = useRef();
  var CheckBoxFaq = useRef();

  const handleSubmit = (event) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var UserDetail = user.user;
    var first = UserDetail ? UserDetail.first_name : 'admin';

    event.preventDefault();
    var FAQTitles = FAQTitleBox.current.value;
    var ChackBox = CheckBoxFaq.current.value;
    if (ChackBox) {
      var ChackValue = JSON.parse(ChackBox);
    }

    var raw = JSON.stringify({
      FAQTitle: FAQTitles,
      IsHeading: true,
      CreatedDate: new Date(),
      Author: first,
      FaqFlag: ChackValue
    });

    PostProcess(Api.FAQPostAPi, raw)
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

      setClicked(false);
      EnquriySweetAlart('Create').then(() => {
        navigator('/backend/category-faq');
      });
    } else {
      setOpen(true);
      EnquriySweetAlart('Fail-Create');
    }
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Faq categories</title>

        <Stack spacing={3} className="m-3">
          <div class="card-headers mt-2">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Create categories</h2>
              </div>
            </div>
          </div>
          <SimpleCard>
            <div className="mt-3">
              <form
                onSubmit={handleSubmit}
                className={clicked ? 'was-validated' : 'needs-validation'}
              >
                <div className="row">
                  <div className="col-lg-12 ">
                    <label className="mb-2"> Title</label>
                    <input
                      className=" form-control "
                      type="text"
                      id="FAQTitleText"
                      ref={FAQTitleBox}
                      placeholder="Enter title"
                      required
                    />
                    <div class="invalid-feedback">Please fill out this field.</div>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      style={{ color: '#0d004c' }}
                      ref={CheckBoxFaq}
                      id="CheckBox"
                      checked={checked}
                      value={checked}
                      onChange={handleChange}
                    />
                    <label for="CheckBox" style={{ color: '#0d004c' }} className="p-2">
                      Show in faq page
                    </label>
                    <br />
                  </div>
                </div>

                <div className="col-lg-12  col-md-12">
                  <div className="row">
                    <div className="col-lg-6">
                      {' '}
                      <GoBack value="category-faq" />
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
              </form>
            </div>
          </SimpleCard>
        </Stack>
      </Stack>
    </Container>
  );
};

export default AddFAQCategory;
