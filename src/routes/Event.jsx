import {useLoaderData} from "react-router-dom";

export async function loader({params}) {
    const response = await fetch(`http://127.0.0.1:8000/api/events/${params.slug}`);
    const event = await response.json();
    return { event };
}

export default function Event() {
    const { event } = useLoaderData();
    if (!event) {
        return null;
    }

    return (
        <h1>Event : {event.name}</h1>
    )
}