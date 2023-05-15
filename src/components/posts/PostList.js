import { useState, useEffect } from "react";
import { ButtonFavorite } from "../../buttons/ButtonFavorite";
import { Link, useParams } from "react-router-dom";

export const PostList = ({ filter }) => {
    const {collectionId} = useParams();

    const [posts, setPosts] = useState([]);
    const [collections, setCollections] = useState([]);
    const [filteredCollections, setFilteredCollections] = useState([]);
    const [filteredPosts, setFiltered] = useState([]);

    const localUser = localStorage.getItem("hivemind_user");
    const userObject = JSON.parse(localUser);

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
            <div className="tile is-ancestor is-flex-wrap-wrap m-3">
                    {
                        filteredPosts.map(
                            (post) => {
                                return <div className="tile is-parent is-4" key={`post-${post.id}`}>
                                    <div className="tile is-child card">
                                        <div className="is-flex is-justify-content-space-between p-2">
                                            <div>
                                                <div className="title is-6">{post.title}</div>
                                                <div className="subtitle is-6">{post.user.firstName} {post.user.lastName}</div>
                                            </div>
                                            {
                                                post.userId === userObject.id || userObject.admin
                                                    ? <>
                                                        <div className="dropdown is-hoverable">
                                                            <div className="dropdown-trigger">
                                                                <button
                                                                    className="button is-light is-link is-small">
                                                                    <span className="icon"><i className="material-icons-outlined">edit</i></span>
                                                                </button>
                                                            </div>
                                                            <div className="dropdown-menu">
                                                                <div className="dropdown-content">
                                                                    <Link className="dropdown-item" to={`/posts/${post.id}/edit`}>Edit</Link>
                                                                    {
                                                                        filter === "Collection"
                                                                            ? <>
                                                                                <a
                                                                                    href="#"
                                                                                    className="dropdown-item"
                                                                                    onClick={(clickEvent) => handleRemoveButtonClick(clickEvent, post.postCollections.find(postCollection => postCollection.postId === post.id).id)}
                                                                                >Remove</a>
                                                                            </>
                                                                            : <></>
                                                                    }
                                                                    <a
                                                                        href="#"
                                                                        className="dropdown-item"
                                                                        onClick={(clickEvent) => handleDeleteButtonClick(clickEvent, post.id)}
                                                                    >Delete</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                    : <></>
                                            }
                                        </div>
                                        <div className="card-image">
                                            <div className="image is-4by3">
                                                <img className="image" src={post.image}></img>
                                            </div>
                                        </div>
                                        <div className="level p-2">
                                            <div className="level-left">
                                                <ButtonFavorite post={post} getPosts={getPosts}/>
                                                {
                                                    filteredCollections.length > 0
                                                        ? <>
                                                            <div className="dropdown is-hoverable">
                                                                <div className="dropdown-trigger">
                                                                    <button className="button is-light is-link is-small mr-1">
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
                                        </div>
                                    </div>
                                </div>
                            }
                        )
                    }
            </div>
        </div>
    </>
}

