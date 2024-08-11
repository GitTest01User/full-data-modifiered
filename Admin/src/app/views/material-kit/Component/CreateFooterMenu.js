import React from 'react';
import { Box, Stack, styled } from '@mui/material';

import { Link } from 'react-router-dom';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));
export default function CreateFooterMenu() {
  return (
    <div>
      {' '}
      <Container>
        <Stack spacing={3} className="container mt-0">
          <title>Digi2l - Footer menu </title>
          <Box>
            <div className=" p-3 mb-5">
              <div class="justify-content-center row">
                <div class="col-md-10">
                  <h6 class=" mb-3">Footer menu maker</h6>
                  <div class="justify-content-center row" id="btnswrapper">
                    <div class="col-md-4 mb-4">
                      <div class="border-0 p-1 rounded shadow">
                        <Link to="/backend/manage-footer-menu">
                          <h2 class="h5 m-2 color-text">Footer menu maker</h2>
                          <img
                            src="/menu.png"
                            className="fa-solid fa-truck-ramp-box fa-solid fa-truck-ramp-box mx-auto  w-100"
                            style={{ padding: '100px' }}
                          />
                        </Link>
                      </div>
                    </div>
                    <div class="col-md-4 mb-4">
                      <div class="border-0 p-1 rounded shadow">
                        <Link to="/backend/manage-footer-sub-menu">
                          <h2 class="h5 m-2 color-text">Sub Menu</h2>
                          <img
                            src="/app.png"
                            className="fa-solid fa-truck-ramp-box fa-solid fa-truck-ramp-box mx-auto  w-100"
                            style={{ padding: '100px' }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
