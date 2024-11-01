import ExpenseCard from "./ExpenseCard.jsx";

export default function ExpenseList({ expense }) {
    const cards = expense.map(expense => <ExpenseCard key={expense.id} expense={expense} />)

    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 my-4 ml-2 mr-2">
            {cards}
        </section>
    )
}