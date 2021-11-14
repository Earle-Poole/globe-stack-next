import styles from './overlay.module.css'

interface OverlayProps {
  children: React.ReactNode;
}
const Overlay = ({ children }: OverlayProps) => {
  return <div className={styles.overlayWrapper}>{children}</div>;
};

export default Overlay;
