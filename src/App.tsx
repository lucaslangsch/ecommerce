import { Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import Register from './pages/register';
import RotaPrivada from './routes/PrivateRoute';
import Dashboard from './pages/dashboard';
import Plan from './pages/plan';
import Plans from './pages/plans';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />}  />
      <Route element={<RotaPrivada />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/plans" element={<Plans />}/>
        <Route path="/dashboard/plans/:id" element={<Plan />} />
      </Route>
    </Routes>
  )
}

export default App
