
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { common } from '@mui/material/colors';
import { Link } from 'react-router-dom';

function Navbar() {
  const { name } = useContext(AuthContext);

  return (
    <AppBar color='primary'>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h5">
          Olá, {name}
        </Typography>
        <Link to={"/dashboard"}>
        <IconButton size='large' sx={{ color: common.white }}>
          <Typography variant="h5">Perfil&nbsp;</Typography>
          <AccountCircleIcon />
        </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
