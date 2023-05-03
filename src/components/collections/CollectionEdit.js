import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const CollectionEdit = () => {
    
    const {collectionId} = useParams()
    const [collection, update] = useState({
        title: "",
        description: "",
    });

    const localUser = localStorage.getItem("hivemind_user");
    const userObject = JSON.parse(localUser);
    
    const navigate = useNavigate();

    useEffect(
        () => {
            fetch(`http://localhost:8088/collections/${collectionId}`)
                .then(res => res.json())
                .then(
                    (collection) => {
                        update(collection)
                    }
                )
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const collectionToSendToAPI = {
            userId: userObject.id,
            title: collection.title,
            description: collection.description
        };

        return fetch(`http://localhost:8088/collections/${collectionId}`, {
            method: "PUT",
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
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="button is-light mt-4">
                Save
            </button>
        </form>
    );
}