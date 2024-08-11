import { Box, Stack, styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import 'react-tabs/style/react-tabs.css';

import CategoryBlogtable from './CategoryBlogtable';
import CategoryBlogTrash from './CategoryBlogTrash';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const BlogsCategory = () => {
  return (
    <Container>
      <Stack spacing={3} className="container ">
        <title>Digi2l - Categories </title>
        <Box className="breadcrumb MuiBox-root breadcrumb text-center css-0 justify-content-between">
          <Box></Box>
        </Box>
        <Box>
          <div className="">
            <div class="card-header mt-4">
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
                  <CategoryBlogtable />
                </SimpleCard>
              </TabPanel>
              <TabPanel>
                <SimpleCard>
                  <CategoryBlogTrash />
                </SimpleCard>
              </TabPanel>
            </Tabs>
          </div>
        </Box>
      </Stack>
    </Container>
  );
};

export default BlogsCategory;
