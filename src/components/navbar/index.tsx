
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext'
import { AppBar, Toolbar, Typography } from '@mui/material';

function Navbar() {
  const { name } = useContext(AuthContext);

  return (
    <AppBar sx={{ position: 'fixed', backgroundColor: '#a32424' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Olá, {name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
