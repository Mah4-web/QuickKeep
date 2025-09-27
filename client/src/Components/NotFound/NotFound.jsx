import { Button } from '@mui/material';
import { Link } from 'react-router';
import './NotFound.css';


export default function NotFound() {
    return (
        <div className="notfound-container">
        <Link to="/">
        <Button variant="contained" color="primary">
            Go to Home
        </Button>
        </Link>
    </div>
    );
}