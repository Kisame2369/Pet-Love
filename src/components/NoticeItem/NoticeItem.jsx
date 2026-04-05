import css from './NoticeItem.module.css';
import { Link } from "react-router-dom";

export default function NoticesItem({ item }) {
    
    return (
        <div className={css.noticeItem}>
            <img className={css.image} src={item.imgURL} alt={item.title} />
            <div className={css.top}>
                <p className={css.title}>{item.title}</p>
                <div className={css.popularity}>
                    <svg width="16" height="16">
                        <use xlinkHref="/sprite.svg#icon-star"></use>
                    </svg>
                    <span>{item.popularity}</span>
                </div>
            </div>
            <div className={css.info}>
                <div className={css.category}>Name <p className={css.categoryText}>{item.name}</p></div>
                <div className={css.category}>Birthday <p className={css.categoryText}>{item.birthday}</p></div>
                <div className={css.category}>Sex <p className={css.categoryText}>{item.sex}</p></div>
                <div className={css.category}>Species <p className={css.categoryText}>{item.species}</p></div>
                <div className={css.category}>Category <p className={css.categoryText}>{item.category}</p></div>
            </div>
            <p className={css.descr}>{item.comment}</p>
            <p className={css.price}>{item.price ? `$${item.price}` : 'Free'}</p>
            <div className={css.buttons}>
                <Link to={`/catalog/${item._id}`}>
                    <button className={css.buttonLearn}>Learn More</button>
                </Link>
                <button className={css.favorite}>
                    <svg width="18" height="18">
                        <use xlinkHref="/sprite.svg#icon-heart"></use>
                    </svg>
                </button>
            </div>
        </div>
    );
}