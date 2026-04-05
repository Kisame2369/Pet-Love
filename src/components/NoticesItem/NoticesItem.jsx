import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/auth/authSlice";
import ModalNotice from "../ModalNotice/ModalNotice";
import ModalCongrats from "../ModalCongrats/ModalCongrats";
import StarIcon from "../../assets/icons/star.svg?react";
import HeartIcon from "../../assets/icons/heart.svg?react";
import TrashIcon from "../../assets/icons/trash.svg?react";
import styles from "./NoticesItem.module.css";

export default function NoticesItem({
  item,
  onAttention,
  isFavoritePage = false,
  showFavoriteBtn = true,
}) {
  const dispatch = useDispatch();
  const { user, isAuthenticated, token } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const {
    imgURL,
    title,
    name,
    birthday,
    sex,
    species,
    category,
    comment,
    price,
    popularity,
  } = item;

  const isFavorite = user?.noticesFavorites?.some((fav) => {
    const favId = typeof fav === "object" ? fav._id : fav;
    return favId === item._id;
  });

  const formattedDate = birthday
    ? new Date(birthday).toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "—";

  const handleLearnMore = async () => {
    if (!isAuthenticated) {
      onAttention(item);
    } else {
      try {
        await axios.get(
          `https://petlove.b.goit.study/api/notices/${item._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const alreadyViewed = user?.noticesViewed?.some((view) => {
          const viewId = typeof view === "object" ? view._id : view;
          return viewId === item._id;
        });

        if (!alreadyViewed) {
          const updatedViewed = [item, ...(user.noticesViewed || [])];
          dispatch(updateUser({ noticesViewed: updatedViewed }));
        }

        setShowModal(true);
      } catch (error) {
        console.error("Viewed error:", error);
        setShowModal(true);
      }
    }
  };

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      onAttention();
      return;
    }

    try {
      const isRemove = isFavoritePage || isFavorite;
      const url = `https://petlove.b.goit.study/api/notices/favorites/${isRemove ? "remove" : "add"}/${item._id}`;
      const method = isRemove ? "delete" : "post";

      await axios({
        method: method,
        url: url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (isFavoritePage) {
        const updatedFavorites = user.noticesFavorites.filter((fav) => {
          const favId = typeof fav === "object" ? fav._id : fav;
          return favId !== item._id;
        });
        dispatch(updateUser({ noticesFavorites: updatedFavorites }));
      } else {
        if (isRemove) {
          const updatedFavorites = user.noticesFavorites.filter((fav) => {
            const favId = typeof fav === "object" ? fav._id : fav;
            return favId !== item._id;
          });
          dispatch(updateUser({ noticesFavorites: updatedFavorites }));
        } else {
          const updatedFavorites = [...(user.noticesFavorites || []), item];
          dispatch(updateUser({ noticesFavorites: updatedFavorites }));
        }
      }
    } catch (error) {
      console.error("Favorite error:", error);
    }
  };

  return (
    <>
      <li className={styles.card}>
        <div className={styles.imgWrap}>
          <img src={imgURL} alt={title} className={styles.img} />
        </div>

        <div className={styles.body}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.popularity}>
              <StarIcon className={styles.starIcon} />
              <span>{popularity}</span>
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Name</span>
              <span className={styles.infoValue}>{name}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Birthday</span>
              <span className={styles.infoValue}>{formattedDate}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Sex</span>
              <span className={styles.infoValue}>{sex}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Species</span>
              <span className={styles.infoValue}>{species}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Category</span>
              <span className={styles.infoValue}>{category}</span>
            </div>
          </div>

          <p className={styles.comment}>{comment}</p>

          <div className={styles.footer}>
            <div className={styles.priceContainer}>
              {price ? (
                <span className={styles.price}>{price}$</span>
              ) : (
                <div className={styles.priceEmpty}></div>
              )}
            </div>

            <div className={styles.actions}>
              <button className={styles.learnMore} onClick={handleLearnMore}>
                Learn more
              </button>
              {showFavoriteBtn && (
                <button
                  className={
                    isFavoritePage
                      ? styles.trashBtn
                      : `${styles.heartBtn} ${isFavorite ? styles.isFavorite : ""}`
                  }
                  onClick={handleFavorite}
                  type="button"
                >
                  {isFavoritePage ? (
                    <TrashIcon className={styles.trashIcon} />
                  ) : (
                    <HeartIcon className={styles.heartIcon} />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </li>

      {showModal && (
        <ModalNotice
          item={item}
          onClose={() => setShowModal(false)}
          onOpenCongrats={() => {
            setShowModal(false);
            setShowCongrats(true);
          }}
        />
      )}

      {showCongrats && <ModalCongrats onClose={() => setShowCongrats(false)} />}
    </>
  );
}
