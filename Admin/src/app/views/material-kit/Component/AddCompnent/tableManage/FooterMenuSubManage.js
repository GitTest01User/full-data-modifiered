import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import { useRef } from 'react';

import Api from 'Service/Api';

import React from 'react';

import GoBack from '../../Button/GoBack';
import PostProcess from '../../Function/Post';
import Get from '../../Function/Get';
import { useAuthContext } from 'Context/AuthContext';
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

const FooterMenuSubManage = () => {
  var { user } = useAuthContext();
  var navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  var TitleBox = useRef(null);
  var PermaLinkBox = useRef(null);
  var selectHeaders = useRef(null);
  var serialBox = useRef();
  useEffect(() => {
    fetchMenuItems();
    document.querySelector('#footerNameText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
    document.querySelector('#footerLastText').addEventListener('keydown', function (e) {
      if (String.fromCharCode(e.which).match(/\d/)) {
        e.preventDefault();
      }
    });
  }, [user]);

  function nameHandler(e) {
    setOpen(false);
  }
  function nameLastHandler(e) {
    setOpen(false);
  }

  const UserCreateSubmit = async (event) => {
    event.preventDefault();
    const FirstAuthor = user.user.first_name;

    var TitleHeader = TitleBox.current.value;
    var Pramalinks = PermaLinkBox.current.value;
    var SubHeaders = selectHeaders.current.value;
    var SubPerantId = JSON.parse(SubHeaders);
    var PermalinkLink = Pramalinks.replace(/\s/g, '-');
    const serialNo = serialBox.current.value;
    const serialNumber = JSON.parse(serialNo);
    const raw = JSON.stringify({
      FooterPerantId: SubPerantId,
      FooterTitle: TitleHeader,
      FooterPermaLinks: PermalinkLink,
      isMenu: false,
      serialNo: serialNumber,
      Author: FirstAuthor
    });

    PostProcess(Api.FooterMenuPostApi, raw)
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
        navigate('/backend/footer');
      });
    } else {
      setOpen(false);
      setClicked(false);
      EnquriySweetAlart('Fail-Create');
    }
  };

  const fetchMenuItems = async () => {
    Get(Api.FooterMenuGetApi).then(handleResponse).then(processGet).catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      setCards(result.result.length + 1);
      setCard(result.result);
    } else {
      console.log('data.result', result.result);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Footer links </title>

        <Stack className="m-3">
          <div class="card-headers ">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title"> Footer links </h2>
              </div>
            </div>
          </div>
          <SimpleCard>
            <form onSubmit={UserCreateSubmit} className={clicked ? 'was-validated' : ''}>
              <div className="row mt-3 mb-3">
                <div className="col-lg-12">
                  <div className="row mb-2">
                    {' '}
                    <div class="col-md-12 mb-3">
                      <label>
                        Title <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        class="form-control"
                        type="text"
                        id="footerNameText"
                        ref={TitleBox}
                        onChange={nameHandler}
                        placeholder="Enter Title"
                        required
                        maxLength={20}
                        autoComplete="off"
                      />

                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="validationCustom04" class="form-label">
                        Headers <span style={{ color: 'red' }}>*</span>
                      </label>
                      <select
                        class="form-select"
                        ref={selectHeaders}
                        id="validationCustom04"
                        required
                      >
                        <option selected disabled hidden value="">
                          ---Select Headers---
                        </option>

                        {card.map((obj) => {
                          if (obj.FooterPermaLinks == null && obj.FooterisActive == true) {
                            return (
                              <>
                                <option value={obj.FooterId}>{obj.FooterTitle}</option>
                              </>
                            );
                          }
                        })}
                      </select>
                      <div class="invalid-feedback">Please select menu headers.</div>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label>
                        PermaLink <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input
                        id="footerLastText"
                        class="form-control"
                        type="text"
                        ref={PermaLinkBox}
                        onChange={nameLastHandler}
                        placeholder="Enter PermaLink "
                        required
                        maxLength={200}
                        autoComplete="off"
                      />
                      <div className="bg-opacity-50 font-small mt-2 p-2 text-bg-light text-sm-start">
                        Permalink-example:/example
                      </div>
                      <div class="invalid-feedback">Please fill out this field.</div>
                    </div>
                    <input ref={serialBox} type="hidden" value={cards} />
                  </div>
                </div>

                <div className="col-lg-12 ">
                  <div className="row">
                    <div className="col-lg-6">
                      <GoBack value="footer" />
                    </div>
                    <div className="col-lg-6">
                      {' '}
                      <div className="w-100" style={{ textAlign: 'end' }}>
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
              </div>
            </form>
          </SimpleCard>
        </Stack>
      </Stack>
    </Container>
  );
};

export default FooterMenuSubManage;
