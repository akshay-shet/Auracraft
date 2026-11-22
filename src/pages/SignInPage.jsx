import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Sparkles, AlertCircle, CheckCircle2, Lock, Mail, Phone, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, demoCredentials } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Please enter your email address or mobile number.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      signIn({
        identifier: identifier.trim(),
        password,
        rememberMe
      });
      // Redirect to account or intended page
      const returnTo = location.state?.from || '/account';
      navigate(returnTo);
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleUseDemo = () => {
    setIdentifier(demoCredentials.email);
    setPassword(demoCredentials.password);
    setError('');
  };

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '80vh', padding: '60px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '480px', backgroundColor: 'var(--color-cream-light)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-terracotta-subtle)', color: 'var(--color-terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <LogIn size={24} />
          </div>
          <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
            Welcome Back
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-charcoal-muted)' }}>
            Sign in to access your orders, saved wishlist, and custom commissions.
          </p>
        </div>

        {/* Demo Credentials Quick-Fill Pill */}
        <div style={{ backgroundColor: 'var(--color-warm-beige-light)', border: '1px dashed var(--color-terracotta)', borderRadius: 'var(--radius-md)', padding: '14px 18px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-terracotta)' }}>Demo Account:</span>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-charcoal)' }}>
              {demoCredentials.email}
            </p>
          </div>
          <button
            type="button"
            onClick={handleUseDemo}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
          >
            Auto-Fill Demo
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{ backgroundColor: '#FDF2F2', border: '1px solid #F8B4B4', borderRadius: 'var(--radius-sm)', padding: '12px 16px', color: '#9B1C1C', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleSubmit}>
          {/* Email or Mobile */}
          <div className="form-group">
            <label className="form-label" htmlFor="signin-id">
              Email or Mobile Number *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="signin-id"
                type="text"
                className="form-control"
                placeholder="sarah.artisan@example.com or +91 98450 12345"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
              <Mail size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-charcoal-subtle)' }} />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="form-label" htmlFor="signin-password" style={{ margin: 0 }}>
                Password *
              </label>
              <button
                type="button"
                onClick={() => setForgotModal(true)}
                style={{ fontSize: '0.8rem', color: 'var(--color-terracotta)', fontWeight: '600' }}
              >
                Forgot Password?
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                id="signin-password"
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Enter your account password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-charcoal-subtle)' }}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', cursor: 'pointer', color: 'var(--color-charcoal)' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--color-terracotta)', width: '16px', height: '16px' }}
              />
              <span>Remember Me on this device</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '1rem', marginBottom: '20px' }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In to AuraCraft'}
          </button>
        </form>

        {/* Footer Link to Sign Up */}
        <div style={{ textAlign: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '20px', fontSize: '0.9rem' }}>
          <p style={{ color: 'var(--color-charcoal-muted)' }}>
            Don't have an account yet?{' '}
            <Link to="/signup" style={{ color: 'var(--color-terracotta)', fontWeight: '700' }}>
              Create Account
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal Helper */}
      {forgotModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(44, 37, 35, 0.6)', backdropFilter: 'blur(3px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: 'var(--radius-md)', padding: '32px', maxWidth: '420px', width: '100%', boxShadow: 'var(--shadow-xl)' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Reset Your Password</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-charcoal-muted)', marginBottom: '20px' }}>
              For this demo store, you can sign in directly using the demo credentials or create a new test account! The default demo password is <code>Password123!</code>.
            </p>
            <button
              onClick={() => {
                setPassword(demoCredentials.password);
                setIdentifier(demoCredentials.email);
                setForgotModal(false);
              }}
              className="btn btn-primary btn-sm"
              style={{ width: '100%' }}
            >
              Fill Demo Password & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
