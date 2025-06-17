import { useState, useEffect } from "react";
import "./CreateCard.css";

const CreateCard = (props) => {
  const [titleInput, setTitleInput] = useState("");
  const [descripInput, setDescripInput] = useState("");
  const [searchGIFInput, setSearchGIFInput] = useState("");
  const [GIFInput, setGIFInput] = useState("");
  const [ownerInput, setOwnerInput] = useState("");

  const handleButtonChange = () => {};

  const searchForGIF = () => {
    // API
  };

  const getGIF = () => {
    // API
  };

  const closeModal = () => {
    props.setIsCreate(false);
  };

  return (
    <div className="card-modal" onClick={closeModal}>
      <div
        className="create-card-container"
        onClick={(element) => element.stopPropagation()}
      >
        <h2>Create a New Card</h2>
        <form id="createCardBar" onSubmit={handleButtonChange}>
          <input
            className="createCardInput"
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            name="title"
            placeholder="Enter card title"
            required
          />
          <input
            className="createCardInput"
            type="text"
            value={descripInput}
            onChange={(e) => setDescripInput(e.target.value)}
            name="description"
            placeholder="Enter card description"
            required
          />

          <input
            className="createCardInput"
            type="text"
            value={searchGIFInput}
            onChange={(e) => setSearchGIFInput(e.target.value)}
            name="GIFSearch"
            placeholder="Search GIFs..."
          />
          <button type="search" id="submitBoard" onClick={searchForGIF}>
            Search
          </button>

          <input
            className="createCardInput"
            type="text"
            value={GIFInput}
            onChange={(e) => setGIFInput(e.target.value)}
            name="getGIF"
            placeholder="Enter GIF URL"
            required
          />
          <button type="button" id="submitBoard" onClick={getGIF}>
            Copy GIF URL
          </button>

          <input
            className="createCardInput"
            type="text"
            value={ownerInput}
            onChange={(e) => setOwnerInput(e.target.value)}
            name="owner"
            placeholder="Enter owner (optional)"
          />
          <button type="submit" id="submitBoard">
            Create Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCard;
