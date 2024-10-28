import {useState} from "react";
import {useParams} from "react-router-dom";

const ApiUrl = import.meta.env.VITE_API_URL

async function ApiPost(updatedPerson) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/people`, {
            method: "POST",
            headers: {
                "Content-Type": "application/ld+json",
            },
            body: JSON.stringify(updatedPerson),
        })
        if (!response.ok) {
            throw new Error(`Erreur lors de l'envoi : ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Utilisateur ajouté avec succès :", data);
    } catch (error) {
        console.log("Erreur lors de l'envoi des donnée :", error);
    }
}

export default function AddUserForm() {
    const {slug} = useParams()

    const [person, setPerson] = useState({
        firstname: "",
        lastname: "",
        expenses: [],
        event: `/api/events/${slug}`,
    })

    const handleSubmit = (event) => {
        event.preventDefault()

        const firstnameData = new FormData(event.target).get('firstName')
        const lastnameData = new FormData(event.target).get('lastName')

        const updatedPerson = {
            ...person,
            firstname: firstnameData,
            lastname: lastnameData,
        }

        setPerson(updatedPerson);

        ApiPost(updatedPerson);
    }

    console.log(person)

    return (
        <form onSubmit={handleSubmit} className="flex justify-center gap-4 my-4">
            <input type="text" name="firstName" placeholder="Enter FirstName" className="p-2 border border-gray-200 rounded-lg" required/>
            <input type="text" name="lastName" placeholder="Enter LastName" className="p-2 border border-gray-200 rounded-lg" required/>
            <input type="submit" value="Ajouter membre" className="gap-4 p-2 border border-gray-200 rounded-lg"/>
        </form>
    )
}