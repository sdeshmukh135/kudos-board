import "./CreateModal.css";
import { useState, useEffect } from "react";

const createModal = (props) => {
  // for create a board 
  const [titleInput, setTitleInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // for the category
  const [newBoard, setNewBoard] = useState(null);

  const handleButtonChange = (event) => {
    event.preventDefault();
    const board = {
      title: event.target.elements["title"].value,
      category: selectedCategory,
    };

    setNewBoard(board);
  };

  useEffect(() => {
    if (newBoard != null) {
      handleNewBoard();
    }
  }, [newBoard]);

  const handleNewBoard = () => {
    fetch(`${import.meta.env.VITE_API_URL}/boards/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newBoard),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        // Handle successful response
        props.setBoardData(data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching boards:", error);
        // Display an error message or retry the request
      });
  };

  const closeModal = () => {
    props.setIsCreate(false);
  };

  return (
    <div className="create-container" onClick={closeModal}>
      <div
        className="create-content"
        onClick={(element) => element.stopPropagation()}
      >
        <form id="createBar" onSubmit={handleButtonChange}>
          <label htmlFor="title">Title: </label>
          <input
            className="createInput"
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            name="title"
            placeholder="Title"
            required
          />
          <label htmlFor="category">Category: </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="createInput"
            required
          >
            <option value="" disabled hidden>
              Select a Category:
            </option>
            <option value="Celebration">Celebration</option>
            <option value="Thank You">Thank you</option>
            <option value="Inspiration">Inspiration</option>
          </select>
          <label htmlFor="author">Author: </label>
          <input
            className="createInput"
            type="text"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
            name="author"
            placeholder="Author"
          />
          <button type="submit" id="submitBoard">
            Create Board
          </button>
        </form>
      </div>
    </div>
  );
};

export default createModal;
