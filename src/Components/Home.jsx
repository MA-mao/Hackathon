import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [authType, setAuthType] = useState('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Auth Modals */}
      {(showLogin || showSignup) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="relative">
            <button
              onClick={() => { setShowLogin(false); setShowSignup(false); }}
              className="absolute -top-3 -right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-100 z-10"
            >
              ×
            </button>
            {authType === 'login' ? (
              <Login 
                onClose={() => setShowLogin(false)} 
                onSwitchToSignup={() => setAuthType('signup')}
              />
            ) : (
              <Signup 
                onClose={() => setShowSignup(false)} 
                onSwitchToLogin={() => setAuthType('login')}
              />
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Build Your <span className="text-blue-600">Professional Resume</span> in Minutes
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Create, customize, and download ATS-friendly resumes. Free forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => { setShowSignup(true); setAuthType('signup'); }}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 shadow-lg hover:shadow-xl transition"
            >
              Start Building Free
            </button>
            
            <button
              onClick={() => { setShowLogin(true); setAuthType('login'); }}
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 shadow-lg hover:shadow-xl transition"
            >
              Login to Account
            </button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-2xl font-bold mb-3">Easy to Use</h3>
              <p className="text-gray-600">Fill simple forms, no design skills needed</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold mb-3">Professional Templates</h3>
              <p className="text-gray-600">Choose from multiple ATS-friendly designs</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">📥</div>
              <h3 className="text-2xl font-bold mb-3">Instant PDF Download</h3>
              <p className="text-gray-600">Get your resume ready in PDF format</p>
            </div>
          </div>

          {/* CTA for logged out users */}
          <div className="mt-20 p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to build your career?</h2>
            <p className="text-gray-600 mb-6">Create your free account now</p>
            <button
              onClick={() => { setShowSignup(true); setAuthType('signup'); }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:opacity-90 transition"
            >
              Get Started - It's Free!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}