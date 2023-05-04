import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProfileEdit = () => {
    
    const [profile, update] = useState({
        firstName: "",
        lastName: "",
        description: ""
    });

    const localUser = localStorage.getItem("hivemind_user");
    const userObject = JSON.parse(localUser);
    
    const navigate = useNavigate();

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${userObject.id}`)
                .then(res => res.json())
                .then(
                    (profile) => {
                        update(profile)
                    }
                )
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const profileToSendToAPI = {
            firstName: profile.firstName,
            lastName: profile.lastName,
            description: profile.description,
        };

        return fetch(`http://localhost:8088/users/${userObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profileToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/profile/favorites")
            });
    }

    return (
        <form className="container box mt-5">
            <fieldset>
                <input 
                    required autoFocus
                    type="text"
                    className="input"
                    placeholder="First Name"
                    value={profile.firstName}
                    onChange={
                        (evt) => {
                            const copy = {...profile}
                            copy.firstName = evt.target.value
                            update(copy)
                        }
                    } />
            </fieldset>
            <fieldset>
                <input
                    type="text"
                    className="input mt-4"
                    placeholder="Last Name"
                    value={profile.lastName}
                    onChange={
                        (evt) => {
                            const copy = {...profile}
                            copy.lastName = evt.target.value
                            update(copy)
                        }
                    } />
            </fieldset>
            <fieldset>
                <input 
                    type="text"
                    className="input mt-4"
                    placeholder="Profile Description"
                    value={profile.description}
                    onChange={
                        (evt) => {
                            const copy = {...profile}
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