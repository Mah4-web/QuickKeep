
import { FaSearch } from "react-icons/fa";
import "./Search.css";

export default function Search({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <FaSearch className="search-icon" />
      <input
        type="text"
        name="search"
        placeholder="Dive into your keeps — your treasure hunt starts here!"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="entries-search"
      />
    </div>
  );
}
