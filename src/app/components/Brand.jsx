import { Box, styled } from '@mui/material';
import { MatxLogo } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { Span } from './Typography';

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

  return (
    <BrandRoot>
      <Box display="flex" alignItems="left">
        <MatxLogo />
        <StyledSpan>KPi</StyledSpan>
      </Box>
    </BrandRoot>
  );
};

export default Brand;
