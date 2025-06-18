import "./CreateModal.css";
import { useState, useEffect } from "react";

const createModal = (props) => {
  // for create a board and for creating a kudos card (use state to figure out which on is which)
  const [titleInput, setTitleInput] = useState(""); // combine? But then the text appears on both input fields
  const [authorInput, setAuthorInput] = useState(""); // MAKE OPTIONAL
  const [selectedCategory, setSelectedCategory] = useState(""); // for the category
  const [newBoard, setNewBoard] = useState(null); // too many useStates?

  const handleButtonChange = (event) => {
    event.preventDefault();
    console.log(event);
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
  }, [newBoard])

  const handleNewBoard = () => {
    fetch("http://localhost:3001/boards/", {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(newBoard)
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
        // Display an error message or retry the request
      });
  }

  const handleClear = () => {
    setTitleInput("");
    setAuthorInput("");
    setSelectedCategory("");
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
            <option value>Select a Category:</option>
            <option value="Celebration">Celebration</option>
            <option value="Recent">Recent</option>
            <option value="Thank-you">Thank you</option>
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
