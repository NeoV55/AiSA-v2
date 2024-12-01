import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/LoginPage';
import Verification from './components/VerificationPage';
import News from './components/NewsPage';
import ServiceManager from './components/ServiceManagerPage';
import Reporting from './components/ReportTicket';
import Social from './components/SocialFeed';
import Dashboard from './components/Dashboard';
import ControlPanel from './components/ControlPanel';
import Map from './components/MapPage';
import Help from './components/HelpDeskForm';
import Settings from './components/UserSettingsPage';
import SignOut from './components/SignOutPage';
import VictimSupport from './components/VictimSupportPage';


const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/news" element={<News />} />
            <Route path="/servicemanager" element={<ServiceManager />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/social" element={<Social />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cpanel" element={<ControlPanel />} />
            <Route path="/" element={<Map />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/vsupport" element={<VictimSupport />} />
          </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
