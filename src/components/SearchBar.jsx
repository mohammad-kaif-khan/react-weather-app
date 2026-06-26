import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city.trim()) return;

    onSearch(city);

    setCity("");
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search City..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button>Search</button>
    </form>
  );
}

export default SearchBar;