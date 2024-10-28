import MemberCard from "./MemberCard.jsx";

export default function MemberList({ event }) {
    const cards = event.persons.map(member => <MemberCard key={member.id} member={member} />)

    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 my-4 ml-2 mr-2">
            {cards}
        </section>
    )
}