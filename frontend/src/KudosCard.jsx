import "./KudosCard.css";
import { useState, useEffect } from "react";
import redPin from "/src/assets/redPin.png";
import whitePin from "/src/assets/whitePin.png"

const KudosCard = (props) => {
  const [upvoteCount, setUpvoteCount] = useState(props.upvotes); // starting amount of upvotes


  const openModal = (event) => {
    event.stopPropagation();
    props.setCommentId(props.id); // id of the card
  };


  const handlePinned = (event) => {
    event.stopPropagation();
    
    // add change to database
    fetch(`http://localhost:3001/cards/${props.id}/pin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        isPinned: !props.isPinned,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        // Handle successful response
        console.log("Cards: ", data);
        // Update UI or perform other actions with the data
        props.setCardData(data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching cards: ", error);
        // Display an error message 
      });

  }

  const openPopUp = () => {
    const modalData = {
      description: props.description,
      gifURL: props.gifURL,
      author: props.author,
      id: parseInt(props.id),
    };
    props.setPopModalData(modalData);
  };

  const handleUpvote = (event) => {
    event.stopPropagation();
    // PUT request
    fetch(`http://localhost:3001/cards/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        upvotes: upvoteCount + 1,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        // Handle successful response
        console.log("Cards: ", data);
        // Update UI or perform other actions with the data
        setUpvoteCount(upvoteCount + 1);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching cards: ", error);
        // Display an error message 
      });
  };

  const handleDelete = (event) => {
    event.stopPropagation();
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
        console.log("Cards", data);
        // Update UI or perform other actions with the data
        props.setCardData(data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching cards:", error);
        // Display an error message or retry the request
      });
  };

  return (
    <div className="kudosCard" onClick={openPopUp}>
      {props.isPinned ? <img className="pin" src={redPin} alt={"Pinned"} onClick={handlePinned}/>:<img className="pin" src={whitePin} alt={"Not pinned"} onClick={handlePinned}/> }
      <h2>{props.title}</h2>
      <h3>{props.description}</h3>
      <img className="kudosPic" src={props.gifURL} alt="GIF" />
      <div className="options">
        <button type="button" id="changeCard" onClick={handleUpvote}>
          Upvote: {upvoteCount}
        </button>
        <button type="button" id="changeCard" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <button type="button" id="comment" onClick={openModal}>
        Comment
      </button>
    </div>
  );
};

export default KudosCard;
