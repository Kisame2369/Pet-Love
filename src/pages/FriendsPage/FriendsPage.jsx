import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../../redux/friends/friendsOperations";
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
import FriendsItem from "../../components/FriendsItem/FriendsItem";
import styles from "./FriendsPage.module.css";

export default function FriendsPage() {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.friends);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.page}>
        <Header variant="light" authenticated={isAuthenticated} />
        <main className={styles.main}>
          <h1 className={styles.title}>Our friends</h1>
          {isLoading && <Loader />}
          {!isLoading && (
            <ul className={styles.list}>
              {items.map((item, index) => (
                <FriendsItem key={item._id} item={item} index={index} />
              ))}
            </ul>
          )}
        </main>
      </div>

    </div>
  );
}
