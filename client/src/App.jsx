// TODO: Set up routes in here. (Routes, Route)
//- All our components will be rendered in here

import Home from './Components/Home';
import Entries from './Components/Entries/Entries';
import AddEntry from './Components/AddEntry/AddEntry';
import Navigation from './Components/Navigation/Navigation';
import Footer from './Components/Footer';
import NotFound from './Components/NotFound/NotFound';
import Jobs from "./Components/Jobs";
import Notes from "./Components/Notes";
import Urgent from "./Components/Urgent";

import {Routes, Route} from "react-router";

export default function App(){

    return (
        <>
        <Navigation />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-entry" element={<AddEntry />} />
        <Route path="/entries" element={<Entries />} />
        <Route path="/entries/type/:type" element={<Entries />} />
        <Route path="/entries/category/:category" element={<Entries />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="notes" element={<Notes />} />
        <Route path="urgent" element={<Urgent />} />
        <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
        </>
    )
}


