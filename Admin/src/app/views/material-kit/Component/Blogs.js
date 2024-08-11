import { Box, Stack, styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import BlogTable from './table/BlogTable';

import BlogTrash from './Trash/BlogsTrash';

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

const Blogs = () => {
  return (
    <Container className="MuiContainer-root  m-auto">
      <Stack spacing={3} className="container mt-0">
        <div>
          <title>Digi2l - Articles </title>
          <div class="card-header ">
            <div class="row align-items-center">
              <div class="col">
                <h2 class="fs-5 mb-0 card-title">Articles </h2>
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
                    <BlogTable />
                  </SimpleCard>
                </TabPanel>

                <TabPanel>
                  <SimpleCard>
                    <BlogTrash />
                  </SimpleCard>
                </TabPanel>
              </Tabs>
            </div>
          </Box>
        </div>
      </Stack>
    </Container>
  );
};

export default Blogs;
