import "./KudosCard.css";

const KudosCard = (props) => {
  return (
    <div className="kudosCard">
      <h2>{props.title}</h2>
      <h3>{props.description}</h3>
      <img className="kudosPic" src={props.gifURL} alt="GIF" />
      <div className="options">
        <button type="button" id="changeCard">
          Upvote
        </button>
        <button type="button" id="changeCard">
          Delete
        </button>
      </div>
    </div>
  );
};

export default KudosCard;
