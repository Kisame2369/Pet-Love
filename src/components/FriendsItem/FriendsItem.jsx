import styles from "./FriendsItem.module.css";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function FriendsItem({ item, index }) {
  const { title, url, addressUrl, imageUrl, address, workDays, phone, email } =
    item;
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;
  const todaySchedule = workDays?.[todayIndex];

  return (
    <li className={styles.card} style={{ animationDelay: `${index * 0.1}s` }}>
      <div className={styles.top}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.logoWrap}
        >
          <img src={imageUrl} alt={title} className={styles.logo} />
        </a>
        <div className={styles.headerContent}>
          <div className={styles.titleAndBadge}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.title}
            >
              {title}
            </a>
            <div className={styles.scheduleBadge}>
              {todaySchedule && todaySchedule.isOpen
                ? `${todaySchedule.from} - ${todaySchedule.to}`
                : "Day and night"}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.label}>Email:</span>
          {email ? (
            <a href={`mailto:${email}`} className={styles.link}>
              {email}
            </a>
          ) : (
            <span className={styles.textOnly}></span>
          )}
        </div>

        <div className={styles.detailItem}>
          <span className={styles.label}>Address:</span>
          {address ? (
            <a
              href={addressUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {address}
            </a>
          ) : (
            <span className={styles.textOnly}></span>
          )}
        </div>

        <div className={styles.detailItem}>
          <span className={styles.label}>Phone:</span>
          {phone ? (
            <a href={`tel:${phone}`} className={styles.link}>
              {phone}
            </a>
          ) : (
            <span className={styles.textOnly}></span>
          )}
        </div>
      </div>
    </li>
  );
}
