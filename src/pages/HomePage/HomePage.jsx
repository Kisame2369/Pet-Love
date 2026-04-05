import Header from "../../components/Header/Header";
import heroBg1x from "../../assets/images/home-hero@1x.webp";
import heroBg2x from "../../assets/images/home-hero@2x.webp";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.page}>
        <section className={styles.heroCard}>
          <Header variant="dark" />
          <div className={styles.heroText}>
            <h1 className={styles.title}>
              Take good <span className={styles.titleAccent}>care</span> of your
              small pets
            </h1>
            <p className={styles.description}>
              Choosing a pet for your home is a choice that is meant to enrich
              your life with immeasurable joy and tenderness.
            </p>
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
