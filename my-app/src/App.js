import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Courses from './components/Courses/Courses';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import SubScribe from './components/Payments/SubScribe';
import NotFound from './components/Payments/NotFound';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import PaymentFail from './components/Payments/PaymentFail';
import CourseDetails from './components/CourseDetails/CourseDetails';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import ChanagePassword from './components/Profile/ChanagePassword';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import User from './components/Admin/User/User';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast'
import { loadUser } from './redux/actions/userAction';
import { ProtectedRoute } from 'protected-route-react'
import Loader from './components/Layout/Loader';


function App() {

  window.addEventListener('contextmenu', e => {
    e.preventDefault();
  })

  const { isAuthenticated, user, error, message, loading } = useSelector(state => state.user)


  const dispatch = useDispatch()

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message)
      dispatch({ type: 'clearMessage' });
    }

  }, [dispatch, error, message])

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <Router>
      {
        loading ? (<Loader />)
          : (
            <>
              <Routes>
                <Route path='/' element={<Layout />}>
                  <Route path='' element={<Home />} />
                  <Route path='courses' element={<Courses />} />
                  <Route path='course/:id' element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <CourseDetails user={user} />
                    </ProtectedRoute>} />
                  <Route path='login' element={
                    <ProtectedRoute
                      isAuthenticated={!isAuthenticated} redirect='/profile'>
                      <Login />
                    </ProtectedRoute>} />

                  <Route path='profile' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated} >
                    <Profile user={user} />
                  </ProtectedRoute>} />

                  <Route path='updateprofile' element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <UpdateProfile user={user} />
                    </ProtectedRoute>} />

                  <Route path='changepassword' element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <ChanagePassword />
                    </ProtectedRoute>} />

                  <Route path='register' element={
                  <ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/profile'>
                    <Register />
                  </ProtectedRoute>} />

                  <Route path='contact' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Contact />
                  </ProtectedRoute>} />
                  <Route path='request' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Request />
                  </ProtectedRoute>} />
                  <Route path='about' element={<About />} />

                  <Route path='forgotpassword' element={
                    <ProtectedRoute
                      isAuthenticated={!isAuthenticated} redirect='/profile'>
                      <ForgotPassword />
                    </ProtectedRoute>} />

                  <Route path='resetpassword/:token' element={
                    <ProtectedRoute
                      isAuthenticated={!isAuthenticated} redirect='/profile'>
                      <ResetPassword />
                    </ProtectedRoute>
                  } />

                  <Route path='subscribe' element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <SubScribe user={user} />
                    </ProtectedRoute>} />
                  <Route path='paymentsuccess' element={<PaymentSuccess />} />
                  <Route path='paymentfail' element={<PaymentFail />} />
                  <Route path='*' element={<NotFound />} />

                  {/* Admin Routes */}
                  <Route path='admin/dashboard' element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                      adminRoute={true}
                      isAdmin={user && user.role === "admin"}
                    >
                      <Dashboard />
                    </ProtectedRoute>} />

                  <Route path='admin/createcourse' element={
                    <ProtectedRoute
                      adminRoute={true}
                      isAuthenticated={isAuthenticated}
                      isAdmin={user && user.role === "admin"}
                    >
                      <CreateCourse />
                    </ProtectedRoute>} />

                  <Route path='admin/courses' element={<ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <AdminCourses />
                  </ProtectedRoute>} />

                  <Route path='admin/users' element={<ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <User />
                  </ProtectedRoute>} />

                </Route>
              </Routes>
              <Toaster
                position='top-right'
              />
            </>
          )
      }
    </Router>
  );
}

export default App;
