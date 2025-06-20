import { useState, useEffect } from "react";
import "./PopUpModal.css";

const PopUpModal = (props) => {
  const isAuthor = props.author !== ""; // if an author has been specified or not
  const [commentsList, setCommentsList] = useState(null); // to find the commments for a card


  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    fetch(`${import.meta.env.VITE_API_URL}/cards/${props.cardData.id}/comments`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        // Handle successful response
        console.log("Comments:", data);
        // Update UI or perform other actions with the data
        setCommentsList(data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching comments:", error);
        // Display an error message
      });
  };

  const closeModal = () => {
    props.setPopModalData(null);
  };

  return (
    <div className="modal-container" onClick={closeModal}>
      <div
        className="createComment-content"
        onClick={(element) => element.stopPropagation()}
      >
        <h1>{props.cardData.description}</h1>
        <img className="kudosPic" src={props.cardData.gifURL} alt="GIF" />
        {isAuthor && <h2>Author: {props.cardData.author}</h2>}
        <h2>Comments:</h2>
        {commentsList && (
          <div className="commentDetails">
            {
              // map names of genres to output

              commentsList.map((object) => {
                return (
                  <div className="comments">
                    <h2>{object.message}</h2>
                    {object.author != "" && <h3>Author: {object.author}</h3>}
                  </div>
                );
              })
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default PopUpModal;
