import { useState } from "react";
import css from "./SearchBar.module.css";
export default function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
        onSearch(searchValue.trim());
        setSearchValue("");
    }
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const handleSearchClick = () => {
    if (searchValue.trim()) {
        onSearch(searchValue.trim());
        setSearchValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={css.searchBar}>
        <input
          className={css.searchInput}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
        />
        <div className={css.buttons}>
          
          {searchValue && (
            <button
              className={css.button}
              type="button"
              onClick={handleClear}
            >
              <svg width="18" height="18">
                <use xlinkHref="/sprite.svg#icon-cross"></use>
              </svg>
            </button>
          )}
          
          <button
            className={css.button}
            type="button"
            onClick={handleSearchClick}
          >
            <svg width="18" height="18">
              <use xlinkHref="/sprite.svg#icon-search"></use>
            </svg>
          </button>
          
        </div>
      </div>
    </form>
  );
}