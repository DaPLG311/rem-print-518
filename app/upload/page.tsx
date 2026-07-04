import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import UploadForm from '@/components/quote/UploadForm';
import styles from './upload.module.css';

export const metadata: Metadata = pageMetadata({
  title: 'Upload Artwork — Tell REM About Your Files',
  description:
    'Final artwork, a work in progress, or just references — list your files and tell REM what job they belong to. A real person follows up to collect them.',
  path: '/upload',
});

/**
 * /upload — the artwork-first path into the intake system. Same production
 * stage language as the quote wizard's artwork step, standalone route.
 */
export default function UploadPage() {
  return (
    <section className={styles.stage} aria-label="Upload artwork">
      <span className="reg-mark reg-mark--tl" style={{ top: '1.5rem', left: '1.5rem' }} aria-hidden="true" />
      <span className={styles.ghostWord} aria-hidden="true">
        FILES
      </span>

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="kicker kicker--light">
            Artwork
            <span className="crimson-rule" aria-hidden="true" />
          </p>
          <h1 className={styles.headline}>
            Tell REM about <em className={styles.em}>your files.</em>
          </h1>
          <p className={styles.body}>
            Final artwork, a work in progress, or just references — list your files here and
            tell REM what job they belong to. Files aren&rsquo;t transmitted yet; a real person
            follows up with a way to send them.
          </p>
          <p className={`ticket-line ${styles.ticket}`} aria-hidden="true">
            Artwork intake · PDF · AI · EPS · PNG · JPG · TIF · SVG · ZIP
          </p>
        </div>

        <UploadForm />
      </div>
    </section>
  );
}
