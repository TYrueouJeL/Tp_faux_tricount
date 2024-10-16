export default function SearchForm({ search, onSearch }) {
    function handleChange(event) {
        onSearch({...search, [event.target.name]: event.target.value});
    }

    return (
        <form className="flex justify-center gap-4 my-4">
            <input type="text" name="name" onChange={handleChange} placeholder="Enter a name" className="p-2 border border-gray-200 rounded-lg"/>
        </form>
    )
}