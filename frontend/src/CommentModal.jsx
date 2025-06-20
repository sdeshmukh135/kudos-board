import "./CommentModal.css";
import { useState, useEffect } from "react";

const CommentModal = (props) => {
  const [messageInput, setMessageInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [comment, setComment] = useState(null);

  const handleButtonChange = (event) => {
    event.preventDefault();

    const newComment = {
      message: messageInput,
      author: authorInput,
      cardId: parseInt(props.cardId),
    };
    console.log(newComment);
    setComment(newComment);

    // clear input for the next input
    setMessageInput("");
    setAuthorInput("");
  };

  const closeModal = () => {
    props.setCommentId(0);
  };

  useEffect(() => {
    if (comment != null) {
      handleComment();
    }
  }, [comment]);

  const handleComment = () => {
    fetch(`${import.meta.env.VITE_API_URL}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(comment),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        // Handle successful response
        console.log("Comments: ", data);
        // DO NOTHING (all we want is for it to enter the database)
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching comments:", error);
        // Display an error message or retry the request
      });
  };

  return (
    <div className="create-container" onClick={closeModal}>
      <div
        className="create-content"
        onClick={(element) => element.stopPropagation()}
      >
        <form id="createComment" onSubmit={handleButtonChange}>
          <label htmlFor="message">Message: </label>
          <input
            className="createCommentInput"
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            name="message"
            placeholder="Enter Message"
            required
          />
          <label htmlFor="author">Author: </label>
          <input
            className="createCommentInput"
            type="text"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
            name="message"
            placeholder="Enter Author (optional)"
          />
          <button type="submit" id="submitComment">
            Create Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
