import { Box, styled } from '@mui/material';
import { MatxLogo } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { Span } from './Typography';
import $ from 'jquery';
import { useEffect } from 'react';
const BrandRoot = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 18px 20px 29px'
}));

const StyledSpan = styled(Span)(({ mode }) => ({
  fontSize: 18,
  marginLeft: '.5rem',
  display: mode === 'compact' ? 'none' : 'block'
}));

const Brand = ({ children }) => {
  const { settings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  // const { mode } = leftSidebar;
  useEffect(() => {
    $('MuiBox-root.css-lq6dvs').remove('css-lq6dvs');
  }, []);
  return (
    <BrandRoot>
      <Box display="flex" alignItems="center" className="MuiBox-root  ">
        <MatxLogo />
        {/* <StyledSpan mode={mode} className="sidenavHoverShow">
          Digi2L
        </StyledSpan> */}
      </Box>

      {/* <Box className="sidenavHoverShow" sx={{ display: mode === 'compact' ? 'none' : 'block' }}>
        {children || null}
      </Box> */}
    </BrandRoot>
  );
};

export default Brand;
