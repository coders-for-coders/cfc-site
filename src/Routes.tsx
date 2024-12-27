import { Routes, Route } from 'react-router-dom';
import Home from './Routes/Home';
import NotFound from './Routes/NotFound';
import Login from './Routes/Login';
import SignUp from './Routes/SignUp';
import Resources from './Routes/Resources';
function AppRoutes () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} /> 
      <Route path="/resources" element={<Resources />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
