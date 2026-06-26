import styles from "./phone-frame.module.css";

interface PhoneFrameProps {
  url: string;
}

const PhoneFrame = ({ url }: PhoneFrameProps): React.ReactElement => (
  <div className={styles.phone}>
    <div className={`${styles.sideBtn} ${styles.sideBtnVolumeUp}`} />
    <div className={`${styles.sideBtn} ${styles.sideBtnVolumeDown}`} />
    <div className={`${styles.sideBtn} ${styles.sideBtnPower}`} />
    <div className={styles.screen}>
      <div className={styles.notch}>
        <div className={styles.camera} />
        <div className={styles.speaker} />
      </div>
      <iframe src={url} title="senti.today" className={styles.iframe} allow="fullscreen" />
      <div className={styles.homeBar} />
    </div>
  </div>
);

export default PhoneFrame;
