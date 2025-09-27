import { Link } from "react-router";

export default function Navigation() {
    return (
    <>
        <h1>QuickKeep</h1>
        <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/add-entry"}>Add Entry</Link>
        <Link to={"/entries"}>Entries</Link>
        <Link to="/entries/note">Notes</Link>
        <Link to="/categories/urgent">Urgent</Link>   
        </nav>
    </>
    );
}