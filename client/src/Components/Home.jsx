
import { useEffect, useState } from "react";
import EntryCard from "./EntryCard/EntryCard";
import "../App.css";

export default function Home() {
    const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
    const [cards, setCards] = useState([]);

    useEffect(() => {
    async function fetchCards() {
        try {
        const res = await fetch(`${BASE_URL}/cards`);
        if (!res.ok) throw new Error("Failed to fetch cards");
        const data = await res.json();

        // Sort by date descending and take recent 5
        const sortedRecent = data
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5);

        setCards(sortedRecent);
        } catch (error) {
        console.error(error);
        }
    }

    fetchCards();
    }, [BASE_URL]);

    function handleLike(id) {
    setCards((prev) =>
        prev.map((card) =>
        card.id === id ? { ...card, likes: (card.likes || 0) + 1 } : card
        )
    );
    }

    function handleDelete(id) {
    setCards((prev) => prev.filter((card) => card.id !== id));
    }

    function handleCopy(content) {
    navigator.clipboard.writeText(content).then(() => {
        alert("Content copied to clipboard!");
    });
    }

    return (
    <div className="home-container">
        <h2>Welcome to QuickKeep 📝</h2>
        <p>🕵️‍♂️ Check out the latest keeps!</p>

        <div className="cards-container">
        {cards.length === 0 ? (
            <p>No recent cards found.</p>
        ) : (
            cards.map((card) => (
            <EntryCard
            // in key I did id and got error then tried title got error then did both, in Entries I still didn't change it to see how things go.
                key={card.id ?? card.title}
                entry={card}
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




