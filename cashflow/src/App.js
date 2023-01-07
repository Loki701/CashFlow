import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import React, {createContext, useContext, useState} from 'react';

//Global variable with authentication state, it can be past down to other components and they can change or use its value
const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = {isAuthenticated, setIsAuthenticated};
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
const ProtectedRoute = ({redirectPath = '/login', children}) =>{
  const auth = useContext(AuthContext);

  if(!auth.isAuthenticated){
    return <Navigate to={redirectPath} replace />;
  }
  return children? children : <Outlet/>;
};

export default function App() {

  return (
    <>
    <Routes>
      <Route index element={<Main/>} />
      <Route exact path="/" element={<Main/>} />
      <Route exact path="/login" element={<AuthProvider><Login/></AuthProvider>} />
      <Route exact path="/signup" element={<Signup/>} />

      <Route element={<AuthProvider><ProtectedRoute /></AuthProvider>}>
        <Route exact path="/home" element={<Home/>} />
      </Route>
    </Routes>
    </>
  );
}

export {AuthContext};

