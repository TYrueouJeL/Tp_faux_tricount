import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

async function ApiPost(updatedExpense) {
    console.log("Données envoyées :", updatedExpense);

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/expenses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/ld+json",
            },
            body: JSON.stringify(updatedExpense),
        })
        if (!response.ok) {
            throw new Error(`Erreur lors de l'envoi : ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Utilisateur ajouté avec succès :", data);
    } catch (error) {
        console.log("Erreur lors de l'envoi des donnée :", error);
    }

    console.log(updatedExpense);
}

export default function AddExpenseForm() {
    const {slug} = useParams();

    const [expense, setExpense] = useState({
        title: "",
        amount: "",
        paid: false,
        person: "",
        category: "",
        event: `/api/events/${slug}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    })

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/categories`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
                }
                const data = await response.json();
                if (data && data.member) {
                    setCategories(data.member);
                } else {
                    console.log("Aucune catégorie trouvée");
                }
            } catch (error) {
                console.log("Erreur lors de la récupération des catégories :", error);
            }
        }

        fetchCategories();
    }, []);

    const [persons, setPersons] = useState([]);

    useEffect(() => {
        async function fetchPersons() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/events/${slug}`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
                }
                const data = await response.json();
                if (data && data.persons) {
                    setPersons(data.persons);
                } else {
                    console.log("Aucune catégorie trouvée");
                }
            } catch (error) {
                console.log("Erreur lors de la récupération des catégories :", error);
            }
        }

        fetchPersons();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault()

        const titleData = new FormData(event.target).get('title')
        const amountData = new FormData(event.target).get('amount')
        const personData = new FormData(event.target).get('person')
        const categoryData = new FormData(event.target).get('category')

        const updatedExpense = {
            ...expense,
            title: titleData,
            amount: amountData,
            person: "/api/people/" + personData,
            category: "/api/categories/" + categoryData,
        }

        setExpense(updatedExpense);

        ApiPost(updatedExpense);
    }

    console.log(expense)

    return (
        <>
            <form onSubmit={handleSubmit} className={"flex justify-center gap-4 my-4"}>
                <input type="text" name="title" placeholder="Entrez un titre"
                       className="p-2 border border-gray-200 rounded-lg" required/>
                <input type="number" name="amount" placeholder="Entrez un montant"
                       className="p-2 border border-gray-200 rounded-lg" required/>
                <select name="person" className="p-2 border border-gray-200 rounded-lg" required>
                    <optgroup label="Choisissez une personne">
                        {persons.map((person) => (
                            <option key={person.id} value={person.id}>{person.firstName} {person.lastName}</option>
                        ))}
                    </optgroup>
                </select>
                <select name="category" className="p-2 border border-gray-200 rounded-lg" required>
                    <optgroup label="Choisissez une catégorie">
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </optgroup>
                </select>
                <input type="submit" value="Ajouter dépense" className="gap-4 p-2 border border-gray-200 rounded-lg"/>
            </form>
            <button className="gap-4 p-2 border border-gray-200 rounded-lg">
                <a href={`/event/${slug}`}>Retour</a>
            </button>
        </>
    )
}