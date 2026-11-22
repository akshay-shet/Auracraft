import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Compass, ShieldCheck, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '80vh', padding: '60px 0 100px' }}>
      <div className="container">
        {/* Hero Section */}
        <div style={{ maxWidth: '780px', margin: '0 auto 64px', textAlign: 'center' }}>
          <span className="badge badge-terracotta" style={{ marginBottom: '12px' }}>
            The Artisan Manifesto
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontFamily: 'var(--font-serif)', marginBottom: '20px', lineHeight: 1.15 }}>
            Crafted Slowly, Meant to Be Held for a Lifetime
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-charcoal-muted)', lineHeight: '1.7' }}>
            AuraCraft was founded with a quiet, resolute belief: in a world moving faster toward disposable plastics and assembly lines, the things we touch and gift should carry the pulse, fingerprints, and warmth of human hands.
          </p>
        </div>

        {/* Studio Image & Ethos Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center', marginBottom: '80px' }}>
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', aspectRatio: '4/3' }}>
            <img 
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80" 
              alt="Potter working on pottery wheel"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div>
            <span className="section-subtitle">Our Four Pillars</span>
            <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>
              Where Soul Meets Substance
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--color-terracotta-subtle)', color: 'var(--color-terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Zero Assembly Lines</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-charcoal-muted)' }}>
                    Every ceramic bowl is wheel-thrown, every blanket arm-knitted, and every walnut cutting board hand-planed in small studio batches.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--color-sage-subtle)', color: 'var(--color-sage-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Heart size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Living Earth Materials</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-charcoal-muted)' }}>
                    We work exclusively with non-toxic earthenware clay, pure unspun Merino wool, fallen wild timber, and local raw beeswax.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--color-dusty-rose-subtle)', color: 'var(--color-dusty-rose-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Award size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Heirloom Personalization</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-charcoal-muted)' }}>
                    Turn objects into sacred markers of time. We laser-inscribe family milestones, GPS coordinates, and secret love letters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Maker Spotlight Showcase */}
        <div style={{ backgroundColor: 'var(--color-cream-light)', padding: '56px 40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
          <span className="section-subtitle">Meet The Makers</span>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', marginBottom: '14px' }}>
            A Collective of Independent Artisans
          </h2>
          <p style={{ maxWidth: '640px', margin: '0 auto 40px', color: 'var(--color-charcoal-muted)', fontSize: '1rem' }}>
            By shopping with AuraCraft, you directly support independent ceramicists, fiber artists, woodworkers, and jewelers who pour their lifetimes into their craft.
          </p>

          <Link to="/shop" className="btn btn-primary btn-lg">
            <span>Explore The 50+ Product Collection</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
