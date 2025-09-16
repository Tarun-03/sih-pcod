import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Body from './pages/Body.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Dashboard from './pages/Dashboard.jsx';
import About from './pages/About.jsx'; // Add this line

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/body" element={<><Navbar /><Body /></>} />
          <Route path="/onboarding" element={<><Navbar /><Onboarding /></>} />
          <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
          <Route path="/about" element={<><Navbar /><About /></>} /> {/* Add this line */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;