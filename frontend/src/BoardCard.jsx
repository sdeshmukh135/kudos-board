import stockImage from "/src/assets/stockImage.jpg";
import "./BoardCard.css";
import { Link } from "react-router-dom";

const BoardCard = (props) => {
  // edit with props for furture additions
  const handleDelete = () => {
    fetch(`http://localhost:3001/boards/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
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
        props.setBoardData(data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching boards:", error);
        // Display an error message 
      });
  };

  return (
    <div className="board">
      <img className="boardPic" src={stockImage} alt="title" />
      <h2>{props.title}</h2>
      <h3>{props.category}</h3>
      <div className="options">
        <Link
          to={`/board/${encodeURIComponent(props.title)}/${encodeURIComponent(props.id)}`}
        >
          <button type="button" id="changeBoard">
            View Board
          </button>
        </Link>
        <button type="button" id="changeBoard" onClick={handleDelete}>
          Delete Board
        </button>
      </div>
    </div>
  );
};

export default BoardCard;
