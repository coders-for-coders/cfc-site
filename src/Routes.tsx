import { Routes, Route } from 'react-router-dom';
import Home from './Routes/Home';
import NotFound from './Routes/NotFound';
import Login from './Routes/Login';
import SignUp from './Routes/SignUp';
import Posts from './Routes/Posts';
import PostPage from './Routes/PostPage';
import CreatePost from './Routes/CreatePost';

function AppRoutes () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} /> 
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:id" element={<PostPage />} />
      <Route path="/posts/create" element={<CreatePost />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
