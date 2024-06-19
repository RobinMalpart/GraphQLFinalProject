import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import UserList from '../components/UserList';
import ArticleList from '../components/ArticleList';
import ArticleDetails from '../components/ArticleDetails';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import CreateArticle from '../components/CreateArticle';
import PrivateRoute from '../components/PrivateRoute';

const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
      <Route path="/articles" element={<PrivateRoute><ArticleList /></PrivateRoute>} />
      <Route path="/articles/:id" element={<PrivateRoute><ArticleDetails /></PrivateRoute>} />
      <Route path="/create-article" element={<PrivateRoute><CreateArticle /></PrivateRoute>} />
    </Routes>
  </Router>
);

export default AppRouter;
