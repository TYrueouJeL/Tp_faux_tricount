export default function MemberCard({member}) {
    return (
        <>
            <article className="flex items-center gap-4 p-2 border border-gray-200 rounded-lg">
                <h2>{member.firstName} {member.lastName}</h2>
            </article>
        </>
    )
}