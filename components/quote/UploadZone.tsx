'use client';

import { useId, useRef, useState, type DragEvent, type ChangeEvent } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';
import { track } from '@/lib/track';
import {
  ACCEPT_ATTR,
  ACCEPTED_EXTENSIONS,
  MAX_FILE_BYTES,
  MAX_FILE_MB,
  formatFileSize,
  type FileMeta,
} from './types';
import styles from './UploadZone.module.css';

interface UploadZoneProps {
  files: FileMeta[];
  onAdd: (accepted: FileMeta[]) => void;
  onRemove: (index: number) => void;
  /** Analytics context for artwork_uploaded events */
  context: 'quote' | 'upload';
  /** Visual tone: dark stage (default) or the crimson step-3 interlude */
  tone?: 'dark' | 'crimson';
  label?: string;
  sublabel?: string;
}

/**
 * Client-side artwork upload zone. Files are listed with names/sizes and
 * DESCRIBED in the submission payload — no storage backend in V1.
 * Fires `artwork_uploaded` per successful attach batch.
 */
export default function UploadZone({
  files,
  onAdd,
  onRemove,
  context,
  tone = 'dark',
  label = 'Drop files or tap to list them',
  sublabel = "Artwork, references, sketches, photos — anything that shows what you're after.",
}: UploadZoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [rejection, setRejection] = useState('');

  function acceptFiles(incoming: FileList | File[]) {
    const accepted: FileMeta[] = [];
    let tooBig = false;
    let badType = false;

    for (const file of Array.from(incoming)) {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      if (!ACCEPTED_EXTENSIONS.includes(ext)) {
        badType = true;
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        tooBig = true;
        continue;
      }
      accepted.push({ name: file.name, size: file.size, type: file.type || ext });
    }

    if (accepted.length > 0) {
      onAdd(accepted);
      track('artwork_uploaded', { context, file_count: accepted.length });
    }

    if (tooBig) {
      setRejection(`That file's too big — send what you have and note the rest. (${MAX_FILE_MB}MB per file)`);
    } else if (badType) {
      setRejection('That file type isn’t supported — PDF, AI, EPS, PNG, JPG, TIF, SVG, or ZIP works.');
    } else {
      setRejection('');
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) acceptFiles(e.target.files);
    e.target.value = '';
  }

  function handleDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) acceptFiles(e.dataTransfer.files);
  }

  const zoneClasses = [
    styles.zone,
    tone === 'crimson' ? styles.crimson : '',
    dragActive ? styles.dragActive : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrap}>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        multiple
        accept={ACCEPT_ATTR}
        className={styles.input}
        onChange={handleChange}
        aria-describedby={rejection ? `${inputId}-rejection` : undefined}
      />
      <label
        htmlFor={inputId}
        className={zoneClasses}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <UploadCloud size={30} aria-hidden="true" className={styles.zoneIcon} />
        <span className={styles.zoneLabel}>{label}</span>
        <span className={styles.zoneSub}>{sublabel}</span>
      </label>

      {rejection ? (
        <p id={`${inputId}-rejection`} className={styles.rejection} role="alert">
          {rejection}
        </p>
      ) : null}

      <p className={styles.notice}>
        Heads up: files aren&rsquo;t transmitted yet — REM receives your file list, and a real
        person follows up with a way to send the files themselves.
      </p>

      {files.length > 0 ? (
        <ul className={styles.fileList} aria-label="Attached files">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className={styles.fileRow}>
              <FileText size={16} aria-hidden="true" className={styles.fileIcon} />
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
              <button
                type="button"
                className={styles.fileRemove}
                onClick={() => onRemove(i)}
                aria-label={`Remove ${file.name}`}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
