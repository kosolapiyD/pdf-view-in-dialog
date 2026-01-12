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

        <div className={styles.headerButtons}>
          <button className={styles.btnGhost}>Sign in</button>
          <button className={styles.btnPrimary}>Get started</button>
        </div>
      </header>

      <main className={styles.main}></main>

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
