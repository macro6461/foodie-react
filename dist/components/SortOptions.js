import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const SortOptions = _ref => {
  let {
    handleSort
  } = _ref;
  const [sortOption, setSortOption] = useState("distance");
  const handleSortOption = e => {
    setSortOption(e.target.value);
    handleSort(e.target.value);
  };
  return _jsxs("div", {
    children: [_jsx("span", {
      children: "Sort By: "
    }), _jsxs("label", {
      children: [_jsx("input", {
        type: "radio",
        value: "distance",
        checked: sortOption === "distance",
        onChange: handleSortOption
      }), "Distance"]
    }), _jsxs("label", {
      children: [_jsx("input", {
        type: "radio",
        value: "rating",
        checked: sortOption === "rating",
        onChange: handleSortOption
      }), "Rating"]
    })]
  });
};
export default SortOptions;