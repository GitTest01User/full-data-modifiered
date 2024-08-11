import { Stack } from '@mui/material';

import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';
import dateFormat from 'dateformat';
import { useState } from 'react';
import { useEffect } from 'react';

import Api from 'Service/Api';
import { Link, useLocation } from 'react-router-dom';
import Get from '../../Function/Get';
import GoBack from '../../Button/GoBack';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const EnquiresUpdate = () => {
  const [Enquires, setEnquires] = useState([]);

  var location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  var EnquiresId = queryParams.get('enquiresId');

  useEffect(() => {
    fetchEnquiresData();
  }, []);

  const fetchEnquiresData = async () => {
    Get(`${Api.EnquiryGetAPi}?Id=${EnquiresId}`)
      .then(handleResponse)
      .then(processGet)
      .catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      setEnquires(result.result);
    } else {
      console.log(result.result[0]);
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

  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - Customers Detail</title>
        <div className="m-3">
          <div class="card-headers mt-3">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Customers Detail</h2>
              </div>
            </div>
          </div>
          <SimpleCard>
            <div class="form-group card-body mt-3">
              <div className="row">
                {Enquires.map((obj) => {
                  return (
                    <div key={obj.Id} className="row">
                      {Object.entries(obj).map(
                        ([key, value]) =>
                          value !== null &&
                          key != 'Id' &&
                          key != 'EnquiryisActive' &&
                          key != 'Resume' && (
                            <div key={key} className="col-md-4 mb-5">
                              <label className="text-muted d-block"> {key}</label>
                              <span className="fw-bold d-block">
                                {key != 'Resume' && key != 'CreatedDate' ? (
                                  <b className="sizeText fw-bold">{value}</b>
                                ) : (
                                  <b className="sizeText fw-bold">
                                    {key === 'Resume' ? (
                                      <>
                                        <label className="text-muted d-block"> {key}</label>
                                        <object
                                          class="form-control "
                                          data={`${Api.BaseURL}/${value}`}
                                          width="200"
                                          height="200"
                                        ></object>
                                        <br></br>
                                        <Link className="text-danger text-decoration-underline">
                                          view
                                        </Link>{' '}
                                        <Link className="text-danger text-decoration-underline">
                                          download
                                        </Link>
                                      </>
                                    ) : (
                                      <>{dateFormat(value, 'mmmm dS, yyyy')}</>
                                    )}
                                  </b>
                                )}
                              </span>
                            </div>
                          )
                      )}
                      {Object.entries(obj).map(
                        ([key, value]) =>
                          value !== null &&
                          key != 'Id' &&
                          key != 'EnquiryisActive' &&
                          key === 'Resume' && (
                            <div key={key} className="col-md-12 mb-0 pb-0">
                              <label className="text-muted d-block"> {key}</label>
                              <span className="fw-bold d-block">
                                {key != 'Resume' && key != 'CreatedDate' ? (
                                  <b className="sizeText fw-bold">{value}</b>
                                ) : (
                                  <b className="sizeText fw-bold">
                                    {key === 'Resume' ? (
                                      <>
                                        <object
                                          class="pdf "
                                          data={`${Api.BaseURL}/${value}`}
                                          height="236px"
                                        ></object>
                                      </>
                                    ) : (
                                      <>{dateFormat(value, 'mmmm dS, yyyy')}</>
                                    )}
                                  </b>
                                )}
                              </span>
                            </div>
                          )
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="col-sm-12 pt-3 col-md-12">
                <div className="pt-3 w-100" style={{ textAlign: 'end' }}>
                  <GoBack value="contact-enquires" />
                  {/* <button className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium btn btn-gradient mb-2 mt-2 poppins-SemiBold css-18o3m6v-MuiButtonBase-root-MuiButton-root">
                    Edit
                  </button> */}
                </div>
              </div>
            </div>
          </SimpleCard>
        </div>
      </Stack>
    </Container>
  );
};

export default EnquiresUpdate;
