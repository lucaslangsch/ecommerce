import { Route, Routes } from 'react-router-dom'
import AuthContext from './context/AuthContext';
import Home from './pages/home';
import Register from './pages/register';

function App() {

  return (
    <AuthContext.Provider value={{ theme: 'ss' }}>
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/register" element={ <Register /> } />
    </Routes>
    </AuthContext.Provider>
  )
}

export default App
