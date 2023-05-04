import { useState, useEffect } from "react";
import { ButtonFavorite } from "../../buttons/ButtonFavorite";
import { Link, useParams } from "react-router-dom";

export const PostList = ({ filter }) => {
    const {collectionId} = useParams();

    const [posts, setPosts] = useState([]);
    const [collections, setCollections] = useState([]);
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
        fetch(`ttp://localhost:8088/collections`)
            .then(res => res.json())
            .then((collectionArray) => {
                setCollections(collectionArray);
            })
    }

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

    return <>
        <div className="container">
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
