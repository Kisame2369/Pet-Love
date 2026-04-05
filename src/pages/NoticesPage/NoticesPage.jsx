import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotices,
  fetchCategories,
  fetchSpecies,
  fetchSex,
} from "../../redux/notices/noticesOperations";
import {
  setPage,
  setFilters,
  resetFilters,
} from "../../redux/notices/noticesSlice";
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import NoticesFilters from "../../components/NoticesFilters/NoticesFilters";
import NoticesItem from "../../components/NoticesItem/NoticesItem";
import Pagination from "../../components/Pagination/Pagination";
import DogModalImage from "../../assets/images/paw-dog.webp";
import CloseIcon from "../../assets/icons/close.svg?react";
import styles from "./NoticesPage.module.css";

export default function NoticesPage() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const {
    items,
    page,
    totalPages,
    filters,
    isLoading,
    categories,
    species,
    sex,
  } = useSelector((state) => state.notices);

  const [modalAttention, setModalAttention] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSpecies());
    dispatch(fetchSex());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchNotices({ page, limit: 6, ...filters }));
  }, [dispatch, page, filters]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setModalAttention(false);
        document.body.classList.remove("menu-open");
      }
    };

    if (modalAttention) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [modalAttention]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseModal = () => {
    setModalAttention(false);
    document.body.classList.remove("menu-open");
  };

  const handleAttention = () => {
    setModalAttention(true);
    document.body.classList.add("menu-open");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.page}>
        <Header variant="light" authenticated={isAuthenticated} />

        <main className={styles.main}>
          <h1 className={styles.title}>Find your favorite pet</h1>

          <NoticesFilters
            categories={categories}
            species={species}
            sex={sex}
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />

          {isLoading && <Loader />}

          {!isLoading && (
            <>
              <ul className={styles.list}>
                {items.map((item) => (
                  <NoticesItem
                    key={item._id}
                    item={item}
                    onAttention={handleAttention}
                  />
                ))}
              </ul>

              {totalPages > 1 && (
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </main>
      </div>

      {modalAttention && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={handleCloseModal}
              type="button"
            >
              <CloseIcon className={styles.closeIcon} />
            </button>
            <div className={styles.modalIconWrap}>
              <img
                src={DogModalImage}
                alt="Animated dog"
                className={styles.modalDogImage}
              />
            </div>
            <h2 className={styles.modalTitle}>Attention</h2>
            <p className={styles.modalText}>
              We would like to remind you that certain functionality is
              available only to authorized users. If you have an account, please
              log in with your credentials. If you do not already have an
              account, you must register to access these features.
            </p>
            <div className={styles.modalActions}>
              <Link to="/login" className={styles.modalBtnLogin}>
                Log In
              </Link>
              <Link to="/register" className={styles.modalBtnRegister}>
                Registration
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
