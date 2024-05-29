import styled from '@mui/system/styled';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'transparent',
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : 'transparent',
    padding: theme.spacing(0),
    borderRadius: '4px',
    textAlign: 'center',
    fontStyle:'normalizeConfig',
    letterSpacing:  '-0.176px'
  }));

  export default Item;