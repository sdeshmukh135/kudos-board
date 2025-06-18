import stockImage from "/src/assets/stockImage.jpg";
import "./BoardCard.css";
import { Link } from "react-router-dom";

const BoardCard = (props) => {
  // edit with props for furture additions
  console.log(props.id);
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
        <button type="button" id="changeBoard">
          Delete Board
        </button>
      </div>
    </div>
  );
};

export default BoardCard;
