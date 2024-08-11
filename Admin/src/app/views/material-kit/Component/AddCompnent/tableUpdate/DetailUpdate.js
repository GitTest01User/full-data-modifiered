import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import Api from 'Service/Api';

import Get from '../../Function/Get';
import { useNavigate } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const DetailUpdate = () => {
  const [Detail, setDetail] = useState([]);

  var navigate = useNavigate();

  useEffect(() => {
    fetchDetailData();
  }, []);

  const fetchDetailData = async () => {
    Get(Api.FooterDetailSite).then(handleResponse).then(processGet).catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      setDetail(result.result);
    } else {
      setDetail(result.result);
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

  const handleSubmit = () => {
    navigate('/backend/footer-detail-update');
  };
  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - Company Details</title>
        <div className="m-3">
          <Stack spacing={3}>
            <div class="card-headers mt-3">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Company details update</h2>
                </div>
              </div>
            </div>
            <SimpleCard>
              <div class="form-group card-body mt-3">
                <div className="row">
                  {Detail.map((obj, index) => {
                    if (obj.DetailsisActive && obj.SubItem) {
                      return (
                        <div key={index} className="col-lg-6">
                          <div className="py-2">
                            <span>
                              <label class="d-block mb-2 mt-2 text-muted">
                                <i className={obj.Icon}></i>
                                <span> {obj.Title}</span>
                              </label>
                            </span>
                            {Detail.map((obj2, innerIndex) => {
                              if (obj2.PerantId === obj.Id && !obj2.SubItem) {
                                return (
                                  <div key={innerIndex} className="mark-Bold ">
                                    <span class="fw-bold d-block">
                                      <input
                                        type="text"
                                        className="form-control"
                                        defaultValue={obj2.Title}
                                      />
                                    </span>
                                    <button
                                      onClick={handleSubmit}
                                      className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium btn btn-gradient mb-2 mt-2 poppins-SemiBold css-18o3m6v-MuiButtonBase-root-MuiButton-root"
                                    >
                                      Update
                                    </button>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                <div className="col-sm-12 pt-3 col-md-12">
                  <div className="pt-3 w-100" style={{ textAlign: 'end' }}></div>
                </div>
              </div>
            </SimpleCard>
          </Stack>
        </div>
      </Stack>
    </Container>
  );
};

export default DetailUpdate;
