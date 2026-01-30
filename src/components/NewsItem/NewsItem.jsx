import css from "./NewsItem.module.css";

export default function NewsItem({ item }) { 
    return (
        <div className={css.newsCard}>
            <img className={css.newsImage} src={item.imgUrl} alt={item.title} />
            <p className={css.newsTitle}>{item.title}</p>
            <p className={css.newsText}>{item.text}</p>
            <div className={css.newsContainer}>
                <p className={css.newsDate}>
                    {new Date(item.date).toLocaleDateString("en-GB")}
                </p>
                <a className={css.newsUrl} href={item.url}>Read more</a>
            </div>
        </div>
    );
}