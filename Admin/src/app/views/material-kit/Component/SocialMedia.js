import { Box, Stack, styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import FollowUsTable from './table/FollowUsTable';
import FollowUsTrash from './Trash/FollowUsTrash';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const FollowUs = () => {
  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - Follow Us</title>

        <Box>
          <div class="card-header mt-4">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Follow Us </h2>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <Tabs>
              <TabList>
                <Tab>Published</Tab>
                <Tab>Trashed</Tab>
              </TabList>

              <TabPanel>
                <SimpleCard>
                  <FollowUsTable />
                </SimpleCard>
              </TabPanel>
              <TabPanel>
                <SimpleCard>
                  <FollowUsTrash />
                </SimpleCard>
              </TabPanel>
            </Tabs>
          </div>
        </Box>
      </Stack>
    </Container>
  );
};

export default FollowUs;
