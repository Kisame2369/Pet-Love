import { useEffect } from "react";
import CatImage from "../../assets/images/paw-cat.webp";
import CloseIcon from "../../assets/icons/close.svg?react";
import styles from "./ModalLogout.module.css";

export default function ModalLogout({ onConfirm, onCancel }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onCancel}>
          <CloseIcon className={styles.closeIcon} />
        </button>

        <div className={styles.iconWrapper}>
          <img src={CatImage} alt="Cat" className={styles.catImage} />
        </div>

        <h2 className={styles.title}>Already leaving?</h2>

        <div className={styles.actions}>
          <button className={styles.yesBtn} onClick={onConfirm}>
            Yes
          </button>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
