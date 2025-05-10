// src\app\login\page.tsx
'use client';

import { useEffect } from 'react';

export default function LoginWithFacebookPage() {
  const handleLogin = () => {
    // 🌐 Redirect to backend to start Facebook login
    window.location.href = 'http://localhost:5000/redirect/auth/login';
  };

  useEffect(() => {
    // ✅ Optional: Check if there's a token in URL after FB login
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      console.log('✅ Got token from Facebook login:', token);
      localStorage.setItem('my_jwt', token);
      // Redirect to dashboard or wherever you want
      window.location.href = '/dashboard';
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login with Facebook</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition"
      >
        🔐 Login with Facebook
      </button>
    </div>
  );
}
