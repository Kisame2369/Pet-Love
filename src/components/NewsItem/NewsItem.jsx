import styles from "./NewsItem.module.css";

export default function NewsItem({ item }) {
  const { imgUrl, title, text, date, url } = item;

  const formattedDate = new Date(date).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <li className={styles.card}>
      <img src={imgUrl} alt={title} className={styles.img} />
      <div className={styles.body}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
        <div className={styles.footer}>
          <span className={styles.date}>{formattedDate}</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.readMore}
          >
            Read more
          </a>
        </div>
      </div>
    </li>
  );
}
