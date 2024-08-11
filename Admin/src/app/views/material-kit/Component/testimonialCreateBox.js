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

export default function TestimonialsCreateBox() {
  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - Testimonials </title>
        <Box>
          <div className=" p-3 mb-5">
            <div class="justify-content-center row">
              <div class="col-md-10">
                <h6 class=" mb-3">Reviews</h6>

                <div class="row" id="btnswrapper">
                  <div class="col-md-4 mb-4">
                    <div class="card border-0 shadow rounded optionbtnwrap">
                      <Link to="/backend/manage-reseller">
                        <h2 class="h5 m-2 color-text">Reseller</h2>
                        <img
                          src="/Reseller.png"
                          className="fa-solid fa-truck-ramp-box fa-solid fa-truck-ramp-box mx-auto  w-100"
                          style={{ padding: '100px' }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div class="col-md-4 mb-4">
                    <div class="card border-0 shadow rounded optionbtnwrap">
                      <Link to="/backend/manage-partners">
                        <h2 class="h5 m-2 color-text">Partners</h2>
                        <img
                          src="/partners.png"
                          className="fa-solid fa-truck-ramp-box fa-solid fa-truck-ramp-box mx-auto  w-100"
                          style={{ padding: '100px' }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div class="col-md-4 mb-4">
                    <div class="card border-0 shadow rounded optionbtnwrap">
                      <Link to="/backend/manage-testimonials">
                        <h2 class="h5 m-2 color-text">Customer</h2>

                        <img
                          src="/people.png"
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
  );
}
