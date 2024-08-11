import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import $ from 'jquery';

import Api from 'Service/Api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import React from 'react';

import GoBack from '../../Button/GoBack';

import EnquriySweetAlart from '../Dialog/EnquriySweetAlart';
import Get from '../../Function/Get';
import Updates from '../../Function/Update';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const CategoryUpdate = () => {
  const [clicked, setClicked] = useState(false);
  var navigate = useNavigate();
  const [FAQ, setFAQ] = useState([]);
  const [open, setOpen] = useState(false);

  const [checked, setChecked] = React.useState();
  var location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams.get('headingId'));
  var HeadingId = queryParams.get('headingId');

  var FAQTitleBox = useRef();
  var CheckBoxFaq = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    var FAQTitles = FAQTitleBox.current.value;
    var ChackBox = CheckBoxFaq.current.value;
    if (ChackBox) {
      var ChackBoxNew = JSON.parse(ChackBox);
    }
    var raw = JSON.stringify({
      FAQTitle: FAQTitles,
      FaqFlag: ChackBoxNew
    });

    Updates(`${Api.FAQGetAPi}?FAQId=${HeadingId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };
  const processUpdate = (result) => {
    if (result.Status) {
      setOpen(true);
      EnquriySweetAlart('Update').then(() => {
        navigate('/backend/category-faq');
      });

      setClicked(false);
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Update');
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

  useEffect(() => {
    fetchFAQData();
  }, []);

  const fetchFAQData = async () => {
    Get(`${Api.FAQGetAPi}?FAQId=${HeadingId}`)
      .then(handleResponse)
      .then(processGet)
      .catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      var ParentId = result.result[0].ParentId;
      fetchCategoryGetApi(ParentId);
      setFAQ(result.result[0]);
      console.log(result.result[0], 'result');
      setChecked(result.result[0].FaqFlag);
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
      console.log(result);
    } else {
      console.log(result);
    }
  };

  function nameHandler(e) {
    setOpen(false);
    $('#FAQTitleText').keydown((e) => !String.fromCharCode(e.which).match(/\d/g));
  }

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Faq categories</title>
        <div>
          {' '}
          <Stack spacing={3} className="m-3">
            <div class="card-headers mt-3">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Update categories aas</h2>
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
                    <div className="col-lg-12 ">
                      <label className="mb-2"> Title</label>
                      <input
                        className="form-control "
                        type="text"
                        id="FAQTitleText"
                        ref={FAQTitleBox}
                        defaultValue={FAQ.FAQTitle}
                        onInput={nameHandler}
                        required
                      />
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
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
            </SimpleCard>
          </Stack>
        </div>
      </Stack>
    </Container>
  );
};

export default CategoryUpdate;
