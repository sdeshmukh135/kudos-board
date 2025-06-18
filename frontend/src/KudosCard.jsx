import "./KudosCard.css";

const KudosCard = (props) => {
    const handleDelete = () => {
        fetch(`http://localhost:3001/cards/${props.id}`, {
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
        props.setCardData(data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching boards:", error);
        // Display an error message or retry the request
      });
    }

  return (
    <div className="kudosCard">
      <h2>{props.title}</h2>
      <h3>{props.description}</h3>
      <img className="kudosPic" src={props.gifURL} alt="GIF" />
      <div className="options">
        <button type="button" id="changeCard">
          Upvote
        </button>
        <button type="button" id="changeCard" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default KudosCard;
