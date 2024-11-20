export default function ExpenseCard({ expense }) {
    return (
        <>
            <article className={`items-center gap-4 p-2 border border-gray-200 rounded-lg grid grid-cols-1`}>
                <h2>{expense.title}</h2>
                <p>Prix : {expense.amount} €</p>
                <p>Pris en charge par : {expense.person.firstName} {expense.person.lastName}</p>
                <p className={`${expense.paid ? 'bg-green-500' : 'bg-red-500'} border border-gray-200 rounded-lg`}>{expense.paid ? "Payé" : "A payer"}</p>
            </article>
        </>
    )
}