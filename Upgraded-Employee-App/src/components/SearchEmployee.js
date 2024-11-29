import React, { useState } from "react";
import "./SearchEmployee.css";

function SearchEmployee({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-employee-container">
      <input
        type="text"
        placeholder="Enter employee ID Number" 
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchEmployee;
