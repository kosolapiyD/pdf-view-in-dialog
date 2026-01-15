import './App.css';

import { useState } from 'react';
import styles from './App.module.scss';
import ShowDocumentDialog from './components/show-document-dialog/show-document-dialog';
import { base64Sample, downloadPdf } from './utils/utils';

const App = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        onDownload={() => {
          downloadPdf('sample', base64Sample);
        }}
        documentBase64={base64Sample}
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

export default App;
