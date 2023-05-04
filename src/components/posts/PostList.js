import { useState, useEffect } from "react";
import { ButtonFavorite } from "../../buttons/ButtonFavorite";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const PostList = ({ filter }) => {
    const {collectionId} = useParams();

    const [posts, setPosts] = useState([]);
    const [collections, setCollections] = useState([]);
    const [filteredCollections, setFilteredCollections] = useState([]);
    const [filteredPosts, setFiltered] = useState([]);

    const navigate = useNavigate();

    const localUser = localStorage.getItem("hivemind_user");
    const userObject = JSON.parse(localUser);
    const userCollections = collections.filter(collection => collection.userId === userObject.id);

    const getPosts = () => {
        fetch(`http://localhost:8088/posts?_expand=user&_expand=tag&_embed=favorites&_embed=postCollections`)
            .then(res => res.json())
            .then((postArray) => {
                setPosts(postArray);
            });
    }

    const getCollections = () => {
        fetch(`http://localhost:8088/collections`)
            .then(res => res.json())
            .then((collectionArray) => {
                setCollections(collectionArray);
            })
    }

    const getCollectionTitle = () => {
        let collection = collections.find(collection => collection.id === parseInt(collectionId))
        if (collection) {
            return collection.title;
        }
    }

    const getCollectionDescription = () => {
        let collection = collections.find(collection => collection.id === parseInt(collectionId))
        if (collection) {
            return collection.description;
        }
    }

    useEffect(
        () => {
            setFilteredCollections(collections.filter(collection => collection.userId === userObject.id));
        },
        [collections]
    )

    useEffect(
        () => {
            if (filter === "All") {
                setFiltered(posts);
            } else if (filter === "User") {
                setFiltered(posts.filter(post => post.userId === userObject.id));
            } else if (filter === "Favorites") {            
                setFiltered(posts.filter(post => post.favorites.find(favorite => favorite.userId === userObject.id)));
            } else if (filter === "Collection") {
                setFiltered(posts.filter(post => post.postCollections.find(collection => collection.collectionId === parseInt(collectionId))));
            }
        },
        [posts]
    )

    useEffect(
        () => {
            getPosts();
            getCollections();
        },
        []
    );

    const handleDeleteButtonClick = (event, id) => {
        event.preventDefault();

        return fetch(`http://localhost:8088/posts/${id}`, {
            method: 'DELETE',
          })
            .then(res => res.json())
            .then(
                () => {
                    getPosts();
                }
            );
    }

    const handleAddButtonClick = (event, collectionId, postId) => {
        event.preventDefault();

        const postCollectionToSendToAPI = {
            postId: parseInt(postId),
            collectionId: parseInt(collectionId)
        };

        return fetch(`http://localhost:8088/postCollections`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postCollectionToSendToAPI)
        })
            .then(res => res.json())
    }

    const handleRemoveButtonClick = (event, id) => {
        event.preventDefault();

        return fetch(`http://localhost:8088/postCollections/${id}`, {
            method: 'DELETE',
          })
            .then(res => res.json())
            .then(
                () => {
                    getPosts();
                }
            );
    }

    return <>
        <div className="container">
            {
                filter === "Collection" 
                    ? <>
                        <h2 className="title">{getCollectionTitle()}</h2>
                        <p className="subtitle">{getCollectionDescription()}</p>
                    </> 
                    : <></>
            }
            <div className="tile is-ancestor is-flex-wrap-wrap mt-3">
                    {
                        filteredPosts.map(
                            (post) => {
                                return <div className="tile is-parent is-4" key={`post-${post.id}`}>
                                    <div className="tile is-child box">
                                        <div className="title is-6">{post.title}</div>
                                        <div className="subtitle is-6 mb-4">{post.user.firstName} {post.user.lastName}</div>
                                        <img className="image" src={post.image}></img>
                                        <nav className="level mt-1">
                                            <div className="level-left">
                                                <ButtonFavorite post={post} getPosts={getPosts}/>
                                                {
                                                    post.userId === userObject.id || userObject.admin
                                                        ? <>
                                                            <button 
                                                                className="button is-light is-link is-small mr-1"
                                                                onClick={(clickEvent) => handleDeleteButtonClick(clickEvent, post.id)}> 
                                                                <span className="icon"><i className="material-icons-outlined">delete</i></span>
                                                            </button>
                                                            <button 
                                                                className="button is-light is-link is-small mr-1">
                                                                    <Link className="icon" to={`/posts/${post.id}/edit`}><span className="icon"><i className="material-icons-outlined">edit</i></span></Link> 
                                                            </button>
                                                        </>
                                                        : <></>
                                                }
                                                {
                                                    filteredCollections.length > 0
                                                        ? <>
                                                            <div className="dropdown is-hoverable">
                                                                <div className="dropdown-trigger">
                                                                    <button className="button is-light is-link is-small mr-1" aria-haspopup="true" aria-controls="dropdown-menu4">
                                                                        <span className="icon"><i className="material-icons-outlined">add</i></span>
                                                                    </button>
                                                                </div>
                                                                <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                                                                    <div className="dropdown-content">
                                                                        {
                                                                            filteredCollections.map(
                                                                                (userCollection) => {
                                                                                    if (post.postCollections.find(collection => collection.collectionId === userCollection.id)) {
                                                                                        
                                                                                    } else {
                                                                                        return <a
                                                                                            href="#"
                                                                                            key={`collection--${userCollection.id}`}
                                                                                            className="dropdown-item"
                                                                                            onClick={
                                                                                                (clickEvent) => {
                                                                                                    handleAddButtonClick(clickEvent, userCollection.id, post.id)
                                                                                                    getPosts();
                                                                                                    getCollections();
                                                                                                }
                                                                                            }>
                                                                                            {userCollection.title}
                                                                                        </a>
                                                                                    }
                                                                                    
                                                                                }
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {
                                                                filter === "Collection"
                                                                    ? <>
                                                                        <button 
                                                                            className="button is-light is-link is-small mr-1"
                                                                            onClick={(clickEvent) => handleRemoveButtonClick(clickEvent, post.postCollections.find(postCollection => postCollection.postId === post.id).id)}> 
                                                                            <span className="icon"><i className="material-icons-outlined">remove</i></span>
                                                                        </button>
                                                                    </>
                                                                    : <></>
    
                                                            }
                                                        </>
                                                        : <>
                                                            <button className="button is-light is-link is-small">
                                                                <Link className="icon" to={`/collection/create`}><span className="icon"><i className="material-icons-outlined">add</i></span></Link> 
                                                            </button>
                                                        </>
                                                }
                                            </div>
                                            <div className="level-right">
                                                <span className="tag is-light is-link is-rounded ml-1">{post?.tag?.label}</span>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            }
                        )
                    }
            </div>
        </div>
    </>
}

/*

TITLE           EDIT
--------------------


       IMAGE

(TAG)
--------------------
LIKE      |      ADD

*/


//handleRemoveButtonClick(clickEvent, post.postCollections.find(postCollection => postCollection.collectionId === collectionId && post.id === postCollection.postId).id)}> 