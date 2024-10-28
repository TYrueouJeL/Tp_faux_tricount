import {useLoaderData} from "react-router-dom";
import EventDetails from "../components/EventDetails.jsx";

const ApiUrl = import.meta.env.VITE_API_URL

export async function loader({params}) {
    const response = await fetch(`http://127.0.0.1:8000/api/events/${params.slug}`);
    const event = await response.json();
    return { event };
}

export default function Event() {
    const { event } = useLoaderData();

    return (<EventDetails event={event} />);
}