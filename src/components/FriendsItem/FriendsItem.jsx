import css from './FriendsItem.module.css';

export default function FriendsItem({ item }) {
    return (
        <div className={css.friendsCard}>
            <img className={css.friendsImage} src={item.imageUrl} alt={item.title} />
            <p className={css.friendsTitle}>{item.title}</p>
        </div>
    );
 }