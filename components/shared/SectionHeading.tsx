import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  dark?: boolean;
  className?: string;
}

/**
 * Oversized editorial serif section heading with optional kicker + crimson rule.
 */
export default function SectionHeading({ kicker, title, dark = false, className }: SectionHeadingProps) {
  const classes = [styles.wrap, dark ? styles.dark : '', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {kicker ? (
        <p className={`kicker ${dark ? 'kicker--light' : ''} ${styles.kicker}`}>
          {kicker}
          <span className="crimson-rule" aria-hidden="true" />
        </p>
      ) : null}
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
