"use client";

import { useEffect, useState } from "react";

import styles from "./phone-frame.module.css";

const getTime = () => {
  const now = new Date();
  return `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
};

const SignalIcon = (): React.ReactElement => (
  <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" aria-hidden="true">
    <rect x="0" y="8" width="3" height="4" rx="0.5" />
    <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" />
    <rect x="9" y="3" width="3" height="9" rx="0.5" />
    <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
  </svg>
);

const WifiIcon = (): React.ReactElement => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
    <circle cx="8" cy="11" r="1.5" fill="currentColor" />
    <path
      d="M5.5 8.5 A 3.5 3.5 0 0 1 10.5 8.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M3 6 A 7 7 0 0 1 13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M0.6 3.6 A 10.5 10.5 0 0 1 15.4 3.6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const BatteryIcon = (): React.ReactElement => (
  <svg width="26" height="12" viewBox="0 0 26 12" fill="currentColor" aria-hidden="true">
    <rect
      x="0"
      y="1"
      width="21"
      height="10"
      rx="3.5"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
      opacity="0.4"
    />
    <rect x="1.5" y="2.5" width="16.5" height="7" rx="2" />
    <rect x="22.5" y="4" width="3" height="4" rx="1.5" opacity="0.5" />
  </svg>
);

interface PhoneFrameProps {
  url: string;
}

const PhoneFrame = ({ url }: PhoneFrameProps): React.ReactElement => {
  const [time, setTime] = useState(getTime);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTime()), 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.phone}>
      <div className={`${styles.sideBtn} ${styles.sideBtnVolumeUp}`} />
      <div className={`${styles.sideBtn} ${styles.sideBtnVolumeDown}`} />
      <div className={`${styles.sideBtn} ${styles.sideBtnPower}`} />
      <div className={styles.screen}>
        <div className={styles.statusBar}>
          <div className={styles.statusLeft}>
            <span className={styles.time}>{time}</span>
          </div>
          <div className={styles.notchGap} />
          <div className={styles.statusRight}>
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </div>
          <div className={styles.notch}>
            <div className={styles.notchSpeaker} />
            <div className={styles.notchCamera} />
          </div>
        </div>
        <iframe src={url} title="senti.today" className={styles.iframe} allow="fullscreen" />
        <div className={styles.homeBar} />
      </div>
    </div>
  );
};

export default PhoneFrame;
