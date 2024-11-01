export default function ExpenseCard({ expense }) {
    return (
        <>
            <article className="flex items-center gap-4 p-2 border border-gray-200 rounded-lg">
                <h2>{expense.title}</h2>
            </article>
        </>
    )
}