import { useState, useEffect } from "react";
import { ButtonFavorite } from "../../buttons/ButtonFavorite";

export const PostList = ({ filter }) => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFiltered] = useState([])

    const localUser = localStorage.getItem("hivemind_user");
    const userObject = JSON.parse(localUser);

    const getPosts = () => {

        fetch(`http://localhost:8088/posts?_expand=user&_embed=favorites`)
            .then(res => res.json())
            .then((postArray) => {
                setPosts(postArray);
            });
    }

    useEffect(
        () => {
            if (filter === "All") {
                setFiltered(posts);
            } else if (filter === "User") {
                setFiltered(posts.filter(post => post.userId === userObject.id));
            } else if (filter === "Favorites") {            
                setFiltered(posts.filter(post => post.favorites.some(favorite => favorite.userId === userObject.id)));
            }
        },
        [posts]
    )

    useEffect(
        () => {
            getPosts();
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
            <div className="tile is-ancestor is-verticle is-flex-wrap-wrap mt-3">
                    {
                        filteredPosts.map(
                            (post) => {
                                return <div className="tile is-parent is-4" key={`postcard--${post.id}`}>
                                    <div className="tile is-child box">
                                        <div className="title is-6">{post.title}</div>
                                        <div className="subtitle is-6">{post.user.firstName} {post.user.lastName}</div>
                                        <ButtonFavorite post={post} getPosts={getPosts}/>
                                        {
                                            post.userId === userObject.id || userObject.admin
                                                ? <>
                                                    <button 
                                                        className="button is-light is-small"
                                                        onClick={(clickEvent) => handleDeleteButtonClick(clickEvent, post.id)}> 
                                                        <span className="icon"><i className="material-icons-outlined">delete</i></span>
                                                    </button>
                                                </>
                                                : <></>
                                        }
                                    </div>
                                </div>
                            }
                        )
                    }
            </div>
        </div>
    </>
}

