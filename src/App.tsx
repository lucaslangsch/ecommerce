import { Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import Register from './pages/register';
import RotaPrivada from './routes/PrivateRoute';
import { Dashboard } from '@mui/icons-material';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />}  />
      <Route element={<RotaPrivada />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
