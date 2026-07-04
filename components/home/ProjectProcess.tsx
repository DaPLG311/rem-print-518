import MediaMask from '@/components/shared/MediaMask';
import Reveal from '@/components/shared/Reveal';
import styles from './ProjectProcess.module.css';

interface ProcessStep {
  num: string;
  title: string;
  sub: string;
  chipLabel: string;
}

/**
 * ACT IX — PROJECT PROCESS. Dark act: four numbered outline cards in a
 * row with crimson arrows between them (rotating vertical on mobile).
 * 01 request → 02 files → 03 production → 04 delivery.
 */

const STEPS: ProcessStep[] = [
  {
    num: '01',
    title: 'Tell us what you need',
    sub: 'Quote request or call',
    chipLabel: 'Project brief',
  },
  {
    num: '02',
    title: 'Send your files',
    sub: 'Upload artwork or references',
    chipLabel: 'File intake',
  },
  {
    num: '03',
    title: 'REM handles production',
    sub: 'Printed, finished, prepared',
    chipLabel: 'On press',
  },
  {
    num: '04',
    title: 'The job gets there',
    sub: 'Mail, pickup, or delivery',
    chipLabel: 'Out the door',
  },
];

export default function ProjectProcess() {
  return (
    <section
      className={`dark-section ${styles.section}`}
      data-stage="dark"
      aria-labelledby="project-process-title"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <Reveal>
            <p className={`kicker kicker--light ${styles.kicker}`}>
              Project Process
              <span className="crimson-rule crimson-rule--center" aria-hidden="true" />
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="project-process-title" className={styles.title}>
              <span className={styles.titleLine}>From request</span>
              <span className={styles.titleLine}>
                to <em>result.</em>
              </span>
            </h2>
          </Reveal>
        </div>

        <ol className={styles.flow} role="list">
          {STEPS.map((step, i) => (
            <li key={step.num} className={styles.step}>
              <Reveal delay={i * 0.1} className={styles.card}>
                <MediaMask ratio="16 / 10" label={step.chipLabel} className={styles.chip} />
                <span className={styles.num} aria-hidden="true">
                  {step.num}
                </span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepSub}>{step.sub}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.2}>
          <p className={styles.closing}>One partner. One process. One relationship.</p>
        </Reveal>
      </div>
    </section>
  );
}
