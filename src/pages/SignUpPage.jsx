import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, AlertCircle, CheckCircle2, User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full Name is required.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters long.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Mobile Number is required.';
    } else if (formData.phone.trim().replace(/\D/g, '').length < 7) {
      errs.phone = 'Please enter a valid mobile number with at least 7 digits.';
    }

    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      signUp({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password
      });
      // Direct navigation to user account dashboard upon successful registration
      navigate('/account');
    } catch (err) {
      setErrors({ global: err.message || 'Registration failed. Please check information.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '85vh', padding: '60px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '520px', backgroundColor: 'var(--color-cream-light)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-terracotta-subtle)', color: 'var(--color-terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <UserPlus size={24} />
          </div>
          <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
            Join The Artisan Circle
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--color-charcoal-muted)' }}>
            Create an account to track custom engravings, save pieces, and receive member-exclusive studio drops.
          </p>
        </div>

        {/* Global Error Banner */}
        {errors.global && (
          <div style={{ backgroundColor: '#FDF2F2', border: '1px solid #F8B4B4', borderRadius: 'var(--radius-sm)', padding: '12px 16px', color: '#9B1C1C', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errors.global}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="signup-name">Full Name *</label>
            <div style={{ position: 'relative' }}>
              <input
                id="signup-name"
                name="name"
                type="text"
                className="form-control"
                placeholder="e.g. Amelia Vance"
                value={formData.name}
                onChange={handleChange}
              />
              <User size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-charcoal-subtle)' }} />
            </div>
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label className="form-label" htmlFor="signup-email">Email Address *</label>
            <div style={{ position: 'relative' }}>
              <input
                id="signup-email"
                name="email"
                type="email"
                className="form-control"
                placeholder="amelia@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              <Mail size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-charcoal-subtle)' }} />
            </div>
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          {/* Mobile Number */}
          <div className="form-group">
            <label className="form-label" htmlFor="signup-phone">Mobile Number *</label>
            <div style={{ position: 'relative' }}>
              <input
                id="signup-phone"
                name="phone"
                type="tel"
                className="form-control"
                placeholder="+91 98450 12345"
                value={formData.phone}
                onChange={handleChange}
              />
              <Phone size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-charcoal-subtle)' }} />
            </div>
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="signup-password">Password (at least 6 characters) *</label>
            <div style={{ position: 'relative' }}>
              <input
                id="signup-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-charcoal-subtle)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="signup-confirm-password">Confirm Password *</label>
            <div style={{ position: 'relative' }}>
              <input
                id="signup-confirm-password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <Lock size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-charcoal-subtle)' }} />
            </div>
            {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '10px', marginBottom: '20px' }}
            disabled={loading}
          >
            {loading ? 'Creating Your Account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer Link to Sign In */}
        <div style={{ textAlign: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '20px', fontSize: '0.9rem' }}>
          <p style={{ color: 'var(--color-charcoal-muted)' }}>
            Already have an account?{' '}
            <Link to="/signin" style={{ color: 'var(--color-terracotta)', fontWeight: '700' }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
