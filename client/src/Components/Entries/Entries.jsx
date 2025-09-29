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
  const BASE_URL = "https://quickkeep.onrender.com";

    async function fetchAllData() {
      try {
        const entriesRes = await fetch(`${BASE_URL}/entries`);
        const entriesData = await entriesRes.json();
        setEntries(entriesData);
        setFilteredEntries(entriesData);

        const typesRes = await fetch(`${BASE_URL}/types`);
        const typesData = await typesRes.json();
        const sortedTypes = typesData.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setTypes(sortedTypes);

        const categoriesRes = await fetch(`${BASE_URL}/categories`);
        const categoriesData = await categoriesRes.json();
        const sortedCategories = categoriesData.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCategories(sortedCategories);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    useEffect(()=> {
    fetchAllData();
     const interval = setInterval(() => {
    fetchAllData();
  }, 10000); // fetch every 10 seconds

  return () => clearInterval(interval); 
  }, []);

   function handleFilterChange(name, value) {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "typeId" ? { categoryId: "" } : {}),
    }));
  }

  useEffect(() => {
    let filtered = [...entries];

    // Search filter
    if (filters.search.trim()) {
      filtered = filtered.filter(
        (entry) =>
          entry.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          entry.content.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // URL param or dropdown filter for type
    if (type) {
      filtered = filtered.filter(
        (entry) => entry.type_id.toString() === type
      );
    } else if (filters.typeId) {
      filtered = filtered.filter(
        (entry) => entry.type_id === Number(filters.typeId)
      );
    }

    // URL param or dropdown filter for category
    if (category) {
      filtered = filtered.filter(
        (entry) => entry.category_id.toString() === category
      );
    } else if (filters.categoryId) {
      filtered = filtered.filter(
        (entry) => entry.category_id === Number(filters.categoryId)
      );
    }

    setFilteredEntries(filtered);
  }, [filters, entries, type, category]);

  async function handleLike(id) {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;

    try {
      const updatedLikes = (entry.likes || 0) + 1;

      const res = await fetch(`${BASE_URL}/update-entry-by-title/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: entry.title,
          content: entry.content,
          likes: updatedLikes,
          type_id: entry.typeId,
          category_id: entry.categoryId,
        }),
      });

      if (!res.ok) throw new Error("Failed to update likes");

      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, likes: updatedLikes } : e))
      );
    } catch (err) {
      console.error("Error updating likes:", err);
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`${BASE_URL}/delete-entry-by-id/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete entry");

      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  }

  function handleCopy(content) {
    navigator.clipboard.writeText(content).then(() => {
      alert("Content copied to clipboard!");
    });
  }
    const filteredCategories = filters.typeId
    ? categories.filter((cat) => cat.type_id === Number(filters.typeId))
    : categories;

  return (
    <div className="entries-page">
      <h1 className="entries-title">All Entries</h1>
      <p className="entries-subtitle">🕵️‍♂️ Dig through your keeps like a detective!</p>

      <Search
        value={filters.search}
        onChange={(val) => handleFilterChange("search", val)}
      />

      <div className="entries-filters">
        <FilterDropdown
          name="typeId"
          value={filters.typeId}
          options={types}
          onChange={handleFilterChange}
          label="All Types"
        />

        <FilterDropdown
          name="categoryId"
          value={filters.categoryId}
          options={filteredCategories}
          onChange={handleFilterChange}
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
            onLike={() => handleLike(entry.id)}
            onDelete={() => handleDelete(entry.id)}
            onCopy={() => handleCopy(entry.content)}
          />
        ))}
      </div>
    </div>
  );
}