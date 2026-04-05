import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import dogHero from "../../assets/images/dog-hero.webp";
import pawIcon from "../../assets/images/paw-dog.webp";

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <Header variant="light" />

      <main className={styles.mainContent}>
        <section className={styles.imgBlock}>
          <img src={dogHero} alt="Rich the Corgi" className={styles.dogImg} />

          <div className={styles.petCard}>
            <div className={styles.petCardContent}>
              <div className={styles.petCardHeader}>
                <div className={styles.avatarWrapper}>
                  <img
                    src={pawIcon}
                    alt="Paw icon"
                    className={styles.avatarImg}
                  />
                </div>
                <div className={styles.petInfo}>
                  <h3 className={styles.petName}>Rich</h3>
                  <p className={styles.petBirthday}>
                    Birthday: <span className={styles.date}>21.09.2020</span>
                  </p>
                </div>
              </div>

              <p className={styles.petDesc}>
                Rich would be the perfect addition to an active family that
                loves to play and go on walks. I bet he would love having a
                doggy playmate too!
              </p>
            </div>
          </div>
        </section>

        <section className={styles.formBlock}>
          <div className={styles.formWrap}>
            <h1 className={styles.title}>Log in</h1>
            <p className={styles.subtitle}>
              Welcome! Please enter your credentials to login to the platform:
            </p>

            <LoginForm />

            <p className={styles.switchText}>
              Don't have an account?{" "}
              <Link to="/register" className={styles.switchLink}>
                Register
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
