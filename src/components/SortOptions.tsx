import React, { useState } from "react";

interface SortOptionsProps {
  onSort: () => void;
}

const SortOptions = ({ handleSort }) => {
  const [sortOption, setSortOption] = useState("distance");

  const handleSortOption = (e) => {
    setSortOption(e.target.value);
    handleSort(e.target.value);
  };

  return (
    <div>
      <span>Sort By: </span>
      <label>
        <input
          type="radio"
          value="distance"
          checked={sortOption === "distance"}
          onChange={handleSortOption}
        />
        Distance
      </label>
      <label>
        <input
          type="radio"
          value="rating"
          checked={sortOption === "rating"}
          onChange={handleSortOption}
        />
        Rating
      </label>
    </div>
  );
};

export default SortOptions;
