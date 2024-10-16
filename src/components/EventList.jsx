import EventCard from "./EventCard.jsx";

export default function EventList({ events }) {
    const cards = events.map(event => <EventCard key={event.id} event={event} />)

    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 my-4 ml-2 mr-2">
            {cards}
        </section>
    )
}