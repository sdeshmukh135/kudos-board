import { useState, useEffect } from "react";
import "./BoardPage.css";
import Header from "./Header.jsx";
import { Link, useParams } from "react-router-dom"; // to access the parameters from the link
import CreateCard from "./CreateCard.jsx";
import KudosList from "./KudosList.jsx";
import lightbulb from "/src/assets/lightbulb.webp";

const BoardPage = ({ isDark, toggleMode }) => {
  const { title, id } = useParams();
  const [isCreate, setIsCreate] = useState(false); // but for Kudos Cards instead
  const [commentId, setCommentId] = useState(0); // zero (as indexing begins at 1), when user wants to comment, this updates to the cardId of the comment
  const [cardData, setCardData] = useState(null);
  const [popModalData, setPopModalData] = useState(null); // data for the popup modal for the cards

  const openModal = () => {
    setIsCreate(true);
  };

  const fetchCardData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/boards/${id}/cards`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        // Handle successful response
        setCardData(data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching cards:", error);
        // Display an error message
      });
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  return (
    <div className="boardPage">
      <div className="headerOptions">
        <Link to="/" className="backArrow">
          ⬅
        </Link>

        <img
          className="lightbulbImage"
          src={lightbulb}
          alt="Lightbulb Image"
          onClick={toggleMode}
        />
      </div>

      <Header />
      <h2 className="title">{title}</h2>
      <button type="button" id="createBoard" onClick={openModal}>
        Create a New Card
      </button>
      {isCreate && (
        <CreateCard
          setIsCreate={setIsCreate}
          boardId={id}
          setCardData={setCardData}
        />
      )}
      {cardData && (
        <KudosList
          cardData={cardData}
          setCommentId={setCommentId}
          commentId={commentId}
          setCardData={setCardData}
          popModalData={popModalData}
          setPopModalData={setPopModalData}
        />
      )}
    </div>
  );
};

export default BoardPage;
