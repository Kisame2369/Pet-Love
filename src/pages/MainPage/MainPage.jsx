import css from "./MainPage.module.css";

export default function MainPage() {
    return (
        <div className={css.mainPage}>
            <img className={css.image} src="/image@1-min.png" srcSet="/image@2-min.png 2x," alt="Main Photo"/>
        </div>
    );
}