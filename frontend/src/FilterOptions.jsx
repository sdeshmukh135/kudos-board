import "./FilterOptions.css";

const FilterOptions = (props) => {
  const handleFilterRequest = (type) => {
    let currentBoardData = [...props.data];
    let newData = null;
    if (type === "All") {
      props.fetchData();
    } else if (type === "Recent") {
      // top 6 (if even that many)
      if (currentBoardData.length <= 6) {
        // all of them are recent
        props.fetchData();
      } else {
        // sort then filter for the first six (order based on id)
        currentBoardData.sort((a, b) => b["id"] - a["id"]); // highest ids are "more recent"
        newData = currentBoardData.slice(0, 6); // for the first six elements
      }
    } else if (type === "Celebration") {
      newData = currentBoardData.filter(function (object) {
        return object.category === "Celebration";
      });
    } else if (type === "Thank You") {
      newData = currentBoardData.filter(function (object) {
        return object.category === "Thank You";
      });
    } else if (type === "Inspiration") {
      newData = currentBoardData.filter(function (object) {
        return object.category === "Inspiration";
      });
    }

    props.setFilteredData(newData);
  };

  return (
    <div className="filters">
      <button id="submitFilter" onClick={() => handleFilterRequest("All")}>
        All
      </button>
      <button id="submitFilter" onClick={() => handleFilterRequest("Recent")}>
        Recent
      </button>
      <button
        id="submitFilter"
        onClick={() => handleFilterRequest("Celebration")}
      >
        Celebration
      </button>
      <button
        id="submitFilter"
        onClick={() => handleFilterRequest("Thank You")}
      >
        Thank You
      </button>
      <button
        id="submitFilter"
        onClick={() => handleFilterRequest("Inspiration")}
      >
        Inspiration
      </button>
    </div>
  );
};

export default FilterOptions;
