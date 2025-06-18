import { useState , useEffect} from "react";
import "./BoardPage.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useParams } from "react-router-dom"; // to access the parameters from the link
import CreateCard from "./CreateCard.jsx";
import KudosList from './KudosList.jsx'

const BoardPage = () => {
  const { title , id} = useParams();
  const [isCreate, setIsCreate] = useState(false); // but for Kudos Cards instead
  const [cardData, setCardData] = useState(null);

  const openModal = () => {
    setIsCreate(true);
  };

  const fetchCardData = () => {
    fetch(`http://localhost:3001/boards/${id}/cards`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        // Handle successful response
        console.log("Cards", data);
        // Update UI or perform other actions with the data
        setCardData(data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching boards:", error);
        // Display an error message or retry the request
      });
  }

  useEffect(() => {
    fetchCardData();
  }, [])

  return (
    <div className="boardPage">
      <Header />
      <h2 className="title">{title}</h2>
      <button type="button" id="createBoard" onClick={openModal}>
        Create a New Board
      </button>
      {isCreate && <CreateCard setIsCreate={setIsCreate} />}
      {cardData && <KudosList cardData={cardData} />}
      <Footer />
    </div>
  );
};

export default BoardPage;
