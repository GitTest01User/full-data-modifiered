import { Stack, styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import Categorytable from './Categorytable';

import CategoryTrash from './CategoryTrash';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const FAQCategory = () => {
  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Categories</title>

        <div className="">
          <div class="card-header  mt-4">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title"> Categories</h2>
              </div>
            </div>
          </div>
          <Tabs>
            <TabList>
              <Tab>Published</Tab>
              <Tab>Trashed</Tab>
            </TabList>

            <TabPanel>
              <SimpleCard>
                <Categorytable />
              </SimpleCard>
            </TabPanel>
            <TabPanel>
              <SimpleCard>
                <CategoryTrash />
              </SimpleCard>
            </TabPanel>
          </Tabs>
        </div>
      </Stack>
    </Container>
  );
};

export default FAQCategory;
