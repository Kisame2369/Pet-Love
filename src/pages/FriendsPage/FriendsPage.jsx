import css from '../NewsPage/NewsPage.module.css';
import Title from '../../components/Title/Title.jsx';
import FriendsItem from '../../components/NewsItem/NewsItem.jsx';
import { useSelector } from 'react-redux';
import { selectFriends } from '../../redux/friends/selector.js';
export default function FriendsPage() {

    const friends = useSelector(selectFriends);

    return (
            <>
            <Title title="Our Friends" />    
            <div className={css.friendsPage}>
                <ul className={css.friendsList}>
                    {friends.map((item) => (
                        <li key={item.id} className={css.friendsListItem}>
                            <FriendsItem item={item} />
                        </li>
                    ))}
                </ul>
                </div>
            </>
        );
}