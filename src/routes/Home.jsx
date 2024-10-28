import SearchForm from "../components/SearchForm.jsx";
import {useEffect, useState} from "react";
import EventList from "../components/EventList.jsx";

const ApiUrl = import.meta.env.VITE_API_URL

export default function Home() {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState({name: ''});

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/events`)
            .then(response => response.json())
            .then(data => setEvents(data.member))
    }, []);

    console.log(events);

    const filteredEvents = events.filter(event => {
        const name = event.name.toLowerCase();
        const searchName = search.name.toLowerCase();
        return name === searchName;
    });

    return (
        <>
            <h1>Accueil</h1>

            <SearchForm search={search} onSearch={formData => setSearch(formData)}/>
            <h1>{filteredEvents.length} Events</h1>
            <EventList events={filteredEvents} />
        </>
    );
}