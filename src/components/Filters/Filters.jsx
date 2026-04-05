import css from './Filters.module.css';
import SearchBar from '../SearchBar/SearchBar';
import Select, { components } from 'react-select';
import { selectCategories, selectSex, selectSpecies } from '../../redux/notices/selector';
import { selectCities } from '../../redux/cities/selector';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
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
    );

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

    const cityTimeoutRef = useRef(null);

    useEffect(() => {
        if (cityTimeoutRef.current) {
            clearTimeout(cityTimeoutRef.current);
        }

        if (locationInputValue.length >= 2) {
            cityTimeoutRef.current = setTimeout(() => {
                dispatch(fetchCities({ keyword: locationInputValue }));
            }, 300);
        }

        return () => {
            if (cityTimeoutRef.current) {
                clearTimeout(cityTimeoutRef.current);
            }
        };
    }, [locationInputValue, dispatch]);

    useEffect(() => {
    if (onFilterChange) {
        onFilterChange({
            category: selectedCategory?.value !== 'all' ? selectedCategory?.value : null,
            sex: selectedGender?.value !== 'all' ? selectedGender?.value : null,
            species: selectedType?.value !== 'all' ? selectedType?.value : null,
            locationId: selectedLocation?.value || null,
            sortBy: sortBy || null
        });
    }
    }, [selectedCategory, selectedGender, selectedType, selectedLocation, sortBy, onFilterChange]);

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

    const handleReset = () => {
        setSelectedCategory(null);
        setSelectedGender(null);
        setSelectedType(null);
        setSelectedLocation(null);
        setLocationInputValue('');
        setSelectedLocation(null);
        setLocationInputValue('');
        setSortBy('');
        
        if (onSearch) {
            onSearch('');
        }
    };

    return (
        <div className={css.filters}>
            <SearchBar onSearch={onSearch} />
            <div className={css.select}>
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
            </div>
            <Select
                options={speciesOptions}
                value={selectedType}
                onChange={handleTypeChange}
                styles={selectStylesType}
                placeholder="By type"
            />
            
            <Select
                className={css.locationSelect}
                options={locationOptions}
                value={selectedLocation}
                onChange={handleLocationChange}
                onInputChange={setLocationInputValue}
                inputValue={locationInputValue}
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
                {['Cheap', 'Expensive', 'Popular', 'Unpopular'].map((value) => (
                    <label
                        key={value}
                        className={`${css.radioLabel} ${sortBy === value ? css.radioLabelActive : ''}`}
                    >
                        <input
                            type="radio"
                            name="sort"
                            value={value}
                            checked={sortBy === value}
                            onChange={() => setSortBy(sortBy === value ? '' : value)}
                            className={css.radioInput}
                        />
                        <span className={css.radioText}>
                            {value}
                            {sortBy === value && (
                                <svg width="18" height="18">
                                    <use xlinkHref="/sprite.svg#icon-cross"></use>
                                </svg>
                            )}
                        </span>
                    </label>
                ))}

                <button
                    type="button"
                    onClick={handleReset}
                    className={css.resetButton}
                >
                    Reset
                </button>
            </div>

        </div>
    );  
}