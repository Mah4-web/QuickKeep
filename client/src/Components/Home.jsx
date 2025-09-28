import { useEffect, useState } from "react";
import EntryCard from "./EntryCard/EntryCard";
import "../App.css";

export default function Home() {
    const BASE_URL = "https://quickkeep.onrender.com";
    const [entries, setEntries] = useState([]);

    useEffect(() => {
    async function fetchEntries() {
        try {
        const res = await fetch(`${BASE_URL}/entries`);
        if (!res.ok) throw new Error("Failed to fetch entries");
        const data = await res.json();

        // Sort by likes descending and take top 5
        const mostLiked = data
            .sort((a, b) => (b.likes || 0) - (a.likes || 0))
            .slice(0, 5);

        setEntries(mostLiked);
        } catch (error) {
        console.error("Error fetching entries:", error);
        }
    }

    fetchEntries();
    }, []);

    function handleLike(id) {
    setEntries((prev) =>
        prev.map((entry) =>
        entry.id === id
            ? { ...entry, likes: (entry.likes || 0) + 1 }
            : entry
        )
    );
    }

    function handleDelete(id) {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    }

    function handleCopy(content) {
    navigator.clipboard.writeText(content).then(() => {
        alert("Content copied to clipboard!");
    });
    }

    return (
    <div className="home-container">
        <h2>Welcome to QuickKeep 📝</h2>
        <p>🔥 Most liked keeps right now:</p>

        <div className="cards-container">
        {entries.length === 0 ? (
            <p>No entries found.</p>
        ) : (
            entries.map((entry) => (
            <EntryCard
                key={entry.id}
                entry={entry}
                onLike={() => handleLike(entry.id)}
                onDelete={() => handleDelete(entry.id)}
                onCopy={() => handleCopy(entry.content)}
            />
            ))
        )}
        </div>
    </div>
    );
}
