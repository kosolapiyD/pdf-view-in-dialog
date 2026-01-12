import React, { useEffect, useState } from 'react';
import styles from './show-document-dialog.module.scss';

type ShowDocumentDialogProps = {
  open: boolean;
  title?: string;
  footerText?: string;
  onClose: () => void;
  onDownload?: () => void;
};

const ANIMATION_MS = 220;

const ShowDocumentDialog = ({
  open,
  title = 'Document preview',
  onClose,
  onDownload,
}: ShowDocumentDialogProps) => {
  const [shouldRender, setShouldRender] = useState(open);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setIsClosing(false);
      return;
    }

    if (shouldRender) {
      setIsClosing(true);
      const timeout = window.setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, ANIMATION_MS);

      return () => window.clearTimeout(timeout);
    }
  }, [open, shouldRender]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!shouldRender) {
    return null;
  }

  const dialogState = open && !isClosing ? 'open' : 'closed';
  const handleDownload = onDownload ?? (() => undefined);

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={styles.backdrop}
      data-state={dialogState}
      onMouseDown={handleBackdropClick}
    >
      <div
        className={styles.dialog}
        role='dialog'
        aria-modal='true'
        aria-label={title}
      >
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.headerActions}>
            <button
              className={styles.actionButton}
              onClick={handleDownload}
              type='button'
            >
              Download
            </button>
            <button
              className={styles.closeButton}
              onClick={onClose}
              type='button'
              aria-label='Close dialog'
            >
              Close
            </button>
          </div>
        </div>

        <div className={styles.body}></div>

        <div className={styles.footer}>
          <span>{'For full details, download the PDF.'}</span>
          <p>{'Need a copy? Download the full PDF for sharing.'}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowDocumentDialog;
