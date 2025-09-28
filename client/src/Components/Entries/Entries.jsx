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
    typeId: "",
    categoryId: "",
  });
  const { type, category } = useParams();
  const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

  useEffect(() => {
    async function fetchAllData() {
      try {
        // Fetch entries
        const entriesRes = await fetch(`${BASE_URL}/entries`);
        if (!entriesRes.ok) throw new Error("Failed to fetch entries");
        const entriesData = await entriesRes.json();

        // Fetch types
        const typesRes = await fetch(`${BASE_URL}/types`);
        if (!typesRes.ok) throw new Error("Failed to fetch types");
        const typesData = await typesRes.json();

        // Fetch categories
        const categoriesRes = await fetch(`${BASE_URL}/categories`);
        if (!categoriesRes.ok) throw new Error("Failed to fetch categories");
        const categoriesData = await categoriesRes.json();

        // Update state
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

  function handleFilterChange(name, value) {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    let filtered = [...entries];

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
    
    // type filtering
if (type) {
      filtered = filtered.filter(
        (entry) => entry.type?.toLowerCase() === type.toLowerCase()
      );
    } else if (filters.typeId) {
      filtered = filtered.filter(
        (entry) => entry.type_id?.toString() === filters.typeId
      );
    }

  // category filtering
    if (category) {
      filtered = filtered.filter(
        (entry) => entry.category?.toLowerCase() === category.toLowerCase()
      );
    } else if (filters.categoryId) {
      filtered = filtered.filter(
        (entry) => entry.category_id?.toString() === filters.categoryId
      );
    }
    setFilteredEntries(filtered);
  }, [filters, entries, type, category]);

  async function handleLike(id) {
    try {
      const entryToLike = entries.find((entry) => entry.id === id);
      if (!entryToLike) return;

      const updatedLikes = (entryToLike.likes || 0) + 1;

      const res = await fetch(`${BASE_URL}/update-entry/${id}`, {
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
          entry.id === id ? { ...entry, likes: updatedLikes } : entry
        )
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`${BASE_URL}/delete-entry/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete entry");

      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.id !== id)
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
          name="typeId"
          value={filters.typeId}
          options={types}
          onChange={(value) => handleFilterChange("typeId", value)}
          label="All Types"
        />

        {/* Filter Dropdown for Categories */}
        <FilterDropdown
          name="categoryId"
          value={filters.categoryId}
          options={categories}
          onChange={(value) => handleFilterChange("categoryId", value)}
          label="All Categories"
        />
      </div>

      <p className="entries-count">
        Showing {filteredEntries.length} of {entries.length} entries
      </p>

      <div className="entries-list">
        {filteredEntries.map((entry) => (
          <EntryCard
          // here as well i did entry.id but i was getting error and i changed it to title
            key={entry.title}
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
