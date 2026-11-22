import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'custom-order',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '80vh', padding: '60px 0 100px' }}>
      <div className="container">
        {/* Title */}
        <div style={{ maxWidth: '640px', margin: '0 auto 48px', textAlign: 'center' }}>
          <span className="badge badge-sage" style={{ marginBottom: '12px' }}>
            We're Here For You
          </span>
          <h1 style={{ fontSize: '2.8rem', fontFamily: 'var(--font-serif)', marginBottom: '14px' }}>
            Get in Touch With Our Studio
          </h1>
          <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '1.05rem' }}>
            Have a question about a bespoke engraving, wedding gift set, or studio order? Send our craft team a message.
          </p>
        </div>

        {/* Contact Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>
          {/* Left: Contact Info & Studio Hours */}
          <div style={{ backgroundColor: 'var(--color-cream-light)', padding: '36px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', marginBottom: '24px' }}>
              Studio Workshop
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-terracotta-subtle)', color: 'var(--color-terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '2px' }}>Atelier Location</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-muted)' }}>
                    Artisan Workshop, 100 Feet Road, Indiranagar<br />
                    Bengaluru, Karnataka 560038
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-sage-subtle)', color: 'var(--color-sage-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '2px' }}>Email Dispatch</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-muted)' }}>
                    hello@auracraft-handmade.com<br />
                    commissions@auracraft-handmade.com
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-dusty-rose-subtle)', color: 'var(--color-dusty-rose-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '2px' }}>Workshop Hours</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-muted)' }}>
                    Monday – Friday: 9am – 5pm PST<br />
                    Weekends: Kiln Firings & Carving Sessions
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <div style={{ backgroundColor: 'var(--color-warm-beige-light)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)' }}>
                <strong>Looking to track an order?</strong> If you already placed an order, you can check live status in your <a href="/account" style={{ color: 'var(--color-terracotta)', fontWeight: '700' }}>My Account</a> dashboard.
              </p>
            </div>
          </div>

          {/* Right: Message Form */}
          <div style={{ backgroundColor: 'var(--color-cream-light)', padding: '36px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
              Send a Note
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-charcoal-muted)', marginBottom: '24px' }}>
              We typically reply within 24 business hours.
            </p>

            {submitted ? (
              <div style={{ backgroundColor: 'var(--color-sage-subtle)', border: '1px solid var(--color-sage)', borderRadius: 'var(--radius-md)', padding: '24px', textAlign: 'center' }}>
                <CheckCircle2 size={36} style={{ color: 'var(--color-sage-dark)', margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Note Received with Joy!</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-charcoal-muted)', marginBottom: '16px' }}>
                  Thank you, {formData.name}. An artisan from our studio will review your message and reply back shortly.
                </p>
                <button 
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: 'custom-order', message: '' }); }}
                  className="btn btn-secondary btn-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Your Full Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Rachel Adams"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email Address *</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    className="form-control"
                    placeholder="rachel@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">Topic / Subject</label>
                  <select
                    id="contact-subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="custom-order">Custom Commission / Wedding Registry</option>
                    <option value="order-status">Existing Order Support</option>
                    <option value="product-inquiry">Product Materials & Care Question</option>
                    <option value="other">General Greeting</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Your Message *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    className="form-control"
                    placeholder="Tell us what you have in mind or how we can assist you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
                  <Send size={16} />
                  <span>Send Studio Note</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
