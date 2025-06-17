import "./CreateModal.css";
import { useState } from "react";

const createModal = (props) => {
  // for create a board and for creating a kudos card (use state to figure out which on is which)
  const [titleInput, setTitleInput] = useState(""); // combine? But then the text appears on both input fields
  const [authorInput, setAuthorInput] = useState(""); // MAKE OPTIONAL
  const [selectedCategory, setSelectedCategory] = useState(""); // for the category

  const handleButtonChange = (event) => {
    event.preventDefault();
    console.log(event);
    const newBoard = {
      title: event.target.elements["title"].value,
      category: selectedCategory,
    };

    const newBoardData = [...props.boardData, newBoard];
    props.setBoardData(newBoardData);
  };

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
