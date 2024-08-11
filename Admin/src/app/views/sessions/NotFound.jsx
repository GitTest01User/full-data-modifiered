import { Box, Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center'
}));

const JustifyBox = styled(FlexBox)(() => ({
  maxWidth: 600,
  flexDirection: 'column',
  justifyContent: 'center'
}));

const IMG = styled('img')(() => ({
  width: '100%',
  marginBottom: '32px'
}));

const NotFoundRoot = styled(FlexBox)(() => ({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh !important'
}));

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundRoot>
          <title>Admin panel || 404</title>
      <JustifyBox>
        <IMG src="/Digi2limage/404-01-01.png" alt="" />

        <Button
          className="btn btn-gradient mb-3 mt-2 poppins-SemiBold"
          sx={{ textTransform: 'capitalize' }}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </JustifyBox>
    </NotFoundRoot>
  );
};

export default NotFound;
