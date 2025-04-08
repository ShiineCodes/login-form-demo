'use client';
import { useState } from 'react';
import './styles.css';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (password) => {
    const isLongEnough = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
  
    if (isLongEnough && hasUpperCase && hasNumber) return 'strong';
    if (isLongEnough) return 'medium';
    return 'weak';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const strength = getPasswordStrength(password);

    if (strength !== 'Strong') {
      setError(
        'Password must be at least 8 characters long, contain an uppercase letter and a number.'
      );
      return;
    }
    setError('');
    console.log('Email:', email);
    console.log('Password:', password);
    // Add your login logic here
  };
  const strength = getPasswordStrength(password);

  const strengthLabel = {
    weak: 'Weak',
    medium: 'Okay',
    strong: 'Strong',
  };

  const strengthColor = {
    weak: 'text-red-500',
    medium: 'text-yellow-500',
    strong: 'text-green-600',
  };

  return (
    <div className='max-w-md mx-auto mt-20 p-6 rounded-2xl shadow-md login-form'>
      <h2 className='text-2xl font-semibold mb-4 text-center'>Login</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium'>Email</label>
          <input
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>

        <div>
          <label className='block text-sm font-medium'>Password</label>
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10'
            />
            {/* <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-600'
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button> */}
          </div>
          <div className='mt-1 flex items-center justify-between text-xs text-gray-500'>
            <p>🔐 At least 8 characters, one capital letter and one number</p>
            {password && (
              <span className={`${strengthColor[strength]} font-semibold`}>
                {strengthLabel[strength]}
              </span>
            )}
          </div>
          {error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
        </div>

        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition'
        >
          Login
        </button>
      </form>
    </div>
  );
}
