import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../../assets/icons/close.svg?react";
import CatImage from "../../assets/images/paw-cat.webp";
import styles from "./ModalCongrats.module.css";

export default function ModalCongrats({ onClose }) {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate("/profile");
    onClose();
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <CloseIcon className={styles.closeIcon} />
        </button>

        <div className={styles.iconWrapper}>
          <img src={CatImage} alt="Cat" className={styles.catImage} />
        </div>

        <h2 className={styles.title}>Congrats</h2>
        <p className={styles.text}>
          The first fluff in the favorites! May your friendship be the happiest
          and filled with fun.
        </p>

        <button className={styles.goToProfileBtn} onClick={handleGoToProfile}>
          Go to profile
        </button>
      </div>
    </div>
  );
}
