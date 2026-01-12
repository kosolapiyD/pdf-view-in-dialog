import './App.css';

import React, { useState } from 'react';
import styles from './App.module.scss';
import ShowDocumentDialog from './components/show-document-dialog/show-document-dialog';

const App = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDownload = () => {
    const blob = new Blob(['Sample PDF download placeholder'], {
      type: 'application/pdf',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sample.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

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

      <main className={styles.main}>
        <section className={styles.dialogSection}>
          <div className={styles.dialogCard}>
            <div className={styles.dialogTitle}>Show a PDF dialog</div>
            <p className={styles.dialogDescription}>
              Launch a lightweight preview dialog with actions in the header.
            </p>
            <button
              className={styles.btnPrimaryLg}
              onClick={() => setIsDialogOpen(true)}
              type='button'
            >
              Open document
            </button>
          </div>
        </section>
      </main>

      <ShowDocumentDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onDownload={handleDownload}
      />

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>Ac {new Date().getFullYear()} DarkUI</span>
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
