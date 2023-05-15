import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

export const CollectionList = () => {
    const [collections, setCollections] = useState([]);

    const localUser = localStorage.getItem("hivemind_user");
    const userObject = JSON.parse(localUser);

    const getCollections = () => {

        fetch(`http://localhost:8088/collections?userId=${userObject.id}`)
            .then(res => res.json())
            .then((collectionArray) => {
                setCollections(collectionArray);
            });
    }

    useEffect(
        () => {
            getCollections();
        },
        []
    );

    const handleDeleteButtonClick = (event, id) => {
        event.preventDefault();

        return fetch(`http://localhost:8088/collections/${id}`, {
            method: 'DELETE',
          })
            .then(res => res.json())
            .then(
                () => {
                    getCollections();
                }
            );
    }

    return <>
        <div className="container">
            <div className="tile is-ancestor is-flex-wrap-wrap mt-3">
                {
                    collections.map(
                        (collection) => {
                            return <div className="tile is-parent is-4" key={`collectionList--${collection.id}`}>
                                <div className="tile is-child box has-text-centered">
                                    <Link className="title is-6" to={`${collection.id}`}>{collection.title}</Link>
                                    {
                                        collection.userId === userObject.id || userObject.admin
                                            ? <>
                                                <div className="dropdown is-hoverable has-text-left">
                                                    <div className="dropdown-trigger">
                                                        <button
                                                            className="button is-light is-link is-small ml-1">
                                                            <span className="icon"><i className="material-icons-outlined">edit</i></span>
                                                        </button>
                                                    </div>
                                                    <div className="dropdown-menu">
                                                        <div className="dropdown-content">
                                                            <Link className="dropdown-item" to={`/collections/${collection.id}/edit`}>Edit</Link>
                                                            <a
                                                                href="#"
                                                                className="dropdown-item"
                                                                onClick={(clickEvent) => handleDeleteButtonClick(clickEvent, collection.id)}
                                                            >Delete</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            : <></>
                                    }
                                    
                                </div>
                            </div>
                        }
                    )
                }
                <div className="tile is-parent is-4">
                    <div className="tile is-child box has-text-centered">
                        <Link to="/collection/create"><span className="icon material-icons-outlined">add</span></Link>
                    </div>
                </div>
            </div>
        </div>
    </>
}