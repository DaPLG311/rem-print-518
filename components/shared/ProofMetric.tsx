import styles from './ProofMetric.module.css';

interface ProofMetricProps {
  value: string;
  label: string;
}

/**
 * Huge serif numeral treatment for the proof strip — numerals breathe
 * on the dark field, no cards, no boxes.
 */
export default function ProofMetric({ value, label }: ProofMetricProps) {
  return (
    <div className={styles.metric}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
