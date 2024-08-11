import { Box, Card, Grid, Icon, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';

import { useState } from 'react';
import { useAuthContext } from 'Context/AuthContext';

import Api from 'Service/Api';
import { useEffect } from 'react';
import CountUp from 'react-countup';
import { ChartView } from 'echarts';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' }
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize'
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary
}));

const Analytics = () => {
  var [data, setDate] = useState(new Date().toLocaleString());
  const { palette } = useTheme();
  var { user } = useAuthContext();
  var [counter, setCounter] = useState([]);

  var UserDetail = user.user;

  var first = UserDetail ? UserDetail.first_name : 'admin';
  var last = UserDetail ? UserDetail.last_name : 'admin';

  var Counter = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(Api.CounterGetWebSite, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status) {
          setCounter(result.result);
        }
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    Counter();
  }, []);
  return (
    <Fragment>
      <title>Backend - Dashboard</title>
      <ContentBox className="analytics ">
        <Box className="css-0 m-2 mb-4 mt-4 rounded">
          <div class="datefilter justify-content-between  row">
            <div class="col-12 d-flex">
              <h6 class=" m-1 mb-3">
                {' '}
                Welcome back, {first} {last}!
              </h6>
              <p class="welcometxt m-0"></p>
              <h6 class=" m-1 mb-3">Login Date: {data}</h6>
            </div>
          </div>

          <Grid spacing={3}>
            <div className="container">
              <div class="row">
                <h6 class=" m-1 mb-3"> Analytics </h6>
                {counter.map((obj) => {
                  if (obj.CounterISActive == true) {
                    return (
                      <>
                        <div class="col-md-6 mb-4">
                          <div class="card border-0 shadow">
                            <a href="#">
                              <div class="card-body ">
                                <div class="row d-block d-xl-flex align-items-center">
                                  <div class="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                                    <div class="icon-shape icon-shape-primary rounded me-4 me-sm-0">
                                      <Icon>{obj.BackendIcon}</Icon>
                                    </div>
                                  </div>
                                  <div class="col-xl-7 px-xl-0">
                                    <h2 class="h5 m-2 color-text">{obj.Title}</h2>
                                    <h3 class="fw-extrabold mb-2">
                                      <CountUp end={obj.Reseller_count} /> +
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </>
                    );
                  }
                })}
              </div>
            </div>
          </Grid>
        </Box>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
