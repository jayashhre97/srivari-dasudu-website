import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

export default function AdminLogin({ onAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) onAuthenticated(user);
      setChecking(false);
    });
    return () => unsub();
  }, [onAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 1. Direct Master Admin bypass credentials for instant access without Firebase setup
    if (
      (email === 'admin@srivaridasudu.org' || email === 'admin') &&
      password === 'admin123'
    ) {
      onAuthenticated({ email: 'admin@srivaridasudu.org', uid: 'master-admin' });
      setLoading(false);
      return;
    }

    // 2. Firebase Authentication
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      onAuthenticated(cred.user);
    } catch (err) {
      // If Firebase project credentials are not configured yet, notify user with hint
      if (err.message && err.message.includes('api-key-not-valid')) {
        setError('Firebase API Key not yet configured. Use master credentials: admin@srivaridasudu.org / admin123');
      } else {
        setError(err.code === 'auth/invalid-credential' ? 'Invalid email or password' : err.message);
      }
    }
    setLoading(false);
  };

  if (checking) {
    return (
      <div className="admin-login-wrap">
        <div className="admin-login-card">
          <p style={{ textAlign: 'center' }}>Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>🙏 Srivari Dasudu</h1>
          <h2>Admin Panel</h2>
        </div>

        <form onSubmit={handleLogin} className="admin-login-form">
          {error && <div className="admin-error-msg">{error}</div>}

          <div style={{ background: '#f8f9fa', border: '1px dashed #C9972D', padding: '10px 12px', borderRadius: '6px', fontSize: '0.82rem', color: '#555' }}>
            <strong>Default Credentials:</strong><br />
            Email: <code>admin@srivaridasudu.org</code><br />
            Password: <code>admin123</code>
          </div>

          <label className="admin-label">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-input"
              placeholder="admin@srivaridasudu.org"
              required
            />
          </label>

          <label className="admin-label">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              placeholder="Enter password"
              required
            />
          </label>

          <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

