import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import Swal from 'sweetalert2';

export default function Signup({ onClose, onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match',
      });
      return;
    }
    
    if (password.length < 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Weak Password',
        text: 'Password should be at least 6 characters',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      
      Swal.fire({
        icon: 'success',
        title: 'Account Created!',
        text: 'Welcome to Resume Builder',
        timer: 2000
      });
      
      if (onClose) onClose();
      navigate("/create-resume");

      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
      <p className="text-center text-gray-600 mb-6">Start building your career</p>
      
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            placeholder="you@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button 
            onClick={onSwitchToLogin}
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}
