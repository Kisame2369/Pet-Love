import Title from "../../components/Title/Title";
import Filters from "../../components/Filters/Filters";
import { useDispatch,   useSelector } from "react-redux";
import {  useEffect } from "react";
import { fetchCategories, fetchSex, fetchSpecies, fetchNotices } from "../../redux/notices/operations";
import { selectNotices } from "../../redux/notices/selector";

export default function NoticesPage() {

    const dispatch = useDispatch();
    const notices = useSelector(selectNotices);

    useEffect(() => {
        dispatch(fetchCategories({}));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchSex({}));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchSpecies({}));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchNotices({}));
    }, [dispatch]);

    console.log(notices);
    return (
        <div>
            <Title title="Find your favorite pet" />
            <Filters />
            <div >
                <ul >
                    {notices.map((item) => (
                        <li key={item._id}>
                            <NoticesItem item={item} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}