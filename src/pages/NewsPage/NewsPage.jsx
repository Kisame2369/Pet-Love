import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../redux/news/newsOperations";
import { setPage } from "../../redux/news/newsSlice";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
import NewsItem from "../../components/NewsItem/NewsItem";
import Pagination from "../../components/Pagination/Pagination";
import SearchField from "../../components/SearchField/SearchField";
import styles from "./NewsPage.module.css";

export default function NewsPage() {
  const dispatch = useDispatch();
  const { items, page, totalPages, isLoading } = useSelector(
    (state) => state.news,
  );
  const [keyword, setKeyword] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchNews({ page, keyword }));
  }, [dispatch, page, keyword]);

  const handleSearch = (value) => {
    setKeyword(value);
    dispatch(setPage(1));
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.page}>
        <Header variant="light" authenticated={isAuthenticated} />

        <main className={styles.main}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>News</h1>
            <SearchField onSearch={handleSearch} />
          </div>

          {isLoading && <Loader />}

          {!isLoading && (
            <>
              <ul className={styles.list}>
                {items.map((item) => (
                  <NewsItem key={item._id} item={item} />
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

    </div>
  );
}
