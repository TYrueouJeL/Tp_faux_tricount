export default function EventCard({ event }) {
    return (
        <>
            <article className="flex items-center gap-4 p-2 border border-gray-200 rounded-lg">
                <h2>{event.name}</h2>
            </article>
        </>
    )
}