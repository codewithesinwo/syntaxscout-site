import React, { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Hero from './components/Hero'
import Courses from './components/Courses'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ResetPassword from './pages/ResetPassword'
import PageNotFound from './pages/PageNotFound'
import Dashboard from './pages/Dashboard'
import DashboardSetting from './pages/DashboardSetting'
import WebLayout from './components/WebLayout'
import DashboardLayout from './components/DashboardLayout'
import LearnBanner from './components/LearnBanner'
import WhyLearn from './components/WhyLearn'
import Stats from './components/Stats'
import ContactForm from './pages/ContactForm'
import LifetimeAccess from './pages/LifetimeAccess'
import DashboardCourses from './pages/DashboardCourses'
import { getToken } from "./utils/localstorage";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      if (location.pathname !== "/") {
        navigate(`/${location.hash}`);
        return;
      }

      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }, [location, navigate]);

  useEffect(() => {
    try {
      const isLoggedIn = ("isLoggedIn");
      if (isLoggedIn === "true") {

        const publicPaths = ["/login", "/signup", "/reset-password"];
        if (publicPaths.includes(location.pathname)) {
          navigate("/dashboard");
        }
      } else {
        if (location.pathname.startsWith("/dashboard")) {
          navigate("/");
        }
      }
    } catch {
        console.log("Start Guided");
    }
  }, [location.pathname, navigate]);

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<WebLayout />}>
          <Route
            index
            element={
              <>
                <Hero />
                <Courses limit={3} />
                <LearnBanner />
                <WhyLearn />
                <Stats />
              </>
            }
          />

          <Route path="/lifetime-access" element={<LifetimeAccess />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<DashboardSetting />} />
          <Route path="courses" element={<DashboardCourses />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
