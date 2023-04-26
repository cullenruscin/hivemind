import { useState, useEffect } from "react"

export const PostList = ({ filter }) => {
    const [posts, setPosts] = useState([])

    const localUser = localStorage.getItem("hivemind_user");
    const userObject = JSON.parse(localUser);

    useEffect(
        () => {
            const queryString = filter ? filter : '';

            fetch(`http://localhost:8088/posts?_expand=user&&${queryString}`)
                .then(res => res.json())
                .then((postArray) => {
                    setPosts(postArray)
                })
        },
        [posts]
    );

    const handleDeleteButtonClick = (event, id) => {
        event.preventDefault();

        return fetch(`http://localhost:8088/posts/${id}`, {
            method: 'DELETE',
          })
            .then(res => res.json())
    }

    return <>
        <div className="container">
            <div className="tile is-ancestor is-verticle is-flex-wrap-wrap mt-3">
                    {
                        posts.map(
                            (post) => {
                                return <div className="tile is-parent is-4" key={`postcard--${post.id}`}>
                                    <div className="tile is-child box">
                                        <div className="title is-6">{post.title}</div>
                                        <div className="subtitle is-6">{post.user.firstName} {post.user.lastName}</div>
                                        {
                                            post.userId === userObject.id || userObject.admin
                                                ? <>
                                                    <button 
                                                        onClick={(clickEvent) => handleDeleteButtonClick(clickEvent, post.id)} 
                                                        className="button is-light">
                                                        <span className="icon material-icons-outlined">delete</span>
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