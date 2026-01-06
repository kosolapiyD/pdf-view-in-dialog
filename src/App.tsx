// import { useState } from 'react';
import './App.css';

import React from 'react';
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logo} aria-hidden='true' />
          <span className={styles.brandText}>DarkUI</span>
        </div>

        <nav className={styles.nav}>
          <a className={styles.navLink} href='#features'>
            Features
          </a>
          <a className={styles.navLink} href='#pricing'>
            Pricing
          </a>
          <a className={styles.navLink} href='#faq'>
            FAQ
          </a>
        </nav>

        <div className={styles.headerCtas}>
          <button className={styles.btnGhost}>Sign in</button>
          <button className={styles.btnPrimary}>Get started</button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroLeft}>
            <div className={styles.chip}>New • v1.0 is live</div>

            <h1 className={styles.h1}>
              Build a clean <span className={styles.accent}>dark</span> landing
              page fast.
            </h1>

            <p className={styles.subtitle}>
              Minimal UI that feels like Material—dark surfaces, soft elevation,
              crisp typography, and accessible contrast.
            </p>

            <div className={styles.heroCtas}>
              <button className={styles.btnPrimaryLg}>Start free</button>
              <button className={styles.btnOutlineLg}>See demo</button>
            </div>

            <div className={styles.statsRow} aria-label='Key stats'>
              <div className={styles.stat}>
                <div className={styles.statValue}>99.9%</div>
                <div className={styles.statLabel}>Uptime</div>
              </div>
              <div className={styles.divider} />
              <div className={styles.stat}>
                <div className={styles.statValue}>2 min</div>
                <div className={styles.statLabel}>Setup</div>
              </div>
              <div className={styles.divider} />
              <div className={styles.stat}>
                <div className={styles.statValue}>A+</div>
                <div className={styles.statLabel}>Lighthouse</div>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.previewCard}>
              <div className={styles.previewTop}>
                <div className={styles.dot} />
                <div className={styles.dot} />
                <div className={styles.dot} />
                <span className={styles.previewTitle}>Dashboard Preview</span>
              </div>

              <div className={styles.previewBody}>
                <div className={styles.skeletonRow} />
                <div className={styles.skeletonRow} />
                <div className={styles.skeletonRowShort} />

                <div className={styles.miniGrid}>
                  <div className={styles.miniCard}>
                    <div className={styles.miniLabel}>Users</div>
                    <div className={styles.miniValue}>12,403</div>
                  </div>
                  <div className={styles.miniCard}>
                    <div className={styles.miniLabel}>Revenue</div>
                    <div className={styles.miniValue}>$48.2k</div>
                  </div>
                </div>

                <div className={styles.chartMock} aria-hidden='true' />
              </div>
            </div>
          </div>
        </section>

        <section id='features' className={styles.section}>
          <h2 className={styles.h2}>Features</h2>
          <p className={styles.sectionSubtitle}>
            Everything you need for a modern dark UI.
          </p>

          <div className={styles.grid3}>
            <FeatureCard
              title='Material-like surfaces'
              desc='Dark cards, subtle borders, and soft elevation.'
              icon='⬛'
            />
            <FeatureCard
              title='Accessible contrast'
              desc='Readable typography and sensible color tokens.'
              icon='✨'
            />
            <FeatureCard
              title='Responsive layout'
              desc='Looks great from mobile to desktop.'
              icon='📱'
            />
          </div>
        </section>

        <section id='pricing' className={styles.section}>
          <h2 className={styles.h2}>Pricing</h2>
          <p className={styles.sectionSubtitle}>Simple plans, no surprises.</p>

          <div className={styles.grid2}>
            <div className={styles.priceCard}>
              <div className={styles.priceHeader}>
                <div className={styles.priceName}>Starter</div>
                <div className={styles.priceValue}>$0</div>
                <div className={styles.priceNote}>For personal projects</div>
              </div>

              <ul className={styles.list}>
                <li>✓ 1 workspace</li>
                <li>✓ Basic analytics</li>
                <li>✓ Community support</li>
              </ul>

              <button className={styles.btnOutlineLg} style={{ width: '100%' }}>
                Choose Starter
              </button>
            </div>

            <div className={`${styles.priceCard} ${styles.priceCardFeatured}`}>
              <div className={styles.badge}>Most popular</div>

              <div className={styles.priceHeader}>
                <div className={styles.priceName}>Pro</div>
                <div className={styles.priceValue}>$12</div>
                <div className={styles.priceNote}>Per user / month</div>
              </div>

              <ul className={styles.list}>
                <li>✓ Unlimited workspaces</li>
                <li>✓ Advanced analytics</li>
                <li>✓ Priority support</li>
              </ul>

              <button className={styles.btnPrimaryLg} style={{ width: '100%' }}>
                Choose Pro
              </button>
            </div>
          </div>
        </section>

        <section id='faq' className={styles.section}>
          <h2 className={styles.h2}>FAQ</h2>

          <div className={styles.faq}>
            <details className={styles.faqItem}>
              <summary>Is this using Material UI?</summary>
              <p>
                No—just SCSS styled to feel similar (dark surfaces + elevation).
              </p>
            </details>

            <details className={styles.faqItem}>
              <summary>Can I plug this into Vite/Next?</summary>
              <p>Yes. It’s plain React + SCSS modules.</p>
            </details>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>© {new Date().getFullYear()} DarkUI</span>
          <div className={styles.footerLinks}>
            <a href='#features'>Features</a>
            <a href='#pricing'>Pricing</a>
            <a href='#faq'>FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ title: string; desc: string; icon: string }> = ({
  title,
  desc,
  icon,
}) => (
  <div className={styles.featureCard}>
    <div className={styles.featureIcon} aria-hidden='true'>
      {icon}
    </div>
    <div className={styles.featureTitle}>{title}</div>
    <div className={styles.featureDesc}>{desc}</div>
  </div>
);

export default App;
