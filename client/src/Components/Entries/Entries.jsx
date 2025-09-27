import React, { useEffect, useState } from "react";
import Search from "./Search/Search";
import FilterDropdown from '../FilterDropdown/FilterDropdown';
import EntryCard from '../EntryCard/EntryCard'; 


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

    if (filters.typeId) {
      filtered = filtered.filter(
        (entry) => entry.type_id.toString() === filters.typeId
      );
    }

    if (filters.categoryId) {
      filtered = filtered.filter(
        (entry) => entry.category_id.toString() === filters.categoryId
      );
    }

    setFilteredEntries(filtered);
  }, [filters, entries]);

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
            key={entry.id}
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

