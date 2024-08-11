// import { styled } from '@mui/material';
// import { Breadcrumb, SimpleCard } from 'app/components';
import AsyncAutocomplete from './AsyncAutocomplete';
import AutocompleteCombo from './AutocompleteCombo';
import BadgeAutocomplete from './BadgeAutocomplete';

// const Container = styled('div')(({ theme }) => ({
//   margin: '30px',
//   [theme.breakpoints.down('sm')]: { margin: '16px' },
//   '& .breadcrumb': {
//     marginBottom: '30px',
//     [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
//   }
// }));

// const AppAutoComplete = () => {
//   return (
//     <Container>
//       <Box className="breadcrumb">
//         <Breadcrumb
//           routeSegments={[{ name: 'Material', path: '/material' }, { name: 'Autocomplete' }]}
//         />
//       </Box>

//       <SimpleCard title="autocomplete combo">
//         <AutocompleteCombo />
//       </SimpleCard>

//       <Box py="12px" />

//       <SimpleCard title="Asyncronous Autocomplete">
//         <AsyncAutocomplete />
//       </SimpleCard>

//       <Box py="12px" />

//       <SimpleCard title="Asyncronous Autocomplete">
//         <BadgeAutocomplete />
//       </SimpleCard>
//     </Container>
//   );
// };

// export default AppAutoComplete;

import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
// import SimpleForm from '../forms/StepperForm';
import StepperForm from '../forms/StepperForm';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppForm = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Material', path: '/material' }, { name: 'Form' }]} />
      </Box>

      <Stack spacing={3}>
        {/* <SimpleCard title="Simple Form">
          <SimpleForm />
        </SimpleCard> */}

        <SimpleCard title="stepper form">
          <StepperForm />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AppForm;
