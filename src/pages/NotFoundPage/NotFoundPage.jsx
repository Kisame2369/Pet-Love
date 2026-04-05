import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Cat404 from "../../assets/images/404-cat.webp";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.pageContainer}>
      <Header variant="light" authenticated={true} />

      <div className={styles.content}>
        <div className={styles.errorWrapper}>
          <div className={styles.errorContent}>
            <div className={styles.numberWrapper}>
              <span className={styles.number}>4</span>
              <div className={styles.catImage}>
                <img src={Cat404} alt="404 Cat" />
              </div>
              <span className={styles.number}>4</span>
            </div>

            <p className={styles.message}>Ooops! This page not found :(</p>

            <button className={styles.homeButton} onClick={handleGoHome}>
              To home page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
