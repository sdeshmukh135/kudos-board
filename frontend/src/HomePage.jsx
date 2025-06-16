import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import BoardList from "./BoardList.jsx";
import SearchForm from "./SearchForm.jsx";
import FilterOptions from "./FilterOptions.jsx";
import { useState } from "react";
import "./HomePage.css";
import CreateModal from "./CreateModal.jsx";
import boards from './data/data.js'

const HomePage = () => {
  const [boardData, setBoardData] = useState(boards); // will update everytime a board is added, deleted, etc.-- intialized to the sample data
  const [isCreate, setIsCreate] = useState(false);

  const openModal = () => {
    setIsCreate(true);
  };


  return (
    <div className="HomePage">
      <Header />
      <SearchForm />
      <FilterOptions />
      <button type="button" id="createBoard" onClick={openModal}>
        Create a New Board
      </button>
      {isCreate && <CreateModal setIsCreate={setIsCreate} boardData = {boardData} setBoardData={setBoardData} />} 
      {boardData && <BoardList boardData={boardData} />}
      <Footer />
    </div>
  );
};

export default HomePage;
