import React, { useState, useEffect } from 'react';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if guest/local admin session exists or Firebase user
    const localAdmin = localStorage.getItem('srivari_admin_logged_in');
    if (localAdmin === 'true') {
      setCurrentUser({ email: 'admin@srivaridasudu.org', uid: 'local-admin' });
      setCheckingAuth(false);
      return;
    }

    try {
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
        setCheckingAuth(false);
      });
      return () => unsub();
    } catch (e) {
      setCheckingAuth(false);
    }
  }, []);

  const handleAuthenticated = (user) => {
    setCurrentUser(user);
    localStorage.setItem('srivari_admin_logged_in', 'true');
  };

  if (checkingAuth) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', minHeight: '60vh' }}>
        <p>Loading Admin...</p>
      </div>
    );
  }

  return (
    <div className="admin-page-root">
      {currentUser ? (
        <AdminDashboard user={currentUser} />
      ) : (
        <AdminLogin onAuthenticated={handleAuthenticated} />
      )}
    </div>
  );
}

