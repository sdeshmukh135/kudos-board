import { useState, useEffect } from "react";
import "./SearchForm.css";

const SearchForm = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (event) => {
    event.preventDefault();
    props.setSearchQuery(searchInput);
  };

  const handleClear = () => {
    setSearchInput("");
    props.setSearchQuery("");
  };

  return (
    <form id="SearchBar" onSubmit={handleSearchChange}>
      <input
        className="searchInput"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        name="search-board"
        placeholder="Enter Board Name"
        required
      />
      <button type="submit" id="submitChange">
        Search
      </button>
      <button type="button" id="submitChange" onClick={() => handleClear()}>
        Clear
      </button>
    </form>
  );
};

export default SearchForm;
