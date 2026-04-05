import { useState, useRef, useEffect } from "react";
import SearchIcon from "../../assets/icons/search.svg?react";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg?react";
import CloseIcon from "../../assets/icons/close.svg?react";
import styles from "./NoticesFilters.module.css";

const SORT_OPTIONS = [
  { label: "Popular", value: "byPopularity" },
  { label: "Unpopular", value: "unpopular" },
  { label: "Cheap", value: "byPrice" },
  { label: "Expensive", value: "expensive" },
];

function Dropdown({ placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = options.find((o) => o === value);

  return (
    <div className={styles.dropdownWrap} ref={ref}>
      <button
        className={`${styles.dropdownBtn} ${open ? styles.dropdownBtnOpen : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <span
          className={`${styles.dropdownLabel} ${value ? styles.dropdownLabelSelected : ""}`}
        >
          {selected || placeholder}
        </span>
        <ChevronDownIcon
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>

      {open && (
        <ul className={styles.dropdownList}>
          <li
            className={`${styles.dropdownItem} ${styles.dropdownItemShowAll}`}
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
          >
            Show all
          </li>
          {options.map((opt) => (
            <li
              key={opt}
              className={`${styles.dropdownItem} ${value === opt ? styles.dropdownItemActive : ""}`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function NoticesFilters({
  categories,
  species,
  sex,
  filters,
  onFilterChange,
}) {
  const [activeSort, setActiveSort] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [locations, setLocations] = useState([]);
  const [showLocations, setShowLocations] = useState(false);
  const locationRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target))
        setShowLocations(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") onFilterChange({ keyword });
  };
  const handleSearchClick = () => {
    onFilterChange({ keyword });
  };

  const handleLocationInput = (e) => {
    const value = e.target.value;
    onFilterChange({ locationId: value });
    if (value.length >= 2) {
      setLocations([
        { id: "1", name: "Odeska, Pasytsely" },
        { id: "2", name: "Odeska, Novoselivka" },
        { id: "3", name: "Odeska, Novoivanivka" },
      ]);
      setShowLocations(true);
    } else {
      setShowLocations(false);
    }
  };

  const handleSort = (option) => {
    if (activeSort === option.value) {
      setActiveSort(null);
      onFilterChange({ byPopularity: undefined, byPrice: undefined });
      return;
    }
    setActiveSort(option.value);
    if (option.value === "byPopularity") {
      onFilterChange({ byPopularity: true, byPrice: undefined });
    } else if (option.value === "unpopular") {
      onFilterChange({ byPopularity: false, byPrice: undefined });
    } else if (option.value === "byPrice") {
      onFilterChange({ byPrice: true, byPopularity: undefined });
    } else if (option.value === "expensive") {
      onFilterChange({ byPrice: false, byPopularity: undefined });
    }
  };

  const handleClearLocation = () => {
    onFilterChange({ locationId: "" });
    setShowLocations(false);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.inputsGrid}>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleSearch}
          />
          <div className={styles.inputActionBtns}>
            {keyword && (
              <button
                className={styles.clearBtn}
                onClick={() => {
                  setKeyword("");
                  onFilterChange({ keyword: "" });
                }}
                type="button"
              >
                <CloseIcon className={styles.clearIcon} />
              </button>
            )}
            <button
              className={styles.inputIconBtn}
              onClick={handleSearchClick}
              type="button"
            >
              <SearchIcon className={styles.inputIcon} />
            </button>
          </div>
        </div>

        <Dropdown
          placeholder="Category"
          options={categories}
          value={filters.category}
          onChange={(val) => onFilterChange({ category: val })}
        />
        <Dropdown
          placeholder="By gender"
          options={sex}
          value={filters.sex}
          onChange={(val) => onFilterChange({ sex: val })}
        />
        <Dropdown
          placeholder="By type"
          options={species}
          value={filters.species}
          onChange={(val) => onFilterChange({ species: val })}
        />

        <div className={styles.inputWrap} ref={locationRef}>
          <input
            className={styles.input}
            type="text"
            placeholder="Location"
            value={filters.locationId || ""}
            onChange={handleLocationInput}
            autoComplete="off"
          />
          <div className={styles.inputActionBtns}>
            {filters.locationId && (
              <button
                className={styles.clearBtn}
                onClick={handleClearLocation}
                type="button"
              >
                <CloseIcon className={styles.clearIcon} />
              </button>
            )}
            <button className={styles.inputIconBtn} type="button">
              <SearchIcon className={styles.inputIcon} />
            </button>
          </div>

          {showLocations && locations.length > 0 && (
            <ul className={styles.locationList}>
              {locations.map((loc) => {
                const userInput = filters.locationId || "";
                const index = loc.name
                  .toLowerCase()
                  .indexOf(userInput.toLowerCase());

                if (index !== -1) {
                  const before = loc.name.substring(0, index);
                  const match = loc.name.substring(
                    index,
                    index + userInput.length,
                  );
                  const after = loc.name.substring(index + userInput.length);

                  return (
                    <li
                      key={loc.id}
                      className={styles.locationItem}
                      onClick={() => {
                        onFilterChange({ locationId: loc.name });
                        setShowLocations(false);
                      }}
                    >
                      <span className={styles.remainingText}>{before}</span>
                      <span className={styles.matchText}>{match}</span>
                      <span className={styles.remainingText}>{after}</span>
                    </li>
                  );
                }
                return (
                  <li
                    key={loc.id}
                    className={styles.locationItem}
                    onClick={() => {
                      onFilterChange({ locationId: loc.name });
                      setShowLocations(false);
                    }}
                  >
                    <span className={styles.remainingText}>{loc.name}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.sortRow}>
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.value}
            className={`${styles.sortBtn} ${activeSort === option.value ? styles.sortBtnActive : ""}`}
            onClick={() => handleSort(option)}
            type="button"
          >
            {option.label}
            {activeSort === option.value && (
              <CloseIcon className={styles.sortX} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
