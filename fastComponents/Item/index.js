import styled from '@mui/system/styled';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'transparent',
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : 'transparent',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center'
  }));

  export default Item;