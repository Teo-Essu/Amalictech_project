// import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUpComponent from './components/SignUp';
import AuthLayout from './layout/AuthLayout';
import LogIn from './components/LogIn';
import Home from './components/Home';
import SendEmail from './components/SendEmail';
import Admin from './components/Admin';
import ForgotPwd from './components/ForgotPwd';
import VerifyOtp from './components/VerifyOtp';
import ResetPwd from './components/ResetPwd';
import SearchComponent from './components/TrySearch';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<SignUpComponent />} />
          <Route path="login" element={<LogIn/>}/>
          <Route path="forgotPwd" element={<ForgotPwd/>}/>
          <Route path="verifyOtp" element={<VerifyOtp/>}/>
          <Route path="resetPwd" element={<ResetPwd/>}/>
        </Route>
        <Route path="search" element={<SearchComponent/>}/>
        <Route path="home" element={<Home/>}/>
        <Route path="email" element={<SendEmail/>}/>
        <Route path="admin" element={<Admin/>}/>
      </Routes>
    </main>
  );
}

export default App;
