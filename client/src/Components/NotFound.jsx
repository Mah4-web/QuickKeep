import { Button } from '@mui/material';
import { Link } from 'react-router';
import '../App.css';


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