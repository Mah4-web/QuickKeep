import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Search from "./Search/Search";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import EntryCard from "../EntryCard/EntryCard"; 
import "./Entries.css";

export default function Entries() {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);  
  const [filters, setFilters] = useState({
    search: "",
    typeName: "",
    categoryName: "",
  });
  const { type, category } = useParams();
  const BASE_URL = 'https://quickkeep.onrender.com';

  useEffect(() => {
    async function fetchAllData() {
      try {
        // Fetching entries
        const entriesRes = await fetch(`${BASE_URL}/entries`);
        if (!entriesRes.ok) throw new Error("Failed to fetch entries");
        const entriesData = await entriesRes.json();

        // Fetching types
        const typesRes = await fetch(`${BASE_URL}/types`);
        if (!typesRes.ok) throw new Error("Failed to fetch types");
        const typesData = await typesRes.json();

        // Fetching categories
        const categoriesRes = await fetch(`${BASE_URL}/categories`);
        if (!categoriesRes.ok) throw new Error("Failed to fetch categories");
        const categoriesData = await categoriesRes.json();

        // Updating state
        setEntries(entriesData);
        setFilteredEntries(entriesData);
        setTypes(typesData);
        setCategories(categoriesData);  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchAllData();
  }, [BASE_URL]);

  // Handle dropdown or search input changes
  function handleFilterChange(name, value) {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    let filtered = [...entries];

    // Search filter on title or content
    if (filters.search.trim() !== "") {
      filtered = filtered.filter(
        (entry) =>
          entry.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          entry.content.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
// I did this but my console log was giving error and id error so after so many videos and googling I found that my code relies on id but to rely on type name strings when using the URL param
// I have to change it and after few trial and errors it worked. So now I can use string names in the URL instead of numeric IDs.
    // if (type) {
    //   filtered = filtered.filter(
    //     (entry) => entry.type_id.toString() === type
    //   );
    // } else if (filters.typeId) {
    //   filtered = filtered.filter(
    //     (entry) => entry.type_id.toString() === filters.typeId
    //   );
    // }

    // if (category) {
    //   filtered = filtered.filter(
    //     (entry) => entry.category_id.toString() === category
    //   );
    // } else if (filters.categoryId) {
    //   filtered = filtered.filter(
    //     (entry) => entry.category_id.toString() === filters.categoryId
    //   );
    // }
    // Filtering by type name from dropdown filter
    if (type) {
      filtered = filtered.filter(
        (entry) => entry.type?.toLowerCase() === type.toLowerCase()
      );
    } else if (filters.typeName) {
      filtered = filtered.filter(
        (entry) => entry.type?.toLowerCase() === filters.typeName.toLowerCase()
      );
    }

    // Filtering by category name from dropdown filter
    if (category) {
      filtered = filtered.filter(
        (entry) => entry.category?.toLowerCase() === category.toLowerCase()
      );
    } else if (filters.categoryName) {
      filtered = filtered.filter(
        (entry) => entry.category?.toLowerCase() === filters.categoryName.toLowerCase()
      );
    }

    setFilteredEntries(filtered);
  }, [filters, entries, type, category]);

  // Like handler using entry title as key (no id)
  async function handleLike(title) {
    try {
      const entryToLike = entries.find((entry) => entry.title === title);
      if (!entryToLike) return;

      const updatedLikes = (entryToLike.likes || 0) + 1;

      const res = await fetch(`${BASE_URL}/update-entry-by-title/${title}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...entryToLike,
          likes: updatedLikes,
        }),
      });
      if (!res.ok) throw new Error("Failed to update likes");

      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.title === title ? { ...entry, likes: updatedLikes } : entry
        )
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  }

  // Delete handler using title as key
  async function handleDelete(title) {
    try {
      const res = await fetch(`${BASE_URL}/delete-entry-by-title/${title}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete entry");

      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.title !== title)
      );
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  }

  function handleCopy(content) {
    navigator.clipboard.writeText(content).then(() => {
      alert("Content copied to clipboard!");
    });
  }

  return (
    <div className="entries-page">
      <h1 className="entries-title">All Entries</h1>
      <p className="entries-subtitle">🕵️‍♂️ Dig through your keeps like a detective!</p>

      <Search
        value={filters.search}
        onChange={(value) => handleFilterChange("search", value)}
      />

      <div className="entries-filters">
        <FilterDropdown
          name="typeName"
          value={filters.typeName}
          options={types}
          onChange={(value) => handleFilterChange("typeName", value)}
          label="All Types"
        />

        <FilterDropdown
          name="categoryName"
          value={filters.categoryName}
          options={categories}
          onChange={(value) => handleFilterChange("categoryName", value)}
          label="All Categories"
        />
      </div>

      <p className="entries-count">
        Showing {filteredEntries.length} of {entries.length} entries
      </p>

      <div className="entries-list">
        {filteredEntries.map((entry) => (
          <EntryCard
            key={entry.title} // Using title as key 
            entry={entry}
            onLike={handleLike}
            onDelete={handleDelete}
            onCopy={handleCopy}
          />
        ))}
      </div>
    </div>
  );
}
