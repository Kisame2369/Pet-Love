import Header from "../../components/Header/Header";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import styles from "./RegisterPage.module.css";
import { Link } from "react-router-dom";
import catHero from "../../assets/images/cat-hero.webp";
import pawIcon from "../../assets/images/paw-cat.webp";

export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <Header variant="light" />

      <main className={styles.mainContent}>
        <section className={styles.imgBlock}>
          <img src={catHero} alt="Jack the Cat" className={styles.catImg} />

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
                  <h3 className={styles.petName}>Jack</h3>
                  <p className={styles.petBirthday}>
                    Birthday: <span className={styles.date}>18.10.2021</span>
                  </p>
                </div>
              </div>

              <p className={styles.petDesc}>
                Jack is a calm and friendly cat who loves attention. He's great
                with kids, enjoys being petted and groomed, and enjoys playing
                with toys.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.formBlock}>
          <div className={styles.formWrap}>
            <h1 className={styles.title}>Registration</h1>
            <p className={styles.subtitle}>
              Thank you for your interest in our platform.
            </p>

            <RegisterForm />

            <p className={styles.switchText}>
              Already have an account?{" "}
              <Link to="/login" className={styles.switchLink}>
                Login
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
