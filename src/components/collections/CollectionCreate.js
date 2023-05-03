import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CollectionCreate = () => {

    const [collection, update] = useState({
        title: "",
        description: "",
        image: "",
        tagId: 1
    });

    const localUser = localStorage.getItem("hivemind_user");
    const userObject = JSON.parse(localUser);
    
    const navigate = useNavigate();

    const handleCreateButtonClick = (event) => {
        event.preventDefault();

        const collectionToSendToAPI = {
            userId: userObject.id,
            title: collection.title,
            description: collection.description
        };

        return fetch(`http://localhost:8088/collections`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(collectionToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/profile/collections")
            });
    }

    return (
        <form className="container box mt-5">
            <fieldset>
                <input 
                    required autoFocus
                    type="text"
                    className="input"
                    placeholder="Collection name"
                    value={collection.title}
                    onChange={
                        (evt) => {
                            const copy = {...collection}
                            copy.title = evt.target.value
                            update(copy)
                        }
                    } />
            </fieldset>
            <fieldset className="mt-4">
                <textarea
                    className="textarea"
                    placeholder="Description"
                    value={collection.description}
                    onChange={
                        (evt) => {
                            const copy = {...collection}
                            copy.description = evt.target.value
                            update(copy)
                        }
                    } />
            </fieldset>
            <button 
                onClick={(clickEvent) => handleCreateButtonClick(clickEvent)}
                className="button is-light mt-4">
                Create
            </button>
        </form>
    );
}