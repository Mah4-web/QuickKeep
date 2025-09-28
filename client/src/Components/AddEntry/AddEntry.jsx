import React, { useState, useEffect } from "react";
import "./AddEntry.css";

export default function AddEntry() {
  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
    typeId: "",
    categoryId: "",
  });
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);

  const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

  useEffect(() => {
    async function fetchTypes() {
      try {
        const res = await fetch(`${BASE_URL}/types`);
        if (!res.ok) throw new Error("Failed to fetch types");
        const data = await res.json();
        setTypes(data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchCategories() {
      try {
        const res = await fetch(`${BASE_URL}/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTypes();
    fetchCategories();
  }, [BASE_URL]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch(`${BASE_URL}/entries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formValues.title,
          content: formValues.content,
          type_id: Number(formValues.typeId),       // send ID as number
          category_id: Number(formValues.categoryId), // send ID as number
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add entry");
      }

      setMessage("Entry added successfully!");
      setFormValues({
        title: "",
        content: "",
        typeId: "",
        categoryId: "",
      });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  }

  return (
    <div className="add-entry-container">
      <h2>Add New Entry</h2>

      <form onSubmit={handleSubmit} className="add-entry-form">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formValues.title}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          value={formValues.content}
          onChange={handleInputChange}
          rows={5}
          required
        />

        <label htmlFor="typeId">Type</label>
        <select
          name="typeId"
          id="typeId"
          value={formValues.typeId}
          onChange={handleInputChange}
          required
        >
          <option value="">-- Select a Type --</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        <label htmlFor="categoryId">Category</label>
        <select
          name="categoryId"
          id="categoryId"
          value={formValues.categoryId}
          onChange={handleInputChange}
          required
        >
          <option value="">-- Select a Category --</option>
          {/* This cat don't meow :) it's short for category, {categories.map((cat), since I am tired I need some fun */}
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button type="submit">Submit Entry</button>
      </form>

      {message && (
        <p className={message.startsWith("Error") ? "error-message" : "success-message"}>
          {message}
        </p>
      )}
    </div>
  );
}
