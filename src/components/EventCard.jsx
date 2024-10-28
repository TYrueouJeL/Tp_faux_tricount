import {Link} from "react-router-dom";

export default function EventCard({ event }) {
    return (
        <>
            <article className="flex items-center gap-4 p-2 border border-gray-200 rounded-lg">
                <h2>{event.name}</h2>
                <button className="gap-4 p-2 border border-gray-200 rounded-lg">
                    <Link to={`/event/${event.slug}`}>Voir plus</Link>
                </button>
            </article>
        </>
    )
}