import {
  GlobalWorkerOptions,
  getDocument,
  type PDFDocumentProxy,
} from 'pdfjs-dist';
import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url';

if (typeof window !== 'undefined') {
  GlobalWorkerOptions.workerSrc = pdfWorker;
}

type Base64PdfViewerProps = {
  base64: string;
  pageScale?: number;
};

export const Base64PdfViewer = ({
  base64,
  pageScale = 1.5,
}: Base64PdfViewerProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState(0);

  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    if (!base64) return;

    let cancelled = false;

    const loadPdf = async () => {
      try {
        setLoading(true);
        setError(null);
        setNumPages(0);
        canvasRefs.current = [];

        if (pdfRef.current) {
          pdfRef.current.destroy();
          pdfRef.current = null;
        }

        const bytes = base64ToUint8Array(base64);

        const pdf = await getDocument({
          data: bytes,
          disableFontFace: true, // better text rendering
        }).promise;

        if (cancelled) {
          pdf.destroy();
          return;
        }

        pdfRef.current = pdf;
        setNumPages(pdf.numPages);
      } catch (err) {
        console.error('Error loading PDF:', err);
        if (!cancelled) {
          setError('לא ניתן להציג את הקובץ');
          setLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      cancelled = true;
      if (pdfRef.current) {
        pdfRef.current.destroy();
        pdfRef.current = null;
      }
    };
  }, [base64]);

  useEffect(() => {
    const pdf = pdfRef.current;
    if (!pdf || numPages === 0) return;

    let cancelled = false;

    const renderPages = async () => {
      try {
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          if (cancelled) return;

          const canvas = canvasRefs.current[pageNum - 1];
          if (!canvas) continue;

          const ctx = canvas.getContext('2d');
          if (!ctx) continue;

          const page = await pdf.getPage(pageNum);
          if (cancelled) return;

          const viewport = page.getViewport({ scale: pageScale });
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({
            canvasContext: ctx,
            viewport,
            canvas,
          }).promise;
        }

        if (!cancelled) {
          setLoading(false);
        }
      } catch (err) {
        console.error('Error rendering PDF pages:', err);
        if (!cancelled) {
          setError('לא ניתן להציג את הקובץ');
          setLoading(false);
        }
      }
    };

    renderPages();

    return () => {
      cancelled = true;
    };
  }, [numPages, pageScale]);

  if (!base64) return null;

  return (
    <div className='file-viewer-root'>
      {/* {loading && !error && <span>טוען PDF…</span>} */}

      {error && <div className='file-viewer-error'>{error}</div>}

      <div className='file-viewer-pages'>
        {Array.from({ length: numPages }, (_, idx) => (
          <canvas
            key={idx}
            ref={(el) => {
              canvasRefs.current[idx] = el;
            }}
            style={{
              display: error ? 'none' : 'block',
              opacity: loading ? 0 : 1,
              width: '100%',
              height: 'auto',
            }}
          />
        ))}
      </div>
    </div>
  );
};

function base64ToUint8Array(b64: string): Uint8Array {
  // Strip "data:...;base64," prefix if present
  let pure = b64.includes(',') ? b64.split(',')[1] : b64;

  // Remove whitespace/newlines
  pure = pure.replace(/\s+/g, '');

  const binary = atob(pure);
  const len = binary.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}
