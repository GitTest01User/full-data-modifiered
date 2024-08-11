import { Box, styled } from '@mui/material';

const StyledLoading = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: 'auto',
    height: '100px'
  }
});

const Loading = () => {
  return (
    <StyledLoading>
      <Box position="relative">
        <img src="/Digi2limage/digi2l-gif.gif" alt="" />
      </Box>
    </StyledLoading>
  );
};

export default Loading;
