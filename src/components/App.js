// import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
// import {getPosts} from '../api';
import {Home, Login, Signup, Settings, UserProfile} from  '../pages';
import {Loader, Navbar } from './';
import {useAuth} from '../hooks';

function PrivateRoute({children, ...rest}){
  const auth = useAuth();

  return(
    <Route
      {...rest}
      render = {() => {
        if(auth.user){
          return children;
        }

        return <Navigate to="/login" />
      }}
    />
  );
  
}

const About = () => {
  return <h1>About</h1>
}

const UserInfo = () => {
  return <h1>UserInfo</h1>
}

const Page404 = () => {
  return <h1>Page 404</h1>
}

function App() {
  const auth = useAuth();

  if(auth.loading){
    return <Loader/>;
  }

  return (
    <div className="App">
     <Router>
      <Navbar/>
      <Routes>
      <Route exact path = "/" element={<Home/>}/>
      <Route exact path = "/about" element={<About/>}/>
      <Route exact path = "/login" element={<Login/>}/>
      <Route exact path = "/register" element={<Signup/>}/>
      <Route exact path = "/settings" element={
                                <PrivateRoute>
                                  <Settings/>
                                </PrivateRoute>}/>
      <Route exact path = "/user/:userId" element={
                                <PrivateRoute>
                                  <UserProfile/>
                                </PrivateRoute>}/>                          
      <Route path="/*" element={<Page404/>}/>       
      </Routes>
      </Router> 
    </div>
  );
}

export default App;
