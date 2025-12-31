import css from "./MainPage.module.css";
import { useSelector } from "react-redux";
export default function MainPage() {
    const news = useSelector((state) => state.news.items);
    console.log(news);
    return (
        <div className={css.mainPage}>
            <img className={css.image} src="/image@1-min.png" srcSet="/image@2-min.png 2x," alt="Main Photo"/>
        </div>
    );
}