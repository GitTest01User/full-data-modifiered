import { Box, Stack, styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import HeaderTable from './table/HeaderTable';
import HeaderTrash from './Trash/HeaderTrash';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const Header = () => {
  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - Top Navigation </title>
        <div class="card-header mt-4">
          <div class="row align-items-center">
            <div class="col">
              <h2 class="fs-5 mb-0 card-title">Top Navigation</h2>
            </div>
          </div>
        </div>
        <Box>
          <div className="">
            <Tabs className="text-start m-3  ">
              <TabList>
                <Tab>Published</Tab>
                <Tab>Trashed</Tab>
              </TabList>

              <TabPanel>
                <SimpleCard>
                  <HeaderTable />
                </SimpleCard>
              </TabPanel>

              <TabPanel>
                <SimpleCard>
                  <HeaderTrash />
                </SimpleCard>
              </TabPanel>
            </Tabs>
          </div>
        </Box>
      </Stack>
    </Container>
  );
};

export default Header;
