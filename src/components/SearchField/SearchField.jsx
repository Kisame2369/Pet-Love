import SearchIcon from "../../assets/icons/search.svg?react";
import CloseIcon from "../../assets/icons/close.svg?react";
import { useState } from "react";
import styles from "./SearchField.module.css";

export default function SearchField({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={handleClear}
          aria-label="Temizle"
        >
          <CloseIcon className={styles.clearIcon} />
        </button>
      )}
      <button type="submit" className={styles.searchBtn} aria-label="Ara">
        <SearchIcon className={styles.searchIcon} />
      </button>
    </form>
  );
}
