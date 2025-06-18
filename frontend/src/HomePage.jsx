import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import BoardList from "./BoardList.jsx";
import SearchForm from "./SearchForm.jsx";
import FilterOptions from "./FilterOptions.jsx";
import { useState, useEffect } from "react";
import "./HomePage.css";
import CreateModal from "./CreateModal.jsx";

const HomePage = () => {
  const [boardData, setBoardData] = useState(null); // will update everytime a board is added, deleted, etc.-- intialized to the sample data
  const [isCreate, setIsCreate] = useState(false);

  const openModal = () => {
    setIsCreate(true);
  };

  const fetchData = () => {
    fetch("http://localhost:3001/boards")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        // Handle successful response
        console.log("Boards:", data);
        // Update UI or perform other actions with the data
        setBoardData(data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching boards:", error);
        // Display an error message or retry the request
      });
  };


  useEffect(() => {
    fetchData(); // calls an api
    console.log(boardData);
  }, []);

  return (
    <div className="HomePage">
      <Header />
      <SearchForm />
      <FilterOptions />
      <button type="button" id="createBoard" onClick={openModal}>
        Create a New Board
      </button>
      {isCreate && (
        <CreateModal
          setIsCreate={setIsCreate}
          setBoardData={setBoardData}
        />
      )}
      {boardData && <BoardList boardData={boardData} />}
      <Footer />
    </div>
  );
};

export default HomePage;
