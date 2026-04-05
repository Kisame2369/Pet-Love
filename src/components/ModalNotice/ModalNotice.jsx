import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/auth/authSlice";
import StarIcon from "../../assets/icons/star.svg?react";
import HeartIcon from "../../assets/icons/heart.svg?react";
import CloseIcon from "../../assets/icons/close.svg?react";
import styles from "./ModalNotice.module.css";

export default function ModalNotice({ item, onClose, onOpenCongrats }) {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isFavorite = user?.noticesFavorites?.some((fav) => {
    const favId = typeof fav === "object" ? fav._id : fav;
    return favId === item._id;
  });
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const formattedDate = item.birthday
    ? new Date(item.birthday).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    : "—";

  const handleFavorite = async () => {
    try {
      const wasFirstFavorite =
        !isFavorite &&
        (!user?.noticesFavorites || user.noticesFavorites.length === 0);

      const url = `https://petlove.b.goit.study/api/notices/favorites/${isFavorite ? "remove" : "add"}/${item._id}`;
      const method = isFavorite ? "DELETE" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        const formattedFavorites = result.map((fav) =>
          typeof fav === "string" ? { _id: fav } : fav,
        );
        dispatch(updateUser({ noticesFavorites: formattedFavorites }));

        if (wasFirstFavorite) {
          onOpenCongrats();
        } else {
          onClose();
        }
      }
    } catch (error) {
      console.error("Favorite error:", error);
    }
  };

  const handleContact = () => {};

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <CloseIcon className={styles.closeIcon} />
        </button>

        <div className={styles.categoryBadge}>{item.category}</div>

        <div className={styles.imageWrapper}>
          <img src={item.imgURL} alt={item.title} className={styles.image} />
        </div>

        <h2 className={styles.title}>{item.title}</h2>

        <div className={styles.rating}>
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className={styles.star} />
          ))}
          <span className={styles.ratingCount}>{item.popularity}</span>
        </div>

        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Name</span>
            <span className={styles.infoValue}>{item.name}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Birthday</span>
            <span className={styles.infoValue}>{formattedDate}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Sex</span>
            <span className={styles.infoValue}>{item.sex}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Species</span>
            <span className={styles.infoValue}>{item.species}</span>
          </div>
        </div>

        <p className={styles.comment}>{item.comment}</p>

        <div className={styles.actions}>
          <button className={styles.favoriteBtn} onClick={handleFavorite}>
            {isFavorite ? "Remove from" : "Add to"}{" "}
            <HeartIcon className={styles.heartIcon} />
          </button>
          <button className={styles.contactBtn} onClick={handleContact}>
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}
