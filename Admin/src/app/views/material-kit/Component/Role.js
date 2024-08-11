import { Box, Stack, styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import RoleTable from './table/RoleTable';
import RoleTrash from './Trash/RoleTrash';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const Role = () => {
  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - Role</title>
        <div class="card-header mt-4">
          <div class="row align-items-center">
            <div class="col">
              <h2 class="fs-5 mb-0 card-title"> Role</h2>
            </div>
          </div>
        </div>
        <Box>
          {' '}
          <div className="mt-3">
            <Tabs>
              <TabList>
                <Tab> List </Tab>
                <Tab>Trashed</Tab>
              </TabList>

              <TabPanel>
                {' '}
                <SimpleCard>
                  <RoleTable />
                </SimpleCard>
              </TabPanel>
              <TabPanel>
                <SimpleCard>
                  <RoleTrash />
                </SimpleCard>
              </TabPanel>
            </Tabs>
          </div>
        </Box>
      </Stack>
    </Container>
  );
};

export default Role;
