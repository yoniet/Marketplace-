import React from 'react'
import { Routes, Route } from "react-router-dom";
import Menu from './components/core/Menu'
import Home from './components/core/Home'
import SignUp from './components/user/SignUp.jsx';
import Profile from './components/user/Profile.jsx';
import EditProfile from './components/user/EditProfile.jsx';
import NotFound from './NotFound';
import PrivateRoutes from './components/auth/PrivateRouters.jsx';
import SignIn from './components/auth/SignIn';


const MainRouter = (props) => {
  return (<div>

    <Menu />

    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />

      <Route
        element={<PrivateRoutes />}
      >
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/user/edit/:userId" element={<EditProfile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>)
}

export default MainRouter;