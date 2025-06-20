import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import BoardList from "./BoardList.jsx";
import SearchForm from "./SearchForm.jsx";
import FilterOptions from "./FilterOptions.jsx";
import { useState, useEffect } from "react";
import "./HomePage.css";
import CreateModal from "./CreateModal.jsx";
import lightbulb from "/src/assets/lightbulb.webp";
import Banner from "./Banner.jsx";

const HomePage = ({ isDark, toggleMode }) => {
  const [boardData, setBoardData] = useState(null); // will update everytime a board is added, deleted, etc.-- intialized to the sample data
  const [isCreate, setIsCreate] = useState(false);
  const [filteredData, setFilteredData] = useState(null); // to use if there is filtered data present
  const [searchQuery, setSearchQuery] = useState("");

  const dataToDisplay = filteredData || boardData; // to figure out what data to display

  const openModal = () => {
    setIsCreate(true);
  };

  const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/boards`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        // Handle successful response
        setBoardData(data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching boards:", error);
        // Display an error message
      });
  };

  useEffect(() => {
    fetchData(); // calls an api
  }, []);

  useEffect(() => {
    if (searchQuery != "") {
      handleSearch();
    } else {
      fetchData();
    }
  }, [searchQuery]);

  const handleSearch = () => {
    // search by title and set
    let currentBoardData = [...boardData];
    const newData = currentBoardData.filter(function (object) {
      return object.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setBoardData(newData);
  };

  return (
    <div className="HomePage">
      <img
        className="lightbulbImage"
        src={lightbulb}
        alt="Lightbulb Image"
        onClick={toggleMode}
      />
      <Header />
      <Banner />
      <SearchForm setSearchQuery={setSearchQuery} />
      <FilterOptions
        data={boardData}
        setFilteredData={setFilteredData}
        fetchData={fetchData}
      />
      <button type="button" id="createBoard" onClick={openModal}>
        Create a New Board
      </button>
      {isCreate && (
        <CreateModal setIsCreate={setIsCreate} setBoardData={setBoardData} />
      )}
      {dataToDisplay && (
        <BoardList
          boardData={dataToDisplay}
          setBoardData={filteredData ? setFilteredData : setBoardData}
        />
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
