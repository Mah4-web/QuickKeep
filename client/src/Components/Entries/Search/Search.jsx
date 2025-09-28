
import { FaSearch } from "react-icons/fa";
import "./Search.css";

export default function Search({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <FaSearch className="search-icon" />
      <input
        type="text"
        name="search"
        placeholder="Pick a type and category to find what you need!"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="entries-search"
      />
    </div>
  );
}
