import logo from './img/CashFlowLogo.png';
//import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Main from './components/Main';
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
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
    <Routes>
      <Route index element={<Main/>} />
      <Route path="/" element={<Main/>} />
      <Route element={<AuthProvider><ProtectedRoute /></AuthProvider>}>
        <Route exact path="/home" element={<Home/>} />
      </Route>
      <Route exact path="/login" element={<Login/>} />
    </Routes>
  );
}


