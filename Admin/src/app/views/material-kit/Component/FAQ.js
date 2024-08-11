import { Box, Stack, styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import FAQTable from './table/FAQTable';
import FAQTrash from './Trash/FAQTrash';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const FAQ = () => {
  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - Faq contents</title>
        <Box>
          <div class="card-header mt-4">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Faq contents</h2>
              </div>
            </div>
          </div>
        </Box>
        <Box>
          <div className="">
            <Tabs>
              <TabList>
                <Tab>Published</Tab>
                <Tab>Trashed</Tab>
              </TabList>

              <TabPanel>
                <SimpleCard>
                  <FAQTable />
                </SimpleCard>
              </TabPanel>
              <TabPanel>
                <SimpleCard>
                  <FAQTrash />
                </SimpleCard>
              </TabPanel>
            </Tabs>
          </div>
        </Box>
      </Stack>
    </Container>
  );
};

export default FAQ;
