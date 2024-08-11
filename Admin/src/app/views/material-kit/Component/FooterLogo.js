import { Stack } from '@mui/material';

import { Box, styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import Api from 'Service/Api';
import { useNavigate } from 'react-router-dom';

import dateFormat from 'dateformat';

import { useAuthContext } from 'Context/AuthContext';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const FooterLogo = () => {
  var { user } = useAuthContext();
  const [userDetailData, setuserDetailData] = useState([]);

  var navigator = useNavigate();

  const handleSubmit = () => {
    navigator(`/backend/update-footer-logo?Id=${userDetailData.Id}`);
  };

  var LayouttapBar = () => {
    const requestOptions = {
      method: 'GET',

      redirect: 'follow'
    };

    fetch(Api.FooterLogoGetSite, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status) {
          setuserDetailData(result.result[0]);
          console.log(result.result, 'result');
        }
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    LayouttapBar();
  }, []);

  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - Footer logo </title>

        <Box className="m-3">
          <Stack>
            <div class="card-headers  ">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Website footer logo</h2>
                </div>
              </div>
            </div>
            <SimpleCard>
              <div class="form-group card-body ">
                <div className="my-4 row">
                  <div className="row ">
                    <div className="col-md-12 mb-5 text-center">
                      <div className="bg-light editprofilepicbox form-control-lg mx-auto">
                        <img
                          src={Api.BaseURL ? `${Api.BaseURL}/${userDetailData.Image}` : '/demo.png'}
                          class="w-100   "
                        />
                      </div>
                      <span style={{ fontSize: 'smaller' }} className="text-muted d-block"></span>
                    </div>
                    <div className="col-md-4 mb-5">
                      <span className="fw-bold d-block">
                        <b className="sizeText fw-bold">{userDetailData.Title}</b>
                      </span>
                      <span style={{ fontSize: 'smaller' }} className="text-muted d-block">
                        Title
                      </span>
                    </div>
                    <div className="col-md-4 mb-5">
                      <span className="fw-bold d-block">
                        <b className="sizeText fw-bold">{userDetailData.Author}</b>
                      </span>
                      <span style={{ fontSize: 'smaller' }} className="text-muted d-block">
                        Author
                      </span>
                    </div>

                    <div className="col-md-4 mb-3">
                      <span className="fw-bold d-block">
                        <b className="sizeText fw-bold">
                          {' '}
                          {dateFormat(userDetailData.Date, 'mmmm dS, yyyy')}
                        </b>
                      </span>
                      <span style={{ fontSize: 'smaller' }} className="text-muted d-block">
                        Last Update
                      </span>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6"></div>
                  <div class="col-6">
                    <div class="text-end w-100">
                      <button onClick={handleSubmit} className=" btn btn-primary mainshadow">
                        <span> Edit</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SimpleCard>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default FooterLogo;
