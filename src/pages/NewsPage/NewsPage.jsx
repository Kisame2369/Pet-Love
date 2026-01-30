import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../redux/news/operations.js";
import { selectNews, selectNewsPage, selectNewsTotalPages } from "../../redux/news/selector.js";
import NewsItem from "../../components/NewsItem/NewsItem.jsx";
import css from "./NewsPage.module.css";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Title from "../../components/Title/Title.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { setNewsPage } from "../../redux/news/slice.js";

export default function NewsPage() {
    
    const dispatch = useDispatch();

    const newsItems = useSelector(selectNews);
    const page = useSelector(selectNewsPage);
    const totalPages = useSelector(selectNewsTotalPages);
    
    const [keyword, setKeyword] = useState("");
    
    useEffect(() => {
        dispatch(fetchNews({ keyword, page, limit: 6 }));
    }, [dispatch, keyword, page]);

    const handleSearch = (searchKeyword) => {
        setKeyword(searchKeyword);
        dispatch(setNewsPage(1)); 
    };

    const handlePageChange = (newPage) => {
        dispatch(setNewsPage(newPage));
    };

    return (
        <>
        <Title title="News" />    
        <SearchBar onSearch={handleSearch}/>
        <div className={css.newsPage}>
            <ul className={css.newsList}>
                {newsItems.map((item) => (
                    <li key={item.id} className={css.newsListItem}>
                        <NewsItem item={item} />
                    </li>
                ))}
            </ul>
            </div>
            <Pagination 
                page={page} 
                totalPages={totalPages}
                setPage={handlePageChange}
            />
        </>
    );
}