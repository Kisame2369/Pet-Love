import Header from "../../components/Header/Header";
import heroBg1x from "../../assets/images/home-hero@1x.webp";
import heroBg2x from "../../assets/images/home-hero@2x.webp";
import styles from "./HomePage.module.css";
import { useSelector } from "react-redux";


export default function HomePage() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className={styles.pageContainer}>
      <main className={styles.page}>
        <section className={styles.heroCard}>
          <Header variant="dark" authenticated={isAuthenticated} />
          <div className={styles.heroText}>
            <h1 className={styles.title}>
              Take good <span className={styles.titleAccent}>care</span> of your
              small pets
            </h1>
          </div>
        </section>

        <div className={styles.imageWrap}>
          <img
            className={styles.heroImg}
            src={heroBg1x}
            srcSet={`${heroBg1x} 1x, ${heroBg2x} 2x`}
            alt="Pet adoption and care hero image"
          />
        </div>
      </main>
    </div>
  );
}
