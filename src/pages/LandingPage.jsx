import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div style={{ width: '100vw', overflowX: 'hidden' }}>
      <Navbar />
      <header className="hero">
        <h1>Welcome to PitchMatch</h1>
        <p>Connecting Innovative Startups with Smart Investors</p>
        <div className="buttons">
          <Link to="/investor-register" className="btn">I’m an Investor</Link>
          <Link to="/startup-register" className="btn">I’m a Startup</Link>
        </div>
      </header>
      <Footer />
    </div>
  );
};

export default LandingPage;
