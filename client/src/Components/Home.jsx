import { useEffect, useState } from "react";
import EntryCard from "./EntryCard/EntryCard";
import "../App.css";

export default function Home() {
    const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
    const [entries, setEntries] = useState([]);

//    I was trying to get data from my EntryCard, I started putting card here to get data and got errors, 
            // I did not realise I am getting data from server directly. Silly me
    
    useEffect(() => {
    async function fetchEntries() {
        try {
        const res = await fetch(`${BASE_URL}/entries`);
        if (!res.ok) throw new Error("Failed to fetch entries");
        const data = await res.json();

        // Sort by created_at descending and take recent 5
        const sortedRecent = data
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5);

        setEntries(sortedRecent);
        } catch (error) {
        console.error("Error fetching entries:", error);
        }
    }

    fetchEntries();
    }, [BASE_URL]);

  // Use title instead of id as identifier
    function handleLike(title) {
    setEntries((prev) =>
        prev.map((entry) =>
        entry.title === title ? { ...entry, likes: (entry.likes || 0) + 1 } : entry
        )
    );
    }

    function handleDelete(title) {
    setEntries((prev) => prev.filter((entry) => entry.title !== title));
    }

    function handleCopy(content) {
    navigator.clipboard.writeText(content).then(() => {
        alert("Content copied to clipboard!");
    });
    }

    return (
    <div className="home-container">
        <h2>Welcome to QuickKeep 📝</h2>
        <p>🕵️‍♂️ Dig through your keeps like a detective!</p>

        <div className="cards-container">
        {entries.length === 0 ? (
            <p>No recent entries found.</p>
        ) : (
            entries.map((entry) => (
            <EntryCard
              key={entry.title} // using title as key
                entry={entry}
                onLike={handleLike}
                onDelete={handleDelete}
                onCopy={handleCopy}
            />
            ))
        )}
        </div>
    </div>
    );
}
