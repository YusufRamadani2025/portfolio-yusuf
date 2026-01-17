import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";

// Components
import Preloader from "./components/Global/Preloader";
import CustomCursor from "./components/Global/CustomCursor";
import Navbar from "./components/Global/Navbar";
import ParticleBg from "./components/Global/ParticleBg";
import WhatsAppBtn from "./components/Global/WhatsAppBtn";
import Hero from "./components/Sections/Hero";
import About from "./components/Sections/About";
import Experience from "./components/Sections/Experience";
import Projects from "./components/Sections/Projects";
import Contact from "./components/Sections/Contact";

// Admin Components
import Login from "./components/Admin/Login";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ProjectForm from "./components/Admin/ProjectForm";
import ProtectedRoute from "./components/Admin/ProtectedRoute";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user has already visited in this session
    const hasLoaded = sessionStorage.getItem("hasLoaded");

    if (hasLoaded) {
      setLoading(false);
    } else {
      // Simulate loading for first visit
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
      }, 2500); // Matches the Preloader internal timer + buffer
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <CustomCursor />
      {loading ? (
        <Preloader />
      ) : (
        <div className="relative z-10 text-slate-900 dark:text-white selection:bg-blue-500/30">
          <ParticleBg />
          <Navbar />
          <WhatsAppBtn />
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/project/new" 
              element={
                <ProtectedRoute>
                  <ProjectForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/project/edit/:id" 
              element={
                <ProtectedRoute>
                  <ProjectForm />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;