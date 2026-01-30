import { useEffect } from 'react';
import css from './FriendsPage.module.css';
import Title from '../../components/Title/Title.jsx';
import FriendsItem from '../../components/FriendsItem/FriendsItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectFriends } from '../../redux/friends/selector.js';
import { fetchFriends } from '../../redux/friends/operations.js';

export default function FriendsPage() {
    const dispatch = useDispatch();
    const friends = useSelector(selectFriends);

    useEffect(() => {
        dispatch(fetchFriends());
    }, [dispatch]);

    return (
        <>
            <Title title="Our Friends" />    
            <div className={css.friendsPage}>
                <ul className={css.friendsList}>
                    {friends.map((item) => (
                        <li key={item._id} className={css.friendsListItem}>
                            <FriendsItem item={item} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}