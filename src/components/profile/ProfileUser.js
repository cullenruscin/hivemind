import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

export const ProfileUser = () => {

    const [user, setUser] = useState([])

    const localUser = localStorage.getItem("hivemind_user");
    const userObject = JSON.parse(localUser);

    const getUser = () => {

        fetch(`http://localhost:8088/users/${userObject.id}`)
            .then(res => res.json())
            .then((user) => {
                setUser(user);
            });
    }

    useEffect(
        () => {
            getUser();
        },
        []
    )

    return (
        <div className="is-flex is-flex-direction-column is-align-items-center m-6">
            <figure className="image is-128x128">
                <img className="is-rounded" src={user.image ? user.image : ""}/>
            </figure>
            <div className="is-flex is-flex-direction-column is-align-items-center m-4">
                <p className="title is-4">{user.firstName} {user.lastName}</p>
                <p className="subtitle is-6">{user.description}</p>
                <button 
                    className="button is-light is-link is-small mr-1">
                    <Link className="icon" to={`edit`}><span className="icon"><i className="material-icons-outlined">edit</i></span></Link> 
                </button>
            </div>
            
        </div>
    )
}