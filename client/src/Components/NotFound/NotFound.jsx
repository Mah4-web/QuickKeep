import { Button } from '@mui/material';
import { Link } from 'react-router';
import './NotFound.css';
import notfoundImage from "./notfound.png";


export default function NotFound() {
    return (
        <div className="notfound-container">
            <h2>Oops! Page Not Found</h2>
            <img src={notfoundImage} alt="Page Not Found" />
        <Link to="/">
        <Button variant="contained" color="primary">
            Go to Home
        </Button>
        </Link>
    </div>
    );
}