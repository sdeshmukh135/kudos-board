import { useState } from "react";
import "./SearchForm.css";

const SearchForm = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (event) => {
    event.preventDefault();
    //props.onSearchQuery(event.target.elements['search-movie'].value);
  };

  const handleClear = () => {
    setSearchInput("");
    //props.onSearchQuery('');
  };


  return (
    <form id="SearchBar" onSubmit={handleSearchChange}>
      <input className="searchInput"
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
