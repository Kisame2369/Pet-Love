import Title from "../../components/Title/Title";
import Filters from "../../components/Filters/Filters";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories, fetchSex, fetchSpecies } from "../../redux/notices/operations";

export default function NoticesPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories({}));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchSex({}));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchSpecies({}));
    }, [dispatch]);

    return (
        <div>
            <Title title="Find your favorite pet" />
            <Filters />
        </div>
    );
}