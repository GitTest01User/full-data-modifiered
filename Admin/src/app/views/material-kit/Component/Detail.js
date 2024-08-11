import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import Api from 'Service/Api';
import { useLocation, useNavigate } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const Detail = () => {
  const [Detail, setDetail] = useState([]);

  var navigator = useNavigate();

  var location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  var DetailId = queryParams.get('DetailId');

  useEffect(() => {
    fetchDetailData();
  }, []);

  const fetchDetailData = async () => {
    fetch(Api.FooterDetailSite)
      .then((response) => response.json())

      .then((result) => {
        if (result.Status) {
          setDetail(result.result);
        } else {
          console.log(result.result[0]);
        }
      })
      .catch((error) => console.log('error', error));
  };

  const handleSubmit = () => {
    navigator('/backend/footer-detail-update');
  };
  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - Details</title>
        <div className="m-3">
          <Stack spacing={3}>
            <div class="card-headers mt-3">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title"> Details</h2>
                </div>
              </div>
            </div>
            <SimpleCard>
              <div class="form-group card-body mt-3">
                <div className="row">
                  {Detail.map((obj, index) => {
                    if (obj.DetailsisActive && obj.SubItem) {
                      return (
                        <div key={index} className="col-lg-3">
                          <div className="py-2">
                            <label class="text-muted d-block">
                              <i className={`text-muted ${obj.Icon}`}></i>{' '}
                              <span className="text-muted">{obj.Title}</span>
                            </label>

                            {Detail.map((obj2, innerIndex) => {
                              if (obj2.PerantId === obj.Id && !obj2.SubItem) {
                                return (
                                  <div key={innerIndex} className="mark-Bold px-3">
                                    <span class="fw-bold d-block">
                                      <b class=" fw-bold">{obj2.Title}</b>
                                    </span>
                                  </div>
                                );
                              }
                              return null; // Always return something in a map function
                            })}
                          </div>
                        </div>
                      );
                    }
                    return null; // If condition is not met, return null
                  })}
                </div>
                <div className="col-sm-12 pt-3 col-md-12">
                  <div className="pt-3 w-100" style={{ textAlign: 'end' }}>
                    <button
                      onClick={handleSubmit}
                      className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium btn btn-gradient mb-2 mt-2 poppins-SemiBold css-18o3m6v-MuiButtonBase-root-MuiButton-root"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </SimpleCard>
          </Stack>
        </div>
      </Stack>
    </Container>
  );
};

export default Detail;
