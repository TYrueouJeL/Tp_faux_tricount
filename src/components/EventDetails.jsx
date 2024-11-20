import MemberList from "./MemberList.jsx";
import {Link} from "react-router-dom";
import ExpenseList from "./ExpenseList.jsx";
import Debt from "./Debt.jsx";

export default function EventDetails({ event }) {

    return (
        <>
            <article className="flex items-center gap-4 p-2 border border-gray-200 rounded-lg">
                <h2>{event.name}</h2>
                <button className="gap-4 p-2 border border-gray-200 rounded-lg">
                    <a href="/">Retour</a>
                </button>
                <button className="gap-4 p-2 border border-gray-200 rounded-lg">
                    <Link to={`/adduser/${event.slug}`}>Ajouter Membre</Link>
                </button>
                <button className="gap-4 p-2 border border-gray-200 rounded-lg">
                    <Link to={`/addexpense/${event.slug}`}>Ajouter Dépense</Link>
                </button>
            </article>
            <article className="flex items-center gap-4 p-2 border border-gray-200 rounded-lg">
                <h2>Membres :</h2>
                <MemberList event={event}/>
            </article>
            <article className="flex items-center gap-4 p-2 border border-gray-200 rounded-lg">
                <h2>Dépenses :</h2>
                <ExpenseList expense={event.expenses}/>
            </article>
            <article className="flex items-center gap-4 p-2 border border-gray-200 rounded-lg">
                <h2>Dettes :</h2>
                <Debt event={event}/>
            </article>
        </>
    )
}