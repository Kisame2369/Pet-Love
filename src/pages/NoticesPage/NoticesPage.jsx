import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../components/Title/Title";
import Filters from "../../components/Filters/Filters";
import NoticeItem from "../../components/NoticeItem/NoticeItem";
import Pagination from "../../components/Pagination/Pagination";
import { fetchCategories, fetchSex, fetchSpecies, fetchNotices } from "../../redux/notices/operations";
import { selectNotices, selectNoticesPage, selectNoticesTotalPages } from "../../redux/notices/selector";
import { setNoticesPage } from "../../redux/notices/slice";

export default function NoticesPage() {
    const dispatch = useDispatch();

    const notices = useSelector(selectNotices);
    const page = useSelector(selectNoticesPage);
    const totalPages = useSelector(selectNoticesTotalPages);

    const [keyword, setKeyword] = useState("");
    const [filters, setFilters] = useState({
        category: null,
        sex: null,
        species: null,
        locationId: null,
        sortBy: "",
    });

    const isInitialMount = useRef(true);
    const timeoutRef = useRef(null);

    useEffect(() => {
        dispatch(fetchCategories({}));
        dispatch(fetchSex({}));
        dispatch(fetchSpecies({}));
    }, [dispatch]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            const params = { page, limit: 6 };

            if (keyword) params.keyword = keyword;
            if (filters.category) params.category = filters.category;
            if (filters.sex) params.sex = filters.sex;
            if (filters.species) params.species = filters.species;
            if (filters.locationId) params.locationId = filters.locationId;

            if (filters.sortBy === "cheap") {
                params.byPrice = true;
            } else if (filters.sortBy === "expensive") {
                params.byPrice = false;
            } else if (filters.sortBy === "popular") {
                params.byPopularity = true;
            } else if (filters.sortBy === "unpopular") {
                params.byPopularity = false;
            }

            dispatch(fetchNotices(params));
        }, 300);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [dispatch, keyword, filters, page]);

    const handleSearch = (value) => {
        setKeyword(value);
        dispatch(setNoticesPage(1));
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        dispatch(setNoticesPage(1));
    };

    const handlePageChange = (newPage) => {
        dispatch(setNoticesPage(newPage));
    };

    return (
        <div>
            <Title title="Find your favorite pet" />
            <Filters onSearch={handleSearch} onFilterChange={handleFilterChange} />
            <ul>
                {notices.map((item) => (
                    <li key={item._id}>
                        <NoticeItem item={item} />
                    </li>
                ))}
            </ul>
            <Pagination
                page={page}
                totalPages={totalPages}
                setPage={handlePageChange}
            />
        </div>
    );
}