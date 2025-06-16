import "./FilterOptions.css";

const FilterOptions = () => {
  return (
    <div className="filters">
      <button type="button" id="submitFilter">
        All
      </button>
      <button type="button" id="submitFilter">
        Recent
      </button>
      <button type="button" id="submitFilter">
        Celebration
      </button>
      <button type="button" id="submitFilter">
        Thank You
      </button>
      <button type="button" id="submitFilter">
        Inspiration
      </button>
    </div>
  );
};

export default FilterOptions;
