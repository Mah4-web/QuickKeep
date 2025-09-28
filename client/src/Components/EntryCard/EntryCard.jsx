
import "./EntryCard.css";

export default function EntryCard({ entry, onLike, onDelete, onCopy }) {
    const createdDate = new Date(entry.created_at);
    const formattedDate = isNaN(createdDate.getTime()) 
        ? 'Unknown date' 
        : createdDate.toLocaleString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    return (
    <div className="entry-card">
        <h3 className="entry-title">{entry.title}</h3>
        <p className="entry-created">
        Created: {formattedDate}
        </p>
        <p className="entry-content">{entry.content}</p>

        <div className="entry-actions">
        <button
            onClick={() => onLike(entry.id)}
            className="entry-btn like-btn"
            title="Like"
        >
            ❤️ {entry.likes || 0}
        </button>

        <button
            onClick={() => onCopy(entry.content)}
            className="entry-btn copy-btn"
            title="Copy content"
        >
            📋 Copy
        </button>

        <button
            onClick={() => onDelete(entry.id)}
            className="entry-btn delete-btn"
            title="Delete entry"
        >
            🗑️ Delete
        </button>
        </div>
    </div>
    );
}
