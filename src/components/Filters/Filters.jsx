import css from './Filters.module.css';
import SearchBar from '../SearchBar/SearchBar';
import Select, { components } from 'react-select';
import { selectCategories, selectSex, selectSpecies } from '../../redux/notices/selector';
import { selectCities } from '../../redux/cities/selector';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { selectStyles, selectStylesType, selectStylesLocation } from './Styles';
import { fetchCities } from '../../redux/cities/operations';

const ClearIndicator = (props) => {
    return (
        <components.ClearIndicator {...props}>
            <svg width="18" height="18">
                <use xlinkHref="/sprite.svg#icon-cross"></use>
            </svg>
        </components.ClearIndicator>
    );
};

const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <svg width="18" height="18">
                <use xlinkHref="/sprite.svg#icon-search"></use>
            </svg>
        </components.DropdownIndicator>
    );
};

const formatOptionLabel = ({ label }, { inputValue }) => {
    if (!inputValue) return label;
    
    const parts = label.split(new RegExp(`(${inputValue})`, 'gi'));
    
    return (
        <span>
            {parts.map((part, index) => 
                part.toLowerCase() === inputValue.toLowerCase() ? (
                    <span key={index} style={{ color: 'var(--black)' }}>{part}</span>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </span>
    );q
};

export default function Filters({ onSearch, onFilterChange }) {
    const dispatch = useDispatch();
    
    const categories = useSelector(selectCategories);
    const genders = useSelector(selectSex);
    const types = useSelector(selectSpecies);
    const cities = useSelector(selectCities);
    
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locationInputValue, setLocationInputValue] = useState('');
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        if (locationInputValue.length >= 2) {
            dispatch(fetchCities({ keyword: locationInputValue }));
        }
    }, [locationInputValue, dispatch]);

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

    const locationOptions = cities.map(city => ({
        value: city._id,
        label: `${city.cityEn}, ${city.stateEn}`
    }));

    const handleLocationMenuOpen = () => {
        if (locationInputValue.trim() && locationOptions.length > 0) {
            return;
        }
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        if (onFilterChange) {
            onFilterChange({
                category: selectedCategory?.value !== 'all' ? selectedCategory?.value : null,
                sex: selectedGender?.value !== 'all' ? selectedGender?.value : null,
                species: selectedType?.value !== 'all' ? selectedType?.value : null,
                sortBy: value
            });
        }
    };

    const handleReset = () => {
        setSelectedCategory(null);
        setSelectedGender(null);
        setSelectedType(null);
        setSortBy('');
        if (onSearch) {
            onSearch('');
        }
        if (onFilterChange) {
            onFilterChange({
                category: null,
                sex: null,
                species: null,
                sortBy: ''
            });
        }
    };

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
            <Select
                options={locationOptions}
                value={selectedLocation}
                onChange={setSelectedLocation}
                onInputChange={setLocationInputValue}
                inputValue={locationInputValue}
                onMenuOpen={handleLocationMenuOpen}
                styles={selectStylesLocation}
                placeholder="Location"
                noOptionsMessage={() => locationInputValue.length < 2 ? 'Type to search...' : 'No locations found'}
                isClearable
                filterOption={() => true}
                formatOptionLabel={formatOptionLabel}
                components={{
                    ClearIndicator,
                    DropdownIndicator
                }}
            />
            <div className={css.radioContainer}>
                <label className={css.radioLabel}>
                    <input
                        type="radio"
                        name="sort"
                        value="cheap"
                        checked={sortBy === 'cheap'}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className={css.radioInput}
                    />
                    <span className={css.radioText}>cheap</span>
                </label>

                <label className={css.radioLabel}>
                    <input
                        type="radio"
                        name="sort"
                        value="expensive"
                        checked={sortBy === 'expensive'}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className={css.radioInput}
                    />
                    <span className={css.radioText}>expensive</span>
                </label>

                <label className={css.radioLabel}>
                    <input
                        type="radio"
                        name="sort"
                        value="popular"
                        checked={sortBy === 'popular'}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className={css.radioInput}
                    />
                    <span className={css.radioText}>popular</span>
                </label>

                <label className={css.radioLabel}>
                    <input
                        type="radio"
                        name="sort"
                        value="unpopular"
                        checked={sortBy === 'unpopular'}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className={css.radioInput}
                    />
                    <span className={css.radioText}>unpopular</span>
                </label>
            </div>

            <button 
                type="button" 
                onClick={handleReset}
                className={css.resetButton}
            >
                Reset
            </button>
        </div>
    );
}