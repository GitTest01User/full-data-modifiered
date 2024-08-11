import { Box, Stack, styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import EnquiresTable from './table/EnquiresTable';
import EnquiresTrash from './Trash/EnquiresTrash';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const Enquires = () => {
  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - Enquires</title>
        <div class="card-header mt-4">
          <div class="row align-items-center">
            <div class="col">
              <h2 class="fs-5 mb-0 card-title">Enquires </h2>
            </div>
          </div>
        </div>
        <Box>
          {' '}
          <div className="mt-3">
            <Tabs>
              <TabList>
                <Tab> Details</Tab>
                <Tab>Trashed</Tab>
              </TabList>

              <TabPanel>
                <SimpleCard>
                  <EnquiresTable />
                </SimpleCard>
              </TabPanel>
              <TabPanel>
                <SimpleCard>
                  <EnquiresTrash />
                </SimpleCard>
              </TabPanel>
            </Tabs>
          </div>
        </Box>
      </Stack>
    </Container>
  );
};

export default Enquires;
