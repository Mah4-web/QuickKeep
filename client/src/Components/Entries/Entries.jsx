import React, { useEffect, useState } from "react";

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

  