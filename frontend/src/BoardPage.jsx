import { useState } from "react";
import "./BoardPage.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useParams } from "react-router-dom"; // to access the parameters from the link
import CreateCard from './CreateCard.jsx'

const BoardPage = () => {
  const { title } = useParams();
  const [isCreate, setIsCreate] = useState(false); // but for Kudos Cards instead

  const openModal = () => {
    setIsCreate(true);
  };

  return (
    <div className="boardPage">
      <Header />
      <h2 className="title">{title}</h2>
      <button type="button" id="createBoard" onClick={openModal}>
        Create a New Board
      </button>
      {isCreate && (
        <CreateCard setIsCreate={setIsCreate}
        />
      )}
      <Footer />
    </div>
  );
};

export default BoardPage;
