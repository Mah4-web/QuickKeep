import { Link } from "react-router";
import "./Navigation.css"

export default function Navigation() {
    return (

        <header className="nav-header">
        <h1 className=" text-4xl font-extrabold text-center mb-5 text-shadow-lg/20 z-1">QuickKeep</h1>
        <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add-entry">Add Entry</Link>
        <Link to="/entries">All Entries</Link>
        </nav>
        </header>
    
    );
}