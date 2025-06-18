import { useState, useEffect } from "react";
import "./CreateCard.css";

const CreateCard = (props) => {
  const [titleInput, setTitleInput] = useState("");
  const [descripInput, setDescripInput] = useState("");
  const [searchGIFInput, setSearchGIFInput] = useState("");
  const [GIFInput, setGIFInput] = useState("");
  const [ownerInput, setOwnerInput] = useState("");
  const [gifData, setGifData] = useState(null); // to show the gif options
  const [showGIF, setShowGIF] = useState(false);

  const handleButtonChange = () => {};

  //   const isShowGIF = () => {
  //     setShowGIF(true);
  //   }

  const searchForGIF = async () => {
    // API
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchGIFInput}&limit=6`,
    );
    const data = await response.json();

    console.log(data);
    setGifData(data);
    setShowGIF(true);
  };

  const getGIF = () => {
    // get url link
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
          <button type="button" id="submitBoard" onClick={searchForGIF}>
            Search
          </button>

          <div className="gifoptions">
            {showGIF &&
              gifData.data.map((object) => {
                return (
                  <div className="gif">
                    <img
                      src={object.images.fixed_height_small.url}
                      alt={object.alt_text}
                    />
                  </div>
                );
              })}
          </div>

          <input
            className="createCardInput"
            type="text"
            value={GIFInput}
            onChange={(e) => setGIFInput(e.target.value)}
            name="getGIF"
            placeholder="Enter GIF URL"
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
          <button type="submit" id="submitBoard" onSubmit={handleButtonChange}>
            Create Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCard;
