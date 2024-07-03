import Home from './pages/website/Home';
import Register from './pages/auth/Register';
// import VerifyOTP from './components/VerifyOTP';
// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';
// import ProtectedComponent from './components/ProtectedComponent';
// import Login from "./pages/auth/Login";

const routes = [
  { path: '/', component: Home, isProtected: false },
  { path: '/register', component: Register, isProtected: false },
  // { path: '/verify-otp', component: VerifyOTP, isProtected: false },
  // { path: '/forgot-password', component: ForgotPassword, isProtected: false },
  // { path: '/reset-password', component: ResetPassword, isProtected: false },
  // { path: "/login", component: Login, isProtected: false },
  // { path: '/protected', component: ProtectedComponent, isProtected: true },
];

export default routes;
