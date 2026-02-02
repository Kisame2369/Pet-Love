import css from './Filters.module.css';
import SearchBar from '../SearchBar/SearchBar';
import Select from 'react-select';
import { selectCategories, selectSex, selectSpecies } from '../../redux/notices/selector';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { selectStyles, selectStylesType } from './Styles';

export default function Filters({ onSearch }) {

    const categories = useSelector(selectCategories);
    const genders = useSelector(selectSex);
    const types = useSelector(selectSpecies);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedType, setSelectedType] = useState(null);


    const categoriesOptions = [
        { value: 'all', label: 'Show All' },
        ...categories.map(category => ({
            value: category.toLowerCase(),
            label: category.charAt(0).toUpperCase() + category.slice(1)
        }))
    ];

    const sexOptions = [
        { value: 'all', label: 'Show All' },
        ...genders.map(gender => ({
            value: gender.toLowerCase(),
            label: gender.charAt(0).toUpperCase() + gender.slice(1)
        }))
    ];

    const speciesOptions = [
        { value: 'all', label: 'Show All' },
        ...types.map(type => ({
            value: type.toLowerCase(),
            label: type.charAt(0).toUpperCase() + type.slice(1)
        }))
    ];

    return (
        <div className={css.filters}>
            <SearchBar onSearch={onSearch} />
            <Select
                options={categoriesOptions}
                value={selectedCategory}
                onChange={setSelectedCategory}
                styles={selectStyles}
                placeholder="Category"
            />
            <Select
                options={sexOptions}
                value={selectedGender}
                onChange={setSelectedGender}
                styles={selectStyles}
                placeholder="By gender"
            />
            <Select
                options={speciesOptions}
                value={selectedType}
                onChange={setSelectedType}
                styles={selectStylesType}
                placeholder="By type"
            />
        </div>
    );
}
