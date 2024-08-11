import { Box, Stack, styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ServingTable from './table/ServingTable';
import ServingTrash from './Trash/ServingTrash';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const Serving = () => {
  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - Serving </title>

        <Box>
          <div class="card-header mt-4">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Serving In</h2>
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
                  <ServingTable />
                </SimpleCard>
              </TabPanel>
              <TabPanel>
                <SimpleCard>
                  <ServingTrash />
                </SimpleCard>
              </TabPanel>
            </Tabs>
          </div>
        </Box>
      </Stack>
    </Container>
  );
};

export default Serving;
