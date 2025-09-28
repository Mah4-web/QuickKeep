import "./EntryCard.css";

export default function EntryCard({ entry, onLike, onDelete, onCopy }) {
    return (
    <div className="entry-card">
        <h3 className="entry-title">{entry.title}</h3>

        <p className="entry-content">{entry.content}</p>

        <div className="entry-actions">
        <button
            onClick={onLike}
            className="entry-btn like-btn"
            title="Like"
        >
            ❤️ {entry.likes || 0}
        </button>

        <button
            onClick={onCopy}
            className="entry-btn copy-btn"
            title="Copy content"
        >
            📋 Copy
        </button>

        <button
            onClick={onDelete}
            className="entry-btn delete-btn"
            title="Delete entry"
        >
            🗑️ Delete
        </button>
        </div>
    </div>
    );
}
