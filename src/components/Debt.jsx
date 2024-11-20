import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function Debt({ event }) {
    const {slug} = useParams();

    const [debts, setDebts] = useState([]);
    const [debtsSummary, setDebtsSummary] = useState({});

    useEffect(() => {
        async function fetchDebts() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/events/${slug}`)

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
                }

                const data = await response.json();

                if (data && data.expenses) {
                    setDebts(data.expenses);
                    calculateDebts(data.expenses);
                } else {
                    console.log("Aucune dette trouvée");
                }
            } catch (error) {
                console.log("Erreur lors de la récupération des dettes :", error);
            }
        }

        function calculateDebts(expenses) {
            const totalAmount = expenses.reduce((total, expense) => total + parseInt(expense.amount, 10), 0);
            const numberOfPeople = new Set(expenses.map(expense => expense.person.id)).size;
            const amountPerPerson = totalAmount / numberOfPeople;

            const balances = expenses.reduce((acc, expense) => {
                const person = expense.person.firstName + " " + expense.person.lastName;
                if (!acc[person]) {
                    acc[person] = 0;
                }
                acc[person] -= parseInt(expense.amount, 10);
                return acc;
            }, {});

            for (const person in balances) {
                balances[person] += amountPerPerson;
            }

            const debtList = [];
            const creditors = [];
            const debtors = [];

            for (const person in balances) {
                if (balances[person] > 0) {
                    creditors.push({person, amount: balances[person]});
                } else if (balances[person] < 0) {
                    debtors.push({person, amount: -balances[person]});
                }
            }

            while (creditors.length && debtors.length) {
                const creditor = creditors.pop();
                const debtor = debtors.pop();

                const amount = Math.min(creditor.amount, debtor.amount);
                debtList.push({from: debtor.person, to: creditor.person, amount});

                if (creditor.amount > amount) {
                    creditors.push({person: creditor.person, amount: creditor.amount - amount});
                }

                if (debtor.amount > amount) {
                    debtors.push({person: debtor.person, amount: debtor.amount - amount});
                }
            }

            setDebtsSummary(debtList);
        }

        fetchDebts();
        // calculateDebts();
    }, []);

    const totalAmount = debts.reduce((total, expense) => total + parseInt(expense.amount, 10), 0)



    return (
        <>
            <article className={"flex items-center gap-4 p-2 border border-gray-200 rounded-lg"}>
                <h2>Total : {totalAmount}€</h2>
            </article>
            {/*{Object.entries(debtsSummary).map(([person, amount]) => (*/}
            {/*    <article key={person} className={"flex items-center gap-4 p-2 border border-gray-200 rounded-lg"}>*/}
            {/*        <h3>{person} doit {amount.toFixed(2)}€</h3>*/}
            {/*    </article>*/}
            {/*))}*/}
            {debtsSummary.map((debt, index) => (
                <article key={index} className={"flex items-center gap-4 p-2 border border-gray-200 rounded-lg"}>
                    <h3>{debt.from} doit {debt.amount.toFixed(2)}€ à {debt.to}</h3>
                </article>
            ))}
        </>
    );
}